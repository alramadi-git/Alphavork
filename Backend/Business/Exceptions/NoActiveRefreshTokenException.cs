using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class NoActiveRefreshTokenException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.NoActiveRefreshToken,
    "Your session has expired. Please log in again."
);
