using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class EmailNotVerifiedException() : AbstractException(
    StatusCodes.Status400BadRequest,
    ExceptionTypeEnum.EmailNotVerified,
    "Please verify your email address before proceeding."
);
