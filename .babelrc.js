const browserslist = require("./browserslist");

module.exports = {
  presets: [
    process.env.PLATFORM === "browser"
      ? [
          "@babel/preset-env",
          {
            targets: {
              browsers: browserslist,
            },
            modules: false,
          },
        ]
      : [
          "@babel/preset-env",
          {
            targets: {
              node: true,
            },
            modules: "commonjs",
          },
        ],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: false,
        useESModules: process.env.PLATFORM === "browser",
      },
    ],
    "@loadable/babel-plugin",
  ],
};
