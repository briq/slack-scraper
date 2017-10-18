module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    browser: false
  },
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': ['warn', 'never'],
    // Because of app-module-path
    'import/no-extraneous-dependencies': 'off',
    // Because of app-module-path
    'import/no-unresolved': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '(next|res)' }],
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off'
  }
};
