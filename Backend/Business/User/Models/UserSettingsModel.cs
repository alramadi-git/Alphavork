namespace Business.User.Models;

public class UserSettingsModel
{
    public bool IsEmailVerified { get; set; }
    public DateTime? EmailVerifiedAt { get; set; }
}