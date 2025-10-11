FROM alpine:latest

WORKDIR /app

COPY pocketbase /app/pocketbase
COPY start.sh /app/start.sh

RUN chmod +x /app/pocketbase /app/start.sh

EXPOSE 8090

CMD ["./start.sh"]