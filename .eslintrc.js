module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: false
  },
  plugins: ["sonarjs"],
  extends: [
    'plugin:sonarjs/recommended'
  ],
}