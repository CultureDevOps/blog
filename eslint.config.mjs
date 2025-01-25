import js from "@eslint/js"
import { fileURLToPath } from "url"
import { dirname } from "path"
import typescriptParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tailwind from "eslint-plugin-tailwindcss"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import globals from "globals"
import { FlatCompat } from "@eslint/eslintrc"

// Obtenez le chemin du répertoire courant
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const eslintConfig = [
  {
    ignores: ["node_modules/*", ".next/*", ".contentlayer/*"],
  },
  // Configurations ESLint classiques et personnalisées
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals"
  ),
  eslintConfigPrettier,
  ...tailwind.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: typescriptParser, // Déclaration du parser ici
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      jsxA11y: jsxA11y,
      react: react,
      typescriptEslint: typescriptEslint,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
    },
  },
]

export default eslintConfig
