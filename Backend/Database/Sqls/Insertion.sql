INSERT INTO
    "Locations" ("Uuid", "Country", "City", "Street")
VALUES
    (
        'c9574dfc-7d4a-4592-b901-786911a51c75',
        'Kingdom of Saudi Arabia',
        'Riyadh',
        'King Fahd Rd, Al Olaya'
    );

INSERT INTO
    "Users" (
        "Uuid",
        "AvatarId",
        "LocationUuid",
        "Username",
        "Birthday",
        "PhoneNumber",
        "Email",
        "Password",
        "Status",
        "IsDeleted",
        "DeletedAt",
        "UpdatedAt",
        "CreatedAt"
    )
VALUES
    (
        'a7b8c9d0-e1f2-4a3b-8c7d-6e5f4a3b2c1d',
        NULL,
        'c9574dfc-7d4a-4592-b901-786911a51c75',
        'Mohammed Al-Qahtani',
        '1990-03-15',
        '+966501234567',
        'user@alphavork.com',
        'AQAAAAIAAYagAAAAEMMuRCUkVTk4MlTridMkC3Ro0QRTq1Iva+vUIt2grtnSqmwF4U8f2l/GDLpkt312Qw==',
        0,
        FALSE,
        NULL,
        NOW (),
        NOW ()
    );

INSERT INTO
    "UserSettings" (
        "Uuid",
        "UserUuid",
        "IsEmailVerified",
        "EmailVerifiedAt"
    )
VALUES
    (
        'f1e2d3c4-b5a6-7890-abcd-ef1234567890',
        'a7b8c9d0-e1f2-4a3b-8c7d-6e5f4a3b2c1d',
        TRUE,
        NOW ()
    );