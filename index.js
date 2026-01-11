import dotenv from "dotenv"
import telegramBot from "node-telegram-bot-api"
dotenv.config()

const token = process.env.TOKEN_API

const bot = new telegramBot(token, {polling: true})

const words = [
    "Never","Yep","Maybe","No","Yes"
]
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, "Hello! This bot helps you decide what todo or not to do with Yes or No.Write /word for get random massage")
})
bot.onText(/\/word/, (msg) => {
    const chatId = msg.chat.id
    const randomIndex = Math.floor(Math.random() * words.length)
    const word = words[randomIndex]
    bot.sendMessage(chatId, `your word: ${word}`)
})

bot.on("message", (msg) => {
    const chatId = msg.chat.id
    if (!msg.text.startsWith("/")) bot.sendMessage(chatId, "Sorry, I can't get your word. Please write /word for get random word!")
})

export default bot