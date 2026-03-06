using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.RateLimiting;

namespace Api.User.Controllers;

[ApiController]
[Route("api/authentication")]
[EnableRateLimiting("AuthenticationLimiter")]
public class AuthenticationController
(
    Business.User.Services.AuthenticationService authenticationService
) : Controller
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync([FromForm] Business.User.Inputs.RegisterInput input)
    {
        await authenticationService.RegisterAsync(input);

        return Created();
    }

    [HttpPost("refresh-tokens")]
    public async Task<ActionResult<Business.Models.TokensModel>> RefreshTokensAsync([FromBody] Business.Inputs.RefreshTokensInput input)
    {
        var tokensModel = await authenticationService.RefreshTokensAsync(input);

        return Ok(tokensModel);
    }

    [HttpPost("login")]
    public async Task<ActionResult<Business.Models.AccountModel<Business.User.Models.UserModel>>> LoginAsync([FromBody] Business.Inputs.LoginInput input)
    {
        var userModel = await authenticationService.LoginAsync(input);

        return Ok(userModel);
    }
}