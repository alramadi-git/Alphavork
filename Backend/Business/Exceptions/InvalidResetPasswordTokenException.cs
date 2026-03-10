using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class InvalidResetPasswordTokenException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    ExceptionTypeEnum.InvalidResetPasswordToken,
    "Your reset password token is invalid or has expired. Please restart the password reset process."
);
