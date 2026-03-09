using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class ActiveResetPasswordOtpAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    ExceptionTypeEnum.ActiveResetPasswordOtpAlreadyExists,
    "Please wait for the current OTP to expire before requesting a new one. OTPs expire after 15 minutes."
);
