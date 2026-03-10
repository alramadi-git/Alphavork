using System.Text;

using System.Security.Claims;

using System.Threading.RateLimiting;

using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Scalar.AspNetCore;

using FluentValidation;


var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
// Database
// -------------------------------------------------------
builder.Services.AddDbContext<Database.Contexts.AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// -------------------------------------------------------
// Scrutor
// -------------------------------------------------------
builder.Services.Scan(scan => scan
    .FromAssemblies(
        typeof(Database.Interfaces.IAssemblyReference).Assembly,
        typeof(Business.Interfaces.IAssemblyReference).Assembly
    )
    .AddClasses(c => c.AssignableTo<Database.Interfaces.IRepository>()).AsSelf().WithScopedLifetime()
    .AddClasses(c => c.AssignableTo<Business.Interfaces.IService>()).AsSelf().WithScopedLifetime()
    .AddClasses(c => c.AssignableTo<Business.Interfaces.IGuard>()).AsSelf().WithScopedLifetime()
    .AddClasses(c => c.AssignableTo(typeof(IValidator<>))).AsSelf().WithScopedLifetime()
);

// -------------------------------------------------------
// AutoMapper
// -------------------------------------------------------
builder.Services.AddAutoMapper(config =>
{
    // e.g., if using a license key in v15+:
    // config.LicenseKey = "<your license>";
}, typeof(Business.Interfaces.IAssemblyReference));

// -------------------------------------------------------
// Miscellaneous services
// -------------------------------------------------------
builder.Services.AddSingleton<PasswordHasher<object?>>();

// -------------------------------------------------------
// Options
// -------------------------------------------------------
var userAccessTokenOption = builder.Configuration
.GetSection("AccessTokens:UserAccessToken")
.Get<Business.User.Options.UserAccessTokenOption>()!;

builder.Services.Configure<Business.Modules.Imagekit.Options.ImagekitOption>(builder.Configuration.GetSection("Imagekit"));

builder.Services.Configure<Business.Modules.EmailSender.Options.NoReplyEmailSenderOption>(builder.Configuration.GetSection("EmailSenders:NoReplyEmailSender"));

builder.Services.Configure<Business.User.Options.UserAccessTokenOption>(builder.Configuration.GetSection("AccessTokens:UserAccessToken"));

// -------------------------------------------------------
// Rate Limiter
// -------------------------------------------------------
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.ContentType = "application/json";

        await context.HttpContext.Response.WriteAsJsonAsync(new Business.Models.ExceptionModel
        {
            StatusCode = StatusCodes.Status429TooManyRequests,
            ExceptionType = Business.Exceptions.Enums.ExceptionTypeEnum.TooManyRequests,
            Help = "You are sending requests too fast. Please slow down and try again later."
        }, cancellationToken);
    };

    options.AddPolicy("AuthenticationLimiter", httpContext =>
    {
        var ip = httpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault() ?? httpContext.Connection.RemoteIpAddress?.ToString();
        var path = httpContext.Request.Path.ToString();

        var key = $"{ip ?? "unknown"}:{path}";

        return RateLimitPartition.GetSlidingWindowLimiter(key, _ => new SlidingWindowRateLimiterOptions
        {
            PermitLimit = 100,
            Window = TimeSpan.FromDays(1),
            SegmentsPerWindow = 24,
            QueueLimit = 0,
        });
    });

    options.AddPolicy("ResetPasswordLimiter", httpContext =>
    {
        var ip = httpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault() ?? httpContext.Connection.RemoteIpAddress?.ToString();
        var path = httpContext.Request.Path.ToString();

        var key = $"{ip ?? "unknown"}:{path}";

        return RateLimitPartition.GetSlidingWindowLimiter(key, _ => new SlidingWindowRateLimiterOptions
        {
            PermitLimit = 5,
            Window = TimeSpan.FromMinutes(15),
            SegmentsPerWindow = 5,
            QueueLimit = 0,
        });
    });

    options.AddPolicy("AccountLimiter", httpContext =>
    {
        var uuid = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var path = httpContext.Request.Path.ToString();

        var key = $"{uuid ?? "unknown"}:{path}";

        return RateLimitPartition.GetSlidingWindowLimiter(key, _ => new SlidingWindowRateLimiterOptions
        {
            PermitLimit = 60,
            Window = TimeSpan.FromMinutes(1),
            SegmentsPerWindow = 6,
            QueueLimit = 0,
        });
    });
});

// -------------------------------------------------------
// Authentication
// -------------------------------------------------------
builder.Services
.AddAuthentication()
.AddJwtBearer("User", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = userAccessTokenOption.Issuer,
        ValidAudience = userAccessTokenOption.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(userAccessTokenOption.SecretKey))
    };
    options.Events = new JwtBearerEvents
    {
        OnChallenge = async context =>
        {
            context.HandleResponse();

            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(new Business.Models.ExceptionModel
            {
                StatusCode = StatusCodes.Status401Unauthorized,
                ExceptionType = context.AuthenticateFailure switch
                {
                    SecurityTokenExpiredException => Business.Exceptions.Enums.ExceptionTypeEnum.ExpiredAccessToken,
                    null => Business.Exceptions.Enums.ExceptionTypeEnum.MissingAccessToken,
                    _ => Business.Exceptions.Enums.ExceptionTypeEnum.InvalidAccessToken
                },
                Help = "Please provide a valid Bearer token in the Authorization header."
            });
        },

        OnForbidden = async context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(new Business.Models.ExceptionModel
            {
                StatusCode = StatusCodes.Status403Forbidden,
                ExceptionType = Business.Exceptions.Enums.ExceptionTypeEnum.Forbidden,
                Help = "This action requires elevated privileges."
            });
        }
    };
});

// -------------------------------------------------------
// Add CORS policy
// -------------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AlphavorkWebsitePolicy", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
        if (builder.Environment.IsProduction())
        {
            policy
            .WithOrigins("https://alphavork.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
    });
});

builder.Services.AddExceptionHandler<Api.Middlewares.GlobalExceptionMiddleware>();
builder.Services.AddProblemDetails();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.UseCors("AlphavorkWebsitePolicy");

app.UseRateLimiter();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();