using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class SameEmailException() : AbstractException(
    StatusCodes.Status400BadRequest,
    "New email must be different from your current email.",
    "Please provide an email address different from the one currently on your account."
);
