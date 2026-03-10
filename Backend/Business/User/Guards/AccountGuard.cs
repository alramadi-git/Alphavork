using FluentValidation;

using Business.Interfaces;

using Business.Modules.Validations.Validators;
using Business.User.Validators;

using Business.Inputs;
using Business.User.Inputs;

namespace Business.User.Guards;

public class AccountGuard(AddAvatarValidator addAvatarValidator, UpdateAccountValidator updateAccountValidator, ChangeEmailValidator changeEmailValidator, ChangePasswordValidator changePasswordValidator, VerifyEmailVerificationOtpValidator verifyEmailVerificationOtpValidator, LogoutValidator logoutValidator) : IGuard
{


    public async Task AddAvatarAsync(AddAvatarInput input)
    {
        await addAvatarValidator.ValidateAndThrowAsync(input);
    }

    public async Task UpdateAccountAsync(UpdateAccountInput input)
    {
        await updateAccountValidator.ValidateAndThrowAsync(input);
    }

    public async Task ChangeEmailAsync(ChangeEmailInput input)
    {
        await changeEmailValidator.ValidateAndThrowAsync(input);
    }

    public async Task ChangePasswordAsync(ChangePasswordInput input)
    {
        await changePasswordValidator.ValidateAndThrowAsync(input);
    }

    public async Task VerifyEmailVerificationOtpAsync(VerifyEmailVerificationOtpInput input)
    {
        await verifyEmailVerificationOtpValidator.ValidateAndThrowAsync(input);
    }

    public async Task LogoutAsync(LogoutInput input)
    {
        await logoutValidator.ValidateAndThrowAsync(input);
    }
}