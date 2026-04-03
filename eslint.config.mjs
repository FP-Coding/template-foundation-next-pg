import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import js from "@eslint/js";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  globalIgnores([".next/**", ".env.*"]),
]);

export default eslintConfig;
