namespace Business.User.Inputs;

public class ResetPasswordInput
{
    public required string Email { get; set; }
    public required string ResetPasswordToken { get; set; }
    public required string NewPassword { get; set; }
}