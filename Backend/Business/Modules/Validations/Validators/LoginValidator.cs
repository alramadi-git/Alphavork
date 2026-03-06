using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.Inputs;

namespace Business.Modules.Validations.Validators;

public class LoginValidator : AbstractValidator<LoginInput>
{
    public LoginValidator()
    {
        RuleFor(login => login.Email).EmailAddress().WithMessage("Email address is not valid.");
        RuleFor(login => login.Password).Password().WithMessage("Password does not meet the required criteria.");
    }
}