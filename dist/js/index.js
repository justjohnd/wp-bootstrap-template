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

/***/ "./src/js/helpers/customNavbar.js":
/*!****************************************!*\
  !*** ./src/js/helpers/customNavbar.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hamburger = document.querySelector('.hamburger');
var mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('toggle');
  mobileMenu.classList.toggle('toggle');
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
var jsNavbar = document.getElementById('js-navbar');
var nav = document.getElementById('nav');

if (jsNavbar) {
  var waypointNavbar = new Waypoint({
    element: jsNavbar,
    handler: function handler() {
      //Change navbar background color to bg-black, bg-white, etc.
      nav.classList.add('bg-black');
      nav.classList.remove('bg-transparent');
      var elements = document.getElementsByClassName('nav-link');

      for (var i = 0; i < elements.length; i++) {
        if (nav.classList.contains('bg-black')) {
          elements[i].classList.add('text-white');
        } else if (nav.classList.contains('bg-white')) {
          elements[i].classList.add('text-dark');
        }
      }
    },
    offset: 200
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
/* harmony import */ var _helpers_customNavbar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/customNavbar.js */ "./src/js/helpers/customNavbar.js");
/* harmony import */ var _helpers_customNavbar_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_helpers_customNavbar_js__WEBPACK_IMPORTED_MODULE_4__);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Njcm9sbC1vdXQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YXlwb2ludHMvbGliL2pxdWVyeS53YXlwb2ludHMubWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL2Nhcm91c2VsLW11bHRpLWltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzL2N1c3RvbU5hdmJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVycy93YXlwb2ludHNGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImNsYW1wIiwidiIsIm1pbiIsIm1heCIsInNpZ24iLCJ4Iiwicm91bmQiLCJuIiwiTWF0aCIsImNhY2hlIiwicmVwbGFjZXIiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwiaHlwaGVuYXRlIiwidmFsdWUiLCJyZXBsYWNlIiwiJCIsImUiLCJwYXJlbnQiLCJsZW5ndGgiLCJub2RlTmFtZSIsInNsaWNlIiwiY2FsbCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInNldEF0dHJzIiwiZWwiLCJhdHRycyIsImtleSIsImluZGV4T2YiLCJzZXRBdHRyaWJ1dGUiLCJzZXRQcm9wcyIsImNzc1Byb3BzIiwicHJvcHMiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiY2xlYXJUYXNrIiwic3Vic2NyaWJlcnMiLCJsb29wIiwiZm9yRWFjaCIsInMyIiwiZW5xdWV1ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInN1YnNjcmliZSIsImZuIiwicHVzaCIsImZpbHRlciIsInMiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInVud3JhcCIsImN0eCIsImRvYyIsIm5vb3AiLCJtYWluIiwib3B0cyIsIm9uQ2hhbmdlIiwib25IaWRkZW4iLCJvblNob3duIiwib25TY3JvbGwiLCJzZSIsInNjcm9sbGluZ0VsZW1lbnQiLCJjb250YWluZXIiLCJ3aW5kb3ciLCJyb290Q2hhbmdlZCIsInNjcm9sbGluZ0VsZW1lbnRDb250ZXh0IiwiZWxlbWVudENvbnRleHRMaXN0IiwiY2xpZW50T2Zmc2V0WCIsImNsaWVudE9mZnNldHkiLCJzdWIiLCJpbmRleCIsInRhcmdldHMiLCJzY29wZSIsIm1hcCIsImVsZW1lbnQiLCJ1cGRhdGUiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsInNjcm9sbERpclgiLCJzY3JvbGxMZWZ0IiwicGFnZVhPZmZzZXQiLCJzY3JvbGxEaXJZIiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxQZXJjZW50WCIsInNjcm9sbFdpZHRoIiwic2Nyb2xsUGVyY2VudFkiLCJzY3JvbGxIZWlnaHQiLCJjaGlsZENoYW5nZWQiLCJpbmRleF8xIiwidGFyZ2V0Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwib2Zmc2V0UGFyZW50IiwiZWxlbWVudEhlaWdodCIsIm9mZnNldEhlaWdodCIsImVsZW1lbnRXaWR0aCIsIm9mZnNldFdpZHRoIiwidmlzaWJsZVgiLCJ2aXNpYmxlWSIsImludGVyc2VjdFgiLCJpbnRlcnNlY3RZIiwidmlld3BvcnRYIiwidmlld3BvcnRZIiwidmlzaWJsZSIsIm9mZnNldCIsInRocmVzaG9sZCIsImNoYW5nZWRWaXNpYmxlIiwiY2hhbmdlZCIsIl9jaGFuZ2VkIiwiX3Zpc2libGVDaGFuZ2VkIiwicmVuZGVyIiwibWF5YmVVbnN1YnNjcmliZSIsImxlbiIsImp1c3RPbmNlIiwiaGFzQXR0cmlidXRlIiwic2Nyb2xsIiwib25jZSIsInNwbGljZSIsInVuZGVmaW5lZCIsInVwZGF0ZVRhc2tJZCIsIm9uVXBkYXRlIiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0ZWFyZG93biIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwidCIsIm8iLCJFcnJvciIsImhhbmRsZXIiLCJvcHRpb25zIiwiQWRhcHRlciIsImV4dGVuZCIsImRlZmF1bHRzIiwiYWRhcHRlciIsImNhbGxiYWNrIiwiYXhpcyIsImhvcml6b250YWwiLCJlbmFibGVkIiwidHJpZ2dlclBvaW50IiwiZ3JvdXAiLCJHcm91cCIsImZpbmRPckNyZWF0ZSIsIm5hbWUiLCJjb250ZXh0IiwiQ29udGV4dCIsImZpbmRPckNyZWF0ZUJ5RWxlbWVudCIsIm9mZnNldEFsaWFzZXMiLCJhZGQiLCJpIiwicHJvdG90eXBlIiwicXVldWVUcmlnZ2VyIiwidHJpZ2dlciIsImFwcGx5IiwiZGVzdHJveSIsInJlbW92ZSIsImRpc2FibGUiLCJlbmFibGUiLCJyZWZyZXNoIiwibmV4dCIsInByZXZpb3VzIiwiaW52b2tlQWxsIiwiciIsImRlc3Ryb3lBbGwiLCJkaXNhYmxlQWxsIiwiZW5hYmxlQWxsIiwicmVmcmVzaEFsbCIsInZpZXdwb3J0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ2aWV3cG9ydFdpZHRoIiwiYWRhcHRlcnMiLCJjb250aW51b3VzIiwib3V0ZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwib3V0ZXJXaWR0aCIsIldheXBvaW50IiwiZGlkU2Nyb2xsIiwiZGlkUmVzaXplIiwib2xkU2Nyb2xsIiwieSIsIndheXBvaW50cyIsInZlcnRpY2FsIiwid2F5cG9pbnRDb250ZXh0S2V5Iiwid2luZG93Q29udGV4dCIsImNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXIiLCJjcmVhdGVUaHJvdHRsZWRSZXNpemVIYW5kbGVyIiwib25sb2FkIiwiY2hlY2tFbXB0eSIsImlzRW1wdHlPYmplY3QiLCJvZmYiLCJoYW5kbGVSZXNpemUiLCJvbiIsImhhbmRsZVNjcm9sbCIsImlzVG91Y2giLCJuZXdTY3JvbGwiLCJmb3J3YXJkIiwiYmFja3dhcmQiLCJhIiwibCIsImgiLCJwIiwidSIsImlkIiwiYyIsImZsdXNoVHJpZ2dlcnMiLCJjb250ZXh0T2Zmc2V0IiwibGVmdCIsImNvbnRleHRTY3JvbGwiLCJjb250ZXh0RGltZW5zaW9uIiwib2Zmc2V0UHJvcCIsInRvcCIsImQiLCJmIiwidyIsImciLCJwYXJzZUZsb2F0IiwiY2VpbCIsImZsb29yIiwiZmluZEJ5RWxlbWVudCIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNsZWFyVHJpZ2dlclF1ZXVlcyIsInRyaWdnZXJRdWV1ZXMiLCJ1cCIsImRvd24iLCJyaWdodCIsInNvcnQiLCJpbkFycmF5IiwiZmlyc3QiLCJsYXN0IiwiJGVsZW1lbnQiLCJqUXVlcnkiLCJlYWNoIiwiQXJyYXkiLCJhcmd1bWVudHMiLCJpc0Z1bmN0aW9uIiwiY2xvc2VzdCIsIndheXBvaW50IiwiWmVwdG8iLCIkZSIsInJlbGF0ZWRUYXJnZXQiLCJpZHgiLCJpdGVtc1BlclNsaWRlIiwidG90YWxJdGVtcyIsIml0IiwiZGlyZWN0aW9uIiwiZXEiLCJhcHBlbmRUbyIsImhhbWJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJtb2JpbGVNZW51IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwianNOYXZiYXIiLCJnZXRFbGVtZW50QnlJZCIsIm5hdiIsIndheXBvaW50TmF2YmFyIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY29udGFpbnMiLCJTY3JvbGxPdXQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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QUdBOztBQUNBNkosaURBQVMsQ0FBQztBQUNSNUosV0FBUyxFQUFFLEdBREg7QUFFUlcsTUFBSSxFQUFFO0FBRkUsQ0FBRCxDQUFULEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNsYW1wKHYsIG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gbWluID4gdiA/IG1pbiA6IG1heCA8IHYgPyBtYXggOiB2O1xyXG59XHJcbmZ1bmN0aW9uIHNpZ24oeCkge1xyXG4gICAgcmV0dXJuICgrKHggPiAwKSAtICsoeCA8IDApKTtcclxufVxyXG5mdW5jdGlvbiByb3VuZChuKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChuICogMTAwMDApIC8gMTAwMDA7XHJcbn1cblxudmFyIGNhY2hlID0ge307XHJcbmZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XHJcbiAgICByZXR1cm4gJy0nICsgbWF0Y2hbMF0udG9Mb3dlckNhc2UoKTtcclxufVxyXG5mdW5jdGlvbiBoeXBoZW5hdGUodmFsdWUpIHtcclxuICAgIHJldHVybiBjYWNoZVt2YWx1ZV0gfHwgKGNhY2hlW3ZhbHVlXSA9IHZhbHVlLnJlcGxhY2UoLyhbQS1aXSkvZywgcmVwbGFjZXIpKTtcclxufVxuXG4vKiogZmluZCBlbGVtZW50cyAqL1xyXG5mdW5jdGlvbiAkKGUsIHBhcmVudCkge1xyXG4gICAgcmV0dXJuICFlIHx8IGUubGVuZ3RoID09PSAwXHJcbiAgICAgICAgPyAvLyBudWxsIG9yIGVtcHR5IHN0cmluZyByZXR1cm5zIGVtcHR5IGFycmF5XHJcbiAgICAgICAgICAgIFtdXHJcbiAgICAgICAgOiBlLm5vZGVOYW1lXHJcbiAgICAgICAgICAgID8gLy8gYSBzaW5nbGUgZWxlbWVudCBpcyB3cmFwcGVkIGluIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICBbZV1cclxuICAgICAgICAgICAgOiAvLyBzZWxlY3RvciBhbmQgTm9kZUxpc3QgYXJlIGNvbnZlcnRlZCB0byBFbGVtZW50W11cclxuICAgICAgICAgICAgICAgIFtdLnNsaWNlLmNhbGwoZVswXS5ub2RlTmFtZSA/IGUgOiAocGFyZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkucXVlcnlTZWxlY3RvckFsbChlKSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0QXR0cnMoZWwsIGF0dHJzKSB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgIGZvciAodmFyIGtleSBpbiBhdHRycykge1xyXG4gICAgICAgIGlmIChrZXkuaW5kZXhPZignXycpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgaHlwaGVuYXRlKGtleSksIGF0dHJzW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZXRQcm9wcyhjc3NQcm9wcykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgcHJvcHMpIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdfJykgJiYgKGNzc1Byb3BzID09PSB0cnVlIHx8IGNzc1Byb3BzW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS0nICsgaHlwaGVuYXRlKGtleSksIHJvdW5kKHByb3BzW2tleV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cblxudmFyIGNsZWFyVGFzaztcclxudmFyIHN1YnNjcmliZXJzID0gW107XHJcbmZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgICBjbGVhclRhc2sgPSAwO1xyXG4gICAgc3Vic2NyaWJlcnMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChzMikgeyByZXR1cm4gczIoKTsgfSk7XHJcbiAgICBlbnF1ZXVlKCk7XHJcbn1cclxuZnVuY3Rpb24gZW5xdWV1ZSgpIHtcclxuICAgIGlmICghY2xlYXJUYXNrICYmIHN1YnNjcmliZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIGNsZWFyVGFzayA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzdWJzY3JpYmUoZm4pIHtcclxuICAgIHN1YnNjcmliZXJzLnB1c2goZm4pO1xyXG4gICAgZW5xdWV1ZSgpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzdWJzY3JpYmVycyA9IHN1YnNjcmliZXJzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcyAhPT0gZm47IH0pO1xyXG4gICAgICAgIGlmICghc3Vic2NyaWJlcnMubGVuZ3RoICYmIGNsZWFyVGFzaykge1xyXG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShjbGVhclRhc2spO1xyXG4gICAgICAgICAgICBjbGVhclRhc2sgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cblxuZnVuY3Rpb24gdW53cmFwKHZhbHVlLCBlbCwgY3R4LCBkb2MpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZShlbCwgY3R4LCBkb2MpIDogdmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gbm9vcCgpIHsgfVxuXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBTY3JvbGxPdXQgdGhhdCBtYXJrcyBlbGVtZW50cyBpbiB0aGUgdmlld3BvcnQgd2l0aFxyXG4gKiBhbiBcImluXCIgY2xhc3MgYW5kIG1hcmtzIGVsZW1lbnRzIG91dHNpZGUgb2YgdGhlIHZpZXdwb3J0IHdpdGggYW4gXCJvdXRcIlxyXG4gKi9cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0XHJcbmZ1bmN0aW9uIG1haW4gKG9wdHMpIHtcclxuICAgIC8vIEFwcGx5IGRlZmF1bHQgb3B0aW9ucy5cclxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG4gICAgLy8gRGVib3VuY2Ugb25DaGFuZ2Uvb25IaWRkZW4vb25TaG93bi5cclxuICAgIHZhciBvbkNoYW5nZSA9IG9wdHMub25DaGFuZ2UgfHwgbm9vcDtcclxuICAgIHZhciBvbkhpZGRlbiA9IG9wdHMub25IaWRkZW4gfHwgbm9vcDtcclxuICAgIHZhciBvblNob3duID0gb3B0cy5vblNob3duIHx8IG5vb3A7XHJcbiAgICB2YXIgb25TY3JvbGwgPSBvcHRzLm9uU2Nyb2xsIHx8IG5vb3A7XHJcbiAgICB2YXIgcHJvcHMgPSBvcHRzLmNzc1Byb3BzID8gc2V0UHJvcHMob3B0cy5jc3NQcm9wcykgOiBub29wO1xyXG4gICAgdmFyIHNlID0gb3B0cy5zY3JvbGxpbmdFbGVtZW50O1xyXG4gICAgdmFyIGNvbnRhaW5lciA9IHNlID8gJChzZSlbMF0gOiB3aW5kb3c7XHJcbiAgICB2YXIgZG9jID0gc2UgPyAkKHNlKVswXSA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgIHZhciByb290Q2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgdmFyIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0ID0ge307XHJcbiAgICB2YXIgZWxlbWVudENvbnRleHRMaXN0ID0gW107XHJcbiAgICB2YXIgY2xpZW50T2Zmc2V0WCwgY2xpZW50T2Zmc2V0eTtcclxuICAgIHZhciBzdWI7XHJcbiAgICBmdW5jdGlvbiBpbmRleCgpIHtcclxuICAgICAgICBlbGVtZW50Q29udGV4dExpc3QgPSAkKG9wdHMudGFyZ2V0cyB8fCAnW2RhdGEtc2Nyb2xsXScsICQob3B0cy5zY29wZSB8fCBkb2MpWzBdKS5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAoeyBlbGVtZW50OiBlbCB9KTsgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHBvc2l0aW9uLCBkaXJlY3Rpb24gYW5kIHJhdGlvLlxyXG4gICAgICAgIHZhciBjbGllbnRXaWR0aCA9IGRvYy5jbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gZG9jLmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgc2Nyb2xsRGlyWCA9IHNpZ24oLWNsaWVudE9mZnNldFggKyAoY2xpZW50T2Zmc2V0WCA9IGRvYy5zY3JvbGxMZWZ0IHx8IHdpbmRvdy5wYWdlWE9mZnNldCkpO1xyXG4gICAgICAgIHZhciBzY3JvbGxEaXJZID0gc2lnbigtY2xpZW50T2Zmc2V0eSArIChjbGllbnRPZmZzZXR5ID0gZG9jLnNjcm9sbFRvcCB8fCB3aW5kb3cucGFnZVlPZmZzZXQpKTtcclxuICAgICAgICB2YXIgc2Nyb2xsUGVyY2VudFggPSBkb2Muc2Nyb2xsTGVmdCAvIChkb2Muc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aCB8fCAxKTtcclxuICAgICAgICB2YXIgc2Nyb2xsUGVyY2VudFkgPSBkb2Muc2Nyb2xsVG9wIC8gKGRvYy5zY3JvbGxIZWlnaHQgLSBjbGllbnRIZWlnaHQgfHwgMSk7XHJcbiAgICAgICAgLy8gRGV0ZWN0IGlmIHRoZSByb290IGNvbnRleHQgaGFzIGNoYW5nZWQuXHJcbiAgICAgICAgcm9vdENoYW5nZWQgPVxyXG4gICAgICAgICAgICByb290Q2hhbmdlZCB8fFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsRGlyWCAhPT0gc2Nyb2xsRGlyWCB8fFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsRGlyWSAhPT0gc2Nyb2xsRGlyWSB8fFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsUGVyY2VudFggIT09IHNjcm9sbFBlcmNlbnRYIHx8XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxpbmdFbGVtZW50Q29udGV4dC5zY3JvbGxQZXJjZW50WSAhPT0gc2Nyb2xsUGVyY2VudFk7XHJcbiAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsRGlyWCA9IHNjcm9sbERpclg7XHJcbiAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsRGlyWSA9IHNjcm9sbERpclk7XHJcbiAgICAgICAgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsUGVyY2VudFggPSBzY3JvbGxQZXJjZW50WDtcclxuICAgICAgICBzY3JvbGxpbmdFbGVtZW50Q29udGV4dC5zY3JvbGxQZXJjZW50WSA9IHNjcm9sbFBlcmNlbnRZO1xyXG4gICAgICAgIHZhciBjaGlsZENoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpbmRleF8xID0gMDsgaW5kZXhfMSA8IGVsZW1lbnRDb250ZXh0TGlzdC5sZW5ndGg7IGluZGV4XzErKykge1xyXG4gICAgICAgICAgICB2YXIgY3R4ID0gZWxlbWVudENvbnRleHRMaXN0W2luZGV4XzFdO1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGN0eC5lbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBlbGVtZW50IHRvIHRoZSBzY3JvbGxpbmcgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRZID0gMDtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCArPSB0YXJnZXQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgIG9mZnNldFkgKz0gdGFyZ2V0Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIC8vIEdldCBlbGVtZW50IGRpbWVuc2lvbnMuXHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMDtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRXaWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGggfHwgZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAwO1xyXG4gICAgICAgICAgICAvLyBGaW5kIHZpc2libGUgcmF0aW9zIGZvciBlYWNoIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlWCA9IChjbGFtcChvZmZzZXRYICsgZWxlbWVudFdpZHRoLCBjbGllbnRPZmZzZXRYLCBjbGllbnRPZmZzZXRYICsgY2xpZW50V2lkdGgpIC1cclxuICAgICAgICAgICAgICAgIGNsYW1wKG9mZnNldFgsIGNsaWVudE9mZnNldFgsIGNsaWVudE9mZnNldFggKyBjbGllbnRXaWR0aCkpIC9cclxuICAgICAgICAgICAgICAgIGVsZW1lbnRXaWR0aDtcclxuICAgICAgICAgICAgdmFyIHZpc2libGVZID0gKGNsYW1wKG9mZnNldFkgKyBlbGVtZW50SGVpZ2h0LCBjbGllbnRPZmZzZXR5LCBjbGllbnRPZmZzZXR5ICsgY2xpZW50SGVpZ2h0KSAtXHJcbiAgICAgICAgICAgICAgICBjbGFtcChvZmZzZXRZLCBjbGllbnRPZmZzZXR5LCBjbGllbnRPZmZzZXR5ICsgY2xpZW50SGVpZ2h0KSkgL1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudEhlaWdodDtcclxuICAgICAgICAgICAgdmFyIGludGVyc2VjdFggPSB2aXNpYmxlWCA9PT0gMSA/IDAgOiBzaWduKG9mZnNldFggLSBjbGllbnRPZmZzZXRYKTtcclxuICAgICAgICAgICAgdmFyIGludGVyc2VjdFkgPSB2aXNpYmxlWSA9PT0gMSA/IDAgOiBzaWduKG9mZnNldFkgLSBjbGllbnRPZmZzZXR5KTtcclxuICAgICAgICAgICAgdmFyIHZpZXdwb3J0WCA9IGNsYW1wKChjbGllbnRPZmZzZXRYIC0gKGVsZW1lbnRXaWR0aCAvIDIgKyBvZmZzZXRYIC0gY2xpZW50V2lkdGggLyAyKSkgLyAoY2xpZW50V2lkdGggLyAyKSwgLTEsIDEpO1xyXG4gICAgICAgICAgICB2YXIgdmlld3BvcnRZID0gY2xhbXAoKGNsaWVudE9mZnNldHkgLSAoZWxlbWVudEhlaWdodCAvIDIgKyBvZmZzZXRZIC0gY2xpZW50SGVpZ2h0IC8gMikpIC8gKGNsaWVudEhlaWdodCAvIDIpLCAtMSwgMSk7XHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlID0gdm9pZCAwO1xyXG4gICAgICAgICAgICBpZiAob3B0cy5vZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHZpc2libGUgPSB1bndyYXAob3B0cy5vZmZzZXQsIGVsZW1lbnQsIGN0eCwgZG9jKSA8PSBjbGllbnRPZmZzZXR5ID8gMSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoKHVud3JhcChvcHRzLnRocmVzaG9sZCwgZWxlbWVudCwgY3R4LCBkb2MpIHx8IDApIDwgdmlzaWJsZVggKiB2aXNpYmxlWSkge1xyXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY2hhbmdlZFZpc2libGUgPSBjdHgudmlzaWJsZSAhPT0gdmlzaWJsZTtcclxuICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBjdHguX2NoYW5nZWQgfHxcclxuICAgICAgICAgICAgICAgIGNoYW5nZWRWaXNpYmxlIHx8XHJcbiAgICAgICAgICAgICAgICBjdHgudmlzaWJsZVggIT09IHZpc2libGVYIHx8XHJcbiAgICAgICAgICAgICAgICBjdHgudmlzaWJsZVkgIT09IHZpc2libGVZIHx8XHJcbiAgICAgICAgICAgICAgICBjdHguaW5kZXggIT09IGluZGV4XzEgfHxcclxuICAgICAgICAgICAgICAgIGN0eC5lbGVtZW50SGVpZ2h0ICE9PSBlbGVtZW50SGVpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICBjdHguZWxlbWVudFdpZHRoICE9PSBlbGVtZW50V2lkdGggfHxcclxuICAgICAgICAgICAgICAgIGN0eC5vZmZzZXRYICE9PSBvZmZzZXRYIHx8XHJcbiAgICAgICAgICAgICAgICBjdHgub2Zmc2V0WSAhPT0gb2Zmc2V0WSB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LmludGVyc2VjdFggIT09IGN0eC5pbnRlcnNlY3RYIHx8XHJcbiAgICAgICAgICAgICAgICBjdHguaW50ZXJzZWN0WSAhPT0gY3R4LmludGVyc2VjdFkgfHxcclxuICAgICAgICAgICAgICAgIGN0eC52aWV3cG9ydFggIT09IHZpZXdwb3J0WCB8fFxyXG4gICAgICAgICAgICAgICAgY3R4LnZpZXdwb3J0WSAhPT0gdmlld3BvcnRZO1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGN0eC5fY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdHguX3Zpc2libGVDaGFuZ2VkID0gY2hhbmdlZFZpc2libGU7XHJcbiAgICAgICAgICAgICAgICBjdHgudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgICAgICAgICAgICAgICBjdHguZWxlbWVudEhlaWdodCA9IGVsZW1lbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjdHguZWxlbWVudFdpZHRoID0gZWxlbWVudFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgY3R4LmluZGV4ID0gaW5kZXhfMTtcclxuICAgICAgICAgICAgICAgIGN0eC5vZmZzZXRYID0gb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgIGN0eC5vZmZzZXRZID0gb2Zmc2V0WTtcclxuICAgICAgICAgICAgICAgIGN0eC52aXNpYmxlWCA9IHZpc2libGVYO1xyXG4gICAgICAgICAgICAgICAgY3R4LnZpc2libGVZID0gdmlzaWJsZVk7XHJcbiAgICAgICAgICAgICAgICBjdHguaW50ZXJzZWN0WCA9IGludGVyc2VjdFg7XHJcbiAgICAgICAgICAgICAgICBjdHguaW50ZXJzZWN0WSA9IGludGVyc2VjdFk7XHJcbiAgICAgICAgICAgICAgICBjdHgudmlld3BvcnRYID0gdmlld3BvcnRYO1xyXG4gICAgICAgICAgICAgICAgY3R4LnZpZXdwb3J0WSA9IHZpZXdwb3J0WTtcclxuICAgICAgICAgICAgICAgIGN0eC52aXNpYmxlID0gdmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXN1YiAmJiAocm9vdENoYW5nZWQgfHwgY2hpbGRDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgICBzdWIgPSBzdWJzY3JpYmUocmVuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgbWF5YmVVbnN1YnNjcmliZSgpO1xyXG4gICAgICAgIC8vIFVwZGF0ZSByb290IGF0dHJpYnV0ZXMgaWYgdGhleSBoYXZlIGNoYW5nZWQuXHJcbiAgICAgICAgaWYgKHJvb3RDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHJvb3RDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldEF0dHJzKGRvYywge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRGlyWDogc2Nyb2xsaW5nRWxlbWVudENvbnRleHQuc2Nyb2xsRGlyWCxcclxuICAgICAgICAgICAgICAgIHNjcm9sbERpclk6IHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LnNjcm9sbERpcllcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHByb3BzKGRvYywgc2Nyb2xsaW5nRWxlbWVudENvbnRleHQpO1xyXG4gICAgICAgICAgICBvblNjcm9sbChkb2MsIHNjcm9sbGluZ0VsZW1lbnRDb250ZXh0LCBlbGVtZW50Q29udGV4dExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGVuID0gZWxlbWVudENvbnRleHRMaXN0Lmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciB4ID0gbGVuIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgdmFyIGN0eCA9IGVsZW1lbnRDb250ZXh0TGlzdFt4XTtcclxuICAgICAgICAgICAgdmFyIGVsID0gY3R4LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciB2aXNpYmxlID0gY3R4LnZpc2libGU7XHJcbiAgICAgICAgICAgIHZhciBqdXN0T25jZSA9IGVsLmhhc0F0dHJpYnV0ZSgnc2Nyb2xsb3V0LW9uY2UnKSB8fCBmYWxzZTsgLy8gT25jZVxyXG4gICAgICAgICAgICBpZiAoY3R4Ll9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByb3BzKGVsLCBjdHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjdHguX3Zpc2libGVDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRBdHRycyhlbCwgeyBzY3JvbGw6IHZpc2libGUgPyAnaW4nIDogJ291dCcgfSk7XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZShlbCwgY3R4LCBkb2MpO1xyXG4gICAgICAgICAgICAgICAgKHZpc2libGUgPyBvblNob3duIDogb25IaWRkZW4pKGVsLCBjdHgsIGRvYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBzaG93biBtdWx0aXBsZSB0aW1lcywga2VlcCBpdCBpbiB0aGUgbGlzdFxyXG4gICAgICAgICAgICBpZiAodmlzaWJsZSAmJiAob3B0cy5vbmNlIHx8IGp1c3RPbmNlKSkgeyAvLyBvciBpZiB0aGlzIGVsZW1lbnQganVzdCBkaXNwbGF5IGl0IG9uY2VcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRDb250ZXh0TGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBtYXliZVVuc3Vic2NyaWJlKCkge1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgc3ViKCk7XHJcbiAgICAgICAgICAgIHN1YiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSdW4gaW5pdGlhbGl6ZSBpbmRleC5cclxuICAgIGluZGV4KCk7XHJcbiAgICB1cGRhdGUoKTtcclxuICAgIHJlbmRlcigpO1xyXG4gICAgLy8gQ29sbGFwc2VzIHNlcXVlbnRpYWwgdXBkYXRlcyBpbnRvIGEgc2luZ2xlIHVwZGF0ZS5cclxuICAgIHZhciB1cGRhdGVUYXNrSWQgPSAwO1xyXG4gICAgdmFyIG9uVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHVwZGF0ZVRhc2tJZCA9IHVwZGF0ZVRhc2tJZCB8fCBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXBkYXRlVGFza0lkID0gMDtcclxuICAgICAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9O1xyXG4gICAgLy8gSG9vayB1cCBkb2N1bWVudCBsaXN0ZW5lcnMgdG8gYXV0b21hdGljYWxseSBkZXRlY3QgY2hhbmdlcy5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblVwZGF0ZSk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25VcGRhdGUpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbiAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbWF5YmVVbnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25VcGRhdGUpO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25VcGRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYWluO1xuIiwiLyohXG5XYXlwb2ludHMgLSA0LjAuMVxuQ29weXJpZ2h0IMKpIDIwMTEtMjAxNiBDYWxlYiBUcm91Z2h0b25cbkxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbmh0dHBzOi8vZ2l0aHViLmNvbS9pbWFrZXdlYnRoaW5ncy93YXlwb2ludHMvYmxvYi9tYXN0ZXIvbGljZW5zZXMudHh0XG4qL1xuIWZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChvKXtpZighbyl0aHJvdyBuZXcgRXJyb3IoXCJObyBvcHRpb25zIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTtpZighby5lbGVtZW50KXRocm93IG5ldyBFcnJvcihcIk5vIGVsZW1lbnQgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTtpZighby5oYW5kbGVyKXRocm93IG5ldyBFcnJvcihcIk5vIGhhbmRsZXIgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvclwiKTt0aGlzLmtleT1cIndheXBvaW50LVwiK2UsdGhpcy5vcHRpb25zPXQuQWRhcHRlci5leHRlbmQoe30sdC5kZWZhdWx0cyxvKSx0aGlzLmVsZW1lbnQ9dGhpcy5vcHRpb25zLmVsZW1lbnQsdGhpcy5hZGFwdGVyPW5ldyB0LkFkYXB0ZXIodGhpcy5lbGVtZW50KSx0aGlzLmNhbGxiYWNrPW8uaGFuZGxlcix0aGlzLmF4aXM9dGhpcy5vcHRpb25zLmhvcml6b250YWw/XCJob3Jpem9udGFsXCI6XCJ2ZXJ0aWNhbFwiLHRoaXMuZW5hYmxlZD10aGlzLm9wdGlvbnMuZW5hYmxlZCx0aGlzLnRyaWdnZXJQb2ludD1udWxsLHRoaXMuZ3JvdXA9dC5Hcm91cC5maW5kT3JDcmVhdGUoe25hbWU6dGhpcy5vcHRpb25zLmdyb3VwLGF4aXM6dGhpcy5heGlzfSksdGhpcy5jb250ZXh0PXQuQ29udGV4dC5maW5kT3JDcmVhdGVCeUVsZW1lbnQodGhpcy5vcHRpb25zLmNvbnRleHQpLHQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XSYmKHRoaXMub3B0aW9ucy5vZmZzZXQ9dC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdKSx0aGlzLmdyb3VwLmFkZCh0aGlzKSx0aGlzLmNvbnRleHQuYWRkKHRoaXMpLGlbdGhpcy5rZXldPXRoaXMsZSs9MX12YXIgZT0wLGk9e307dC5wcm90b3R5cGUucXVldWVUcmlnZ2VyPWZ1bmN0aW9uKHQpe3RoaXMuZ3JvdXAucXVldWVUcmlnZ2VyKHRoaXMsdCl9LHQucHJvdG90eXBlLnRyaWdnZXI9ZnVuY3Rpb24odCl7dGhpcy5lbmFibGVkJiZ0aGlzLmNhbGxiYWNrJiZ0aGlzLmNhbGxiYWNrLmFwcGx5KHRoaXMsdCl9LHQucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmNvbnRleHQucmVtb3ZlKHRoaXMpLHRoaXMuZ3JvdXAucmVtb3ZlKHRoaXMpLGRlbGV0ZSBpW3RoaXMua2V5XX0sdC5wcm90b3R5cGUuZGlzYWJsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuYWJsZWQ9ITEsdGhpc30sdC5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5yZWZyZXNoKCksdGhpcy5lbmFibGVkPSEwLHRoaXN9LHQucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ncm91cC5uZXh0KHRoaXMpfSx0LnByb3RvdHlwZS5wcmV2aW91cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdyb3VwLnByZXZpb3VzKHRoaXMpfSx0Lmludm9rZUFsbD1mdW5jdGlvbih0KXt2YXIgZT1bXTtmb3IodmFyIG8gaW4gaSllLnB1c2goaVtvXSk7Zm9yKHZhciBuPTAscj1lLmxlbmd0aDtyPm47bisrKWVbbl1bdF0oKX0sdC5kZXN0cm95QWxsPWZ1bmN0aW9uKCl7dC5pbnZva2VBbGwoXCJkZXN0cm95XCIpfSx0LmRpc2FibGVBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImRpc2FibGVcIil9LHQuZW5hYmxlQWxsPWZ1bmN0aW9uKCl7dC5Db250ZXh0LnJlZnJlc2hBbGwoKTtmb3IodmFyIGUgaW4gaSlpW2VdLmVuYWJsZWQ9ITA7cmV0dXJuIHRoaXN9LHQucmVmcmVzaEFsbD1mdW5jdGlvbigpe3QuQ29udGV4dC5yZWZyZXNoQWxsKCl9LHQudmlld3BvcnRIZWlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fSx0LnZpZXdwb3J0V2lkdGg9ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofSx0LmFkYXB0ZXJzPVtdLHQuZGVmYXVsdHM9e2NvbnRleHQ6d2luZG93LGNvbnRpbnVvdXM6ITAsZW5hYmxlZDohMCxncm91cDpcImRlZmF1bHRcIixob3Jpem9udGFsOiExLG9mZnNldDowfSx0Lm9mZnNldEFsaWFzZXM9e1wiYm90dG9tLWluLXZpZXdcIjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQuaW5uZXJIZWlnaHQoKS10aGlzLmFkYXB0ZXIub3V0ZXJIZWlnaHQoKX0sXCJyaWdodC1pbi12aWV3XCI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LmlubmVyV2lkdGgoKS10aGlzLmFkYXB0ZXIub3V0ZXJXaWR0aCgpfX0sd2luZG93LldheXBvaW50PXR9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3dpbmRvdy5zZXRUaW1lb3V0KHQsMWUzLzYwKX1mdW5jdGlvbiBlKHQpe3RoaXMuZWxlbWVudD10LHRoaXMuQWRhcHRlcj1uLkFkYXB0ZXIsdGhpcy5hZGFwdGVyPW5ldyB0aGlzLkFkYXB0ZXIodCksdGhpcy5rZXk9XCJ3YXlwb2ludC1jb250ZXh0LVwiK2ksdGhpcy5kaWRTY3JvbGw9ITEsdGhpcy5kaWRSZXNpemU9ITEsdGhpcy5vbGRTY3JvbGw9e3g6dGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSx5OnRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKX0sdGhpcy53YXlwb2ludHM9e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LHQud2F5cG9pbnRDb250ZXh0S2V5PXRoaXMua2V5LG9bdC53YXlwb2ludENvbnRleHRLZXldPXRoaXMsaSs9MSxuLndpbmRvd0NvbnRleHR8fChuLndpbmRvd0NvbnRleHQ9ITAsbi53aW5kb3dDb250ZXh0PW5ldyBlKHdpbmRvdykpLHRoaXMuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcigpLHRoaXMuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcigpfXZhciBpPTAsbz17fSxuPXdpbmRvdy5XYXlwb2ludCxyPXdpbmRvdy5vbmxvYWQ7ZS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQub3B0aW9ucy5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIjt0aGlzLndheXBvaW50c1tlXVt0LmtleV09dCx0aGlzLnJlZnJlc2goKX0sZS5wcm90b3R5cGUuY2hlY2tFbXB0eT1mdW5jdGlvbigpe3ZhciB0PXRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLmhvcml6b250YWwpLGU9dGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMudmVydGljYWwpLGk9dGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93O3QmJmUmJiFpJiYodGhpcy5hZGFwdGVyLm9mZihcIi53YXlwb2ludHNcIiksZGVsZXRlIG9bdGhpcy5rZXldKX0sZS5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtlLmhhbmRsZVJlc2l6ZSgpLGUuZGlkUmVzaXplPSExfXZhciBlPXRoaXM7dGhpcy5hZGFwdGVyLm9uKFwicmVzaXplLndheXBvaW50c1wiLGZ1bmN0aW9uKCl7ZS5kaWRSZXNpemV8fChlLmRpZFJlc2l6ZT0hMCxuLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0KSl9KX0sZS5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtlLmhhbmRsZVNjcm9sbCgpLGUuZGlkU2Nyb2xsPSExfXZhciBlPXRoaXM7dGhpcy5hZGFwdGVyLm9uKFwic2Nyb2xsLndheXBvaW50c1wiLGZ1bmN0aW9uKCl7KCFlLmRpZFNjcm9sbHx8bi5pc1RvdWNoKSYmKGUuZGlkU2Nyb2xsPSEwLG4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHQpKX0pfSxlLnByb3RvdHlwZS5oYW5kbGVSZXNpemU9ZnVuY3Rpb24oKXtuLkNvbnRleHQucmVmcmVzaEFsbCgpfSxlLnByb3RvdHlwZS5oYW5kbGVTY3JvbGw9ZnVuY3Rpb24oKXt2YXIgdD17fSxlPXtob3Jpem9udGFsOntuZXdTY3JvbGw6dGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueCxmb3J3YXJkOlwicmlnaHRcIixiYWNrd2FyZDpcImxlZnRcIn0sdmVydGljYWw6e25ld1Njcm9sbDp0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKCksb2xkU2Nyb2xsOnRoaXMub2xkU2Nyb2xsLnksZm9yd2FyZDpcImRvd25cIixiYWNrd2FyZDpcInVwXCJ9fTtmb3IodmFyIGkgaW4gZSl7dmFyIG89ZVtpXSxuPW8ubmV3U2Nyb2xsPm8ub2xkU2Nyb2xsLHI9bj9vLmZvcndhcmQ6by5iYWNrd2FyZDtmb3IodmFyIHMgaW4gdGhpcy53YXlwb2ludHNbaV0pe3ZhciBhPXRoaXMud2F5cG9pbnRzW2ldW3NdO2lmKG51bGwhPT1hLnRyaWdnZXJQb2ludCl7dmFyIGw9by5vbGRTY3JvbGw8YS50cmlnZ2VyUG9pbnQsaD1vLm5ld1Njcm9sbD49YS50cmlnZ2VyUG9pbnQscD1sJiZoLHU9IWwmJiFoOyhwfHx1KSYmKGEucXVldWVUcmlnZ2VyKHIpLHRbYS5ncm91cC5pZF09YS5ncm91cCl9fX1mb3IodmFyIGMgaW4gdCl0W2NdLmZsdXNoVHJpZ2dlcnMoKTt0aGlzLm9sZFNjcm9sbD17eDplLmhvcml6b250YWwubmV3U2Nyb2xsLHk6ZS52ZXJ0aWNhbC5uZXdTY3JvbGx9fSxlLnByb3RvdHlwZS5pbm5lckhlaWdodD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3c/bi52aWV3cG9ydEhlaWdodCgpOnRoaXMuYWRhcHRlci5pbm5lckhlaWdodCgpfSxlLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7ZGVsZXRlIHRoaXMud2F5cG9pbnRzW3QuYXhpc11bdC5rZXldLHRoaXMuY2hlY2tFbXB0eSgpfSxlLnByb3RvdHlwZS5pbm5lcldpZHRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdz9uLnZpZXdwb3J0V2lkdGgoKTp0aGlzLmFkYXB0ZXIuaW5uZXJXaWR0aCgpfSxlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIHQ9W107Zm9yKHZhciBlIGluIHRoaXMud2F5cG9pbnRzKWZvcih2YXIgaSBpbiB0aGlzLndheXBvaW50c1tlXSl0LnB1c2godGhpcy53YXlwb2ludHNbZV1baV0pO2Zvcih2YXIgbz0wLG49dC5sZW5ndGg7bj5vO28rKyl0W29dLmRlc3Ryb3koKX0sZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93LGk9ZT92b2lkIDA6dGhpcy5hZGFwdGVyLm9mZnNldCgpLG89e307dGhpcy5oYW5kbGVTY3JvbGwoKSx0PXtob3Jpem9udGFsOntjb250ZXh0T2Zmc2V0OmU/MDppLmxlZnQsY29udGV4dFNjcm9sbDplPzA6dGhpcy5vbGRTY3JvbGwueCxjb250ZXh0RGltZW5zaW9uOnRoaXMuaW5uZXJXaWR0aCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC54LGZvcndhcmQ6XCJyaWdodFwiLGJhY2t3YXJkOlwibGVmdFwiLG9mZnNldFByb3A6XCJsZWZ0XCJ9LHZlcnRpY2FsOntjb250ZXh0T2Zmc2V0OmU/MDppLnRvcCxjb250ZXh0U2Nyb2xsOmU/MDp0aGlzLm9sZFNjcm9sbC55LGNvbnRleHREaW1lbnNpb246dGhpcy5pbm5lckhlaWdodCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC55LGZvcndhcmQ6XCJkb3duXCIsYmFja3dhcmQ6XCJ1cFwiLG9mZnNldFByb3A6XCJ0b3BcIn19O2Zvcih2YXIgciBpbiB0KXt2YXIgcz10W3JdO2Zvcih2YXIgYSBpbiB0aGlzLndheXBvaW50c1tyXSl7dmFyIGwsaCxwLHUsYyxkPXRoaXMud2F5cG9pbnRzW3JdW2FdLGY9ZC5vcHRpb25zLm9mZnNldCx3PWQudHJpZ2dlclBvaW50LHk9MCxnPW51bGw9PXc7ZC5lbGVtZW50IT09ZC5lbGVtZW50LndpbmRvdyYmKHk9ZC5hZGFwdGVyLm9mZnNldCgpW3Mub2Zmc2V0UHJvcF0pLFwiZnVuY3Rpb25cIj09dHlwZW9mIGY/Zj1mLmFwcGx5KGQpOlwic3RyaW5nXCI9PXR5cGVvZiBmJiYoZj1wYXJzZUZsb2F0KGYpLGQub3B0aW9ucy5vZmZzZXQuaW5kZXhPZihcIiVcIik+LTEmJihmPU1hdGguY2VpbChzLmNvbnRleHREaW1lbnNpb24qZi8xMDApKSksbD1zLmNvbnRleHRTY3JvbGwtcy5jb250ZXh0T2Zmc2V0LGQudHJpZ2dlclBvaW50PU1hdGguZmxvb3IoeStsLWYpLGg9dzxzLm9sZFNjcm9sbCxwPWQudHJpZ2dlclBvaW50Pj1zLm9sZFNjcm9sbCx1PWgmJnAsYz0haCYmIXAsIWcmJnU/KGQucXVldWVUcmlnZ2VyKHMuYmFja3dhcmQpLG9bZC5ncm91cC5pZF09ZC5ncm91cCk6IWcmJmM/KGQucXVldWVUcmlnZ2VyKHMuZm9yd2FyZCksb1tkLmdyb3VwLmlkXT1kLmdyb3VwKTpnJiZzLm9sZFNjcm9sbD49ZC50cmlnZ2VyUG9pbnQmJihkLnF1ZXVlVHJpZ2dlcihzLmZvcndhcmQpLG9bZC5ncm91cC5pZF09ZC5ncm91cCl9fXJldHVybiBuLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBvKW9bdF0uZmx1c2hUcmlnZ2VycygpfSksdGhpc30sZS5maW5kT3JDcmVhdGVCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIGUuZmluZEJ5RWxlbWVudCh0KXx8bmV3IGUodCl9LGUucmVmcmVzaEFsbD1mdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBvKW9bdF0ucmVmcmVzaCgpfSxlLmZpbmRCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIG9bdC53YXlwb2ludENvbnRleHRLZXldfSx3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7ciYmcigpLGUucmVmcmVzaEFsbCgpfSxuLnJlcXVlc3RBbmltYXRpb25GcmFtZT1mdW5jdGlvbihlKXt2YXIgaT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx0O2kuY2FsbCh3aW5kb3csZSl9LG4uQ29udGV4dD1lfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LGUpe3JldHVybiB0LnRyaWdnZXJQb2ludC1lLnRyaWdnZXJQb2ludH1mdW5jdGlvbiBlKHQsZSl7cmV0dXJuIGUudHJpZ2dlclBvaW50LXQudHJpZ2dlclBvaW50fWZ1bmN0aW9uIGkodCl7dGhpcy5uYW1lPXQubmFtZSx0aGlzLmF4aXM9dC5heGlzLHRoaXMuaWQ9dGhpcy5uYW1lK1wiLVwiK3RoaXMuYXhpcyx0aGlzLndheXBvaW50cz1bXSx0aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpLG9bdGhpcy5heGlzXVt0aGlzLm5hbWVdPXRoaXN9dmFyIG89e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LG49d2luZG93LldheXBvaW50O2kucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLndheXBvaW50cy5wdXNoKHQpfSxpLnByb3RvdHlwZS5jbGVhclRyaWdnZXJRdWV1ZXM9ZnVuY3Rpb24oKXt0aGlzLnRyaWdnZXJRdWV1ZXM9e3VwOltdLGRvd246W10sbGVmdDpbXSxyaWdodDpbXX19LGkucHJvdG90eXBlLmZsdXNoVHJpZ2dlcnM9ZnVuY3Rpb24oKXtmb3IodmFyIGkgaW4gdGhpcy50cmlnZ2VyUXVldWVzKXt2YXIgbz10aGlzLnRyaWdnZXJRdWV1ZXNbaV0sbj1cInVwXCI9PT1pfHxcImxlZnRcIj09PWk7by5zb3J0KG4/ZTp0KTtmb3IodmFyIHI9MCxzPW8ubGVuZ3RoO3M+cjtyKz0xKXt2YXIgYT1vW3JdOyhhLm9wdGlvbnMuY29udGludW91c3x8cj09PW8ubGVuZ3RoLTEpJiZhLnRyaWdnZXIoW2ldKX19dGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKX0saS5wcm90b3R5cGUubmV4dD1mdW5jdGlvbihlKXt0aGlzLndheXBvaW50cy5zb3J0KHQpO3ZhciBpPW4uQWRhcHRlci5pbkFycmF5KGUsdGhpcy53YXlwb2ludHMpLG89aT09PXRoaXMud2F5cG9pbnRzLmxlbmd0aC0xO3JldHVybiBvP251bGw6dGhpcy53YXlwb2ludHNbaSsxXX0saS5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24oZSl7dGhpcy53YXlwb2ludHMuc29ydCh0KTt2YXIgaT1uLkFkYXB0ZXIuaW5BcnJheShlLHRoaXMud2F5cG9pbnRzKTtyZXR1cm4gaT90aGlzLndheXBvaW50c1tpLTFdOm51bGx9LGkucHJvdG90eXBlLnF1ZXVlVHJpZ2dlcj1mdW5jdGlvbih0LGUpe3RoaXMudHJpZ2dlclF1ZXVlc1tlXS5wdXNoKHQpfSxpLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9bi5BZGFwdGVyLmluQXJyYXkodCx0aGlzLndheXBvaW50cyk7ZT4tMSYmdGhpcy53YXlwb2ludHMuc3BsaWNlKGUsMSl9LGkucHJvdG90eXBlLmZpcnN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzWzBdfSxpLnByb3RvdHlwZS5sYXN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzW3RoaXMud2F5cG9pbnRzLmxlbmd0aC0xXX0saS5maW5kT3JDcmVhdGU9ZnVuY3Rpb24odCl7cmV0dXJuIG9bdC5heGlzXVt0Lm5hbWVdfHxuZXcgaSh0KX0sbi5Hcm91cD1pfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt0aGlzLiRlbGVtZW50PWUodCl9dmFyIGU9d2luZG93LmpRdWVyeSxpPXdpbmRvdy5XYXlwb2ludDtlLmVhY2goW1wiaW5uZXJIZWlnaHRcIixcImlubmVyV2lkdGhcIixcIm9mZlwiLFwib2Zmc2V0XCIsXCJvblwiLFwib3V0ZXJIZWlnaHRcIixcIm91dGVyV2lkdGhcIixcInNjcm9sbExlZnRcIixcInNjcm9sbFRvcFwiXSxmdW5jdGlvbihlLGkpe3QucHJvdG90eXBlW2ldPWZ1bmN0aW9uKCl7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy4kZWxlbWVudFtpXS5hcHBseSh0aGlzLiRlbGVtZW50LHQpfX0pLGUuZWFjaChbXCJleHRlbmRcIixcImluQXJyYXlcIixcImlzRW1wdHlPYmplY3RcIl0sZnVuY3Rpb24oaSxvKXt0W29dPWVbb119KSxpLmFkYXB0ZXJzLnB1c2goe25hbWU6XCJqcXVlcnlcIixBZGFwdGVyOnR9KSxpLkFkYXB0ZXI9dH0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGk9W10sbz1hcmd1bWVudHNbMF07cmV0dXJuIHQuaXNGdW5jdGlvbihhcmd1bWVudHNbMF0pJiYobz10LmV4dGVuZCh7fSxhcmd1bWVudHNbMV0pLG8uaGFuZGxlcj1hcmd1bWVudHNbMF0pLHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuPXQuZXh0ZW5kKHt9LG8se2VsZW1lbnQ6dGhpc30pO1wic3RyaW5nXCI9PXR5cGVvZiBuLmNvbnRleHQmJihuLmNvbnRleHQ9dCh0aGlzKS5jbG9zZXN0KG4uY29udGV4dClbMF0pLGkucHVzaChuZXcgZShuKSl9KSxpfX12YXIgZT13aW5kb3cuV2F5cG9pbnQ7d2luZG93LmpRdWVyeSYmKHdpbmRvdy5qUXVlcnkuZm4ud2F5cG9pbnQ9dCh3aW5kb3cualF1ZXJ5KSksd2luZG93LlplcHRvJiYod2luZG93LlplcHRvLmZuLndheXBvaW50PXQod2luZG93LlplcHRvKSl9KCk7XG5cbiIsIi8vIE11bHRpcGxlIENhcm91c2VsIHNsaWRlc1xyXG4kKCcjY2Fyb3VzZWwtbXVsdGktaW1hZ2UnKS5vbignc2xpZGUuYnMuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gIC8qXHJcbiAgICAgICAgQ0MgMi4wIExpY2Vuc2UgSWF0ZWsgTExDIDIwMTggLSBBdHRyaWJ1dGlvbiByZXF1aXJlZFxyXG4gICAgKi9cclxuICB2YXIgJGUgPSAkKGUucmVsYXRlZFRhcmdldCk7XHJcbiAgdmFyIGlkeCA9ICRlLmluZGV4KCk7XHJcbiAgdmFyIGl0ZW1zUGVyU2xpZGUgPSA0O1xyXG4gIHZhciB0b3RhbEl0ZW1zID0gJCgnI2Nhcm91c2VsLW11bHRpLWltYWdlIC5jYXJvdXNlbC1pdGVtJykubGVuZ3RoO1xyXG5cclxuICBpZiAoaWR4ID49IHRvdGFsSXRlbXMgLSAoaXRlbXNQZXJTbGlkZSAtIDEpKSB7XHJcbiAgICB2YXIgaXQgPSBpdGVtc1BlclNsaWRlIC0gKHRvdGFsSXRlbXMgLSBpZHgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdDsgaSsrKSB7XHJcbiAgICAgIC8vIGFwcGVuZCBzbGlkZXMgdG8gZW5kXHJcbiAgICAgIGlmIChlLmRpcmVjdGlvbiA9PSAnbGVmdCcpIHtcclxuICAgICAgICAkKCcjY2Fyb3VzZWwtbXVsdGktaW1hZ2UgLmNhcm91c2VsLWl0ZW0nKVxyXG4gICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAuYXBwZW5kVG8oJyNjYXJvdXNlbC1tdWx0aS1pbWFnZSAuY2Fyb3VzZWwtaW5uZXInKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjY2Fyb3VzZWwtbXVsdGktaW1hZ2UgLmNhcm91c2VsLWl0ZW0nKVxyXG4gICAgICAgICAgLmVxKDApXHJcbiAgICAgICAgICAuYXBwZW5kVG8oJyNjYXJvdXNlbC1tdWx0aS1pbWFnZSAuY2Fyb3VzZWwtaW5uZXInKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiIsImNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKTtcclxuY29uc3QgbW9iaWxlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2JpbGUtbWVudScpO1xyXG5cclxuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGhhbWJ1cmdlci5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUnKTtcclxuICBtb2JpbGVNZW51LmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZScpO1xyXG59KTtcclxuIiwiLy9UaGlzIGNvZGUgaXMgdXNlZCB3aXRoIHRoZSB3YXlwb2ludHMgcGFja2FnZSB0byBjaGFuZ2UgbmF2YmFyIG9uIHNjcm9sbCBwYXN0IGJhbm5lci5cclxuLy9Ob3RlOiB3YXlwb2ludCBmdW5jdGlvbiBtdXN0IGJlIHdyYXBwZWQgaW4gY29uZGl0aW9uYWwsIG90aGVyd2lzZSBpdCB3aWxsIGludGVyZmVyZSB3aXRoIFNjcm9sbC1vdXQgcGFja2FnZVxyXG5cclxuY29uc3QganNOYXZiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmF2YmFyJyk7XHJcbmNvbnN0IG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYnKTtcclxuXHJcbmlmIChqc05hdmJhcikge1xyXG4gIGNvbnN0IHdheXBvaW50TmF2YmFyID0gbmV3IFdheXBvaW50KHtcclxuICAgIGVsZW1lbnQ6IGpzTmF2YmFyLFxyXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAvL0NoYW5nZSBuYXZiYXIgYmFja2dyb3VuZCBjb2xvciB0byBiZy1ibGFjaywgYmctd2hpdGUsIGV0Yy5cclxuICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ2JnLWJsYWNrJyk7XHJcbiAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdiZy10cmFuc3BhcmVudCcpO1xyXG5cclxuXHJcbiAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdi1saW5rJyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgaWYgKG5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ2JnLWJsYWNrJykpXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgIGVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoJ3RleHQtd2hpdGUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ2JnLXdoaXRlJykpIHtcclxuICAgICAgICBlbGVtZW50c1tpXS5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRhcmsnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvZmZzZXQ6IDIwMCxcclxuICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgU2Nyb2xsT3V0IGZyb20gJ3Njcm9sbC1vdXQnO1xyXG5pbXBvcnQgJy4uLy4uL25vZGVfbW9kdWxlcy93YXlwb2ludHMvbGliL2pxdWVyeS53YXlwb2ludHMubWluLmpzJztcclxuLy8gaW1wb3J0IGJvb3RzdHJhcCBmcm9tICdib290c3RyYXAnO1xyXG5cclxuaW1wb3J0ICcuL2hlbHBlcnMvY2Fyb3VzZWwtbXVsdGktaW1hZ2UuanMnO1xyXG5pbXBvcnQgJy4vaGVscGVycy93YXlwb2ludHNGdW5jdGlvbnMuanMnO1xyXG5pbXBvcnQgJy4vaGVscGVycy9jdXN0b21OYXZiYXIuanMnO1xyXG5cclxuLy9TZXQgdXAgU2Nyb2xsT3V0IG1vZHVsZS4gVGhpcyBtb2R1bGUgbWFrZXMgZWxlbWVudHMgYXBwZWFyIG9uIHRoZSBzY3JlZW4gd2hlbiB0aGV5IGNvbWUgaW50byB2aWV3IG9uIHNjcm9sbFxyXG5TY3JvbGxPdXQoe1xyXG4gIHRocmVzaG9sZDogMC4yLFxyXG4gIG9uY2U6IHRydWUsXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9