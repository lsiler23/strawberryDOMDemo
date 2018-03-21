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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const funcs = [];

function $l(selector) {

  if (typeof selector === 'function') {
    if (document.readyState === 'complete') {
      selector();
    } else {
      funcs.push(selector);
    }
  } else {
    const nodeMatches = document.querySelectorAll(selector);
    const arrayMatches = [];

    for (let i = 0; i < nodeMatches.length; i++) {
      arrayMatches.push(nodeMatches[i]);
    }

    if (nodeMatches[0] instanceof HTMLElement) {
      return new DOMNodeCollection(arrayMatches);
    } else {
      return arrayMatches;
    }
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  funcs.forEach(el => el());
});


$l.extend = function (...args) {
  const result = args[0];

  args.slice(1).forEach((arg) => {
    Object.keys(arg).forEach((k) => {
      result[k] = arg[k];
    });
  });

  return result;
};


$l.ajax = (options) => {
  const defaults = {
    method: 'GET',
    url: '',
    success: () => {},
    error: () => {},
    data: {},
    dataType: 'jsonp',
    crossDomain: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    headers: {'Access-Control-Allow-Origin' : '*'}
  };

  let realOptions;

  if (options) {
    realOptions = $l.extend(defaults, options);
  } else {
    realOptions = defaults;
  }

  const xhr = new XMLHttpRequest();
  xhr.open(realOptions.method, realOptions.url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      return realOptions.success(JSON.parse(xhr.response));
    } else {
      return realOptions.error(JSON.parse(xhr.response));
    }
  };

  xhr.send(realOptions.data);
}


window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArr) {
    this.nodeList = htmlArr;
  }

  html(string) {
    if (string) {
      this.nodeList.forEach(el => el.innerHTML = string);
    } else {
      return this.nodeList[0].innerHTML;
    }
  }

  empty() {
    this.nodeList.html("");
  }

  append(inputChildElement) {
    if (this.nodeList.length === 0) return;

    if (typeof inputChildElement === "string") {
      this.nodeList.forEach((nodeElem) => {
        nodeElem.innerHTML += inputChildElement;
      });
    } else if (inputChildElement instanceof DOMNodeCollection) {
      this.nodeList.forEach((nodeElem) => {
        inputChildElement.forEach((childNode) => {
          nodeElem.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr(attrName, attrValue) {
    const firstNode = this.nodeList[0];
    let elemAttrs = firstNode.attributes;

    if (!attrValue) {
      return elemAttrs[attrName];
    } else {
      firstNode.setAttribute(attrName, attrValue);
      return firstNode;
    }
  }

  addClass(className) {
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].classList.add(className);
    }
  }

  removeClass(className) {
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].classList.remove(className);
    }
    return this;
  }

  children() {
    const allChildren = [];

    this.nodeList.forEach((node) => {
      allChildren.push(node.children);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];

    this.nodeList.forEach((node) => {
      allParents.push(node.parentNode);
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    const descendants = [];
    const found = [];

    this.nodeList.forEach((node) => {
      descendants.push(node.querySelectorAll(selector));
    })

    descendants.forEach((desc) => {
      if (selector.outerHTML === desc.outerHTML) {
        found.push(desc);
      }
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.nodeList.forEach((node) => {
      node.outerHTML = "";
    })

    while (this.nodeList.length > 0) {
      this.nodeList.shift();
    }
    return this;
  }

  on(type, callback) {

    this.nodeList.forEach((node) => {
      node.events = node.events || {};
      node.addEventListener(type, callback);

      if (node.events[type]) {
        node.events[type].push(callback);
      } else {
        node.events[type] = [callback];
      }
    });

    return this.nodeList;
  }

  off(type, callback) {

    this.nodeList.forEach((node) => {
      node.events = node.events || {};

      if (!callback) {
        node.events[type].forEach((elem) => {
          node.removeEventListener(type, elem);
        });
      } else {
        let eventToRemove = node.events[type].indexOf(callback);
        node.events[type].splice(eventToRemove, 1);
        node.removeEventListener(type, callback);
      }
    });

    return this.nodeList;
  }
}



module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
