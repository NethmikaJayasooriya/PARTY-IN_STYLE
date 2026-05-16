/**
 * Image Optimization Script
 * Compresses all PNG images in public/images to high-quality JPEG
 * and converts hero images to optimized WebP for maximum performance.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "public", "images");

// Hero images that need aggressive optimization (they're 6-12MB PNGs!)
const HERO_IMAGES = [
  "hero-birthday.png",
  "hero-themed.png",
  "hero-wedding-user.png",
  "hero-corporate-user.png",
];

// All other PNG images that should be optimized
const OTHER_PNGS = fs
  .readdirSync(IMAGES_DIR)
  .filter((f) => f.endsWith(".png") && !HERO_IMAGES.includes(f));

async function optimizeImage(filename, opts = {}) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const baseName = path.parse(filename).name;
  const outputPath = path.join(IMAGES_DIR, `${baseName}.webp`);

  const stats = fs.statSync(inputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  try {
    const metadata = await sharp(inputPath).metadata();
    
    // For hero images: resize to max 1920px wide, high quality WebP
    if (HERO_IMAGES.includes(filename)) {
      await sharp(inputPath)
        .resize({ width: 1920, height: 1080, fit: "cover" })
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);
    } else {
      // For other images: resize to max 800px, good quality WebP
      const maxWidth = opts.maxWidth || 800;
      await sharp(inputPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
    }

    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    console.log(
      `✅ ${filename} (${sizeMB}MB) → ${baseName}.webp (${newSizeMB}MB) [${savings}% saved]`
    );
  } catch (err) {
    console.error(`❌ ${filename}: ${err.message}`);
  }
}

async function main() {
  console.log("🚀 Starting image optimization...\n");
  console.log("=== HERO IMAGES (1920x1080 WebP) ===");
  for (const img of HERO_IMAGES) {
    await optimizeImage(img);
  }

  console.log("\n=== OTHER IMAGES (800px WebP) ===");
  for (const img of OTHER_PNGS) {
    await optimizeImage(img);
  }

  console.log("\n✨ Done! All images optimized.");
}

main();
