using Business.Interfaces;

using Business.Modules.EmailSender.Services;

namespace Business.User.EmailSender.Extensions;

public static class EmailVerificationEmailSenderExtension
{
    public static async Task<bool> SendEmailVerificationOtpAsync(this NoReplyEmailSenderService emailSender, string email, string otp)
    {
        var assembly = typeof(IAssemblyReference).Assembly;

        var assemblyLocation = assembly.Location;

        var basePath = Path.GetDirectoryName(assemblyLocation);

        var bodyPath = Path.Combine(basePath, "User", "EmailSender", "Templates", "email-verification-otp-template.html");

        var body = (await File.ReadAllTextAsync(bodyPath))
        .Replace("{Otp}", otp);

        return await emailSender.SendEmailAsync("Your email verification otp", email, body);
    }
}