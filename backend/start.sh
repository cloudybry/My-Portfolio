#!/bin/sh

set -e

echo "Creating superuser..."
if ./pocketbase superuser upsert cloudybry@admin.com synapps@-1; then
  echo "Superuser created or updated successfully."
else
  echo "Superuser already exists or creation failed."
fi

echo "Starting PocketBase on port ${PORT:-8090}..."
exec ./pocketbase serve --http 0.0.0.0:${PORT:-8090}
