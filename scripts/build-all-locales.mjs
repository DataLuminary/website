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
  es: 'Personalizado',
  pt: 'Personalizado',
  nl: 'Aangepast',
  it: 'Personalizzato',
  ja: 'カスタム',
  ko: '사용자 정의',
}

/** @type {Record<string, [string, string][]>} */
const localeFiles = {
  es: JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8')),
  pt: JSON.parse(readFileSync(join(__dirname, 'locale-pairs-pt.json'), 'utf8')),
  nl: JSON.parse(readFileSync(join(__dirname, 'locale-pairs-nl.json'), 'utf8')),
  it: JSON.parse(readFileSync(join(__dirname, 'locale-pairs-it.json'), 'utf8')),
  ja: JSON.parse(readFileSync(join(__dirname, 'locale-pairs-ja.json'), 'utf8')),
  ko: JSON.parse(readFileSync(join(__dirname, 'locale-pairs-ko.json'), 'utf8')),
}

for (const [code, pairs] of Object.entries(localeFiles)) {
  const map = fromPairs(pairs)
  map.Custom = customNode[code]
  const translated = cloneAndTranslate(en, map)
  for (const orbit of translated.pluginArchitecture.orbits) {
    const nodes = orbit.nodes
    const last = nodes[nodes.length - 1]
    if (['Custom', 'Personalizado', 'Aangepast', 'Personalizzato', 'カスタム', '사용자 정의'].includes(last)) {
      nodes[nodes.length - 1] = customNode[code]
    }
  }
  writeFileSync(join(messagesDir, `${code}.json`), JSON.stringify(translated, null, 2) + '\n', 'utf8')
  console.log(`Wrote ${code}.json (${pairs.length} pairs)`)
}
