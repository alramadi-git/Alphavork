using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class EmailAlreadyVerifiedException() : AbstractException(
    StatusCodes.Status409Conflict,
    ExceptionTypeEnum.EmailAlreadyVerified,
    "Your email address is already verified. No further action is needed."
);
