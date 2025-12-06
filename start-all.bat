@echo off
echo Starting Worker Hub Application...
echo.

start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul

start "Frontend Server" cmd /k "cd frontend\frontend_ui && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window (servers will keep running)
pause >nul
