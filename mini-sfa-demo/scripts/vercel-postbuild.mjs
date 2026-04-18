/**
 * Vercel の Next.js 16 向け post-build 検証が、リポジトリ直下の
 * `.next/` を参照するケースに合わせる。
 *
 * 1) `.next/routes-manifest-deterministic.json` が無い場合は
 *    `routes-manifest.json` を複製する。
 * 2) `mini-sfa-demo/.next` をリポジトリルートの `.next` へ実体コピーする。
 *    （シンボリックリンクは post-build の lstat で解決されないことがある）
 *
 * @see https://github.com/vercel/vercel/issues/15937
 */
import fs from "node:fs";
import path from "node:path";

if (process.env.VERCEL !== "1") {
  process.exit(0);
}

const appRoot = process.cwd();
const nextDir = path.join(appRoot, ".next");
const routesManifest = path.join(nextDir, "routes-manifest.json");
const routesDeterministic = path.join(
  nextDir,
  "routes-manifest-deterministic.json"
);

if (!fs.existsSync(nextDir)) {
  console.error("[vercel-postbuild] .next が存在しません:", nextDir);
  process.exit(1);
}

if (fs.existsSync(routesManifest) && !fs.existsSync(routesDeterministic)) {
  fs.copyFileSync(routesManifest, routesDeterministic);
  console.log(
    "[vercel-postbuild] routes-manifest-deterministic.json を routes-manifest.json から作成しました"
  );
}

const repoRoot = path.resolve(appRoot, "..");
const destNext = path.join(repoRoot, ".next");

fs.rmSync(destNext, { recursive: true, force: true });
fs.cpSync(nextDir, destNext, { recursive: true });
console.log("[vercel-postbuild] .next をリポジトリルートへコピーしました:", destNext);
