import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'
import { format } from 'prettier'

const [bucket, publicBase] = process.argv.slice(2)
if (!bucket || !publicBase) {
  throw new Error('Use: npm run photos:upload -- <bucket> <https://public-image-domain>')
}
assert.match(bucket, /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/, 'Invalid bucket name')
const base = new URL(publicBase)
assert.ok(
  base.protocol === 'https:' && !base.username && !base.password && !base.search && !base.hash,
  'Use the public HTTPS image URL without credentials or query strings',
)
const root = fileURLToPath(new URL('../', import.meta.url))
const report = JSON.parse(
  await fs.readFile(path.join(root, 'docs/TEAM-PHOTO-OPTIMIZATION.json'), 'utf8'),
)
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')
const wrangler = path.join(root, 'node_modules/wrangler/bin/wrangler.js')

// Verify every local artifact before making remote changes.
for (const photo of report.photos) {
  assert.ok(photo.pixelsIdentical, 'Run photos:optimize first')
  assert.equal(digest(await fs.readFile(path.join(root, photo.localPath))), photo.sha256)
}
for (const photo of report.photos) {
  execFileSync(
    process.execPath,
    [
      wrangler,
      'r2',
      'object',
      'put',
      `${bucket}/${photo.objectKey}`,
      '--file',
      path.join(root, photo.localPath),
      '--content-type',
      'image/webp',
      '--cache-control',
      'public,max-age=31536000,immutable',
      '--remote',
    ],
    { cwd: root, stdio: 'inherit' },
  )
}

const manifest = {}
const published = []
for (const photo of report.photos) {
  const url = `${base.href.replace(/\/$/, '')}/${photo.objectKey}`
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  assert.ok(response.ok, `Public image unavailable: ${response.status} ${url}`)
  assert.ok(
    response.headers.get('content-type')?.startsWith('image/webp'),
    'Unexpected response type',
  )
  assert.equal(
    digest(Buffer.from(await response.arrayBuffer())),
    photo.sha256,
    `Remote bytes differ: ${url}`,
  )
  manifest[photo.id] = {
    src: url,
    fallback: photo.localPath.replace(/^public/, ''),
    width: photo.width,
    height: photo.height,
  }
  published.push({ id: photo.id, url, sha256: photo.sha256 })
}
// Switch the site only after all four public downloads match the verified files.
const source = `// Published to R2 with npm run photos:upload; remote bytes verified before switching.\nexport const teamPhotos = ${JSON.stringify(manifest, null, 2)} as const\n`
await fs.writeFile(
  path.join(root, 'src/data/teamPhotos.ts'),
  await format(source, { parser: 'typescript', singleQuote: true, semi: false, printWidth: 100 }),
)
await fs.writeFile(
  path.join(root, 'docs/TEAM-PHOTO-PUBLICATION.json'),
  JSON.stringify(
    {
      bucket,
      verified: 'SHA-256 of every public R2 download matches the local lossless image',
      photos: published,
    },
    null,
    2,
  ) + '\n',
)
console.log('All four R2 images verified. Site references updated; run checks before committing.')
