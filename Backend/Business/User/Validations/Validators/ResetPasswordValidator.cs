using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validations.Validators;

public class ResetPasswordValidator : AbstractValidator<ResetPasswordInput>
{
    public ResetPasswordValidator()
    {
        RuleFor(resetPassword => resetPassword.Email).EmailAddress().WithMessage("Email address is not valid.");
        RuleFor(resetPassword => resetPassword.ResetPasswordToken).Token().WithMessage("Reset password token is not valid.");
        RuleFor(resetPassword => resetPassword.NewPassword).Password().WithMessage("Password does not meet the required criteria.");
    }
}