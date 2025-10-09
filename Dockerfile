FROM alpine:latest

WORKDIR /app

# Download PocketBase v0.30.2 binary
COPY backend/pocketbase /app/pocketbase

RUN chmod +x /app/pocketbase

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8090"]
