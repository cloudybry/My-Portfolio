FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache \
    unzip \
    curl \
    ca-certificates

# Download and install PocketBase
ENV PB_VERSION=0.30.4
RUN curl -L -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pocketbase.zip -d /app \
    && chmod +x /app/pocketbase \
    && rm pocketbase.zip

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8090
ENTRYPOINT ["/app/start.sh"]
