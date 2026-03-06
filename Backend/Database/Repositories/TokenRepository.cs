using Database.Contexts;

using Database.Interfaces;

using Database.Entities;

namespace Database.Repositories;

public class TokenRepository(AppDbContext context) : IRepository
{
    public void Add(TokenEntity entity) => context.Tokens.Add(entity);
}