using Microsoft.EntityFrameworkCore;

using Database.Entities;

namespace Database.Contexts;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TokenEntity> Tokens { get; set; }
    public DbSet<OtpEntity> Otps { get; set; }
    public DbSet<ImageEntity> Images { get; set; }
    public DbSet<LocationEntity> Locations { get; set; }
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<UserSettingsEntity> UserSettings { get; set; }
    public DbSet<UserTokenEntity> UserTokens { get; set; }
    public DbSet<UserOtpEntity> UserOtps { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (entityType.FindProperty("Uuid") != null)
            {
                modelBuilder.Entity(entityType.ClrType).HasKey("Uuid");
            }
        }

        base.OnModelCreating(modelBuilder);
    }
};
