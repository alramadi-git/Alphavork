using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class InvalidRefreshTokenException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    "Invalid refresh token.",
    "Your refresh token is invalid or has been revoked. Please log in again."
);
