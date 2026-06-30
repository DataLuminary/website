import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
const en = JSON.parse(readFileSync(join(messagesDir, 'en.json'), 'utf8'))
const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))

function cloneAndTranslate(obj, map) {
  if (Array.isArray(obj)) return obj.map((item) => cloneAndTranslate(item, map))
  if (obj !== null && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) out[k] = cloneAndTranslate(v, map)
    return out
  }
  if (typeof obj === 'string' && map[obj]) return map[obj]
  return obj
}

const customNode = { nl: 'Aangepast', it: 'Personalizzato', ja: 'カスタム', ko: '사용자 정의' }

/** @type {Record<string, Record<string, string>>} */
const localeMaps = JSON.parse(
  readFileSync(join(__dirname, 'locale-overrides.json'), 'utf8'),
)

for (const code of ['nl', 'it', 'ja', 'ko']) {
  const overrides = localeMaps[code]
  /** @type {Record<string, string>} */
  const map = {}
  for (const [enKey, esVal] of base) {
    map[enKey] = overrides[enKey] ?? esVal
  }
  map.Custom = customNode[code]

  const pairs = base.map(([k]) => [k, map[k]])
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')

  const translated = cloneAndTranslate(en, map)
  for (const orbit of translated.pluginArchitecture.orbits) {
    orbit.nodes[orbit.nodes.length - 1] = customNode[code]
  }
  writeFileSync(join(messagesDir, `${code}.json`), JSON.stringify(translated, null, 2) + '\n')
  console.log(`Wrote ${code}.json (${Object.keys(overrides).length} overrides)`)
}
