import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tanstackQuery.configs["flat/recommended"],
  prettierConfig,
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "shared", pattern: "src/shared/*", mode: "folder" },
        { type: "entities", pattern: "src/entities/*", mode: "folder" },
        { type: "features", pattern: "src/features/*", mode: "folder" },
        { type: "widgets", pattern: "src/widgets/*", mode: "folder" },
        { type: "pages", pattern: "src/pages-layer/*", mode: "folder" },
        { type: "app", pattern: "src/app/**", mode: "folder" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: ["shared"], allow: ["shared"] },
            { from: ["entities"], allow: ["shared", "entities"] },
            { from: ["features"], allow: ["shared", "entities", "features"] },
            {
              from: ["widgets"],
              allow: ["shared", "entities", "features", "widgets"],
            },
            {
              from: ["pages"],
              allow: ["shared", "entities", "features", "widgets", "pages"],
            },
            {
              from: ["app"],
              allow: [
                "shared",
                "entities",
                "features",
                "widgets",
                "pages",
                "app",
              ],
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
