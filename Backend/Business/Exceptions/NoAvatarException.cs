using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class NoAvatarException() : AbstractException(
    StatusCodes.Status404NotFound,
    "No avatar found.",
    "You do not have an avatar. Please upload one first."
);
