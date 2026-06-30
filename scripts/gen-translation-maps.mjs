import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
mkdirSync(join(__dirname, 'translations'), { recursive: true })

const base = JSON.parse(readFileSync(join(__dirname, 'locale-pairs-base.json'), 'utf8'))
const enKeys = base.map(([k]) => k)

/** @type {Record<string, Record<string, string>>} */
const allLocales = JSON.parse(
  readFileSync(join(__dirname, 'translations-data.json'), 'utf8'),
)

for (const [code, map] of Object.entries(allLocales)) {
  const missing = enKeys.filter((k) => !map[k])
  if (missing.length) {
    console.error(`${code} missing ${missing.length}:`, missing.slice(0, 3))
    process.exit(1)
  }
  const content =
    `/** Auto-generated translation map for ${code} */\nexport const ${code} = ${JSON.stringify(map, null, 2)}\n`
  writeFileSync(join(__dirname, 'translations', `${code}.mjs`), content)
  const pairs = enKeys.map((k) => [k, map[k]])
  writeFileSync(join(__dirname, `locale-pairs-${code}.json`), JSON.stringify(pairs, null, 2) + '\n')
  console.log(`${code}: ${pairs.length} pairs`)
}
