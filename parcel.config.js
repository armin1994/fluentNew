"use strict";
const Bundler = require("parcel-bundler");
const path = require("path");
const config = require("config");
const shortid = require("shortid32");
const _ = require("lodash");
const parcelManifest = require("./src/utils/parcelManifest");
const buildType = process.env.BUILD_TYPE;
const entryPoint = __dirname + `/${buildType}.js`;
const isProd = process.env.NODE_ENV === "production";
shortid.characters("23456789abcdefghjkmnopqrstuvwxyz");

const hash = shortid.generate();
const distDir = path.join(__dirname, "dist");
const outDir = path.join(distDir, "bundles", hash);

const defaultOption = {
  basePath: path.join(__dirname),
  outDir: isProd ? outDir : "./dist/bundles",
  publicUrl: isProd ? `/dist/${hash}` : "/dist",
  detailReport: true,
  cache: true,
  minify: true,
  sourceMaps: true,
  http: true,
  contentHash: false
};

let option;
if (isProd) {
  option = {
    cache: false,
    minify: true,
    sourceMaps: false,
    http: true,
    detailedReport: false,
    contentHash: true
  };
} else {
  option = {
    outFile: buildType,
    hmrPort: config.hmr.port,
    hmrHostname: config.hmr.host,
    cache: true,
    minify: false,
    sourceMaps: true,
    watch: true,
    contentHash: false,
    autoinstall: false
  };
}

const bundleOption = Object.assign({}, defaultOption, option);

const bundler = new Bundler(entryPoint, bundleOption);

const manifestOptions = {
  distDir: distDir,
  hash: hash,
  bundler: bundler,
  buildType: buildType,
  isProd: isProd
};

parcelManifest(manifestOptions);

bundler.bundle();
