using Microsoft.AspNetCore.Http;

namespace Business.User.Inputs;

public class AddAvatarInput
{
    public required IFormFile NewAvatar { get; set; }
}