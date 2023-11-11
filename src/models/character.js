import { randomUUID } from 'node:crypto'
import { readJson } from '../utils/readJson.js'

const characters = readJson('./characters.json') || []

// Nota: async porque se recuperan de una bd

export class CharacterModel {
  static async getAll ({ race, anime }) {
    if (race) return characters.filter((c) => c.race.toLowerCase() === race.toLowerCase())
    else if (anime) return characters.filter((c) => c.anime.toLowerCase() === anime.toLowerCase())
    return characters
  }

  static async getOneById ({ id }) {
    const character = await this.findCharacter(id)
    if (!character) return { error: `Character #${id} not found` }
    return character
  }

  static async createOne ({ character }) {
    const newCharacter = {
      id: randomUUID(),
      ...character
    }
    // TODO: guardamos en bd
    characters.push(newCharacter)
    return newCharacter
  }

  static async update ({ id, changes }) {
    const character = await this.findCharacter(id)
    if (!character) return null
    const updatedCharacter = {
      ...character,
      ...changes
    }
    // TODO: actualizamos en bd
    characters.splice(characters.indexOf(character), 1, updatedCharacter)
  }

  static async delete ({ id }) {
    const character = await this.findCharacter(id)
    if (!character) return null
    // TODO: eliminados en bd
    characters.splice(characters.indexOf(character), 1)
  }

  static async findCharacter (id) {
    return characters.find((c) => c.id === id)
  }
}
