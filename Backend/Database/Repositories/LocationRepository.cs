using Database.Contexts;

using Database.Interfaces;

using Database.Entities;

namespace Database.Repositories;

public class LocationRepository(AppDbContext context) : IRepository
{
    public void Add(LocationEntity entity) => context.Locations.Add(entity);
}