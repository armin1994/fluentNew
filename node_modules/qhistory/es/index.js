var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import invariant from 'invariant';

var qhistory = function qhistory(history, stringify, parse) {

  invariant(typeof stringify === 'function', 'A stringify function is required in order to transform ' + 'query objects into search strings.');

  invariant(typeof parse === 'function', 'A parse function is required in order to transform ' + 'search strings into query objects.');

  var addSearch = function addSearch(location) {
    if ((typeof location === 'undefined' ? 'undefined' : _typeof(location)) === 'object') {
      location.search = location.query ? stringify(location.query) : location.search || '';
    }
  };

  var addQuery = function addQuery(location) {
    var search = location.search;

    if (search) {
      location.query = parse(search.charAt(0) === '?' ? search.substring(1) : search);
    } else {
      location.query = {};
    }
  };

  var updateProperties = function updateProperties(history) {
    var properties = ['location', 'length', 'entries', 'index', 'action'];
    properties.forEach(function (prop) {
      if (history.hasOwnProperty(prop)) {
        queryHistory[prop] = history[prop];
      }
    });
  };

  // This relies on being the first listener called by
  // the actual history instance. If you register a
  // listener on the history instance before modifying
  // it with qhistory, the location object will not have
  // the query property set on it when that listener
  // is called.
  history.listen(function (location) {
    addQuery(location);
    updateProperties(history);
  });

  // make sure that the initial location has query support
  addQuery(history.location);

  var queryHistory = _extends({}, history, {
    push: function push(location, state) {
      addSearch(location);
      history.push(location, state);
    },
    replace: function replace(location, state) {
      addSearch(location);
      history.replace(location, state);
    },
    createHref: function createHref(location) {
      addSearch(location);
      return history.createHref(location);
    }
  });

  return queryHistory;
};

export default qhistory;