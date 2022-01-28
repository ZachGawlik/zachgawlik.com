const typographyOverrides = {
  h2: {
    marginTop: '1.4em',
    marginBottom: '.7em',
  },
  h3: {
    marginTop: '1.2em',
    marginBottom: '.3em',
  },
  h4: {
    marginTop: '1em',
    marginBottom: '.5em',
  },
};

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {},
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: ['sm'],
    }),
  ],
  important: '.page-root', // Need extra specificity to allow inline overriding typography
  theme: {
    extend: {
      typography: {
        sm: {
          css: {
            ...typographyOverrides,
            lineHeight: 1.5,
          },
        },
        DEFAULT: {
          css: {
            ...typographyOverrides,
            lineHeight: 1.6,
          },
        },
      },
    },
  },
};
