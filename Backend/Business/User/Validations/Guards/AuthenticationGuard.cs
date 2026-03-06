using FluentValidation;

using Business.Interfaces;

using Business.Modules.Validations.Validators;
using Business.User.Validations.Validators;

using Business.Inputs;
using Business.User.Inputs;

namespace Business.User.Validations.Guards;

public class AuthenticationGuard(RegisterValidator registerValidator, RefreshTokensValidator refreshTokensValidator, LoginValidator loginValidator) : IGuard
{
    public async Task RegisterAsync(RegisterInput input)
    {
        await registerValidator.ValidateAndThrowAsync(input);
    }

    public async Task LoginAsync(LoginInput input)
    {
        await loginValidator.ValidateAndThrowAsync(input);
    }

    public async Task RefreshTokenAsync(RefreshTokensInput input)
    {
        await refreshTokensValidator.ValidateAndThrowAsync(input);
    }
}