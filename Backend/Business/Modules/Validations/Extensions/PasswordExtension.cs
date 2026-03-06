using FluentValidation;

namespace Business.Modules.Validations.Extensions;

public static class PasswordExtension
{
    public static IRuleBuilderOptions<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .MinimumLength(8)
        .MaximumLength(32)
        .Matches("[a-z]")
        .Matches("[A-Z]")
        .Matches("[0-9]")
        .Matches("[^a-zA-Z0-9]")
        .Matches("^\\S+$");
    }
}