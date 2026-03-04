require("dotenv").config();

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token);

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "/start") {
    bot.sendMessage(chatId, "🚗 مرحبا بك في نظام Dragomax لإدارة الورشة");
  } else {
    bot.sendMessage(chatId, "تم استلام رسالتك");
  }
});

app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Dragomax bot running");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running...");
});