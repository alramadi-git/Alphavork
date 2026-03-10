using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class SendingResetPasswordOtpFailedException() : AbstractException(
    StatusCodes.Status502BadGateway,
    ExceptionTypeEnum.SendingResetPasswordOtpFailed,
    "The email service is temporarily unavailable. Please try again in a few minutes."
);
