/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
