using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class InvalidPasswordException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    ExceptionTypeEnum.InvalidPassword,
    "The password you entered is incorrect. Please try again."
);
