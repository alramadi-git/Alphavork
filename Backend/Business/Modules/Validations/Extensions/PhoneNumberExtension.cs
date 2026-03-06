using FluentValidation;

using PhoneNumbers;

namespace Business.Modules.Validations.Extensions;

public static class PhoneNumberExtension
{
    private static readonly PhoneNumberUtil _PhoneNumberUtil = PhoneNumberUtil.GetInstance();

    public static IRuleBuilderOptions<T, string> PhoneNumber<T>(this IRuleBuilder<T, string> ruleBuilder)
    {

        return ruleBuilder
        .Must(phoneNumber =>
        {
            try
            {
                var parsedPhoneNumber = _PhoneNumberUtil.Parse(phoneNumber, null);
                return _PhoneNumberUtil.IsValidNumber(parsedPhoneNumber);
            }
            catch
            {
                return false;
            }
        });
    }
}