import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    plugins: {
      "import-plugin": importPlugin,
    },
    rules: {
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "if" },
        { blankLine: "always", prev: "*", next: "for" },
        { blankLine: "always", prev: "*", next: "while" },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "*", next: "function" },
      ],

      "import-plugin/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "./**",
              group: "internal",
              position: "after",
            },
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
