using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class NoActiveRefreshTokenException() : AbstractException(
    StatusCodes.Status404NotFound,
    "No active refresh token found.",
    "Your session has expired. Please log in again."
);
