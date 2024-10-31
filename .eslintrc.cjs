const rules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-empty-object-type': 'off',
  'tailwindcss/classnames-order': 'warn',
};

module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
      rules,
    },
  ],
};
