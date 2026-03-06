using FluentValidation;

namespace Business.Modules.Validations.Extensions;

public static class BirthdayExtension
{
    public static IRuleBuilderOptions<T, DateOnly> MinAge<T>(this IRuleBuilder<T, DateOnly> ruleBuilder, int years)
    {
        return ruleBuilder
        .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow).AddYears(-years));
    }

    public static IRuleBuilderOptions<T, DateOnly> MaxAge<T>(this IRuleBuilder<T, DateOnly> ruleBuilder, int years)
    {
        return ruleBuilder
        .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow).AddYears(-years));
    }
}