using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class SendingResetPasswordOtpFailedException() : AbstractException(
    StatusCodes.Status502BadGateway,
    "Failed to send reset password OTP.",
    "The email service is temporarily unavailable. Please try again in a few minutes."
);
