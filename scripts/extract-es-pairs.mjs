import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const script = readFileSync(join(__dirname, 'generate-6-locales.mjs'), 'utf8')
const block = script.split('es: {')[1].split('\n  },\n}')[0]

/** @type {[string, string][]} */
const pairs = []
const lineRe =
  /^\s{4}('(?:\\'|[^'])*'|[A-Za-z][A-Za-z /]*):\s*\n?\s*('(?:\\'|[^'])*'|"(?:\\"|[^"])*"),?\s*$/gm

let m
while ((m = lineRe.exec(block)) !== null) {
  let key = m[1]
  let val = m[2]
  if (key.startsWith("'")) key = key.slice(1, -1).replace(/\\'/g, "'")
  else if (key.startsWith('"')) key = key.slice(1, -1)
  if (val.startsWith("'")) val = val.slice(1, -1).replace(/\\'/g, "'")
  else if (val.startsWith('"')) val = val.slice(1, -1)
  pairs.push([key, val])
}

writeFileSync(join(__dirname, 'locale-pairs-base.json'), JSON.stringify(pairs, null, 2) + '\n')
console.log('Extracted', pairs.length, 'pairs')
