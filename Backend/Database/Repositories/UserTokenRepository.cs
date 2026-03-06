using Microsoft.EntityFrameworkCore;

using Database.Contexts;

using Database.Interfaces;

using Database.Enums;

using Database.Entities;

namespace Database.Repositories;

public class UserTokenRepository(AppDbContext context) : IRepository
{
    public async Task<UserTokenEntity[]> GetAllActiveRefreshTokenByUserUuidTrackedAsync(Guid uuid) => await context.UserTokens
    .Include(userToken => userToken.Token)
    .Where(userToken =>
        userToken.UserUuid == uuid &&
        userToken.Token.Type == TokenTypeEnum.RefreshToken &&
        userToken.Token.IsRevoked == false &&
        userToken.Token.ExpiresAt > DateTime.UtcNow
    )
    .ToArrayAsync();

    public async Task<UserTokenEntity[]> GetAllActiveRefreshTokenByUserEmailTrackedAsync(string email) => await context.UserTokens
    .Include(userToken => userToken.Token)
    .Where(userToken =>
        userToken.User.Email == email &&
        userToken.Token.Type == TokenTypeEnum.RefreshToken &&
        userToken.Token.IsRevoked == false &&
        userToken.Token.ExpiresAt > DateTime.UtcNow
    )
    .ToArrayAsync();

    public async Task<UserTokenEntity?> GetActiveResetPasswordTokenByUserEmailTrackedAsync(string email) => await context.UserTokens
    .Include(userToken => userToken.Token)
    .FirstOrDefaultAsync(userToken =>
        userToken.User.Email == email &&
        userToken.Token.Type == TokenTypeEnum.ResetPasswordToken &&
        userToken.Token.IsRevoked == false &&
        userToken.Token.ExpiresAt > DateTime.UtcNow
    );

    public void Add(UserTokenEntity entity) => context.UserTokens.Add(entity);
}