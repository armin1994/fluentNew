import path from "path";
import config from "config";
import _ from "lodash";
import serveStatic from "serve-static";
import favicon from "serve-favicon";

export default app => {
  const DIST_PATH = path.join(__dirname, "../../dist/bundles");
  const PUBLIC_PATH = path.join(__dirname, "../../public");
  if (!_.includes(config.env.dev, process.env.NODE_ENV)) {
    app.use(
      "/static",
      serveStatic(DIST_PATH)
    );
  }
  app.use('/dist', serveStatic(DIST_PATH));
  app.use(serveStatic(PUBLIC_PATH));
  app.use(favicon(path.join(__dirname, "../../public/images", "favicon.ico")));
  return app;
};
