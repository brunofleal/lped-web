module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "google"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "simple-import-sort"],
    rules: {
        "linebreak-style": 0,
        "eqeqeq": "error",
        "no-console": "warn",
        "simple-import-sort/imports": "error",
        "no-unused-vars": [
            "error",
            {
                "varsIgnorePattern": "React"
            }
        ],
        "indent": ["error", 4],
        "max-len": ["warn", { "code": 120 }]
    }
};
