/**
 * Vercel の Next.js 16 向け post-build 検証が、リポジトリ直下の
 * `.next/` を参照するケースに合わせる。
 *
 * 1) `.next/routes-manifest-deterministic.json` が無い場合は
 *    `routes-manifest.json` を複製する（Vercel が lstat するファイル用）。
 * 2) 親ディレクトリ（クローンルート）に `.next` が無い、または中身が無い場合は
 *    現在のアプリディレクトリ配下の `.next` へディレクトリシンボリックリンクを張る。
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
const linkPath = path.join(repoRoot, ".next");
const appDirName = path.basename(appRoot);
const symlinkTarget = `${appDirName}/.next`;

try {
  const st = fs.lstatSync(linkPath);
  if (st.isSymbolicLink()) {
    fs.unlinkSync(linkPath);
  } else if (st.isDirectory()) {
    const hasRoutes = fs.existsSync(
      path.join(linkPath, "routes-manifest.json")
    );
    if (hasRoutes) {
      console.log(
        "[vercel-postbuild] 親に実体の .next があるためシンボリックリンクは作成しません:",
        linkPath
      );
      process.exit(0);
    }
    fs.rmSync(linkPath, { recursive: true, force: true });
  } else {
    fs.rmSync(linkPath, { recursive: true, force: true });
  }
} catch {
  // 存在しない場合は無視
}

fs.symlinkSync(symlinkTarget, linkPath, "dir");
console.log("[vercel-postbuild] シンボリックリンクを作成:", linkPath, "->", symlinkTarget);
