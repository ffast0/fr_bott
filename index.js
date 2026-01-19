import express from "express";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const token = process.env.TOKEN_API;
const bot = new TelegramBot(token);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Telegram bot is running!");
});

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const words = ["Bolishi mumkin emas", "Albata", "Bolishi mumkin", "Yoq", "Ha"];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Salom! /word deb yoz soz chiqarib berishi uchun");
});

bot.onText(/\/word/, (msg) => {
  const word = words[Math.floor(Math.random() * words.length)];
  bot.sendMessage(msg.chat.id, `Seni sozing: ${word}`);
});

// bot.on("message", (msg) => {
//   if (!msg.text.startsWith("/")) {
//     bot.sendMessage(msg.chat.id, "Uzur, Iltimos /word deb yozing sizga harxil sozlarni chiqarishi uchun");
//   }
// });

export default app;