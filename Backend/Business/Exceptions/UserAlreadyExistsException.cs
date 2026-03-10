using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class UserAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    ExceptionTypeEnum.UserAlreadyExists,
    "An account with this email address or phone number already exists. Please use different details or log in."
);
