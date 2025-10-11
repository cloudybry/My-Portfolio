#!/bin/sh
chmod +x pocketbase

./pocketbase cloudybry@admin.com synapps@-1

./pocketbase serve --http 0.0.0.0:${PORT:-8090}
