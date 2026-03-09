using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class AvatarAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    ExceptionTypeEnum.AvatarAlreadyExists,
    "Please delete your current avatar before uploading a new one."
);
