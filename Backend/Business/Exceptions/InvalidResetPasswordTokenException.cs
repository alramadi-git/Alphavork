using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class InvalidResetPasswordTokenException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    "Invalid reset password token.",
    "Your reset password token is invalid or has expired. Please restart the password reset process."
);
