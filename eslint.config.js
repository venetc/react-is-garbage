import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  jsonc: false,
  stylistic: {
    semi: true,
  },
  rules: {
    'curly': ['off', 'multi', 'consistent'],
    'antfu/if-newline': 'off',
    'no-console': 'off',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        'groups': [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
      },
    ],
  },
});
