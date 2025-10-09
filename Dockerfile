FROM alpine:latest

WORKDIR /app

COPY backend/pocketbase /app/pocketbase

RUN chmod +x /app/pocketbase

ENV PORT=10000
EXPOSE $PORT

CMD sh -c "./pocketbase serve --http=0.0.0.0:$PORT"