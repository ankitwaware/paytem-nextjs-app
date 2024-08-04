const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier", "turbo"],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
<<<<<<< HEAD:packages/eslint-config/library.js
<<<<<<< Updated upstream:packages/eslint-config/library.js
};
=======
  rules: {
    "check-file/filename-naming-convention": [
      "error",
      {
        "*.{js,ts,tsx,json}": "CAMEL_CASE"
      }
    ]
  },

};
>>>>>>> Stashed changes:packages/config-eslint/library.js
=======
};
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3:packages/config-eslint/library.js
