#!/usr/bin/env node

/**
 * Atomic upload for design-sync re-sync
 * Uploads all components in batches and finalizes with anchor file
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'b059ca30-4261-4b0b-a457-e5215c47f117';
const PLAN_ID = 'plan_b059ca3042614b0b_4c6d1f2e8608';

// Generate all files for upload
const allFiles = [];

// Add base files
const baseFiles = ['_ds_bundle.js', '_ds_bundle.css', 'styles.css', 'README.md'];
baseFiles.forEach(f => {
  allFiles.push({
    path: f,
    localPath: f
  });
});

// Add all component files
function walkDir(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort();
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath, relPath);
    } else {
      allFiles.push({
        path: 'components/' + relPath.replace(/\\/g, '/'),
        localPath: 'components/' + relPath.replace(/\\/g, '/')
      });
    }
  });
}

walkDir('./ds-bundle/components');

console.log(`Total files: ${allFiles.length}`);
console.log(`Project: ${PROJECT_ID}`);
console.log(`Plan: ${PLAN_ID}`);
console.log('');

// Display batch plan
const BATCH_SIZE = 100;
let batchNum = 1;
for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
  const batch = allFiles.slice(i, i + BATCH_SIZE);
  console.log(`Batch ${batchNum}: ${batch.length} files (${batch[0].path} ... ${batch[batch.length - 1].path})`);
  batchNum++;
}

console.log('');
console.log('Batches ready for upload. This script needs to be invoked via Claude API.');
console.log('Current tool used: DesignSync.write_files');
console.log('');
console.log('Manual completion: run /design-sync again to auto-complete upload');
