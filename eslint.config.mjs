import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    // eslint-plugin-react-hooks 7 (pulled in by eslint-config-next 16) added
    // rules that flag the SSR-hydration pattern used across several client
    // components: an empty-dep effect that sets state once on mount to read
    // localStorage or flip a "mounted" flag.
    //
    // These are pre-existing and intentional, not regressions. Migrating them
    // to useSyncExternalStore is a real refactor with hydration-mismatch risk,
    // so they are warnings until that work is scheduled rather than errors
    // that block every build.
    //
    // TODO: migrate the flagged effects to useSyncExternalStore and restore
    // these to "error".
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
