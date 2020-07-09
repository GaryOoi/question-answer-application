module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["prettier", "react", "react-hooks", "jsx-a11y"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "import/prefer-default-export": 0,
    "import/no-named-as-default": 0,
    "no-use-before-define": 0,
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/prefer-stateless-function": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-console": 1,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: [".", "./src"],
        extensions: [".js", ".jsx", ".ts", ".tsx", "native.js"],
      },
    },
  },
};
