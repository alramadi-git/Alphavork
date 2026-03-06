using Microsoft.AspNetCore.Diagnostics;

using FluentValidation;

namespace Api.Middlewares;

public class GlobalExceptionMiddleware : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var exceptionModel = exception switch
        {
            ValidationException validationEx => new Business.Models.ExceptionModel
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = "One or more validation errors occurred. Please check your input and try again.",
                Help = string.Join(" ", validationEx.Errors.Select(e => e.ErrorMessage))
            },

            Business.Exceptions.AbstractException abstractEx => new Business.Models.ExceptionModel
            {
                StatusCode = abstractEx.StatusCode,
                Message = abstractEx.Message,
                Help = abstractEx.Help
            },

            _ => new Business.Models.ExceptionModel
            {
                StatusCode = StatusCodes.Status500InternalServerError,
                Message = "An unexpected error occurred. Please try again later.",
                Help = "If this problem persists, please contact support."
            }
        };

        httpContext.Response.StatusCode = exceptionModel.StatusCode;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(exceptionModel, cancellationToken);

        return true;
    }
}