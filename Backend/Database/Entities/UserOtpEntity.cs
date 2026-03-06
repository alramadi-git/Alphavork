namespace Database.Entities;

public class UserOtpEntity
{
    public Guid Uuid { get; set; }
    public Guid UserUuid { get; set; }
    public UserEntity User { get; set; }
    public Guid OtpUuid { get; set; }
    public OtpEntity Otp { get; set; }
}