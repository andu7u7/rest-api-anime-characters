// Importamos json en ESModules
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const readJson = (path) => require(path)
