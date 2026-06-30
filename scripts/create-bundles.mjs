import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { nlMap } from './maps/nl-map.mjs'
import { itMap } from './maps/it-map.mjs'
import { jaMap } from './maps/ja-map.mjs'
import { koMap } from './maps/ko-map.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const keys = JSON.parse(readFileSync(join(__dirname, 'maps/en-keys-only.json'), 'utf8'))

const bundles = {
  nl: keys.map((k) => nlMap[k]),
  it: keys.map((k) => itMap[k]),
  ja: keys.map((k) => jaMap[k]),
  ko: keys.map((k) => koMap[k]),
}

for (const [code, arr] of Object.entries(bundles)) {
  const bad = keys.filter((k, i) => !arr[i])
  if (bad.length) throw new Error(`${code} missing: ${bad.slice(0, 3).join(', ')}`)
}

writeFileSync(join(__dirname, 'locale-bundles.json'), JSON.stringify(bundles, null, 2) + '\n')
console.log('Wrote locale-bundles.json')
