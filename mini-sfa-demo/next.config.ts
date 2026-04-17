import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** このアプリのルート（親ディレクトリの lockfile 誤検出時のトレース基準を固定する） */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
