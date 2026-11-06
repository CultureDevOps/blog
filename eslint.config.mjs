import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  ...nextVitals,
  ...nextTypescript,
  eslintConfigPrettier,
  {
    ignores: ["node_modules/**", ".next/**", ".contentlayer/**", "next-env.d.ts"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/no-unescaped-entities": "off",
      // Existing hydration and browser preference effects; review separately.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]
