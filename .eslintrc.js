module.exports = {
  root: true,
  extends: ['plugin:vue/essential', 'airbnb-base'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'no-return-assign': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
  },
  overrides: [{
    files: ['app/javascript/store/**/*.js'],
    rules: {
      'no-shadow': 'off',
      'no-param-reassign': 'off',
    }
  }]
};
