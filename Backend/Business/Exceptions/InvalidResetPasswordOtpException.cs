using Microsoft.AspNetCore.Http;

namespace Business.Exceptions;

public class InvalidResetPasswordOtpException() : AbstractException(
    StatusCodes.Status401Unauthorized,
    "Invalid reset password OTP.",
    "The OTP you entered is incorrect. Please check your email and try again. Note that you have a limited number of attempts."
);
