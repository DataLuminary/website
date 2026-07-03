import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const env = { ...process.env, NODE_ENV: 'production' }

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    shell: true,
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run('next', ['build'])
run('node', ['scripts/postbuild-static.mjs'])
