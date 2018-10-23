const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir).replace(/\\/g, '/');
}

module.exports = {
    "~themes": resolve("src/themes"),
    src: resolve("src"),
    "ff-shared": resolve("src/shared"),
    "ff-client": resolve("src/client"),
    "ff-server": resolve("src/server"),
    "ff-utils": resolve("src/utils")
};
