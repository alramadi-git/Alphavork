# Alphavork

A full-stack platform for authentication, account management, and beyond. Built with a clean separation between the backend API and the frontend web application.

---

## Repository Structure

```
Alphavork/
├── Backend/     # .NET 10 REST API — authentication, account management, sessions
└── Website/     # Frontend web application (Angular) — coming soon
```

---

## Modules

### Backend
A production-ready .NET 10 / ASP.NET Core API on PostgreSQL covering the full user lifecycle — registration, login, multi-session token management, email verification, password reset, and avatar management.

→ See [`Backend/README.md`](./Backend/README.md) for full documentation.

**Key highlights:**
- JWT access tokens + rotating refresh tokens with multi-session support
- PBKDF2 password hashing, OTP-based email verification and password reset
- 3-layer architecture (Api → Business → Database)
- Rate limiting, global exception handling, CORS configuration

---

### Website *(coming soon)*
The frontend web application for Alphavork, built with **Angular**. Will provide a polished UI on top of the Backend API.

---

## License

Free to use for personal and commercial projects.

If this saved you time, a credit would mean a lot —

> Built by [Nawaf Alramadi](https://github.com/alramadi-git)

No obligation. But it helps others find it, and it took a while to build right.
