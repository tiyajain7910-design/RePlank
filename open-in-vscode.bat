@echo off
set "PROJECT_DIR=%~dp0"

if exist "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" (
    start "" "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" "%PROJECT_DIR%"
    exit /b 0
)

start "" "%PROJECT_DIR%"
