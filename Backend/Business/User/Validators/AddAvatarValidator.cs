using FluentValidation;

using Business.Modules.Validations.Extensions;

namespace Business.User.Validators;

using Business.User.Inputs;

public class AddAvatarValidator : AbstractValidator<AddAvatarInput>
{
    public AddAvatarValidator()
    {
        RuleFor(addAvatar => addAvatar.NewAvatar)
        .MaxKbSize(300).WithMessage("Avatar must be less than 300 KB.")
        .Type(Modules.Validations.Enums.FileTypeEnum.Image).WithMessage("Avatar must be an image.");
    }
}