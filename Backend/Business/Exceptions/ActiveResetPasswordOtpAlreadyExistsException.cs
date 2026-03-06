using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class ActiveResetPasswordOtpAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    "An active reset password OTP already exists.",
    "Please wait for the current OTP to expire before requesting a new one. OTPs expire after 15 minutes."
);
