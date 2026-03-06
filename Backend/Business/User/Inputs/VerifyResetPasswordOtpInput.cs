namespace Business.User.Inputs;

public class VerifyResetPasswordOtpInput
{
    public required string Email { get; set; }
    public required string Otp { get; set; }
}