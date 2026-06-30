import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
mkdirSync(join(__dirname, 'maps'), { recursive: true })

const en = JSON.parse(readFileSync(join(messagesDir, 'en.json'), 'utf8'))
const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))

/** @type {Record<string, string>} */
const enToJa = JSON.parse(readFileSync(join(__dirname, 'maps/en-to-ja.json'), 'utf8'))
/** @type {Record<string, string>} */
const enToKo = JSON.parse(readFileSync(join(__dirname, 'maps/en-to-ko.json'), 'utf8'))

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

const customNode = { ja: 'カスタム', ko: '사용자 정의' }

for (const [code, map] of [
  ['ja', enToJa],
  ['ko', enToKo],
]) {
  map.Custom = customNode[code]
  for (const [enKey] of base) {
    if (!map[enKey] && enKey.includes('\\n')) {
      const alt = enKey.replace(/\\n/g, '\n')
      if (map[alt]) map[enKey] = map[alt]
    }
    if (!map[enKey] && enKey.includes('\n')) {
      const alt = enKey.replace(/\n/g, '\\n')
      if (map[alt]) map[enKey] = map[alt]
    }
  }
  const untranslated = base.filter(([k]) => !map[k])
  if (untranslated.length) {
    console.error(`Missing ${code} translations:`, untranslated.length)
    untranslated.slice(0, 5).forEach(([k]) => console.error(' ', k.slice(0, 80)))
    process.exit(1)
  }
  const pairs = base.map(([enKey]) => [enKey, map[enKey]])
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  writeFileSync(join(__dirname, `maps/${code}-by-en.json`), JSON.stringify(map, null, 2) + '\n')
  const translated = cloneAndTranslate(en, map)
  for (const orbit of translated.pluginArchitecture.orbits) {
    orbit.nodes[orbit.nodes.length - 1] = customNode[code]
  }
  writeFileSync(join(messagesDir, `${code}.json`), JSON.stringify(translated, null, 2) + '\n')
  console.log(`Wrote ${code}.json (${Object.keys(map).length} map entries)`)
}
