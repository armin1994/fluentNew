/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright 2018-present Facebook.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 */

const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <div className="splash">
          <div className="content">
            <h1>{siteConfig.header}</h1>
            <h2>{siteConfig.tagline}</h2>
            <div className="row">
              <a className="btn primary" href={docUrl("getting-started")}>
                Getting Started
              </a>
            </div>
            <img src={imgUrl("splash.png")} className="splashScreen" />
            <div className="shadow" />
          </div>
        </div>
        <div className="content row">
          <div className="col">
            <img src={imgUrl("react-redux.png")} className="img-content-blc" />
          </div>
          <div className="col">
            <h4>Isomorphic/Universal</h4>
            <h3>Run on both client and server.</h3>
            <p>
              It builds a bundle for running the application in a browser as a
              Single Page Application
            </p>
            <a className="learnmore" href="/docs/getting-started.html">
              Learn more
            </a>
          </div>
        </div>
        <div className="content row">
          <div className="col">
            <h4>Plugins</h4>
            <h3>Extending Frontend</h3>
            <p>
              ff-components – similar to web-components but organized as
              directories, can be rendered on the server and published/installed
              as NPM packages
            </p>
            <a className="learnmore" href="/docs/understand.html">
              Learn more
            </a>
          </div>
          <div className="col center">
            <img src={imgUrl("plugin.png")} className="img-content-blc" />
          </div>
        </div>
        <div className="content row">
          <div className="col">
            <img
              src="/img/plugins.png"
              srcSet="/img/plugins.png 1x, /img/plugins@2x.png 2x"
            />
          </div>
          <div className="col">
            <h4>Open Source</h4>
            <h3>Contributing to Flipper</h3>
            <p>
              Both Flipper's desktop app and native mobile SDKs are open-source
              and MIT licensed. This enables you to see and understand how we
              are building plugins, and of course join the community and help
              improve Flipper. We are excited to see what you will build on this
              platform.
            </p>
            <a className="learnmore" href="/docs/js-setup.html">
              Learn more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
