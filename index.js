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

const words = ["Never", "Yep", "Maybe", "No", "Yes"];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Write /word to get random word");
});

bot.onText(/\/word/, (msg) => {
  const word = words[Math.floor(Math.random() * words.length)];
  bot.sendMessage(msg.chat.id, `Your word: ${word}`);
});

bot.on("message", (msg) => {
  if (!msg.text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "Sorry, please write /word to get random word!");
  }
});

export default app;