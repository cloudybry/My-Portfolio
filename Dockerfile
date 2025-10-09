FROM alpine:latest

WORKDIR /app

# Download PocketBase v0.30.2 binary
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.30.2/pocketbase-linux-amd64 /app/pocketbase

RUN chmod +x /app/pocketbase

EXPOSE 10000

CMD ["./pocketbase", "serve", "--http", "0.0.0.0:10000"]