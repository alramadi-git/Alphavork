using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.Inputs;

namespace Business.Modules.Validations.Validators;

public class LogoutValidator : AbstractValidator<LogoutInput>
{
    public LogoutValidator()
    {
        RuleFor(logout => logout.RefreshToken).Token().WithMessage("Refresh token is not valid.");
    }
}