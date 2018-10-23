import config from "config";
import _ from "lodash";

export default type => {
  if (_.includes(config.env.dev, process.env.NODE_ENV)) {
    return {
      js: [`/dist/${type}.js`],
      css: [`/dist/${type}.css`]
    };
  } else {
    return require(`../../dist/${_.toLower(type)}.json`);
  }
};