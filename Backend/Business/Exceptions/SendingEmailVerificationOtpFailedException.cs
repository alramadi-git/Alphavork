using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class SendingEmailVerificationOtpFailedException() : AbstractException(
    StatusCodes.Status502BadGateway,
    "Failed to send email verification OTP.",
    "The email service is temporarily unavailable. Please try again in a few minutes."
);
