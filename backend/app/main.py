# backend/app/main.py

# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os, logging

# فعّلي التوثيق صراحة
app = FastAPI(
    title="seasondiy-api",
    version="1.0.0",
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS من المتغير البيئي
origins = [o.strip() for o in os.getenv("SEASONDIY_ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# لوجات
logger = logging.getLogger("uvicorn.error")
logger.setLevel("INFO")
if os.getenv("OPENAI_API_KEY"):
    logger.info("OPENAI_API_KEY ✅ loaded (startswith='sk-')")
else:
    logger.info("OPENAI_API_KEY not set (هذا طبيعي إن كنا فقط نختبر)")

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

# نموذج الطلب
class RecBody(BaseModel):
    analysis: dict
    userId: str | None = "guest"

# نسخة مبسطة للتأكد من الظهور في /docs (بدون OpenAI)
@app.post("/recommend")
def recommend(body: RecBody):
    return {"ok": True, "echo": body.analysis}
