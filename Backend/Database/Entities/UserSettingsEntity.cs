namespace Database.Entities;

public class UserSettingsEntity
{
    public Guid Uuid { get; set; }
    public Guid UserUuid { get; set; }
    public UserEntity User { get; set; }
    public bool IsEmailVerified { get; set; }
    public DateTime? EmailVerifiedAt { get; set; }
}