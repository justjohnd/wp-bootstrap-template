/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/scroll-out/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/scroll-out/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function clamp(v, min, max) {
  return min > v ? min : max < v ? max : v;
}

function sign(x) {
  return +(x > 0) - +(x < 0);
}

function round(n) {
  return Math.round(n * 10000) / 10000;
}

var cache = {};

function replacer(match) {
  return '-' + match[0].toLowerCase();
}

function hyphenate(value) {
  return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
}
/** find elements */


function $(e, parent) {
  return !e || e.length === 0 ? // null or empty string returns empty array
  [] : e.nodeName ? // a single element is wrapped in an array
  [e] : // selector and NodeList are converted to Element[]
  [].slice.call(e[0].nodeName ? e : (parent || document.documentElement).querySelectorAll(e));
}

function setAttrs(el, attrs) {
  // tslint:disable-next-line:forin
  for (var key in attrs) {
    if (key.indexOf('_')) {
      el.setAttribute('data-' + hyphenate(key), attrs[key]);
    }
  }
}

function setProps(cssProps) {
  return function (el, props) {
    for (var key in props) {
      if (key.indexOf('_') && (cssProps === true || cssProps[key])) {
        el.style.setProperty('--' + hyphenate(key), round(props[key]));
      }
    }
  };
}

var clearTask;
var subscribers = [];

function loop() {
  clearTask = 0;
  subscribers.slice().forEach(function (s2) {
    return s2();
  });
  enqueue();
}

function enqueue() {
  if (!clearTask && subscribers.length) {
    clearTask = requestAnimationFrame(loop);
  }
}

function subscribe(fn) {
  subscribers.push(fn);
  enqueue();
  return function () {
    subscribers = subscribers.filter(function (s) {
      return s !== fn;
    });

    if (!subscribers.length && clearTask) {
      cancelAnimationFrame(clearTask);
      clearTask = 0;
    }
  };
}

function unwrap(value, el, ctx, doc) {
  return typeof value === 'function' ? value(el, ctx, doc) : value;
}

function noop() {}
/**
 * Creates a new instance of ScrollOut that marks elements in the viewport with
 * an "in" class and marks elements outside of the viewport with an "out"
 */
// tslint:disable-next-line:no-default-export


function main(opts) {
  // Apply default options.
  opts = opts || {}; // Debounce onChange/onHidden/onShown.

  var onChange = opts.onChange || noop;
  var onHidden = opts.onHidden || noop;
  var onShown = opts.onShown || noop;
  var onScroll = opts.onScroll || noop;
  var props = opts.cssProps ? setProps(opts.cssProps) : noop;
  var se = opts.scrollingElement;
  var container = se ? $(se)[0] : window;
  var doc = se ? $(se)[0] : document.documentElement;
  var rootChanged = false;
  var scrollingElementContext = {};
  var elementContextList = [];
  var clientOffsetX, clientOffsety;
  var sub;

  function index() {
    elementContextList = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) {
      return {
        element: el
      };
    });
  }

  function update() {
    // Calculate position, direction and ratio.
    var clientWidth = doc.clientWidth;
    var clientHeight = doc.clientHeight;
    var scrollDirX = sign(-clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset));
    var scrollDirY = sign(-clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset));
    var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
    var scrollPercentY = doc.scrollTop / (doc.scrollHeight - clientHeight || 1); // Detect if the root context has changed.

    rootChanged = rootChanged || scrollingElementContext.scrollDirX !== scrollDirX || scrollingElementContext.scrollDirY !== scrollDirY || scrollingElementContext.scrollPercentX !== scrollPercentX || scrollingElementContext.scrollPercentY !== scrollPercentY;
    scrollingElementContext.scrollDirX = scrollDirX;
    scrollingElementContext.scrollDirY = scrollDirY;
    scrollingElementContext.scrollPercentX = scrollPercentX;
    scrollingElementContext.scrollPercentY = scrollPercentY;
    var childChanged = false;

    for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
      var ctx = elementContextList[index_1];
      var element = ctx.element; // find the distance from the element to the scrolling container

      var target = element;
      var offsetX = 0;
      var offsetY = 0;

      do {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
        target = target.offsetParent;
      } while (target && target !== container); // Get element dimensions.


      var elementHeight = element.clientHeight || element.offsetHeight || 0;
      var elementWidth = element.clientWidth || element.offsetWidth || 0; // Find visible ratios for each element.

      var visibleX = (clamp(offsetX + elementWidth, clientOffsetX, clientOffsetX + clientWidth) - clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) / elementWidth;
      var visibleY = (clamp(offsetY + elementHeight, clientOffsety, clientOffsety + clientHeight) - clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) / elementHeight;
      var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
      var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
      var viewportX = clamp((clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) / (clientWidth / 2), -1, 1);
      var viewportY = clamp((clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) / (clientHeight / 2), -1, 1);
      var visible = void 0;

      if (opts.offset) {
        visible = unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
      } else if ((unwrap(opts.threshold, element, ctx, doc) || 0) < visibleX * visibleY) {
        visible = 1;
      } else {
        visible = 0;
      }

      var changedVisible = ctx.visible !== visible;
      var changed = ctx._changed || changedVisible || ctx.visibleX !== visibleX || ctx.visibleY !== visibleY || ctx.index !== index_1 || ctx.elementHeight !== elementHeight || ctx.elementWidth !== elementWidth || ctx.offsetX !== offsetX || ctx.offsetY !== offsetY || ctx.intersectX !== ctx.intersectX || ctx.intersectY !== ctx.intersectY || ctx.viewportX !== viewportX || ctx.viewportY !== viewportY;

      if (changed) {
        childChanged = true;
        ctx._changed = true;
        ctx._visibleChanged = changedVisible;
        ctx.visible = visible;
        ctx.elementHeight = elementHeight;
        ctx.elementWidth = elementWidth;
        ctx.index = index_1;
        ctx.offsetX = offsetX;
        ctx.offsetY = offsetY;
        ctx.visibleX = visibleX;
        ctx.visibleY = visibleY;
        ctx.intersectX = intersectX;
        ctx.intersectY = intersectY;
        ctx.viewportX = viewportX;
        ctx.viewportY = viewportY;
        ctx.visible = visible;
      }
    }

    if (!sub && (rootChanged || childChanged)) {
      sub = subscribe(render);
    }
  }

  function render() {
    maybeUnsubscribe(); // Update root attributes if they have changed.

    if (rootChanged) {
      rootChanged = false;
      setAttrs(doc, {
        scrollDirX: scrollingElementContext.scrollDirX,
        scrollDirY: scrollingElementContext.scrollDirY
      });
      props(doc, scrollingElementContext);
      onScroll(doc, scrollingElementContext, elementContextList);
    }

    var len = elementContextList.length;

    for (var x = len - 1; x > -1; x--) {
      var ctx = elementContextList[x];
      var el = ctx.element;
      var visible = ctx.visible;
      var justOnce = el.hasAttribute('scrollout-once') || false; // Once

      if (ctx._changed) {
        ctx._changed = false;
        props(el, ctx);
      }

      if (ctx._visibleChanged) {
        setAttrs(el, {
          scroll: visible ? 'in' : 'out'
        });
        onChange(el, ctx, doc);
        (visible ? onShown : onHidden)(el, ctx, doc);
      } // if this is shown multiple times, keep it in the list


      if (visible && (opts.once || justOnce)) {
        // or if this element just display it once
        elementContextList.splice(x, 1);
      }
    }
  }

  function maybeUnsubscribe() {
    if (sub) {
      sub();
      sub = undefined;
    }
  } // Run initialize index.


  index();
  update();
  render(); // Collapses sequential updates into a single update.

  var updateTaskId = 0;

  var onUpdate = function onUpdate() {
    updateTaskId = updateTaskId || setTimeout(function () {
      updateTaskId = 0;
      update();
    }, 0);
  }; // Hook up document listeners to automatically detect changes.


  window.addEventListener('resize', onUpdate);
  container.addEventListener('scroll', onUpdate);
  return {
    index: index,
    update: update,
    teardown: function teardown() {
      maybeUnsubscribe();
      window.removeEventListener('resize', onUpdate);
      container.removeEventListener('scroll', onUpdate);
    }
  };
}

module.exports = main;

/***/ }),

