# LibraryFullstack

LibraryFullstack är en enkel fullstack-webbapplikation för ett bibliotekssystem.

Projektet består av en ASP.NET Core Web API-backend och en React-frontend. Applikationen låter användare se böcker, logga in, låna böcker och lämna tillbaka böcker. Admin kan även lägga till och ta bort böcker.

## Funktioner

* Visa alla böcker
* Visa kategorier
* Logga in med JWT
* Admin kan ändra böcker
* Rollbaserad behörighet
* Admin kan lägga till böcker
* Admin kan ta bort böcker
* Inloggade användare kan låna böcker
* Inloggade användare kan lämna tillbaka böcker
* React-frontend som kommunicerar med .NET API

## Roller

Det finns två roller i systemet:

* Admin
* User

Exempelkonton:

Admin:

* Användarnamn: admin
* Lösenord: admin123

User:

* Användarnamn: user
* Lösenord: user123

## Tekniker

Backend:

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server LocalDB
* JWT Authentication
* C#

Frontend:

* React
* Vite
* JavaScript
* HTML/CSS
* Fetch API

## Datamodeller

Projektet använder följande modeller:

* Book
* Category
* Loan
* AppUser

Book är kopplad till Category. 
Loan är kopplad till Book. AppUser används för inloggning och roller.

## Hur man kör backend

1. Öppna projektet i Visual Studio.
2. Starta backend-projektet `LibraryApi`.
3. API:t körs på exempelvis:

```text
https://localhost:7174
```

Exempel på endpoint:

```text
https://localhost:7174/api/books
```

## Hur man kör frontend

Gå till frontend-mappen:

```bash
cd library-frontend
```

Installera paket:

```bash
npm install
```

Starta React:

```bash
npm run dev
```

Frontend körs på:

```text
http://localhost:5173
```

## API-endpoints

Exempel på endpoints:

```text
GET /api/books
GET /api/books/{id}
POST /api/books
DELETE /api/books/{id}

GET /api/categories

POST /api/auth/login
POST /api/auth/register

GET /api/loans
POST /api/loans
PUT /api/loans/{id}/return
```

## Säkerhet

Projektet använder JWT-token för autentisering. När användaren loggar in skapas en token. Den skickas sedan med i Authorization-headern vid skyddade API-anrop.

Admin-rollen krävs för att lägga till och ta bort böcker.

## Gruppmedlemmar

* Ammar K

## Kort reflektion

Projektet visar hur frontend och backend kan kopplas ihop i en fullstack-applikation. Backend hanterar databas, API-endpoints, autentisering och roller.
Frontend använder React för att visa data och skicka anrop till API:t.
