using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class NoActiveResetPasswordOtpException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.NoActiveResetPasswordOtp,
    "Please request a new reset password OTP."
);
