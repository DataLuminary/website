import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = join(__dirname, '..', 'messages')

/** @returns {string[]} */
function collectKeys(obj, prefix = '') {
  /** @type {string[]} */
  const keys = []
  if (Array.isArray(obj)) {
    keys.push(prefix)
    obj.forEach((item, i) => {
      keys.push(...collectKeys(item, `${prefix}[${i}]`))
    })
  } else if (obj !== null && typeof obj === 'object') {
    if (prefix) keys.push(prefix)
    for (const [k, v] of Object.entries(obj)) {
      keys.push(...collectKeys(v, prefix ? `${prefix}.${k}` : k))
    }
  } else {
    keys.push(prefix)
  }
  return keys
}

/** Leaf string keys only */
function collectLeafKeys(obj, prefix = '') {
  /** @type {string[]} */
  const keys = []
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => keys.push(...collectLeafKeys(item, `${prefix}[${i}]`)))
  } else if (obj !== null && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      keys.push(...collectLeafKeys(v, prefix ? `${prefix}.${k}` : k))
    }
  } else {
    keys.push(prefix)
  }
  return keys
}

const reference = JSON.parse(readFileSync(join(messagesDir, 'zh-CN.json'), 'utf8'))
const refLeafKeys = collectLeafKeys(reference).sort()
const refCount = refLeafKeys.length

const locales = ['en', 'es', 'pt', 'nl', 'it', 'ja', 'ko']
/** @type {Record<string, { match: boolean; leafCount: number; missing: string[]; extra: string[] }>} */
const report = {}

for (const locale of locales) {
  const data = JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), 'utf8'))
  const leafKeys = collectLeafKeys(data).sort()
  const missing = refLeafKeys.filter((k) => !leafKeys.includes(k))
  const extra = leafKeys.filter((k) => !refLeafKeys.includes(k))
  report[locale] = {
    match: missing.length === 0 && extra.length === 0,
    leafCount: leafKeys.length,
    missing,
    extra,
  }
}

console.log('Reference (zh-CN) leaf key count:', refCount)
console.log('')
for (const locale of locales) {
  const r = report[locale]
  const status = r.match ? 'OK' : 'MISMATCH'
  console.log(`${locale}.json: ${status} — ${r.leafCount} leaf keys`)
  if (!r.match) {
    if (r.missing.length) console.log(`  missing (${r.missing.length}):`, r.missing.slice(0, 5))
    if (r.extra.length) console.log(`  extra (${r.extra.length}):`, r.extra.slice(0, 5))
  }
}

const allMatch = locales.every((l) => report[l].match)
console.log('')
console.log(allMatch ? 'All locale files have identical key structure.' : 'Structure mismatch detected.')
process.exit(allMatch ? 0 : 1)
