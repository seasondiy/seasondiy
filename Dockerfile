# ===== Dockerfile (FastAPI) =====
FROM python:3.11-slim

# حزم نظام يحتاجها opencv
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# تثبيت المتطلبات
COPY backend/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# نسخ كود الباك-إند
COPY backend /app

# المنفذ
ENV PORT=10000
EXPOSE 10000

# تشغيل FastAPI — ملفك في backend/app/main.py والمتغير اسمه app
CMD ["sh","-c","gunicorn -w 2 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:$PORT"]
