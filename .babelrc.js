const plugins = [
    "@babel/plugin-syntax-export-default-from",
    "@babel/proposal-class-properties",
    [
        "@babel/plugin-transform-runtime",
        {
            regenerator: true
        }
    ],
    "dynamic-import-node",
    "@babel/syntax-dynamic-import",
    "react-hot-loader/babel"
];
const presets = ["@babel/env", "@babel/react"];
if (process.env["BABEL_ENV"] === "client") {
    plugins.push([
        "import",
        {
            libraryName: "antd",
            style: true
        }
    ]);
}
module.exports = {
    presets: presets,
    plugins: plugins
};
