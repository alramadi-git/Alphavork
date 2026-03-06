using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class NoActiveResetPasswordTokenException() : AbstractException(
    StatusCodes.Status404NotFound,
    "No active reset password token found.",
    "Please restart the password reset process and verify your OTP again."
);
