FROM debian:bullseye-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Download and install PocketBase
RUN curl -L -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.30.4/pocketbase_0.30.4_linux_amd64.zip \
    && mkdir /tmp/pb \
    && unzip pocketbase.zip -d /tmp/pb \
    && mv /tmp/pb/pocketbase /app/pocketbase \
    && chmod +x /app/pocketbase \
    && rm -rf pocketbase.zip /tmp/pb

# Copy and prepare startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8090
ENTRYPOINT ["/app/start.sh"]
