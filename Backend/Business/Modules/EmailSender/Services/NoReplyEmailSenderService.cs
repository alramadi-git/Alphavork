using Microsoft.Extensions.Options;

using Business.Modules.EmailSender.Options;

namespace Business.Modules.EmailSender.Services;

public class NoReplyEmailSenderService(IOptions<NoReplyEmailSenderOption> noReplyEmailSenderOption) : AbstractEmailSenderService
{
    public async Task<bool> SendEmailAsync(string subject, string email, string body)
    {
        return await SendEmailAsync(noReplyEmailSenderOption.Value, subject, email, body);
    }
}