using Database.Enums;

namespace Database.Entities;

public class OtpEntity
{
    public Guid Uuid { get; set; }
    public OtpTypeEnum Type { get; set; }
    public string Otp { get; set; }
    public int Attempts { get; set; }
    public bool IsUsed { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
}