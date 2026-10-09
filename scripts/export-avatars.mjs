import ts from "typescript";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
const animation = ts
  .transpileModule(readFileSync("lib/avatar-animation.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  })
  .outputText.replace("export const", "const");
const source =
  animation +
  "\n" +
  ts.transpileModule(
    readFileSync("lib/avatars.ts", "utf8").replace(/import[^;]+;/, ""),
    {
      compilerOptions: { module: ts.ModuleKind.ESNext },
    },
  ).outputText;
const { avatars, avatarSvg } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
mkdirSync("public/avatars", { recursive: true });
for (const avatar of avatars)
  writeFileSync(`public/avatars/${avatar.id}.svg`, avatarSvg(avatar.id));
console.log(`Exported ${avatars.length} standalone SVG avatars`);
