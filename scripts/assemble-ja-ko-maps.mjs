import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')
const en = JSON.parse(readFileSync(join(messagesDir, 'en.json'), 'utf8'))
const zh = JSON.parse(readFileSync(join(messagesDir, 'zh-CN.json'), 'utf8'))
const keys = JSON.parse(readFileSync(join(__dirname, 'maps/en-keys-only.json'), 'utf8'))

function buildValueMap(a, b, map = new Map()) {
  if (Array.isArray(a) && Array.isArray(b)) {
    a.forEach((item, i) => buildValueMap(item, b[i], map))
    return map
  }
  if (a && typeof a === 'object' && b && typeof b === 'object') {
    for (const k of Object.keys(a)) buildValueMap(a[k], b[k], map)
    return map
  }
  if (typeof a === 'string' && typeof b === 'string') map.set(a, b)
  return map
}

const enToZh = buildValueMap(en, zh)

/** @type {Record<string, string>} */
const jaMap = JSON.parse(readFileSync(join(__dirname, 'maps/ja-overrides.json'), 'utf8'))
/** @type {Record<string, string>} */
const koMap = JSON.parse(readFileSync(join(__dirname, 'maps/ko-overrides.json'), 'utf8'))

/** Fill missing from zh reference + romanized technical terms */
for (const enKey of keys) {
  if (!jaMap[enKey]) {
    const zhVal = enToZh.get(enKey) ?? enKey
    jaMap[enKey] = zhVal
  }
  if (!koMap[enKey]) {
    const zhVal = enToZh.get(enKey) ?? enKey
    koMap[enKey] = zhVal
  }
}

writeFileSync(
  join(__dirname, 'maps/ja-ko-maps.json'),
  JSON.stringify({ jaMap, koMap }, null, 2) + '\n',
)
console.log('Wrote ja-ko-maps.json', Object.keys(jaMap).length)
