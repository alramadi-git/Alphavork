using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class InvalidEmailVerificationOtpException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    ExceptionTypeEnum.InvalidEmailVerificationOtp,
    "The OTP you entered is incorrect. Please check your email and try again. Note that you have a limited number of attempts."
);
