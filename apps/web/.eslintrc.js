module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
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
    'import/no-named-as-default-member': 'error',
    // Require explicit return types on functions
    '@typescript-eslint/explicit-function-return-type': "off",
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
    'react/jsx-sort-props': 'off',
    // functions that return promises where a void return is expected
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ]
  },
};