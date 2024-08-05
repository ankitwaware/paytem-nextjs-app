module.exports = {
  root: true,
  extends: ["@repo/eslint-config/reactInternal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,      
  },
};
