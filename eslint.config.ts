import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(js.configs.recommended, {
  ignores: ['node_modules/**', 'dist/**', 'eslint.config.ts'],
  files: ['**/*.ts'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
    },
    globals: {
      // Node.js গ্লোবাল ভ্যারিয়েবলসমূহ
      process: 'readonly',
      console: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
      Buffer: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
    },
  },
  // rules: {
  //   "no-unused-vars": "error",
  //   semi: ['error', 'always'],
  //   "no-console": "error",
  //   'no-undef': 'error',
  //   'no-unused-expressions': 'error',
  //   'no-unreachable': 'error',
  //   'consistent-type-definitions': ['error', 'type'],
  //   quotes: ['error', 'single'],
  // },

  rules: {
    // Turn off base rules & use TS-aware versions
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    'no-console': 'error',
    'no-unused-expressions': 'error',
    'no-unreachable': 'error',

    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    // '@typescript-eslint/quotes': ['error', 'single'],
    quotes: ['error', 'double'],
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',

    semi: ['error', 'always'],
  },
})
