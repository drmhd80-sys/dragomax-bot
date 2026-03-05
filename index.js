const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN);
const app = express();

app.use(express.json());

/* Webhook endpoint */
app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

/* Test page */
app.get("/", (req, res) => {
  res.send("Dragomax bot running");
});

/* MAIN KEYBOARD */

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
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });

}

/* START */

bot.onText(/\/start/, (msg) => {
  mainMenu(msg.chat.id);
});

/* BUTTON HANDLER */

bot.on("message", (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "📊 حالة الورشة الآن") {

    bot.sendMessage(chatId,
`🏭 حالة الورشة الآن

🚗 بانتظار المباشرة: 0
🔧 قيد العمل: 0
📦 جاهزة للتسليم: 0

🚿 في المغسل: 0
🧼 قيد الغسيل: 0
`);

  }

  else if (text === "🚗 استلام سيارة") {

    bot.sendMessage(chatId,
`🚗 بدء استلام سيارة

الخطوة القادمة:
📷 أرسل صور السيارة قبل العمل`);

  }

  else if (text === "🚿 استلام غسيل") {

    bot.sendMessage(chatId,
`🚿 تسجيل سيارة للمغسل

📷 أرسل صور السيارة قبل الغسيل`);

  }

  else if (text === "🔧 إدارة العمل") {

    bot.sendMessage(chatId,
`🔧 إدارة العمل

يمكنك هنا متابعة:
• السيارات قيد العمل
• السيارات بانتظار المباشرة
• السيارات الجاهزة للتسليم`);

  }

  else if (text === "💰 تسجيل دفعة") {

    bot.sendMessage(chatId,
`💰 تسجيل دفعة

أدخل رقم السيارة أو لوحة السيارة`);

  }

  else if (text === "💸 تسجيل مصروف") {

    bot.sendMessage(chatId,
`💸 تسجيل مصروف

اختر نوع المصروف:
• مواد
• مورد
• رواتب
• مصروف عام`);

  }

  else if (text === "🔎 استعلام") {

    bot.sendMessage(chatId,
`🔎 الاستعلام

يمكنك البحث عبر:

• رقم السيارة
• رقم اللوحة
• اسم الزبون
• رقم الهاتف
• التاريخ`);

  }

  else if (text === "📅 المواعيد") {

    bot.sendMessage(chatId,
`📅 إدارة المواعيد

• مواعيد اليوم
• مواعيد الأسبوع
• إضافة موعد جديد`);

  }

});

/* SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Dragomax bot server running");
});