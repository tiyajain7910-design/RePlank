@echo off
set "HTML_PATH=%~dp0order.html"

if exist "%LOCALAPPDATA%\Programs\Opera\opera.exe" (
    start "" "%LOCALAPPDATA%\Programs\Opera\opera.exe" "%HTML_PATH%"
    exit /b 0
)

if exist "%LOCALAPPDATA%\Programs\Opera GX\opera.exe" (
    start "" "%LOCALAPPDATA%\Programs\Opera GX\opera.exe" "%HTML_PATH%"
    exit /b 0
)

start "" "%HTML_PATH%"
