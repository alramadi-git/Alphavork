using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class UserNotFoundException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.UserNotFound,
    "The requested user account could not be found."
);
