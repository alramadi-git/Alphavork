using Microsoft.EntityFrameworkCore;

using Database.Contexts;

using Database.Interfaces;

using Database.Entities;
using Database.Enums;

namespace Database.Repositories;

public class UserRepository(AppDbContext context) : IRepository
{
    public async Task<bool> IsExistByPhoneNumberAndEmailAsync(string phoneNumber, string email) => await context.Users
    .AsNoTracking()
    .AnyAsync(user =>
        (user.PhoneNumber == phoneNumber || user.Email == email) &&
        user.IsDeleted == false
    );

    public async Task<UserEntity?> GetActiveByUuidAsync(Guid uuid) => await context.Users
    .AsNoTracking()
    .Include(user => user.Avatar)
    .Include(user => user.Location)
    .FirstOrDefaultAsync(user =>
        user.Uuid == uuid &&
        user.Status == StatusEnum.Active &&
        user.IsDeleted == false
    );

    public async Task<UserEntity?> GetActiveByUuidTrackedAsync(Guid uuid) => await context.Users
    .Include(user => user.Avatar)
    .Include(user => user.Location)
    .FirstOrDefaultAsync(user =>
        user.Uuid == uuid &&
        user.Status == StatusEnum.Active &&
        user.IsDeleted == false
    );

    public async Task<UserEntity?> GetActiveUserByEmailAsync(string email) => await context.Users
    .AsNoTracking()
    .Include(user => user.Avatar)
    .Include(user => user.Location)
    .FirstOrDefaultAsync(user =>
        user.Email == email &&
        user.Status == StatusEnum.Active &&
        user.IsDeleted == false
    );

    public void Add(UserEntity entity) => context.Users.Add(entity);
}