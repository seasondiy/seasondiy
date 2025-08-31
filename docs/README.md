# SeasonDIY - Seasonal Color Analysis

<div align="center">

![SeasonDIY Logo](https://via.placeholder.com/200x100/667eea/ffffff?text=SeasonDIY)

**تحليل الألوان الموسمية باستخدام الذكاء الاصطناعي**  
*AI-Powered Seasonal Color Analysis*

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-green.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

## 📖 نظرة عامة | Overview

SeasonDIY هو تطبيق ويب متقدم لتحليل الألوان الموسمية باستخدام الذكاء الاصطناعي. يساعد المستخدمين على اكتشاف الألوان التي تناسب نوع بشرتهم وتبرز جمالهم الطبيعي.

SeasonDIY is an advanced web application for seasonal color analysis using artificial intelligence. It helps users discover colors that complement their skin tone and enhance their natural beauty.

### ✨ المميزات | Features

- 🎯 **تحليل دقيق** - تحليل متقدم باستخدام الذكاء الاصطناعي لتحديد الموسم الطبيعي
- 🎨 **لوحة ألوان شخصية** - 12 موسم مختلف مع لوحات ألوان مخصصة
- 💄 **نصائح الأناقة** - توصيات شخصية للملابس والمكياج
- 📄 **تقارير PDF** - تقارير شاملة باللغة العربية مع خطوط عربية حديثة
- 🔍 **فحص الجودة** - تحليل جودة الصورة مع تحذيرات وتوصيات
- 🌐 **دعم ثنائي اللغة** - واجهة عربية وإنجليزية

## 🏗️ البنية التقنية | Architecture

```
seasondiy/
├── backend/          # FastAPI Backend
│   ├── app/
│   │   ├── routes/   # API Routes
│   │   ├── services/ # Core Services
│   │   ├── models/   # Database & Schemas
│   │   └── utils/    # Utilities
│   └── assets/       # Static Assets & Fonts
├── frontend/         # Next.js Frontend
│   ├── pages/        # React Pages
│   └── styles/       # CSS Styles
├── docker/           # Docker Configuration
└── docs/             # Documentation
```

## 🚀 التشغيل السريع | Quick Start

### المتطلبات | Prerequisites

- Python 3.11+
- Node.js 18+
- Docker (اختياري | Optional)

### 1. تشغيل الخادم الخلفي | Backend Setup

```bash
# الانتقال إلى مجلد الخادم الخلفي
cd backend

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة الافتراضية
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# تثبيت المتطلبات
pip install -r requirements.txt

# تشغيل الخادم
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. تشغيل الواجهة الأمامية | Frontend Setup

```bash
# الانتقال إلى مجلد الواجهة الأمامية
cd frontend

# تثبيت المتطلبات
npm install

# إنشاء ملف البيئة
cp env.local.example .env.local

# تعديل المتغيرات في .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# تشغيل الخادم
npm run dev
```

### 3. الوصول إلى التطبيق | Access Application

- **الواجهة الأمامية**: http://localhost:3000
- **API Documentation**: http://localhost:8000/docs
- **الخادم الخلفي**: http://localhost:8000

## 🐳 تشغيل باستخدام Docker

```bash
# تشغيل جميع الخدمات
docker-compose -f docker/docker-compose.yml up -d

# إيقاف الخدمات
docker-compose -f docker/docker-compose.yml down
```

## 📊 API Endpoints

### تحليل الصورة | Image Analysis
```http
POST /api/analyze
Content-Type: multipart/form-data

# Response
{
  "session_id": "uuid",
  "season": "spring_warm",
  "season_name_ar": "ربيع دافئ",
  "skin_tone": 3,
  "full_palette": [...],
  "hair_colors": [...],
  "confidence_score": 0.85
}
```

### فحص الجودة | Quality Check
```http
POST /api/quality-check
Content-Type: multipart/form-data

# Response
{
  "warnings": [...],
  "overall_quality": "good",
  "recommendations_ar": [...],
  "recommendations_en": [...]
}
```

### تحميل PDF | PDF Generation
```http
POST /api/generate-pdf
Content-Type: application/json

{
  "session_id": "uuid",
  "language": "ar"
}
```

## 🎨 الفصول الطبيعية | Seasonal Types

### الربيع | Spring
- **ربيع دافئ** (Warm Spring)
- **ربيع مشرق** (Bright Spring)  
- **ربيع فاتح** (Light Spring)

### الصيف | Summer
- **صيف بارد** (Cool Summer)
- **صيف فاتح** (Light Summer)
- **صيف ناعم** (Soft Summer)

### الخريف | Autumn
- **خريف دافئ** (Warm Autumn)
- **خريف عميق** (Deep Autumn)
- **خريف ناعم** (Soft Autumn)

### الشتاء | Winter
- **شتاء بارد** (Cool Winter)
- **شتاء عميق** (Deep Winter)
- **شتاء مشرق** (Bright Winter)

## 🔧 التطوير | Development

### تشغيل الاختبارات | Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

### إضافة خطوط عربية | Adding Arabic Fonts
راجع [دليل إعداد الخطوط](DEV_SETUP.md) للحصول على تعليمات مفصلة.

See [Font Setup Guide](DEV_SETUP.md) for detailed instructions.

## 📱 استخدام التطبيق | Usage

### 1. رفع الصورة | Upload Image
- ارفع صورة واضحة لوجهك في إضاءة طبيعية
- تجنب الظلال القوية والخلفيات المعقدة
- استخدم صوراً بدقة عالية (200x200 كحد أدنى)

### 2. فحص الجودة | Quality Check
- سيتم فحص جودة الصورة تلقائياً
- ستحصل على تحذيرات وتوصيات لتحسين النتائج

### 3. التحليل | Analysis
- سيتم تحليل ألوان بشرتك باستخدام الذكاء الاصطناعي
- ستحصل على موسمك الطبيعي ولوحة الألوان المناسبة

### 4. النتائج | Results
- استعرض نتائجك في صفحة مخصصة
- حمّل تقرير PDF شامل
- احصل على نصائح الأناقة المناسبة

## 🤝 المساهمة | Contributing

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before getting started.

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للمزيد من التفاصيل.

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 الدعم | Support

- 📧 البريد الإلكتروني: support@seasondiy.com
- 💬 Discord: [SeasonDIY Community](https://discord.gg/seasondiy)
- 🐛 تقرير الأخطاء: [GitHub Issues](https://github.com/seasondiy/seasondiy/issues)

## 🙏 شكر وتقدير | Acknowledgments

- شكر خاص لمجتمع المطورين العرب
- فريق FastAPI و Next.js
- مكتبات الذكاء الاصطناعي مفتوحة المصدر

---

<div align="center">
صنع بـ ❤️ من أجل المجتمع العربي<br>
Made with ❤️ for the Arabic community
</div>
