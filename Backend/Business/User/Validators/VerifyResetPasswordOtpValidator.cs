using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validators;

public class VerifyResetPasswordOtpValidator : AbstractValidator<VerifyResetPasswordOtpInput>
{
    public VerifyResetPasswordOtpValidator()
    {
        RuleFor(verifyResetPasswordOtp => verifyResetPasswordOtp.Email)
        .EmailAddress().WithMessage("Email address is not valid.");

        RuleFor(verifyResetPasswordOtp => verifyResetPasswordOtp.Otp)
        .Otp().WithMessage("OTP is not valid.");

    }
}