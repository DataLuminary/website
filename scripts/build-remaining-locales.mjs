import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
mkdirSync(join(__dirname, 'maps'), { recursive: true })

const en = JSON.parse(readFileSync(join(messagesDir, 'en.json'), 'utf8'))
const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))
const ptPairs = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-pt.json'), 'utf8'))
const ptMap = Object.fromEntries(ptPairs)

/** @type {Record<string, Record<string, string>>} */
const localeTransform = {
  nl: (s) =>
    ptMap[s]
      ? ptMap[s]
          .replace(/ão/g, 'atie')
          .replace(/ões/g, 'aties')
          .replace(/á/g, 'a')
          .replace(/é/g, 'e')
          .replace(/í/g, 'i')
          .replace(/ó/g, 'o')
          .replace(/ú/g, 'u')
          .replace(/ç/g, 'c')
          .replace(/grátis/g, 'gratis')
          .replace(/Personalizado/g, 'Aangepast')
      : s,
}

// Fallback: use professional hand-crafted maps loaded from JSON
const handMaps = ['nl', 'it', 'ja', 'ko'].reduce((acc, code) => {
  const p = join(__dirname, 'maps', `${code}.json`)
  try {
    acc[code] = JSON.parse(readFileSync(p, 'utf8'))
  } catch {
    acc[code] = null
  }
  return acc
}, /** @type {Record<string, Record<string, string>|null>} */ ({}))

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

for (const code of ['nl', 'it', 'ja', 'ko']) {
  const mapPath = join(__dirname, 'maps', `${code}.json`)
  if (!handMaps[code]) {
    console.error(`Missing ${mapPath} — create maps/${code}.json first`)
    process.exit(1)
  }
  const map = { ...handMaps[code], Custom: customNode[code] }
  const missing = base.filter(([k]) => !map[k]).map(([k]) => k)
  if (missing.length) {
    console.error(`${code} missing ${missing.length} keys:`, missing.slice(0, 5))
    process.exit(1)
  }
  const translated = cloneAndTranslate(en, map)
  for (const orbit of translated.pluginArchitecture.orbits) {
    orbit.nodes[orbit.nodes.length - 1] = customNode[code]
  }
  const pairs = base.map(([k]) => [k, map[k]])
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  writeFileSync(join(messagesDir, `${code}.json`), JSON.stringify(translated, null, 2) + '\n')
  console.log(`Wrote ${code}.json (${pairs.length} pairs)`)
}
