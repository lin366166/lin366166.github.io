@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  Hexo 8.1.2 + Butterfly 5.7.0 local server
echo  Open http://localhost:4001 in your browser
echo  Press Ctrl+C to stop
echo ============================================
call npm start
pause
