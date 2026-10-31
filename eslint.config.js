import babelParser from "@babel/eslint-parser";
import react from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "terraform/**"],
  },
  {
    files: ["src/**/*.{js,jsx}", "functions/**/*.js", "shared/**/*.js", "tests/**/*.js", "scripts/**/*.mjs"],
    plugins: { react },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"]
        },
        ecmaFeatures: { jsx: true }
      }
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
