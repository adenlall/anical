import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react/display-name": "off", // Disable the react/display-name rule
      "import/no-anonymous-default-export": "off", // Disable the import/no-anonymous-default-export rule
    },
    // Add the `ignores` property here
  },
  {
    ignores: [
      "node_modules/",        // Ignore the node_modules directory
      "dist/",                // Ignore the dist directory
      "**/*.test.ts",         // Ignore all test files
      "lib/*", // Ignore a specific file
      "lib/types/anilist.ts", // Ignore a specific file
      "**/anilist.ts", // Ignore a specific file
      "./lib/types/anilist.ts",
    ]
  },
];

export default eslintConfig;