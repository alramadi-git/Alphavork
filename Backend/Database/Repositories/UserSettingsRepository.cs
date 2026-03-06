using Microsoft.EntityFrameworkCore;

using Database.Contexts;

using Database.Interfaces;

using Database.Entities;

namespace Database.Repositories;

public class UserSettingsRepository(AppDbContext context) : IRepository
{
    public async Task<UserSettingsEntity?> GetByUserUuidAsync(Guid uuid) => await context.UserSettings
    .AsNoTracking()
    .FirstOrDefaultAsync(userSettings => userSettings.UserUuid == uuid);

    public async Task<UserSettingsEntity?> GetByUserUuidTrackedAsync(Guid uuid) => await context.UserSettings
    .FirstOrDefaultAsync(userSettings => userSettings.UserUuid == uuid);

    public void Add(UserSettingsEntity entity) => context.UserSettings.Add(entity);
}