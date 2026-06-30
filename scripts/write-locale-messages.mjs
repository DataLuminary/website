import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
const en = JSON.parse(readFileSync(join(messagesDir, 'en.json'), 'utf8'))

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

function fromPairs(pairs) {
  const m = {}
  for (const [k, v] of pairs) m[k] = v
  return m
}

const customNode = {
  pt: 'Personalizado',
  nl: 'Aangepast',
  it: 'Personalizzato',
  ja: 'カスタム',
  ko: '사용자 정의',
}

const locales = ['pt', 'nl', 'it', 'ja', 'ko']
for (const code of locales) {
  const pairs = JSON.parse(
    readFileSync(join(__dirname, `locale-pairs-${code}.json`), 'utf8'),
  )
  const map = fromPairs(pairs)
  map.Custom = customNode[code]
  const translated = cloneAndTranslate(en, map)
  for (const orbit of translated.pluginArchitecture.orbits) {
    const nodes = orbit.nodes
    nodes[nodes.length - 1] = customNode[code]
  }
  writeFileSync(
    join(messagesDir, `${code}.json`),
    JSON.stringify(translated, null, 2) + '\n',
    'utf8',
  )
  console.log(`Wrote ${code}.json`)
}