/***/ "./node_modules/waypoints/lib/jquery.waypoints.min.js":
/*!************************************************************!*\
  !*** ./node_modules/waypoints/lib/jquery.waypoints.min.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function () {
  "use strict";

  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element) throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
    this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1;
  }

  var e = 0,
      i = {};
  t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }, t.prototype.trigger = function (t) {
    this.enabled && this.callback && this.callback.apply(this, t);
  }, t.prototype.destroy = function () {
    this.context.remove(this), this.group.remove(this), delete i[this.key];
  }, t.prototype.disable = function () {
    return this.enabled = !1, this;
  }, t.prototype.enable = function () {
    return this.context.refresh(), this.enabled = !0, this;
  }, t.prototype.next = function () {
    return this.group.next(this);
  }, t.prototype.previous = function () {
    return this.group.previous(this);
  }, t.invokeAll = function (t) {
    var e = [];

    for (var o in i) {
      e.push(i[o]);
    }

    for (var n = 0, r = e.length; r > n; n++) {
      e[n][t]();
    }
  }, t.destroyAll = function () {
    t.invokeAll("destroy");
  }, t.disableAll = function () {
    t.invokeAll("disable");
  }, t.enableAll = function () {
    t.Context.refreshAll();

    for (var e in i) {
      i[e].enabled = !0;
    }

    return this;
  }, t.refreshAll = function () {
    t.Context.refreshAll();
  }, t.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  }, t.viewportWidth = function () {
    return document.documentElement.clientWidth;
  }, t.adapters = [], t.defaults = {
    context: window,
    continuous: !0,
    enabled: !0,
    group: "default",
    horizontal: !1,
    offset: 0
  }, t.offsetAliases = {
    "bottom-in-view": function bottomInView() {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    "right-in-view": function rightInView() {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  }, window.Waypoint = t;
}(), function () {
  "use strict";

  function t(t) {
    window.setTimeout(t, 1e3 / 60);
  }

  function e(t) {
    this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }, this.waypoints = {
      vertical: {},
      horizontal: {}
    }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler();
  }

  var i = 0,
      o = {},
      n = window.Waypoint,
      r = window.onload;
  e.prototype.add = function (t) {
    var e = t.options.horizontal ? "horizontal" : "vertical";
    this.waypoints[e][t.key] = t, this.refresh();
  }, e.prototype.checkEmpty = function () {
    var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
        e = this.Adapter.isEmptyObject(this.waypoints.vertical),
        i = this.element == this.element.window;
    t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
  }, e.prototype.createThrottledResizeHandler = function () {
    function t() {
      e.handleResize(), e.didResize = !1;
    }

    var e = this;
    this.adapter.on("resize.waypoints", function () {
      e.didResize || (e.didResize = !0, n.requestAnimationFrame(t));
    });
  }, e.prototype.createThrottledScrollHandler = function () {
    function t() {
      e.handleScroll(), e.didScroll = !1;
    }

    var e = this;
    this.adapter.on("scroll.waypoints", function () {
      (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t));
    });
  }, e.prototype.handleResize = function () {
    n.Context.refreshAll();
  }, e.prototype.handleScroll = function () {
    var t = {},
        e = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left"
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up"
      }
    };

    for (var i in e) {
      var o = e[i],
          n = o.newScroll > o.oldScroll,
          r = n ? o.forward : o.backward;

      for (var s in this.waypoints[i]) {
        var a = this.waypoints[i][s];

        if (null !== a.triggerPoint) {
          var l = o.oldScroll < a.triggerPoint,
              h = o.newScroll >= a.triggerPoint,
              p = l && h,
              u = !l && !h;
          (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group);
        }
      }
    }

    for (var c in t) {
      t[c].flushTriggers();
    }

    this.oldScroll = {
      x: e.horizontal.newScroll,
      y: e.vertical.newScroll
    };
  }, e.prototype.innerHeight = function () {
    return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
  }, e.prototype.remove = function (t) {
    delete this.waypoints[t.axis][t.key], this.checkEmpty();
  }, e.prototype.innerWidth = function () {
    return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
  }, e.prototype.destroy = function () {
    var t = [];

    for (var e in this.waypoints) {
      for (var i in this.waypoints[e]) {
        t.push(this.waypoints[e][i]);
      }
    }

    for (var o = 0, n = t.length; n > o; o++) {
      t[o].destroy();
    }
  }, e.prototype.refresh = function () {
    var t,
        e = this.element == this.element.window,
        i = e ? void 0 : this.adapter.offset(),
        o = {};
    this.handleScroll(), t = {
      horizontal: {
        contextOffset: e ? 0 : i.left,
        contextScroll: e ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left",
        offsetProp: "left"
      },
      vertical: {
        contextOffset: e ? 0 : i.top,
        contextScroll: e ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up",
        offsetProp: "top"
      }
    };

    for (var r in t) {
      var s = t[r];

      for (var a in this.waypoints[r]) {
        var l,
            h,
            p,
            u,
            c,
            d = this.waypoints[r][a],
            f = d.options.offset,
            w = d.triggerPoint,
            y = 0,
            g = null == w;
        d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group);
      }
    }

    return n.requestAnimationFrame(function () {
      for (var t in o) {
        o[t].flushTriggers();
      }
    }), this;
  }, e.findOrCreateByElement = function (t) {
    return e.findByElement(t) || new e(t);
  }, e.refreshAll = function () {
    for (var t in o) {
      o[t].refresh();
    }
  }, e.findByElement = function (t) {
    return o[t.waypointContextKey];
  }, window.onload = function () {
    r && r(), e.refreshAll();
  }, n.requestAnimationFrame = function (e) {
    var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
    i.call(window, e);
  }, n.Context = e;
}(), function () {
  "use strict";

  function t(t, e) {
    return t.triggerPoint - e.triggerPoint;
  }

  function e(t, e) {
    return e.triggerPoint - t.triggerPoint;
  }

  function i(t) {
    this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this;
  }

  var o = {
    vertical: {},
    horizontal: {}
  },
      n = window.Waypoint;
  i.prototype.add = function (t) {
    this.waypoints.push(t);
  }, i.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  }, i.prototype.flushTriggers = function () {
    for (var i in this.triggerQueues) {
      var o = this.triggerQueues[i],
          n = "up" === i || "left" === i;
      o.sort(n ? e : t);

      for (var r = 0, s = o.length; s > r; r += 1) {
        var a = o[r];
        (a.options.continuous || r === o.length - 1) && a.trigger([i]);
      }
    }

    this.clearTriggerQueues();
  }, i.prototype.next = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints),
        o = i === this.waypoints.length - 1;
    return o ? null : this.waypoints[i + 1];
  }, i.prototype.previous = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints);
    return i ? this.waypoints[i - 1] : null;
  }, i.prototype.queueTrigger = function (t, e) {
    this.triggerQueues[e].push(t);
  }, i.prototype.remove = function (t) {
    var e = n.Adapter.inArray(t, this.waypoints);
    e > -1 && this.waypoints.splice(e, 1);
  }, i.prototype.first = function () {
    return this.waypoints[0];
  }, i.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  }, i.findOrCreate = function (t) {
    return o[t.axis][t.name] || new i(t);
  }, n.Group = i;
}(), function () {
  "use strict";

  function t(t) {
    this.$element = e(t);
  }

  var e = window.jQuery,
      i = window.Waypoint;
  e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
    t.prototype[i] = function () {
      var t = Array.prototype.slice.call(arguments);
      return this.$element[i].apply(this.$element, t);
    };
  }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
    t[o] = e[o];
  }), i.adapters.push({
    name: "jquery",
    Adapter: t
  }), i.Adapter = t;
}(), function () {
  "use strict";

  function t(t) {
    return function () {
      var i = [],
          o = arguments[0];
      return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
        var n = t.extend({}, o, {
          element: this
        });
        "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n));
      }), i;
    };
  }

  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
}();

/***/ }),

/***/ "./src/js/helpers/carousel-multi-image.js":
/*!************************************************!*\
  !*** ./src/js/helpers/carousel-multi-image.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Multiple Carousel slides
$('#carousel-multi-image').on('slide.bs.carousel', function (e) {
  /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $('#carousel-multi-image .carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);

    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == 'left') {
        $('#carousel-multi-image .carousel-item').eq(i).appendTo('#carousel-multi-image .carousel-inner');
      } else {
        $('#carousel-multi-image .carousel-item').eq(0).appendTo('#carousel-multi-image .carousel-inner');
      }
    }
  }
});

/***/ }),

/***/ "./src/js/helpers/waypointsFunctions.js":
/*!**********************************************!*\
  !*** ./src/js/helpers/waypointsFunctions.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//This code is used with the waypoints package to change navbar on scroll past banner.
//Note: waypoint function must be wrapped in conditional, otherwise it will interfere with Scroll-out package
if (document.getElementById('js-navbar')) {
  var waypointNavbar = new Waypoint({
    element: document.getElementById('js-navbar'),
    handler: function handler() {
      document.getElementById('nav').classList.add('bg-white');
      document.getElementById('nav').classList.remove('bg-transparent');
      var elements = document.getElementsByClassName('nav-link'); // get all elements

      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('text-white');
        elements[i].classList.add('text-dark');
      }
    },
    offset: 200 // Good offset if useing with default waypoints settings for next item

  });
}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scroll_out__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-out */ "./node_modules/scroll-out/lib/index.js");
/* harmony import */ var scroll_out__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_out__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_waypoints_lib_jquery_waypoints_min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/waypoints/lib/jquery.waypoints.min.js */ "./node_modules/waypoints/lib/jquery.waypoints.min.js");
/* harmony import */ var _node_modules_waypoints_lib_jquery_waypoints_min_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_waypoints_lib_jquery_waypoints_min_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_carousel_multi_image_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/carousel-multi-image.js */ "./src/js/helpers/carousel-multi-image.js");
/* harmony import */ var _helpers_carousel_multi_image_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_helpers_carousel_multi_image_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_waypointsFunctions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/waypointsFunctions.js */ "./src/js/helpers/waypointsFunctions.js");
/* harmony import */ var _helpers_waypointsFunctions_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helpers_waypointsFunctions_js__WEBPACK_IMPORTED_MODULE_3__);

 // import bootstrap from 'bootstrap';


 //Set up ScrollOut module. This module makes elements appear on the screen when they come into view on scroll

