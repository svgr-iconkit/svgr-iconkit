module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10",
        },
        loose: true,
      },
      "preset-env",
    ],
  ],
};
