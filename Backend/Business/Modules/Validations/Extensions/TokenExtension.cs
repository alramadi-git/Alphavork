using FluentValidation;

namespace Business.Modules.Validations.Extensions;

public static class TokenExtension
{
    public static IRuleBuilderOptions<T, string> Token<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .Length(32)
        .Matches("^[a-zA-Z0-9+/=]+$");
    }
}