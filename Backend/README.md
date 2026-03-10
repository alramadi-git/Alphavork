# Alphavork Backend

A production-ready **.NET 10 / ASP.NET Core** REST API backed by **PostgreSQL**. Covers the full user lifecycle — registration, login, multi-session token management, email verification, password reset, and avatar management — with a strict 3-layer architecture designed to scale.

---

## Tech Stack

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Framework        | .NET 10 / ASP.NET Core                 |
| Database         | PostgreSQL                             |
| ORM              | Entity Framework Core                  |
| Validation       | FluentValidation                       |
| Mapping          | AutoMapper                             |
| DI Registration  | Scrutor                                |
| Hashing          | PBKDF2 (Microsoft.AspNetCore.Identity) |
| Email            | MailKit                                |
| CDN              | Imagekit                               |
| Phone Validation | libphonenumber-csharp                  |

---

## Architecture

```
Api           → Controllers, Middleware, Program.cs
Business      → Services, Guards, Validators, Models, Exceptions
Database      → Entities, Repositories, UnitOfWork, Schema
```

The layers are strictly separated. Api depends on Business. Business depends on Database. No layer reaches upward.

---

## Features

**Authentication**

- Register with location, birthday, phone number, email, and password
- Login with RememberMe support (1 day or 30 day refresh token lifetime)
- Multi-session support — all devices stay logged in independently
- Refresh tokens — rotate on every use, carry original expiry
- JWT access tokens — 15 minute lifetime, validated on every request
- Password rehash-on-login when PBKDF2 iteration cost increases

**Account Management**

- Get account (returns full profile including settings)
- Update profile — username, birthday, phone number, location
- Change email — revokes all active sessions, resets email verification
- Change password — revokes all active sessions
- Add / delete avatar via Imagekit CDN
- Logout — revokes the specific session by refresh token

**Email Verification**

- Send OTP — hashed, 15 minute expiry, max 3 attempts
- Verify OTP — marks email as verified with timestamp

**Password Reset**

- Step 1: Send OTP to email (requires verified email)
- Step 2: Verify OTP — issues a short-lived reset password token (30 min)
- Step 3: Reset password using token — revokes all active sessions

**Security**

- All passwords hashed with PBKDF2
- All OTPs and tokens hashed before storage — never stored in plain text
- Tokens verified by hash comparison, never by plain value lookup
- UUIDs throughout — no sequential integer IDs
- Ownership enforced via JWT UUID only — no user-controlled ID parameters
- Soft delete and status fields for safe user deactivation
- Rate limiting on all endpoints — sliding window, per endpoint per key
- CORS locked per environment

---

## Rate Limiting

| Policy                  | Endpoints                       | Window | Limit | Key             |
| ----------------------- | ------------------------------- | ------ | ----- | --------------- |
| `AuthenticationLimiter` | register, login, refresh-tokens | 1 day  | 100   | IP + endpoint   |
| `ResetPasswordLimiter`  | send OTP, verify OTP, reset     | 15 min | 5     | IP + endpoint   |
| `AccountLimiter`        | all account endpoints           | 1 min  | 60    | UUID + endpoint |

Production deployments behind a reverse proxy — reads `X-Forwarded-For` before falling back to `RemoteIpAddress`.

---

## Exception Handling

All exceptions inherit `AbstractException` with a status code, typed exception enum, and help text. The global middleware catches every exception and returns a consistent JSON shape:

```json
{
  "statusCode": 404,
  "exceptionType": "AccountNotRegistered",
  "help": "No account found with the provided details. Please check your credentials or create a new account."
}
```

JWT errors (missing, expired, invalid token) return the same shape via `JwtBearerEvents`.

---

## Database Schema

```
Tokens          — refresh tokens and reset password tokens
Otps            — email verification and reset password OTPs
Images          — avatar records (Imagekit ID + URL)
Locations       — user location (country, city, street)
Users           — core user record
UserSettings    — email verification state per user
UserTokens      — junction: user ↔ token (one user, many tokens)
UserOtps        — junction: user ↔ otp (one user, many OTPs)
```

All foreign key columns are explicitly indexed. Junction tables allow multiple active tokens and OTPs per user.

---

## Getting Started

**Prerequisites**

- .NET 10 SDK
- PostgreSQL
- Imagekit account
- Gmail account (or any SMTP)

**1. Clone the repository**

```bash
git clone https://github.com/your-username/alphavork-backend.git
cd alphavork-backend
```

**2. Create the database**

