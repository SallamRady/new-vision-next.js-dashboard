module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    'prefer-const': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: false,
        beforeLineComment: false,
        allowBlockStart: false,
        allowObjectStart: false,
        allowArrayStart: false
      }
    ],
    'padding-line-between-statements': 'off',
    'newline-before-return': 'off',
    'import/newline-after-import': 'off',
    'import/order': 'off',
    '@typescript-eslint/ban-types': 'off'
    // [
    //   'error',
    //   {
    //     extendDefaults: true,
    //     types: {
    //       Function: 'Use a specific function type instead',
    //       Object: 'Use object instead',
    //       Boolean: 'Use boolean instead',
    //       Number: 'Use number instead',
    //       String: 'Use string instead',
    //       Symbol: 'Use symbol instead',
    //       any: false,
    //       '{}': false
    //     }
    //   }
    // ]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {},
      typescript: {
        project: './tsconfig.json'
      }
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', 'src/iconify-bundle/*'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
