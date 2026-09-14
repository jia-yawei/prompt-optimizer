import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(relativePath, 'utf8'))

test('root scripts expose only the web build and development pipeline', () => {
  const rootPackage = readJson('package.json')

  assert.equal(rootPackage.scripts.build, 'node scripts/run-many.js build:core build:ui build:web')
  assert.equal(typeof rootPackage.scripts['build:web'], 'string')
  assert.equal(typeof rootPackage.scripts['dev:web'], 'string')
  assert.equal(rootPackage.scripts['build:ext'], undefined)
  assert.equal(rootPackage.scripts['build:desktop'], undefined)
  assert.equal(rootPackage.scripts['mcp:build'], undefined)
  assert.doesNotMatch(rootPackage.scripts.lint, /extension|desktop|mcp-server/)
})

test('only core, ui, and web remain as workspaces', () => {
  const workspace = fs.readFileSync('pnpm-workspace.yaml', 'utf8')
  assert.match(workspace, /packages:\s*\n\s+- packages\/\*/) 
  for (const name of ['packages/desktop', 'packages/extension', 'packages/mcp-server']) {
    assert.equal(fs.existsSync(name), false, `${name} should not be part of the web-only project`)
  }
})

test('web deployment config builds the web package directly', () => {
  const vercel = readJson('vercel.json')
  assert.equal(vercel.buildCommand, 'pnpm build')
  assert.equal(vercel.installCommand, 'pnpm install --frozen-lockfile')
  assert.equal(vercel.outputDirectory, 'packages/web/dist')
})

test('web package keeps an isolated typecheck script', () => {
  const webPackage = readJson('packages/web/package.json')
  assert.match(webPackage.scripts.typecheck, /tsconfig\.typecheck\.json/)
})
