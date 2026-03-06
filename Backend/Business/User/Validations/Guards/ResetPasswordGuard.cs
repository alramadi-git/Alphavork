using FluentValidation;

using Business.Interfaces;

using Business.User.Validations.Validators;

using Business.User.Inputs;

namespace Business.User.Validations.Guards;

public class ResetPasswordGuard(SendResetPasswordOtpValidator sendResetPasswordOtpValidator, VerifyResetPasswordOtpValidator verifyResetPasswordOtpValidator, ResetPasswordValidator resetPasswordValidator) : IGuard
{
    public async Task SendResetPasswordOtpAsync(SendResetPasswordOtpInput input)
    {
        await sendResetPasswordOtpValidator.ValidateAndThrowAsync(input);
    }

    public async Task VerifyResetPasswordOtpAsync(VerifyResetPasswordOtpInput input)
    {
        await verifyResetPasswordOtpValidator.ValidateAndThrowAsync(input);
    }

    public async Task ResetPasswordAsync(ResetPasswordInput input)
    {
        await resetPasswordValidator.ValidateAndThrowAsync(input);
    }
}