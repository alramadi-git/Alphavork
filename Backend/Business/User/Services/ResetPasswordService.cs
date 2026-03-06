using Microsoft.AspNetCore.Identity;

using Business.Interfaces;

using Business.Exceptions;

using Business.User.Validations.Guards;

using Business.Modules.Hashing.Services;

using Business.Modules.Token.Services;

using Business.Modules.Otp.Services;

using Business.Modules.EmailSender.Services;

using Business.User.Inputs;

using Business.Models;
using Business.User.EmailSender.Extensions;

namespace Business.User.Services;

public class ResetPasswordService(ResetPasswordGuard resetPasswordGuard, HashingService hashingService, TokenService tokenService, OtpService otpService, NoReplyEmailSenderService noReplyEmailSenderService, Database.UnitOfWork.UnitOfWork unitOfWork, Database.Repositories.TokenRepository tokenRepository, Database.Repositories.OtpRepository otpRepository, Database.Repositories.UserRepository userRepository, Database.Repositories.UserSettingsRepository userSettingsRepository, Database.Repositories.UserTokenRepository userTokenRepository, Database.Repositories.UserOtpRepository userOtpRepository) : IService
{
    public async Task SendResetPasswordOtpAsync(SendResetPasswordOtpInput input)
    {
        await resetPasswordGuard.SendResetPasswordOtpAsync(input);

        var userEntity = await userRepository.GetActiveUserByEmailAsync(input.Email)
        ?? throw new AccountNotRegisteredException();

        var userSettingsEntity = await userSettingsRepository.GetByUserUuidAsync(userEntity.Uuid)
        ?? throw new UserSettingsNotFoundException();

        if (userSettingsEntity.IsEmailVerified == false)
        {
            throw new EmailNotVerifiedException();
        }

        var hasActiveResetPasswordOtp = await userOtpRepository.HasActiveResetPasswordOtpByUserEmailAsync(input.Email);
        if (hasActiveResetPasswordOtp == true)
        {
            throw new ActiveResetPasswordOtpAlreadyExistsException();
        }

        var newOtp = otpService.Generate();
        var newOtpEntity = new Database.Entities.OtpEntity
        {
            Uuid = Guid.NewGuid(),
            Type = Database.Enums.OtpTypeEnum.ResetPasswordOtp,
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

        if (await noReplyEmailSenderService.SendResetPasswordOtpAsync(userEntity.Email, newOtp) == false)
        {
            await unitOfWork.RollbackAsync();

            throw new SendingResetPasswordOtpFailedException();
        }

        await unitOfWork.CommitAsync();
    }

    public async Task<ResetPasswordTokenModel> VerifyResetPasswordOtpAsync(VerifyResetPasswordOtpInput input)
    {
        await resetPasswordGuard.VerifyResetPasswordOtpAsync(input);

        var userOtpEntity = await userOtpRepository.GetActiveResetPasswordOtpByUserEmailTrackedAsync(input.Email)
        ?? throw new NoActiveResetPasswordOtpException();

        var isValidOtp = hashingService.Verify(userOtpEntity.Otp.Otp, input.Otp);
        if (isValidOtp == PasswordVerificationResult.Failed)
        {
            userOtpEntity.Otp.Attempts += 1;

            await unitOfWork.SaveChangesAsync();

            throw new InvalidResetPasswordOtpException();
        }

        userOtpEntity.Otp.IsUsed = true;

        var newResetPasswordToken = tokenService.Generate();
        var newResetPasswordTokenEntity = new Database.Entities.TokenEntity
        {
            Uuid = Guid.NewGuid(),
            Type = Database.Enums.TokenTypeEnum.ResetPasswordToken,
            Token = hashingService.Hash(newResetPasswordToken),
            IsRevoked = false,
            ExpiresAt = DateTime.UtcNow.AddMinutes(30),
            CreatedAt = DateTime.UtcNow,
        };

        var newUserResetPasswordTokenEntity = new Database.Entities.UserTokenEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = userOtpEntity.User.Uuid,
            TokenUuid = newResetPasswordTokenEntity.Uuid,
        };

        tokenRepository.Add(newResetPasswordTokenEntity);
        userTokenRepository.Add(newUserResetPasswordTokenEntity);

        await unitOfWork.SaveChangesAsync();

        var resetPasswordTokenModel = new ResetPasswordTokenModel
        {
            ResetPasswordToken = newResetPasswordToken,
        };

        return resetPasswordTokenModel;
    }

    public async Task ResetPasswordAsync(ResetPasswordInput input)
    {
        await resetPasswordGuard.ResetPasswordAsync(input);

        var userResetPasswordTokenEntity = await userTokenRepository.GetActiveResetPasswordTokenByUserEmailTrackedAsync(input.Email)
        ?? throw new NoActiveResetPasswordTokenException();


        var isValidResetPasswordToken = hashingService.Verify(userResetPasswordTokenEntity.Token.Token, input.ResetPasswordToken);
        if (isValidResetPasswordToken == PasswordVerificationResult.Failed)
        {
            throw new InvalidResetPasswordTokenException();
        }

        var userRefreshTokenEntities = await userTokenRepository.GetAllActiveRefreshTokenByUserEmailTrackedAsync(input.Email);
        foreach (var userRefreshTokenEntity in userRefreshTokenEntities)
        {
            userRefreshTokenEntity.Token.IsRevoked = true;
        }

        userResetPasswordTokenEntity.Token.IsRevoked = true;

        userResetPasswordTokenEntity.User.Password = hashingService.Hash(input.NewPassword);

        userResetPasswordTokenEntity.User.UpdatedAt = DateTime.UtcNow;

        await unitOfWork.SaveChangesAsync();
    }
}