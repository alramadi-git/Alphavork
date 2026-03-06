using Microsoft.AspNetCore.Identity;

using Business.Interfaces;

namespace Business.Modules.Hashing.Services;

public class HashingService(PasswordHasher<object?> hasher) : IService
{
    public string Hash(string hash) => hasher.HashPassword(null, hash);
    public PasswordVerificationResult Verify(string hashedHash, string hash) => hasher.VerifyHashedPassword(null, hashedHash, hash);
}