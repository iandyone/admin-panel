import { dirname } from "path";

import { fileURLToPath } from "url";

import defaultConfig from "@configs/eslint";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...defaultConfig,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
