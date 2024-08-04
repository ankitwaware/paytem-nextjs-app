/** @type {import("eslint").Linter.Config} */
module.exports = {
<<<<<<< Updated upstream
  root: true,
  extends: ["@repo/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
};
=======
  extends: ["@repo/eslint-config/reactInternal.js"],
};
>>>>>>> Stashed changes
