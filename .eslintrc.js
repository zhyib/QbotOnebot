module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 1,
    'no-continue': 0,
    'no-unused-vars': 1,
    'import/no-unresolved': 0,
  },
};
