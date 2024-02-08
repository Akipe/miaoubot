module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  root: true,
  ignorePatterns: ['temp.js', '**/vendor/*.js'],
  rules: {
    'prettier/prettier': 2
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx']
    }
  ]
};
