DROP TABLE IF EXISTS "UserTokens",
"UserOtps",
"UserSettings",
"Users",
"Tokens",
"Otps",
"Images",
"Locations";

CREATE TABLE
    "Tokens" (
        "Uuid" UUID PRIMARY KEY,
        "Type" INT NOT NULL,
        "Token" TEXT NOT NULL UNIQUE,
        "IsRevoked" BOOLEAN NOT NULL,
        "ExpiresAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL
    );

CREATE TABLE
    "Otps" (
        "Uuid" UUID PRIMARY KEY,
        "Type" INT NOT NULL,
        "Otp" TEXT NOT NULL UNIQUE,
        "Attempts" INT NOT NULL,
        "IsUsed" BOOLEAN NOT NULL,
        "ExpiresAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL
    );

CREATE TABLE
    "Images" ("Id" TEXT PRIMARY KEY, "Url" TEXT NOT NULL);

CREATE TABLE
    "Locations" (
        "Uuid" UUID PRIMARY KEY,
        "Country" TEXT NOT NULL,
        "City" TEXT NOT NULL,
        "Street" TEXT NOT NULL
    );

CREATE TABLE
    "Users" (
        "Uuid" UUID PRIMARY KEY,
        "AvatarId" TEXT REFERENCES "Images" ("Id") UNIQUE,
        "LocationUuid" UUID NOT NULL REFERENCES "Locations" ("Uuid") UNIQUE,
        "Username" TEXT NOT NULL,
        "Birthday" DATE NOT NULL,
        "PhoneNumber" TEXT NOT NULL UNIQUE,
        "Email" TEXT NOT NULL UNIQUE,
        "Password" TEXT NOT NULL,
        "Status" INT NOT NULL,
        "IsDeleted" BOOLEAN NOT NULL,
        "DeletedAt" TIMESTAMP,
        "UpdatedAt" TIMESTAMP NOT NULL,
        "CreatedAt" TIMESTAMP NOT NULL
    );

CREATE INDEX "IDX_Users_AvatarId" ON "Users" ("AvatarId");

CREATE INDEX "IDX_Users_LocationUuid" ON "Users" ("LocationUuid");

CREATE TABLE
    "UserSettings" (
        "Uuid" UUID PRIMARY KEY,
        "UserUuid" UUID NOT NULL REFERENCES "Users" ("Uuid") UNIQUE,
        "IsEmailVerified" BOOLEAN NOT NULL,
        "EmailVerifiedAt" TIMESTAMP
    );

CREATE INDEX "IDX_UserSettings_UserUuid" ON "UserSettings" ("UserUuid");

CREATE TABLE
    "UserTokens" (
        "Uuid" UUID PRIMARY KEY,
        "UserUuid" UUID NOT NULL REFERENCES "Users" ("Uuid"),
        "TokenUuid" UUID NOT NULL REFERENCES "Tokens" ("Uuid") UNIQUE
    );

CREATE INDEX "IDX_UserTokens_UserUuid" ON "UserTokens" ("UserUuid");

CREATE INDEX "IDX_UserTokens_TokenUuid" ON "UserTokens" ("TokenUuid");

CREATE TABLE
    "UserOtps" (
        "Uuid" UUID PRIMARY KEY,
        "UserUuid" UUID NOT NULL REFERENCES "Users" ("Uuid"),
        "OtpUuid" UUID NOT NULL REFERENCES "Otps" ("Uuid") UNIQUE
    );

CREATE INDEX "IDX_UserOtps_UserUuid" ON "UserOtps" ("UserUuid");

CREATE INDEX "IDX_UserOtps_OtpUuid" ON "UserOtps" ("OtpUuid");