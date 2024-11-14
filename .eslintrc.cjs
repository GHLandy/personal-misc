module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  globals: {},
  extends: ['eslint:recommended', '@ghlandy/eslint-config-prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
  },
};
