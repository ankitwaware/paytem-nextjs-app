module.exports = {
  root: true,
  extends: ["@repo/eslint-config/reactInternal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Disable the rule that prefers named exports
    'import/prefer-default-export': 'off',
    // Enforce having a single default export per module
    'import/no-default-export': 'off',
    'import/no-named-export': 'off',
    'import/no-mutable-exports': 'error', // Enforce immutability for exports
    'import/no-commonjs': 'error', // Prevent CommonJS modules
    'import/first': 'error', // Ensure all imports appear before other statements
    // Enforce only one default export per file
    'import/no-named-as-default': 'error',
    // Require explicit return types on functions
    '@typescript-eslint/explicit-function-return-type': "off",
    'import/no-named-as-default-member': 'error',
    // consistent and readable filenames
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,  // or kebabCase, snakeCase, pascalCase
        },
        // If you want to enforce different cases for files and folders, you can add:
        ignore: ['^.*\\.d\\.ts$', '^README.md$', 'config/*']  // Example: ignoring certain patterns
      },
    ],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "@typescript-eslint/restrict-template-expressions": ["error", { allowNullish: true, }]
  }
};
