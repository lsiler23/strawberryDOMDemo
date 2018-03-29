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
/***/ (function(module, exports) {

const addToSelect = (array, result) => {
  const newArr = array.concat(result);

  newArr.forEach((el) => {
    let value = `${el}`;
    let lineToAppend = '<li class="master-entry" id=' + `${el}>` + `${el}</li>`
    $l('.dog-master-list').append(lineToAppend)
  });
  return newArr;
};

const populateMasterList = () => {
  const allDogs = [];
  $l.ajax({
    url: 'https://dog.ceo/api/breeds/list',
    success: (result) => addToSelect(allDogs, result.message)
  });
};

const queryPic = (result) => {
  $l('img').attr('src', result)
};

const addFirstPic = () => {
  $l.ajax({
    url: `https://dog.ceo/api/breed/affenpinscher/images/random`,
    success: (result) => queryPic(result.message)
  });
};

const addSwitchPics = (breed) => {
  let url = `https://dog.ceo/api/breed/${breed}/images/random`;

  $l.ajax({
    url,
    success: (result) => queryPic(result.message)
  });
};

const addClickEvent = () => {

  $l('.master-entry').on('click', (e) => {
    $l('li').removeClass('selected');
    let currentId = e.target.id;
    addSwitchPics(currentId);
    $l(`#${currentId}`).addClass('selected');
  });
};

const addRemoveAdoptionEvent = () => {
  $l('.unadopt').on('click', (e) => {
    const currentId = `#${e.target.id}-adopt`;
    const correctRemoval = $l('.adopted-list').find(currentId)
    $l(currentId).remove();
  });
};

const pickMeEvent = () => {
  $l('#picker').on('click', () => {
    const selected = $l('.selected')
    const selectedBreed = selected.nodeList[0].id
    const selectedLi = '<li id=' + `${selectedBreed}-adopt `+ 'class="adoptee">' + `${selectedBreed}` + '</li>'
    const currentId = `#${selectedBreed}-adopt`

    if ($l(currentId).length === 0) {
      $l('.adopted-list').append(selectedLi);
      $l(currentId).append('<button id=' + `${selectedBreed} ` + 'class="unadopt">unadopt</button>');
    }

    addRemoveAdoptionEvent();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  populateMasterList();
  addFirstPic();
  setTimeout(addClickEvent, 3000);
  setTimeout(pickMeEvent, 2000);
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map