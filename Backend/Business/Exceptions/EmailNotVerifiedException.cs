using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class EmailNotVerifiedException() : AbstractException(
    StatusCodes.Status400BadRequest,
    "Email is not verified.",
    "Please verify your email address before proceeding."
);
