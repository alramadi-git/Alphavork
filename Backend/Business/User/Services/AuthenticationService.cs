using System.Security.Claims;

using Microsoft.AspNetCore.Identity;

using AutoMapper;

using Business.Interfaces;

using Business.Exceptions;

using Business.User.Options;

using Business.User.Validations.Guards;

using Business.Modules.Hashing.Services;

using Business.Modules.Token.Services;

using Business.Modules.AccessToken.Services;

using Business.Inputs;
using Business.User.Inputs;

using Business.Models;
using Business.User.Models;

namespace Business.User.Services;

public class AuthenticationService(IMapper mapper, AuthenticationGuard authenticationGuard, HashingService hashingService, TokenService tokenService, AccessTokenService<UserAccessTokenOption> accessTokenService, Database.UnitOfWork.UnitOfWork unitOfWork, Database.Repositories.TokenRepository tokenRepository, Database.Repositories.LocationRepository locationRepository, Database.Repositories.UserRepository userRepository, Database.Repositories.UserSettingsRepository userSettingsRepository, Database.Repositories.UserTokenRepository userTokenRepository) : IService
{
    public async Task RegisterAsync(RegisterInput input)
    {
        await authenticationGuard.RegisterAsync(input);

        var isUserExist = await userRepository.IsExistByPhoneNumberAndEmailAsync(input.PhoneNumber, input.Email);
        if (isUserExist)
        {
            throw new UserAlreadyExistsException();
        }

        var newLocationEntity = new Database.Entities.LocationEntity
        {
            Uuid = Guid.NewGuid(),
            City = input.Location.City,
            Country = input.Location.Country,
            Street = input.Location.Street,
        };

        var newUserEntity = new Database.Entities.UserEntity
        {
            Uuid = Guid.NewGuid(),
            AvatarId = null,
            LocationUuid = newLocationEntity.Uuid,
            Username = input.Username,
            Birthday = input.Birthday,
            PhoneNumber = input.PhoneNumber,
            Email = input.Email,
            Password = hashingService.Hash(input.Password),
            Status = Database.Enums.StatusEnum.Active,
            IsDeleted = false,
            DeletedAt = null,
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
        };

        var newUserSettingsEntity = new Database.Entities.UserSettingsEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = newUserEntity.Uuid,
            IsEmailVerified = false,
            EmailVerifiedAt = null
        };

        locationRepository.Add(newLocationEntity);

        userRepository.Add(newUserEntity);

        userSettingsRepository.Add(newUserSettingsEntity);

        await unitOfWork.SaveChangesAsync();
    }

    public async Task<AccountModel<UserModel>> LoginAsync(LoginInput input)
    {
        await authenticationGuard.LoginAsync(input);

        var userEntity = await userRepository.GetActiveUserByEmailAsync(input.Email)
        ?? throw new AccountNotRegisteredException ();

        var userSettingsEntity = await userSettingsRepository.GetByUserUuidAsync(userEntity.Uuid)
        ?? throw new UserSettingsNotFoundException();

        var isValidPassword = hashingService.Verify(userEntity.Password, input.Password);
        if (isValidPassword == PasswordVerificationResult.Failed)
        {
            throw new InvalidPasswordException();
        }

        if (isValidPassword == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var trackedUserEntity = (await userRepository.GetActiveByUuidTrackedAsync(userEntity.Uuid))!;
            trackedUserEntity.Password = hashingService.Hash(input.Password);

            await unitOfWork.SaveChangesAsync();
        }

        var expiresAt = input.RememberMe ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddDays(1);

        var newRefreshToken = tokenService.Generate();
        var newRefreshTokenEntity = new Database.Entities.TokenEntity
        {
            Uuid = Guid.NewGuid(),
            Type = Database.Enums.TokenTypeEnum.RefreshToken,
            Token = hashingService.Hash(newRefreshToken),
            IsRevoked = false,
            ExpiresAt = expiresAt,
            CreatedAt = DateTime.UtcNow,
        };

        var newUserRefreshTokenEntity = new Database.Entities.UserTokenEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = userEntity.Uuid,
            TokenUuid = newRefreshTokenEntity.Uuid,
        };

        tokenRepository.Add(newRefreshTokenEntity);
        userTokenRepository.Add(newUserRefreshTokenEntity);

        await unitOfWork.SaveChangesAsync();

        var claims = new Claim[]
        {
            new(ClaimTypes.NameIdentifier, userEntity.Uuid.ToString())
        };
        var accessToken = accessTokenService.Generate(claims);

        var userModel = new AccountModel<UserModel>
        {
            Account = mapper.Map<UserModel>((userEntity, userSettingsEntity)),
            AccessToken = accessToken,
            RefreshToken = newRefreshToken,
            ExpiresAt = expiresAt,
        };

        return userModel;
    }

    public async Task<TokensModel> RefreshTokensAsync(RefreshTokensInput input)
    {
        await authenticationGuard.RefreshTokenAsync(input);

        var userRefreshTokenEntities = await userTokenRepository.GetAllActiveRefreshTokenByUserEmailTrackedAsync(input.Email);
        if (userRefreshTokenEntities.Length == 0)
        {
            throw new NoActiveRefreshTokenException();
        }

        var userRefreshTokenEntity = userRefreshTokenEntities.FirstOrDefault(userRefreshToken => hashingService.Verify(userRefreshToken.Token.Token, input.RefreshToken) == PasswordVerificationResult.Success)
        ?? throw new InvalidRefreshTokenException();

        userRefreshTokenEntity.Token.IsRevoked = true;

        var newRefreshToken = tokenService.Generate();
        var newRefreshTokenEntity = new Database.Entities.TokenEntity
        {
            Uuid = Guid.NewGuid(),
            Type = Database.Enums.TokenTypeEnum.RefreshToken,
            Token = hashingService.Hash(newRefreshToken),
            IsRevoked = false,
            ExpiresAt = DateTime.SpecifyKind(userRefreshTokenEntity.Token.ExpiresAt, DateTimeKind.Utc),
            CreatedAt = DateTime.UtcNow,
        };

        var newUserRefreshTokenEntity = new Database.Entities.UserTokenEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = userRefreshTokenEntity.User.Uuid,
            TokenUuid = newRefreshTokenEntity.Uuid,
        };

        tokenRepository.Add(newRefreshTokenEntity);
        userTokenRepository.Add(newUserRefreshTokenEntity);

        await unitOfWork.SaveChangesAsync();

        var claims = new Claim[]
        {
            new(ClaimTypes.NameIdentifier, userRefreshTokenEntity.User.Uuid.ToString())
        };
        var accessToken = accessTokenService.Generate(claims);

        var tokensModel = new TokensModel
        {
            AccessToken = accessToken,
            RefreshToken = newRefreshToken,
        };

        return tokensModel;
    }
}