import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(["dist/*"]),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    languageOptions: {
      parser: tsParser,

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      "@typescript-eslint": typescriptEslint,
      "simple-import-sort": simpleImportSort,
    },

    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ),

    rules: {
      "prefer-const": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          vars: "all",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    // These files broke the React Compiler rules before CI existed. They stay
    // warnings here, and only here, until #97 fixes them in code: the
    // data-loading hooks, the pain scale and the speaker toggle have no screen
    // tests to catch a regression. Remove a file from the list once it is
    // clean; everywhere else the rules are errors.
    files: [
      "app/components/BoardSkeleton.tsx",
      "app/components/SpeakerToggleButton.tsx",
      "app/components/pain-scale/PainScaleSlider.tsx",
      "app/components/pain-scale/PainScaleTray.tsx",
      "app/hooks/useBoardTerms.ts",
      "app/hooks/useBoards.ts",
      "app/hooks/useEmergency.ts",
      "app/hooks/useModuleBoardTerms.ts",
      "app/hooks/useNextBoards.ts",
      "app/hooks/usePhraseNextBoards.ts",
      "app/hooks/usePhrases.ts",
      "app/hooks/useProfession.ts",
      "app/hooks/useSpecialities.ts",
      "app/hooks/useSyncEngine.ts",
      "app/hooks/useTriage.ts",
      "app/navigation/MainTabNav.tsx",
      "app/screens/main-tabs/comm-board/CommBoardScreen.tsx",
      "app/screens/main-tabs/comm-board/NoConsultationScreen.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
    },
  },
]);
