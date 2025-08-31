# دليل إعداد التطوير | Development Setup Guide

## 🛠️ إعداد البيئة التطويرية | Development Environment Setup

### المتطلبات الأساسية | Prerequisites

#### Python Backend
```bash
# تثبيت Python 3.11+
# Install Python 3.11+
python --version  # يجب أن يكون 3.11 أو أحدث

# تثبيت pip
python -m pip install --upgrade pip
```

#### Node.js Frontend
```bash
# تثبيت Node.js 18+
# Install Node.js 18+
node --version  # يجب أن يكون 18.0 أو أحدث
npm --version   # تأكد من تثبيت npm
```

## 🎨 إعداد الخطوط العربية | Arabic Fonts Setup

### تحميل الخطوط | Download Fonts

#### 1. Noto Sans Arabic (موصى به | Recommended)
```bash
# تحميل من Google Fonts
# Download from Google Fonts
wget https://fonts.google.com/download?family=Noto%20Sans%20Arabic

# أو تحميل مباشر
# Or direct download
curl -L "https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf" -o backend/assets/fonts/NotoSansArabic-Regular.ttf
curl -L "https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansArabic/NotoSansArabic-Bold.ttf" -o backend/assets/fonts/NotoSansArabic-Bold.ttf
```

#### 2. Amiri (بديل | Alternative)
```bash
curl -L "https://github.com/alif-type/amiri/releases/download/0.117/Amiri-0.117.zip" -o amiri.zip
unzip amiri.zip
cp Amiri-0.117/Amiri-Regular.ttf backend/assets/fonts/
```

### تثبيت الخطوط يدوياً | Manual Font Installation

1. **إنشاء مجلد الخطوط | Create fonts directory**
```bash
mkdir -p backend/assets/fonts
```

2. **نسخ ملفات الخطوط | Copy font files**
- ضع ملفات `.ttf` في `backend/assets/fonts/`
- Place `.ttf` files in `backend/assets/fonts/`

3. **التحقق من الخطوط | Verify fonts**
```bash
ls -la backend/assets/fonts/
# يجب أن ترى ملفات .ttf
# You should see .ttf files
```

### اختبار الخطوط | Testing Fonts

```python
# اختبار تحميل الخطوط
# Test font loading
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

try:
    pdfmetrics.registerFont(TTFont('NotoSansArabic', 'backend/assets/fonts/NotoSansArabic-Regular.ttf'))
    print("✅ تم تحميل الخط بنجاح | Font loaded successfully")
except Exception as e:
    print(f"❌ فشل في تحميل الخط | Font loading failed: {e}")
```

## 🔧 إعداد البيئة التطويرية | Development Environment

### 1. إعداد Backend

```bash
# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة (Windows)
venv\Scripts\activate

# تفعيل البيئة (Linux/Mac)
source venv/bin/activate

# تثبيت المتطلبات
pip install -r backend/requirements.txt

# إنشاء مجلدات البيانات
mkdir -p backend/data
mkdir -p backend/data/pdfs
```

### 2. إعداد Frontend

```bash
cd frontend

# تثبيت المتطلبات
npm install

# إنشاء ملف البيئة
cp env.local.example .env.local

# تعديل متغيرات البيئة
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local
```

### 3. تشغيل الخدمات | Running Services

#### تشغيل Backend
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### تشغيل Frontend
```bash
cd frontend
npm run dev
```

## 🧪 اختبار النظام | System Testing

### 1. اختبار API

```bash
# اختبار صحة النظام
curl http://localhost:8000/health

# اختبار رفع صورة
curl -X POST "http://localhost:8000/api/analyze" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@test_image.jpg"
```

### 2. اختبار إنتاج PDF

```python
# اختبار إنتاج PDF مع النص العربي
import requests

# رفع صورة أولاً
with open('test_image.jpg', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/api/analyze',
        files={'image': f}
    )

session_id = response.json()['session_id']

# إنتاج PDF
pdf_response = requests.post(
    'http://localhost:8000/api/generate-pdf',
    json={
        'session_id': session_id,
        'language': 'ar'
    }
)

# حفظ PDF للاختبار
with open('test_output.pdf', 'wb') as f:
    f.write(pdf_response.content)
```

## 🐛 استكشاف الأخطاء | Troubleshooting

### مشاكل الخطوط | Font Issues

#### 1. الخط لا يظهر في PDF
```python
# تحقق من تسجيل الخط
from reportlab.pdfbase import pdfmetrics
print(pdfmetrics.getRegisteredFontNames())
```

#### 2. النص العربي معكوس
```python
# تأكد من استخدام arabic_reshaper و python-bidi
import arabic_reshaper
from bidi.algorithm import get_display

text = "النص العربي"
reshaped_text = arabic_reshaper.reshape(text)
bidi_text = get_display(reshaped_text)
```

#### 3. خطأ في تحميل الخط
- تأكد من وجود ملف الخط في المسار الصحيح
- تحقق من صلاحيات الملف
- أعد تشغيل الخادم بعد إضافة خطوط جديدة

### مشاكل OpenCV | OpenCV Issues

```bash
# تثبيت مكتبات النظام المطلوبة (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install libgl1-mesa-glx libglib2.0-0

# Windows - تثبيت Visual C++ Redistributable
# قم بتحميل وتثبيت Microsoft Visual C++ Redistributable
```

### مشاكل Next.js

```bash
# مسح cache
rm -rf .next
rm -rf node_modules
npm install

# إعادة بناء المشروع
npm run build
```

## 📊 مراقبة الأداء | Performance Monitoring

### 1. مراقبة Backend

```python
# إضافة middleware للمراقبة
import time
from fastapi import Request

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### 2. مراقبة Frontend

```javascript
// إضافة Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔒 الأمان | Security

### 1. متغيرات البيئة

```bash
# Backend .env
DATABASE_URL=sqlite:///./data/seasondiy.db
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Frontend .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development
```

### 2. HTTPS في الإنتاج

```nginx
# nginx.conf
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://frontend:3000;
    }
    
    location /api {
        proxy_pass http://backend:8000;
    }
}
```

## 📚 موارد إضافية | Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [ReportLab User Guide](https://www.reportlab.com/docs/reportlab-userguide.pdf)
- [Arabic Typography Guidelines](https://www.w3.org/International/articles/arabic-type/)
- [OpenCV Python Tutorials](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)

## 🤝 المساهمة في التطوير | Contributing to Development

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

💡 **نصيحة**: استخدم IDE مع دعم Python و JavaScript مثل VSCode مع الإضافات المناسبة لتطوير أفضل.

💡 **Tip**: Use an IDE with Python and JavaScript support like VSCode with appropriate extensions for better development experience.
