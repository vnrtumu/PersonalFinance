#!/bin/bash

# Navigate to the backend directory
cd "$(dirname "$0")"

# Start the FastAPI server
echo "Starting Vaulto Backend..."
uvicorn app.main:app --reload --port 8000
