import zod from 'zod'

const characterSchema = zod.object({
  name: zod.string(),
  anime: zod.string(),
  image: zod.string().url().endsWith('.png').optional(),
  age: zod.number().positive().int().default(0),
  race: zod.string(),
  occupation: zod.string(),
  abilities: zod.array(zod.string()),
  personality: zod.array(zod.string())
})

export function validateCharacter (character) {
  return characterSchema.safeParse(character)
}

export function validatePartialCharacter (character) {
  return characterSchema.partial().safeParse(character)
}
