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

function mainMenu(chatId) {

  bot.sendMessage(chatId, "مرحباً بك في نظام Dragomax", {
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
  });

}

bot.onText(/\/start/, (msg) => {
  mainMenu(msg.chat.id);
});

bot.on("message", (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "📊 حالة الورشة الآن") {

    bot.sendMessage(chatId,
`🏭 حالة الورشة الآن

🚗 بانتظار المباشرة: 0
🔧 قيد العمل: 0
📦 جاهزة للتسليم: 0

🚿 في المغسل: 0`);
  }

  if (text === "🚗 استلام سيارة") {

    bot.sendMessage(chatId,
`🚗 بدء استلام سيارة جديدة
📷 أرسل صور السيارة قبل العمل`);
  }

  if (text === "🚿 استلام غسيل") {

    bot.sendMessage(chatId,
`🚿 تسجيل سيارة للمغسل
📷 أرسل صور السيارة قبل الغسيل`);
  }

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Dragomax bot server running");
});