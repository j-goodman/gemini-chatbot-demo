import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const PORT = 3000
const MODEL = "gemini-2.5-flash"
const API_KEY = "???"

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
    const prompt = req.body?.prompt
    const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            })
        }
    )
})