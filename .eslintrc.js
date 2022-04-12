module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: false
  },
  plugins: ['sonarjs'],
  extends: [
    'plugin:sonarjs/recommended'
  ],
  rules: {
    'quotes': [
      'warn',
      'single', {'avoidEscape': true}
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-cond-assign': [
      'error',
      'except-parens'
    ],
    'no-console': 'off',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'off',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': [
      'error',
      'both'
    ],
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-obj-calls': 'error',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-negation': 'error',
    'space-in-parens': [
      2,
      'never'
    ],
    'use-isnan': 'error',
    'valid-jsdoc': 'error',
    'valid-typeof': 'error',
    'block-scoped-var': 'error',
    'curly': 'error',
    'default-case': 'error',
    'dot-location': [
      'error',
      'property'
    ],
    'dot-notation': [
      'error',
      {
        'allowPattern': '^[a-z]+(([0-9]+)|(_[a-z]+)|([A-Z][a-z]+[0-9]*))+$'
      }
    ],
    'eqeqeq': 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-empty-function': 'warn',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-fallthrough': 'error',
    'no-global-assign': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'off',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'off',
      {
        'ignoreArrayIndexes': true,
        'ignore': [
          -1,
          0,
          1
        ]
      }
    ],
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'error',
    'no-octal-escape': 'error',
    'no-octal': 'error',
    'no-param-reassign': [
      'error',
      {
        'props': false
      }
    ],
    'no-process-env': 'off',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      {
        'allowShortCircuit': true
      }
    ],
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    'no-warning-comments': [
      'off',
      {
        'terms': [
          'todo',
          'fixme'
        ],
        'location': 'start'
      }
    ],
    'no-with': 'error',
    'radix': 'error',
    'vars-on-top': 'error',
    'wrap-iife': [
      'error',
      'outside'
    ],
    'yoda': 'error',
    'strict': 'error',
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': 'off',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-use-before-define': [
      'error',
      {
        'functions': true,
        'classes': true
      }
    ],
    'block-spacing': 'error',
    'brace-style': [
      'error',
      'stroustrup',
      {
        'allowSingleLine': true
      }
    ],
    'comma-spacing': [
      'error'
    ],
    'comma-style': [
      'error',
      'last'
    ],
    'consistent-this': 'off',
    'computed-property-spacing': [
      'error',
      'never'
    ],
    'eol-last': 'error',
    'indent': [
      'error',
      2
    ],
    'keyword-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'max-depth': [
      'error'
    ],
    'max-params': [
      'error',
      9
    ],
    'max-statements': [
      'error',
      40,
      {
        'ignoreTopLevelFunctions': true
      }
    ],
    'new-cap': 'error',
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 2
      }
    ],
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': [
      'error',
      'never'
    ],
    'object-shorthand': 'warn',
    'quote-props': [
      'error',
      'as-needed',
      {
        'keywords': false,
        'unnecessary': false
      }
    ],
    'require-atomic-updates': 'warn',
    'require-await': 'warn',
    'semi': ['error', 'always'],
    'semi-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'space-unary-ops': [
      'error',
      {
        'words': true,
        'nonwords': false
      }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        'block': {
          'balanced': true
        }
      }
    ],
    'wrap-regex': 'error',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/cognitive-complexity': ['error', 40],
    'object-property-newline': ['warn', {'allowAllPropertiesOnSameLine': false}]
  }
};
