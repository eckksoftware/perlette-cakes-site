import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imagesRoot = path.join(process.cwd(), 'src/assets/images');
const warnBytes = 800 * 1024;
const failBytes = 1024 * 1024;
const allowedExtensions = /\.(jpe?g|png|webp|avif)$/i;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'originals') continue;
      walk(fullPath, files);
      continue;
    }

    if (allowedExtensions.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = walk(imagesRoot).sort();
const failures = [];
const warnings = [];

for (const file of files) {
  const stat = fs.statSync(file);
  const relativePath = path.relative(process.cwd(), file);
  const sizeKb = (stat.size / 1024).toFixed(1);
  let dimensions = 'unknown';

  try {
    const metadata = await sharp(file).metadata();
    dimensions = `${metadata.width}x${metadata.height}`;
  } catch {
    // Keep the check simple. File size is the hard rule.
  }

  const line = `${sizeKb} KB\t${dimensions}\t${relativePath}`;

  if (stat.size > failBytes) {
    failures.push(line);
    continue;
  }

  if (stat.size > warnBytes) {
    warnings.push(line);
    continue;
  }

  console.log(`ok\t${line}`);
}

if (warnings.length) {
  console.warn('\nWarnings: source images above 800 KB target');
  for (const line of warnings) {
    console.warn(`warn\t${line}`);
  }
}

if (failures.length) {
  console.error('\nFailures: source images above 1 MB hard limit');
  for (const line of failures) {
    console.error(`fail\t${line}`);
  }
  process.exit(1);
}
