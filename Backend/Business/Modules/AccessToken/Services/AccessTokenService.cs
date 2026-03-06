using System.Text;

using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Business.Interfaces;

using Business.Modules.AccessToken.Options;

namespace Business.Modules.AccessToken.Services;

public class AccessTokenService<TAccessTokenOption>(IOptions<TAccessTokenOption> option) : IService
where TAccessTokenOption : AbstractAccessTokenOption
{
    public string Generate(IEnumerable<Claim> claims)
    {
        var signing = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(option.Value.SecretKey)), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            option.Value.Issuer,
            option.Value.Audience,
            claims,
            null,
            DateTime.UtcNow.AddMinutes(option.Value.Expires),
            signing
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}