# rinopro へのコピーガイド

この独立デモは、`src/features/professional-mini-sfa` を中心に、`rinopro` へ移植しやすい構成で作っています。

## まずコピーするフォルダ

以下をそのまま `rinopro` 側へ持っていく想定です。

```text
src/features/professional-mini-sfa/
```

含まれる内容:

- `ProfessionalMiniSfaDemo.tsx`
- `useProfessionalMiniSfaDemo.ts`
- `constants.ts`
- `demo-copy.ts`
- `mock-deals.ts`
- `selectors.ts`
- `storage.ts`
- `types.ts`
- `components/*`

## rinopro 側で必要になる主な調整

1. `src/components/experience/prototypes/ProfessionalMiniSfaExperience.tsx` から
   `ProfessionalMiniSfaDemo` を呼び出す薄いラッパーを作る
2. `@/features/professional-mini-sfa` の import alias が使えない場合は、既存構成に合わせて
   `src/lib/experience/professional-mini-sfa` や
   `src/components/experience/prototypes/professional-mini-sfa` へ分割配置する
3. `prototype-registry.ts` の文言と導線文言を、独立デモ版に合わせて更新する

## 最小の置き換えイメージ

`rinopro` 側で既存の `ProfessionalMiniSfaExperience.tsx` を薄くする場合の例:

```tsx
"use client";

import type { ExperiencePrototypeMeta } from "@/lib/experience/prototype-registry";
import { ProfessionalMiniSfaDemo } from "@/features/professional-mini-sfa";

interface ProfessionalMiniSfaExperienceProps {
  meta: ExperiencePrototypeMeta;
  className?: string;
}

export function ProfessionalMiniSfaExperience({
  meta: _meta,
  className,
}: ProfessionalMiniSfaExperienceProps) {
  return (
    <div className={className}>
      <ProfessionalMiniSfaDemo />
    </div>
  );
}
```

## 注意点

- 独立デモ版は Tailwind と React だけで動くようにしているため、`rinopro` の既存 UI コンポーネントには依存していません
- `localStorage` キーは `professional-mini-sfa-demo:v1` を使っています
- `rinopro` 側で既に同名キーを使っている場合は、必要に応じて `storage.ts` のキーを分けてください
