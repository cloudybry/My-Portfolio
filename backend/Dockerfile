FROM alpine:latest

WORKDIR /app
RUN apk add --no-cache wget unzip

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.30.4/pocketbase_0.30.4_linux_amd64.zip \
    && unzip pocketbase_0.30.4_linux_amd64.zip \
    && mv pocketbase /app/pocketbase \
    && chmod +x /app/pocketbase

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8090
CMD ./start.sh