import expoConfig from "eslint-config-expo/flat.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist/*"]),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);