#!/bin/sh
echo "Creating superuser..."
./pocketbase superuser upsert cloudybry@admin.com synapps@-1 || echo "Superuser already exists or failed"
echo "Starting PocketBase..."
exec ./pocketbase serve --http 0.0.0.0:${PORT:-8090}