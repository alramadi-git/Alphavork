using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class NoActiveResetPasswordTokenException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.NoActiveResetPasswordToken,
    "Please restart the password reset process and verify your OTP again."
);
