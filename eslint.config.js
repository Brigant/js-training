import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: ["@babel/preset-env"],
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "semi": "off",
            "quotes": ["warn", "single"],
        },
    },
];
