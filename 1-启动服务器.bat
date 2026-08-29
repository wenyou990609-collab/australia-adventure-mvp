@echo off
chcp 65001 >nul
title 留学生新手村 - 启动服务器
cd /d "%~dp0"

echo.
echo ========================================
echo   留学生新手村 Demo 正在启动
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo 没有检测到 Node.js。
  echo 请先安装 Node.js LTS: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo 没有检测到 npm，请重新安装 Node.js LTS。
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo 第一次运行需要安装依赖，可能需要几分钟。
  echo.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo 依赖安装失败。请检查网络后再双击本文件。
    pause
    exit /b 1
  )
)

echo.
echo 稍后会自动打开网页。
echo 如果没有自动打开，请双击 “2-打开网页.url”。
echo.
echo 这个窗口不要关闭；关闭窗口，服务器就会停止。
echo.
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3000'"
call npm run dev

echo.
echo 服务器已停止。
pause
