FROM python:3.9-slim
WORKDIR /app
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
COPY TestApp/requirements.txt requirements.txt
RUN pip install -r requirements.txt
USER appuser
COPY TestApp/* .
EXPOSE 8000
CMD ./start.sh
