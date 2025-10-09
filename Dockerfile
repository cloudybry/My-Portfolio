FROM alpine:latest

WORKDIR /app

# Copy PocketBase binary only
COPY backend/pocketbase /app/pocketbase

# Make it executable
RUN chmod +x /app/pocketbase

# Use Render's dynamic port
ENV PORT=10000
EXPOSE $PORT

# Start PocketBase with dynamic port binding
CMD sh -c "./pocketbase serve --http=0.0.0.0:$PORT"