const browserslist = require("./browserslist");
const constants = require("./web/styles.js");

module.exports = () => ({
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: browserslist,
    }),
  ],
});
