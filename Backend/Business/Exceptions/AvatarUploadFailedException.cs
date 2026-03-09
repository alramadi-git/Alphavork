using Microsoft.AspNetCore.Http;
using Business.Exceptions.Enums;

namespace Business.Exceptions;

public class AvatarUploadFailedException() : AbstractException(
    StatusCodes.Status502BadGateway,
    ExceptionTypeEnum.AvatarUploadFailed,
    "The image upload service is temporarily unavailable. Please try again later."
);
