import { dirname } from "path";
import { fileURLToPath } from "url";

import defaultConfig from "@configs/eslint";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import playwright from "eslint-plugin-playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...defaultConfig,
  ...pluginQuery.configs["flat/recommended"],
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["playwright/**/*.{ts,tsx}"],
    ...playwright.configs["flat/recommended"],
  },
];

export default eslintConfig;
