/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */

const siteConfig = {
  title: "fluentai-frontend" /* title for your website */,
  header: "Isomorphic react application",
  tagline:
    "fluentai-frontend is an isomorphic react application contains Recording, Cleaning and Admin portal in a single codebase.",
  url: "https://faas.fluent.ai" /* your website url */,
  baseUrl: "/" /* base url for your project */,
  // Used for publishing and more
  projectName: "fluent-frontend",
  organizationName: "fluent.ai",
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [{ doc: "getting-started", label: "Getting Started" }],
  favicon: "img/favicon.png",
  /* colors for website */
  colors: {
    primaryColor: "#121020",
    secondaryColor: "#121020",
    accentColor: "#785BA3",
    actionColor: "#008cf2"
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: "Copyright © " + new Date().getFullYear() + " Fluent.ai",
  usePrism: ["jsx"],
  highlight: {
    theme: "atom-one-dark"
  },
  // Add custom scripts here that would be placed in <script> tags
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-blocks-buttons.js"
  ],
  stylesheets: ["/css/code-blocks-buttons.css"],
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  onPageNav: 'separate',
  cleanUrl: true,
};

module.exports = siteConfig;
