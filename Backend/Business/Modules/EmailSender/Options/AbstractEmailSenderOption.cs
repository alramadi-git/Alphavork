namespace Business.Modules.EmailSender.Options;

public abstract class AbstractEmailSenderOption
{
    public string Host { get; set; }
    public int Port { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}