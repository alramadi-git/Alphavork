using Microsoft.AspNetCore.Identity;

using Business.Interfaces;

using Business.Exceptions;

using AutoMapper;

using Business.Modules.Hashing.Services;

using Business.Modules.Imagekit.Services;

using Business.Inputs;
using Business.User.Inputs;

using Business.User.Models;
using Business.Modules.Otp.Services;
using Business.Modules.EmailSender.Services;
using Business.User.EmailSender.Extensions;
using Business.User.Guards;

namespace Business.User.Services;

public class AccountService(IMapper mapper, AccountGuard accountGuard, HashingService hashingService, ImagekitService imagekitService, NoReplyEmailSenderService noReplyEmailSenderService, OtpService otpService, Database.UnitOfWork.UnitOfWork unitOfWork, Database.Repositories.ImageRepository imageRepository, Database.Repositories.OtpRepository otpRepository, Database.Repositories.UserRepository userRepository, Database.Repositories.UserSettingsRepository userSettingsRepository, Database.Repositories.UserTokenRepository userTokenRepository, Database.Repositories.UserOtpRepository userOtpRepository) : IService
{

    public async Task<UserModel> GetAccountAsync(Guid uuid)
    {
        var userEntity = await userRepository.GetActiveByUuidAsync(uuid)
        ?? throw new UserNotFoundException();

        var userSettingsEntity = await userSettingsRepository.GetByUserUuidAsync(uuid)
        ?? throw new UserSettingsNotFoundException();

        var userModel = mapper.Map<UserModel>((userEntity, userSettingsEntity));

        return userModel;
    }

    public async Task AddAvatarAsync(AddAvatarInput input, Guid uuid)
    {
        await accountGuard.AddAvatarAsync(input);

        var userEntity = await userRepository.GetActiveByUuidTrackedAsync(uuid)
        ?? throw new UserNotFoundException();

        if (userEntity.AvatarId != null)
        {
            throw new AvatarAlreadyExistsException();
        }

        var newAvatar = await imagekitService.UploadFileAsync(input.NewAvatar, $"/alphavork/users/{userEntity.Uuid}")
        ?? throw new AvatarUploadFailedException();

        var newAvatarEntity = new Database.Entities.ImageEntity
        {
            Id = newAvatar.Id,
            Url = newAvatar.Url,
        };

        userEntity.AvatarId = newAvatarEntity.Id;

        userEntity.UpdatedAt = DateTime.UtcNow;

        imageRepository.Add(newAvatarEntity);

        try
        {
            await unitOfWork.SaveChangesAsync();
        }
        catch
        {
            await imagekitService.DeleteFileAsync(newAvatar.Id);
            throw;
        }
    }

    public async Task DeleteAvatarAsync(Guid uuid)
    {
        var userEntity = await userRepository.GetActiveByUuidTrackedAsync(uuid)
        ?? throw new UserNotFoundException();

        if (userEntity.AvatarId == null)
        {
            throw new NoAvatarException();
        }

        var avatarId = userEntity.AvatarId;

        userEntity.AvatarId = null;

        userEntity.UpdatedAt = DateTime.UtcNow;

        imageRepository.Remove(userEntity.Avatar!);

        await unitOfWork.SaveChangesAsync();

        await imagekitService.DeleteFileAsync(avatarId);
    }

    public async Task UpdateAccountAsync(UpdateAccountInput input, Guid uuid)
    {
        await accountGuard.UpdateAccountAsync(input);

        var userEntity = await userRepository.GetActiveByUuidTrackedAsync(uuid)
        ?? throw new UserNotFoundException();

        userEntity.Location.Country = input.Location.Country;
        userEntity.Location.City = input.Location.City;
        userEntity.Location.Street = input.Location.Street;
        userEntity.Username = input.Username;
        userEntity.Birthday = input.Birthday;
        userEntity.PhoneNumber = input.PhoneNumber;

        userEntity.UpdatedAt = DateTime.UtcNow;

        await unitOfWork.SaveChangesAsync();
    }

    public async Task ChangeEmailAsync(ChangeEmailInput input, Guid uuid)
    {
        await accountGuard.ChangeEmailAsync(input);

        var userEntity = await userRepository.GetActiveByUuidTrackedAsync(uuid)
        ?? throw new UserNotFoundException();

        if (userEntity.Email == input.NewEmail)
        {
            throw new SameEmailException();
        }

        var userRefreshTokenEntities = await userTokenRepository.GetAllActiveRefreshTokenByUserUuidTrackedAsync(uuid);
        foreach (var userRefreshTokenEntity in userRefreshTokenEntities)
        {
            userRefreshTokenEntity.Token.IsRevoked = true;
        }

        var userSettingsEntity = await userSettingsRepository.GetByUserUuidTrackedAsync(userEntity.Uuid)
        ?? throw new UserSettingsNotFoundException();

        userEntity.Email = input.NewEmail;

        userSettingsEntity.IsEmailVerified = false;
        userSettingsEntity.EmailVerifiedAt = null;

        userEntity.UpdatedAt = DateTime.UtcNow;

        await unitOfWork.SaveChangesAsync();
    }

