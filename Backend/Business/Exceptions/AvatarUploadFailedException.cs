using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class AvatarUploadFailedException() : AbstractException(
    StatusCodes.Status502BadGateway,
    "Avatar upload failed.",
    "The image upload service is temporarily unavailable. Please try again later."
);
