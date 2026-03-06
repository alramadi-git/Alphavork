using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.RateLimiting;

namespace Api.User.Controllers;

[ApiController]
[Route("api/reset-password")]
[EnableRateLimiting("ResetPasswordLimiter")]
public class ResetPasswordController
(
    Business.User.Services.ResetPasswordService resetPasswordService
) : Controller
{
    [HttpPost("send-reset-password-otp")]
    public async Task<ActionResult> SendResetPasswordOtpAsync([FromBody] Business.User.Inputs.SendResetPasswordOtpInput input)
    {
        await resetPasswordService.SendResetPasswordOtpAsync(input);

        return NoContent();
    }

    [HttpPost("verify-reset-password-otp")]
    public async Task<ActionResult<Business.Models.ResetPasswordTokenModel>> VerifyResetPasswordOtpAsync([FromBody] Business.User.Inputs.VerifyResetPasswordOtpInput input)
    {
        var resetPasswordTokenModel = await resetPasswordService.VerifyResetPasswordOtpAsync(input);

        return Ok(resetPasswordTokenModel);
    }

    [HttpPost()]
    public async Task<ActionResult> ResetPasswordAsync([FromBody] Business.User.Inputs.ResetPasswordInput input)
    {
        await resetPasswordService.ResetPasswordAsync(input);

        return NoContent();
    }
}