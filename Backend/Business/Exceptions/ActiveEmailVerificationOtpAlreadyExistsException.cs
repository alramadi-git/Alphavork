using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class ActiveEmailVerificationOtpAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    ExceptionTypeEnum.ActiveEmailVerificationOtpAlreadyExists,
    "Please wait for the current OTP to expire before requesting a new one. OTPs expire after 15 minutes."
);
