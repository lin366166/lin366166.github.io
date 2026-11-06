@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo  Hexo 8.1.2 + Butterfly 5.7.0 local server
echo  Open http://localhost:4001 in your browser
echo  Press Ctrl+C to stop
echo ============================================

rem --- Locate node.exe; portable Node may not be on the system PATH ---
set "NODE_EXE="
for /f "delims=" %%I in ('where node.exe 2^>nul') do (
  if not defined NODE_EXE set "NODE_EXE=%%~fI"
)
if not defined NODE_EXE (
  for /d %%V in ("%USERPROFILE%\.workbuddy\binaries\node\versions\*") do (
    if exist "%%~fV\node.exe" set "NODE_EXE=%%~fV\node.exe"
  )
)
if not defined NODE_EXE (
  if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_EXE=%ProgramFiles%\nodejs\node.exe"
)
if not defined NODE_EXE (
  echo [ERROR] node.exe not found. Install Node.js 18+ or run npm install first.
  echo.
  pause
  exit /b 1
)

if not exist "%~dp0node_modules\hexo\bin\hexo" (
  echo [ERROR] Hexo is not installed. Run: npm install
  echo.
  pause
  exit /b 1
)

echo Using Node: %NODE_EXE%
echo.
"%NODE_EXE%" "%~dp0node_modules\hexo\bin\hexo" server -p 4001

echo.
echo Hexo server stopped.
pause
