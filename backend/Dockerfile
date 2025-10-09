FROM alpine:latest

WORKDIR /app

ADD ./pocketbase /app/pocketbase
ADD ./pb_data /app/pb_data


RUN chmod +x /app/pocketbase

EXPOSE 10000

CMD ["/app/pocketbase", "serve", "--http", "0.0.0.0:10000"]
