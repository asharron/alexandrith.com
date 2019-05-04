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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /home/alex/repos/alexandrith.com/frontend/src/index.js: Unexpected token (5:16)\\n\\n\\u001b[0m \\u001b[90m 3 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mApp\\u001b[39m from \\u001b[32m'./App'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 4 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 5 | \\u001b[39m\\u001b[33mReactDOM\\u001b[39m\\u001b[33m.\\u001b[39mrender(\\u001b[33m<\\u001b[39m\\u001b[33mApp\\u001b[39m \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m,\\u001b[39m document\\u001b[33m.\\u001b[39mgetElementById(\\u001b[32m'App'\\u001b[39m))\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m                \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n    at Parser.raise (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:3851:17)\\n    at Parser.unexpected (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5165:16)\\n    at Parser.parseExprAtom (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:6330:20)\\n    at Parser.parseExprSubscripts (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5916:23)\\n    at Parser.parseMaybeUnary (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5896:21)\\n    at Parser.parseExprOps (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5783:23)\\n    at Parser.parseMaybeConditional (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5756:23)\\n    at Parser.parseMaybeAssign (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5703:21)\\n    at Parser.parseExprListItem (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:6979:18)\\n    at Parser.parseCallExpressionArguments (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:6123:22)\\n    at Parser.parseSubscript (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:6018:29)\\n    at Parser.parseSubscripts (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5937:19)\\n    at Parser.parseExprSubscripts (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5926:17)\\n    at Parser.parseMaybeUnary (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5896:21)\\n    at Parser.parseExprOps (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5783:23)\\n    at Parser.parseMaybeConditional (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5756:23)\\n    at Parser.parseMaybeAssign (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5703:21)\\n    at Parser.parseExpression (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:5651:23)\\n    at Parser.parseStatementContent (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:7422:23)\\n    at Parser.parseStatement (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:7293:17)\\n    at Parser.parseBlockOrModuleBlockBody (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:7879:25)\\n    at Parser.parseBlockBody (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:7866:10)\\n    at Parser.parseTopLevel (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:7222:10)\\n    at Parser.parse (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:8871:17)\\n    at parse (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/parser/lib/index.js:11133:38)\\n    at parser (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\\n    at runSync (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at process.nextTick (/home/alex/repos/alexandrith.com/frontend/node_modules/@babel/core/lib/transform.js:34:34)\\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\\n    at process._tickCallback (internal/process/next_tick.js:180:9)\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });