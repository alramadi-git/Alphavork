using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;

using Business.Interfaces;

using Business.Modules.EmailSender.Options;

namespace Business.Modules.EmailSender.Services;

public abstract class AbstractEmailSenderService() : IService
{
    protected async Task<bool> SendEmailAsync(AbstractEmailSenderOption option, string subject, string email, string body)
    {
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(option.Email));
        message.To.Add(MailboxAddress.Parse(email));
        message.Subject = subject;
        message.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

        try
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(option.Host, option.Port, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(option.Email, option.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        catch
        {
            return false;
        }

        return true;
    }
}