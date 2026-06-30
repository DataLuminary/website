import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
mkdirSync(join(__dirname, 'maps'), { recursive: true })

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

/** @param {string} code @param {Record<string, string>} map */
function emit(code, map) {
  map.Custom = customNode[code]
  const missing = base.filter(([k]) => !map[k]).map(([k]) => k)
  if (missing.length) {
    throw new Error(`${code} missing ${missing.length}: ${missing.slice(0, 3).join(' | ')}`)
  }
  const pairs = base.map(([k]) => [k, map[k]])
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  const translated = cloneAndTranslate(en, map)
  for (const orbit of translated.pluginArchitecture.orbits) {
    orbit.nodes[orbit.nodes.length - 1] = customNode[code]
  }
  writeFileSync(join(messagesDir, `${code}.json`), JSON.stringify(translated, null, 2) + '\n')
  console.log(`Wrote ${code}.json (${pairs.length} keys)`)
}

for (const code of ['nl', 'it', 'ja', 'ko']) {
  const map = JSON.parse(readFileSync(join(__dirname, 'maps', `${code}.json`), 'utf8'))
  emit(code, map)
}
