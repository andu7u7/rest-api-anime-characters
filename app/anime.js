import express from 'express'
import process from 'node:process'
import crypto from 'node:crypto'
import cors from 'cors'
import { validateCharacter, validatePartialCharacter } from './schemas/character.js'

// Importamos json en ESModules
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const characters = require('./utils/characters.json')

const PORT = process.env.PORT || 3000
const app = express()

app.disable('x-powered-by')
app.use(express.json())
// Solución cors mediante middleware
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:3000',
      'http://localhost:1234',
      'http://localhost:5173'
    ]
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  }
}))

app.get('/characters', (req, res) => {
  const { race } = req.query
  if (race) {
    const filteredCharacters = characters.filter((c) => c.race.toLowerCase() === race.toLowerCase())
    return res.json({ total: filteredCharacters.length, characters: filteredCharacters })
  }
  res.json({ total: characters.length, characters })
})

app.get('/characters/:id', (req, res) => {
  const character = findCharacter(req.params.id)
  if (!character) {
    return res.status(404).json({ error: 'Not found' })
  }
  res.json(character)
})

app.post('/characters', (req, res) => {
  const response = validateCharacter(req.body)
  if (!response.success) {
    return res.status(400).json({ errors: response.error })
  }
  const character = {
    id: crypto.randomUUID(),
    ...req.body
  }
  characters.push(character)
  res.status(201).json(character)
})

app.patch('/characters/:id', (req, res) => {
  const response = validatePartialCharacter(req.body)
  if (!response.success) {
    return res.status(400).json({ errors: response.error })
  }
  const character = findCharacter(req.params.id)
  if (!character) {
    return res.status(404).json({ error: 'Not found' })
  }

  const updatedCharacter = {
    ...character,
    ...response.data
  }
  characters.splice(characters.indexOf(character), 1, updatedCharacter)
  res.json(updatedCharacter)
})

app.delete('/characters/:id', (req, res) => {
  const character = findCharacter(req.params.id)
  if (!character) {
    return res.status(404).json({ error: 'Not found' })
  }
  characters.splice(characters.indexOf(character), 1)
  res.status(204).end()
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

function findCharacter (characterId) {
  return characters.find(character => character.id === characterId)
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
