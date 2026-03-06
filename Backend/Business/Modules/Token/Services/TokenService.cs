using System.Security.Cryptography;

using Business.Interfaces;

namespace Business.Modules.Token.Services;

public class TokenService : IService
{
    public string Generate()
    {
        var bytes = new byte[24];

        using var randomNumberGenerator = RandomNumberGenerator.Create();
        randomNumberGenerator.GetBytes(bytes);

        return Convert.ToBase64String(bytes);
    }
}