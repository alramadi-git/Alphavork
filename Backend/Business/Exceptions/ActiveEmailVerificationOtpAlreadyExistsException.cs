using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class ActiveEmailVerificationOtpAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    "An active email verification OTP already exists.",
    "Please wait for the current OTP to expire before requesting a new one. OTPs expire after 15 minutes."
);
