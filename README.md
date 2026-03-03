# Full-Stack Login System Assessment

A secure, production-ready user authentication system built to fulfill and exceed the assessment requirements. This project demonstrates a decoupled architecture using React, ASP.NET Core, PostgreSQL, and Docker.

##  Tech Stack Highlights
-   **Frontend:** React 18, Vite, Context API, Lucide Icons, Modern CSS (Glassmorphism).
-   **Backend:** .NET 9 ASP.NET Web API, Entity Framework Core, JWT Authentication, BCrypt.net.
-   **Database:** PostgreSQL 16.
-   **Architecture:** Containerized 3-tier architecture (Frontend Proxy, Backend API, Database) coordinated via Docker Compose.

---

## Assessment Requirements Checklist

### Core Requirements
- [x] **React Frontend:** Implemented with Vite for speed. Beautiful, responsive design.
- [x] **C# Backend:** Built a REST API using ASP.NET Core (.NET 9).
- [x] **PostgreSQL Database:** Data is persisted reliably using EF Core.
- [x] **Docker Containerization:** The entire solution runs effortlessly in Docker.
- [x] **Registration Endpoint:** Securely hashes passwords and creates users.
- [x] **Login Endpoint:** Verifies credentials and issues JWT tokens.
- [x] **Protected User Details:** Frontend route and Backend endpoint both require valid authentication.
- [x] **Unit Tests:** `Backend.Tests` thoroughly covers the `AuthController` business logic.

### Bonus Achievements
- [x] **Integration Tests:** `Backend.IntegrationTests` validates the end-to-end HTTP pipeline using `WebApplicationFactory` and an In-Memory SQLite database.
- [x] **Build Script:** Provided a `build.ps1` PowerShell script to automate the build and run process.
- [x] **Microservice Architecture:** Decoupled the application into distinct containers. The frontend container utilizes `nginx` as a reverse proxy to securely route `/api` traffic to the backend container across an isolated Docker network.

---

##  How to Run the Application

There are three ways to launch the project:

### Option 1: Docker Compose (Recommended)
This is the easiest way to run the full stack exactly as intended.
1. Ensure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is running.
2. Open a terminal in the root of this project.
3. Run the following command:
   ```bash
   docker compose up --build -d
   ```
4. Access the **Frontend** at: [http://localhost:3000](http://localhost:3000)

### Option 2: Using the Build Script (Windows)
1. Right-click the `build.ps1` file and select **Run with PowerShell**.
2. The script will automatically compile the .NET and React applications, and then launch the Docker containers.

### Option 3: Local Development Setup
If you prefer to run the components without Docker:
1. **Database:** You'll need a local PostgreSQL instance running on port `5432` with credentials matching `appsettings.Development.json`.
2. **Backend:** 
   ```bash
   cd Backend
   dotnet run
   ```
3. **Frontend:** 
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

##  Running the Tests

The solution includes both Unit Tests and Integration Tests to guarantee reliability.

To run all tests:
```bash
dotnet test
```

*Note: The integration tests use an in-memory SQLite database, so they will run perfectly without needing the Docker environment active.*

---

##  Design System
The frontend was crafted with a "Mobile-First" approach, utilizing a custom CSS variables system to implement a high-end Glassmorphism aesthetic. It is fully responsive, ensuring the UI looks spectacular on both desktop browsers and mobile devices.
