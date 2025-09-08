// backend/server.js (CommonJS لتجنب مشاكل ESM)
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// صحّة الخدمة
app.get("/health", (req, res) => res.json({ ok: true }));

// راوت التوصيات (الذكاء)
app.use("/api", require("./api/recommend"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on port ${PORT}`);
});
