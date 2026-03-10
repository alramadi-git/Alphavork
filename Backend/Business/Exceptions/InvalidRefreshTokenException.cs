using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class InvalidRefreshTokenException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    ExceptionTypeEnum.InvalidRefreshToken,
    "Your refresh token is invalid or has been revoked. Please log in again."
);
