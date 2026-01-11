import express from "express"
import dotenv from "dotenv"
import TelegramBot from "node-telegram-bot-api"

dotenv.config()
const token = process.env.token_api
const bot = new TelegramBot(token)

const app = express()
app.use(express.json())

// Telegram webhook endpoint
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body)
  res.sendStatus(200)
})

const words = ["Never","Yep","Maybe","No","Yes"]

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! Write /word to get random word")
})

bot.onText(/\/word/, (msg) => {
  const word = words[Math.floor(Math.random() * words.length)]
  bot.sendMessage(msg.chat.id, `your word: ${word}`)
})

export default app