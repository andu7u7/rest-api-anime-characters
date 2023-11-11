import { CharacterModel } from '../models/character.js'
import { validateCharacter, validatePartialCharacter } from '../schemas/character.js'

export class CharacterController {
  static async getAll (req, res) {
    const characters = await CharacterModel.getAll(req.query)
    res.json({ total: characters.length, characters })
  }

  static async getOneById (req, res) {
    const character = await CharacterModel.getOneById(req.params)
    res.json(character)
  }

  static async create (req, res) {
    const response = validateCharacter(req.body)
    if (!response.success) return res.status(400).json({ errors: response.error })
    const character = await CharacterModel.createOne({ character: response.data })
    res.status(201).json(character)
  }

  static async update (req, res) {
    const response = validatePartialCharacter(req.body)
    if (!response.success) return res.status(400).json({ errors: response.error })
    const updatedCharacter = await CharacterModel.update({ id: req.params.id, changes: response.data })
    res.json(updatedCharacter)
  }

  static async delete (req, res) {
    const character = await CharacterModel.delete(req.params)
    if (!character) return res.status(404).json({ error: `Character #${req.params.id} not found` })
    res.status(204).json({ message: `Character # ${req.params.id} was deleted` })
  }
}
