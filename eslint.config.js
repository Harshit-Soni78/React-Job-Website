import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist/'] },

  // Configuration for Node/backend files
  {
    files: ['src/server.js', 'src/config/**/*.js', 'src/controllers/**/*.js', 'src/models/**/*.js', 'src/routes/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Configuration for React/frontend files
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    ignores: ['src/server.js', 'src/config/', 'src/controllers/', 'src/models/', 'src/routes/'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
    },
  },
]
