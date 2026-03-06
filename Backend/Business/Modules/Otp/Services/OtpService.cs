using System.Security.Cryptography;

using Business.Interfaces;

namespace Business.Modules.Otp.Services;

public class OtpService: IService
{
    public string Generate()
    {
        var bytes = new byte[6];

        using var randomNumberGenerator = RandomNumberGenerator.Create();
        randomNumberGenerator.GetBytes(bytes);

        return Convert.ToBase64String(bytes);
    }
}