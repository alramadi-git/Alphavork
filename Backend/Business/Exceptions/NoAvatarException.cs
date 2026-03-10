using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class NoAvatarException() : AbstractException(
    StatusCodes.Status404NotFound,
    ExceptionTypeEnum.NoAvatar,
    "You do not have an avatar. Please upload one first."
);
