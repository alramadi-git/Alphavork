namespace Business.User.Models;

public class UserModel
{
    public Guid Uuid { get; set; }
    public UserSettingsModel Settings { get; set; }
    public string? Avatar { get; set; }
    public LocationModel Location { get; set; }
    public string Username { get; set; }
    public DateOnly Birthday { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}