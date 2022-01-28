module.exports = {
  env: {
    es6: true,
  },
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  plugins: [],
  globals: {},
  rules: {
    '@next/next/no-img-element': 'off', // annoying for unsupported formats like gif
  },
};