Run `Database/Sqls/Schema.sql` against your PostgreSQL instance.

**3. Configure secrets**

Use .NET user secrets — nothing sensitive goes in `appsettings.json`.

```bash
cd Api
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=alphavork;Username=postgres;Password=yourpassword"
dotnet user-secrets set "AccessTokens:UserAccessToken:SecretKey" "your-secret-key-min-32-chars"
dotnet user-secrets set "Imagekit:PublicKey" "your-imagekit-public-key"
dotnet user-secrets set "Imagekit:PrivateKey" "your-imagekit-private-key"
dotnet user-secrets set "EmailSenders:NoReplyEmailSender:Email" "noreply@yourdomain.com"
dotnet user-secrets set "EmailSenders:NoReplyEmailSender:Password" "your-email-password"
```

**4. Run**

```bash
dotnet run --project Api
```

API reference available at `http://localhost:5170/scalar` in development.

---

## API Endpoints

### Authentication — `api/authentication`

| Method | Route             | Auth | Description              |
| ------ | ----------------- | ---- | ------------------------ |
| POST   | `/register`       | —    | Create a new account     |
| POST   | `/login`          | —    | Login and receive tokens |
| POST   | `/refresh-tokens` | —    | Rotate refresh token     |

### Account — `api/account`

| Method | Route                            | Auth | Description              |
| ------ | -------------------------------- | ---- | ------------------------ |
| GET    | `/`                              | ✓    | Get full account profile |
| PATCH  | `/`                              | ✓    | Update profile           |
| PATCH  | `/change-email`                  | ✓    | Change email address     |
| PATCH  | `/change-password`               | ✓    | Change password          |
| POST   | `/avatar`                        | ✓    | Upload avatar            |
| DELETE | `/avatar`                        | ✓    | Delete avatar            |
| POST   | `/send-email-verification-otp`   | ✓    | Send verification OTP    |
| POST   | `/verify-email-verification-otp` | ✓    | Verify email             |
| POST   | `/logout`                        | ✓    | Logout current session   |

### Reset Password — `api/reset-password`

| Method | Route                        | Auth | Description                     |
| ------ | ---------------------------- | ---- | ------------------------------- |
| POST   | `/send-reset-password-otp`   | —    | Send OTP to email               |
| POST   | `/verify-reset-password-otp` | —    | Verify OTP, receive reset token |
| POST   | `/`                          | —    | Reset password using token      |

---

## Project Structure

```
Backend/
├── Api/
│   ├── Middlewares/         # GlobalExceptionMiddleware
│   ├── User/Controllers/    # AuthenticationController, AccountController, ResetPasswordController
│   ├── Api.http             # Request collection for all endpoints
│   └── Program.cs
├── Business/
│   ├── Exceptions/          # AbstractException + all typed exceptions
│   ├── Inputs/              # Shared input models
│   ├── Models/              # Shared response models
│   ├── Modules/
│   │   ├── AccessToken/     # JWT generation
│   │   ├── EmailSender/     # MailKit SMTP service
│   │   ├── Hashing/         # PBKDF2 wrapper
│   │   ├── Imagekit/        # CDN upload/delete
│   │   ├── Otp/             # Cryptographic OTP generation
│   │   ├── Token/           # Cryptographic token generation
│   │   └── Validations/     # FluentValidation extensions and shared validators
│   └── User/
│       ├── EmailSender/     # Branded email templates
│       ├── Guards/          # Validation orchestration layer
│       ├── Inputs/          # User-specific input models
│       ├── Models/          # User, Settings, Location models
│       ├── Options/         # JWT options
│       ├── Profiles/        # AutoMapper profiles
│       ├── Services/        # AuthenticationService, AccountService, ResetPasswordService
│       └── Validators/      # User-specific validators
└── Database/
    ├── Contexts/            # AppDbContext
    ├── Entities/            # All EF entities
    ├── Enums/               # StatusEnum, TokenTypeEnum, OtpTypeEnum
    ├── Interfaces/          # IRepository, IAssemblyReference
    ├── Repositories/        # All repositories
    ├── Sqls/                # Schema.sql, DBML diagram
    └── UnitOfWork/          # Transaction management
```

---

## License

Free to use for personal and commercial projects.

If this saved you time, a credit would mean a lot —

> Built on [Alphavork Backend](https://github.com/alramadi-git/Alphavork/tree/main/Backend) by [Nawaf Alramadi](https://github.com/alramadi-git)

No obligation. But it helps others find it, and it took a while to build right.
