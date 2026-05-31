# Kort rapport – LibraryFullstack

## Projektbeskrivning

LibraryFullstack är en fullstack-webbapplikation för ett bibliotekssystem. 
Syftet med projektet är att visa hur en frontend byggd i React kan kommunicera med en backend byggd i ASP.NET Core Web API. 
Applikationen använder en databas via Entity Framework Core och har inloggning med JWT-token samt rollbaserad behörighet.

Systemet låter användare se böcker, logga in, låna böcker och lämna tillbaka böcker. 
En administratör kan även lägga till, ändra och ta bort böcker.

## Tekniker

Backend är byggd med ASP.NET Core Web API, C#, Entity Framework Core och SQL Server LocalDB. 
Frontend är byggd med React, Vite, JavaScript, HTML och CSS. Kommunikationen mellan frontend och backend sker med HTTP-anrop där data skickas som JSON.

## Datamodeller

Projektet använder fyra modeller:

* Book
* Category
* Loan
* AppUser

Book representerar en bok i biblioteket. Category används för att kategorisera böcker. 
Loan används för att spara information om utlåning och återlämning. AppUser används för inloggning och roller.

Det finns relationer mellan modellerna. En bok tillhör en kategori, och ett lån är kopplat till en bok.

## Funktioner

Applikationen har följande funktioner:

* Visa alla böcker
* Visa kategorier
* Logga in som användare eller admin
* Låna böcker
* Lämna tillbaka böcker
* Admin kan lägga till böcker
* Admin kan ändra böcker
* Admin kan ta bort böcker

Huvudresursen i projektet är Book. För Book finns full CRUD-funktionalitet: skapa, läsa, uppdatera och ta bort.

## Autentisering och roller

Projektet använder JWT för inloggning. När en användare loggar in skickar backend tillbaka en token.
Frontend sparar token och skickar med den i Authorization-headern vid skyddade API-anrop.

Det finns två roller i systemet:

* Admin
* User

Admin har fler rättigheter än User. En admin kan lägga till, ändra och ta bort böcker. En vanlig användare kan logga in, se böcker, låna böcker och lämna tillbaka böcker.

## Frontend och backend

Frontend hämtar data från backend med fetch-anrop. När användaren till exempel klickar på “Lagg till” skickas ett POST-anrop till backend. 
När användaren klickar på “Andra” skickas ett PUT-anrop. När användaren klickar på “Ta bort” skickas ett DELETE-anrop.

Backend ansvarar för databas, API-endpoints, autentisering och behörighet. Frontend ansvarar för gränssnittet och visar informationen för användaren.

## Exempel på API-endpoints

* GET /api/books
* POST /api/books
* PUT /api/books/{id}
* DELETE /api/books/{id}
* GET /api/categories
* POST /api/auth/login
* GET /api/loans
* POST /api/loans
* PUT /api/loans/{id}/return

## Reflektion

Projektet visar hur man kan bygga en enkel men fungerande fullstack-applikation. 
Jag har lärt mig hur React kan kopplas till ett ASP.NET Core Web API, hur data skickas med JSON, 
hur Entity Framework används för databasen och hur JWT kan användas för inloggning och roller.

En utmaning var att få frontend och backend att fungera tillsammans, särskilt med inloggning och skyddade funktioner.
Lösningen blev att skicka JWT-token i Authorization-headern vid anrop som kräver inloggning.

## GitHub

Projektet finns på GitHub:

https://github.com/Ammar2521/LibraryFullstack
