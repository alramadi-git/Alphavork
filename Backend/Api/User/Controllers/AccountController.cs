using System.Security.Claims;

using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.RateLimiting;

using Microsoft.AspNetCore.Authorization;

namespace Api.User.Controllers;

[ApiController]
[Route("api/account")]
[EnableRateLimiting("AccountLimiter")]
[Authorize(AuthenticationSchemes = "User")]
public class AccountController
(
    Business.User.Services.AccountService accountService
) : Controller
{
    [HttpGet()]
    public async Task<ActionResult<Business.User.Models.UserModel>> GetAccountAsync()
    {
        var userModel = await accountService.GetAccountAsync(new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return Ok(userModel);
    }

    [HttpPost("avatar")]
    public async Task<ActionResult> AddAvatarAsync([FromForm] Business.User.Inputs.AddAvatarInput input)
    {
        await accountService.AddAvatarAsync(input, new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpDelete("avatar")]
    public async Task<ActionResult> DeleteAvatarAsync()
    {
        await accountService.DeleteAvatarAsync(new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpPatch()]
    public async Task<ActionResult> UpdateAccountAsync([FromBody] Business.User.Inputs.UpdateAccountInput input)
    {
        await accountService.UpdateAccountAsync(input, new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpPatch("change-email")]
    public async Task<ActionResult> ChangeEmailAsync([FromBody] Business.User.Inputs.ChangeEmailInput input)
    {
        await accountService.ChangeEmailAsync(input, new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpPatch("change-password")]
    public async Task<ActionResult> ChangePasswordAsync([FromBody] Business.User.Inputs.ChangePasswordInput input)
    {
        await accountService.ChangePasswordAsync(input, new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpPost("send-email-verification-otp")]
    public async Task<ActionResult> SendEmailVerificationOtpAsync()
    {
        await accountService.SendEmailVerificationOtpAsync(new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpPost("verify-email-verification-otp")]
    public async Task<ActionResult> VerifyEmailVerificationOtpAsync([FromBody] Business.User.Inputs.VerifyEmailVerificationOtpInput input)
    {
        await accountService.VerifyEmailVerificationOtpAsync(input, new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }

    [HttpPost("logout")]
    public async Task<ActionResult> LogoutAsync([FromBody] Business.Inputs.LogoutInput input)
    {
        await accountService.LogoutAsync(input, new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!));

        return NoContent();
    }
}