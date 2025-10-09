FROM alpine:latest

WORKDIR /app

# Download PocketBase binary
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.18.4/pocketbase-linux-arm64 /app/pocketbase

RUN chmod +x /app/pocketbase

EXPOSE 10000

CMD ["./pocketbase", "serve", "--http", "0.0.0.0:10000"]