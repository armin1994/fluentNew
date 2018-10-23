const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const logger = require("parcel-bundler/src/Logger");

module.exports = function({ distDir, buildType, hash, bundler, isProd }) {
  const buildName = _.toLower(buildType);
  /**
   * Read the paths already registered within the manifest.json
   * @param {string} path
   * @returns {Object}
   */
  const readManifestJson = path => {
    if (!fs.existsSync(path)) {
      console.log("✨ create manifest file");
      return {};
    }

    console.log("🖊 update manifest file");

    try {
      return JSON.parse(fs.readFileSync(path, "utf8"));
    } catch (e) {
      logger.error("manifest file is invalid");
      throw e;
    }
  };

  /**
   * Feed the manifest exploring childBundles recursively
   * @param {Bundle} bundle
   * @param {Object} manifestValue
   * @param {string} publicURL
   */
  const feedManifestValue = (bundle, manifestValue, publicURL) => {
    let output = path.join(publicURL, path.basename(bundle.name));
    let input = bundle.entryAsset
      ? bundle.entryAsset.basename
      : bundle.assets.values().next().value.basename;
    if (!manifestValue[input]) {
      manifestValue[input] = output;
      console.log(`✓  bundle : ${input} => ${output}`);
    }
    bundle.childBundles.forEach(function(bundle) {
      feedManifestValue(bundle, manifestValue, publicURL);
    });
  };

  if (isProd) {
    bundler.on("bundled", bundle => {
      const publicURL = bundle.entryAsset.options.publicURL;
      const manifestPath = path.resolve(distDir, `${buildName}.json`);
      const manifestValue = {};

      console.log("📦 PackageManifestPlugin");
      feedManifestValue(bundle, manifestValue, publicURL);
      console.log(`📄 manifest : ${manifestPath}`);

      const oldManifestValue = readManifestJson(manifestPathmanifestPath);
      const combinedManifest = Object.assign(oldManifestValue, manifestValue);
      fs.writeFileSync(manifestPath, JSON.stringify(combinedManifest, null, 2));
    });

    bundler.on("buildEnd", () => {
      const manifestPath = path.resolve(distDir, `${buildName}.json`);
      const manifest = readManifestJson(manifestPath);

      const newManifestValue = _.reduce(
        manifest,
        (m, v, k) => {
          if (_.includes(k, ".js") || _.includes(v, ".css")) {
            const rename = _.toLower(v);

            const r = v.replace("/dist/", "");
            const base = path.resolve(distDir, "bundles", r);
            const renameBase = path.resolve(distDir, "bundles", _.toLower(r));
            /**
             * Rename files
             */
            if (fs.existsSync(base)) {
              fs.rename(base, renameBase, function(err) {
                if (err) throw err;
              });
            } else {
              console.log("Not Exists :-> ", base);
            }

            if (_.includes(k, ".js")) m["js"].push(rename);
            if (_.includes(v, ".css")) m["css"].push(rename);
          }
          return m;
        },
        { js: [], css: [] }
      );
      fs.writeFileSync(manifestPath, JSON.stringify(newManifestValue, null, 2));
    });
  } else {
    bundler.on("bundled", bundle => {
      //console.log(bundle.entryAsset.options);
    })
  }
};
