using Database.Contexts;

using Database.Interfaces;

using Database.Entities;

namespace Database.Repositories;

public class OtpRepository(AppDbContext context) : IRepository
{
    public void Add(OtpEntity entity) => context.Otps.Add(entity);
}