module.exports = {
  singleQuote: true,
  trailingComma: "es5",
  allowParens: "avoid",
  endOfLine: "auto",
  overrides: [
    {
      files: "*.js",
      options: {
        singleQuote: false,
      },
    },
  ],
};
