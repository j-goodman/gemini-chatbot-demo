import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const PORT = Number(process.env.PORT)
const MODEL = process.env.MODEL
const API_KEY = process.env.API_KEY
const app = express()

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

    const data = await geminiResponse.json()
    const candidate = data?.candidates?.[0]
    const reply = candidate?.content?.parts[0].text

    res.json({ reply })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})