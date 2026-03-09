using Microsoft.AspNetCore.Diagnostics;

using Business.Exceptions.Enums;
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
                ExceptionType = ExceptionTypeEnum.ValidationError,
                Help = string.Join(" ", validationEx.Errors.Select(e => e.ErrorMessage))
            },

            Business.Exceptions.AbstractException abstractEx => new Business.Models.ExceptionModel
            {
                StatusCode = abstractEx.StatusCode,
                ExceptionType = abstractEx.ExceptionType,
                Help = abstractEx.Help
            },

            _ => new Business.Models.ExceptionModel
            {
                StatusCode = StatusCodes.Status500InternalServerError,
                ExceptionType = ExceptionTypeEnum.UnexpectedError,
                Help = "If this problem persists, please contact support."
            }
        };

        httpContext.Response.StatusCode = exceptionModel.StatusCode;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(exceptionModel, cancellationToken);

        return true;
    }
}