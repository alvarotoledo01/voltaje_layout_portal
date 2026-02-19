import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");

const srcDir = path.resolve(projectRoot, "..", "layout", "assets");
const destDir = path.resolve(projectRoot, "public", "layouts");

const files = [
  { from: "planta_baja.html", to: "planta_baja.html" },
  { from: "primer_piso.html", to: "primer_piso.html" },
  { from: "category_plan.json", to: "category_plan.json" },
  { from: "planta_baja_table.json", to: "planta_baja_table.json" },
  { from: "primer_piso_table.json", to: "primer_piso_table.json" },
];

fs.mkdirSync(destDir, { recursive: true });

let copied = 0;
for (const f of files) {
  const from = path.resolve(srcDir, f.from);
  const to = path.resolve(destDir, f.to);
  if (!fs.existsSync(from)) {
    console.warn(`[sync-layouts] WARN: no existe ${from} (se omite)`);
    continue;
  }
  fs.copyFileSync(from, to);
  copied += 1;
  console.log(`[sync-layouts] OK: ${f.from} -> public/layouts/${f.to}`);
}

if (copied === 0) {
  console.warn(
    "[sync-layouts] No se copió ningún archivo. ¿Generaste los HTML con Python en layout/assets/?"
  );
}

