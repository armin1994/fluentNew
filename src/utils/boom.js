import boom from "boom";
const helperMethods = ["wrap", "create"];

export default () => {
  return (req, res, next) => {
    if (res.boom) throw new Error("boom already exists on response object");
    res.boom = {};
    Object.keys(boom).forEach(function(key) {
      if (typeof boom[key] !== "function") return;
      if (helperMethods.indexOf(key) !== -1) {
        res.boom[key] = function() {
          return boom[key].apply(boom, arguments);
        };
      } else {
        res.boom[key] = function() {
          var boomed = boom[key].apply(boom, arguments);
          return res
            .status(boomed.output.statusCode)
            .send(boomed.output.payload);
        };
      }
    });
    next();
  };
};
