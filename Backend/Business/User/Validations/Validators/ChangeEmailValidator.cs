using FluentValidation;

using Business.User.Inputs;

namespace Business.User.Validations.Validators;

public class ChangeEmailValidator : AbstractValidator<ChangeEmailInput>
{
    public ChangeEmailValidator()
    {
        RuleFor(changeEmail => changeEmail.NewEmail).EmailAddress().WithMessage("Email address is not valid.");
    }
}