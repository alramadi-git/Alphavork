using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class NoActiveResetPasswordOtpException() : AbstractException(
    StatusCodes.Status404NotFound,
    "No active reset password OTP found.",
    "Please request a new reset password OTP."
);
