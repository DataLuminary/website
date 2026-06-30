import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const outDir = join(import.meta.dirname, '..', 'out')
const defaultLocale = 'zh-CN'
const source = join(outDir, defaultLocale, 'index.html')
const target = join(outDir, 'index.html')

if (!existsSync(source)) {
  console.error(`Missing default locale page: ${source}`)
  process.exit(1)
}

copyFileSync(source, target)
console.log(`Copied ${defaultLocale}/index.html → index.html`)
