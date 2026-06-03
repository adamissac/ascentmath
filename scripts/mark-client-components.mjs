import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "components");

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".tsx")) continue;
  const filePath = path.join(dir, file);
  const source = fs.readFileSync(filePath, "utf8");
  if (source.startsWith('"use client"') || source.startsWith("'use client'")) continue;
  fs.writeFileSync(filePath, `"use client";\n\n${source}`);
  console.log("marked", file);
}