    public async Task ChangePasswordAsync(ChangePasswordInput input, Guid uuid)
    {
        await accountGuard.ChangePasswordAsync(input);

        var userEntity = await userRepository.GetActiveByUuidTrackedAsync(uuid)
        ?? throw new UserNotFoundException();

        var isNewPassword = hashingService.Verify(userEntity.Password, input.NewPassword);
        if (isNewPassword == PasswordVerificationResult.Success || isNewPassword == PasswordVerificationResult.SuccessRehashNeeded)
        {
            throw new SamePasswordException();
        }

        var userRefreshTokenEntities = await userTokenRepository.GetAllActiveRefreshTokenByUserUuidTrackedAsync(uuid);
        foreach (var userRefreshTokenEntity in userRefreshTokenEntities)
        {
            userRefreshTokenEntity.Token.IsRevoked = true;
        }

        userEntity.Password = hashingService.Hash(input.NewPassword);

        userEntity.UpdatedAt = DateTime.UtcNow;

        await unitOfWork.SaveChangesAsync();
    }

    public async Task SendEmailVerificationOtpAsync(Guid uuid)
    {
        var userEntity = await userRepository.GetActiveByUuidAsync(uuid)
        ?? throw new UserNotFoundException();

        var userSettingsEntity = await userSettingsRepository.GetByUserUuidAsync(userEntity.Uuid)
        ?? throw new UserSettingsNotFoundException();

        if (userSettingsEntity.IsEmailVerified == true)
        {
            throw new EmailAlreadyVerifiedException();
        }

        var hasActiveEmailVerificationOtp = await userOtpRepository.HasActiveEmailVerificationOtpByUserEmailAsync(userEntity.Email);
        if (hasActiveEmailVerificationOtp == true)
        {
            throw new ActiveEmailVerificationOtpAlreadyExistsException();
        }

        var newOtp = otpService.Generate();
        var newOtpEntity = new Database.Entities.OtpEntity
        {
            Uuid = Guid.NewGuid(),
            Type = Database.Enums.OtpTypeEnum.EmailVerificationOtp,
            Otp = hashingService.Hash(newOtp),
            Attempts = 0,
            IsUsed = false,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15),
            CreatedAt = DateTime.UtcNow,
        };

        var newUserOtpEntity = new Database.Entities.UserOtpEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = userEntity.Uuid,
            OtpUuid = newOtpEntity.Uuid,
        };

        otpRepository.Add(newOtpEntity);
        userOtpRepository.Add(newUserOtpEntity);

        await using var transaction = await unitOfWork.BeginTransactionAsync();

        await unitOfWork.SaveChangesAsync();

        if (await noReplyEmailSenderService.SendEmailVerificationOtpAsync(userEntity.Email, newOtp) == false)
        {
            await unitOfWork.RollbackAsync();

            throw new SendingEmailVerificationOtpFailedException();
        }

        await unitOfWork.CommitAsync();
    }

    public async Task VerifyEmailVerificationOtpAsync(VerifyEmailVerificationOtpInput input, Guid uuid)
    {
        await accountGuard.VerifyEmailVerificationOtpAsync(input);

        var userEntity = await userRepository.GetActiveByUuidTrackedAsync(uuid)
        ?? throw new UserNotFoundException();

        var userSettingsEntity = await userSettingsRepository.GetByUserUuidTrackedAsync(userEntity.Uuid)
        ?? throw new UserSettingsNotFoundException();

        if (userSettingsEntity.IsEmailVerified == true)
        {
            throw new EmailAlreadyVerifiedException();
        }

        var userEmailVerificationOtpEntity = await userOtpRepository.GetActiveEmailVerificationOtpByUserEmailTrackedAsync(userEntity.Email)
        ?? throw new NoActiveEmailVerificationOtpException();

        var isValidEmailVerificationOtp = hashingService.Verify(userEmailVerificationOtpEntity.Otp.Otp, input.Otp);
        if (isValidEmailVerificationOtp == PasswordVerificationResult.Failed)
        {
            userEmailVerificationOtpEntity.Otp.Attempts += 1;

            await unitOfWork.SaveChangesAsync();

            throw new InvalidEmailVerificationOtpException();
        }

        userEmailVerificationOtpEntity.Otp.IsUsed = true;

        userSettingsEntity.IsEmailVerified = true;
        userSettingsEntity.EmailVerifiedAt = DateTime.UtcNow;

        userEntity.UpdatedAt = DateTime.UtcNow;

        await unitOfWork.SaveChangesAsync();
    }

    public async Task LogoutAsync(LogoutInput input, Guid uuid)
    {
        await accountGuard.LogoutAsync(input);

        var userRefreshTokenEntities = await userTokenRepository.GetAllActiveRefreshTokenByUserUuidTrackedAsync(uuid);
        if (userRefreshTokenEntities.Length == 0)
        {
            throw new NoActiveRefreshTokenException();
        }

        var userRefreshTokenEntity = userRefreshTokenEntities.FirstOrDefault(userRefreshToken => hashingService.Verify(userRefreshToken.Token.Token, input.RefreshToken) == PasswordVerificationResult.Success)
        ?? throw new InvalidRefreshTokenException();

        userRefreshTokenEntity.Token.IsRevoked = true;

        await unitOfWork.SaveChangesAsync();
    }
}