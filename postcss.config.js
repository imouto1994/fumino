const browserslist = require("./browserslist");
const constants = require("./web/styles");

module.exports = () => ({
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: browserslist,
    }),
    require("postcss-simple-vars")({ variables: constants }),
    require("postcss-nesting")(),
  ],
});
