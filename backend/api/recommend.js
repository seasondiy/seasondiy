// backend/api/recommend.js
const express = require("express");
const router = express.Router();

// Node 18 فيه fetch مدمج
router.post("/recommend", async (req, res) => {
  try {
    const { analysis, userId = "guest" } = req.body;

    const prompt = `
أنت خبير/ة تجميل وشراء إلكتروني. بعد تحليل البشرة، أعطني JSON منظّم فقط (بدون أي كلام قبله أو بعده) وفق النموذج أدناه.

المدخلات:
${JSON.stringify(analysis)}

المطلوب:
- منتجات مناسبة لأندرتون وموسم العميلة (Foundation, Concealer, Blush, Lipstick, Eyeshadow, Highlighter, Primer, Setting spray, Nail polish).
- أعطِ 2-3 بدائل (اقتصادي / متوسط / فاخر) في كل فئة.
- كل منتج يحتوي على:
  name, shade, reason, price, currency, image, link (أضف "?aff={AFFILIATE_TAG}" في النهاية).
- صياغة الرابط يجب أن تكون كخيار: "يمكنك إيجاد هذا المنتج في المتجر أو عبر الرابط".
- أخرج JSON فقط بصيغة:
{
  "profile": {...},
  "summaryPalette": {...},
  "products": {...}
}

⚠️ تعليمات إضافية:
1. اعتبر أن لديك دائمًا وصول مستمر لكل الملفات والأكواد التي زودتك بها سابقًا (حتى لو لم أعِد إرسالها).
2. لا تبدأ من جديد كل مرة، بل أكمل بشكل متسلسل ومنظم.
3. عندما أطلب تحديث أو إضافة، طبّقها على السياق السابق مباشرة.
4. تأكد أن النتائج النهائية تبقى متسقة مع التحليل والأكواد السابقة.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5", // أو الموديل المتاح عندك
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      return res.status(500).json({ error: "فشل تحويل رد الذكاء إلى JSON", raw: content });
    }

    res.json(parsed);
  } catch (error) {
    console.error("خطأ /api/recommend:", error);
    res.status(500).json({ error: "حصل خطأ غير متوقع", details: error.message });
  }
});

module.exports = router;
