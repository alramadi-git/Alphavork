using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class AvatarAlreadyExistsException() : AbstractException(
    StatusCodes.Status409Conflict,
    "An avatar already exists.",
    "Please delete your current avatar before uploading a new one."
);
