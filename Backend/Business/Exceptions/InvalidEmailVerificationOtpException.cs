using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class InvalidEmailVerificationOtpException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    "Invalid email verification OTP.",
    "The OTP you entered is incorrect. Please check your email and try again. Note that you have a limited number of attempts."
);
