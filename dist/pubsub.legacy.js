"use strict";

function _objectValues(obj) {
  var values = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) values.push(obj[keys[k]]);
  return values;
}
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }
    return o;
  }
  return r;
})()({
  1: [function (require, module, exports) {
    module.exports = require('./src/pubsub');
  }, {
    "./src/pubsub": 2
  }],
  2: [function (require, module, exports) {
    module.exports = function ($, undefined) {
      if (typeof $ !== 'function') {
        console.warn('jQuery is not loaded.');
        return false;
      }
      var o = $({});
      function byPriority(a, b) {
        var _a$data$priority, _a$data, _b$data$priority, _b$data;
        var p1 = (_a$data$priority = a === null || a === void 0 ? void 0 : (_a$data = a.data) === null || _a$data === void 0 ? void 0 : _a$data.priority) !== null && _a$data$priority !== void 0 ? _a$data$priority : 10;
        var p2 = (_b$data$priority = b === null || b === void 0 ? void 0 : (_b$data = b.data) === null || _b$data === void 0 ? void 0 : _b$data.priority) !== null && _b$data$priority !== void 0 ? _b$data$priority : 10;
        return p1 - p2;
      }
      $.getSubscribedEvents = function () {
        var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var allEvents = {};
        if (typeof $._data === 'function') {
          allEvents = $.extend(true, {}, $._data(o.get(0), 'events') || {});
        } else if (typeof o.data === 'function') {
          allEvents = $.extend(true, {}, o.data('events') || {});
        }
        if (typeof eventName === 'undefined') {
          return allEvents;
        }
        if (!(eventName in allEvents)) {
          return [];
        }
        sort && allEvents[eventName].sort(byPriority);
        return allEvents[eventName];
      };
      $.subscribe = function () {
        var parameters = _objectValues(arguments);
        if (typeof parameters[1] == 'number') {
          parameters[1] = {
            priority: parameters[1]
          };
        }
        o.on.apply(o, parameters);
      };
      $.unsubscribe = function () {
        o.off.apply(o, arguments);
      };
      $.unsubscribeAll = function () {
        o.off();
      };
      $.subscribeOnce = function () {
        var parameters = _objectValues(arguments);
        if (parameters.length <= 2) {
          parameters[2] = parameters[1];
          parameters[1] = {
            subscribeOnce: true
          };
        } else if (typeof parameters[1] == 'number') {
          parameters[1] = {
            priority: parameters[1],
            subscribeOnce: true
          };
        } else if (['object', 'function'].includes(_typeof(parameters[1])) && parameters[1] !== null) {
          parameters[1].subscribeOnce = true;
        }
        o.on.apply(o, parameters);
      };
      $.publish = function () {
        var parameters = _objectValues(arguments),
          name = parameters.shift(),
          events = $.getSubscribedEvents(name);
        events.forEach(function (event) {
          var _event$data;
          parameters[0] = event.handler.apply((_event$data = event.data) !== null && _event$data !== void 0 ? _event$data : {}, parameters);
          if (event.data && ['object', 'function'].includes(_typeof(event.data)) && 'subscribeOnce' in event.data && event.data.subscribeOnce) {
            $.unsubscribe(name, event.handler);
          }
        });
        return parameters[0];
      };
      return true;
    }(typeof jQuery === 'function' ? jQuery : undefined);
  }, {}]
}, {}, [1]);