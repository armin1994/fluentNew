const path = require("path");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");
const autoprefixer = require("autoprefixer");
const postcssURL = require("postcss-url");
const less = require("postcss-less");
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "src/themes/index.less"), "utf8")
);
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  variables: themeVariables,
  modules: false,
  syntax: less,
  plugins: [
    autoprefixer({
      browsers: ["last 3 versions", "> 1%"]
    })
  ]
};
