#!/usr/bin/env node
/**
 * Optional recovery: strip UTF-8 BOM from JSON (after bad bulk edits or stale cache).
 * Normal workflow: `pnpm dev`. Use `pnpm run dev:clean` only if encoding/cache issues return.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const SKIP_DIR = new Set(['node_modules', '.git', '.next'])

function stripBom(filePath) {
  const buf = fs.readFileSync(filePath)
  const hasUtf8Bom =
    buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf
  if (!hasUtf8Bom) return false
  const text = buf.subarray(3).toString('utf8').replace(/^\uFEFF/, '')
  fs.writeFileSync(filePath, text, 'utf8')
  return true
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(ent.name)) continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (ent.name.endsWith('.json')) out.push(p)
  }
  return out
}

const nextJsonCandidates = [
  '.next/package.json',
  '.next/build/package.json',
  '.next/dev/package.json',
]

const targets = [
  path.join(root, 'package.json'),
  path.join(root, 'tsconfig.json'),
  path.join(root, 'components.json'),
  ...walk(path.join(root, 'messages')),
  ...walk(path.join(root, 'scripts')),
  ...nextJsonCandidates.map((rel) => path.join(root, rel)),
]

let fixed = 0
for (const file of [...new Set(targets)]) {
  if (!fs.existsSync(file)) continue
  if (stripBom(file)) {
    fixed++
    console.log('strip BOM:', path.relative(root, file))
  }
}

console.log(fixed ? `Done. Fixed ${fixed} file(s).` : 'No UTF-8 BOM found in scanned JSON.')
