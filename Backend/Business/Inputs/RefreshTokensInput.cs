namespace Business.Inputs;

public class RefreshTokensInput
{
    public required string Email { get; set; }
    public required string RefreshToken { get; set; }
}