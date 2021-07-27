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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/navigation.js":
/*!******************************!*\
  !*** ./src/js/navigation.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
  var siteNavigation = document.getElementById('site-navigation'); // Return early if the navigation don't exist.

  if (!siteNavigation) {
    return;
  }

  var button = siteNavigation.getElementsByTagName('button')[0]; // Return early if the button don't exist.

  if ('undefined' === typeof button) {
    return;
  }

  var menu = siteNavigation.getElementsByTagName('ul')[0]; // Hide menu toggle button if menu is empty and return early.

  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }

  if (!menu.classList.contains('nav-menu')) {
    menu.classList.add('nav-menu');
  } // Toggle the .toggled class and the aria-expanded value each time the button is clicked.


  button.addEventListener('click', function () {
    siteNavigation.classList.toggle('toggled');

    if (button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
    } else {
      button.setAttribute('aria-expanded', 'true');
    }
  }); // Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.

  document.addEventListener('click', function (event) {
    var isClickInside = siteNavigation.contains(event.target);

    if (!isClickInside) {
      siteNavigation.classList.remove('toggled');
      button.setAttribute('aria-expanded', 'false');
    }
  }); // Get all the link elements within the menu.

  var links = menu.getElementsByTagName('a'); // Get all the link elements with children within the menu.

  var linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a'); // Toggle focus each time a menu link is focused or blurred.

  var _iterator = _createForOfIteratorHelper(links),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var link = _step.value;
      link.addEventListener('focus', toggleFocus, true);
      link.addEventListener('blur', toggleFocus, true);
    } // Toggle focus each time a menu link with children receive a touch event.

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(linksWithChildren),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _link = _step2.value;

      _link.addEventListener('touchstart', toggleFocus, false);
    }
    /**
     * Sets or removes .focus class on an element.
     */

  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  function toggleFocus() {
    if (event.type === 'focus' || event.type === 'blur') {
      var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

      while (!self.classList.contains('nav-menu')) {
        // On li elements toggle the class .focus.
        if ('li' === self.tagName.toLowerCase()) {
          self.classList.toggle('focus');
        }

        self = self.parentNode;
      }
    }

    if (event.type === 'touchstart') {
      var menuItem = this.parentNode;
      event.preventDefault();

      var _iterator3 = _createForOfIteratorHelper(menuItem.parentNode.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var link = _step3.value;

          if (menuItem !== link) {
            link.classList.remove('focus');
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      menuItem.classList.toggle('focus');
    }
  }
})();

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./src/js/navigation.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\bootstrap-theme\wp-content\themes\bootstrap-theme\src\js\navigation.js */"./src/js/navigation.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL25hdmlnYXRpb24uanMiXSwibmFtZXMiOlsic2l0ZU5hdmlnYXRpb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYnV0dG9uIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJtZW51Iiwic3R5bGUiLCJkaXNwbGF5IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiZXZlbnQiLCJpc0NsaWNrSW5zaWRlIiwidGFyZ2V0IiwicmVtb3ZlIiwibGlua3MiLCJsaW5rc1dpdGhDaGlsZHJlbiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaW5rIiwidG9nZ2xlRm9jdXMiLCJ0eXBlIiwic2VsZiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInBhcmVudE5vZGUiLCJtZW51SXRlbSIsInByZXZlbnREZWZhdWx0IiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxhQUFXO0FBQ1osTUFBTUEsY0FBYyxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBeUIsaUJBQXpCLENBQXZCLENBRFksQ0FHWjs7QUFDQSxNQUFLLENBQUVGLGNBQVAsRUFBd0I7QUFDdkI7QUFDQTs7QUFFRCxNQUFNRyxNQUFNLEdBQUdILGNBQWMsQ0FBQ0ksb0JBQWYsQ0FBcUMsUUFBckMsRUFBaUQsQ0FBakQsQ0FBZixDQVJZLENBVVo7O0FBQ0EsTUFBSyxnQkFBZ0IsT0FBT0QsTUFBNUIsRUFBcUM7QUFDcEM7QUFDQTs7QUFFRCxNQUFNRSxJQUFJLEdBQUdMLGNBQWMsQ0FBQ0ksb0JBQWYsQ0FBcUMsSUFBckMsRUFBNkMsQ0FBN0MsQ0FBYixDQWZZLENBaUJaOztBQUNBLE1BQUssZ0JBQWdCLE9BQU9DLElBQTVCLEVBQW1DO0FBQ2xDRixVQUFNLENBQUNHLEtBQVAsQ0FBYUMsT0FBYixHQUF1QixNQUF2QjtBQUNBO0FBQ0E7O0FBRUQsTUFBSyxDQUFFRixJQUFJLENBQUNHLFNBQUwsQ0FBZUMsUUFBZixDQUF5QixVQUF6QixDQUFQLEVBQStDO0FBQzlDSixRQUFJLENBQUNHLFNBQUwsQ0FBZUUsR0FBZixDQUFvQixVQUFwQjtBQUNBLEdBekJXLENBMkJaOzs7QUFDQVAsUUFBTSxDQUFDUSxnQkFBUCxDQUF5QixPQUF6QixFQUFrQyxZQUFXO0FBQzVDWCxrQkFBYyxDQUFDUSxTQUFmLENBQXlCSSxNQUF6QixDQUFpQyxTQUFqQzs7QUFFQSxRQUFLVCxNQUFNLENBQUNVLFlBQVAsQ0FBcUIsZUFBckIsTUFBMkMsTUFBaEQsRUFBeUQ7QUFDeERWLFlBQU0sQ0FBQ1csWUFBUCxDQUFxQixlQUFyQixFQUFzQyxPQUF0QztBQUNBLEtBRkQsTUFFTztBQUNOWCxZQUFNLENBQUNXLFlBQVAsQ0FBcUIsZUFBckIsRUFBc0MsTUFBdEM7QUFDQTtBQUNELEdBUkQsRUE1QlksQ0FzQ1o7O0FBQ0FiLFVBQVEsQ0FBQ1UsZ0JBQVQsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBVUksS0FBVixFQUFrQjtBQUNyRCxRQUFNQyxhQUFhLEdBQUdoQixjQUFjLENBQUNTLFFBQWYsQ0FBeUJNLEtBQUssQ0FBQ0UsTUFBL0IsQ0FBdEI7O0FBRUEsUUFBSyxDQUFFRCxhQUFQLEVBQXVCO0FBQ3RCaEIsb0JBQWMsQ0FBQ1EsU0FBZixDQUF5QlUsTUFBekIsQ0FBaUMsU0FBakM7QUFDQWYsWUFBTSxDQUFDVyxZQUFQLENBQXFCLGVBQXJCLEVBQXNDLE9BQXRDO0FBQ0E7QUFDRCxHQVBELEVBdkNZLENBZ0RaOztBQUNBLE1BQU1LLEtBQUssR0FBR2QsSUFBSSxDQUFDRCxvQkFBTCxDQUEyQixHQUEzQixDQUFkLENBakRZLENBbURaOztBQUNBLE1BQU1nQixpQkFBaUIsR0FBR2YsSUFBSSxDQUFDZ0IsZ0JBQUwsQ0FBdUIsMERBQXZCLENBQTFCLENBcERZLENBc0RaOztBQXREWSw2Q0F1RFFGLEtBdkRSO0FBQUE7O0FBQUE7QUF1RFosd0RBQTRCO0FBQUEsVUFBaEJHLElBQWdCO0FBQzNCQSxVQUFJLENBQUNYLGdCQUFMLENBQXVCLE9BQXZCLEVBQWdDWSxXQUFoQyxFQUE2QyxJQUE3QztBQUNBRCxVQUFJLENBQUNYLGdCQUFMLENBQXVCLE1BQXZCLEVBQStCWSxXQUEvQixFQUE0QyxJQUE1QztBQUNBLEtBMURXLENBNERaOztBQTVEWTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQTZEUUgsaUJBN0RSO0FBQUE7O0FBQUE7QUE2RFosMkRBQXdDO0FBQUEsVUFBNUJFLEtBQTRCOztBQUN2Q0EsV0FBSSxDQUFDWCxnQkFBTCxDQUF1QixZQUF2QixFQUFxQ1ksV0FBckMsRUFBa0QsS0FBbEQ7QUFDQTtBQUVEO0FBQ0Q7QUFDQTs7QUFuRWE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFvRVosV0FBU0EsV0FBVCxHQUF1QjtBQUN0QixRQUFLUixLQUFLLENBQUNTLElBQU4sS0FBZSxPQUFmLElBQTBCVCxLQUFLLENBQUNTLElBQU4sS0FBZSxNQUE5QyxFQUF1RDtBQUN0RCxVQUFJQyxJQUFJLEdBQUcsSUFBWCxDQURzRCxDQUV0RDs7QUFDQSxhQUFRLENBQUVBLElBQUksQ0FBQ2pCLFNBQUwsQ0FBZUMsUUFBZixDQUF5QixVQUF6QixDQUFWLEVBQWtEO0FBQ2pEO0FBQ0EsWUFBSyxTQUFTZ0IsSUFBSSxDQUFDQyxPQUFMLENBQWFDLFdBQWIsRUFBZCxFQUEyQztBQUMxQ0YsY0FBSSxDQUFDakIsU0FBTCxDQUFlSSxNQUFmLENBQXVCLE9BQXZCO0FBQ0E7O0FBQ0RhLFlBQUksR0FBR0EsSUFBSSxDQUFDRyxVQUFaO0FBQ0E7QUFDRDs7QUFFRCxRQUFLYixLQUFLLENBQUNTLElBQU4sS0FBZSxZQUFwQixFQUFtQztBQUNsQyxVQUFNSyxRQUFRLEdBQUcsS0FBS0QsVUFBdEI7QUFDQWIsV0FBSyxDQUFDZSxjQUFOOztBQUZrQyxrREFHZEQsUUFBUSxDQUFDRCxVQUFULENBQW9CRyxRQUhOO0FBQUE7O0FBQUE7QUFHbEMsK0RBQW1EO0FBQUEsY0FBdkNULElBQXVDOztBQUNsRCxjQUFLTyxRQUFRLEtBQUtQLElBQWxCLEVBQXlCO0FBQ3hCQSxnQkFBSSxDQUFDZCxTQUFMLENBQWVVLE1BQWYsQ0FBdUIsT0FBdkI7QUFDQTtBQUNEO0FBUGlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUWxDVyxjQUFRLENBQUNyQixTQUFULENBQW1CSSxNQUFuQixDQUEyQixPQUEzQjtBQUNBO0FBQ0Q7QUFDRCxDQTVGQyxHQUFGLEMiLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIi8qKlxuICogRmlsZSBuYXZpZ2F0aW9uLmpzLlxuICpcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XG4gKiBuYXZpZ2F0aW9uIHN1cHBvcnQgZm9yIGRyb3Bkb3duIG1lbnVzLlxuICovXG4oIGZ1bmN0aW9uKCkge1xuXHRjb25zdCBzaXRlTmF2aWdhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnc2l0ZS1uYXZpZ2F0aW9uJyApO1xuXG5cdC8vIFJldHVybiBlYXJseSBpZiB0aGUgbmF2aWdhdGlvbiBkb24ndCBleGlzdC5cblx0aWYgKCAhIHNpdGVOYXZpZ2F0aW9uICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGJ1dHRvbiA9IHNpdGVOYXZpZ2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYnV0dG9uJyApWyAwIF07XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGlmIHRoZSBidXR0b24gZG9uJ3QgZXhpc3QuXG5cdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBidXR0b24gKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgbWVudSA9IHNpdGVOYXZpZ2F0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKCAndWwnIClbIDAgXTtcblxuXHQvLyBIaWRlIG1lbnUgdG9nZ2xlIGJ1dHRvbiBpZiBtZW51IGlzIGVtcHR5IGFuZCByZXR1cm4gZWFybHkuXG5cdGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBtZW51ICkge1xuXHRcdGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICggISBtZW51LmNsYXNzTGlzdC5jb250YWlucyggJ25hdi1tZW51JyApICkge1xuXHRcdG1lbnUuY2xhc3NMaXN0LmFkZCggJ25hdi1tZW51JyApO1xuXHR9XG5cblx0Ly8gVG9nZ2xlIHRoZSAudG9nZ2xlZCBjbGFzcyBhbmQgdGhlIGFyaWEtZXhwYW5kZWQgdmFsdWUgZWFjaCB0aW1lIHRoZSBidXR0b24gaXMgY2xpY2tlZC5cblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHNpdGVOYXZpZ2F0aW9uLmNsYXNzTGlzdC50b2dnbGUoICd0b2dnbGVkJyApO1xuXG5cdFx0aWYgKCBidXR0b24uZ2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcgKSA9PT0gJ3RydWUnICkge1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnICk7XG5cdFx0fVxuXHR9ICk7XG5cblx0Ly8gUmVtb3ZlIHRoZSAudG9nZ2xlZCBjbGFzcyBhbmQgc2V0IGFyaWEtZXhwYW5kZWQgdG8gZmFsc2Ugd2hlbiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbmF2aWdhdGlvbi5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdGNvbnN0IGlzQ2xpY2tJbnNpZGUgPSBzaXRlTmF2aWdhdGlvbi5jb250YWlucyggZXZlbnQudGFyZ2V0ICk7XG5cblx0XHRpZiAoICEgaXNDbGlja0luc2lkZSApIHtcblx0XHRcdHNpdGVOYXZpZ2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoICd0b2dnbGVkJyApO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XG5cdFx0fVxuXHR9ICk7XG5cblx0Ly8gR2V0IGFsbCB0aGUgbGluayBlbGVtZW50cyB3aXRoaW4gdGhlIG1lbnUuXG5cdGNvbnN0IGxpbmtzID0gbWVudS5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2EnICk7XG5cblx0Ly8gR2V0IGFsbCB0aGUgbGluayBlbGVtZW50cyB3aXRoIGNoaWxkcmVuIHdpdGhpbiB0aGUgbWVudS5cblx0Y29uc3QgbGlua3NXaXRoQ2hpbGRyZW4gPSBtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoICcubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEsIC5wYWdlX2l0ZW1faGFzX2NoaWxkcmVuID4gYScgKTtcblxuXHQvLyBUb2dnbGUgZm9jdXMgZWFjaCB0aW1lIGEgbWVudSBsaW5rIGlzIGZvY3VzZWQgb3IgYmx1cnJlZC5cblx0Zm9yICggY29uc3QgbGluayBvZiBsaW5rcyApIHtcblx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XG5cdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XG5cdH1cblxuXHQvLyBUb2dnbGUgZm9jdXMgZWFjaCB0aW1lIGEgbWVudSBsaW5rIHdpdGggY2hpbGRyZW4gcmVjZWl2ZSBhIHRvdWNoIGV2ZW50LlxuXHRmb3IgKCBjb25zdCBsaW5rIG9mIGxpbmtzV2l0aENoaWxkcmVuICkge1xuXHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b2dnbGVGb2N1cywgZmFsc2UgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIG9yIHJlbW92ZXMgLmZvY3VzIGNsYXNzIG9uIGFuIGVsZW1lbnQuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b2dnbGVGb2N1cygpIHtcblx0XHRpZiAoIGV2ZW50LnR5cGUgPT09ICdmb2N1cycgfHwgZXZlbnQudHlwZSA9PT0gJ2JsdXInICkge1xuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdFx0Ly8gTW92ZSB1cCB0aHJvdWdoIHRoZSBhbmNlc3RvcnMgb2YgdGhlIGN1cnJlbnQgbGluayB1bnRpbCB3ZSBoaXQgLm5hdi1tZW51LlxuXHRcdFx0d2hpbGUgKCAhIHNlbGYuY2xhc3NMaXN0LmNvbnRhaW5zKCAnbmF2LW1lbnUnICkgKSB7XG5cdFx0XHRcdC8vIE9uIGxpIGVsZW1lbnRzIHRvZ2dsZSB0aGUgY2xhc3MgLmZvY3VzLlxuXHRcdFx0XHRpZiAoICdsaScgPT09IHNlbGYudGFnTmFtZS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRcdHNlbGYuY2xhc3NMaXN0LnRvZ2dsZSggJ2ZvY3VzJyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYgPSBzZWxmLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBldmVudC50eXBlID09PSAndG91Y2hzdGFydCcgKSB7XG5cdFx0XHRjb25zdCBtZW51SXRlbSA9IHRoaXMucGFyZW50Tm9kZTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRmb3IgKCBjb25zdCBsaW5rIG9mIG1lbnVJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW4gKSB7XG5cdFx0XHRcdGlmICggbWVudUl0ZW0gIT09IGxpbmsgKSB7XG5cdFx0XHRcdFx0bGluay5jbGFzc0xpc3QucmVtb3ZlKCAnZm9jdXMnICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbnVJdGVtLmNsYXNzTGlzdC50b2dnbGUoICdmb2N1cycgKTtcblx0XHR9XG5cdH1cbn0oKSApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==