using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validators;

public class VerifyEmailVerificationOtpValidator : AbstractValidator<VerifyEmailVerificationOtpInput>
{
    public VerifyEmailVerificationOtpValidator()
    {
        RuleFor(verifyEmailVerificationOtp => verifyEmailVerificationOtp.Otp)
        .Otp().WithMessage("OTP is not valid.");

    }
}