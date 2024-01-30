// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//     },
//     project: ['./tsconfig.json'],
//     tsconfigRootDir: __dirname,
//   },
//   extends: [
//     'eslint:recommended',
//     // 'plugin:@typescript-eslint/recommended-type-checked',
//     // 'plugin:react-hooks/recommended',
//     // 'plugin:storybook/recommended',
//     // 'plugin:tailwindcss/recommended',
//     // 'plugin:prettier/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['react-refresh'],
//   rules: {
//     // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//     // 'react/prop-types': 'off',
//     // 'no-unused-vars': 'off',
//     // '@typescript-eslint/explicit-function-return-type': 'off',
//     // '@typescript-eslint/no-unused-vars': 'off',
//     // '@typescript-eslint/ban-types': 'off',
//     // '@typescript-eslint/no-explicit-any': 'off',
//     // '@typescript-eslint/ban-ts-comment': 'off',
//     // '@typescript-eslint/no-unsafe-assignment': 'off',
//     // 'simple-import-sort/imports': 'error',
//     // 'simple-import-sort/exports': 'error',
//   },
//   overrides: [
//     {
//       files: ['*.ts', '*.tsx', '*.js'],
//       parser: '@typescript-eslint/parser',
//     },
//     {
//       extends: ['plugin:@typescript-eslint/disable-type-checked'],
//       files: ['*.js', './**.config.ts'],
//     },
//   ],
// };

module.exports = {
  root: true,
  extends: ['@lunasoft-org/eslint-config-web'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    // '@lunasoft-org/eslint-config-web/no-unused-vars': off,
  },
};
