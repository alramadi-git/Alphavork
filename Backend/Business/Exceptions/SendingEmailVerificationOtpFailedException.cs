using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class SendingEmailVerificationOtpFailedException() : AbstractException(
    StatusCodes.Status502BadGateway,
    ExceptionTypeEnum.SendingEmailVerificationOtpFailed,
    "The email service is temporarily unavailable. Please try again in a few minutes."
);
