import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** Professional JA/KO maps keyed by English source string */
const { jaMap, koMap } = JSON.parse(
  readFileSync(join(__dirname, 'maps/ja-ko-maps.json'), 'utf8'),
)

const keys = JSON.parse(readFileSync(join(__dirname, 'maps/en-keys-only.json'), 'utf8'))

for (const k of keys) {
  if (!jaMap[k]) throw new Error(`Missing JA: ${k.slice(0, 50)}`)
  if (!koMap[k]) throw new Error(`Missing KO: ${k.slice(0, 50)}`)
}

writeFileSync(
  join(__dirname, 'maps', 'ja-map.mjs'),
  `export const jaMap = ${JSON.stringify(jaMap, null, 2)}\n`,
)
writeFileSync(
  join(__dirname, 'maps', 'ko-map.mjs'),
  `export const koMap = ${JSON.stringify(koMap, null, 2)}\n`,
)
console.log('Wrote ja-map.mjs and ko-map.mjs')
