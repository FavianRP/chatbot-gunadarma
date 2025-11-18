#!/bin/bash

npm run dev &
FRONTEND_PID=$!

trap "kill $FRONTEND_PID" EXIT

python backend/api.py
