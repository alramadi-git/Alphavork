using FluentValidation;

using Business.Modules.Validations.Extensions;

using Business.Inputs;

namespace Business.Modules.Validations.Validators;

public class RefreshTokensValidator : AbstractValidator<RefreshTokensInput>
{
    public RefreshTokensValidator()
    {
        RuleFor(refreshTokens => refreshTokens.Email).EmailAddress().WithMessage("Email address is not valid.");
        RuleFor(refreshTokens => refreshTokens.RefreshToken).Token().WithMessage("Refresh token is not valid.");
    }
}