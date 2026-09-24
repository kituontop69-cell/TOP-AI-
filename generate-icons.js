import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Solid deep black background -->
  <rect width="512" height="512" fill="#000000"/>
  
  <!-- Outer sharp kinetic border -->
  <rect x="24" y="24" width="464" height="464" fill="none" stroke="#FF4D00" stroke-width="16"/>

  <!-- Brutalist Vault Monogram / Shield -->
  <path d="M120 120 H392 V260 C392 340 330 400 256 424 C182 400 120 340 120 260 Z"
        fill="#FF4D00"
        stroke="#000000"
        stroke-width="12"/>

  <!-- Inner Black Cutout -->
  <path d="M168 168 H344 V256 C344 312 300 354 256 372 C212 354 168 312 168 256 Z"
        fill="#000000"/>

  <!-- Kinetic Central Spark / Diamond -->
  <polygon points="256,192 304,256 256,320 208,256" fill="#FFFFFF"/>
  <circle cx="256" cy="256" r="14" fill="#FF4D00"/>
</svg>`;

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  console.log('Saved Kinetic Orange favicon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // Generate pwa-512x512.png
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Saved pwa-512x512.png');

  // Generate pwa-192x192.png
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Saved pwa-192x192.png');

  // Generate apple-touch-icon.png
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Saved apple-touch-icon.png');

  // Generate favicon.png
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.png'));
  console.log('Saved favicon.png');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
