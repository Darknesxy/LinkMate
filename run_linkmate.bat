@echo off
echo ========================================================
echo    Starting LinkMate Fullstack Video Downloader
echo ========================================================
echo.
echo Starting FastAPI Backend + Static UI on http://localhost:8000 ...
echo.
start "" http://localhost:8000
python -m uvicorn backend.server:app --host 0.0.0.0 --port 8000 --reload
pause
