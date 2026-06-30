import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { nlMap } from './maps/nl-map.mjs'
import { itMap } from './maps/it-map.mjs'
import { jaMap } from './maps/ja-map.mjs'
import { koMap } from './maps/ko-map.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))

/** @param {string} code @param {Record<string, string>} map */
function writeLocale(code, map) {
  const pairs = base.map(([enKey]) => {
    const val = map[enKey]
    if (!val) throw new Error(`Missing ${code}: ${JSON.stringify(enKey).slice(0, 80)}`)
    return [enKey, val]
  })
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  console.log(`Wrote locale-pairs-${code}.json (${pairs.length})`)
}

writeLocale('nl', nlMap)
writeLocale('it', itMap)
writeLocale('ja', jaMap)
writeLocale('ko', koMap)
