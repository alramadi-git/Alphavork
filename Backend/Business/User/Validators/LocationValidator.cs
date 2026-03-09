using FluentValidation;

using Business.User.Inputs;

namespace Business.User.Validators;

public class LocationValidator : AbstractValidator<LocationInput>
{
    public LocationValidator()
    {
        RuleFor(location => location.Country)
        .MinimumLength(2).WithMessage("Country must be at least 2 characters.")
        .MaximumLength(56).WithMessage("Country must not exceed 56 characters.");

        RuleFor(location => location.City)
        .MinimumLength(2).WithMessage("City must be at least 2 characters.")
        .MaximumLength(85).WithMessage("City must not exceed 85 characters.");

        RuleFor(location => location.Street)
        .MinimumLength(3).WithMessage("Street must be at least 3 characters.")
        .MaximumLength(150).WithMessage("Street must not exceed 150 characters.");
    }
}