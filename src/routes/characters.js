import { Router } from 'express'
import { CharacterController } from '../controllers/characters.js'

export const charactersRouter = Router()

charactersRouter.get('/', CharacterController.getAll)
charactersRouter.get('/:id', CharacterController.getOneById)

charactersRouter.post('/', CharacterController.create)

charactersRouter.patch('/:id', CharacterController.update)

charactersRouter.delete('/:id', CharacterController.delete)
