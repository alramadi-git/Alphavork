namespace Business.Inputs;

public class LoginInput
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required bool RememberMe { get; set; }
}