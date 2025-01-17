module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next',
  ],
  plugins: ['@typescript-eslint', 'react', 'import'],
  rules: {
    indent: ['off', 'tab'],
    'no-undef': ['off'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/prop-types': 0,
        'react/display-name': 0,
        'next/no-img-element': 'off',
        'no-console': 1,
        'no-lonely-if': 1,
        'no-unused-vars': 1,
        'no-trailing-spaces': 1,
        'no-multi-spaces': 1,
        'no-multiple-empty-lines': 1,
        'space-before-blocks': ['error', 'always'],
        'object-curly-spacing': [1, 'always'],
        'import/order': [
          'error',
          {
            groups: [
              ['builtin', 'external'],
              ['internal'],
              ['parent', 'sibling', 'index'],
            ],
            pathGroups: [
              {
                pattern: '@/**/shared/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '**/shared/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/**/modules/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: '@/**/pages/**',
                group: 'internal',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin', 'external'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'ignore',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
