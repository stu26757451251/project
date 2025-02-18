import reactCompiler from 'eslint-plugin-react-compiler'

export default [
  {
    extends: [
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: {
      'react-compiler': reactCompiler
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-redeclare': 'off',
      'no-unused-vars': 'on',
      'react-compiler/react-compiler': 'error'
    }
  }
]
