import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const keys = JSON.parse(readFileSync(join(__dirname, 'maps/en-keys-only.json'), 'utf8'))

/** @param {string} name */
function loadValues(name) {
  return JSON.parse(readFileSync(join(__dirname, 'maps', `values-${name}.json`), 'utf8'))
}

for (const code of ['nl', 'it', 'ja', 'ko']) {
  const values = loadValues(code)
  if (values.length !== keys.length) {
    throw new Error(`${code}: expected ${keys.length} values, got ${values.length}`)
  }
  const map = Object.fromEntries(keys.map((k, i) => [k, values[i]]))
  writeFileSync(join(__dirname, 'maps', `${code}.json`), JSON.stringify(map, null, 2) + '\n')
  console.log(`maps/${code}.json: ${values.length} entries`)
}
