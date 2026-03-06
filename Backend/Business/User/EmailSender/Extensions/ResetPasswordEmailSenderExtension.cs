using Business.Interfaces;

using Business.Modules.EmailSender.Services;

namespace Business.User.EmailSender.Extensions;

public static class ResetPasswordEmailSenderExtension
{
    public static async Task<bool> SendResetPasswordOtpAsync(this NoReplyEmailSenderService emailSender, string email, string otp)
    {
        var assembly = typeof(IAssemblyReference).Assembly;

        var assemblyLocation = assembly.Location;

        var basePath = Path.GetDirectoryName(assemblyLocation);

        var bodyPath = Path.Combine(basePath, "User", "EmailSender", "Templates", "reset-password-otp-template.html");

        var body = (await File.ReadAllTextAsync(bodyPath))
        .Replace("{Otp}", otp);

        return await emailSender.SendEmailAsync("Your reset password otp", email, body);

    }
}