module.exports = {
    "extends": [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:tailwindcss/recommended",
        "prettier",
    ],
    plugins: [
        "prettier",
    ],
    rules: {
        'react/display-name': ['off'],
        "prettier/prettier": ["error", {
            "endOfLine": "auto"
        }],
        "no-misleading-character-class": "off",
        "prefer-const": "error",
        "tailwindcss/no-custom-classname": "off",
        "tailwindcss/migration-from-tailwind-2": "off",
        "curly": "error",
        "@next/next/no-img-element": "error",
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-vars": ["off", {
            "vars": "all",
            "varsIgnorePattern": "^_",
            "args": "after-used",
            "argsIgnorePattern": "^_",
        }],
    },
}
