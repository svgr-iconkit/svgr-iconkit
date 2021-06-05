module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "classic",
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-typescript"],
};
