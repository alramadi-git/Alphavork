using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class SamePasswordException() : AbstractException(
    StatusCodes.Status400BadRequest,
    ExceptionTypeEnum.SamePassword,
    "Please choose a password you have not used before on this account."
);
