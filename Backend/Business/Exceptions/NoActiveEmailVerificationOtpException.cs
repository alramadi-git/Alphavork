using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class NoActiveEmailVerificationOtpException() : AbstractException(
    StatusCodes.Status404NotFound,
    "No active email verification OTP found.",
    "Please request a new email verification OTP."
);
