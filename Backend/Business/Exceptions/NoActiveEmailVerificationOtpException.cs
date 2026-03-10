using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class NoActiveEmailVerificationOtpException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.NoActiveEmailVerificationOtp,
    "Please request a new email verification OTP."
);
