FROM alpine:latest

WORKDIR /app

# Copy PocketBase binary
COPY backend/pocketbase /app/pocketbase

# Make it executable
RUN chmod +x /app/pocketbase

# Use the PORT environment variable provided by Render
ENV PORT=10000

# Expose the correct port
EXPOSE $PORT

# Start PocketBase using the dynamic port
CMD ./pocketbase serve --http=0.0.0.0:$PORT