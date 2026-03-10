using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validators;

public class UpdateAccountValidator : AbstractValidator<UpdateAccountInput>
{
    public UpdateAccountValidator(LocationValidator locationValidator)
    {
        RuleFor(updateAccount => updateAccount.Location).SetValidator(locationValidator);

        RuleFor(updateAccount => updateAccount.Username)
        .MinimumLength(3).WithMessage("Username must be at least 3 characters.")
        .MaximumLength(20).WithMessage("Username must not exceed 20 characters.");

        RuleFor(updateAccount => updateAccount.Birthday)
        .MinAge(18).WithMessage("You must be at least 18 years old.")
        .MaxAge(65).WithMessage("Age must not exceed 65 years.");

        RuleFor(updateAccount => updateAccount.PhoneNumber)
        .PhoneNumber().WithMessage("Phone number is not valid.");
    }
}