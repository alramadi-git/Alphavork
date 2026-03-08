using Microsoft.EntityFrameworkCore.Storage;

using Database.Interfaces;

using Database.Contexts;

namespace Database.UnitOfWork;

public class UnitOfWork(AppDbContext context) : IRepository
{
    public async Task<IDbContextTransaction> BeginTransactionAsync() => await context.Database.BeginTransactionAsync();

    public async Task CommitAsync() => await context.Database.CommitTransactionAsync();

    public async Task RollbackAsync() => await context.Database.RollbackTransactionAsync();

    public async Task SaveChangesAsync() => await context.SaveChangesAsync();
}