using Database.Contexts;

using Database.Interfaces;

using Database.Entities;

namespace Database.Repositories;

public class ImageRepository(AppDbContext context) : IRepository
{
    public void Add(ImageEntity entity) => context.Images.Add(entity);

    public void Remove(ImageEntity entity) => context.Images.Remove(entity);
}