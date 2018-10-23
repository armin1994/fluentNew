import config from "config";
import _ from "lodash";
/**
 * Redirects non-secure requests to HTTPS.
 *
 * Looks at various aspects of the request and determines if the request is
 * already secure. If it is not secure, a redirect response is returned.
 *
 * @author Frank Hellwig <frank.hellwig@buchanan-edwards.com>
 */
const middleware = (redirectLocalhost, urls) => {
  return (req, res, next) => {
    let isMatched = false;
    let tail = req.originalUrl;
    let hostname = req.hostname == "localhost" ? config.home : req.hostname;
    _.forEach(urls, v => {
      if (req.originalUrl.startsWith(v)) {
        isMatched = true;
      }
    });
    if (!isMatched) {
      tail = "/-/d/signin";
    }

    if (req.hostname === "localhost" && !redirectLocalhost) {
      if (isMatched) {
        return next();
      } else {
        return res.redirect(hostname + tail);
      }
    }
    if (isSecure(req) && isMatched) {
      return next();
    }
    // Note that we do not keep the port as we are using req.hostname
    // and not req.headers.host. The port number does not really have
    // a meaning in most cloud deployments since they port forward.
    return res.redirect("https://" + hostname + tail);
  };
};

const isSecure = req => {
  // Check the trivial case first.
  if (req.secure) {
    return true;
  }
  // Check if we are behind Application Request Routing (ARR).
  // This is typical for Azure.
  if (req.headers["x-arr-log-id"]) {
    return typeof req.headers["x-arr-ssl"] === "string";
  }
  // Check for forwarded protocol header.
  // This is typical for AWS.
  return req.headers["x-forwarded-proto"] === "https";
};

export default middleware;
