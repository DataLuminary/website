import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { pt } from './translations/pt.mjs'
import { nl } from './translations/nl.mjs'
import { it } from './translations/it.mjs'
import { ja } from './translations/ja.mjs'
import { ko } from './translations/ko.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))

/** @type {Record<string, Record<string, string>>} */
const maps = { pt, nl, it, ja, ko }

for (const [code, map] of Object.entries(maps)) {
  const pairs = base.map(([enKey]) => {
    const val = map[enKey]
    if (!val) throw new Error(`Missing ${code} translation for: ${enKey.slice(0, 80)}...`)
    return [enKey, val]
  })
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  console.log(`Wrote locale-pairs-${code}.json (${pairs.length} pairs)`)
}
