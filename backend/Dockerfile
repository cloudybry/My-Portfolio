FROM alpine:latest

WORKDIR /app

# Install required packages and ensure shell compatibility
RUN apk add --no-cache \
    unzip \
    curl \
    ca-certificates \
    busybox \
    bash

# Download and install PocketBase
ENV PB_VERSION=0.30.4
RUN curl -L -o pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pocketbase.zip -d /app \
    && chmod +x /app/pocketbase \
    && rm pocketbase.zip


COPY start.sh /app/start.sh

# Ensure correct line endings and permissions
RUN sed -i 's/\r$//' /app/start.sh && chmod +x /app/start.sh

EXPOSE 8090

CMD ["/app/start.sh"]
