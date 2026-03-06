using FluentValidation;

namespace Business.Modules.Validations.Extensions;

public static class OtpExtension
{
    public static IRuleBuilderOptions<T, string> Otp<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .Length(8)
        .Matches("^[a-zA-Z0-9+/=]+$");
    }
}