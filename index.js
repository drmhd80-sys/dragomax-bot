const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN);
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Dragomax bot running");
});

const keyboard = {
  reply_markup: {
    keyboard: [
      ["📊 حالة الورشة الآن"],
      ["🚗 استلام سيارة", "🚿 استلام غسيل"],
      ["🔧 إدارة العمل"],
      ["💰 تسجيل دفعة", "💸 تسجيل مصروف"],
      ["🔎 استعلام"],
      ["📅 المواعيد"]
    ],
    resize_keyboard: true
  }
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "مرحباً بك في نظام Dragomax", keyboard);
});

bot.on("message", (msg) => {
  const text = msg.text;

  if (text === "📊 حالة الورشة الآن") {
    bot.sendMessage(msg.chat.id,
      "🏭 حالة الورشة الآن\n\n🚗 بانتظار المباشرة: 0\n🔧 قيد العمل: 0\n📦 جاهزة للتسليم: 0\n\n🚿 في المغسل: 0");
  }

  if (text === "🚗 استلام سيارة") {
    bot.sendMessage(msg.chat.id, "🚗 بدء استلام سيارة جديدة...");
  }

  if (text === "🚿 استلام غسيل") {
    bot.sendMessage(msg.chat.id, "🚿 بدء تسجيل سيارة للمغسل...");
  }

  if (text === "💰 تسجيل دفعة") {
    bot.sendMessage(msg.chat.id, "💰 تسجيل دفعة جديدة...");
  }

  if (text === "💸 تسجيل مصروف") {
    bot.sendMessage(msg.chat.id, "💸 تسجيل مصروف...");
  }

  if (text === "🔎 استعلام") {
    bot.sendMessage(msg.chat.id, "🔎 اختر طريقة البحث...");
  }

  if (text === "📅 المواعيد") {
    bot.sendMessage(msg.chat.id, "📅 عرض المواعيد...");
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});