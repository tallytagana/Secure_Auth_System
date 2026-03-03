# Build and Run Script for Full-Stack Login Assessment

Write-Host "🚀 Starting Build Process..." -ForegroundColor Cyan

# 1. Build Backend
Write-Host "📦 Building Backend..." -ForegroundColor Yellow
cd Backend
dotnet build
if ($LASTEXITCODE -ne 0) { Write-Error "Backend build failed"; exit 1 }
cd ..

# 2. Build Frontend
Write-Host "📦 Building Frontend..." -ForegroundColor Yellow
cd frontend
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; exit 1 }
cd ..

# 3. Docker Compose
Write-Host "🐳 Starting Docker Containers..." -ForegroundColor Green
docker compose up --build -d

Write-Host "✨ Application is running!" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend API: http://localhost:5285"
Write-Host "Database: localhost:5432"
