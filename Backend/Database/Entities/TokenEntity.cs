using Database.Enums;

namespace Database.Entities;

public class TokenEntity
{
    public Guid Uuid { get; set; }
    public TokenTypeEnum Type { get; set; }
    public string Token { get; set; }
    public bool IsRevoked { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
}