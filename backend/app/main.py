# backend/app/main.py

from fastapi import FastAPI
import os
import logging

app = FastAPI()

# (اختياري) فحص تحميل مفتاح OpenAI في السجلات
logger = logging.getLogger("uvicorn.error")
if os.getenv("OPENAI_API_KEY"):
    logger.info("OPENAI_API_KEY ✅ loaded (startswith='sk-')")
else:
    logger.warning("OPENAI_API_KEY ❌ missing")

# مسار الصحّة الموجود عندك
@app.get("/healthz")
def healthz():
    return {"status": "ok"}

# ✳️ أضيفي هذا المسار تحت app = FastAPI()
@app.get("/debug/env/openai")
def debug_openai():
    return {
        "present": bool(os.getenv("OPENAI_API_KEY")),
        "prefix": "sk-" if os.getenv("OPENAI_API_KEY") else ""
    }
