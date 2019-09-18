module.exports = {
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/sort': 'error',
  },
  env: {
    // Global variables:
    node: true,
    'jest/globals': true, // Allows "it", "describe" etc.
  },
}
