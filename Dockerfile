FROM alpine:latest

WORKDIR /app

# Copy PocketBase binary
COPY backend/pocketbase /app/pocketbase

# Copy pb_data folder
COPY backend/pb_data /app/pb_data

# Make everything executable
RUN chmod -R 755 /app

# Use Render's dynamic port
ENV PORT=10000
EXPOSE $PORT

# Start PocketBase
CMD ./pocketbase serve --http=0.0.0.0:$PORT