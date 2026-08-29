@echo off
chcp 65001 >nul
title Study Abroad Starter Village - Server
cd /d "%~dp0"

echo.
echo ========================================
echo   Study Abroad Starter Village Demo
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please install Node.js LTS first: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Please reinstall Node.js LTS.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo First run: installing dependencies. This may take a few minutes.
  echo.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo Install failed. Please check the network and double-click this file again.
    pause
    exit /b 1
  )
)

echo.
echo The web page will open automatically in a few seconds.
echo If it does not open, double-click OPEN_WEB_PAGE.url.
echo.
echo Keep this window open. Closing it will stop the web app.
echo.
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3000'"
call npm run dev

echo.
echo Server stopped.
pause
