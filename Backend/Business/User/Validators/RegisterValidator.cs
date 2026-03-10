using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validators;

public class RegisterValidator : AbstractValidator<RegisterInput>
{
    public RegisterValidator(LocationValidator locationValidator)
    {
        RuleFor(register => register.Location).SetValidator(locationValidator);

        RuleFor(register => register.Username)
        .MinimumLength(3).WithMessage("Username must be at least 3 characters.")
        .MaximumLength(20).WithMessage("Username must not exceed 20 characters.");

        RuleFor(register => register.Birthday)
        .MinAge(18).WithMessage("You must be at least 18 years old.")
        .MaxAge(65).WithMessage("Age must not exceed 65 years.");

        RuleFor(register => register.PhoneNumber)
        .PhoneNumber().WithMessage("Phone number is not valid.");

        RuleFor(register => register.Email)
        .EmailAddress().WithMessage("Email address is not valid.");

        RuleFor(register => register.Password)
        .Password().WithMessage("Password does not meet the required criteria.");
    }
}