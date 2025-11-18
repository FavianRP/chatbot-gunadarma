@echo off

echo Starting frontend...
start "Frontend" cmd /k "npm run dev"

echo Starting backend...
python backend/api.py
