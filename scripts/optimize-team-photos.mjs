import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const entries = [
  ['manoel', 'manoel-neto', 'manoel-neto-estudio-v2.png'],
  ['ronan', 'ronan-severo', 'ronan-severo-estudio-v2.png'],
  ['yuri', 'yuri-gabriel', 'yuri-gabriel-estudio-v2.png'],
  ['maksuel', 'maksuel-silva', 'macsuel-silva-estudio-v2.png'],
]
const destination = path.join(root, 'public/team/responsive')
const sizes =
  '(max-width: 560px) calc(100vw - 48px), (max-width: 800px) calc((100vw - 80px) / 2), 280px'
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')
await fs.mkdir(destination, { recursive: true })
const photos = {}
const report = []
const generated = new Set()

for (const [id, name, sourceName] of entries) {
  const sourcePath = `assets-src/team/${sourceName}`
  const source = await fs.readFile(path.join(root, sourcePath))
  const original = await sharp(source).metadata()
  const variants = []
  for (const width of [360, 720]) {
    // Keep the master untouched. Verify lossless encoding against the resized pixels,
    // rather than incorrectly claiming a resized image has the original dimensions.
    const resized = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .keepIccProfile()
      .png()
      .toBuffer()
    const baseline = await sharp(resized).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const encoded = await sharp(resized)
      .keepIccProfile()
      .webp({ lossless: true, exact: true, effort: 6 })
      .toBuffer()
    const decoded = await sharp(encoded).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    assert.deepEqual(decoded.info, baseline.info, `${name}/${width}: dimensions/channels changed`)
    assert.ok(decoded.data.equals(baseline.data), `${name}/${width}: decoded pixels differ`)
    const sha256 = digest(encoded)
    const filename = `${name}-${width}-${sha256.slice(0, 12)}.webp`
    generated.add(filename)
    await fs.writeFile(path.join(destination, filename), encoded)
    variants.push({
      localPath: `public/team/responsive/${filename}`,
      objectKey: `team/${filename}`,
      width: decoded.info.width,
      height: decoded.info.height,
      bytes: encoded.length,
      sha256,
      pixelsIdenticalToResizedSource: true,
      decodedPixelsSha256: digest(decoded.data),
    })
  }
  const full = variants.at(-1)
  const src = full.localPath.replace(/^public/, '')
  const srcSet = variants
    .map((variant) => `${variant.localPath.replace(/^public/, '')} ${variant.width}w`)
    .join(', ')
  photos[id] = {
    src,
    srcSet,
    fallback: src,
    fallbackSrcSet: srcSet,
    sizes,
    width: full.width,
    height: full.height,
  }
  report.push({
    id,
    source: sourcePath,
    sourceBytes: source.length,
    sourceSha256: digest(source),
    originalWidth: original.width,
    originalHeight: original.height,
    variants,
  })
}
// Only remove obsolete generated variants; source portraits and R2 objects stay preserved.
for (const filename of await fs.readdir(destination)) {
  if (/^[a-z-]+-(360|720)-[a-f0-9]{12}\.webp$/.test(filename) && !generated.has(filename)) {
    await fs.unlink(path.join(destination, filename))
  }
}
await fs.writeFile(
  path.join(root, 'src/data/teamPhotos.ts'),
  `// Generated responsive lossless WebP; full-resolution masters stay in assets-src/team.\nexport const teamPhotos = ${JSON.stringify(photos, null, 2)} as const\n`,
)
await fs.writeFile(
  path.join(root, 'docs/TEAM-PHOTO-OPTIMIZATION.json'),
  JSON.stringify(
    {
      format: 'WebP lossless',
      variantWidths: [360, 720],
      originalsPreserved: true,
      verified:
        'Decoded RGBA bytes match each resized reference, including transparency. Resizing is explicit; full-resolution originals are archived.',
      photos: report,
    },
    null,
    2,
  ) + '\n',
)
console.table(
  report.map((photo) => ({
    id: photo.id,
    masterBytes: photo.sourceBytes,
    smallBytes: photo.variants[0].bytes,
    retinaBytes: photo.variants[1].bytes,
  })),
)
