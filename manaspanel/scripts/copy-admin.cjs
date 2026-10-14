
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '../dist');
const admin = path.join(dist, 'admin');

fs.mkdirSync(admin, { recursive: true });

// Copy built index.html into dist/admin/
fs.copyFileSync(
  path.join(dist, 'index.html'),
  path.join(admin, 'index.html')
);

// Copy assets into dist/admin/assets/
const assets = path.join(dist, 'assets');
const adminAssets = path.join(admin, 'assets');

if (fs.existsSync(assets)) {
  fs.cpSync(assets, adminAssets, { recursive: true });
}

console.log('Admin build files copied successfully.');
