require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚗 مرحبا بك في نظام Dragomax");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});