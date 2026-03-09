using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validators;

public class ChangePasswordValidator : AbstractValidator<ChangePasswordInput>
{
    public ChangePasswordValidator()
    {
        RuleFor(changePassword => changePassword.NewPassword).Password().WithMessage("Password does not meet the required criteria.");
    }
}