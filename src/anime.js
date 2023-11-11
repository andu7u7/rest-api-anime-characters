import express from 'express'
import process from 'node:process'
import { charactersRouter } from './routes/characters.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT || 3000
const app = express()

app.disable('x-powered-by')
app.use(express.json())

// Solución cors mediante middleware
app.use(corsMiddleware())

app.use('/characters', charactersRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
