@echo off
set "HTML_PATH=%~dp0index.html"

echo ========================================================
echo        Opening RePlank EcoBoards in your Browser
echo ========================================================

:: 1. Try Opera
if exist "%LOCALAPPDATA%\Programs\Opera\opera.exe" (
    echo Launching Opera...
    start "" "%LOCALAPPDATA%\Programs\Opera\opera.exe" "%HTML_PATH%"
    goto :done
)

:: 2. Try Opera GX
if exist "%LOCALAPPDATA%\Programs\Opera GX\opera.exe" (
    echo Launching Opera GX...
    start "" "%LOCALAPPDATA%\Programs\Opera GX\opera.exe" "%HTML_PATH%"
    goto :done
)

:: 3. Try Chrome
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    echo Launching Chrome...
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%HTML_PATH%"
    goto :done
)

:: 4. Try Microsoft Edge
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    echo Launching Microsoft Edge...
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%HTML_PATH%"
    goto :done
)

:: 5. Default browser fallback
start "" "%HTML_PATH%"

:done
echo Done! RePlank EcoBoards is open.
