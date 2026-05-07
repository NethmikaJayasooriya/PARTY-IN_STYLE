// Script to remove dark background from logo
// Run with: node scripts/remove-logo-bg.js

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function removeBg() {
  try {
    const img = await loadImage('public/logo.png');
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate brightness
      const brightness = (r + g + b) / 3;

      // If pixel is dark (background), make it transparent
      // The bg is roughly #2d3436 = rgb(45, 52, 54) -> brightness ~50
      if (brightness < 75) {
        data[i + 3] = 0; // Set alpha to 0
      }
      // Fade semi-dark pixels for smooth edges
      else if (brightness < 100) {
        data[i + 3] = Math.round(((brightness - 75) / 25) * 255);
      }
    }

    ctx.putImageData(imageData, 0, 0);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('public/logo.png', buffer);
    console.log('Done! Background removed from logo.');
  } catch (err) {
    console.error('Error:', err.message);
    console.log('Install canvas: npm install canvas');
  }
}

removeBg();
