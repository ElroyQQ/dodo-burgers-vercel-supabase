// "Build" check for a static, no-bundler site: confirms every local asset
// index.html references (images/, css url(), etc.) actually exists, so a
// typo'd path fails CI instead of shipping a broken image to production.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const refs = new Set();
for (const m of html.matchAll(/["'(]images\/[^"'?#)]+/g)) refs.add(m[0].slice(1));

let missing = [];
for (const ref of refs) {
  if (!fs.existsSync(path.join(root, ref))) missing.push(ref);
}

if (missing.length) {
  console.error("Missing referenced assets:\n" + missing.map((m) => "  - " + m).join("\n"));
  process.exit(1);
}

console.log(`OK: all ${refs.size} referenced local assets exist.`);
