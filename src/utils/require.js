import fs from "fs";
import _ from "lodash";

const DEFAULT_EXCLUDE_DIR = /^\./;
const DEFAULT_FILTER = /^([^\.].*)\.js(on)?$/;
const DEFAULT_RECURSIVE = true;

const requireAll = options => {
  const dirname = typeof options === "string" ? options : options.dirname;
  const excludeDirs =
    options.excludeDirs === undefined
      ? DEFAULT_EXCLUDE_DIR
      : options.excludeDirs;
  const filter = options.filter === undefined ? DEFAULT_FILTER : options.filter;
  let modules = {};
  const recursive =
    options.recursive === undefined ? DEFAULT_RECURSIVE : options.recursive;
  const resolve = options.resolve || identity;
  const map = options.map || identity;

  function excludeDirectory(dirname) {
    return !recursive || (excludeDirs && dirname.match(excludeDirs));
  }

  function filterFile(filename) {
    if (typeof filter === "function") {
      return filter(filename);
    }

    var match = filename.match(filter);
    if (!match) return;

    return match[1] || match[0];
  }

  const files = fs.readdirSync(dirname);
  _.forEach(files, file => {
    let filepath = dirname + "/" + file;
    if (fs.statSync(filepath).isDirectory()) {
      if (excludeDirectory(file)) return;

      modules[map(file, filepath)] = requireAll({
        dirname: filepath,
        filter: filter,
        excludeDirs: excludeDirs,
        map: map,
        resolve: resolve
      });
    } else {
      let name = filterFile(file);
      if (!name) return;

      modules[map(name, filepath)] = resolve(require(filepath));
    }
  });
  return modules;
};

export default requireAll;

function identity(val) {
  return val;
}
