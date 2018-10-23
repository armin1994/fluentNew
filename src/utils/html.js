import React, { Component } from "react";
import PropTypes from "prop-types";
import serialize from "serialize-javascript";

class HtmlDocument extends Component {
  render() {
    const { content, state, webpackStats, host } = this.props;
    const dehydratedState = "window.__INITIAL_STATE__ = " + serialize(state);

    let styles = [].concat(webpackStats.css);

    let scripts = [].concat(webpackStats.js);

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />
          {styles.map((href, key) => (
            <link rel="stylesheet" type="text/css" href={href} key={key} />
          ))}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </head>
        <body>
          <div id="root">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <script src="/primus/primus.js" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: dehydratedState }}
          />
          {scripts.map((src, key) => <script src={src} key={key} defer />)}
        </body>
      </html>
    );
  }
}

HtmlDocument.propTypes = {
  webpackStats: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};

export default HtmlDocument;
