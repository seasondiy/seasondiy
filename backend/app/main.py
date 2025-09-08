# backend/app/main.py

from fastapi import FastAPI
import os
import logging

app = FastAPI()
from pydantic import BaseModel
from fastapi import HTTPException
from openai import OpenAI
import os, json

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5")  # غيّريه لاحقًا لو تبين
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class RecBody(BaseModel):
    analysis: dict
    userId: str | None = "guest"

@app.post("/recommend")
def recommend(body: RecBody):
    prompt = f"""
أنت خبير/ة تجميل وشراء إلكتروني. أعطني JSON فقط (بدون أي نص خارجه).
المدخلات:
{json.dumps(body.analysis, ensure_ascii=False)}

المطلوب:
- منتجات تناسب الأندرتون والموسم (Foundation, Concealer, Powder, Blush, Bronzer/Contour, Highlighter, Eyeshadow, Mascara/Eyeliner, Lipstick, Brows, Primer/Skincare, Setting spray, Nail polish).
- قدّم 2–3 بدائل بكل فئة (اقتصادي/متوسط/فاخر).
- لكل منتج: name, shade, reason, price, currency, image, link (أضف ?aff={{AFFILIATE_TAG}} في النهاية).
- الصياغة غير دعائية مباشرة: "يمكنك إيجاد المنتج في المتاجر أو عبر الرابط".
- أخرج JSON بصيغة:
{{
  "profile": {{"season": "", "undertone": "", "depth": "", "skinType": "", "concerns": [], "notes": ""}},
  "currency": "SAR",
  "summaryPalette": {{
    "bestNeutrals": [], "accentColors": [], "avoid": [], "nailPolishPalette": []
  }},
  "products": {{
    "foundation": [], "concealer": [], "powder": [], "blush": [], "bronzer_contour": [], "highlighter": [],
    "eyeshadow": [], "mascara_eyeliner": [], "lipstick": [], "brows": [], "primer_skincare": [],
    "setting_spray": [], "nail_polish": [], "tools": []
  }},
  "howToApply": {{"face": [], "eyes": [], "lips": []}},
  "careNotes": [],
  "disclaimer": "لا نصائح طبية. افحصي المكونات في حال الحساسية.",
  "sources": []
}}

تعليمات الجودة:
1) التزمي بالأندرتون/الموسم/الميزانية.
2) الروابط اختيارية وليست دعوة شراء مباشرة.
3) JSON فقط — لا مقدّمات أو تعليقات.
4) اعتبري أن لديك سياق المشروع السابق وتتصرفين باستمرارية ومنهجية.
"""
    try:
        resp = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        content = resp.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
