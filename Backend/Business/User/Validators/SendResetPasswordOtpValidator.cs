using FluentValidation;

using Business.User.Inputs;

namespace Business.User.Validators;

public class SendResetPasswordOtpValidator : AbstractValidator<SendResetPasswordOtpInput>
{
    public SendResetPasswordOtpValidator()
    {
        RuleFor(sendResetPasswordOtp => sendResetPasswordOtp.Email)
        .EmailAddress().WithMessage("Email address is not valid.");
    }
}