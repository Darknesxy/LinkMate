@echo off
title LinkMate - Video Downloader
echo ========================================================
echo   Launching LinkMate Video Downloader
echo   URL: http://localhost:8000
echo ========================================================
start http://localhost:8000
python -m uvicorn backend.server:app --host 0.0.0.0 --port 8000
pause
