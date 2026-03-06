using Microsoft.EntityFrameworkCore;

using Database.Contexts;

using Database.Interfaces;

using Database.Entities;
using Database.Enums;

namespace Database.Repositories;

public class UserOtpRepository(AppDbContext context) : IRepository
{
    public async Task<bool> HasActiveResetPasswordOtpByUserEmailAsync(string email) => await context.UserOtps
    .AsNoTracking()
    .AnyAsync(userOtp =>
        userOtp.User.Email == email &&
        userOtp.Otp.Type == OtpTypeEnum.ResetPasswordOtp &&
        userOtp.Otp.Attempts < 3 &&
        userOtp.Otp.IsUsed == false &&
        userOtp.Otp.ExpiresAt > DateTime.UtcNow
    );


    public async Task<UserOtpEntity?> GetActiveResetPasswordOtpByUserEmailTrackedAsync(string email) => await context.UserOtps
    .Include(userOtp => userOtp.Otp)
    .FirstOrDefaultAsync(userOtp =>
        userOtp.User.Email == email &&
        userOtp.Otp.Type == OtpTypeEnum.ResetPasswordOtp &&
        userOtp.Otp.Attempts < 3 &&
        userOtp.Otp.IsUsed == false &&
        userOtp.Otp.ExpiresAt > DateTime.UtcNow
    );

    public async Task<bool> HasActiveEmailVerificationOtpByUserEmailAsync(string email) => await context.UserOtps
    .AsNoTracking()
    .AnyAsync(userOtp =>
        userOtp.User.Email == email &&
        userOtp.Otp.Type == OtpTypeEnum.EmailVerificationOtp &&
        userOtp.Otp.Attempts < 3 &&
        userOtp.Otp.IsUsed == false &&
        userOtp.Otp.ExpiresAt > DateTime.UtcNow
    );


    public async Task<UserOtpEntity?> GetActiveEmailVerificationOtpByUserEmailTrackedAsync(string email) => await context.UserOtps
    .Include(userOtp => userOtp.Otp)
    .FirstOrDefaultAsync(userOtp =>
        userOtp.User.Email == email &&
        userOtp.Otp.Type == OtpTypeEnum.EmailVerificationOtp &&
        userOtp.Otp.Attempts < 3 &&
        userOtp.Otp.IsUsed == false &&
        userOtp.Otp.ExpiresAt > DateTime.UtcNow
    );

    public void Add(UserOtpEntity entity) => context.UserOtps.Add(entity);
}