scroll_out__WEBPACK_IMPORTED_MODULE_0___default()({
  threshold: 0.2,
  once: true
});

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/js/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\bootstrap-theme\wp-content\themes\bootstrap-theme\src\js\index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Njcm9sbC1vdXQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YXlwb2ludHMvbGliL2pxdWVyeS53YXlwb2ludHMubWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL2Nhcm91c2VsLW11bHRpLWltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL3dheXBvaW50c0Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiXSwibmFtZXMiOlsiY2xhbXAiLCJ2IiwibWluIiwibWF4Iiwic2lnbiIsIngiLCJyb3VuZCIsIm4iLCJNYXRoIiwiY2FjaGUiLCJyZXBsYWNlciIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJoeXBoZW5hdGUiLCJ2YWx1ZSIsInJlcGxhY2UiLCIkIiwiZSIsInBhcmVudCIsImxlbmd0aCIsIm5vZGVOYW1lIiwic2xpY2UiLCJjYWxsIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0QXR0cnMiLCJlbCIsImF0dHJzIiwia2V5IiwiaW5kZXhPZiIsInNldEF0dHJpYnV0ZSIsInNldFByb3BzIiwiY3NzUHJvcHMiLCJwcm9wcyIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJjbGVhclRhc2siLCJzdWJzY3JpYmVycyIsImxvb3AiLCJmb3JFYWNoIiwiczIiLCJlbnF1ZXVlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic3Vic2NyaWJlIiwiZm4iLCJwdXNoIiwiZmlsdGVyIiwicyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidW53cmFwIiwiY3R4IiwiZG9jIiwibm9vcCIsIm1haW4iLCJvcHRzIiwib25DaGFuZ2UiLCJvbkhpZGRlbiIsIm9uU2hvd24iLCJvblNjcm9sbCIsInNlIiwic2Nyb2xsaW5nRWxlbWVudCIsImNvbnRhaW5lciIsIndpbmRvdyIsInJvb3RDaGFuZ2VkIiwic2Nyb2xsaW5nRWxlbWVudENvbnRleHQiLCJlbGVtZW50Q29udGV4dExpc3QiLCJjbGllbnRPZmZzZXRYIiwiY2xpZW50T2Zmc2V0eSIsInN1YiIsImluZGV4IiwidGFyZ2V0cyIsInNjb3BlIiwibWFwIiwiZWxlbWVudCIsInVwZGF0ZSIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsRGlyWCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsInNjcm9sbERpclkiLCJzY3JvbGxUb3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFBlcmNlbnRYIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxQZXJjZW50WSIsInNjcm9sbEhlaWdodCIsImNoaWxkQ2hhbmdlZCIsImluZGV4XzEiLCJ0YXJnZXQiLCJvZmZzZXRYIiwib2Zmc2V0WSIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJvZmZzZXRQYXJlbnQiLCJlbGVtZW50SGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiZWxlbWVudFdpZHRoIiwib2Zmc2V0V2lkdGgiLCJ2aXNpYmxlWCIsInZpc2libGVZIiwiaW50ZXJzZWN0WCIsImludGVyc2VjdFkiLCJ2aWV3cG9ydFgiLCJ2aWV3cG9ydFkiLCJ2aXNpYmxlIiwib2Zmc2V0IiwidGhyZXNob2xkIiwiY2hhbmdlZFZpc2libGUiLCJjaGFuZ2VkIiwiX2NoYW5nZWQiLCJfdmlzaWJsZUNoYW5nZWQiLCJyZW5kZXIiLCJtYXliZVVuc3Vic2NyaWJlIiwibGVuIiwianVzdE9uY2UiLCJoYXNBdHRyaWJ1dGUiLCJzY3JvbGwiLCJvbmNlIiwic3BsaWNlIiwidW5kZWZpbmVkIiwidXBkYXRlVGFza0lkIiwib25VcGRhdGUiLCJzZXRUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRlYXJkb3duIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0IiwibyIsIkVycm9yIiwiaGFuZGxlciIsIm9wdGlvbnMiLCJBZGFwdGVyIiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJhZGFwdGVyIiwiY2FsbGJhY2siLCJheGlzIiwiaG9yaXpvbnRhbCIsImVuYWJsZWQiLCJ0cmlnZ2VyUG9pbnQiLCJncm91cCIsIkdyb3VwIiwiZmluZE9yQ3JlYXRlIiwibmFtZSIsImNvbnRleHQiLCJDb250ZXh0IiwiZmluZE9yQ3JlYXRlQnlFbGVtZW50Iiwib2Zmc2V0QWxpYXNlcyIsImFkZCIsImkiLCJwcm90b3R5cGUiLCJxdWV1ZVRyaWdnZXIiLCJ0cmlnZ2VyIiwiYXBwbHkiLCJkZXN0cm95IiwicmVtb3ZlIiwiZGlzYWJsZSIsImVuYWJsZSIsInJlZnJlc2giLCJuZXh0IiwicHJldmlvdXMiLCJpbnZva2VBbGwiLCJyIiwiZGVzdHJveUFsbCIsImRpc2FibGVBbGwiLCJlbmFibGVBbGwiLCJyZWZyZXNoQWxsIiwidmlld3BvcnRIZWlnaHQiLCJpbm5lckhlaWdodCIsInZpZXdwb3J0V2lkdGgiLCJhZGFwdGVycyIsImNvbnRpbnVvdXMiLCJvdXRlckhlaWdodCIsImlubmVyV2lkdGgiLCJvdXRlcldpZHRoIiwiV2F5cG9pbnQiLCJkaWRTY3JvbGwiLCJkaWRSZXNpemUiLCJvbGRTY3JvbGwiLCJ5Iiwid2F5cG9pbnRzIiwidmVydGljYWwiLCJ3YXlwb2ludENvbnRleHRLZXkiLCJ3aW5kb3dDb250ZXh0IiwiY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlciIsImNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXIiLCJvbmxvYWQiLCJjaGVja0VtcHR5IiwiaXNFbXB0eU9iamVjdCIsIm9mZiIsImhhbmRsZVJlc2l6ZSIsIm9uIiwiaGFuZGxlU2Nyb2xsIiwiaXNUb3VjaCIsIm5ld1Njcm9sbCIsImZvcndhcmQiLCJiYWNrd2FyZCIsImEiLCJsIiwiaCIsInAiLCJ1IiwiaWQiLCJjIiwiZmx1c2hUcmlnZ2VycyIsImNvbnRleHRPZmZzZXQiLCJsZWZ0IiwiY29udGV4dFNjcm9sbCIsImNvbnRleHREaW1lbnNpb24iLCJvZmZzZXRQcm9wIiwidG9wIiwiZCIsImYiLCJ3IiwiZyIsInBhcnNlRmxvYXQiLCJjZWlsIiwiZmxvb3IiLCJmaW5kQnlFbGVtZW50IiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJUcmlnZ2VyUXVldWVzIiwidHJpZ2dlclF1ZXVlcyIsInVwIiwiZG93biIsInJpZ2h0Iiwic29ydCIsImluQXJyYXkiLCJmaXJzdCIsImxhc3QiLCIkZWxlbWVudCIsImpRdWVyeSIsImVhY2giLCJBcnJheSIsImFyZ3VtZW50cyIsImlzRnVuY3Rpb24iLCJjbG9zZXN0Iiwid2F5cG9pbnQiLCJaZXB0byIsIiRlIiwicmVsYXRlZFRhcmdldCIsImlkeCIsIml0ZW1zUGVyU2xpZGUiLCJ0b3RhbEl0ZW1zIiwiaXQiLCJkaXJlY3Rpb24iLCJlcSIsImFwcGVuZFRvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ3YXlwb2ludE5hdmJhciIsImNsYXNzTGlzdCIsImVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIlNjcm9sbE91dCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFD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RyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHc0csUUFBUSxDQUFDNU8sTUFBN0IsRUFBcUNzSSxDQUFDLEVBQXRDLEVBQTBDO0FBQ3hDc0csZ0JBQVEsQ0FBQ3RHLENBQUQsQ0FBUixDQUFZcUcsU0FBWixDQUFzQi9GLE1BQXRCLENBQTZCLFlBQTdCO0FBQ0FnRyxnQkFBUSxDQUFDdEcsQ0FBRCxDQUFSLENBQVlxRyxTQUFaLENBQXNCdEcsR0FBdEIsQ0FBMEIsV0FBMUI7QUFDRDtBQUNGLEtBWGlDO0FBWWxDN0MsVUFBTSxFQUFFLEdBWjBCLENBWXJCOztBQVpxQixHQUFiLENBQXZCO0FBY0QsQzs7Ozs7Ozs7Ozs7O0FDakJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0NBRUE7O0FBRUE7Q0FHQTs7QUFDQXNKLGlEQUFTLENBQUM7QUFDUnJKLFdBQVMsRUFBRSxHQURIO0FBRVJXLE1BQUksRUFBRTtBQUZFLENBQUQsQ0FBVCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjbGFtcCh2LCBtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiA+IHYgPyBtaW4gOiBtYXggPCB2ID8gbWF4IDogdjtcclxufVxyXG5mdW5jdGlvbiBzaWduKHgpIHtcclxuICAgIHJldHVybiAoKyh4ID4gMCkgLSArKHggPCAwKSk7XHJcbn1cclxuZnVuY3Rpb24gcm91bmQobikge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQobiAqIDEwMDAwKSAvIDEwMDAwO1xyXG59XG5cbnZhciBjYWNoZSA9IHt9O1xyXG5mdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xyXG4gICAgcmV0dXJuICctJyArIG1hdGNoWzBdLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuZnVuY3Rpb24gaHlwaGVuYXRlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gY2FjaGVbdmFsdWVdIHx8IChjYWNoZVt2YWx1ZV0gPSB2YWx1ZS5yZXBsYWNlKC8oW0EtWl0pL2csIHJlcGxhY2VyKSk7XHJcbn1cblxuLyoqIGZpbmQgZWxlbWVudHMgKi9cclxuZnVuY3Rpb24gJChlLCBwYXJlbnQpIHtcclxuICAgIHJldHVybiAhZSB8fCBlLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgID8gLy8gbnVsbCBvciBlbXB0eSBzdHJpbmcgcmV0dXJucyBlbXB0eSBhcnJheVxyXG4gICAgICAgICAgICBbXVxyXG4gICAgICAgIDogZS5ub2RlTmFtZVxyXG4gICAgICAgICAgICA/IC8vIGEgc2luZ2xlIGVsZW1lbnQgaXMgd3JhcHBlZCBpbiBhbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgW2VdXHJcbiAgICAgICAgICAgIDogLy8gc2VsZWN0b3IgYW5kIE5vZGVMaXN0IGFyZSBjb252ZXJ0ZWQgdG8gRWxlbWVudFtdXHJcbiAgICAgICAgICAgICAgICBbXS5zbGljZS5jYWxsKGVbMF0ubm9kZU5hbWUgPyBlIDogKHBhcmVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoZSkpO1xyXG59XHJcbmZ1bmN0aW9uIHNldEF0dHJzKGVsLCBhdHRycykge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcclxuICAgICAgICBpZiAoa2V5LmluZGV4T2YoJ18nKSkge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGh5cGhlbmF0ZShrZXkpLCBhdHRyc1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2V0UHJvcHMoY3NzUHJvcHMpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHByb3BzKSB7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZignXycpICYmIChjc3NQcm9wcyA9PT0gdHJ1ZSB8fCBjc3NQcm9wc1trZXldKSkge1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoJy0tJyArIGh5cGhlbmF0ZShrZXkpLCByb3VuZChwcm9wc1trZXldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XG5cbnZhciBjbGVhclRhc2s7XHJcbnZhciBzdWJzY3JpYmVycyA9IFtdO1xyXG5mdW5jdGlvbiBsb29wKCkge1xyXG4gICAgY2xlYXJUYXNrID0gMDtcclxuICAgIHN1YnNjcmliZXJzLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAoczIpIHsgcmV0dXJuIHMyKCk7IH0pO1xyXG4gICAgZW5xdWV1ZSgpO1xyXG59XHJcbmZ1bmN0aW9uIGVucXVldWUoKSB7XHJcbiAgICBpZiAoIWNsZWFyVGFzayAmJiBzdWJzY3JpYmVycy5sZW5ndGgpIHtcclxuICAgICAgICBjbGVhclRhc2sgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3Vic2NyaWJlKGZuKSB7XHJcbiAgICBzdWJzY3JpYmVycy5wdXNoKGZuKTtcclxuICAgIGVucXVldWUoKTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMgIT09IGZuOyB9KTtcclxuICAgICAgICBpZiAoIXN1YnNjcmliZXJzLmxlbmd0aCAmJiBjbGVhclRhc2spIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoY2xlYXJUYXNrKTtcclxuICAgICAgICAgICAgY2xlYXJUYXNrID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XG5cbmZ1bmN0aW9uIHVud3JhcCh2YWx1ZSwgZWwsIGN0eCwgZG9jKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUoZWwsIGN0eCwgZG9jKSA6IHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIG5vb3AoKSB7IH1cblxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgU2Nyb2xsT3V0IHRoYXQgbWFya3MgZWxlbWVudHMgaW4gdGhlIHZpZXdwb3J0IHdpdGhcclxuICogYW4gXCJpblwiIGNsYXNzIGFuZCBtYXJrcyBlbGVtZW50cyBvdXRzaWRlIG9mIHRoZSB2aWV3cG9ydCB3aXRoIGFuIFwib3V0XCJcclxuICovXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydFxyXG5mdW5jdGlvbiBtYWluIChvcHRzKSB7XHJcbiAgICAvLyBBcHBseSBkZWZhdWx0IG9wdGlvbnMuXHJcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcclxuICAgIC8vIERlYm91bmNlIG9uQ2hhbmdlL29uSGlkZGVuL29uU2hvd24uXHJcbiAgICB2YXIgb25DaGFuZ2UgPSBvcHRzLm9uQ2hhbmdlIHx8IG5vb3A7XHJcbiAgICB2YXIgb25IaWRkZW4gPSBvcHRzLm9uSGlkZGVuIHx8IG5vb3A7XHJcbiAgICB2YXIgb25TaG93biA9IG9wdHMub25TaG93biB8fCBub29wO1xyXG4gICAgdmFyIG9uU2Nyb2xsID0gb3B0cy5vblNjcm9sbCB8fCBub29wO1xyXG4gICAgdmFyIHByb3BzID0gb3B0cy5jc3NQcm9wcyA/IHNldFByb3BzKG9wdHMuY3NzUHJvcHMpIDogbm9vcDtcclxuICAgIHZhciBzZSA9IG9wdHMuc2Nyb2xsaW5nRWxlbWVudDtcclxuICAgIHZhciBjb250YWluZXIgPSBzZSA/ICQoc2UpWzBdIDogd2luZG93O1xyXG4gICAgdmFyIGRvYyA9IHNlID8gJChzZSlbMF0gOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICB2YXIgcm9vdENoYW5nZWQgPSBmYWxzZTtcclxuICAgIHZhciBzY3JvbGxpbmdFbGVtZW50Q29udGV4dCA9IHt9O1xyXG4gICAgdmFyIGVsZW1lbnRDb250ZXh0TGlzdCA9IFtdO1xyXG4gICAgdmFyIGNsaWVudE9mZnNldFgsIGNsaWVudE9mZnNldHk7XHJcbiAgICB2YXIgc3ViO1xyXG4gICAgZnVuY3Rpb24gaW5kZXgoKSB7XHJcbiAgICAgICAgZWxlbWVudENvbnRleHRMaXN0ID0gJChvcHRzLnRhcmdldHMgfHwgJ1tkYXRhLXNjcm9sbF0nLCAkKG9wdHMuc2NvcGUgfHwgZG9jKVswXSkubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gKHsgZWxlbWVudDogZWwgfSk7IH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBwb3NpdGlvbiwgZGlyZWN0aW9uIGFuZCByYXRpby5cclxuICAgICAgICB2YXIgY2xpZW50V2lkdGggPSBkb2MuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGNsaWVudEhlaWdodCA9IGRvYy5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbERpclggPSBzaWduKC1jbGllbnRPZmZzZXRYICsgKGNsaWVudE9mZnNldFggPSBkb2Muc2Nyb2xsTGVmdCB8fCB3aW5kb3cucGFnZVhPZmZzZXQpKTtcclxuICAgICAgICB2YXIgc2Nyb2xsRGlyWSA9IHNpZ24oLWNsaWVudE9mZnNldHkgKyAoY2xpZW50T2Zmc2V0eSA9IGRvYy5zY3JvbGxUb3AgfHwgd2luZG93LnBhZ2VZT2Zmc2V0KSk7XHJcbiAgICAgICAgdmFyIHNjcm9sbFBlcmNlbnRYID0gZG9jLnNjcm9sbExlZnQgLyAoZG9jLnNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGggfHwgMSk7XHJcbiAgICAgICAgdmFyIHNjcm9sbFBlcmNlbnRZID0gZG9jLnNjcm9sbFRvcCAvIChkb2Muc2Nyb2xsSGVpZ2h0IC0gY2xpZW50SGVpZ2h0IHx8IDEpO1xyXG4gICAgICAgIC8vIERldGVjdCBpZiB0aGUgcm9vdCBjb250ZXh0IGhhcyBjaGFuZ2VkLlxyXG4gICAgICAgIHJvb3RDaGFuZ2VkID1cclxuICAgICAgICAgICAgcm9vdENoYW5nZWQgfHxcclxuICAgICAgICAgICAgICAgIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbERpclggIT09IHNjcm9sbERpclggfHxcclxuICAgICAgICAgICAgICAgIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbERpclkgIT09IHNjcm9sbERpclkgfHxcclxuICAgICAgICAgICAgICAgIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbFBlcmNlbnRYICE9PSBzY3JvbGxQZXJjZW50WCB8fFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsUGVyY2VudFkgIT09IHNjcm9sbFBlcmNlbnRZO1xyXG4gICAgICAgIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbERpclggPSBzY3JvbGxEaXJYO1xyXG4gICAgICAgIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbERpclkgPSBzY3JvbGxEaXJZO1xyXG4gICAgICAgIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbFBlcmNlbnRYID0gc2Nyb2xsUGVyY2VudFg7XHJcbiAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsUGVyY2VudFkgPSBzY3JvbGxQZXJjZW50WTtcclxuICAgICAgICB2YXIgY2hpbGRDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXhfMSA9IDA7IGluZGV4XzEgPCBlbGVtZW50Q29udGV4dExpc3QubGVuZ3RoOyBpbmRleF8xKyspIHtcclxuICAgICAgICAgICAgdmFyIGN0eCA9IGVsZW1lbnRDb250ZXh0TGlzdFtpbmRleF8xXTtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBjdHguZWxlbWVudDtcclxuICAgICAgICAgICAgLy8gZmluZCB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgZWxlbWVudCB0byB0aGUgc2Nyb2xsaW5nIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdmFyIG9mZnNldFggPSAwO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WSA9IDA7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldFggKz0gdGFyZ2V0Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZICs9IHRhcmdldC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQub2Zmc2V0UGFyZW50O1xyXG4gICAgICAgICAgICB9IHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBjb250YWluZXIpO1xyXG4gICAgICAgICAgICAvLyBHZXQgZWxlbWVudCBkaW1lbnNpb25zLlxyXG4gICAgICAgICAgICB2YXIgZWxlbWVudEhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50V2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMDtcclxuICAgICAgICAgICAgLy8gRmluZCB2aXNpYmxlIHJhdGlvcyBmb3IgZWFjaCBlbGVtZW50LlxyXG4gICAgICAgICAgICB2YXIgdmlzaWJsZVggPSAoY2xhbXAob2Zmc2V0WCArIGVsZW1lbnRXaWR0aCwgY2xpZW50T2Zmc2V0WCwgY2xpZW50T2Zmc2V0WCArIGNsaWVudFdpZHRoKSAtXHJcbiAgICAgICAgICAgICAgICBjbGFtcChvZmZzZXRYLCBjbGllbnRPZmZzZXRYLCBjbGllbnRPZmZzZXRYICsgY2xpZW50V2lkdGgpKSAvXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlWSA9IChjbGFtcChvZmZzZXRZICsgZWxlbWVudEhlaWdodCwgY2xpZW50T2Zmc2V0eSwgY2xpZW50T2Zmc2V0eSArIGNsaWVudEhlaWdodCkgLVxyXG4gICAgICAgICAgICAgICAgY2xhbXAob2Zmc2V0WSwgY2xpZW50T2Zmc2V0eSwgY2xpZW50T2Zmc2V0eSArIGNsaWVudEhlaWdodCkpIC9cclxuICAgICAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnNlY3RYID0gdmlzaWJsZVggPT09IDEgPyAwIDogc2lnbihvZmZzZXRYIC0gY2xpZW50T2Zmc2V0WCk7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnNlY3RZID0gdmlzaWJsZVkgPT09IDEgPyAwIDogc2lnbihvZmZzZXRZIC0gY2xpZW50T2Zmc2V0eSk7XHJcbiAgICAgICAgICAgIHZhciB2aWV3cG9ydFggPSBjbGFtcCgoY2xpZW50T2Zmc2V0WCAtIChlbGVtZW50V2lkdGggLyAyICsgb2Zmc2V0WCAtIGNsaWVudFdpZHRoIC8gMikpIC8gKGNsaWVudFdpZHRoIC8gMiksIC0xLCAxKTtcclxuICAgICAgICAgICAgdmFyIHZpZXdwb3J0WSA9IGNsYW1wKChjbGllbnRPZmZzZXR5IC0gKGVsZW1lbnRIZWlnaHQgLyAyICsgb2Zmc2V0WSAtIGNsaWVudEhlaWdodCAvIDIpKSAvIChjbGllbnRIZWlnaHQgLyAyKSwgLTEsIDEpO1xyXG4gICAgICAgICAgICB2YXIgdmlzaWJsZSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgaWYgKG9wdHMub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gdW53cmFwKG9wdHMub2Zmc2V0LCBlbGVtZW50LCBjdHgsIGRvYykgPD0gY2xpZW50T2Zmc2V0eSA/IDEgOiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCh1bndyYXAob3B0cy50aHJlc2hvbGQsIGVsZW1lbnQsIGN0eCwgZG9jKSB8fCAwKSA8IHZpc2libGVYICogdmlzaWJsZVkpIHtcclxuICAgICAgICAgICAgICAgIHZpc2libGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNoYW5nZWRWaXNpYmxlID0gY3R4LnZpc2libGUgIT09IHZpc2libGU7XHJcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gY3R4Ll9jaGFuZ2VkIHx8XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VkVmlzaWJsZSB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LnZpc2libGVYICE9PSB2aXNpYmxlWCB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LnZpc2libGVZICE9PSB2aXNpYmxlWSB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LmluZGV4ICE9PSBpbmRleF8xIHx8XHJcbiAgICAgICAgICAgICAgICBjdHguZWxlbWVudEhlaWdodCAhPT0gZWxlbWVudEhlaWdodCB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LmVsZW1lbnRXaWR0aCAhPT0gZWxlbWVudFdpZHRoIHx8XHJcbiAgICAgICAgICAgICAgICBjdHgub2Zmc2V0WCAhPT0gb2Zmc2V0WCB8fFxyXG4gICAgICAgICAgICAgICAgY3R4Lm9mZnNldFkgIT09IG9mZnNldFkgfHxcclxuICAgICAgICAgICAgICAgIGN0eC5pbnRlcnNlY3RYICE9PSBjdHguaW50ZXJzZWN0WCB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LmludGVyc2VjdFkgIT09IGN0eC5pbnRlcnNlY3RZIHx8XHJcbiAgICAgICAgICAgICAgICBjdHgudmlld3BvcnRYICE9PSB2aWV3cG9ydFggfHxcclxuICAgICAgICAgICAgICAgIGN0eC52aWV3cG9ydFkgIT09IHZpZXdwb3J0WTtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdHguX2NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3R4Ll92aXNpYmxlQ2hhbmdlZCA9IGNoYW5nZWRWaXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgY3R4LnZpc2libGUgPSB2aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgY3R4LmVsZW1lbnRIZWlnaHQgPSBlbGVtZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY3R4LmVsZW1lbnRXaWR0aCA9IGVsZW1lbnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGN0eC5pbmRleCA9IGluZGV4XzE7XHJcbiAgICAgICAgICAgICAgICBjdHgub2Zmc2V0WCA9IG9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICBjdHgub2Zmc2V0WSA9IG9mZnNldFk7XHJcbiAgICAgICAgICAgICAgICBjdHgudmlzaWJsZVggPSB2aXNpYmxlWDtcclxuICAgICAgICAgICAgICAgIGN0eC52aXNpYmxlWSA9IHZpc2libGVZO1xyXG4gICAgICAgICAgICAgICAgY3R4LmludGVyc2VjdFggPSBpbnRlcnNlY3RYO1xyXG4gICAgICAgICAgICAgICAgY3R4LmludGVyc2VjdFkgPSBpbnRlcnNlY3RZO1xyXG4gICAgICAgICAgICAgICAgY3R4LnZpZXdwb3J0WCA9IHZpZXdwb3J0WDtcclxuICAgICAgICAgICAgICAgIGN0eC52aWV3cG9ydFkgPSB2aWV3cG9ydFk7XHJcbiAgICAgICAgICAgICAgICBjdHgudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFzdWIgJiYgKHJvb3RDaGFuZ2VkIHx8IGNoaWxkQ2hhbmdlZCkpIHtcclxuICAgICAgICAgICAgc3ViID0gc3Vic2NyaWJlKHJlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIG1heWJlVW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAvLyBVcGRhdGUgcm9vdCBhdHRyaWJ1dGVzIGlmIHRoZXkgaGF2ZSBjaGFuZ2VkLlxyXG4gICAgICAgIGlmIChyb290Q2hhbmdlZCkge1xyXG4gICAgICAgICAgICByb290Q2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRBdHRycyhkb2MsIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbERpclg6IHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbERpclgsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxEaXJZOiBzY3JvbGxpbmdFbGVtZW50Q29udGV4dC5zY3JvbGxEaXJZXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9wcyhkb2MsIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgb25TY3JvbGwoZG9jLCBzY3JvbGxpbmdFbGVtZW50Q29udGV4dCwgZWxlbWVudENvbnRleHRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlbiA9IGVsZW1lbnRDb250ZXh0TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgeCA9IGxlbiAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSBlbGVtZW50Q29udGV4dExpc3RbeF07XHJcbiAgICAgICAgICAgIHZhciBlbCA9IGN0eC5lbGVtZW50O1xyXG4gICAgICAgICAgICB2YXIgdmlzaWJsZSA9IGN0eC52aXNpYmxlO1xyXG4gICAgICAgICAgICB2YXIganVzdE9uY2UgPSBlbC5oYXNBdHRyaWJ1dGUoJ3Njcm9sbG91dC1vbmNlJykgfHwgZmFsc2U7IC8vIE9uY2VcclxuICAgICAgICAgICAgaWYgKGN0eC5fY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgY3R4Ll9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwcm9wcyhlbCwgY3R4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3R4Ll92aXNpYmxlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgc2V0QXR0cnMoZWwsIHsgc2Nyb2xsOiB2aXNpYmxlID8gJ2luJyA6ICdvdXQnIH0pO1xyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2UoZWwsIGN0eCwgZG9jKTtcclxuICAgICAgICAgICAgICAgICh2aXNpYmxlID8gb25TaG93biA6IG9uSGlkZGVuKShlbCwgY3R4LCBkb2MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgc2hvd24gbXVsdGlwbGUgdGltZXMsIGtlZXAgaXQgaW4gdGhlIGxpc3RcclxuICAgICAgICAgICAgaWYgKHZpc2libGUgJiYgKG9wdHMub25jZSB8fCBqdXN0T25jZSkpIHsgLy8gb3IgaWYgdGhpcyBlbGVtZW50IGp1c3QgZGlzcGxheSBpdCBvbmNlXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Q29udGV4dExpc3Quc3BsaWNlKHgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWF5YmVVbnN1YnNjcmliZSgpIHtcclxuICAgICAgICBpZiAoc3ViKSB7XHJcbiAgICAgICAgICAgIHN1YigpO1xyXG4gICAgICAgICAgICBzdWIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gUnVuIGluaXRpYWxpemUgaW5kZXguXHJcbiAgICBpbmRleCgpO1xyXG4gICAgdXBkYXRlKCk7XHJcbiAgICByZW5kZXIoKTtcclxuICAgIC8vIENvbGxhcHNlcyBzZXF1ZW50aWFsIHVwZGF0ZXMgaW50byBhIHNpbmdsZSB1cGRhdGUuXHJcbiAgICB2YXIgdXBkYXRlVGFza0lkID0gMDtcclxuICAgIHZhciBvblVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB1cGRhdGVUYXNrSWQgPSB1cGRhdGVUYXNrSWQgfHwgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRhc2tJZCA9IDA7XHJcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfTtcclxuICAgIC8vIEhvb2sgdXAgZG9jdW1lbnQgbGlzdGVuZXJzIHRvIGF1dG9tYXRpY2FsbHkgZGV0ZWN0IGNoYW5nZXMuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25VcGRhdGUpO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVXBkYXRlKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4gICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1heWJlVW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uVXBkYXRlKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uVXBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFpbjtcbiIsIi8qIVxuV2F5cG9pbnRzIC0gNC4wLjFcbkNvcHlyaWdodCDCqSAyMDExLTIwMTYgQ2FsZWIgVHJvdWdodG9uXG5MaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5odHRwczovL2dpdGh1Yi5jb20vaW1ha2V3ZWJ0aGluZ3Mvd2F5cG9pbnRzL2Jsb2IvbWFzdGVyL2xpY2Vuc2VzLnR4dFxuKi9cbiFmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQobyl7aWYoIW8pdGhyb3cgbmV3IEVycm9yKFwiTm8gb3B0aW9ucyBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3JcIik7aWYoIW8uZWxlbWVudCl0aHJvdyBuZXcgRXJyb3IoXCJObyBlbGVtZW50IG9wdGlvbiBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3JcIik7aWYoIW8uaGFuZGxlcil0aHJvdyBuZXcgRXJyb3IoXCJObyBoYW5kbGVyIG9wdGlvbiBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3JcIik7dGhpcy5rZXk9XCJ3YXlwb2ludC1cIitlLHRoaXMub3B0aW9ucz10LkFkYXB0ZXIuZXh0ZW5kKHt9LHQuZGVmYXVsdHMsbyksdGhpcy5lbGVtZW50PXRoaXMub3B0aW9ucy5lbGVtZW50LHRoaXMuYWRhcHRlcj1uZXcgdC5BZGFwdGVyKHRoaXMuZWxlbWVudCksdGhpcy5jYWxsYmFjaz1vLmhhbmRsZXIsdGhpcy5heGlzPXRoaXMub3B0aW9ucy5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIix0aGlzLmVuYWJsZWQ9dGhpcy5vcHRpb25zLmVuYWJsZWQsdGhpcy50cmlnZ2VyUG9pbnQ9bnVsbCx0aGlzLmdyb3VwPXQuR3JvdXAuZmluZE9yQ3JlYXRlKHtuYW1lOnRoaXMub3B0aW9ucy5ncm91cCxheGlzOnRoaXMuYXhpc30pLHRoaXMuY29udGV4dD10LkNvbnRleHQuZmluZE9yQ3JlYXRlQnlFbGVtZW50KHRoaXMub3B0aW9ucy5jb250ZXh0KSx0Lm9mZnNldEFsaWFzZXNbdGhpcy5vcHRpb25zLm9mZnNldF0mJih0aGlzLm9wdGlvbnMub2Zmc2V0PXQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XSksdGhpcy5ncm91cC5hZGQodGhpcyksdGhpcy5jb250ZXh0LmFkZCh0aGlzKSxpW3RoaXMua2V5XT10aGlzLGUrPTF9dmFyIGU9MCxpPXt9O3QucHJvdG90eXBlLnF1ZXVlVHJpZ2dlcj1mdW5jdGlvbih0KXt0aGlzLmdyb3VwLnF1ZXVlVHJpZ2dlcih0aGlzLHQpfSx0LnByb3RvdHlwZS50cmlnZ2VyPWZ1bmN0aW9uKHQpe3RoaXMuZW5hYmxlZCYmdGhpcy5jYWxsYmFjayYmdGhpcy5jYWxsYmFjay5hcHBseSh0aGlzLHQpfSx0LnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5jb250ZXh0LnJlbW92ZSh0aGlzKSx0aGlzLmdyb3VwLnJlbW92ZSh0aGlzKSxkZWxldGUgaVt0aGlzLmtleV19LHQucHJvdG90eXBlLmRpc2FibGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmFibGVkPSExLHRoaXN9LHQucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQucmVmcmVzaCgpLHRoaXMuZW5hYmxlZD0hMCx0aGlzfSx0LnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ3JvdXAubmV4dCh0aGlzKX0sdC5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ncm91cC5wcmV2aW91cyh0aGlzKX0sdC5pbnZva2VBbGw9ZnVuY3Rpb24odCl7dmFyIGU9W107Zm9yKHZhciBvIGluIGkpZS5wdXNoKGlbb10pO2Zvcih2YXIgbj0wLHI9ZS5sZW5ndGg7cj5uO24rKyllW25dW3RdKCl9LHQuZGVzdHJveUFsbD1mdW5jdGlvbigpe3QuaW52b2tlQWxsKFwiZGVzdHJveVwiKX0sdC5kaXNhYmxlQWxsPWZ1bmN0aW9uKCl7dC5pbnZva2VBbGwoXCJkaXNhYmxlXCIpfSx0LmVuYWJsZUFsbD1mdW5jdGlvbigpe3QuQ29udGV4dC5yZWZyZXNoQWxsKCk7Zm9yKHZhciBlIGluIGkpaVtlXS5lbmFibGVkPSEwO3JldHVybiB0aGlzfSx0LnJlZnJlc2hBbGw9ZnVuY3Rpb24oKXt0LkNvbnRleHQucmVmcmVzaEFsbCgpfSx0LnZpZXdwb3J0SGVpZ2h0PWZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodH0sdC52aWV3cG9ydFdpZHRoPWZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH0sdC5hZGFwdGVycz1bXSx0LmRlZmF1bHRzPXtjb250ZXh0OndpbmRvdyxjb250aW51b3VzOiEwLGVuYWJsZWQ6ITAsZ3JvdXA6XCJkZWZhdWx0XCIsaG9yaXpvbnRhbDohMSxvZmZzZXQ6MH0sdC5vZmZzZXRBbGlhc2VzPXtcImJvdHRvbS1pbi12aWV3XCI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LmlubmVySGVpZ2h0KCktdGhpcy5hZGFwdGVyLm91dGVySGVpZ2h0KCl9LFwicmlnaHQtaW4tdmlld1wiOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5pbm5lcldpZHRoKCktdGhpcy5hZGFwdGVyLm91dGVyV2lkdGgoKX19LHdpbmRvdy5XYXlwb2ludD10fSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt3aW5kb3cuc2V0VGltZW91dCh0LDFlMy82MCl9ZnVuY3Rpb24gZSh0KXt0aGlzLmVsZW1lbnQ9dCx0aGlzLkFkYXB0ZXI9bi5BZGFwdGVyLHRoaXMuYWRhcHRlcj1uZXcgdGhpcy5BZGFwdGVyKHQpLHRoaXMua2V5PVwid2F5cG9pbnQtY29udGV4dC1cIitpLHRoaXMuZGlkU2Nyb2xsPSExLHRoaXMuZGlkUmVzaXplPSExLHRoaXMub2xkU2Nyb2xsPXt4OnRoaXMuYWRhcHRlci5zY3JvbGxMZWZ0KCkseTp0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKCl9LHRoaXMud2F5cG9pbnRzPXt2ZXJ0aWNhbDp7fSxob3Jpem9udGFsOnt9fSx0LndheXBvaW50Q29udGV4dEtleT10aGlzLmtleSxvW3Qud2F5cG9pbnRDb250ZXh0S2V5XT10aGlzLGkrPTEsbi53aW5kb3dDb250ZXh0fHwobi53aW5kb3dDb250ZXh0PSEwLG4ud2luZG93Q29udGV4dD1uZXcgZSh3aW5kb3cpKSx0aGlzLmNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXIoKSx0aGlzLmNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXIoKX12YXIgaT0wLG89e30sbj13aW5kb3cuV2F5cG9pbnQscj13aW5kb3cub25sb2FkO2UucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt2YXIgZT10Lm9wdGlvbnMuaG9yaXpvbnRhbD9cImhvcml6b250YWxcIjpcInZlcnRpY2FsXCI7dGhpcy53YXlwb2ludHNbZV1bdC5rZXldPXQsdGhpcy5yZWZyZXNoKCl9LGUucHJvdG90eXBlLmNoZWNrRW1wdHk9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLkFkYXB0ZXIuaXNFbXB0eU9iamVjdCh0aGlzLndheXBvaW50cy5ob3Jpem9udGFsKSxlPXRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLnZlcnRpY2FsKSxpPXRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdzt0JiZlJiYhaSYmKHRoaXMuYWRhcHRlci5vZmYoXCIud2F5cG9pbnRzXCIpLGRlbGV0ZSBvW3RoaXMua2V5XSl9LGUucHJvdG90eXBlLmNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7ZS5oYW5kbGVSZXNpemUoKSxlLmRpZFJlc2l6ZT0hMX12YXIgZT10aGlzO3RoaXMuYWRhcHRlci5vbihcInJlc2l6ZS53YXlwb2ludHNcIixmdW5jdGlvbigpe2UuZGlkUmVzaXplfHwoZS5kaWRSZXNpemU9ITAsbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodCkpfSl9LGUucHJvdG90eXBlLmNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXI9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7ZS5oYW5kbGVTY3JvbGwoKSxlLmRpZFNjcm9sbD0hMX12YXIgZT10aGlzO3RoaXMuYWRhcHRlci5vbihcInNjcm9sbC53YXlwb2ludHNcIixmdW5jdGlvbigpeyghZS5kaWRTY3JvbGx8fG4uaXNUb3VjaCkmJihlLmRpZFNjcm9sbD0hMCxuLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0KSl9KX0sZS5wcm90b3R5cGUuaGFuZGxlUmVzaXplPWZ1bmN0aW9uKCl7bi5Db250ZXh0LnJlZnJlc2hBbGwoKX0sZS5wcm90b3R5cGUuaGFuZGxlU2Nyb2xsPWZ1bmN0aW9uKCl7dmFyIHQ9e30sZT17aG9yaXpvbnRhbDp7bmV3U2Nyb2xsOnRoaXMuYWRhcHRlci5zY3JvbGxMZWZ0KCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLngsZm9yd2FyZDpcInJpZ2h0XCIsYmFja3dhcmQ6XCJsZWZ0XCJ9LHZlcnRpY2FsOntuZXdTY3JvbGw6dGhpcy5hZGFwdGVyLnNjcm9sbFRvcCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC55LGZvcndhcmQ6XCJkb3duXCIsYmFja3dhcmQ6XCJ1cFwifX07Zm9yKHZhciBpIGluIGUpe3ZhciBvPWVbaV0sbj1vLm5ld1Njcm9sbD5vLm9sZFNjcm9sbCxyPW4/by5mb3J3YXJkOm8uYmFja3dhcmQ7Zm9yKHZhciBzIGluIHRoaXMud2F5cG9pbnRzW2ldKXt2YXIgYT10aGlzLndheXBvaW50c1tpXVtzXTtpZihudWxsIT09YS50cmlnZ2VyUG9pbnQpe3ZhciBsPW8ub2xkU2Nyb2xsPGEudHJpZ2dlclBvaW50LGg9by5uZXdTY3JvbGw+PWEudHJpZ2dlclBvaW50LHA9bCYmaCx1PSFsJiYhaDsocHx8dSkmJihhLnF1ZXVlVHJpZ2dlcihyKSx0W2EuZ3JvdXAuaWRdPWEuZ3JvdXApfX19Zm9yKHZhciBjIGluIHQpdFtjXS5mbHVzaFRyaWdnZXJzKCk7dGhpcy5vbGRTY3JvbGw9e3g6ZS5ob3Jpem9udGFsLm5ld1Njcm9sbCx5OmUudmVydGljYWwubmV3U2Nyb2xsfX0sZS5wcm90b3R5cGUuaW5uZXJIZWlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93P24udmlld3BvcnRIZWlnaHQoKTp0aGlzLmFkYXB0ZXIuaW5uZXJIZWlnaHQoKX0sZS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQpe2RlbGV0ZSB0aGlzLndheXBvaW50c1t0LmF4aXNdW3Qua2V5XSx0aGlzLmNoZWNrRW1wdHkoKX0sZS5wcm90b3R5cGUuaW5uZXJXaWR0aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3c/bi52aWV3cG9ydFdpZHRoKCk6dGhpcy5hZGFwdGVyLmlubmVyV2lkdGgoKX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciB0PVtdO2Zvcih2YXIgZSBpbiB0aGlzLndheXBvaW50cylmb3IodmFyIGkgaW4gdGhpcy53YXlwb2ludHNbZV0pdC5wdXNoKHRoaXMud2F5cG9pbnRzW2VdW2ldKTtmb3IodmFyIG89MCxuPXQubGVuZ3RoO24+bztvKyspdFtvXS5kZXN0cm95KCl9LGUucHJvdG90eXBlLnJlZnJlc2g9ZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdyxpPWU/dm9pZCAwOnRoaXMuYWRhcHRlci5vZmZzZXQoKSxvPXt9O3RoaXMuaGFuZGxlU2Nyb2xsKCksdD17aG9yaXpvbnRhbDp7Y29udGV4dE9mZnNldDplPzA6aS5sZWZ0LGNvbnRleHRTY3JvbGw6ZT8wOnRoaXMub2xkU2Nyb2xsLngsY29udGV4dERpbWVuc2lvbjp0aGlzLmlubmVyV2lkdGgoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueCxmb3J3YXJkOlwicmlnaHRcIixiYWNrd2FyZDpcImxlZnRcIixvZmZzZXRQcm9wOlwibGVmdFwifSx2ZXJ0aWNhbDp7Y29udGV4dE9mZnNldDplPzA6aS50b3AsY29udGV4dFNjcm9sbDplPzA6dGhpcy5vbGRTY3JvbGwueSxjb250ZXh0RGltZW5zaW9uOnRoaXMuaW5uZXJIZWlnaHQoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueSxmb3J3YXJkOlwiZG93blwiLGJhY2t3YXJkOlwidXBcIixvZmZzZXRQcm9wOlwidG9wXCJ9fTtmb3IodmFyIHIgaW4gdCl7dmFyIHM9dFtyXTtmb3IodmFyIGEgaW4gdGhpcy53YXlwb2ludHNbcl0pe3ZhciBsLGgscCx1LGMsZD10aGlzLndheXBvaW50c1tyXVthXSxmPWQub3B0aW9ucy5vZmZzZXQsdz1kLnRyaWdnZXJQb2ludCx5PTAsZz1udWxsPT13O2QuZWxlbWVudCE9PWQuZWxlbWVudC53aW5kb3cmJih5PWQuYWRhcHRlci5vZmZzZXQoKVtzLm9mZnNldFByb3BdKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBmP2Y9Zi5hcHBseShkKTpcInN0cmluZ1wiPT10eXBlb2YgZiYmKGY9cGFyc2VGbG9hdChmKSxkLm9wdGlvbnMub2Zmc2V0LmluZGV4T2YoXCIlXCIpPi0xJiYoZj1NYXRoLmNlaWwocy5jb250ZXh0RGltZW5zaW9uKmYvMTAwKSkpLGw9cy5jb250ZXh0U2Nyb2xsLXMuY29udGV4dE9mZnNldCxkLnRyaWdnZXJQb2ludD1NYXRoLmZsb29yKHkrbC1mKSxoPXc8cy5vbGRTY3JvbGwscD1kLnRyaWdnZXJQb2ludD49cy5vbGRTY3JvbGwsdT1oJiZwLGM9IWgmJiFwLCFnJiZ1PyhkLnF1ZXVlVHJpZ2dlcihzLmJhY2t3YXJkKSxvW2QuZ3JvdXAuaWRdPWQuZ3JvdXApOiFnJiZjPyhkLnF1ZXVlVHJpZ2dlcihzLmZvcndhcmQpLG9bZC5ncm91cC5pZF09ZC5ncm91cCk6ZyYmcy5vbGRTY3JvbGw+PWQudHJpZ2dlclBvaW50JiYoZC5xdWV1ZVRyaWdnZXIocy5mb3J3YXJkKSxvW2QuZ3JvdXAuaWRdPWQuZ3JvdXApfX1yZXR1cm4gbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gbylvW3RdLmZsdXNoVHJpZ2dlcnMoKX0pLHRoaXN9LGUuZmluZE9yQ3JlYXRlQnlFbGVtZW50PWZ1bmN0aW9uKHQpe3JldHVybiBlLmZpbmRCeUVsZW1lbnQodCl8fG5ldyBlKHQpfSxlLnJlZnJlc2hBbGw9ZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gbylvW3RdLnJlZnJlc2goKX0sZS5maW5kQnlFbGVtZW50PWZ1bmN0aW9uKHQpe3JldHVybiBvW3Qud2F5cG9pbnRDb250ZXh0S2V5XX0sd2luZG93Lm9ubG9hZD1mdW5jdGlvbigpe3ImJnIoKSxlLnJlZnJlc2hBbGwoKX0sbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oZSl7dmFyIGk9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8dDtpLmNhbGwod2luZG93LGUpfSxuLkNvbnRleHQ9ZX0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxlKXtyZXR1cm4gdC50cmlnZ2VyUG9pbnQtZS50cmlnZ2VyUG9pbnR9ZnVuY3Rpb24gZSh0LGUpe3JldHVybiBlLnRyaWdnZXJQb2ludC10LnRyaWdnZXJQb2ludH1mdW5jdGlvbiBpKHQpe3RoaXMubmFtZT10Lm5hbWUsdGhpcy5heGlzPXQuYXhpcyx0aGlzLmlkPXRoaXMubmFtZStcIi1cIit0aGlzLmF4aXMsdGhpcy53YXlwb2ludHM9W10sdGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKSxvW3RoaXMuYXhpc11bdGhpcy5uYW1lXT10aGlzfXZhciBvPXt2ZXJ0aWNhbDp7fSxob3Jpem9udGFsOnt9fSxuPXdpbmRvdy5XYXlwb2ludDtpLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy53YXlwb2ludHMucHVzaCh0KX0saS5wcm90b3R5cGUuY2xlYXJUcmlnZ2VyUXVldWVzPWZ1bmN0aW9uKCl7dGhpcy50cmlnZ2VyUXVldWVzPXt1cDpbXSxkb3duOltdLGxlZnQ6W10scmlnaHQ6W119fSxpLnByb3RvdHlwZS5mbHVzaFRyaWdnZXJzPWZ1bmN0aW9uKCl7Zm9yKHZhciBpIGluIHRoaXMudHJpZ2dlclF1ZXVlcyl7dmFyIG89dGhpcy50cmlnZ2VyUXVldWVzW2ldLG49XCJ1cFwiPT09aXx8XCJsZWZ0XCI9PT1pO28uc29ydChuP2U6dCk7Zm9yKHZhciByPTAscz1vLmxlbmd0aDtzPnI7cis9MSl7dmFyIGE9b1tyXTsoYS5vcHRpb25zLmNvbnRpbnVvdXN8fHI9PT1vLmxlbmd0aC0xKSYmYS50cmlnZ2VyKFtpXSl9fXRoaXMuY2xlYXJUcmlnZ2VyUXVldWVzKCl9LGkucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oZSl7dGhpcy53YXlwb2ludHMuc29ydCh0KTt2YXIgaT1uLkFkYXB0ZXIuaW5BcnJheShlLHRoaXMud2F5cG9pbnRzKSxvPWk9PT10aGlzLndheXBvaW50cy5sZW5ndGgtMTtyZXR1cm4gbz9udWxsOnRoaXMud2F5cG9pbnRzW2krMV19LGkucHJvdG90eXBlLnByZXZpb3VzPWZ1bmN0aW9uKGUpe3RoaXMud2F5cG9pbnRzLnNvcnQodCk7dmFyIGk9bi5BZGFwdGVyLmluQXJyYXkoZSx0aGlzLndheXBvaW50cyk7cmV0dXJuIGk/dGhpcy53YXlwb2ludHNbaS0xXTpudWxsfSxpLnByb3RvdHlwZS5xdWV1ZVRyaWdnZXI9ZnVuY3Rpb24odCxlKXt0aGlzLnRyaWdnZXJRdWV1ZXNbZV0ucHVzaCh0KX0saS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQpe3ZhciBlPW4uQWRhcHRlci5pbkFycmF5KHQsdGhpcy53YXlwb2ludHMpO2U+LTEmJnRoaXMud2F5cG9pbnRzLnNwbGljZShlLDEpfSxpLnByb3RvdHlwZS5maXJzdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLndheXBvaW50c1swXX0saS5wcm90b3R5cGUubGFzdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLndheXBvaW50c1t0aGlzLndheXBvaW50cy5sZW5ndGgtMV19LGkuZmluZE9yQ3JlYXRlPWZ1bmN0aW9uKHQpe3JldHVybiBvW3QuYXhpc11bdC5uYW1lXXx8bmV3IGkodCl9LG4uR3JvdXA9aX0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dGhpcy4kZWxlbWVudD1lKHQpfXZhciBlPXdpbmRvdy5qUXVlcnksaT13aW5kb3cuV2F5cG9pbnQ7ZS5lYWNoKFtcImlubmVySGVpZ2h0XCIsXCJpbm5lcldpZHRoXCIsXCJvZmZcIixcIm9mZnNldFwiLFwib25cIixcIm91dGVySGVpZ2h0XCIsXCJvdXRlcldpZHRoXCIsXCJzY3JvbGxMZWZ0XCIsXCJzY3JvbGxUb3BcIl0sZnVuY3Rpb24oZSxpKXt0LnByb3RvdHlwZVtpXT1mdW5jdGlvbigpe3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7cmV0dXJuIHRoaXMuJGVsZW1lbnRbaV0uYXBwbHkodGhpcy4kZWxlbWVudCx0KX19KSxlLmVhY2goW1wiZXh0ZW5kXCIsXCJpbkFycmF5XCIsXCJpc0VtcHR5T2JqZWN0XCJdLGZ1bmN0aW9uKGksbyl7dFtvXT1lW29dfSksaS5hZGFwdGVycy5wdXNoKHtuYW1lOlwianF1ZXJ5XCIsQWRhcHRlcjp0fSksaS5BZGFwdGVyPXR9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3JldHVybiBmdW5jdGlvbigpe3ZhciBpPVtdLG89YXJndW1lbnRzWzBdO3JldHVybiB0LmlzRnVuY3Rpb24oYXJndW1lbnRzWzBdKSYmKG89dC5leHRlbmQoe30sYXJndW1lbnRzWzFdKSxvLmhhbmRsZXI9YXJndW1lbnRzWzBdKSx0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgbj10LmV4dGVuZCh7fSxvLHtlbGVtZW50OnRoaXN9KTtcInN0cmluZ1wiPT10eXBlb2Ygbi5jb250ZXh0JiYobi5jb250ZXh0PXQodGhpcykuY2xvc2VzdChuLmNvbnRleHQpWzBdKSxpLnB1c2gobmV3IGUobikpfSksaX19dmFyIGU9d2luZG93LldheXBvaW50O3dpbmRvdy5qUXVlcnkmJih3aW5kb3cualF1ZXJ5LmZuLndheXBvaW50PXQod2luZG93LmpRdWVyeSkpLHdpbmRvdy5aZXB0byYmKHdpbmRvdy5aZXB0by5mbi53YXlwb2ludD10KHdpbmRvdy5aZXB0bykpfSgpO1xuXG4iLCIvLyBNdWx0aXBsZSBDYXJvdXNlbCBzbGlkZXNcclxuJCgnI2Nhcm91c2VsLW11bHRpLWltYWdlJykub24oJ3NsaWRlLmJzLmNhcm91c2VsJywgZnVuY3Rpb24gKGUpIHtcclxuICAvKlxyXG4gICAgICAgIENDIDIuMCBMaWNlbnNlIElhdGVrIExMQyAyMDE4IC0gQXR0cmlidXRpb24gcmVxdWlyZWRcclxuICAgICovXHJcbiAgdmFyICRlID0gJChlLnJlbGF0ZWRUYXJnZXQpO1xyXG4gIHZhciBpZHggPSAkZS5pbmRleCgpO1xyXG4gIHZhciBpdGVtc1BlclNsaWRlID0gNDtcclxuICB2YXIgdG90YWxJdGVtcyA9ICQoJyNjYXJvdXNlbC1tdWx0aS1pbWFnZSAuY2Fyb3VzZWwtaXRlbScpLmxlbmd0aDtcclxuXHJcbiAgaWYgKGlkeCA+PSB0b3RhbEl0ZW1zIC0gKGl0ZW1zUGVyU2xpZGUgLSAxKSkge1xyXG4gICAgdmFyIGl0ID0gaXRlbXNQZXJTbGlkZSAtICh0b3RhbEl0ZW1zIC0gaWR4KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXQ7IGkrKykge1xyXG4gICAgICAvLyBhcHBlbmQgc2xpZGVzIHRvIGVuZFxyXG4gICAgICBpZiAoZS5kaXJlY3Rpb24gPT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgJCgnI2Nhcm91c2VsLW11bHRpLWltYWdlIC5jYXJvdXNlbC1pdGVtJylcclxuICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgLmFwcGVuZFRvKCcjY2Fyb3VzZWwtbXVsdGktaW1hZ2UgLmNhcm91c2VsLWlubmVyJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI2Nhcm91c2VsLW11bHRpLWltYWdlIC5jYXJvdXNlbC1pdGVtJylcclxuICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgLmFwcGVuZFRvKCcjY2Fyb3VzZWwtbXVsdGktaW1hZ2UgLmNhcm91c2VsLWlubmVyJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iLCIvL1RoaXMgY29kZSBpcyB1c2VkIHdpdGggdGhlIHdheXBvaW50cyBwYWNrYWdlIHRvIGNoYW5nZSBuYXZiYXIgb24gc2Nyb2xsIHBhc3QgYmFubmVyLlxyXG4vL05vdGU6IHdheXBvaW50IGZ1bmN0aW9uIG11c3QgYmUgd3JhcHBlZCBpbiBjb25kaXRpb25hbCwgb3RoZXJ3aXNlIGl0IHdpbGwgaW50ZXJmZXJlIHdpdGggU2Nyb2xsLW91dCBwYWNrYWdlXHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmF2YmFyJykpIHtcclxuICBjb25zdCB3YXlwb2ludE5hdmJhciA9IG5ldyBXYXlwb2ludCh7XHJcbiAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmF2YmFyJyksXHJcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYnKS5jbGFzc0xpc3QuYWRkKCdiZy13aGl0ZScpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2JykuY2xhc3NMaXN0LnJlbW92ZSgnYmctdHJhbnNwYXJlbnQnKTtcclxuXHJcbiAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdi1saW5rJyk7IC8vIGdldCBhbGwgZWxlbWVudHNcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtd2hpdGUnKTtcclxuICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRhcmsnKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9mZnNldDogMjAwLCAvLyBHb29kIG9mZnNldCBpZiB1c2Vpbmcgd2l0aCBkZWZhdWx0IHdheXBvaW50cyBzZXR0aW5ncyBmb3IgbmV4dCBpdGVtXHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IFNjcm9sbE91dCBmcm9tICdzY3JvbGwtb3V0JztcclxuaW1wb3J0ICcuLi8uLi9ub2RlX21vZHVsZXMvd2F5cG9pbnRzL2xpYi9qcXVlcnkud2F5cG9pbnRzLm1pbi5qcyc7XHJcbi8vIGltcG9ydCBib290c3RyYXAgZnJvbSAnYm9vdHN0cmFwJztcclxuXHJcbmltcG9ydCAnLi9oZWxwZXJzL2Nhcm91c2VsLW11bHRpLWltYWdlLmpzJztcclxuaW1wb3J0ICcuL2hlbHBlcnMvd2F5cG9pbnRzRnVuY3Rpb25zLmpzJztcclxuXHJcbi8vU2V0IHVwIFNjcm9sbE91dCBtb2R1bGUuIFRoaXMgbW9kdWxlIG1ha2VzIGVsZW1lbnRzIGFwcGVhciBvbiB0aGUgc2NyZWVuIHdoZW4gdGhleSBjb21lIGludG8gdmlldyBvbiBzY3JvbGxcclxuU2Nyb2xsT3V0KHtcclxuICB0aHJlc2hvbGQ6IDAuMixcclxuICBvbmNlOiB0cnVlLFxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==