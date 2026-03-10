using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class SameEmailException() : AbstractException(
    StatusCodes.Status400BadRequest,
    ExceptionTypeEnum.SameEmail,
    "Please provide an email address different from the one currently on your account."
);
