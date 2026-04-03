import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import globals from "globals";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: globals.jest,
    },
    plugins: { jest },
    rules: { ...jest.configs.recommended.rules },
  },
  { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  globalIgnores([".next/**", ".env.*"]),
]);

export default eslintConfig;
