// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"KlXm":[function(require,module,exports) {

},{}],"BEhD":[function(require,module,exports) {
module.exports = {
  "style": require("./style.pcss")
};
},{"./style.pcss":"KlXm"}],"b6iZ":[function(require,module,exports) {
module.exports = {
  "style": require("./style.pcss")
};
},{"./style.pcss":"KlXm"}],"EDTP":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"S1cf":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":"EDTP"}],"H6Qo":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"S1cf"}],"rj2i":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"S1cf"}],"woEt":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"S1cf"}],"V30M":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"M8l6":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"S1cf"}],"YdsM":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"bIiH":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"YdsM"}],"aS8y":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"bIiH"}],"dn2M":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"S1cf"}],"YZjV":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"a2Uu":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"KxkP":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"YZjV","../helpers/combineURLs":"a2Uu"}],"ZeD7":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"S1cf"}],"w7LF":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"S1cf"}],"KRuG":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"S1cf","./../core/settle":"aS8y","./../helpers/cookies":"dn2M","./../helpers/buildURL":"H6Qo","../core/buildFullPath":"KxkP","./../helpers/parseHeaders":"ZeD7","./../helpers/isURLSameOrigin":"w7LF","../core/createError":"bIiH"}],"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"BXyq":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"S1cf","./helpers/normalizeHeaderName":"M8l6","./adapters/xhr":"KRuG","./adapters/http":"KRuG","process":"pBGv"}],"uz6X":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"S1cf","./transformData":"woEt","../cancel/isCancel":"V30M","../defaults":"BXyq"}],"OHvn":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":"S1cf"}],"OvAf":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"S1cf","../helpers/buildURL":"H6Qo","./InterceptorManager":"rj2i","./dispatchRequest":"uz6X","./mergeConfig":"OHvn"}],"mIKj":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"tsWd":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"mIKj"}],"X8jb":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"wICU":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],"nUiQ":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"S1cf","./helpers/bind":"EDTP","./core/Axios":"OvAf","./core/mergeConfig":"OHvn","./defaults":"BXyq","./cancel/Cancel":"mIKj","./cancel/CancelToken":"tsWd","./cancel/isCancel":"V30M","./helpers/spread":"X8jb","./helpers/isAxiosError":"wICU"}],"dZBD":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"nUiQ"}],"XPwX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Import remote dependencies.
 */

/*
 * Create a Api object with Axios and
 * configure it for the WordPRess Rest Api.
 *
 * The 'mynamespace' object is injected into the page
 * using the WordPress wp_localize_script function.
 */
var Api = _axios.default.create({
  headers: {
    "content-type": "application/json" // "X-WP-Nonce": aoat_config.nonce

  }
});

var _default = Api;
exports.default = _default;
},{"axios":"dZBD"}],"PlVF":[function(require,module,exports) {
/**
 * Code in this file will be ran in both Admin and Frontend contexts, prior to either's own JS.
 */

/**
 * TODO: Remove this comment and everything BELOW it if there isn't any JS to share between Admin and Frontend.
 */
(function (common, $) {
  $(document).ready(function () {
    console.log('Common: jQuery $ is working.');
  });
})(window.common = window.common || {}, jQuery);
},{}],"uI9n":[function(require,module,exports) {
module.exports = {
  "Api": require("./Api.js"),
  "index": require("./index.js")
};
},{"./Api.js":"XPwX","./index.js":"PlVF"}],"QPfz":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = ('__proto__' in {}); // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("production" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("production" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("production" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("production" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "production" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("production" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "production" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("production" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("production" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("production" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("production" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("production" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("production" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("production" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("production" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("production" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("production" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("production" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "production" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("production" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("production" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("production" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("production" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("production" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("production" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("production" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "production" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("production" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("production" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("production" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("production" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("production" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "production" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("production" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("production" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("production" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("production" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("production" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("production" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("production" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("production" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("production" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "production" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "production" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("production" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("production" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("production" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("production" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("production" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("production" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("production" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("production" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("production" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("production" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("production" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("production" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("production" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("production" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.12';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "production" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("production" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("production" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("production" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("production" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("production" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("production" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("production" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("production" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("production" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecessary `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("production" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("production" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("production" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("production" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("production" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("production" !== 'production' && "production" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("production" !== 'production' && "production" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"agGE":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"QVnC":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"PMvg":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"QVnC"}],"SdYw":[function(require,module,exports) {
var define;
(function(t,e){"object"===typeof exports&&"object"===typeof module?module.exports=e(require("vue")):"function"===typeof define&&define.amd?define(["vue"],e):"object"===typeof exports?exports["vue-slider-component"]=e(require("vue")):t["vue-slider-component"]=e(t["Vue"])})("undefined"!==typeof self?self:this,(function(t){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s="fb15")}({"091b":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".vue-slider-dot{position:absolute;-webkit-transition:all 0s;transition:all 0s;z-index:5}.vue-slider-dot:focus{outline:none}.vue-slider-dot-tooltip{position:absolute;visibility:hidden}.vue-slider-dot-hover:hover .vue-slider-dot-tooltip,.vue-slider-dot-tooltip-show{visibility:visible}.vue-slider-dot-tooltip-top{top:-10px;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.vue-slider-dot-tooltip-bottom{bottom:-10px;left:50%;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.vue-slider-dot-tooltip-left{left:-10px;top:50%;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.vue-slider-dot-tooltip-right{right:-10px;top:50%;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}",""]),t.exports=e},"24fb":function(t,e,r){"use strict";function n(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"===typeof btoa){var i=o(n),a=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[r].concat(a).concat([i]).join("\n")}return[r].join("\n")}function o(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(r," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=n(e,t);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"===typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<t.length;s++){var u=[].concat(t[s]);n&&o[u[0]]||(r&&(u[2]?u[2]="".concat(r," and ").concat(u[2]):u[2]=r),e.push(u))}},e}},2638:function(t,e,r){"use strict";function n(){return n=Object.assign||function(t){for(var e,r=1;r<arguments.length;r++)for(var n in e=arguments[r],e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},n.apply(this,arguments)}var o=["attrs","props","domProps"],i=["class","style","directives"],a=["on","nativeOn"],s=function(t){return t.reduce((function(t,e){for(var r in e)if(t[r])if(-1!==o.indexOf(r))t[r]=n({},t[r],e[r]);else if(-1!==i.indexOf(r)){var s=t[r]instanceof Array?t[r]:[t[r]],l=e[r]instanceof Array?e[r]:[e[r]];t[r]=s.concat(l)}else if(-1!==a.indexOf(r))for(var c in e[r])if(t[r][c]){var d=t[r][c]instanceof Array?t[r][c]:[t[r][c]],f=e[r][c]instanceof Array?e[r][c]:[e[r][c]];t[r][c]=d.concat(f)}else t[r][c]=e[r][c];else if("hook"==r)for(var h in e[r])t[r][h]=t[r][h]?u(t[r][h],e[r][h]):e[r][h];else t[r]=e[r];else t[r]=e[r];return t}),{})},u=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=s},"499e":function(t,e,r){"use strict";function n(t,e){for(var r=[],n={},o=0;o<e.length;o++){var i=e[o],a=i[0],s=i[1],u=i[2],l=i[3],c={id:t+":"+o,css:s,media:u,sourceMap:l};n[a]?n[a].parts.push(c):r.push(n[a]={id:a,parts:[c]})}return r}r.r(e),r.d(e,"default",(function(){return p}));var o="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,u=0,l=!1,c=function(){},d=null,f="data-vue-ssr-id",h="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,r,o){l=r,d=o||{};var a=n(t,e);return y(a),function(e){for(var r=[],o=0;o<a.length;o++){var s=a[o],u=i[s.id];u.refs--,r.push(u)}e?(a=n(t,e),y(a)):a=[];for(o=0;o<r.length;o++){u=r[o];if(0===u.refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete i[u.id]}}}}function y(t){for(var e=0;e<t.length;e++){var r=t[e],n=i[r.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](r.parts[o]);for(;o<r.parts.length;o++)n.parts.push(m(r.parts[o]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length)}else{var a=[];for(o=0;o<r.parts.length;o++)a.push(m(r.parts[o]));i[r.id]={id:r.id,refs:1,parts:a}}}}function v(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,r,n=document.querySelector("style["+f+'~="'+t.id+'"]');if(n){if(l)return c;n.parentNode.removeChild(n)}if(h){var o=u++;n=s||(s=v()),e=g.bind(null,n,o,!1),r=g.bind(null,n,o,!0)}else n=v(),e=k.bind(null,n),r=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else r()}}var b=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}();function g(t,e,r,n){var o=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function k(t,e){var r=e.css,n=e.media,o=e.sourceMap;if(n&&t.setAttribute("media",n),d.ssrId&&t.setAttribute(f,e.id),o&&(r+="\n/*# sourceURL="+o.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}},"4abb":function(t,e,r){var n=r("7a57");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("b2af7572",n,!0,{sourceMap:!1,shadowMode:!1})},"4ed8":function(t,e,r){var n=r("091b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("2f6bee1a",n,!0,{sourceMap:!1,shadowMode:!1})},"556c":function(t,e,r){var n=r("eef2");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("1209fd47",n,!0,{sourceMap:!1,shadowMode:!1})},"65d9":function(t,e,r){"use strict";
/**
  * vue-class-component v7.0.1
  * (c) 2015-present Evan You
  * @license MIT
  */function n(t){return t&&"object"===typeof t&&"default"in t?t["default"]:t}Object.defineProperty(e,"__esModule",{value:!0});var o=n(r("8bbf")),i="undefined"!==typeof Reflect&&Reflect.defineMetadata&&Reflect.getOwnMetadataKeys;function a(t,e){s(t,e),Object.getOwnPropertyNames(e.prototype).forEach((function(r){s(t.prototype,e.prototype,r)})),Object.getOwnPropertyNames(e).forEach((function(r){s(t,e,r)}))}function s(t,e,r){var n=r?Reflect.getOwnMetadataKeys(e,r):Reflect.getOwnMetadataKeys(e);n.forEach((function(n){var o=r?Reflect.getOwnMetadata(n,e,r):Reflect.getOwnMetadata(n,e);r?Reflect.defineMetadata(n,o,t,r):Reflect.defineMetadata(n,o,t)}))}var u={__proto__:[]},l=u instanceof Array;function c(t){return function(e,r,n){var o="function"===typeof e?e:e.constructor;o.__decorators__||(o.__decorators__=[]),"number"!==typeof n&&(n=void 0),o.__decorators__.push((function(e){return t(e,r,n)}))}}function d(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return o.extend({mixins:t})}function f(t){var e=typeof t;return null==t||"object"!==e&&"function"!==e}function h(t,e){var r=e.prototype._init;e.prototype._init=function(){var e=this,r=Object.getOwnPropertyNames(t);if(t.$options.props)for(var n in t.$options.props)t.hasOwnProperty(n)||r.push(n);r.forEach((function(r){"_"!==r.charAt(0)&&Object.defineProperty(e,r,{get:function(){return t[r]},set:function(e){t[r]=e},configurable:!0})}))};var n=new e;e.prototype._init=r;var o={};return Object.keys(n).forEach((function(t){void 0!==n[t]&&(o[t]=n[t])})),o}var p=["data","beforeCreate","created","beforeMount","mounted","beforeDestroy","destroyed","beforeUpdate","updated","activated","deactivated","render","errorCaptured","serverPrefetch"];function y(t,e){void 0===e&&(e={}),e.name=e.name||t._componentTag||t.name;var r=t.prototype;Object.getOwnPropertyNames(r).forEach((function(t){if("constructor"!==t)if(p.indexOf(t)>-1)e[t]=r[t];else{var n=Object.getOwnPropertyDescriptor(r,t);void 0!==n.value?"function"===typeof n.value?(e.methods||(e.methods={}))[t]=n.value:(e.mixins||(e.mixins=[])).push({data:function(){var e;return e={},e[t]=n.value,e}}):(n.get||n.set)&&((e.computed||(e.computed={}))[t]={get:n.get,set:n.set})}})),(e.mixins||(e.mixins=[])).push({data:function(){return h(this,t)}});var n=t.__decorators__;n&&(n.forEach((function(t){return t(e)})),delete t.__decorators__);var s=Object.getPrototypeOf(t.prototype),u=s instanceof o?s.constructor:o,l=u.extend(e);return v(l,t,u),i&&a(l,t),l}function v(t,e,r){Object.getOwnPropertyNames(e).forEach((function(n){if("prototype"!==n){var o=Object.getOwnPropertyDescriptor(t,n);if(!o||o.configurable){var i=Object.getOwnPropertyDescriptor(e,n);if(!l){if("cid"===n)return;var a=Object.getOwnPropertyDescriptor(r,n);if(!f(i.value)&&a&&a.value===i.value)return}0,Object.defineProperty(t,n,i)}}}))}function m(t){return"function"===typeof t?y(t):function(e){return y(e,t)}}m.registerHooks=function(t){p.push.apply(p,t)},e.default=m,e.createDecorator=c,e.mixins=d},"7a57":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".vue-slider{position:relative;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.vue-slider-rail{position:relative;width:100%;height:100%;-webkit-transition-property:width,height,left,right,top,bottom;transition-property:width,height,left,right,top,bottom}.vue-slider-process{position:absolute;z-index:1}",""]),t.exports=e},8875:function(t,e,r){var n,o,i;(function(r,a){o=[],n=a,i="function"===typeof n?n.apply(e,o):n,void 0===i||(t.exports=i)})("undefined"!==typeof self&&self,(function(){function t(){var e=Object.getOwnPropertyDescriptor(document,"currentScript");if(!e&&"currentScript"in document&&document.currentScript)return document.currentScript;if(e&&e.get!==t&&document.currentScript)return document.currentScript;try{throw new Error}catch(h){var r,n,o,i=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,a=/@([^@]*):(\d+):(\d+)\s*$/gi,s=i.exec(h.stack)||a.exec(h.stack),u=s&&s[1]||!1,l=s&&s[2]||!1,c=document.location.href.replace(document.location.hash,""),d=document.getElementsByTagName("script");u===c&&(r=document.documentElement.outerHTML,n=new RegExp("(?:[^\\n]+?\\n){0,"+(l-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),o=r.replace(n,"$1").trim());for(var f=0;f<d.length;f++){if("interactive"===d[f].readyState)return d[f];if(d[f].src===u)return d[f];if(u===c&&d[f].innerHTML&&d[f].innerHTML.trim()===o)return d[f]}return null}}return t}))},"8bbf":function(e,r){e.exports=t},eef2:function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".vue-slider-marks{position:relative;width:100%;height:100%}.vue-slider-mark{position:absolute;z-index:1}.vue-slider-ltr .vue-slider-mark,.vue-slider-rtl .vue-slider-mark{width:0;height:100%;top:50%}.vue-slider-ltr .vue-slider-mark-step,.vue-slider-rtl .vue-slider-mark-step{top:0}.vue-slider-ltr .vue-slider-mark-label,.vue-slider-rtl .vue-slider-mark-label{top:100%;margin-top:10px}.vue-slider-ltr .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ltr .vue-slider-mark-step{left:0}.vue-slider-ltr .vue-slider-mark-label{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.vue-slider-rtl .vue-slider-mark{-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%)}.vue-slider-rtl .vue-slider-mark-step{right:0}.vue-slider-rtl .vue-slider-mark-label{right:50%;-webkit-transform:translateX(50%);transform:translateX(50%)}.vue-slider-btt .vue-slider-mark,.vue-slider-ttb .vue-slider-mark{width:100%;height:0;left:50%}.vue-slider-btt .vue-slider-mark-step,.vue-slider-ttb .vue-slider-mark-step{left:0}.vue-slider-btt .vue-slider-mark-label,.vue-slider-ttb .vue-slider-mark-label{left:100%;margin-left:10px}.vue-slider-btt .vue-slider-mark{-webkit-transform:translate(-50%,50%);transform:translate(-50%,50%)}.vue-slider-btt .vue-slider-mark-step{top:0}.vue-slider-btt .vue-slider-mark-label{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-slider-ttb .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ttb .vue-slider-mark-step{bottom:0}.vue-slider-ttb .vue-slider-mark-label{bottom:50%;-webkit-transform:translateY(50%);transform:translateY(50%)}.vue-slider-mark-label,.vue-slider-mark-step{position:absolute}",""]),t.exports=e},fb15:function(t,e,r){"use strict";if(r.r(e),r.d(e,"ERROR_TYPE",(function(){return J})),r.d(e,"VueSliderMark",(function(){return U})),r.d(e,"VueSliderDot",(function(){return j})),"undefined"!==typeof window){var n=window.document.currentScript,o=r("8875");n=o(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:o});var i=n&&n.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);i&&(r.p=i[1])}var a=r("2638"),s=r.n(a);function u(t,e,r,n){var o,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,r,a):o(e,r))||a);return i>3&&a&&Object.defineProperty(e,r,a),a}var l=r("8bbf"),c=r.n(l),d=r("65d9"),f=r.n(d);function h(t,e){return void 0===e&&(e={}),Object(d["createDecorator"])((function(r,n){(r.props||(r.props={}))[n]=e,r.model={prop:n,event:t||n}}))}function p(t){return void 0===t&&(t={}),Object(d["createDecorator"])((function(e,r){(e.props||(e.props={}))[r]=t}))}function y(t,e){void 0===e&&(e={});var r=e.deep,n=void 0!==r&&r,o=e.immediate,i=void 0!==o&&o;return Object(d["createDecorator"])((function(e,r){"object"!==typeof e.watch&&(e.watch=Object.create(null));var o=e.watch;"object"!==typeof o[t]||Array.isArray(o[t])?"undefined"===typeof o[t]&&(o[t]=[]):o[t]=[o[t]],o[t].push({handler:r,deep:n,immediate:i})}))}r("4ed8");function v(t){return v="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function g(t,e,r){return e&&b(t.prototype,e),r&&b(t,r),t}function k(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}function O(t,e){return O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},O(t,e)}function x(t){var e=P();return function(){var r,n=D(t);if(e){var o=D(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return w(this,r)}}function w(t,e){return!e||"object"!==v(e)&&"function"!==typeof e?S(t):e}function S(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},D(t)}var R=function(){var t=function(t){k(r,t);var e=x(r);function r(){return m(this,r),e.apply(this,arguments)}return g(r,[{key:"dragStart",value:function(t){if(this.disabled)return!1;this.$emit("drag-start")}},{key:"render",value:function(){var t=arguments[0];return t("div",{ref:"dot",class:this.dotClasses,attrs:{"aria-valuetext":this.tooltipValue},on:{mousedown:this.dragStart,touchstart:this.dragStart}},[this.$slots.dot||t("div",{class:this.handleClasses,style:this.dotStyle}),"none"!==this.tooltip?t("div",{class:this.tooltipClasses},[this.$slots.tooltip||t("div",{class:this.tooltipInnerClasses,style:this.tooltipStyle},[t("span",{class:"vue-slider-dot-tooltip-text"},[this.tooltipValue])])]):null])}},{key:"dotClasses",get:function(){return["vue-slider-dot",{"vue-slider-dot-hover":"hover"===this.tooltip||"active"===this.tooltip,"vue-slider-dot-disabled":this.disabled,"vue-slider-dot-focus":this.focus}]}},{key:"handleClasses",get:function(){return["vue-slider-dot-handle",{"vue-slider-dot-handle-disabled":this.disabled,"vue-slider-dot-handle-focus":this.focus}]}},{key:"tooltipClasses",get:function(){return["vue-slider-dot-tooltip",["vue-slider-dot-tooltip-".concat(this.tooltipPlacement)],{"vue-slider-dot-tooltip-show":this.showTooltip}]}},{key:"tooltipInnerClasses",get:function(){return["vue-slider-dot-tooltip-inner",["vue-slider-dot-tooltip-inner-".concat(this.tooltipPlacement)],{"vue-slider-dot-tooltip-inner-disabled":this.disabled,"vue-slider-dot-tooltip-inner-focus":this.focus}]}},{key:"showTooltip",get:function(){switch(this.tooltip){case"always":return!0;case"none":return!1;case"focus":case"active":return!!this.focus;default:return!1}}},{key:"tooltipValue",get:function(){return this.tooltipFormatter?"string"===typeof this.tooltipFormatter?this.tooltipFormatter.replace(/\{value\}/,String(this.value)):this.tooltipFormatter(this.value):this.value}}]),r}(c.a);return u([p({default:0})],t.prototype,"value",void 0),u([p()],t.prototype,"tooltip",void 0),u([p()],t.prototype,"dotStyle",void 0),u([p()],t.prototype,"tooltipStyle",void 0),u([p({type:String,validator:function(t){return["top","right","bottom","left"].indexOf(t)>-1},required:!0})],t.prototype,"tooltipPlacement",void 0),u([p({type:[String,Function]})],t.prototype,"tooltipFormatter",void 0),u([p({type:Boolean,default:!1})],t.prototype,"focus",void 0),u([p({default:!1})],t.prototype,"disabled",void 0),t=u([f.a],t),t}(),j=R;r("556c");function E(t){return E="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function A(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function V(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function M(t,e,r){return e&&V(t.prototype,e),r&&V(t,r),t}function _(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}function C(t,e){return C=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},C(t,e)}function I(t){var e=B();return function(){var r,n=N(t);if(e){var o=N(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return L(this,r)}}function L(t,e){return!e||"object"!==E(e)&&"function"!==typeof e?T(t):e}function T(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var z,H=function(){var t=function(t){_(r,t);var e=I(r);function r(){return A(this,r),e.apply(this,arguments)}return M(r,[{key:"labelClickHandle",value:function(t){t.stopPropagation(),this.$emit("pressLabel",this.mark.pos)}},{key:"render",value:function(){var t=arguments[0],e=this.mark;return t("div",{class:this.marksClasses},[this.$slots.step||t("div",{class:this.stepClasses,style:[this.stepStyle,e.style,e.active?this.stepActiveStyle:null,e.active?e.activeStyle:null]}),this.hideLabel?null:this.$slots.label||t("div",{class:this.labelClasses,style:[this.labelStyle,e.labelStyle,e.active?this.labelActiveStyle:null,e.active?e.labelActiveStyle:null],on:{click:this.labelClickHandle}},[e.label])])}},{key:"marksClasses",get:function(){return["vue-slider-mark",{"vue-slider-mark-active":this.mark.active}]}},{key:"stepClasses",get:function(){return["vue-slider-mark-step",{"vue-slider-mark-step-active":this.mark.active}]}},{key:"labelClasses",get:function(){return["vue-slider-mark-label",{"vue-slider-mark-label-active":this.mark.active}]}}]),r}(c.a);return u([p({required:!0})],t.prototype,"mark",void 0),u([p(Boolean)],t.prototype,"hideLabel",void 0),u([p()],t.prototype,"stepStyle",void 0),u([p()],t.prototype,"stepActiveStyle",void 0),u([p()],t.prototype,"labelStyle",void 0),u([p()],t.prototype,"labelActiveStyle",void 0),t=u([f.a],t),t}(),U=H,F=function(t){return"number"===typeof t?"".concat(t,"px"):t},$=function(t){var e=document.documentElement,r=document.body,n=t.getBoundingClientRect(),o={y:n.top+(window.pageYOffset||e.scrollTop)-(e.clientTop||r.clientTop||0),x:n.left+(window.pageXOffset||e.scrollLeft)-(e.clientLeft||r.clientLeft||0)};return o},W=function(t,e,r){var n="targetTouches"in t?t.targetTouches[0]:t,o=$(e),i={x:n.pageX-o.x,y:n.pageY-o.y};return{x:r?e.offsetWidth-i.x:i.x,y:r?e.offsetHeight-i.y:i.y}};(function(t){t[t["PAGE_UP"]=33]="PAGE_UP",t[t["PAGE_DOWN"]=34]="PAGE_DOWN",t[t["END"]=35]="END",t[t["HOME"]=36]="HOME",t[t["LEFT"]=37]="LEFT",t[t["UP"]=38]="UP",t[t["RIGHT"]=39]="RIGHT",t[t["DOWN"]=40]="DOWN"})(z||(z={}));var G=function(t,e){if(e.hook){var r=e.hook(t);if("function"===typeof r)return r;if(!r)return null}switch(t.keyCode){case z.UP:return function(t){return"ttb"===e.direction?t-1:t+1};case z.RIGHT:return function(t){return"rtl"===e.direction?t-1:t+1};case z.DOWN:return function(t){return"ttb"===e.direction?t+1:t-1};case z.LEFT:return function(t){return"rtl"===e.direction?t+1:t-1};case z.END:return function(){return e.max};case z.HOME:return function(){return e.min};case z.PAGE_UP:return function(t){return t+10};case z.PAGE_DOWN:return function(t){return t-10};default:return null}};function X(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function q(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function K(t,e,r){return e&&q(t.prototype,e),r&&q(t,r),t}var Y,J,Q=function(){function t(e){X(this,t),this.num=e}return K(t,[{key:"decimal",value:function(t,e){var r=this.num,n=this.getDecimalLen(r),o=this.getDecimalLen(t),i=0;switch(e){case"+":i=this.getExponent(n,o),this.num=(this.safeRoundUp(r,i)+this.safeRoundUp(t,i))/i;break;case"-":i=this.getExponent(n,o),this.num=(this.safeRoundUp(r,i)-this.safeRoundUp(t,i))/i;break;case"*":this.num=this.safeRoundUp(this.safeRoundUp(r,this.getExponent(n)),this.safeRoundUp(t,this.getExponent(o)))/this.getExponent(n+o);break;case"/":i=this.getExponent(n,o),this.num=this.safeRoundUp(r,i)/this.safeRoundUp(t,i);break;case"%":i=this.getExponent(n,o),this.num=this.safeRoundUp(r,i)%this.safeRoundUp(t,i)/i;break}return this}},{key:"plus",value:function(t){return this.decimal(t,"+")}},{key:"minus",value:function(t){return this.decimal(t,"-")}},{key:"multiply",value:function(t){return this.decimal(t,"*")}},{key:"divide",value:function(t){return this.decimal(t,"/")}},{key:"remainder",value:function(t){return this.decimal(t,"%")}},{key:"toNumber",value:function(){return this.num}},{key:"getDecimalLen",value:function(t){var e="".concat(t).split("e");return("".concat(e[0]).split(".")[1]||"").length-(e[1]?+e[1]:0)}},{key:"getExponent",value:function(t,e){return Math.pow(10,void 0!==e?Math.max(t,e):t)}},{key:"safeRoundUp",value:function(t,e){return Math.round(t*e)}}]),t}();function Z(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function tt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Z(Object(r),!0).forEach((function(e){pt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Z(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function et(t,e){return ot(t)||nt(t,e)||st(t,e)||rt()}function rt(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function nt(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0)if(r.push(a.value),e&&r.length===e)break}catch(u){o=!0,i=u}finally{try{n||null==s["return"]||s["return"]()}finally{if(o)throw i}}return r}}function ot(t){if(Array.isArray(t))return t}function it(t){return lt(t)||ut(t)||st(t)||at()}function at(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function st(t,e){if(t){if("string"===typeof t)return ct(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ct(t,e):void 0}}function ut(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function lt(t){if(Array.isArray(t))return ct(t)}function ct(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function dt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ft(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ht(t,e,r){return e&&ft(t.prototype,e),r&&ft(t,r),t}function pt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}(function(t){t[t["VALUE"]=1]="VALUE",t[t["INTERVAL"]=2]="INTERVAL",t[t["MIN"]=3]="MIN",t[t["MAX"]=4]="MAX",t[t["ORDER"]=5]="ORDER"})(J||(J={}));var yt=(Y={},pt(Y,J.VALUE,'The type of the "value" is illegal'),pt(Y,J.INTERVAL,'The prop "interval" is invalid, "(max - min)" must be divisible by "interval"'),pt(Y,J.MIN,'The "value" must be greater than or equal to the "min".'),pt(Y,J.MAX,'The "value" must be less than or equal to the "max".'),pt(Y,J.ORDER,'When "order" is false, the parameters "minRange", "maxRange", "fixed", "enabled" are invalid.'),Y),vt=function(){function t(e){dt(this,t),this.dotsPos=[],this.dotsValue=[],this.cacheRangeDir={},this.data=e.data,this.max=e.max,this.min=e.min,this.interval=e.interval,this.order=e.order,this.marks=e.marks,this.included=e.included,this.process=e.process,this.adsorb=e.adsorb,this.dotOptions=e.dotOptions,this.onError=e.onError,this.order?(this.minRange=e.minRange||0,this.maxRange=e.maxRange||0,this.enableCross=e.enableCross,this.fixed=e.fixed):((e.minRange||e.maxRange||!e.enableCross||e.fixed)&&this.emitError(J.ORDER),this.minRange=0,this.maxRange=0,this.enableCross=!0,this.fixed=!1),this.setValue(e.value)}return ht(t,[{key:"setValue",value:function(t){var e=this;this.setDotsValue(Array.isArray(t)?this.order?it(t).sort((function(t,r){return e.getIndexByValue(t)-e.getIndexByValue(r)})):it(t):[t],!0)}},{key:"setDotsValue",value:function(t,e){this.dotsValue=t,e&&this.syncDotsPos()}},{key:"setDotsPos",value:function(t){var e=this,r=this.order?it(t).sort((function(t,e){return t-e})):t;this.dotsPos=r,this.setDotsValue(r.map((function(t){return e.getValueByPos(t)})),this.adsorb)}},{key:"getValueByPos",value:function(t){var e=this.parsePos(t);if(this.included){var r=100;this.markList.forEach((function(n){var o=Math.abs(n.pos-t);o<r&&(r=o,e=n.value)}))}return e}},{key:"syncDotsPos",value:function(){var t=this;this.dotsPos=this.dotsValue.map((function(e){return t.parseValue(e)}))}},{key:"getRecentDot",value:function(t){var e=this.dotsPos.map((function(e){return Math.abs(e-t)}));return e.indexOf(Math.min.apply(Math,it(e)))}},{key:"getIndexByValue",value:function(t){return this.data?this.data.indexOf(t):new Q(+t).minus(this.min).divide(this.interval).toNumber()}},{key:"getValueByIndex",value:function(t){return t<0?t=0:t>this.total&&(t=this.total),this.data?this.data[t]:new Q(t).multiply(this.interval).plus(this.min).toNumber()}},{key:"setDotPos",value:function(t,e){t=this.getValidPos(t,e).pos;var r=t-this.dotsPos[e];if(r){var n=new Array(this.dotsPos.length);this.fixed?n=this.getFixedChangePosArr(r,e):this.minRange||this.maxRange?n=this.getLimitRangeChangePosArr(t,r,e):n[e]=r,this.setDotsPos(this.dotsPos.map((function(t,e){return t+(n[e]||0)})))}}},{key:"getFixedChangePosArr",value:function(t,e){var r=this;return this.dotsPos.forEach((function(n,o){if(o!==e){var i=r.getValidPos(n+t,o),a=i.pos,s=i.inRange;s||(t=Math.min(Math.abs(a-n),Math.abs(t))*(t<0?-1:1))}})),this.dotsPos.map((function(e){return t}))}},{key:"getLimitRangeChangePosArr",value:function(t,e,r){var n=this,o=[{index:r,changePos:e}],i=e;return[this.minRange,this.maxRange].forEach((function(a,s){if(!a)return!1;var u=0===s,l=e>0,c=0;c=u?l?1:-1:l?-1:1;var d=function(t,e){var r=Math.abs(t-e);return u?r<n.minRangeDir:r>n.maxRangeDir},f=r+c,h=n.dotsPos[f],p=t;while(n.isPos(h)&&d(h,p)){var y=n.getValidPos(h+i,f),v=y.pos;o.push({index:f,changePos:v-h}),f+=c,p=v,h=n.dotsPos[f]}})),this.dotsPos.map((function(t,e){var r=o.filter((function(t){return t.index===e}));return r.length?r[0].changePos:0}))}},{key:"isPos",value:function(t){return"number"===typeof t}},{key:"getValidPos",value:function(t,e){var r=this.valuePosRange[e],n=!0;return t<r[0]?(t=r[0],n=!1):t>r[1]&&(t=r[1],n=!1),{pos:t,inRange:n}}},{key:"parseValue",value:function(t){if(this.data)t=this.data.indexOf(t);else if("number"===typeof t||"string"===typeof t){if(t=+t,t<this.min)return this.emitError(J.MIN),0;if(t>this.max)return this.emitError(J.MAX),0;if("number"!==typeof t||t!==t)return this.emitError(J.VALUE),0;t=new Q(t).minus(this.min).divide(this.interval).toNumber()}var e=new Q(t).multiply(this.gap).toNumber();return e<0?0:e>100?100:e}},{key:"parsePos",value:function(t){var e=Math.round(t/this.gap);return this.getValueByIndex(e)}},{key:"isActiveByPos",value:function(t){return this.processArray.some((function(e){var r=et(e,2),n=r[0],o=r[1];return t>=n&&t<=o}))}},{key:"getValues",value:function(){if(this.data)return this.data;for(var t=[],e=0;e<=this.total;e++)t.push(new Q(e).multiply(this.interval).plus(this.min).toNumber());return t}},{key:"getRangeDir",value:function(t){return t?new Q(t).divide(new Q(this.data?this.data.length-1:this.max).minus(this.data?0:this.min).toNumber()).multiply(100).toNumber():100}},{key:"emitError",value:function(t){this.onError&&this.onError(t,yt[t])}},{key:"getDotRange",value:function(t,e,r){if(!this.dotOptions)return r;var n=Array.isArray(this.dotOptions)?this.dotOptions[t]:this.dotOptions;return n&&void 0!==n[e]?this.parseValue(n[e]):r}},{key:"markList",get:function(){var t=this;if(!this.marks)return[];var e=function(e,r){var n=t.parseValue(e);return tt({pos:n,value:e,label:e,active:t.isActiveByPos(n)},r)};return!0===this.marks?this.getValues().map((function(t){return e(t)})):"[object Object]"===Object.prototype.toString.call(this.marks)?Object.keys(this.marks).sort((function(t,e){return+t-+e})).map((function(r){var n=t.marks[r];return e(r,"string"!==typeof n?n:{label:n})})):Array.isArray(this.marks)?this.marks.map((function(t){return e(t)})):"function"===typeof this.marks?this.getValues().map((function(e){return{value:e,result:t.marks(e)}})).filter((function(t){var e=t.result;return!!e})).map((function(t){var r=t.value,n=t.result;return e(r,n)})):[]}},{key:"processArray",get:function(){if(this.process){if("function"===typeof this.process)return this.process(this.dotsPos);if(1===this.dotsPos.length)return[[0,this.dotsPos[0]]];if(this.dotsPos.length>1)return[[Math.min.apply(Math,it(this.dotsPos)),Math.max.apply(Math,it(this.dotsPos))]]}return[]}},{key:"total",get:function(){var t=0;return t=this.data?this.data.length-1:new Q(this.max).minus(this.min).divide(this.interval).toNumber(),t-Math.floor(t)!==0?(this.emitError(J.INTERVAL),0):t}},{key:"gap",get:function(){return 100/this.total}},{key:"minRangeDir",get:function(){return this.cacheRangeDir[this.minRange]?this.cacheRangeDir[this.minRange]:this.cacheRangeDir[this.minRange]=this.getRangeDir(this.minRange)}},{key:"maxRangeDir",get:function(){return this.cacheRangeDir[this.maxRange]?this.cacheRangeDir[this.maxRange]:this.cacheRangeDir[this.maxRange]=this.getRangeDir(this.maxRange)}},{key:"valuePosRange",get:function(){var t=this,e=this.dotsPos,r=[];return e.forEach((function(n,o){r.push([Math.max(t.minRange?t.minRangeDir*o:0,t.enableCross?0:e[o-1]||0,t.getDotRange(o,"min",0)),Math.min(t.minRange?100-t.minRangeDir*(e.length-1-o):100,t.enableCross?100:e[o+1]||100,t.getDotRange(o,"max",100))])})),r}},{key:"dotsIndex",get:function(){var t=this;return this.dotsValue.map((function(e){return t.getIndexByValue(e)}))}}]),t}();function mt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function bt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function gt(t,e,r){return e&&bt(t.prototype,e),r&&bt(t,r),t}var kt=function(){function t(e){mt(this,t),this.states=0,this.map=e}return gt(t,[{key:"add",value:function(t){this.states|=t}},{key:"delete",value:function(t){this.states&=~t}},{key:"toggle",value:function(t){this.has(t)?this.delete(t):this.add(t)}},{key:"has",value:function(t){return!!(this.states&t)}}]),t}();r("4abb");function Ot(t,e){return St(t)||wt(t,e)||At(t,e)||xt()}function xt(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function wt(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0)if(r.push(a.value),e&&r.length===e)break}catch(u){o=!0,i=u}finally{try{n||null==s["return"]||s["return"]()}finally{if(o)throw i}}return r}}function St(t){if(Array.isArray(t))return t}function Pt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Dt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Pt(Object(r),!0).forEach((function(e){Rt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Pt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function Rt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function jt(t){return Mt(t)||Vt(t)||At(t)||Et()}function Et(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function At(t,e){if(t){if("string"===typeof t)return _t(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_t(t,e):void 0}}function Vt(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function Mt(t){if(Array.isArray(t))return _t(t)}function _t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Ct(t){return Ct="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ct(t)}function It(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Lt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Tt(t,e,r){return e&&Lt(t.prototype,e),r&&Lt(t,r),t}function Bt(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Nt(t,e)}function Nt(t,e){return Nt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},Nt(t,e)}function zt(t){var e=Ft();return function(){var r,n=$t(t);if(e){var o=$t(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Ht(this,r)}}function Ht(t,e){return!e||"object"!==Ct(e)&&"function"!==typeof e?Ut(t):e}function Ut(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ft(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function $t(t){return $t=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},$t(t)}var Wt={None:0,Drag:2,Focus:4},Gt=4,Xt=function(){var t=function(t){Bt(r,t);var e=zt(r);function r(){var t;return It(this,r),t=e.apply(this,arguments),t.states=new kt(Wt),t.scale=1,t.focusDotIndex=0,t}return Tt(r,[{key:"isObjectData",value:function(t){return!!t&&"[object Object]"===Object.prototype.toString.call(t)}},{key:"isObjectArrayData",value:function(t){return!!t&&Array.isArray(t)&&t.length>0&&"object"===Ct(t[0])}},{key:"onValueChanged",value:function(){this.control&&!this.states.has(Wt.Drag)&&this.isNotSync&&(this.control.setValue(this.value),this.syncValueByPos())}},{key:"created",value:function(){this.initControl()}},{key:"mounted",value:function(){this.bindEvent()}},{key:"beforeDestroy",value:function(){this.unbindEvent()}},{key:"bindEvent",value:function(){document.addEventListener("touchmove",this.dragMove,{passive:!1}),document.addEventListener("touchend",this.dragEnd,{passive:!1}),document.addEventListener("mousedown",this.blurHandle),document.addEventListener("mousemove",this.dragMove),document.addEventListener("mouseup",this.dragEnd),document.addEventListener("mouseleave",this.dragEnd),document.addEventListener("keydown",this.keydownHandle)}},{key:"unbindEvent",value:function(){document.removeEventListener("touchmove",this.dragMove),document.removeEventListener("touchend",this.dragEnd),document.removeEventListener("mousedown",this.blurHandle),document.removeEventListener("mousemove",this.dragMove),document.removeEventListener("mouseup",this.dragEnd),document.removeEventListener("mouseleave",this.dragEnd),document.removeEventListener("keydown",this.keydownHandle)}},{key:"setScale",value:function(){var t=new Q(Math.floor(this.isHorizontal?this.$refs.rail.offsetWidth:this.$refs.rail.offsetHeight));void 0!==this.zoom&&t.multiply(this.zoom),t.divide(100),this.scale=t.toNumber()}},{key:"initControl",value:function(){var t=this;this.control=new vt({value:this.value,data:this.sliderData,enableCross:this.enableCross,fixed:this.fixed,max:this.max,min:this.min,interval:this.interval,minRange:this.minRange,maxRange:this.maxRange,order:this.order,marks:this.sliderMarks,included:this.included,process:this.process,adsorb:this.adsorb,dotOptions:this.dotOptions,onError:this.emitError}),this.syncValueByPos(),["data","enableCross","fixed","max","min","interval","minRange","maxRange","order","marks","process","adsorb","included","dotOptions"].forEach((function(e){t.$watch(e,(function(r){if("data"===e&&Array.isArray(t.control.data)&&Array.isArray(r)&&t.control.data.length===r.length&&r.every((function(e,r){return e===t.control.data[r]})))return!1;switch(e){case"data":case"dataLabel":case"dataValue":t.control.data=t.sliderData;break;case"mark":t.control.marks=t.sliderMarks;break;default:t.control[e]=r}["data","max","min","interval"].indexOf(e)>-1&&t.control.syncDotsPos()}))}))}},{key:"syncValueByPos",value:function(){var t=this.control.dotsValue;this.isDiff(t,Array.isArray(this.value)?this.value:[this.value])&&this.$emit("change",1===t.length?t[0]:jt(t),this.focusDotIndex)}},{key:"isDiff",value:function(t,e){return t.length!==e.length||t.some((function(t,r){return t!==e[r]}))}},{key:"emitError",value:function(t,e){this.silent||console.error("[VueSlider error]: ".concat(e)),this.$emit("error",t,e)}},{key:"dragStartOnProcess",value:function(t){if(this.dragOnClick){this.setScale();var e=this.getPosByEvent(t),r=this.control.getRecentDot(e);if(this.dots[r].disabled)return;this.dragStart(r),this.control.setDotPos(e,this.focusDotIndex),this.lazy||this.syncValueByPos()}}},{key:"dragStart",value:function(t){this.focusDotIndex=t,this.setScale(),this.states.add(Wt.Drag),this.states.add(Wt.Focus),this.$emit("drag-start",this.focusDotIndex)}},{key:"dragMove",value:function(t){if(!this.states.has(Wt.Drag))return!1;t.preventDefault();var e=this.getPosByEvent(t);this.isCrossDot(e),this.control.setDotPos(e,this.focusDotIndex),this.lazy||this.syncValueByPos();var r=this.control.dotsValue;this.$emit("dragging",1===r.length?r[0]:jt(r),this.focusDotIndex)}},{key:"isCrossDot",value:function(t){if(this.canSort){var e=this.focusDotIndex,r=t;if(r>this.dragRange[1]?(r=this.dragRange[1],this.focusDotIndex++):r<this.dragRange[0]&&(r=this.dragRange[0],this.focusDotIndex--),e!==this.focusDotIndex){var n=this.$refs["dot-".concat(this.focusDotIndex)];n&&n.$el&&n.$el.focus(),this.control.setDotPos(r,e)}}}},{key:"dragEnd",value:function(t){var e=this;if(!this.states.has(Wt.Drag))return!1;setTimeout((function(){e.lazy&&e.syncValueByPos(),e.included&&e.isNotSync?e.control.setValue(e.value):e.control.syncDotsPos(),e.states.delete(Wt.Drag),e.useKeyboard&&!("targetTouches"in t)||e.states.delete(Wt.Focus),e.$emit("drag-end",e.focusDotIndex)}))}},{key:"blurHandle",value:function(t){if(!this.states.has(Wt.Focus)||!this.$refs.container||this.$refs.container.contains(t.target))return!1;this.states.delete(Wt.Focus)}},{key:"clickHandle",value:function(t){if(!this.clickable||this.disabled)return!1;if(!this.states.has(Wt.Drag)){this.setScale();var e=this.getPosByEvent(t);this.setValueByPos(e)}}},{key:"focus",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.states.add(Wt.Focus),this.focusDotIndex=t}},{key:"blur",value:function(){this.states.delete(Wt.Focus)}},{key:"getValue",value:function(){var t=this.control.dotsValue;return 1===t.length?t[0]:t}},{key:"getIndex",value:function(){var t=this.control.dotsIndex;return 1===t.length?t[0]:t}},{key:"setValue",value:function(t){this.control.setValue(Array.isArray(t)?jt(t):[t]),this.syncValueByPos()}},{key:"setIndex",value:function(t){var e=this,r=Array.isArray(t)?t.map((function(t){return e.control.getValueByIndex(t)})):this.control.getValueByIndex(t);this.setValue(r)}},{key:"setValueByPos",value:function(t){var e=this,r=this.control.getRecentDot(t);if(this.disabled||this.dots[r].disabled)return!1;this.focusDotIndex=r,this.control.setDotPos(t,r),this.syncValueByPos(),this.useKeyboard&&this.states.add(Wt.Focus),setTimeout((function(){e.included&&e.isNotSync?e.control.setValue(e.value):e.control.syncDotsPos()}))}},{key:"keydownHandle",value:function(t){var e=this;if(!this.useKeyboard||!this.states.has(Wt.Focus))return!1;var r=this.included&&this.marks,n=G(t,{direction:this.direction,max:r?this.control.markList.length-1:this.control.total,min:0,hook:this.keydownHook});if(n){t.preventDefault();var o=-1,i=0;r?(this.control.markList.some((function(t,r){return t.value===e.control.dotsValue[e.focusDotIndex]&&(o=n(r),!0)})),o<0?o=0:o>this.control.markList.length-1&&(o=this.control.markList.length-1),i=this.control.markList[o].pos):(o=n(this.control.getIndexByValue(this.control.dotsValue[this.focusDotIndex])),i=this.control.parseValue(this.control.getValueByIndex(o))),this.isCrossDot(i),this.control.setDotPos(i,this.focusDotIndex),this.syncValueByPos()}}},{key:"getPosByEvent",value:function(t){return W(t,this.$refs.rail,this.isReverse)[this.isHorizontal?"x":"y"]/this.scale}},{key:"renderSlot",value:function(t,e,r,n){var o=this.$createElement,i=this.$scopedSlots[t];return i?n?i(e):o("template",{slot:t},[i(e)]):r}},{key:"render",value:function(){var t=this,e=arguments[0];return e("div",s()([{ref:"container",class:this.containerClasses,style:this.containerStyles,on:{click:this.clickHandle,touchstart:this.dragStartOnProcess,mousedown:this.dragStartOnProcess}},this.$attrs]),[e("div",{ref:"rail",class:"vue-slider-rail",style:this.railStyle},[this.processArray.map((function(r,n){return t.renderSlot("process",r,e("div",{class:"vue-slider-process",key:"process-".concat(n),style:r.style}),!0)})),this.sliderMarks?e("div",{class:"vue-slider-marks"},[this.control.markList.map((function(r,n){var o;return t.renderSlot("mark",r,e("vue-slider-mark",{key:"mark-".concat(n),attrs:{mark:r,hideLabel:t.hideLabel,stepStyle:t.stepStyle,stepActiveStyle:t.stepActiveStyle,labelStyle:t.labelStyle,labelActiveStyle:t.labelActiveStyle},style:(o={},Rt(o,t.isHorizontal?"height":"width","100%"),Rt(o,t.isHorizontal?"width":"height",t.tailSize),Rt(o,t.mainDirection,"".concat(r.pos,"%")),o),on:{pressLabel:function(e){return t.clickable&&t.setValueByPos(e)}}},[t.renderSlot("step",r,null),t.renderSlot("label",r,null)]),!0)}))]):null,this.dots.map((function(r,n){var o;return e("vue-slider-dot",{ref:"dot-".concat(n),key:"dot-".concat(n),attrs:Dt({value:r.value,disabled:r.disabled,focus:r.focus,"dot-style":[r.style,r.disabled?r.disabledStyle:null,r.focus?r.focusStyle:null],tooltip:r.tooltip||t.tooltip,"tooltip-style":[t.tooltipStyle,r.tooltipStyle,r.disabled?r.tooltipDisabledStyle:null,r.focus?r.tooltipFocusStyle:null],"tooltip-formatter":Array.isArray(t.sliderTooltipFormatter)?t.sliderTooltipFormatter[n]:t.sliderTooltipFormatter,"tooltip-placement":t.tooltipDirections[n],role:"slider","aria-valuenow":r.value,"aria-valuemin":t.min,"aria-valuemax":t.max,"aria-orientation":t.isHorizontal?"horizontal":"vertical",tabindex:"0"},t.dotAttrs),style:[t.dotBaseStyle,(o={},Rt(o,t.mainDirection,"".concat(r.pos,"%")),Rt(o,"transition","".concat(t.mainDirection," ").concat(t.animateTime,"s")),o)],on:{"drag-start":function(){return t.dragStart(n)}},nativeOn:{focus:function(){return!r.disabled&&t.focus(n)},blur:function(){return t.blur()}}},[t.renderSlot("dot",r,null),t.renderSlot("tooltip",r,null)])})),this.renderSlot("default",{value:this.getValue()},null,!0)])])}},{key:"tailSize",get:function(){return F((this.isHorizontal?this.height:this.width)||Gt)}},{key:"containerClasses",get:function(){return["vue-slider",["vue-slider-".concat(this.direction)],{"vue-slider-disabled":this.disabled}]}},{key:"containerStyles",get:function(){var t=Array.isArray(this.dotSize)?this.dotSize:[this.dotSize,this.dotSize],e=Ot(t,2),r=e[0],n=e[1],o=this.width?F(this.width):this.isHorizontal?"auto":F(Gt),i=this.height?F(this.height):this.isHorizontal?F(Gt):"auto";return{padding:this.contained?"".concat(n/2,"px ").concat(r/2,"px"):this.isHorizontal?"".concat(n/2,"px 0"):"0 ".concat(r/2,"px"),width:o,height:i}}},{key:"processArray",get:function(){var t=this;return this.control.processArray.map((function(e,r){var n,o=Ot(e,3),i=o[0],a=o[1],s=o[2];if(i>a){var u=[a,i];i=u[0],a=u[1]}var l=t.isHorizontal?"width":"height";return{start:i,end:a,index:r,style:Dt(Dt((n={},Rt(n,t.isHorizontal?"height":"width","100%"),Rt(n,t.isHorizontal?"top":"left",0),Rt(n,t.mainDirection,"".concat(i,"%")),Rt(n,l,"".concat(a-i,"%")),Rt(n,"transitionProperty","".concat(l,",").concat(t.mainDirection)),Rt(n,"transitionDuration","".concat(t.animateTime,"s")),n),t.processStyle),s)}}))}},{key:"dotBaseStyle",get:function(){var t,e=Array.isArray(this.dotSize)?this.dotSize:[this.dotSize,this.dotSize],r=Ot(e,2),n=r[0],o=r[1];return t=this.isHorizontal?Rt({transform:"translate(".concat(this.isReverse?"50%":"-50%",", -50%)"),WebkitTransform:"translate(".concat(this.isReverse?"50%":"-50%",", -50%)"),top:"50%"},"ltr"===this.direction?"left":"right","0"):Rt({transform:"translate(-50%, ".concat(this.isReverse?"50%":"-50%",")"),WebkitTransform:"translate(-50%, ".concat(this.isReverse?"50%":"-50%",")"),left:"50%"},"btt"===this.direction?"bottom":"top","0"),Dt({width:"".concat(n,"px"),height:"".concat(o,"px")},t)}},{key:"mainDirection",get:function(){switch(this.direction){case"ltr":return"left";case"rtl":return"right";case"btt":return"bottom";case"ttb":return"top"}}},{key:"isHorizontal",get:function(){return"ltr"===this.direction||"rtl"===this.direction}},{key:"isReverse",get:function(){return"rtl"===this.direction||"btt"===this.direction}},{key:"tooltipDirections",get:function(){var t=this.tooltipPlacement||(this.isHorizontal?"top":"left");return Array.isArray(t)?t:this.dots.map((function(){return t}))}},{key:"dots",get:function(){var t=this;return this.control.dotsPos.map((function(e,r){return Dt({pos:e,index:r,value:t.control.dotsValue[r],focus:t.states.has(Wt.Focus)&&t.focusDotIndex===r,disabled:t.disabled,style:t.dotStyle},(Array.isArray(t.dotOptions)?t.dotOptions[r]:t.dotOptions)||{})}))}},{key:"animateTime",get:function(){return this.states.has(Wt.Drag)?0:this.duration}},{key:"canSort",get:function(){return this.order&&!this.minRange&&!this.maxRange&&!this.fixed&&this.enableCross}},{key:"sliderData",get:function(){var t=this;return this.isObjectArrayData(this.data)?this.data.map((function(e){return e[t.dataValue]})):this.isObjectData(this.data)?Object.keys(this.data):this.data}},{key:"sliderMarks",get:function(){var t=this;return this.marks?this.marks:this.isObjectArrayData(this.data)?function(e){var r={label:e};return t.data.some((function(n){return n[t.dataValue]===e&&(r.label=n[t.dataLabel],!0)})),r}:this.isObjectData(this.data)?this.data:void 0}},{key:"sliderTooltipFormatter",get:function(){var t=this;if(this.tooltipFormatter)return this.tooltipFormatter;if(this.isObjectArrayData(this.data))return function(e){var r=""+e;return t.data.some((function(n){return n[t.dataValue]===e&&(r=n[t.dataLabel],!0)})),r};if(this.isObjectData(this.data)){var e=this.data;return function(t){return e[t]}}}},{key:"isNotSync",get:function(){var t=this.control.dotsValue;return Array.isArray(this.value)?this.value.length!==t.length||this.value.some((function(e,r){return e!==t[r]})):this.value!==t[0]}},{key:"dragRange",get:function(){var t=this.dots[this.focusDotIndex-1],e=this.dots[this.focusDotIndex+1];return[t?t.pos:-1/0,e?e.pos:1/0]}}]),r}(c.a);return u([h("change",{default:0})],t.prototype,"value",void 0),u([p({type:Boolean,default:!1})],t.prototype,"silent",void 0),u([p({default:"ltr",validator:function(t){return["ltr","rtl","ttb","btt"].indexOf(t)>-1}})],t.prototype,"direction",void 0),u([p({type:[Number,String]})],t.prototype,"width",void 0),u([p({type:[Number,String]})],t.prototype,"height",void 0),u([p({default:14})],t.prototype,"dotSize",void 0),u([p({default:!1})],t.prototype,"contained",void 0),u([p({type:Number,default:0})],t.prototype,"min",void 0),u([p({type:Number,default:100})],t.prototype,"max",void 0),u([p({type:Number,default:1})],t.prototype,"interval",void 0),u([p({type:Boolean,default:!1})],t.prototype,"disabled",void 0),u([p({type:Boolean,default:!0})],t.prototype,"clickable",void 0),u([p({type:Boolean,default:!1})],t.prototype,"dragOnClick",void 0),u([p({type:Number,default:.5})],t.prototype,"duration",void 0),u([p({type:[Object,Array]})],t.prototype,"data",void 0),u([p({type:String,default:"value"})],t.prototype,"dataValue",void 0),u([p({type:String,default:"label"})],t.prototype,"dataLabel",void 0),u([p({type:Boolean,default:!1})],t.prototype,"lazy",void 0),u([p({type:String,validator:function(t){return["none","always","focus","hover","active"].indexOf(t)>-1},default:"active"})],t.prototype,"tooltip",void 0),u([p({type:[String,Array],validator:function(t){return(Array.isArray(t)?t:[t]).every((function(t){return["top","right","bottom","left"].indexOf(t)>-1}))}})],t.prototype,"tooltipPlacement",void 0),u([p({type:[String,Array,Function]})],t.prototype,"tooltipFormatter",void 0),u([p({type:Boolean,default:!0})],t.prototype,"useKeyboard",void 0),u([p(Function)],t.prototype,"keydownHook",void 0),u([p({type:Boolean,default:!0})],t.prototype,"enableCross",void 0),u([p({type:Boolean,default:!1})],t.prototype,"fixed",void 0),u([p({type:Boolean,default:!0})],t.prototype,"order",void 0),u([p(Number)],t.prototype,"minRange",void 0),u([p(Number)],t.prototype,"maxRange",void 0),u([p({type:[Boolean,Object,Array,Function],default:!1})],t.prototype,"marks",void 0),u([p({type:[Boolean,Function],default:!0})],t.prototype,"process",void 0),u([p({type:[Number]})],t.prototype,"zoom",void 0),u([p(Boolean)],t.prototype,"included",void 0),u([p(Boolean)],t.prototype,"adsorb",void 0),u([p(Boolean)],t.prototype,"hideLabel",void 0),u([p()],t.prototype,"dotOptions",void 0),u([p()],t.prototype,"dotAttrs",void 0),u([p()],t.prototype,"railStyle",void 0),u([p()],t.prototype,"processStyle",void 0),u([p()],t.prototype,"dotStyle",void 0),u([p()],t.prototype,"tooltipStyle",void 0),u([p()],t.prototype,"stepStyle",void 0),u([p()],t.prototype,"stepActiveStyle",void 0),u([p()],t.prototype,"labelStyle",void 0),u([p()],t.prototype,"labelActiveStyle",void 0),u([y("value")],t.prototype,"onValueChanged",null),t=u([f()({data:function(){return{control:null}},components:{VueSliderDot:j,VueSliderMark:U}})],t),t}(),qt=Xt;qt.VueSliderMark=U,qt.VueSliderDot=j;var Kt=qt;e["default"]=Kt}})["default"]}));
//# sourceMappingURL=vue-slider-component.umd.min.js.map
},{"vue":"QPfz"}],"Rkmr":[function(require,module,exports) {
var define;
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (e, t) {
  "object" === (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t(require("vue")) : "function" === typeof define && define.amd ? define([], t) : "object" === (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports["v-calendar"] = t(require("vue")) : e["v-calendar"] = t(e["Vue"]);
})("undefined" !== typeof self ? self : this, function (e) {
  return function (e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var a = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports;
    }

    return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (e) {
      "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" === _typeof(e) && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var a in e) {
        n.d(r, a, function (t) {
          return e[t];
        }.bind(null, a));
      }
      return r;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = "fb15");
  }({
    "00fd": function fd(e, t, n) {
      var r = n("9e69"),
          a = Object.prototype,
          o = a.hasOwnProperty,
          i = a.toString,
          s = r ? r.toStringTag : void 0;

      function c(e) {
        var t = o.call(e, s),
            n = e[s];

        try {
          e[s] = void 0;
          var r = !0;
        } catch (c) {}

        var a = i.call(e);
        return r && (t ? e[s] = n : delete e[s]), a;
      }

      e.exports = c;
    },
    "03dd": function dd(e, t, n) {
      var r = n("eac5"),
          a = n("57a5"),
          o = Object.prototype,
          i = o.hasOwnProperty;

      function s(e) {
        if (!r(e)) return a(e);
        var t = [];

        for (var n in Object(e)) {
          i.call(e, n) && "constructor" != n && t.push(n);
        }

        return t;
      }

      e.exports = s;
    },
    "0621": function _(e, t, n) {
      var r = n("9e69"),
          a = n("d370"),
          o = n("6747"),
          i = r ? r.isConcatSpreadable : void 0;

      function s(e) {
        return o(e) || a(e) || !!(i && e && e[i]);
      }

      e.exports = s;
    },
    "06cf": function cf(e, t, n) {
      var r = n("83ab"),
          a = n("d1e7"),
          o = n("5c6c"),
          i = n("fc6a"),
          s = n("c04e"),
          c = n("5135"),
          u = n("0cfb"),
          l = Object.getOwnPropertyDescriptor;
      t.f = r ? l : function (e, t) {
        if (e = i(e), t = s(t, !0), u) try {
          return l(e, t);
        } catch (n) {}
        if (c(e, t)) return o(!a.f.call(e, t), e[t]);
      };
    },
    "0733": function _(e, t, n) {
      "use strict";

      n.d(t, "b", function () {
        return o;
      }), n.d(t, "a", function () {
        return i;
      });
      var r = n("2fa3"),
          a = n("9404");

      var o = function o(e, t) {
        if (!e || !e.addEventListener || !Object(a["k"])(t)) return null;
        var n = !1,
            o = !1;

        var i = function i() {
          return n = !0;
        },
            s = function s() {
          return n = !1;
        },
            c = function c(e) {
          if (n) return n = !1, o = !0, void t(e);
          "click" !== e.type || o || t(e), o = !1;
        };

        return Object(r["k"])(e, "touchstart", i, {
          passive: !0
        }), Object(r["k"])(e, "touchmove", s, {
          passive: !0
        }), Object(r["k"])(e, "click", c, {
          passive: !0
        }), Object(r["k"])(e, "touchend", c, {
          passive: !0
        }), function () {
          Object(r["j"])(e, "touchstart", i), Object(r["j"])(e, "touchmove", s), Object(r["j"])(e, "click", c), Object(r["j"])(e, "touchend", c);
        };
      },
          i = function i(e, t, _ref) {
        var n = _ref.maxSwipeTime,
            o = _ref.minHorizontalSwipeDistance,
            i = _ref.maxVerticalSwipeDistance;
        if (!e || !e.addEventListener || !Object(a["k"])(t)) return null;
        var s = 0,
            c = 0,
            u = null,
            l = !1;

        function d(e) {
          var t = e.changedTouches[0];
          s = t.screenX, c = t.screenY, u = new Date().getTime(), l = !0;
        }

        function f(e) {
          if (!l) return;
          l = !1;
          var r = e.changedTouches[0],
              a = r.screenX - s,
              d = r.screenY - c,
              f = new Date().getTime() - u;

          if (f < n && Math.abs(a) >= o && Math.abs(d) <= i) {
            var _e2 = {
              toLeft: !1,
              toRight: !1
            };
            a < 0 ? _e2.toLeft = !0 : _e2.toRight = !0, t(_e2);
          }
        }

        return Object(r["k"])(e, "touchstart", d, {
          passive: !0
        }), Object(r["k"])(e, "touchend", f, {
          passive: !0
        }), function () {
          Object(r["j"])(e, "touchstart", d), Object(r["j"])(e, "touchend", f);
        };
      };
    },
    "07c7": function c7(e, t) {
      function n() {
        return !1;
      }

      e.exports = n;
    },
    "087d": function d(e, t) {
      function n(e, t) {
        var n = -1,
            r = t.length,
            a = e.length;

        while (++n < r) {
          e[a + n] = t[n];
        }

        return e;
      }

      e.exports = n;
    },
    "08cc": function cc(e, t, n) {
      var r = n("1a8c");

      function a(e) {
        return e === e && !r(e);
      }

      e.exports = a;
    },
    "08de": function de(e, t, n) {
      var r = n("d2e1");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("1921c65a", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    "0b07": function b07(e, t, n) {
      var r = n("34ac"),
          a = n("3698");

      function o(e, t) {
        var n = a(e, t);
        return r(n) ? n : void 0;
      }

      e.exports = o;
    },
    "0cfb": function cfb(e, t, n) {
      var r = n("83ab"),
          a = n("d039"),
          o = n("cc12");
      e.exports = !r && !a(function () {
        return 7 != Object.defineProperty(o("div"), "a", {
          get: function get() {
            return 7;
          }
        }).a;
      });
    },
    "0d24": function d24(e, t, n) {
      (function (e) {
        var r = n("2b3e"),
            a = n("07c7"),
            o = t && !t.nodeType && t,
            i = o && "object" == _typeof(e) && e && !e.nodeType && e,
            s = i && i.exports === o,
            c = s ? r.Buffer : void 0,
            u = c ? c.isBuffer : void 0,
            l = u || a;
        e.exports = l;
      }).call(this, n("62e4")(e));
    },
    "0da5": function da5(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-nav-header{display:flex;justify-content:space-between}.vc-nav-arrow{display:flex;justify-content:center;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;line-height:var(--leading-snug);border-width:2px;border-style:solid;border-color:transparent;border-radius:var(--rounded)}.vc-nav-arrow.is-left{margin-right:auto}.vc-nav-arrow.is-right{margin-left:auto}.vc-nav-arrow.is-disabled{opacity:.25;pointer-events:none;cursor:not-allowed}.vc-nav-arrow:hover{background-color:var(--gray-900)}.vc-nav-arrow:focus{border-color:var(--accent-600)}.vc-nav-title{color:var(--accent-100);font-weight:var(--font-bold);line-height:var(--leading-snug);padding:4px 8px;border-radius:var(--rounded);border-width:2px;border-style:solid;border-color:transparent;-webkit-user-select:none;user-select:none}.vc-nav-title:hover{background-color:var(--gray-900)}.vc-nav-title:focus{border-color:var(--accent-600)}.vc-nav-items{display:grid;grid-template-columns:repeat(3,1fr);grid-row-gap:2px;grid-column-gap:5px}.vc-nav-item{width:48px;text-align:center;line-height:var(--leading-snug);font-weight:var(--font-semibold);padding:4px 0;cursor:pointer;border-color:transparent;border-width:2px;border-style:solid;border-radius:var(--rounded);-webkit-user-select:none;user-select:none}.vc-nav-item:hover{color:var(--white);background-color:var(--gray-900);box-shadow:var(--shadow-inner)}.vc-nav-item.is-active{color:var(--accent-900);background:var(--accent-100);font-weight:var(--font-bold);box-shadow:var(--shadow)}.vc-nav-item.is-current{color:var(--accent-100);font-weight:var(--bold);border-color:var(--accent-100)}.vc-nav-item:focus{border-color:var(--accent-600)}.vc-nav-item.is-disabled{opacity:.25;pointer-events:none}.vc-is-dark .vc-nav-title{color:var(--gray-900)}.vc-is-dark .vc-nav-title:hover{background-color:var(--gray-200)}.vc-is-dark .vc-nav-title:focus{border-color:var(--accent-400)}.vc-is-dark .vc-nav-arrow:hover{background-color:var(--gray-200)}.vc-is-dark .vc-nav-arrow:focus{border-color:var(--accent-400)}.vc-is-dark .vc-nav-item:hover{color:var(--gray-900);background-color:var(--gray-200);box-shadow:none}.vc-is-dark .vc-nav-item.is-active{color:var(--white);background:var(--accent-500)}.vc-is-dark .vc-nav-item.is-current{color:var(--accent-600);border-color:var(--accent-500)}.vc-is-dark .vc-nav-item:focus{border-color:var(--accent-400)}", ""]), e.exports = t;
    },
    "0f0f": function f0f(e, t, n) {
      var r = n("8eeb"),
          a = n("9934");

      function o(e, t) {
        return e && r(t, a(t), e);
      }

      e.exports = o;
    },
    "0f5c": function f5c(e, t, n) {
      var r = n("159a");

      function a(e, t, n) {
        return null == e ? e : r(e, t, n);
      }

      e.exports = a;
    },
    "100e": function e(_e3, t, n) {
      var r = n("cd9d"),
          a = n("2286"),
          o = n("c1c9");

      function i(e, t) {
        return o(a(e, t, r), e + "");
      }

      _e3.exports = i;
    },
    1041: function _(e, t, n) {
      var r = n("8eeb"),
          a = n("a029");

      function o(e, t) {
        return r(e, a(e), t);
      }

      e.exports = o;
    },
    1290: function _(e, t) {
      function n(e) {
        var t = _typeof(e);

        return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;
      }

      e.exports = n;
    },
    1310: function _(e, t) {
      function n(e) {
        return null != e && "object" == _typeof(e);
      }

      e.exports = n;
    },
    1315: function _(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return d;
      });
      var r = n("8bbf"),
          a = n.n(r),
          o = n("9404");

      function i(e) {
        return Object(o["n"])(e) && (e = {
          min: e
        }), Object(o["h"])(e) || (e = [e]), e.map(function (e) {
          return Object(o["e"])(e, "raw") ? e.raw : Object(o["q"])(e, function (e, t) {
            return t = Object(o["d"])({
              min: "min-width",
              max: "max-width"
            }, t, t), "(".concat(t, ": ").concat(e, ")");
          }).join(" and ");
        }).join(", ");
      }

      var s = n("85a9");
      var c = !1,
          u = !1,
          l = null;

      function d() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : s;
        var t = arguments.length > 1 ? arguments[1] : undefined;
        l && !t || c || (c = !0, u = !0, l = new a.a({
          data: function data() {
            return {
              matches: [],
              queries: []
            };
          },
          methods: {
            refreshQueries: function refreshQueries() {
              var t = this;
              window && window.matchMedia && (this.queries = Object(o["r"])(e, function (e) {
                var n = window.matchMedia(i(e));
                return Object(o["k"])(n.addEventListener) ? n.addEventListener("change", t.refreshMatches) : n.addListener(t.refreshMatches), n;
              }), this.refreshMatches());
            },
            refreshMatches: function refreshMatches() {
              this.matches = Object(o["w"])(this.queries).filter(function (e) {
                return e[1].matches;
              }).map(function (e) {
                return e[0];
              });
            }
          }
        }), c = !1);
      }

      a.a.mixin({
        beforeCreate: function beforeCreate() {
          c || d();
        },
        mounted: function mounted() {
          u && l && (l.refreshQueries(), u = !1);
        },
        computed: {
          $screens: function $screens() {
            return function (e, t) {
              return l.matches.reduce(function (t, n) {
                return Object(o["e"])(e, n) ? e[n] : t;
              }, Object(o["o"])(t) ? e.default : t);
            };
          }
        }
      });
    },
    1368: function _(e, t, n) {
      var r = n("da03"),
          a = function () {
        var e = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }();

      function o(e) {
        return !!a && a in e;
      }

      e.exports = o;
    },
    1497: function _(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-svg-icon[data-v-19b6cf78]{display:inline-block;stroke:currentColor;stroke-width:0}.vc-svg-icon path[data-v-19b6cf78]{fill:currentColor}", ""]), e.exports = t;
    },
    "14c3": function c3(e, t, n) {
      var r = n("c6b6"),
          a = n("9263");

      e.exports = function (e, t) {
        var n = e.exec;

        if ("function" === typeof n) {
          var o = n.call(e, t);
          if ("object" !== _typeof(o)) throw TypeError("RegExp exec method returned something other than an Object or null");
          return o;
        }

        if ("RegExp" !== r(e)) throw TypeError("RegExp#exec called on incompatible receiver");
        return a.call(e, t);
      };
    },
    "159a": function a(e, t, n) {
      var r = n("32b3"),
          a = n("e2e4"),
          o = n("c098"),
          i = n("1a8c"),
          s = n("f4d6");

      function c(e, t, n, c) {
        if (!i(e)) return e;
        t = a(t, e);
        var u = -1,
            l = t.length,
            d = l - 1,
            f = e;

        while (null != f && ++u < l) {
          var p = s(t[u]),
              h = n;
          if ("__proto__" === p || "constructor" === p || "prototype" === p) return e;

          if (u != d) {
            var v = f[p];
            h = c ? c(v, p, f) : void 0, void 0 === h && (h = i(v) ? v : o(t[u + 1]) ? [] : {});
          }

          r(f, p, h), f = f[p];
        }

        return e;
      }

      e.exports = c;
    },
    "15f3": function f3(e, t, n) {
      var r = n("89d9"),
          a = n("8604");

      function o(e, t) {
        return r(e, t, function (t, n) {
          return a(e, n);
        });
      }

      e.exports = o;
    },
    "16c7": function c7(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-select[data-v-d1c68c60]{position:relative}.vc-select select[data-v-d1c68c60]{flex-grow:1;display:block;-webkit-appearance:none;appearance:none;width:52px;height:30px;font-size:var(--text-base);font-weight:var(--font-medium);text-align:left;background-color:var(--gray-200);border:2px solid;border-color:var(--gray-200);color:var(--gray-900);padding:0 20px 0 8px;border-radius:var(--rounded);line-height:var(--leading-tight);text-indent:0;cursor:pointer;-moz-padding-start:3px}.vc-select select[data-v-d1c68c60]:hover{color:var(--gray-600)}.vc-select select[data-v-d1c68c60]:focus{outline:0;border-color:var(--accent-400);background-color:var(--white)}.vc-select-arrow[data-v-d1c68c60]{display:flex;align-items:center;pointer-events:none;position:absolute;top:0;bottom:0;right:0;padding:0 4px 0 0;color:var(--gray-500)}.vc-select-arrow svg[data-v-d1c68c60]{width:16px;height:16px;fill:currentColor}.vc-is-dark select[data-v-d1c68c60]{background:var(--gray-700);color:var(--gray-100);border-color:var(--gray-700)}.vc-is-dark select[data-v-d1c68c60]:hover{color:var(--gray-400)}.vc-is-dark select[data-v-d1c68c60]:focus{border-color:var(--accent-500);background-color:var(--gray-800)}", ""]), e.exports = t;
    },
    1838: function _(e, t, n) {
      var r = n("c05f"),
          a = n("9b02"),
          o = n("8604"),
          i = n("f608"),
          s = n("08cc"),
          c = n("20ec"),
          u = n("f4d6"),
          l = 1,
          d = 2;

      function f(e, t) {
        return i(e) && s(t) ? c(u(e), t) : function (n) {
          var i = a(n, e);
          return void 0 === i && i === t ? o(n, e) : r(t, i, l | d);
        };
      }

      e.exports = f;
    },
    "18d8": function d8(e, t, n) {
      var r = n("234d"),
          a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
          o = /\\(\\)?/g,
          i = r(function (e) {
        var t = [];
        return 46 === e.charCodeAt(0) && t.push(""), e.replace(a, function (e, n, r, a) {
          t.push(r ? a.replace(o, "$1") : n || e);
        }), t;
      });
      e.exports = i;
    },
    "1a2d": function a2d(e, t, n) {
      var r = n("42a2"),
          a = n("1310"),
          o = "[object Map]";

      function i(e) {
        return a(e) && r(e) == o;
      }

      e.exports = i;
    },
    "1a8c": function a8c(e, t) {
      function n(e) {
        var t = _typeof(e);

        return null != e && ("object" == t || "function" == t);
      }

      e.exports = n;
    },
    "1bac": function bac(e, t, n) {
      var r = n("7d1f"),
          a = n("a029"),
          o = n("9934");

      function i(e) {
        return r(e, o, a);
      }

      e.exports = i;
    },
    "1be4": function be4(e, t, n) {
      var r = n("d066");
      e.exports = r("document", "documentElement");
    },
    "1c3c": function c3c(e, t, n) {
      var r = n("9e69"),
          a = n("2474"),
          o = n("9638"),
          i = n("a2be"),
          s = n("edfa"),
          c = n("ac41"),
          u = 1,
          l = 2,
          d = "[object Boolean]",
          f = "[object Date]",
          p = "[object Error]",
          h = "[object Map]",
          v = "[object Number]",
          b = "[object RegExp]",
          m = "[object Set]",
          g = "[object String]",
          y = "[object Symbol]",
          w = "[object ArrayBuffer]",
          x = "[object DataView]",
          D = r ? r.prototype : void 0,
          j = D ? D.valueOf : void 0;

      function O(e, t, n, r, D, O, k) {
        switch (n) {
          case x:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
            e = e.buffer, t = t.buffer;

          case w:
            return !(e.byteLength != t.byteLength || !O(new a(e), new a(t)));

          case d:
          case f:
          case v:
            return o(+e, +t);

          case p:
            return e.name == t.name && e.message == t.message;

          case b:
          case g:
            return e == t + "";

          case h:
            var M = s;

          case m:
            var P = r & u;
            if (M || (M = c), e.size != t.size && !P) return !1;
            var S = k.get(e);
            if (S) return S == t;
            r |= l, k.set(e, t);
            var Y = i(M(e), M(t), r, D, O, k);
            return k["delete"](e), Y;

          case y:
            if (j) return j.call(e) == j.call(t);
        }

        return !1;
      }

      e.exports = O;
    },
    "1cec": function cec(e, t, n) {
      var r = n("0b07"),
          a = n("2b3e"),
          o = r(a, "Promise");
      e.exports = o;
    },
    "1d80": function d80(e, t) {
      e.exports = function (e) {
        if (void 0 == e) throw TypeError("Can't call method on " + e);
        return e;
      };
    },
    "1efc": function efc(e, t) {
      function n(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }

      e.exports = n;
    },
    "1fc8": function fc8(e, t, n) {
      var r = n("4245");

      function a(e, t) {
        var n = r(this, e),
            a = n.size;
        return n.set(e, t), this.size += n.size == a ? 0 : 1, this;
      }

      e.exports = a;
    },
    "20ec": function ec(e, t) {
      function n(e, t) {
        return function (n) {
          return null != n && n[e] === t && (void 0 !== t || e in Object(n));
        };
      }

      e.exports = n;
    },
    2286: function _(e, t, n) {
      var r = n("85e3"),
          a = Math.max;

      function o(e, t, n) {
        return t = a(void 0 === t ? e.length - 1 : t, 0), function () {
          var o = arguments,
              i = -1,
              s = a(o.length - t, 0),
              c = Array(s);

          while (++i < s) {
            c[i] = o[t + i];
          }

          i = -1;
          var u = Array(t + 1);

          while (++i < t) {
            u[i] = o[i];
          }

          return u[t] = n(c), r(e, this, u);
        };
      }

      e.exports = o;
    },
    "22f3": function f3(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return i;
      });
      var r = n("cfe5"),
          a = n("2fa3"),
          o = n("9404");

      var i = /*#__PURE__*/function () {
        function i(_ref2, b, m) {
          var e = _ref2.key,
              t = _ref2.hashcode,
              n = _ref2.highlight,
              _i = _ref2.content,
              s = _ref2.dot,
              c = _ref2.bar,
              u = _ref2.popover,
              l = _ref2.dates,
              d = _ref2.excludeDates,
              f = _ref2.excludeMode,
              p = _ref2.customData,
              h = _ref2.order,
              v = _ref2.pinPage;

          _classCallCheck(this, i);

          this.key = Object(o["o"])(e) ? Object(a["c"])() : e, this.hashcode = t, this.customData = p, this.order = h || 0, this.dateOpts = {
            order: h,
            locale: m
          }, this.pinPage = v, n && (this.highlight = b.normalizeHighlight(n)), _i && (this.content = b.normalizeContent(_i)), s && (this.dot = b.normalizeDot(s)), c && (this.bar = b.normalizeBar(c)), u && (this.popover = u), this.dates = m.normalizeDates(l, this.dateOpts), this.hasDates = !!Object(a["b"])(this.dates), this.excludeDates = m.normalizeDates(d, this.dateOpts), this.hasExcludeDates = !!Object(a["b"])(this.excludeDates), this.excludeMode = f || "intersects", this.hasExcludeDates && !this.hasDates && (this.dates.push(new r["a"]({}, this.dateOpts)), this.hasDates = !0), this.isComplex = Object(o["v"])(this.dates, function (e) {
            return e.isComplex;
          });
        }

        _createClass(i, [{
          key: "intersectsDate",
          value: function intersectsDate(e) {
            return e = e instanceof r["a"] ? e : new r["a"](e, this.dateOpts), !this.excludesDate(e) && (this.dates.find(function (t) {
              return t.intersectsDate(e);
            }) || !1);
          }
        }, {
          key: "includesDate",
          value: function includesDate(e) {
            return e = e instanceof r["a"] ? e : new r["a"](e, this.dateOpts), !this.excludesDate(e) && (this.dates.find(function (t) {
              return t.includesDate(e);
            }) || !1);
          }
        }, {
          key: "excludesDate",
          value: function excludesDate(e) {
            var t = this;
            return e = e instanceof r["a"] ? e : new r["a"](e, this.dateOpts), this.hasExcludeDates && this.excludeDates.find(function (n) {
              return "intersects" === t.excludeMode && n.intersectsDate(e) || "includes" === t.excludeMode && n.includesDate(e);
            });
          }
        }, {
          key: "intersectsDay",
          value: function intersectsDay(e) {
            return !this.excludesDay(e) && (this.dates.find(function (t) {
              return t.intersectsDay(e);
            }) || !1);
          }
        }, {
          key: "excludesDay",
          value: function excludesDay(e) {
            return this.hasExcludeDates && this.excludeDates.find(function (t) {
              return t.intersectsDay(e);
            });
          }
        }]);

        return i;
      }();
    },
    "234d": function d(e, t, n) {
      var r = n("e380"),
          a = 500;

      function o(e) {
        var t = r(e, function (e) {
          return n.size === a && n.clear(), e;
        }),
            n = t.cache;
        return t;
      }

      e.exports = o;
    },
    "23a5": function a5(e) {
      e.exports = JSON.parse('{"maxSwipeTime":300,"minHorizontalSwipeDistance":60,"maxVerticalSwipeDistance":80}');
    },
    "23cb": function cb(e, t, n) {
      var r = n("a691"),
          a = Math.max,
          o = Math.min;

      e.exports = function (e, t) {
        var n = r(e);
        return n < 0 ? a(n + t, 0) : o(n, t);
      };
    },
    "23e7": function e7(e, t, n) {
      var r = n("da84"),
          a = n("06cf").f,
          o = n("9112"),
          i = n("6eeb"),
          s = n("ce4e"),
          c = n("e893"),
          u = n("94ca");

      e.exports = function (e, t) {
        var n,
            l,
            d,
            f,
            p,
            h,
            v = e.target,
            b = e.global,
            m = e.stat;
        if (l = b ? r : m ? r[v] || s(v, {}) : (r[v] || {}).prototype, l) for (d in t) {
          if (p = t[d], e.noTargetGet ? (h = a(l, d), f = h && h.value) : f = l[d], n = u(b ? d : v + (m ? "." : "#") + d, e.forced), !n && void 0 !== f) {
            if (_typeof(p) === _typeof(f)) continue;
            c(p, f);
          }

          (e.sham || f && f.sham) && o(p, "sham", !0), i(l, d, p, e);
        }
      };
    },
    2411: function _(e, t, n) {
      var r = n("f909"),
          a = n("2ec1"),
          o = a(function (e, t, n, a) {
        r(e, t, n, a);
      });
      e.exports = o;
    },
    "241c": function c(e, t, n) {
      var r = n("ca84"),
          a = n("7839"),
          o = a.concat("length", "prototype");

      t.f = Object.getOwnPropertyNames || function (e) {
        return r(e, o);
      };
    },
    "242e": function e(_e4, t, n) {
      var r = n("72af"),
          a = n("ec69");

      function o(e, t) {
        return e && r(e, t, a);
      }

      _e4.exports = o;
    },
    2474: function _(e, t, n) {
      var r = n("2b3e"),
          a = r.Uint8Array;
      e.exports = a;
    },
    2478: function _(e, t, n) {
      var r = n("4245");

      function a(e) {
        return r(this, e).get(e);
      }

      e.exports = a;
    },
    "24fb": function fb(e, t, n) {
      "use strict";

      function r(e, t) {
        var n = e[1] || "",
            r = e[3];
        if (!r) return n;

        if (t && "function" === typeof btoa) {
          var o = a(r),
              i = r.sources.map(function (e) {
            return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */");
          });
          return [n].concat(i).concat([o]).join("\n");
        }

        return [n].join("\n");
      }

      function a(e) {
        var t = btoa(unescape(encodeURIComponent(JSON.stringify(e)))),
            n = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);
        return "/*# ".concat(n, " */");
      }

      e.exports = function (e) {
        var t = [];
        return t.toString = function () {
          return this.map(function (t) {
            var n = r(t, e);
            return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
          }).join("");
        }, t.i = function (e, n, r) {
          "string" === typeof e && (e = [[null, e, ""]]);
          var a = {};
          if (r) for (var o = 0; o < this.length; o++) {
            var i = this[o][0];
            null != i && (a[i] = !0);
          }

          for (var s = 0; s < e.length; s++) {
            var c = [].concat(e[s]);
            r && a[c[0]] || (n && (c[2] ? c[2] = "".concat(n, " and ").concat(c[2]) : c[2] = n), t.push(c));
          }
        }, t;
      };
    },
    2524: function _(e, t, n) {
      var r = n("6044"),
          a = "__lodash_hash_undefined__";

      function o(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = r && void 0 === t ? a : t, this;
      }

      e.exports = o;
    },
    "253c": function c(e, t, n) {
      var r = n("3729"),
          a = n("1310"),
          o = "[object Arguments]";

      function i(e) {
        return a(e) && r(e) == o;
      }

      e.exports = i;
    },
    "255e": function e(_e5, t, n) {
      var r = n("5905");
      "string" === typeof r && (r = [[_e5.i, r, ""]]), r.locals && (_e5.exports = r.locals);
      var a = n("499e").default;
      a("4d4bd8d9", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    2593: function _(e, t, n) {
      var r = n("15f3"),
          a = n("c6cf"),
          o = a(function (e, t) {
        return null == e ? {} : r(e, t);
      });
      e.exports = o;
    },
    "26e8": function e8(e, t) {
      function n(e, t) {
        return null != e && t in Object(e);
      }

      e.exports = n;
    },
    "28c9": function c9(e, t) {
      function n() {
        this.__data__ = [], this.size = 0;
      }

      e.exports = n;
    },
    "29ae": function ae(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return re;
      }), n.d(t, "b", function () {
        return ye;
      });
      n("5319");
      var r = n("fe1f"),
          a = 6e4;

      function o(e) {
        return e.getTime() % a;
      }

      function i(e) {
        var t = new Date(e.getTime()),
            n = Math.ceil(t.getTimezoneOffset());
        t.setSeconds(0, 0);
        var r = n > 0,
            i = r ? (a + o(t)) % a : o(t);
        return n * a + i;
      }

      function s(e, t) {
        var n = f(t);
        return n.formatToParts ? u(n, e) : l(n, e);
      }

      var c = {
        year: 0,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5
      };

      function u(e, t) {
        for (var n = e.formatToParts(t), r = [], a = 0; a < n.length; a++) {
          var o = c[n[a].type];
          o >= 0 && (r[o] = parseInt(n[a].value, 10));
        }

        return r;
      }

      function l(e, t) {
        var n = e.format(t).replace(/\u200E/g, ""),
            r = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(n);
        return [r[3], r[1], r[2], r[4], r[5], r[6]];
      }

      var d = {};

      function f(e) {
        if (!d[e]) {
          var t = new Intl.DateTimeFormat("en-US", {
            hour12: !1,
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }).format(new Date("2014-06-25T04:00:00.123Z")),
              n = "06/25/2014, 00:00:00" === t || "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00" === t;
          d[e] = n ? new Intl.DateTimeFormat("en-US", {
            hour12: !1,
            timeZone: e,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }) : new Intl.DateTimeFormat("en-US", {
            hourCycle: "h23",
            timeZone: e,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
        }

        return d[e];
      }

      var p = 36e5,
          h = 6e4,
          v = {
        timezone: /([Z+-].*)$/,
        timezoneZ: /^(Z)$/,
        timezoneHH: /^([+-])(\d{2})$/,
        timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/,
        timezoneIANA: /(UTC|(?:[a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?))$/
      };

      function b(e, t) {
        var n, r, a;
        if (n = v.timezoneZ.exec(e), n) return 0;
        if (n = v.timezoneHH.exec(e), n) return a = parseInt(n[2], 10), m(a) ? (r = a * p, "+" === n[1] ? -r : r) : NaN;

        if (n = v.timezoneHHMM.exec(e), n) {
          a = parseInt(n[2], 10);
          var o = parseInt(n[3], 10);
          return m(a, o) ? (r = a * p + o * h, "+" === n[1] ? -r : r) : NaN;
        }

        if (n = v.timezoneIANA.exec(e), n) {
          var i = s(t, e),
              c = Date.UTC(i[0], i[1] - 1, i[2], i[3], i[4], i[5]),
              u = t.getTime() - t.getTime() % 1e3;
          return -(c - u);
        }

        return 0;
      }

      function m(e, t) {
        return null == t || !(t < 0 || t > 59);
      }

      var g = 36e5,
          y = 6e4,
          w = 2,
          x = {
        dateTimeDelimeter: /[T ]/,
        plainTime: /:/,
        timeZoneDelimeter: /[Z ]/i,
        YY: /^(\d{2})$/,
        YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/],
        YYYY: /^(\d{4})/,
        YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/],
        MM: /^-(\d{2})$/,
        DDD: /^-?(\d{3})$/,
        MMDD: /^-?(\d{2})-?(\d{2})$/,
        Www: /^-?W(\d{2})$/,
        WwwD: /^-?W(\d{2})-?(\d{1})$/,
        HH: /^(\d{2}([.,]\d*)?)$/,
        HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
        HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
        timezone: /([Z+-].*| UTC|(?:[a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?))$/
      };

      function D(e, t) {
        if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
        if (null === e) return new Date(NaN);
        var n = t || {},
            a = null == n.additionalDigits ? w : Object(r["a"])(n.additionalDigits);
        if (2 !== a && 1 !== a && 0 !== a) throw new RangeError("additionalDigits must be 0, 1 or 2");
        if (e instanceof Date || "object" === _typeof(e) && "[object Date]" === Object.prototype.toString.call(e)) return new Date(e.getTime());
        if ("number" === typeof e || "[object Number]" === Object.prototype.toString.call(e)) return new Date(e);
        if ("string" !== typeof e && "[object String]" !== Object.prototype.toString.call(e)) return new Date(NaN);
        var o = j(e),
            s = O(o.date, a),
            c = s.year,
            u = s.restDateString,
            l = k(u, c);
        if (isNaN(l)) return new Date(NaN);

        if (l) {
          var d,
              f = l.getTime(),
              p = 0;
          if (o.time && (p = M(o.time), isNaN(p))) return new Date(NaN);

          if (o.timezone || n.timeZone) {
            if (d = b(o.timezone || n.timeZone, new Date(f + p)), isNaN(d)) return new Date(NaN);
            if (d = b(o.timezone || n.timeZone, new Date(f + p + d)), isNaN(d)) return new Date(NaN);
          } else d = i(new Date(f + p)), d = i(new Date(f + p + d));

          return new Date(f + p + d);
        }

        return new Date(NaN);
      }

      function j(e) {
        var t,
            n = {},
            r = e.split(x.dateTimeDelimeter);

        if (x.plainTime.test(r[0]) ? (n.date = null, t = r[0]) : (n.date = r[0], t = r[1], n.timezone = r[2], x.timeZoneDelimeter.test(n.date) && (n.date = e.split(x.timeZoneDelimeter)[0], t = e.substr(n.date.length, e.length))), t) {
          var a = x.timezone.exec(t);
          a ? (n.time = t.replace(a[1], ""), n.timezone = a[1]) : n.time = t;
        }

        return n;
      }

      function O(e, t) {
        var n,
            r = x.YYY[t],
            a = x.YYYYY[t];

        if (n = x.YYYY.exec(e) || a.exec(e), n) {
          var o = n[1];
          return {
            year: parseInt(o, 10),
            restDateString: e.slice(o.length)
          };
        }

        if (n = x.YY.exec(e) || r.exec(e), n) {
          var i = n[1];
          return {
            year: 100 * parseInt(i, 10),
            restDateString: e.slice(i.length)
          };
        }

        return {
          year: null
        };
      }

      function k(e, t) {
        if (null === t) return null;
        var n, r, a, o;
        if (0 === e.length) return r = new Date(0), r.setUTCFullYear(t), r;
        if (n = x.MM.exec(e), n) return r = new Date(0), a = parseInt(n[1], 10) - 1, _(t, a) ? (r.setUTCFullYear(t, a), r) : new Date(NaN);

        if (n = x.DDD.exec(e), n) {
          r = new Date(0);
          var i = parseInt(n[1], 10);
          return T(t, i) ? (r.setUTCFullYear(t, 0, i), r) : new Date(NaN);
        }

        if (n = x.MMDD.exec(e), n) {
          r = new Date(0), a = parseInt(n[1], 10) - 1;
          var s = parseInt(n[2], 10);
          return _(t, a, s) ? (r.setUTCFullYear(t, a, s), r) : new Date(NaN);
        }

        if (n = x.Www.exec(e), n) return o = parseInt(n[1], 10) - 1, I(t, o) ? P(t, o) : new Date(NaN);

        if (n = x.WwwD.exec(e), n) {
          o = parseInt(n[1], 10) - 1;
          var c = parseInt(n[2], 10) - 1;
          return I(t, o, c) ? P(t, o, c) : new Date(NaN);
        }

        return null;
      }

      function M(e) {
        var t, n, r;
        if (t = x.HH.exec(e), t) return n = parseFloat(t[1].replace(",", ".")), C(n) ? n % 24 * g : NaN;
        if (t = x.HHMM.exec(e), t) return n = parseInt(t[1], 10), r = parseFloat(t[2].replace(",", ".")), C(n, r) ? n % 24 * g + r * y : NaN;

        if (t = x.HHMMSS.exec(e), t) {
          n = parseInt(t[1], 10), r = parseInt(t[2], 10);
          var a = parseFloat(t[3].replace(",", "."));
          return C(n, r, a) ? n % 24 * g + r * y + 1e3 * a : NaN;
        }

        return null;
      }

      function P(e, t, n) {
        t = t || 0, n = n || 0;
        var r = new Date(0);
        r.setUTCFullYear(e, 0, 4);
        var a = r.getUTCDay() || 7,
            o = 7 * t + n + 1 - a;
        return r.setUTCDate(r.getUTCDate() + o), r;
      }

      var S = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          Y = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      function E(e) {
        return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
      }

      function _(e, t, n) {
        if (t < 0 || t > 11) return !1;

        if (null != n) {
          if (n < 1) return !1;
          var r = E(e);
          if (r && n > Y[t]) return !1;
          if (!r && n > S[t]) return !1;
        }

        return !0;
      }

      function T(e, t) {
        if (t < 1) return !1;
        var n = E(e);
        return !(n && t > 366) && !(!n && t > 365);
      }

      function I(e, t, n) {
        return !(t < 0 || t > 52) && (null == n || !(n < 0 || n > 6));
      }

      function C(e, t, n) {
        return (null == e || !(e < 0 || e >= 25)) && (null == t || !(t < 0 || t >= 60)) && (null == n || !(n < 0 || n >= 60));
      }

      var $ = n("fd3a"),
          A = n("8c86");

      function N(e, t) {
        Object(A["a"])(1, arguments);
        var n = t || {},
            a = n.locale,
            o = a && a.options && a.options.weekStartsOn,
            i = null == o ? 0 : Object(r["a"])(o),
            s = null == n.weekStartsOn ? i : Object(r["a"])(n.weekStartsOn);
        if (!(s >= 0 && s <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
        var c = Object($["a"])(e),
            u = c.getDay(),
            l = (u < s ? 7 : 0) + u - s;
        return c.setDate(c.getDate() - l), c.setHours(0, 0, 0, 0), c;
      }

      function F(e) {
        return Object(A["a"])(1, arguments), N(e, {
          weekStartsOn: 1
        });
      }

      function z(e) {
        Object(A["a"])(1, arguments);
        var t = Object($["a"])(e),
            n = t.getFullYear(),
            r = new Date(0);
        r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
        var a = F(r),
            o = new Date(0);
        o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
        var i = F(o);
        return t.getTime() >= a.getTime() ? n + 1 : t.getTime() >= i.getTime() ? n : n - 1;
      }

      function L(e) {
        Object(A["a"])(1, arguments);
        var t = z(e),
            n = new Date(0);
        n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0);
        var r = F(n);
        return r;
      }

      var H = 6048e5;

      function R(e) {
        Object(A["a"])(1, arguments);
        var t = Object($["a"])(e),
            n = F(t).getTime() - L(t).getTime();
        return Math.round(n / H) + 1;
      }

      function W(e, t) {
        Object(A["a"])(1, arguments);
        var n = Object($["a"])(e),
            a = n.getFullYear(),
            o = t || {},
            i = o.locale,
            s = i && i.options && i.options.firstWeekContainsDate,
            c = null == s ? 1 : Object(r["a"])(s),
            u = null == o.firstWeekContainsDate ? c : Object(r["a"])(o.firstWeekContainsDate);
        if (!(u >= 1 && u <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
        var l = new Date(0);
        l.setFullYear(a + 1, 0, u), l.setHours(0, 0, 0, 0);
        var d = N(l, t),
            f = new Date(0);
        f.setFullYear(a, 0, u), f.setHours(0, 0, 0, 0);
        var p = N(f, t);
        return n.getTime() >= d.getTime() ? a + 1 : n.getTime() >= p.getTime() ? a : a - 1;
      }

      function V(e, t) {
        Object(A["a"])(1, arguments);
        var n = t || {},
            a = n.locale,
            o = a && a.options && a.options.firstWeekContainsDate,
            i = null == o ? 1 : Object(r["a"])(o),
            s = null == n.firstWeekContainsDate ? i : Object(r["a"])(n.firstWeekContainsDate),
            c = W(e, t),
            u = new Date(0);
        u.setFullYear(c, 0, s), u.setHours(0, 0, 0, 0);
        var l = N(u, t);
        return l;
      }

      var U = 6048e5;

      function B(e, t) {
        Object(A["a"])(1, arguments);
        var n = Object($["a"])(e),
            r = N(n, t).getTime() - V(n, t).getTime();
        return Math.round(r / U) + 1;
      }

      var Z = 6048e5;

      function q(e, t, n) {
        Object(A["a"])(2, arguments);
        var r = N(e, n),
            a = N(t, n),
            o = r.getTime() - i(r),
            s = a.getTime() - i(a);
        return Math.round((o - s) / Z);
      }

      function G(e) {
        Object(A["a"])(1, arguments);
        var t = Object($["a"])(e),
            n = t.getMonth();
        return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(0, 0, 0, 0), t;
      }

      function K(e) {
        Object(A["a"])(1, arguments);
        var t = Object($["a"])(e);
        return t.setDate(1), t.setHours(0, 0, 0, 0), t;
      }

      function X(e, t) {
        return Object(A["a"])(1, arguments), q(G(e), K(e), t) + 1;
      }

      var J = n("f7f1"),
          Q = n("cfe5"),
          ee = n("f15d"),
          te = n("2fa3"),
          ne = n("9404");

      var re = {
        DATE_TIME: 1,
        DATE: 2,
        TIME: 3
      },
          ae = {
        1: ["year", "month", "day", "hours", "minutes", "seconds", "milliseconds"],
        2: ["year", "month", "day"],
        3: ["hours", "minutes", "seconds", "milliseconds"]
      },
          oe = /d{1,2}|W{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|Z{1,4}|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
          ie = /\d\d?/,
          se = /\d{3}/,
          ce = /\d{4}/,
          ue = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
          le = /\[([^]*?)\]/gm,
          de = function de() {},
          fe = function fe(e) {
        return function (t, n, r) {
          var a = r[e].indexOf(n.charAt(0).toUpperCase() + n.substr(1).toLowerCase());
          ~a && (t.month = a);
        };
      },
          pe = ["L", "iso"],
          he = 7,
          ve = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          be = {
        D: function D(e) {
          return e.day;
        },
        DD: function DD(e) {
          return Object(te["m"])(e.day);
        },
        Do: function Do(e, t) {
          return t.DoFn(e.day);
        },
        d: function d(e) {
          return e.weekday - 1;
        },
        dd: function dd(e) {
          return Object(te["m"])(e.weekday - 1);
        },
        W: function W(e, t) {
          return t.dayNamesNarrow[e.weekday - 1];
        },
        WW: function WW(e, t) {
          return t.dayNamesShorter[e.weekday - 1];
        },
        WWW: function WWW(e, t) {
          return t.dayNamesShort[e.weekday - 1];
        },
        WWWW: function WWWW(e, t) {
          return t.dayNames[e.weekday - 1];
        },
        M: function M(e) {
          return e.month;
        },
        MM: function MM(e) {
          return Object(te["m"])(e.month);
        },
        MMM: function MMM(e, t) {
          return t.monthNamesShort[e.month - 1];
        },
        MMMM: function MMMM(e, t) {
          return t.monthNames[e.month - 1];
        },
        YY: function YY(e) {
          return String(e.year).substr(2);
        },
        YYYY: function YYYY(e) {
          return Object(te["m"])(e.year, 4);
        },
        h: function h(e) {
          return e.hours % 12 || 12;
        },
        hh: function hh(e) {
          return Object(te["m"])(e.hours % 12 || 12);
        },
        H: function H(e) {
          return e.hours;
        },
        HH: function HH(e) {
          return Object(te["m"])(e.hours);
        },
        m: function m(e) {
          return e.minutes;
        },
        mm: function mm(e) {
          return Object(te["m"])(e.minutes);
        },
        s: function s(e) {
          return e.seconds;
        },
        ss: function ss(e) {
          return Object(te["m"])(e.seconds);
        },
        S: function S(e) {
          return Math.round(e.milliseconds / 100);
        },
        SS: function SS(e) {
          return Object(te["m"])(Math.round(e.milliseconds / 10), 2);
        },
        SSS: function SSS(e) {
          return Object(te["m"])(e.milliseconds, 3);
        },
        a: function a(e, t) {
          return e.hours < 12 ? t.amPm[0] : t.amPm[1];
        },
        A: function A(e, t) {
          return e.hours < 12 ? t.amPm[0].toUpperCase() : t.amPm[1].toUpperCase();
        },
        Z: function Z() {
          return "Z";
        },
        ZZ: function ZZ(e) {
          var t = e.timezoneOffset;
          return "".concat(t > 0 ? "-" : "+").concat(Object(te["m"])(Math.floor(Math.abs(t) / 60), 2));
        },
        ZZZ: function ZZZ(e) {
          var t = e.timezoneOffset;
          return "".concat(t > 0 ? "-" : "+").concat(Object(te["m"])(100 * Math.floor(Math.abs(t) / 60) + Math.abs(t) % 60, 4));
        },
        ZZZZ: function ZZZZ(e) {
          var t = e.timezoneOffset;
          return "".concat(t > 0 ? "-" : "+").concat(Object(te["m"])(Math.floor(Math.abs(t) / 60), 2), ":").concat(Object(te["m"])(Math.abs(t) % 60, 2));
        }
      },
          me = {
        D: [ie, function (e, t) {
          e.day = t;
        }],
        Do: [new RegExp(ie.source + ue.source), function (e, t) {
          e.day = parseInt(t, 10);
        }],
        d: [ie, de],
        W: [ue, de],
        M: [ie, function (e, t) {
          e.month = t - 1;
        }],
        MMM: [ue, fe("monthNamesShort")],
        MMMM: [ue, fe("monthNames")],
        YY: [ie, function (e, t) {
          var n = new Date(),
              r = +n.getFullYear().toString().substr(0, 2);
          e.year = "".concat(t > 68 ? r - 1 : r).concat(t);
        }],
        YYYY: [ce, function (e, t) {
          e.year = t;
        }],
        S: [/\d/, function (e, t) {
          e.millisecond = 100 * t;
        }],
        SS: [/\d{2}/, function (e, t) {
          e.millisecond = 10 * t;
        }],
        SSS: [se, function (e, t) {
          e.millisecond = t;
        }],
        h: [ie, function (e, t) {
          e.hour = t;
        }],
        m: [ie, function (e, t) {
          e.minute = t;
        }],
        s: [ie, function (e, t) {
          e.second = t;
        }],
        a: [ue, function (e, t, n) {
          var r = t.toLowerCase();
          r === n.amPm[0] ? e.isPm = !1 : r === n.amPm[1] && (e.isPm = !0);
        }],
        Z: [/[^\s]*?[+-]\d\d:?\d\d|[^\s]*?Z?/, function (e, t) {
          "Z" === t && (t = "+00:00");
          var n = ("" + t).match(/([+-]|\d\d)/gi);

          if (n) {
            var _t2 = 60 * n[1] + parseInt(n[2], 10);

            e.timezoneOffset = "+" === n[0] ? _t2 : -_t2;
          }
        }]
      };

      function ge(e, t) {
        var n = new Intl.DateTimeFormat().resolvedOptions().locale;
        var r;
        Object(ne["n"])(e) ? r = e : Object(ne["e"])(e, "id") && (r = e.id), r = (r || n).toLowerCase();

        var a = Object.keys(t),
            o = function o(e) {
          return a.find(function (t) {
            return t.toLowerCase() === e;
          });
        };

        r = o(r) || o(r.substring(0, 2)) || n;

        var i = _objectSpread(_objectSpread(_objectSpread({}, t["en-IE"]), t[r]), {}, {
          id: r
        });

        return e = Object(ne["m"])(e) ? Object(ne["c"])(e, i) : i, e;
      }

      me.DD = me.D, me.dd = me.d, me.WWWW = me.WWW = me.WW = me.W, me.MM = me.M, me.mm = me.m, me.hh = me.H = me.HH = me.h, me.ss = me.s, me.A = me.a, me.ZZZZ = me.ZZZ = me.ZZ = me.Z;

      var ye = /*#__PURE__*/function () {
        function ye(e) {
          var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref3$locales = _ref3.locales,
              t = _ref3$locales === void 0 ? ee["a"] : _ref3$locales,
              n = _ref3.timezone;

          _classCallCheck(this, ye);

          var _ge = ge(e, t),
              r = _ge.id,
              a = _ge.firstDayOfWeek,
              o = _ge.masks;

          this.id = r, this.daysInWeek = he, this.firstDayOfWeek = Object(ne["a"])(a, 1, he), this.masks = o, this.timezone = n || void 0, this.dayNames = this.getDayNames("long"), this.dayNamesShort = this.getDayNames("short"), this.dayNamesShorter = this.dayNamesShort.map(function (e) {
            return e.substring(0, 2);
          }), this.dayNamesNarrow = this.getDayNames("narrow"), this.monthNames = this.getMonthNames("long"), this.monthNamesShort = this.getMonthNames("short"), this.amPm = ["am", "pm"], this.monthData = {}, this.getMonthComps = this.getMonthComps.bind(this), this.parse = this.parse.bind(this), this.format = this.format.bind(this), this.toPage = this.toPage.bind(this);
        }

        _createClass(ye, [{
          key: "format",
          value: function format(e, t) {
            var n = this;
            if (e = this.normalizeDate(e), !e) return "";
            t = this.normalizeMasks(t)[0];
            var r = [];
            t = t.replace(le, function (e, t) {
              return r.push(t), "??";
            });
            var a = /Z$/.test(t) ? "utc" : this.timezone,
                o = this.getDateParts(e, a);
            return t = t.replace(oe, function (e) {
              return e in be ? be[e](o, n) : e.slice(1, e.length - 1);
            }), t.replace(/\?\?/g, function () {
              return r.shift();
            });
          }
        }, {
          key: "parse",
          value: function parse(e, t) {
            var n = this;
            var r = this.normalizeMasks(t);
            return r.map(function (t) {
              if ("string" !== typeof t) throw new Error("Invalid mask in fecha.parse");
              var r = e;
              if (r.length > 1e3) return !1;
              var a = !0;
              var o = {};
              if (t.replace(oe, function (e) {
                if (me[e]) {
                  var _t3 = me[e],
                      _i2 = r.search(_t3[0]);

                  ~_i2 ? r.replace(_t3[0], function (e) {
                    return _t3[1](o, e, n), r = r.substr(_i2 + e.length), e;
                  }) : a = !1;
                }

                return me[e] ? "" : e.slice(1, e.length - 1);
              }), !a) return !1;
              var i = new Date();
              var s;
              return !0 === o.isPm && null != o.hour && 12 !== +o.hour ? o.hour = +o.hour + 12 : !1 === o.isPm && 12 === +o.hour && (o.hour = 0), null != o.timezoneOffset ? (o.minute = +(o.minute || 0) - +o.timezoneOffset, s = new Date(Date.UTC(o.year || i.getFullYear(), o.month || 0, o.day || 1, o.hour || 0, o.minute || 0, o.second || 0, o.millisecond || 0))) : s = n.getDateFromParts({
                year: o.year || i.getFullYear(),
                month: (o.month || 0) + 1,
                day: o.day || 1,
                hours: o.hour || 0,
                minutes: o.minute || 0,
                seconds: o.second || 0,
                milliseconds: o.millisecond || 0
              }), s;
            }).find(function (e) {
              return e;
            }) || new Date(e);
          }
        }, {
          key: "normalizeMasks",
          value: function normalizeMasks(e) {
            var t = this;
            return (Object(te["b"])(e) && e || [Object(ne["n"])(e) && e || "YYYY-MM-DD"]).map(function (e) {
              return pe.reduce(function (e, n) {
                return e.replace(n, t.masks[n] || "");
              }, e);
            });
          }
        }, {
          key: "normalizeDate",
          value: function normalizeDate(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var n = null,
                r = t.type,
                a = t.fillDate;
            var o = t.mask,
                i = t.patch,
                s = t.time,
                c = "auto" === r || !r;

            if (Object(ne["l"])(e) ? (r = "number", n = new Date(+e)) : Object(ne["n"])(e) ? (r = "string", n = e ? this.parse(e, o || "iso") : null) : Object(ne["m"])(e) ? (r = "object", n = this.getDateFromParts(e)) : (r = "date", n = Object(ne["j"])(e) ? new Date(e.getTime()) : null), n && i) {
              a = null == a ? new Date() : this.normalizeDate(a);

              var _e6 = _objectSpread(_objectSpread({}, this.getDateParts(a)), Object(ne["t"])(this.getDateParts(n), ae[i]));

              n = this.getDateFromParts(_e6);
            }

            return c && (t.type = r), n && !isNaN(n.getTime()) ? (s && (n = this.adjustTimeForDate(n, {
              timeAdjust: s
            })), n) : null;
          }
        }, {
          key: "denormalizeDate",
          value: function denormalizeDate(e) {
            var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                t = _ref4.type,
                n = _ref4.mask;

            switch (t) {
              case "number":
                return e ? e.getTime() : NaN;

              case "string":
                return e ? this.format(e, n || "iso") : "";

              default:
                return e ? new Date(e) : null;
            }
          }
        }, {
          key: "adjustTimeForDate",
          value: function adjustTimeForDate(e, _ref5) {
            var t = _ref5.timeAdjust;

            if (t) {
              var _n2 = this.getDateParts(e);

              if ("now" === t) {
                var _e7 = this.getDateParts(new Date());

                _n2.hours = _e7.hours, _n2.minutes = _e7.minutes, _n2.seconds = _e7.seconds, _n2.milliseconds = _e7.milliseconds;
              } else {
                var _e8 = new Date("2000-01-01T".concat(t, "Z"));

                _n2.hours = _e8.getUTCHours(), _n2.minutes = _e8.getUTCMinutes(), _n2.seconds = _e8.getUTCSeconds(), _n2.milliseconds = _e8.getUTCMilliseconds();
              }

              e = this.getDateFromParts(_n2);
            }

            return e;
          }
        }, {
          key: "normalizeDates",
          value: function normalizeDates(e, t) {
            return t = t || {}, t.locale = this, (Object(ne["h"])(e) ? e : [e]).map(function (e) {
              return e && (e instanceof Q["a"] ? e : new Q["a"](e, t));
            }).filter(function (e) {
              return e;
            });
          }
        }, {
          key: "getDateParts",
          value: function getDateParts(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.timezone;
            if (!e) return null;
            var n = e;

            if (t) {
              var _r = new Date(e.toLocaleString("en-US", {
                timeZone: t
              }));

              _r.setMilliseconds(e.getMilliseconds());

              var _a = _r.getTime() - e.getTime();

              n = new Date(e.getTime() + _a);
            }

            var r = n.getMilliseconds(),
                a = n.getSeconds(),
                o = n.getMinutes(),
                i = n.getHours(),
                s = n.getMonth() + 1,
                c = n.getFullYear(),
                u = this.getMonthComps(s, c),
                l = n.getDate(),
                d = u.days - l + 1,
                f = n.getDay() + 1,
                p = Math.floor((l - 1) / 7 + 1),
                h = Math.floor((u.days - l) / 7 + 1),
                v = Math.ceil((l + Math.abs(u.firstWeekday - u.firstDayOfWeek)) / 7),
                b = u.weeks - v + 1,
                m = {
              milliseconds: r,
              seconds: a,
              minutes: o,
              hours: i,
              day: l,
              dayFromEnd: d,
              weekday: f,
              weekdayOrdinal: p,
              weekdayOrdinalFromEnd: h,
              week: v,
              weekFromEnd: b,
              month: s,
              year: c,
              date: e,
              isValid: !0
            };
            return m.timezoneOffset = this.getTimezoneOffset(m), m;
          }
        }, {
          key: "getDateFromParts",
          value: function getDateFromParts(e) {
            if (!e) return null;
            var t = new Date(),
                _e$year = e.year,
                n = _e$year === void 0 ? t.getFullYear() : _e$year,
                _e$month = e.month,
                r = _e$month === void 0 ? t.getMonth() + 1 : _e$month,
                _e$day = e.day,
                a = _e$day === void 0 ? t.getDate() : _e$day,
                _e$hours = e.hours,
                o = _e$hours === void 0 ? 0 : _e$hours,
                _e$minutes = e.minutes,
                i = _e$minutes === void 0 ? 0 : _e$minutes,
                _e$seconds = e.seconds,
                s = _e$seconds === void 0 ? 0 : _e$seconds,
                _e$milliseconds = e.milliseconds,
                c = _e$milliseconds === void 0 ? 0 : _e$milliseconds;

            if (this.timezone) {
              var _e9 = "".concat(Object(te["m"])(n, 4), "-").concat(Object(te["m"])(r, 2), "-").concat(Object(te["m"])(a, 2), "T").concat(Object(te["m"])(o, 2), ":").concat(Object(te["m"])(i, 2), ":").concat(Object(te["m"])(s, 2), ".").concat(Object(te["m"])(c, 3));

              return D(_e9, {
                timeZone: this.timezone
              });
            }

            return new Date(n, r - 1, a, o, i, s, c);
          }
        }, {
          key: "getTimezoneOffset",
          value: function getTimezoneOffset(e) {
            var t = e.year,
                n = e.month,
                r = e.day,
                _e$hours2 = e.hours,
                a = _e$hours2 === void 0 ? 0 : _e$hours2,
                _e$minutes2 = e.minutes,
                o = _e$minutes2 === void 0 ? 0 : _e$minutes2,
                _e$seconds2 = e.seconds,
                i = _e$seconds2 === void 0 ? 0 : _e$seconds2,
                _e$milliseconds2 = e.milliseconds,
                s = _e$milliseconds2 === void 0 ? 0 : _e$milliseconds2;
            var c;
            var u = new Date(Date.UTC(t, n - 1, r, a, o, i, s));

            if (this.timezone) {
              var _e10 = "".concat(Object(te["m"])(t, 4), "-").concat(Object(te["m"])(n, 2), "-").concat(Object(te["m"])(r, 2), "T").concat(Object(te["m"])(a, 2), ":").concat(Object(te["m"])(o, 2), ":").concat(Object(te["m"])(i, 2), ".").concat(Object(te["m"])(s, 3));

              c = D(_e10, {
                timeZone: this.timezone
              });
            } else c = new Date(t, n - 1, r, a, o, i, s);

            return (c - u) / 6e4;
          }
        }, {
          key: "toPage",
          value: function toPage(e, t) {
            return Object(ne["l"])(e) ? Object(te["a"])(t, e) : Object(ne["n"])(e) ? this.getDateParts(this.normalizeDate(e)) : Object(ne["j"])(e) ? this.getDateParts(e) : Object(ne["m"])(e) ? e : null;
          }
        }, {
          key: "getMonthDates",
          value: function getMonthDates() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2e3;
            var t = [];

            for (var _n3 = 0; _n3 < 12; _n3++) {
              t.push(new Date(e, _n3, 15));
            }

            return t;
          }
        }, {
          key: "getMonthNames",
          value: function getMonthNames(e) {
            var t = new Intl.DateTimeFormat(this.id, {
              month: e,
              timezome: "UTC"
            });
            return this.getMonthDates().map(function (e) {
              return t.format(e);
            });
          }
        }, {
          key: "getWeekdayDates",
          value: function getWeekdayDates() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.firstDayOfWeek;
            var t = [],
                n = 2020,
                r = 1,
                a = 5 + e - 1;

            for (var _o = 0; _o < he; _o++) {
              t.push(this.getDateFromParts({
                year: n,
                month: r,
                day: a + _o,
                hours: 12
              }));
            }

            return t;
          }
        }, {
          key: "getDayNames",
          value: function getDayNames(e) {
            var t = new Intl.DateTimeFormat(this.id, {
              weekday: e,
              timeZone: this.timezone
            });
            return this.getWeekdayDates(1).map(function (e) {
              return t.format(e);
            });
          }
        }, {
          key: "getMonthComps",
          value: function getMonthComps(e, t) {
            var n = "".concat(e, "-").concat(t);
            var r = this.monthData[n];

            if (!r) {
              var _a2 = t % 4 === 0 && t % 100 !== 0 || t % 400 === 0,
                  _o2 = new Date(t, e - 1, 1),
                  _i3 = _o2.getDay() + 1,
                  _s = 2 === e && _a2 ? 29 : ve[e - 1],
                  _c = this.firstDayOfWeek - 1,
                  _u = X(_o2, {
                weekStartsOn: _c
              }),
                  _l = [],
                  _d = [];

              for (var _e11 = 0; _e11 < _u; _e11++) {
                var _t4 = Object(J["a"])(_o2, 7 * _e11);

                _l.push(B(_t4, {
                  weekStartsOn: _c
                })), _d.push(R(_t4));
              }

              r = {
                firstDayOfWeek: this.firstDayOfWeek,
                inLeapYear: _a2,
                firstWeekday: _i3,
                days: _s,
                weeks: _u,
                month: e,
                year: t,
                weeknumbers: _l,
                isoWeeknumbers: _d
              }, this.monthData[n] = r;
            }

            return r;
          }
        }, {
          key: "getThisMonthComps",
          value: function getThisMonthComps() {
            var _this$getDateParts = this.getDateParts(new Date()),
                e = _this$getDateParts.month,
                t = _this$getDateParts.year;

            return this.getMonthComps(e, t);
          }
        }, {
          key: "getPrevMonthComps",
          value: function getPrevMonthComps(e, t) {
            return 1 === e ? this.getMonthComps(12, t - 1) : this.getMonthComps(e - 1, t);
          }
        }, {
          key: "getNextMonthComps",
          value: function getNextMonthComps(e, t) {
            return 12 === e ? this.getMonthComps(1, t + 1) : this.getMonthComps(e + 1, t);
          }
        }, {
          key: "getDayId",
          value: function getDayId(e) {
            return this.format(e, "YYYY-MM-DD");
          }
        }, {
          key: "getCalendarDays",
          value: function getCalendarDays(_ref6) {
            var e = _ref6.weeks,
                t = _ref6.monthComps,
                n = _ref6.prevMonthComps,
                r = _ref6.nextMonthComps;
            var a = this;
            var o = [],
                i = t.firstDayOfWeek,
                s = t.firstWeekday,
                c = t.isoWeeknumbers,
                u = t.weeknumbers,
                l = s + (s < i ? he : 0) - i;
            var d = !0,
                f = !1,
                p = !1;
            var h = new Intl.DateTimeFormat(this.id, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            });
            var v = n.days - l + 1,
                b = n.days - v + 1,
                m = Math.floor((v - 1) / he + 1),
                g = 1,
                y = n.weeks,
                w = 1,
                x = n.month,
                D = n.year;

            var j = new Date(),
                O = j.getDate(),
                k = j.getMonth() + 1,
                M = j.getFullYear(),
                P = function P(e, t, n) {
              return function (r, o, i, s) {
                return a.normalizeDate({
                  year: e,
                  month: t,
                  day: n,
                  hours: r,
                  minutes: o,
                  seconds: i,
                  milliseconds: s
                });
              };
            };

            for (var _S = 1; _S <= e; _S++) {
              for (var _n4 = 1, _a3 = i; _n4 <= he; _n4++, _a3 += _a3 === he ? 1 - he : 1) {
                d && _a3 === s && (v = 1, b = t.days, m = Math.floor((v - 1) / he + 1), g = Math.floor((t.days - v) / he + 1), y = 1, w = t.weeks, x = t.month, D = t.year, d = !1, f = !0);

                var _i4 = P(D, x, v),
                    _l2 = {
                  start: _i4(0, 0, 0),
                  end: _i4(23, 59, 59, 999)
                },
                    _j = _l2.start,
                    _Y = "".concat(Object(te["m"])(D, 4), "-").concat(Object(te["m"])(x, 2), "-").concat(Object(te["m"])(v, 2)),
                    _E = _n4,
                    _2 = he - _n4,
                    _T = u[_S - 1],
                    _I = c[_S - 1],
                    _C = v === O && x === k && D === M,
                    _$ = f && 1 === v,
                    _A = f && v === t.days,
                    _N = 1 === _S,
                    _F = _S === e,
                    _z = 1 === _n4,
                    _L = _n4 === he;

                o.push({
                  id: _Y,
                  label: v.toString(),
                  ariaLabel: h.format(new Date(D, x - 1, v)),
                  day: v,
                  dayFromEnd: b,
                  weekday: _a3,
                  weekdayPosition: _E,
                  weekdayPositionFromEnd: _2,
                  weekdayOrdinal: m,
                  weekdayOrdinalFromEnd: g,
                  week: y,
                  weekFromEnd: w,
                  weeknumber: _T,
                  isoWeeknumber: _I,
                  month: x,
                  year: D,
                  dateFromTime: _i4,
                  date: _j,
                  range: _l2,
                  isToday: _C,
                  isFirstDay: _$,
                  isLastDay: _A,
                  inMonth: f,
                  inPrevMonth: d,
                  inNextMonth: p,
                  onTop: _N,
                  onBottom: _F,
                  onLeft: _z,
                  onRight: _L,
                  classes: ["id-" + _Y, "day-" + v, "day-from-end-" + b, "weekday-" + _a3, "weekday-position-" + _E, "weekday-ordinal-" + m, "weekday-ordinal-from-end-" + g, "week-" + y, "week-from-end-" + w, {
                    "is-today": _C,
                    "is-first-day": _$,
                    "is-last-day": _A,
                    "in-month": f,
                    "in-prev-month": d,
                    "in-next-month": p,
                    "on-top": _N,
                    "on-bottom": _F,
                    "on-left": _z,
                    "on-right": _L
                  }]
                }), f && _A ? (f = !1, p = !0, v = 1, b = r.days, m = 1, g = Math.floor((r.days - v) / he + 1), y = 1, w = r.weeks, x = r.month, D = r.year) : (v++, b--, m = Math.floor((v - 1) / he + 1), g = Math.floor((t.days - v) / he + 1));
              }

              y++, w--;
            }

            return o;
          }
        }]);

        return ye;
      }();
    },
    "29f3": function f3(e, t) {
      var n = Object.prototype,
          r = n.toString;

      function a(e) {
        return r.call(e);
      }

      e.exports = a;
    },
    "2af9": function af9(e, t, n) {
      "use strict";

      n.r(t), n.d(t, "Calendar", function () {
        return Yn;
      }), n.d(t, "CalendarNav", function () {
        return Jt;
      }), n.d(t, "DatePicker", function () {
        return Xn;
      }), n.d(t, "Popover", function () {
        return bt;
      });
      n("ddb0");
      var r = n("f7f1"),
          a = n("fe1f"),
          o = n("fd3a"),
          i = n("8c86");

      function s(e, t) {
        Object(i["a"])(2, arguments);
        var n = Object(o["a"])(e),
            r = Object(a["a"])(t);
        if (isNaN(r)) return new Date(NaN);
        if (!r) return n;
        var s = n.getDate(),
            c = new Date(n.getTime());
        c.setMonth(n.getMonth() + r + 1, 0);
        var u = c.getDate();
        return s >= u ? c : (n.setFullYear(c.getFullYear(), c.getMonth(), s), n);
      }

      function c(e, t) {
        Object(i["a"])(2, arguments);
        var n = Object(a["a"])(t);
        return s(e, 12 * n);
      }

      function u(e) {
        var t = e.getBoundingClientRect();
        return {
          width: t.width,
          height: t.height,
          top: t.top,
          right: t.right,
          bottom: t.bottom,
          left: t.left,
          x: t.left,
          y: t.top
        };
      }

      function l(e) {
        if ("[object Window]" !== e.toString()) {
          var t = e.ownerDocument;
          return t && t.defaultView || window;
        }

        return e;
      }

      function d(e) {
        var t = l(e),
            n = t.pageXOffset,
            r = t.pageYOffset;
        return {
          scrollLeft: n,
          scrollTop: r
        };
      }

      function f(e) {
        var t = l(e).Element;
        return e instanceof t || e instanceof Element;
      }

      function p(e) {
        var t = l(e).HTMLElement;
        return e instanceof t || e instanceof HTMLElement;
      }

      function h(e) {
        var t = l(e).ShadowRoot;
        return e instanceof t || e instanceof ShadowRoot;
      }

      function v(e) {
        return {
          scrollLeft: e.scrollLeft,
          scrollTop: e.scrollTop
        };
      }

      function b(e) {
        return e !== l(e) && p(e) ? v(e) : d(e);
      }

      function m(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
      }

      function g(e) {
        return ((f(e) ? e.ownerDocument : e.document) || window.document).documentElement;
      }

      function y(e) {
        return u(g(e)).left + d(e).scrollLeft;
      }

      function w(e) {
        return l(e).getComputedStyle(e);
      }

      function x(e) {
        var t = w(e),
            n = t.overflow,
            r = t.overflowX,
            a = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + a + r);
      }

      function D(e, t, n) {
        void 0 === n && (n = !1);
        var r = g(t),
            a = u(e),
            o = p(t),
            i = {
          scrollLeft: 0,
          scrollTop: 0
        },
            s = {
          x: 0,
          y: 0
        };
        return (o || !o && !n) && (("body" !== m(t) || x(r)) && (i = b(t)), p(t) ? (s = u(t), s.x += t.clientLeft, s.y += t.clientTop) : r && (s.x = y(r))), {
          x: a.left + i.scrollLeft - s.x,
          y: a.top + i.scrollTop - s.y,
          width: a.width,
          height: a.height
        };
      }

      function j(e) {
        return {
          x: e.offsetLeft,
          y: e.offsetTop,
          width: e.offsetWidth,
          height: e.offsetHeight
        };
      }

      function O(e) {
        return "html" === m(e) ? e : e.assignedSlot || e.parentNode || e.host || g(e);
      }

      function k(e) {
        return ["html", "body", "#document"].indexOf(m(e)) >= 0 ? e.ownerDocument.body : p(e) && x(e) ? e : k(O(e));
      }

      function M(e, t) {
        void 0 === t && (t = []);
        var n = k(e),
            r = "body" === m(n),
            a = l(n),
            o = r ? [a].concat(a.visualViewport || [], x(n) ? n : []) : n,
            i = t.concat(o);
        return r ? i : i.concat(M(O(o)));
      }

      function P(e) {
        return ["table", "td", "th"].indexOf(m(e)) >= 0;
      }

      function S(e) {
        if (!p(e) || "fixed" === w(e).position) return null;
        var t = e.offsetParent;

        if (t) {
          var n = g(t);
          if ("body" === m(t) && "static" === w(t).position && "static" !== w(n).position) return n;
        }

        return t;
      }

      function Y(e) {
        var t = O(e);

        while (p(t) && ["html", "body"].indexOf(m(t)) < 0) {
          var n = w(t);
          if ("none" !== n.transform || "none" !== n.perspective || n.willChange && "auto" !== n.willChange) return t;
          t = t.parentNode;
        }

        return null;
      }

      function E(e) {
        var t = l(e),
            n = S(e);

        while (n && P(n) && "static" === w(n).position) {
          n = S(n);
        }

        return n && "body" === m(n) && "static" === w(n).position ? t : n || Y(e) || t;
      }

      var _ = "top",
          T = "bottom",
          I = "right",
          C = "left",
          $ = "auto",
          A = [_, T, I, C],
          N = "start",
          F = "end",
          z = "clippingParents",
          L = "viewport",
          H = "popper",
          R = "reference",
          W = A.reduce(function (e, t) {
        return e.concat([t + "-" + N, t + "-" + F]);
      }, []),
          V = [].concat(A, [$]).reduce(function (e, t) {
        return e.concat([t, t + "-" + N, t + "-" + F]);
      }, []),
          U = "beforeRead",
          B = "read",
          Z = "afterRead",
          q = "beforeMain",
          G = "main",
          K = "afterMain",
          X = "beforeWrite",
          J = "write",
          Q = "afterWrite",
          ee = [U, B, Z, q, G, K, X, J, Q];

      function te(e) {
        var t = new Map(),
            n = new Set(),
            r = [];

        function a(e) {
          n.add(e.name);
          var o = [].concat(e.requires || [], e.requiresIfExists || []);
          o.forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && a(r);
            }
          }), r.push(e);
        }

        return e.forEach(function (e) {
          t.set(e.name, e);
        }), e.forEach(function (e) {
          n.has(e.name) || a(e);
        }), r;
      }

      function ne(e) {
        var t = te(e);
        return ee.reduce(function (e, n) {
          return e.concat(t.filter(function (e) {
            return e.phase === n;
          }));
        }, []);
      }

      function re(e) {
        var t;
        return function () {
          return t || (t = new Promise(function (n) {
            Promise.resolve().then(function () {
              t = void 0, n(e());
            });
          })), t;
        };
      }

      function ae(e) {
        var t = e.reduce(function (e, t) {
          var n = e[t.name];
          return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
            options: Object.assign(Object.assign({}, n.options), t.options),
            data: Object.assign(Object.assign({}, n.data), t.data)
          }) : t, e;
        }, {});
        return Object.keys(t).map(function (e) {
          return t[e];
        });
      }

      var oe = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
      };

      function ie() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }

        return !t.some(function (e) {
          return !(e && "function" === typeof e.getBoundingClientRect);
        });
      }

      function se(e) {
        void 0 === e && (e = {});
        var t = e,
            n = t.defaultModifiers,
            r = void 0 === n ? [] : n,
            a = t.defaultOptions,
            o = void 0 === a ? oe : a;
        return function (e, t, n) {
          void 0 === n && (n = o);
          var a = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign(Object.assign({}, oe), o),
            modifiersData: {},
            elements: {
              reference: e,
              popper: t
            },
            attributes: {},
            styles: {}
          },
              i = [],
              s = !1,
              c = {
            state: a,
            setOptions: function setOptions(n) {
              l(), a.options = Object.assign(Object.assign(Object.assign({}, o), a.options), n), a.scrollParents = {
                reference: f(e) ? M(e) : e.contextElement ? M(e.contextElement) : [],
                popper: M(t)
              };
              var i = ne(ae([].concat(r, a.options.modifiers)));
              return a.orderedModifiers = i.filter(function (e) {
                return e.enabled;
              }), u(), c.update();
            },
            forceUpdate: function forceUpdate() {
              if (!s) {
                var e = a.elements,
                    t = e.reference,
                    n = e.popper;

                if (ie(t, n)) {
                  a.rects = {
                    reference: D(t, E(n), "fixed" === a.options.strategy),
                    popper: j(n)
                  }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach(function (e) {
                    return a.modifiersData[e.name] = Object.assign({}, e.data);
                  });

                  for (var r = 0; r < a.orderedModifiers.length; r++) {
                    if (!0 !== a.reset) {
                      var o = a.orderedModifiers[r],
                          i = o.fn,
                          u = o.options,
                          l = void 0 === u ? {} : u,
                          d = o.name;
                      "function" === typeof i && (a = i({
                        state: a,
                        options: l,
                        name: d,
                        instance: c
                      }) || a);
                    } else a.reset = !1, r = -1;
                  }
                }
              }
            },
            update: re(function () {
              return new Promise(function (e) {
                c.forceUpdate(), e(a);
              });
            }),
            destroy: function destroy() {
              l(), s = !0;
            }
          };
          if (!ie(e, t)) return c;

          function u() {
            a.orderedModifiers.forEach(function (e) {
              var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  o = e.effect;

              if ("function" === typeof o) {
                var s = o({
                  state: a,
                  name: t,
                  instance: c,
                  options: r
                }),
                    u = function u() {};

                i.push(s || u);
              }
            });
          }

          function l() {
            i.forEach(function (e) {
              return e();
            }), i = [];
          }

          return c.setOptions(n).then(function (e) {
            !s && n.onFirstUpdate && n.onFirstUpdate(e);
          }), c;
        };
      }

      var ce = {
        passive: !0
      };

      function ue(e) {
        var t = e.state,
            n = e.instance,
            r = e.options,
            a = r.scroll,
            o = void 0 === a || a,
            i = r.resize,
            s = void 0 === i || i,
            c = l(t.elements.popper),
            u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
        return o && u.forEach(function (e) {
          e.addEventListener("scroll", n.update, ce);
        }), s && c.addEventListener("resize", n.update, ce), function () {
          o && u.forEach(function (e) {
            e.removeEventListener("scroll", n.update, ce);
          }), s && c.removeEventListener("resize", n.update, ce);
        };
      }

      var le = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function fn() {},
        effect: ue,
        data: {}
      };

      function de(e) {
        return e.split("-")[0];
      }

      function fe(e) {
        return e.split("-")[1];
      }

      function pe(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
      }

      function he(e) {
        var t,
            n = e.reference,
            r = e.element,
            a = e.placement,
            o = a ? de(a) : null,
            i = a ? fe(a) : null,
            s = n.x + n.width / 2 - r.width / 2,
            c = n.y + n.height / 2 - r.height / 2;

        switch (o) {
          case _:
            t = {
              x: s,
              y: n.y - r.height
            };
            break;

          case T:
            t = {
              x: s,
              y: n.y + n.height
            };
            break;

          case I:
            t = {
              x: n.x + n.width,
              y: c
            };
            break;

          case C:
            t = {
              x: n.x - r.width,
              y: c
            };
            break;

          default:
            t = {
              x: n.x,
              y: n.y
            };
        }

        var u = o ? pe(o) : null;

        if (null != u) {
          var l = "y" === u ? "height" : "width";

          switch (i) {
            case N:
              t[u] = Math.floor(t[u]) - Math.floor(n[l] / 2 - r[l] / 2);
              break;

            case F:
              t[u] = Math.floor(t[u]) + Math.ceil(n[l] / 2 - r[l] / 2);
              break;

            default:
          }
        }

        return t;
      }

      function ve(e) {
        var t = e.state,
            n = e.name;
        t.modifiersData[n] = he({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: "absolute",
          placement: t.placement
        });
      }

      var be = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: ve,
        data: {}
      },
          me = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };

      function ge(e) {
        var t = e.x,
            n = e.y,
            r = window,
            a = r.devicePixelRatio || 1;
        return {
          x: Math.round(t * a) / a || 0,
          y: Math.round(n * a) / a || 0
        };
      }

      function ye(e) {
        var t,
            n = e.popper,
            r = e.popperRect,
            a = e.placement,
            o = e.offsets,
            i = e.position,
            s = e.gpuAcceleration,
            c = e.adaptive,
            u = ge(o),
            d = u.x,
            f = u.y,
            p = o.hasOwnProperty("x"),
            h = o.hasOwnProperty("y"),
            v = C,
            b = _,
            m = window;

        if (c) {
          var y = E(n);
          y === l(n) && (y = g(n)), a === _ && (b = T, f -= y.clientHeight - r.height, f *= s ? 1 : -1), a === C && (v = I, d -= y.clientWidth - r.width, d *= s ? 1 : -1);
        }

        var w,
            x = Object.assign({
          position: i
        }, c && me);
        return s ? Object.assign(Object.assign({}, x), {}, (w = {}, w[b] = h ? "0" : "", w[v] = p ? "0" : "", w.transform = (m.devicePixelRatio || 1) < 2 ? "translate(" + d + "px, " + f + "px)" : "translate3d(" + d + "px, " + f + "px, 0)", w)) : Object.assign(Object.assign({}, x), {}, (t = {}, t[b] = h ? f + "px" : "", t[v] = p ? d + "px" : "", t.transform = "", t));
      }

      function we(e) {
        var t = e.state,
            n = e.options,
            r = n.gpuAcceleration,
            a = void 0 === r || r,
            o = n.adaptive,
            i = void 0 === o || o,
            s = {
          placement: de(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: a
        };
        null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), ye(Object.assign(Object.assign({}, s), {}, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: i
        })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), ye(Object.assign(Object.assign({}, s), {}, {
          offsets: t.modifiersData.arrow,
          position: "absolute",
          adaptive: !1
        })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
          "data-popper-placement": t.placement
        });
      }

      var xe = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: we,
        data: {}
      };

      function De(e) {
        var t = e.state;
        Object.keys(t.elements).forEach(function (e) {
          var n = t.styles[e] || {},
              r = t.attributes[e] || {},
              a = t.elements[e];
          p(a) && m(a) && (Object.assign(a.style, n), Object.keys(r).forEach(function (e) {
            var t = r[e];
            !1 === t ? a.removeAttribute(e) : a.setAttribute(e, !0 === t ? "" : t);
          }));
        });
      }

      function je(e) {
        var t = e.state,
            n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
        return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function () {
          Object.keys(t.elements).forEach(function (e) {
            var r = t.elements[e],
                a = t.attributes[e] || {},
                o = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]),
                i = o.reduce(function (e, t) {
              return e[t] = "", e;
            }, {});
            p(r) && m(r) && (Object.assign(r.style, i), Object.keys(a).forEach(function (e) {
              r.removeAttribute(e);
            }));
          });
        };
      }

      var Oe = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: De,
        effect: je,
        requires: ["computeStyles"]
      };

      function ke(e, t, n) {
        var r = de(e),
            a = [C, _].indexOf(r) >= 0 ? -1 : 1,
            o = "function" === typeof n ? n(Object.assign(Object.assign({}, t), {}, {
          placement: e
        })) : n,
            i = o[0],
            s = o[1];
        return i = i || 0, s = (s || 0) * a, [C, I].indexOf(r) >= 0 ? {
          x: s,
          y: i
        } : {
          x: i,
          y: s
        };
      }

      function Me(e) {
        var t = e.state,
            n = e.options,
            r = e.name,
            a = n.offset,
            o = void 0 === a ? [0, 0] : a,
            i = V.reduce(function (e, n) {
          return e[n] = ke(n, t.rects, o), e;
        }, {}),
            s = i[t.placement],
            c = s.x,
            u = s.y;
        null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = i;
      }

      var Pe = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: Me
      },
          Se = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };

      function Ye(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return Se[e];
        });
      }

      var Ee = {
        start: "end",
        end: "start"
      };

      function _e(e) {
        return e.replace(/start|end/g, function (e) {
          return Ee[e];
        });
      }

      function Te(e) {
        var t = l(e),
            n = g(e),
            r = t.visualViewport,
            a = n.clientWidth,
            o = n.clientHeight,
            i = 0,
            s = 0;
        return r && (a = r.width, o = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = r.offsetLeft, s = r.offsetTop)), {
          width: a,
          height: o,
          x: i + y(e),
          y: s
        };
      }

      function Ie(e) {
        var t = g(e),
            n = d(e),
            r = e.ownerDocument.body,
            a = Math.max(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0),
            o = Math.max(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0),
            i = -n.scrollLeft + y(e),
            s = -n.scrollTop;
        return "rtl" === w(r || t).direction && (i += Math.max(t.clientWidth, r ? r.clientWidth : 0) - a), {
          width: a,
          height: o,
          x: i,
          y: s
        };
      }

      function Ce(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;

        if (h(n)) {
          var r = t;

          do {
            if (r && e.isSameNode(r)) return !0;
            r = r.parentNode || r.host;
          } while (r);
        }

        return !1;
      }

      function $e(e) {
        return Object.assign(Object.assign({}, e), {}, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height
        });
      }

      function Ae(e) {
        var t = u(e);
        return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
      }

      function Ne(e, t) {
        return t === L ? $e(Te(e)) : p(t) ? Ae(t) : $e(Ie(g(e)));
      }

      function Fe(e) {
        var t = M(O(e)),
            n = ["absolute", "fixed"].indexOf(w(e).position) >= 0,
            r = n && p(e) ? E(e) : e;
        return f(r) ? t.filter(function (e) {
          return f(e) && Ce(e, r) && "body" !== m(e);
        }) : [];
      }

      function ze(e, t, n) {
        var r = "clippingParents" === t ? Fe(e) : [].concat(t),
            a = [].concat(r, [n]),
            o = a[0],
            i = a.reduce(function (t, n) {
          var r = Ne(e, n);
          return t.top = Math.max(r.top, t.top), t.right = Math.min(r.right, t.right), t.bottom = Math.min(r.bottom, t.bottom), t.left = Math.max(r.left, t.left), t;
        }, Ne(e, o));
        return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
      }

      function Le() {
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }

      function He(e) {
        return Object.assign(Object.assign({}, Le()), e);
      }

      function Re(e, t) {
        return t.reduce(function (t, n) {
          return t[n] = e, t;
        }, {});
      }

      function We(e, t) {
        void 0 === t && (t = {});
        var n = t,
            r = n.placement,
            a = void 0 === r ? e.placement : r,
            o = n.boundary,
            i = void 0 === o ? z : o,
            s = n.rootBoundary,
            c = void 0 === s ? L : s,
            l = n.elementContext,
            d = void 0 === l ? H : l,
            p = n.altBoundary,
            h = void 0 !== p && p,
            v = n.padding,
            b = void 0 === v ? 0 : v,
            m = He("number" !== typeof b ? b : Re(b, A)),
            y = d === H ? R : H,
            w = e.elements.reference,
            x = e.rects.popper,
            D = e.elements[h ? y : d],
            j = ze(f(D) ? D : D.contextElement || g(e.elements.popper), i, c),
            O = u(w),
            k = he({
          reference: O,
          element: x,
          strategy: "absolute",
          placement: a
        }),
            M = $e(Object.assign(Object.assign({}, x), k)),
            P = d === H ? M : O,
            S = {
          top: j.top - P.top + m.top,
          bottom: P.bottom - j.bottom + m.bottom,
          left: j.left - P.left + m.left,
          right: P.right - j.right + m.right
        },
            Y = e.modifiersData.offset;

        if (d === H && Y) {
          var E = Y[a];
          Object.keys(S).forEach(function (e) {
            var t = [I, T].indexOf(e) >= 0 ? 1 : -1,
                n = [_, T].indexOf(e) >= 0 ? "y" : "x";
            S[e] += E[n] * t;
          });
        }

        return S;
      }

      function Ve(e, t) {
        void 0 === t && (t = {});
        var n = t,
            r = n.placement,
            a = n.boundary,
            o = n.rootBoundary,
            i = n.padding,
            s = n.flipVariations,
            c = n.allowedAutoPlacements,
            u = void 0 === c ? V : c,
            l = fe(r),
            d = l ? s ? W : W.filter(function (e) {
          return fe(e) === l;
        }) : A,
            f = d.filter(function (e) {
          return u.indexOf(e) >= 0;
        });
        0 === f.length && (f = d);
        var p = f.reduce(function (t, n) {
          return t[n] = We(e, {
            placement: n,
            boundary: a,
            rootBoundary: o,
            padding: i
          })[de(n)], t;
        }, {});
        return Object.keys(p).sort(function (e, t) {
          return p[e] - p[t];
        });
      }

      function Ue(e) {
        if (de(e) === $) return [];
        var t = Ye(e);
        return [_e(e), t, _e(t)];
      }

      function Be(e) {
        var t = e.state,
            n = e.options,
            r = e.name;

        if (!t.modifiersData[r]._skip) {
          for (var a = n.mainAxis, o = void 0 === a || a, i = n.altAxis, s = void 0 === i || i, c = n.fallbackPlacements, u = n.padding, l = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, v = n.allowedAutoPlacements, b = t.options.placement, m = de(b), g = m === b, y = c || (g || !h ? [Ye(b)] : Ue(b)), w = [b].concat(y).reduce(function (e, n) {
            return e.concat(de(n) === $ ? Ve(t, {
              placement: n,
              boundary: l,
              rootBoundary: d,
              padding: u,
              flipVariations: h,
              allowedAutoPlacements: v
            }) : n);
          }, []), x = t.rects.reference, D = t.rects.popper, j = new Map(), O = !0, k = w[0], M = 0; M < w.length; M++) {
            var P = w[M],
                S = de(P),
                Y = fe(P) === N,
                E = [_, T].indexOf(S) >= 0,
                A = E ? "width" : "height",
                F = We(t, {
              placement: P,
              boundary: l,
              rootBoundary: d,
              altBoundary: f,
              padding: u
            }),
                z = E ? Y ? I : C : Y ? T : _;
            x[A] > D[A] && (z = Ye(z));
            var L = Ye(z),
                H = [];

            if (o && H.push(F[S] <= 0), s && H.push(F[z] <= 0, F[L] <= 0), H.every(function (e) {
              return e;
            })) {
              k = P, O = !1;
              break;
            }

            j.set(P, H);
          }

          if (O) for (var R = h ? 3 : 1, W = function W(e) {
            var t = w.find(function (t) {
              var n = j.get(t);
              if (n) return n.slice(0, e).every(function (e) {
                return e;
              });
            });
            if (t) return k = t, "break";
          }, V = R; V > 0; V--) {
            var U = W(V);
            if ("break" === U) break;
          }
          t.placement !== k && (t.modifiersData[r]._skip = !0, t.placement = k, t.reset = !0);
        }
      }

      var Ze = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: Be,
        requiresIfExists: ["offset"],
        data: {
          _skip: !1
        }
      };

      function qe(e) {
        return "x" === e ? "y" : "x";
      }

      function Ge(e, t, n) {
        return Math.max(e, Math.min(t, n));
      }

      function Ke(e) {
        var t = e.state,
            n = e.options,
            r = e.name,
            a = n.mainAxis,
            o = void 0 === a || a,
            i = n.altAxis,
            s = void 0 !== i && i,
            c = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            d = n.padding,
            f = n.tether,
            p = void 0 === f || f,
            h = n.tetherOffset,
            v = void 0 === h ? 0 : h,
            b = We(t, {
          boundary: c,
          rootBoundary: u,
          padding: d,
          altBoundary: l
        }),
            m = de(t.placement),
            g = fe(t.placement),
            y = !g,
            w = pe(m),
            x = qe(w),
            D = t.modifiersData.popperOffsets,
            O = t.rects.reference,
            k = t.rects.popper,
            M = "function" === typeof v ? v(Object.assign(Object.assign({}, t.rects), {}, {
          placement: t.placement
        })) : v,
            P = {
          x: 0,
          y: 0
        };

        if (D) {
          if (o) {
            var S = "y" === w ? _ : C,
                Y = "y" === w ? T : I,
                $ = "y" === w ? "height" : "width",
                A = D[w],
                F = D[w] + b[S],
                z = D[w] - b[Y],
                L = p ? -k[$] / 2 : 0,
                H = g === N ? O[$] : k[$],
                R = g === N ? -k[$] : -O[$],
                W = t.elements.arrow,
                V = p && W ? j(W) : {
              width: 0,
              height: 0
            },
                U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Le(),
                B = U[S],
                Z = U[Y],
                q = Ge(0, O[$], V[$]),
                G = y ? O[$] / 2 - L - q - B - M : H - q - B - M,
                K = y ? -O[$] / 2 + L + q + Z + M : R + q + Z + M,
                X = t.elements.arrow && E(t.elements.arrow),
                J = X ? "y" === w ? X.clientTop || 0 : X.clientLeft || 0 : 0,
                Q = t.modifiersData.offset ? t.modifiersData.offset[t.placement][w] : 0,
                ee = D[w] + G - Q - J,
                te = D[w] + K - Q,
                ne = Ge(p ? Math.min(F, ee) : F, A, p ? Math.max(z, te) : z);
            D[w] = ne, P[w] = ne - A;
          }

          if (s) {
            var re = "x" === w ? _ : C,
                ae = "x" === w ? T : I,
                oe = D[x],
                ie = oe + b[re],
                se = oe - b[ae],
                ce = Ge(ie, oe, se);
            D[x] = ce, P[x] = ce - oe;
          }

          t.modifiersData[r] = P;
        }
      }

      var Xe = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: Ke,
        requiresIfExists: ["offset"]
      };

      function Je(e) {
        var t,
            n = e.state,
            r = e.name,
            a = n.elements.arrow,
            o = n.modifiersData.popperOffsets,
            i = de(n.placement),
            s = pe(i),
            c = [C, I].indexOf(i) >= 0,
            u = c ? "height" : "width";

        if (a && o) {
          var l = n.modifiersData[r + "#persistent"].padding,
              d = j(a),
              f = "y" === s ? _ : C,
              p = "y" === s ? T : I,
              h = n.rects.reference[u] + n.rects.reference[s] - o[s] - n.rects.popper[u],
              v = o[s] - n.rects.reference[s],
              b = E(a),
              m = b ? "y" === s ? b.clientHeight || 0 : b.clientWidth || 0 : 0,
              g = h / 2 - v / 2,
              y = l[f],
              w = m - d[u] - l[p],
              x = m / 2 - d[u] / 2 + g,
              D = Ge(y, x, w),
              O = s;
          n.modifiersData[r] = (t = {}, t[O] = D, t.centerOffset = D - x, t);
        }
      }

      function Qe(e) {
        var t = e.state,
            n = e.options,
            r = e.name,
            a = n.element,
            o = void 0 === a ? "[data-popper-arrow]" : a,
            i = n.padding,
            s = void 0 === i ? 0 : i;
        null != o && ("string" !== typeof o || (o = t.elements.popper.querySelector(o), o)) && Ce(t.elements.popper, o) && (t.elements.arrow = o, t.modifiersData[r + "#persistent"] = {
          padding: He("number" !== typeof s ? s : Re(s, A))
        });
      }

      var et = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: Je,
        effect: Qe,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
      };

      function tt(e, t, n) {
        return void 0 === n && (n = {
          x: 0,
          y: 0
        }), {
          top: e.top - t.height - n.y,
          right: e.right - t.width + n.x,
          bottom: e.bottom - t.height + n.y,
          left: e.left - t.width - n.x
        };
      }

      function nt(e) {
        return [_, I, T, C].some(function (t) {
          return e[t] >= 0;
        });
      }

      function rt(e) {
        var t = e.state,
            n = e.name,
            r = t.rects.reference,
            a = t.rects.popper,
            o = t.modifiersData.preventOverflow,
            i = We(t, {
          elementContext: "reference"
        }),
            s = We(t, {
          altBoundary: !0
        }),
            c = tt(i, r),
            u = tt(s, a, o),
            l = nt(c),
            d = nt(u);
        t.modifiersData[n] = {
          referenceClippingOffsets: c,
          popperEscapeOffsets: u,
          isReferenceHidden: l,
          hasPopperEscaped: d
        }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
          "data-popper-reference-hidden": l,
          "data-popper-escaped": d
        });
      }

      var at,
          ot,
          it = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: rt
      },
          st = [le, be, xe, Oe, Pe, Ze, Xe, et, it],
          ct = se({
        defaultModifiers: st
      }),
          ut = n("2fa3"),
          lt = n("0733"),
          dt = n("9404"),
          ft = {
        name: "Popover",
        render: function render(e) {
          return e("div", {
            class: ["vc-popover-content-wrapper", {
              "is-interactive": this.isInteractive
            }],
            ref: "popover"
          }, [e("transition", {
            props: {
              name: this.transition,
              appear: !0
            },
            on: {
              beforeEnter: this.beforeEnter,
              afterEnter: this.afterEnter,
              beforeLeave: this.beforeLeave,
              afterLeave: this.afterLeave
            }
          }, [this.isVisible && e("div", {
            attrs: {
              tabindex: -1
            },
            class: ["vc-popover-content", "direction-" + this.direction, this.contentClass]
          }, [this.content, e("span", {
            class: ["vc-popover-caret", "direction-" + this.direction, "align-" + this.alignment]
          })])])]);
        },
        props: {
          id: {
            type: String,
            required: !0
          },
          contentClass: String
        },
        data: function data() {
          return {
            ref: null,
            opts: null,
            data: null,
            transition: "slide-fade",
            placement: "bottom",
            positionFixed: !1,
            modifiers: [],
            isInteractive: !1,
            isHovered: !1,
            isFocused: !1,
            showDelay: 0,
            hideDelay: 110,
            autoHide: !1,
            popperEl: null
          };
        },
        computed: {
          content: function content() {
            var e = this;
            return Object(dt["k"])(this.$scopedSlots.default) && this.$scopedSlots.default({
              direction: this.direction,
              alignment: this.alignment,
              data: this.data,
              updateLayout: this.setupPopper,
              hide: function hide(t) {
                return e.hide(t);
              }
            }) || this.$slots.default;
          },
          popperOptions: function popperOptions() {
            return {
              placement: this.placement,
              strategy: this.positionFixed ? "fixed" : "absolute",
              modifiers: [{
                name: "onUpdate",
                enabled: !0,
                phase: "afterWrite",
                fn: this.onPopperUpdate
              }].concat(_toConsumableArray(this.modifiers || [])),
              onFirstUpdate: this.onPopperUpdate
            };
          },
          isVisible: function isVisible() {
            return !(!this.ref || !this.content);
          },
          direction: function direction() {
            return this.placement && this.placement.split("-")[0] || "bottom";
          },
          alignment: function alignment() {
            var e = "left" === this.direction || "right" === this.direction;
            var t = this.placement.split("-");
            return t = t.length > 1 ? t[1] : "", ["start", "top", "left"].includes(t) ? e ? "top" : "left" : ["end", "bottom", "right"].includes(t) ? e ? "bottom" : "right" : e ? "middle" : "center";
          },
          state: function state() {
            return this.$popovers[this.id];
          }
        },
        watch: {
          opts: function opts(e, t) {
            t && t.callback && t.callback(_objectSpread(_objectSpread({}, t), {}, {
              completed: !e,
              reason: e ? "Overridden by action" : null
            }));
          }
        },
        mounted: function mounted() {
          this.popoverEl = this.$refs.popover, this.addEvents();
        },
        beforeDestroy: function beforeDestroy() {
          this.removeEvents();
        },
        methods: {
          addEvents: function addEvents() {
            Object(ut["k"])(this.popoverEl, "click", this.onClick), Object(ut["k"])(this.popoverEl, "mouseover", this.onMouseOver), Object(ut["k"])(this.popoverEl, "mouseleave", this.onMouseLeave), Object(ut["k"])(this.popoverEl, "focusin", this.onFocusIn), Object(ut["k"])(this.popoverEl, "focusout", this.onFocusOut), Object(ut["k"])(document, "keydown", this.onDocumentKeydown), this.removeDocHandler = Object(lt["b"])(document, this.onDocumentClick), Object(ut["k"])(document, "show-popover", this.onDocumentShowPopover), Object(ut["k"])(document, "hide-popover", this.onDocumentHidePopover), Object(ut["k"])(document, "toggle-popover", this.onDocumentTogglePopover), Object(ut["k"])(document, "update-popover", this.onDocumentUpdatePopover);
          },
          removeEvents: function removeEvents() {
            Object(ut["j"])(this.popoverEl, "click", this.onClick), Object(ut["j"])(this.popoverEl, "mouseover", this.onMouseOver), Object(ut["j"])(this.popoverEl, "mouseleave", this.onMouseLeave), Object(ut["j"])(this.popoverEl, "focusin", this.onFocusIn), Object(ut["j"])(this.popoverEl, "focusout", this.onFocusOut), Object(ut["j"])(document, "keydown", this.onDocumentKeydown), this.removeDocHandler && this.removeDocHandler(), Object(ut["j"])(document, "show-popover", this.onDocumentShowPopover), Object(ut["j"])(document, "hide-popover", this.onDocumentHidePopover), Object(ut["j"])(document, "toggle-popover", this.onDocumentTogglePopover), Object(ut["j"])(document, "update-popover", this.onDocumentUpdatePopover);
          },
          onClick: function onClick(e) {
            e.stopPropagation();
          },
          onMouseOver: function onMouseOver() {
            this.isHovered = !0, this.isInteractive && this.show();
          },
          onMouseLeave: function onMouseLeave() {
            this.isHovered = !1, !this.autoHide || this.isFocused || this.ref && this.ref === document.activeElement || this.hide();
          },
          onFocusIn: function onFocusIn() {
            this.isFocused = !0, this.isInteractive && this.show();
          },
          onFocusOut: function onFocusOut(e) {
            e.relatedTarget && Object(ut["e"])(this.popoverEl, e.relatedTarget) || (this.isFocused = !1, !this.isHovered && this.autoHide && this.hide());
          },
          onDocumentClick: function onDocumentClick(e) {
            this.$refs.popover && this.ref && (Object(ut["e"])(this.popoverEl, e.target) || Object(ut["e"])(this.ref, e.target) || this.hide());
          },
          onDocumentKeydown: function onDocumentKeydown(e) {
            "Esc" !== e.key && "Escape" !== e.key || this.hide();
          },
          onDocumentShowPopover: function onDocumentShowPopover(_ref7) {
            var e = _ref7.detail;
            e.id && e.id === this.id && this.show(e);
          },
          onDocumentHidePopover: function onDocumentHidePopover(_ref8) {
            var e = _ref8.detail;
            e.id && e.id === this.id && this.hide(e);
          },
          onDocumentTogglePopover: function onDocumentTogglePopover(_ref9) {
            var e = _ref9.detail;
            e.id && e.id === this.id && this.toggle(e);
          },
          onDocumentUpdatePopover: function onDocumentUpdatePopover(_ref10) {
            var e = _ref10.detail;
            e.id && e.id === this.id && this.update(e);
          },
          show: function show() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var t = this;
            e.action = "show";
            var n = e.ref || this.ref,
                r = e.showDelay >= 0 ? e.showDelay : this.showDelay;
            if (!n) return void (e.callback && e.callback({
              completed: !1,
              reason: "Invalid reference element provided"
            }));
            clearTimeout(this.timeout), this.opts = e;

            var a = function a() {
              Object.assign(t, e), t.setupPopper(), t.opts = null;
            };

            r > 0 ? this.timeout = setTimeout(function () {
              return a();
            }, r) : a();
          },
          hide: function hide() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var t = this;
            e.action = "hide";
            var n = e.ref || this.ref,
                r = e.hideDelay >= 0 ? e.hideDelay : this.hideDelay;
            if (!this.ref || n !== this.ref) return void (e.callback && e.callback(_objectSpread(_objectSpread({}, e), {}, {
              completed: !1,
              reason: this.ref ? "Invalid reference element provided" : "Popover already hidden"
            })));

            var a = function a() {
              t.ref = null, t.opts = null;
            };

            clearTimeout(this.timeout), this.opts = e, r > 0 ? this.timeout = setTimeout(a, r) : a();
          },
          toggle: function toggle() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.isVisible && e.ref === this.ref ? this.hide(e) : this.show(e);
          },
          update: function update() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            Object.assign(this, e), this.setupPopper();
          },
          setupPopper: function setupPopper() {
            var e = this;
            this.$nextTick(function () {
              e.ref && e.$refs.popover && (e.popper && e.popper.reference !== e.ref && e.destroyPopper(), e.popper ? e.popper.update() : e.popper = ct(e.ref, e.popoverEl, e.popperOptions));
            });
          },
          onPopperUpdate: function onPopperUpdate(e) {
            e.placement ? this.placement = e.placement : e.state && (this.placement = e.state.placement);
          },
          beforeEnter: function beforeEnter(e) {
            this.$emit("beforeShow", e);
          },
          afterEnter: function afterEnter(e) {
            this.$emit("afterShow", e);
          },
          beforeLeave: function beforeLeave(e) {
            this.$emit("beforeHide", e);
          },
          afterLeave: function afterLeave(e) {
            this.destroyPopper(), this.$emit("afterHide", e);
          },
          destroyPopper: function destroyPopper() {
            this.popper && (this.popper.destroy(), this.popper = null);
          }
        }
      },
          pt = ft;
      n("d99e");

      function ht(e, t, n, r, a, o, i, s) {
        var c,
            u = "function" === typeof e ? e.options : e;
        if (t && (u.render = t, u.staticRenderFns = n, u._compiled = !0), r && (u.functional = !0), o && (u._scopeId = "data-v-" + o), i ? (c = function c(e) {
          e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" === typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), a && a.call(this, e), e && e._registeredComponents && e._registeredComponents.add(i);
        }, u._ssrRegister = c) : a && (c = s ? function () {
          a.call(this, (u.functional ? this.parent : this).$root.$options.shadowRoot);
        } : a), c) if (u.functional) {
          u._injectStyles = c;
          var l = u.render;

          u.render = function (e, t) {
            return c.call(t), l(e, t);
          };
        } else {
          var d = u.beforeCreate;
          u.beforeCreate = d ? [].concat(d, c) : [c];
        }
        return {
          exports: e,
          options: u
        };
      }

      var vt = ht(pt, at, ot, !1, null, "05016e86", null),
          bt = vt.exports,
          mt = function mt() {
        var e = this,
            t = e.$createElement,
            n = e._self._c || t;
        return n("div", {
          staticClass: "vc-day-popover-row"
        }, [e.indicator ? n("div", {
          staticClass: "vc-day-popover-row-indicator"
        }, [n("span", {
          class: e.indicator.class,
          style: e.indicator.style
        })]) : e._e(), n("div", {
          staticClass: "vc-day-popover-row-content"
        }, [e._t("default", [e._v(e._s(e.attribute.popover ? e.attribute.popover.label : "No content provided"))])], 2)]);
      },
          gt = [],
          yt = n("51ec");

      var wt = {
        inject: ["sharedState"],
        mixins: [yt["a"]],
        computed: {
          masks: function masks() {
            return this.sharedState.masks;
          },
          theme: function theme() {
            return this.sharedState.theme;
          },
          locale: function locale() {
            return this.sharedState.locale;
          },
          dayPopoverId: function dayPopoverId() {
            return this.sharedState.dayPopoverId;
          }
        },
        methods: {
          format: function format(e, t) {
            return this.locale.format(e, t);
          },
          pageForDate: function pageForDate(e) {
            return this.locale.getDateParts(this.locale.normalizeDate(e));
          }
        }
      },
          xt = ["base", "start", "end", "startEnd"],
          Dt = ["class", "contentClass", "style", "contentStyle", "color", "fillMode"],
          jt = {
        color: "blue",
        isDark: !1,
        highlight: {
          base: {
            fillMode: "light"
          },
          start: {
            fillMode: "solid"
          },
          end: {
            fillMode: "solid"
          }
        },
        dot: {
          base: {
            fillMode: "solid"
          },
          start: {
            fillMode: "solid"
          },
          end: {
            fillMode: "solid"
          }
        },
        bar: {
          base: {
            fillMode: "solid"
          },
          start: {
            fillMode: "solid"
          },
          end: {
            fillMode: "solid"
          }
        },
        content: {
          base: {},
          start: {},
          end: {}
        }
      };

      var Ot = /*#__PURE__*/function () {
        function Ot(e) {
          _classCallCheck(this, Ot);

          Object.assign(this, jt, e);
        }

        _createClass(Ot, [{
          key: "normalizeAttr",
          value: function normalizeAttr(_ref11) {
            var e = _ref11.config,
                t = _ref11.type;
            var n = this.color,
                r = {};
            var a = this[t];
            if (!0 === e || Object(dt["n"])(e)) n = Object(dt["n"])(e) ? e : n, r = _objectSpread({}, a);else {
              if (!Object(dt["m"])(e)) return null;
              r = Object(dt["f"])(e, xt) ? _objectSpread({}, e) : {
                base: _objectSpread({}, e),
                start: _objectSpread({}, e),
                end: _objectSpread({}, e)
              };
            }
            return Object(dt["b"])(r, {
              start: r.startEnd,
              end: r.startEnd
            }, a), Object(dt["w"])(r).forEach(function (_ref12) {
              var _ref13 = _slicedToArray(_ref12, 2),
                  e = _ref13[0],
                  t = _ref13[1];

              var a = n;
              !0 === t || Object(dt["n"])(t) ? (a = Object(dt["n"])(t) ? t : a, r[e] = {
                color: a
              }) : Object(dt["m"])(t) && (Object(dt["f"])(t, Dt) ? r[e] = _objectSpread({}, t) : r[e] = {}), Object(dt["e"])(r, e + ".color") || Object(dt["u"])(r, e + ".color", a);
            }), r;
          }
        }, {
          key: "normalizeHighlight",
          value: function normalizeHighlight(e) {
            var t = this;
            var n = this.normalizeAttr({
              config: e,
              type: "highlight"
            });
            return Object(dt["w"])(n).forEach(function (_ref14) {
              var _ref15 = _slicedToArray(_ref14, 2),
                  e = _ref15[0],
                  n = _ref15[1];

              var r = Object(dt["b"])(n, {
                isDark: t.isDark,
                color: t.color
              });
              n.style = _objectSpread(_objectSpread({}, t.getHighlightBgStyle(r)), n.style), n.contentStyle = _objectSpread(_objectSpread({}, t.getHighlightContentStyle(r)), n.contentStyle);
            }), n;
          }
        }, {
          key: "getHighlightBgStyle",
          value: function getHighlightBgStyle(_ref16) {
            var e = _ref16.fillMode,
                t = _ref16.color,
                n = _ref16.isDark;

            switch (e) {
              case "outline":
              case "none":
                return {
                  backgroundColor: n ? "var(--gray-900)" : "var(--white)",
                  border: "2px solid",
                  borderColor: n ? "var(--".concat(t, "-200)") : "var(--".concat(t, "-700)"),
                  borderRadius: "var(--rounded-full)"
                };

              case "light":
                return {
                  backgroundColor: n ? "var(--".concat(t, "-800)") : "var(--".concat(t, "-200)"),
                  opacity: n ? .75 : 1,
                  borderRadius: "var(--rounded-full)"
                };

              case "solid":
                return {
                  backgroundColor: n ? "var(--".concat(t, "-500)") : "var(--".concat(t, "-600)"),
                  borderRadius: "var(--rounded-full)"
                };

              default:
                return {
                  borderRadius: "var(--rounded-full)"
                };
            }
          }
        }, {
          key: "getHighlightContentStyle",
          value: function getHighlightContentStyle(_ref17) {
            var e = _ref17.fillMode,
                t = _ref17.color,
                n = _ref17.isDark;

            switch (e) {
              case "outline":
              case "none":
                return {
                  fontWeight: "var(--font-bold)",
                  color: n ? "var(--".concat(t, "-100)") : "var(--".concat(t, "-900)")
                };

              case "light":
                return {
                  fontWeight: "var(--font-bold)",
                  color: n ? "var(--".concat(t, "-100)") : "var(--".concat(t, "-900)")
                };

              case "solid":
                return {
                  fontWeight: "var(--font-bold)",
                  color: "var(--white)"
                };

              default:
                return "";
            }
          }
        }, {
          key: "bgAccentHigh",
          value: function bgAccentHigh(_ref18) {
            var e = _ref18.color,
                t = _ref18.isDark;
            return {
              backgroundColor: t ? "var(--".concat(e, "-500)") : "var(--".concat(e, "-600)")
            };
          }
        }, {
          key: "contentAccent",
          value: function contentAccent(_ref19) {
            var e = _ref19.color,
                t = _ref19.isDark;
            return e ? {
              fontWeight: "var(--font-bold)",
              color: t ? "var(--".concat(e, "-100)") : "var(--".concat(e, "-900)")
            } : null;
          }
        }, {
          key: "normalizeDot",
          value: function normalizeDot(e) {
            return this.normalizeNonHighlight("dot", e, this.bgAccentHigh);
          }
        }, {
          key: "normalizeBar",
          value: function normalizeBar(e) {
            return this.normalizeNonHighlight("bar", e, this.bgAccentHigh);
          }
        }, {
          key: "normalizeContent",
          value: function normalizeContent(e) {
            return this.normalizeNonHighlight("content", e, this.contentAccent);
          }
        }, {
          key: "normalizeNonHighlight",
          value: function normalizeNonHighlight(e, t, n) {
            var r = this;
            var a = this.normalizeAttr({
              type: e,
              config: t
            });
            return Object(dt["w"])(a).forEach(function (_ref20) {
              var _ref21 = _slicedToArray(_ref20, 2),
                  e = _ref21[0],
                  t = _ref21[1];

              Object(dt["b"])(t, {
                isDark: r.isDark,
                color: r.color
              }), t.style = _objectSpread(_objectSpread({}, n(t)), t.style);
            }), a;
          }
        }]);

        return Ot;
      }();

      var kt = n("29ae"),
          Mt = n("1315"),
          Pt = n("22f3");
      var St = {
        mixins: [yt["a"]],
        props: {
          color: String,
          isDark: Boolean,
          firstDayOfWeek: Number,
          masks: Object,
          locale: [String, Object],
          timezone: String,
          minDate: null,
          maxDate: null,
          minDateExact: null,
          maxDateExact: null,
          disabledDates: null,
          availableDates: null,
          theme: null
        },
        computed: {
          $theme: function $theme() {
            return this.theme instanceof Ot ? this.theme : new Ot({
              color: this.passedProp("color", "blue"),
              isDark: this.passedProp("isDark", !1)
            });
          },
          $locale: function $locale() {
            if (this.locale instanceof kt["b"]) return this.locale;
            var e = Object(dt["m"])(this.locale) ? this.locale : {
              id: this.locale,
              firstDayOfWeek: this.firstDayOfWeek,
              masks: this.masks
            };
            return new kt["b"](e, {
              locales: this.$locales,
              timezone: this.timezone
            });
          },
          disabledDates_: function disabledDates_() {
            var e = this.normalizeDates(this.disabledDates),
                t = this.minDate,
                n = this.minDateExact,
                r = this.maxDate,
                a = this.maxDateExact;

            if (n || t) {
              var _r2 = n ? this.normalizeDate(n) : this.normalizeDate(t, {
                time: "00:00:00"
              });

              e.push({
                start: null,
                end: new Date(_r2.getTime() - 1e3)
              });
            }

            if (a || r) {
              var _t5 = a ? this.normalizeDate(a) : this.normalizeDate(r, {
                time: "23:59:59"
              });

              e.push({
                start: new Date(_t5.getTime() + 1e3),
                end: null
              });
            }

            return e;
          },
          availableDates_: function availableDates_() {
            return this.normalizeDates(this.availableDates);
          },
          disabledAttribute: function disabledAttribute() {
            return new Pt["a"]({
              key: "disabled",
              dates: this.disabledDates_,
              excludeDates: this.availableDates_,
              excludeMode: "includes",
              order: 100
            }, this.$theme, this.$locale);
          }
        },
        created: function created() {
          Object(Mt["a"])(this.$defaults.screens);
        },
        methods: {
          formatDate: function formatDate(e, t) {
            return this.$locale ? this.$locale.format(e, t) : "";
          },
          parseDate: function parseDate(e, t) {
            if (!this.$locale) return null;
            var n = this.$locale.parse(e, t);
            return Object(dt["j"])(n) ? n : null;
          },
          normalizeDate: function normalizeDate(e, t) {
            return this.$locale ? this.$locale.normalizeDate(e, t) : e;
          },
          normalizeDates: function normalizeDates(e) {
            return this.$locale.normalizeDates(e, {
              isFullDay: !0
            });
          },
          pageForDate: function pageForDate(e) {
            return this.$locale.getDateParts(this.normalizeDate(e));
          },
          pageForThisMonth: function pageForThisMonth() {
            return this.pageForDate(new Date());
          }
        }
      },
          Yt = {
        methods: {
          safeScopedSlot: function safeScopedSlot(e, t) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            return Object(dt["k"])(this.$scopedSlots[e]) ? this.$scopedSlots[e](t) : n;
          }
        }
      },
          Et = wt,
          _t = St,
          Tt = Yt;

      var It = {
        name: "PopoverRow",
        mixins: [Et],
        props: {
          attribute: Object
        },
        computed: {
          indicator: function indicator() {
            var _this$attribute = this.attribute,
                e = _this$attribute.highlight,
                t = _this$attribute.dot,
                n = _this$attribute.bar,
                r = _this$attribute.popover;
            if (r && r.hideIndicator) return null;

            if (e) {
              var _e$start = e.start,
                  _t6 = _e$start.color,
                  _n5 = _e$start.isDark;
              return {
                style: _objectSpread(_objectSpread({}, this.theme.bgAccentHigh({
                  color: _t6,
                  isDark: !_n5
                })), {}, {
                  width: "10px",
                  height: "5px",
                  borderRadius: "3px"
                })
              };
            }

            if (t) {
              var _t$start = t.start,
                  _e12 = _t$start.color,
                  _n6 = _t$start.isDark;
              return {
                style: _objectSpread(_objectSpread({}, this.theme.bgAccentHigh({
                  color: _e12,
                  isDark: !_n6
                })), {}, {
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%"
                })
              };
            }

            if (n) {
              var _n$start = n.start,
                  _e13 = _n$start.color,
                  _t7 = _n$start.isDark;
              return {
                style: _objectSpread(_objectSpread({}, this.theme.bgAccentHigh({
                  color: _e13,
                  isDark: !_t7
                })), {}, {
                  width: "10px",
                  height: "3px"
                })
              };
            }

            return null;
          }
        }
      },
          Ct = It,
          $t = (n("2b27"), ht(Ct, mt, gt, !1, null, "4975d69e", null)),
          At = $t.exports,
          Nt = function Nt() {
        var e = this,
            t = e.$createElement,
            n = e._self._c || t;
        return n("div", {
          staticClass: "vc-nav-container"
        }, [n("div", {
          staticClass: "vc-nav-header"
        }, [n("span", {
          staticClass: "vc-nav-arrow is-left",
          class: {
            "is-disabled": !e.prevItemsEnabled
          },
          attrs: {
            role: "button",
            tabindex: e.prevItemsEnabled ? 0 : void 0
          },
          on: {
            click: e.movePrev,
            keydown: function keydown(t) {
              return e.onSpaceOrEnter(t, e.movePrev);
            }
          }
        }, [e._t("nav-left-button", [n("svg-icon", {
          attrs: {
            name: "left-arrow",
            width: "20px",
            height: "24px"
          }
        })])], 2), n("span", {
          staticClass: "vc-nav-title vc-grid-focus",
          style: {
            whiteSpace: "nowrap"
          },
          attrs: {
            role: "button",
            tabindex: "0"
          },
          on: {
            click: e.toggleMode,
            keydown: function keydown(t) {
              return e.onSpaceOrEnter(t, e.toggleMode);
            }
          }
        }, [e._v(" " + e._s(e.title) + " ")]), n("span", {
          staticClass: "vc-nav-arrow is-right",
          class: {
            "is-disabled": !e.nextItemsEnabled
          },
          attrs: {
            role: "button",
            tabindex: e.nextItemsEnabled ? 0 : void 0
          },
          on: {
            click: e.moveNext,
            keydown: function keydown(t) {
              return e.onSpaceOrEnter(t, e.moveNext);
            }
          }
        }, [e._t("nav-right-button", [n("svg-icon", {
          attrs: {
            name: "right-arrow",
            width: "20px",
            height: "24px"
          }
        })])], 2)]), n("div", {
          staticClass: "vc-nav-items"
        }, e._l(e.activeItems, function (t) {
          return n("span", {
            key: t.label,
            class: e.getItemClasses(t),
            attrs: {
              role: "button",
              "data-id": t.id,
              "aria-label": t.ariaLabel,
              tabindex: t.isDisabled ? void 0 : 0
            },
            on: {
              click: t.click,
              keydown: function keydown(n) {
                return e.onSpaceOrEnter(n, t.click);
              }
            }
          }, [e._v(" " + e._s(t.label) + " ")]);
        }), 0)]);
      },
          Ft = [],
          zt = function zt() {
        var e = this,
            t = e.$createElement,
            n = e._self._c || t;
        return n("svg", e._g({
          staticClass: "vc-svg-icon",
          attrs: {
            width: e.width,
            height: e.height,
            viewBox: e.viewBox
          }
        }, e.$listeners), [n("path", {
          attrs: {
            d: e.path
          }
        })]);
      },
          Lt = [];

      var Ht = "26px",
          Rt = "0 0 32 32",
          Wt = {
        "left-arrow": {
          viewBox: "0 -1 16 34",
          path: "M11.196 10c0 0.143-0.071 0.304-0.179 0.411l-7.018 7.018 7.018 7.018c0.107 0.107 0.179 0.268 0.179 0.411s-0.071 0.304-0.179 0.411l-0.893 0.893c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-8.321-8.321c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l8.321-8.321c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l0.893 0.893c0.107 0.107 0.179 0.25 0.179 0.411z"
        },
        "right-arrow": {
          viewBox: "-5 -1 16 34",
          path: "M10.625 17.429c0 0.143-0.071 0.304-0.179 0.411l-8.321 8.321c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-0.893-0.893c-0.107-0.107-0.179-0.25-0.179-0.411 0-0.143 0.071-0.304 0.179-0.411l7.018-7.018-7.018-7.018c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l0.893-0.893c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l8.321 8.321c0.107 0.107 0.179 0.268 0.179 0.411z"
        }
      };
      var Vt = {
        props: ["name"],
        data: function data() {
          return {
            width: Ht,
            height: Ht,
            viewBox: Rt,
            path: "",
            isBaseline: !1
          };
        },
        mounted: function mounted() {
          this.updateIcon();
        },
        watch: {
          name: function name() {
            this.updateIcon();
          }
        },
        methods: {
          updateIcon: function updateIcon() {
            var e = Wt[this.name];
            e && (this.width = e.width || Ht, this.height = e.height || Ht, this.viewBox = e.viewBox, this.path = e.path);
          }
        }
      },
          Ut = Vt,
          Bt = (n("cc2e"), ht(Ut, zt, Lt, !1, null, "19b6cf78", null)),
          Zt = Bt.exports;
      var qt = 12;
      var Gt = {
        name: "CalendarNav",
        components: {
          SvgIcon: Zt
        },
        mixins: [Et],
        props: {
          value: {
            type: Object,
            default: function _default() {
              return {
                month: 0,
                year: 0
              };
            }
          },
          validator: {
            type: Function,
            default: function _default() {
              return function () {
                return !0;
              };
            }
          }
        },
        data: function data() {
          return {
            monthMode: !0,
            yearIndex: 0,
            yearGroupIndex: 0,
            onSpaceOrEnter: ut["l"]
          };
        },
        computed: {
          month: function month() {
            return this.value && this.value.month || 0;
          },
          year: function year() {
            return this.value && this.value.year || 0;
          },
          title: function title() {
            return this.monthMode ? this.yearIndex : "".concat(this.firstYear, " - ").concat(this.lastYear);
          },
          monthItems: function monthItems() {
            return this.getMonthItems(this.yearIndex);
          },
          yearItems: function yearItems() {
            return this.getYearItems(this.yearGroupIndex);
          },
          prevItemsEnabled: function prevItemsEnabled() {
            return this.monthMode ? this.prevMonthItemsEnabled : this.prevYearItemsEnabled;
          },
          nextItemsEnabled: function nextItemsEnabled() {
            return this.monthMode ? this.nextMonthItemsEnabled : this.nextYearItemsEnabled;
          },
          prevMonthItemsEnabled: function prevMonthItemsEnabled() {
            return this.getMonthItems(this.yearIndex - 1).some(function (e) {
              return !e.isDisabled;
            });
          },
          nextMonthItemsEnabled: function nextMonthItemsEnabled() {
            return this.getMonthItems(this.yearIndex + 1).some(function (e) {
              return !e.isDisabled;
            });
          },
          prevYearItemsEnabled: function prevYearItemsEnabled() {
            return this.getYearItems(this.yearGroupIndex - 1).some(function (e) {
              return !e.isDisabled;
            });
          },
          nextYearItemsEnabled: function nextYearItemsEnabled() {
            return this.getYearItems(this.yearGroupIndex + 1).some(function (e) {
              return !e.isDisabled;
            });
          },
          activeItems: function activeItems() {
            return this.monthMode ? this.monthItems : this.yearItems;
          },
          firstYear: function firstYear() {
            return Object(dt["g"])(this.yearItems.map(function (e) {
              return e.year;
            }));
          },
          lastYear: function lastYear() {
            return Object(dt["p"])(this.yearItems.map(function (e) {
              return e.year;
            }));
          }
        },
        watch: {
          year: function year() {
            this.yearIndex = this.year;
          },
          yearIndex: function yearIndex(e) {
            this.yearGroupIndex = this.getYearGroupIndex(e);
          },
          value: function value() {
            this.focusFirstItem();
          }
        },
        created: function created() {
          this.yearIndex = this.year;
        },
        mounted: function mounted() {
          this.focusFirstItem();
        },
        methods: {
          focusFirstItem: function focusFirstItem() {
            var e = this;
            this.$nextTick(function () {
              var t = e.$el.querySelector(".vc-nav-item:not(.is-disabled)");
              t && t.focus();
            });
          },
          getItemClasses: function getItemClasses(_ref22) {
            var e = _ref22.isActive,
                t = _ref22.isCurrent,
                n = _ref22.isDisabled;
            var r = ["vc-nav-item"];
            return e ? r.push("is-active") : t && r.push("is-current"), n && r.push("is-disabled"), r;
          },
          getYearGroupIndex: function getYearGroupIndex(e) {
            return Math.floor(e / qt);
          },
          getMonthItems: function getMonthItems(e) {
            var t = this;

            var _this$pageForDate = this.pageForDate(new Date()),
                n = _this$pageForDate.month,
                r = _this$pageForDate.year;

            return this.locale.getMonthDates().map(function (a, o) {
              var i = o + 1;
              return {
                month: i,
                year: e,
                id: "".concat(e, ".").concat(Object(ut["m"])(i, 2)),
                label: t.locale.format(a, t.masks.navMonths),
                ariaLabel: t.locale.format(a, "MMMM YYYY"),
                isActive: i === t.month && e === t.year,
                isCurrent: i === n && e === r,
                isDisabled: !t.validator({
                  month: i,
                  year: e
                }),
                click: function click() {
                  return t.monthClick(i, e);
                }
              };
            });
          },
          getYearItems: function getYearItems(e) {
            var _this = this;

            var t = this;

            var _this$pageForDate2 = this.pageForDate(new Date()),
                n = _this$pageForDate2._,
                r = _this$pageForDate2.year,
                a = e * qt,
                o = a + qt,
                i = [];

            var _loop = function _loop(_s2) {
              var e = !1;

              for (var _t8 = 1; _t8 < 12; _t8++) {
                if (e = _this.validator({
                  month: _t8,
                  year: _s2
                }), e) break;
              }

              i.push({
                year: _s2,
                id: _s2,
                label: _s2,
                ariaLabel: _s2,
                isActive: _s2 === _this.year,
                isCurrent: _s2 === r,
                isDisabled: !e,
                click: function click() {
                  return t.yearClick(_s2);
                }
              });
            };

            for (var _s2 = a; _s2 < o; _s2 += 1) {
              _loop(_s2);
            }

            return i;
          },
          monthClick: function monthClick(e, t) {
            this.validator({
              month: e,
              year: t
            }) && this.$emit("input", {
              month: e,
              year: t
            });
          },
          yearClick: function yearClick(e) {
            this.yearIndex = e, this.monthMode = !0, this.focusFirstItem();
          },
          toggleMode: function toggleMode() {
            this.monthMode = !this.monthMode;
          },
          movePrev: function movePrev() {
            this.prevItemsEnabled && (this.monthMode && this.movePrevYear(), this.movePrevYearGroup());
          },
          moveNext: function moveNext() {
            this.nextItemsEnabled && (this.monthMode && this.moveNextYear(), this.moveNextYearGroup());
          },
          movePrevYear: function movePrevYear() {
            this.yearIndex--;
          },
          moveNextYear: function moveNextYear() {
            this.yearIndex++;
          },
          movePrevYearGroup: function movePrevYearGroup() {
            this.yearGroupIndex--;
          },
          moveNextYearGroup: function moveNextYearGroup() {
            this.yearGroupIndex++;
          }
        }
      },
          Kt = Gt,
          Xt = (n("3c55"), ht(Kt, Nt, Ft, !1, null, null, null)),
          Jt = Xt.exports;

      function Qt(e) {
        document && document.dispatchEvent(new CustomEvent("show-popover", {
          detail: e
        }));
      }

      function en(e) {
        document && document.dispatchEvent(new CustomEvent("hide-popover", {
          detail: e
        }));
      }

      function tn(e) {
        document && document.dispatchEvent(new CustomEvent("toggle-popover", {
          detail: e
        }));
      }

      function nn(e) {
        document && document.dispatchEvent(new CustomEvent("update-popover", {
          detail: e
        }));
      }

      function rn(e) {
        var t = e.visibility,
            n = "click" === t,
            r = "hover" === t,
            a = "hover-focus" === t,
            o = "focus" === t;
        e.autoHide = !n;
        var i = !1,
            s = !1;
        return {
          click: function click(t) {
            n && (e.ref = t.target, tn(e), t.stopPropagation());
          },
          mousemove: function mousemove(t) {
            e.ref = t.currentTarget, i || (i = !0, (r || a) && Qt(e));
          },
          mouseleave: function mouseleave(t) {
            e.ref = t.target, i && (i = !1, (r || a && !s) && en(e));
          },
          focusin: function focusin(t) {
            e.ref = t.currentTarget, s || (s = !0, (o || a) && Qt(e));
          },
          focusout: function focusout(t) {
            e.ref = t.currentTarget, s && !Object(ut["e"])(e.ref, t.relatedTarget) && (s = !1, (o || a && !i) && en(e));
          }
        };
      }

      var an,
          on,
          sn,
          cn,
          un,
          ln,
          dn,
          fn,
          pn = {
        name: "CalendarDay",
        mixins: [Et, Tt],
        render: function render(e) {
          var t = this;

          var n = function n() {
            return t.hasBackgrounds && e("div", {
              class: "vc-highlights vc-day-layer"
            }, t.backgrounds.map(function (_ref23) {
              var t = _ref23.key,
                  n = _ref23.wrapperClass,
                  r = _ref23.class,
                  a = _ref23.style;
              return e("div", {
                key: t,
                class: n
              }, [e("div", {
                class: r,
                style: a
              })]);
            }));
          },
              r = function r() {
            return t.safeScopedSlot("day-content", {
              day: t.day,
              attributes: t.day.attributes,
              attributesMap: t.day.attributesMap,
              dayProps: t.dayContentProps,
              dayEvents: t.dayContentEvents
            }) || e("span", {
              class: t.dayContentClass,
              style: t.dayContentStyle,
              attrs: _objectSpread({}, t.dayContentProps),
              on: t.dayContentEvents,
              ref: "content"
            }, [t.day.label]);
          },
              a = function a() {
            return t.hasDots && e("div", {
              class: "vc-day-layer vc-day-box-center-bottom"
            }, [e("div", {
              class: "vc-dots"
            }, t.dots.map(function (_ref24) {
              var t = _ref24.key,
                  n = _ref24.class,
                  r = _ref24.style;
              return e("span", {
                key: t,
                class: n,
                style: r
              });
            }))]);
          },
              o = function o() {
            return t.hasBars && e("div", {
              class: "vc-day-layer vc-day-box-center-bottom"
            }, [e("div", {
              class: "vc-bars"
            }, t.bars.map(function (_ref25) {
              var t = _ref25.key,
                  n = _ref25.class,
                  r = _ref25.style;
              return e("span", {
                key: t,
                class: n,
                style: r
              });
            }))]);
          };

          return e("div", {
            class: ["vc-day"].concat(_toConsumableArray(this.day.classes), [{
              "vc-day-box-center-center": !this.$scopedSlots["day-content"]
            }, {
              "is-not-in-month": !this.inMonth
            }])
          }, [n(), r(), a(), o()]);
        },
        inject: ["sharedState"],
        props: {
          day: {
            type: Object,
            required: !0
          }
        },
        data: function data() {
          return {
            glyphs: {},
            dayContentEvents: {}
          };
        },
        computed: {
          label: function label() {
            return this.day.label;
          },
          startTime: function startTime() {
            return this.day.range.start.getTime();
          },
          endTime: function endTime() {
            return this.day.range.end.getTime();
          },
          inMonth: function inMonth() {
            return this.day.inMonth;
          },
          isDisabled: function isDisabled() {
            return this.day.isDisabled;
          },
          backgrounds: function backgrounds() {
            return this.glyphs.backgrounds;
          },
          hasBackgrounds: function hasBackgrounds() {
            return !!Object(ut["b"])(this.backgrounds);
          },
          content: function content() {
            return this.glyphs.content;
          },
          dots: function dots() {
            return this.glyphs.dots;
          },
          hasDots: function hasDots() {
            return !!Object(ut["b"])(this.dots);
          },
          bars: function bars() {
            return this.glyphs.bars;
          },
          hasBars: function hasBars() {
            return !!Object(ut["b"])(this.bars);
          },
          popovers: function popovers() {
            return this.glyphs.popovers;
          },
          hasPopovers: function hasPopovers() {
            return !!Object(ut["b"])(this.popovers);
          },
          dayContentClass: function dayContentClass() {
            return ["vc-day-content vc-focusable", {
              "is-disabled": this.isDisabled
            }, Object(dt["d"])(Object(dt["p"])(this.content), "class") || ""];
          },
          dayContentStyle: function dayContentStyle() {
            return Object(dt["d"])(Object(dt["p"])(this.content), "style");
          },
          dayContentProps: function dayContentProps() {
            var e;
            return this.day.isFocusable ? e = "0" : this.day.inMonth && (e = "-1"), {
              tabindex: e,
              "aria-label": this.day.ariaLabel,
              "aria-disabled": this.day.isDisabled ? "true" : "false",
              role: "button"
            };
          },
          dayEvent: function dayEvent() {
            return _objectSpread(_objectSpread({}, this.day), {}, {
              el: this.$refs.content,
              popovers: this.popovers
            });
          }
        },
        watch: {
          theme: function theme() {
            this.refresh();
          },
          popovers: function popovers() {
            this.refreshPopovers();
          }
        },
        mounted: function mounted() {
          this.refreshPopovers();
        },
        methods: {
          getDayEvent: function getDayEvent(e) {
            return _objectSpread(_objectSpread({}, this.dayEvent), {}, {
              event: e
            });
          },
          click: function click(e) {
            this.$emit("dayclick", this.getDayEvent(e));
          },
          mouseenter: function mouseenter(e) {
            this.$emit("daymouseenter", this.getDayEvent(e));
          },
          mouseleave: function mouseleave(e) {
            this.$emit("daymouseleave", this.getDayEvent(e));
          },
          focusin: function focusin(e) {
            this.$emit("dayfocusin", this.getDayEvent(e));
          },
          focusout: function focusout(e) {
            this.$emit("dayfocusout", this.getDayEvent(e));
          },
          keydown: function keydown(e) {
            this.$emit("daykeydown", this.getDayEvent(e));
          },
          refresh: function refresh() {
            var e = this;
            if (!this.day.refresh) return;
            this.day.refresh = !1;
            var t = {
              backgrounds: [],
              dots: [],
              bars: [],
              popovers: [],
              content: []
            };
            this.$set(this.day, "attributes", Object.values(this.day.attributesMap || {}).sort(function (e, t) {
              return e.order - t.order;
            })), this.day.attributes.forEach(function (n) {
              var r = n.targetDate,
                  a = r.isDate,
                  o = r.isComplex,
                  i = r.startTime,
                  s = r.endTime,
                  c = e.startTime <= i,
                  u = e.endTime >= s,
                  l = c && u,
                  d = c || u,
                  f = {
                isDate: a,
                isComplex: o,
                onStart: c,
                onEnd: u,
                onStartAndEnd: l,
                onStartOrEnd: d
              };
              e.processHighlight(n, f, t), e.processNonHighlight(n, "content", f, t.content), e.processNonHighlight(n, "dot", f, t.dots), e.processNonHighlight(n, "bar", f, t.bars), e.processPopover(n, t);
            }), this.glyphs = t;
          },
          processHighlight: function processHighlight(_ref26, _ref27, _ref28) {
            var e = _ref26.key,
                t = _ref26.highlight;
            var n = _ref27.isDate,
                r = _ref27.isComplex,
                a = _ref27.onStart,
                o = _ref27.onEnd,
                i = _ref27.onStartAndEnd;
            var s = _ref28.backgrounds,
                c = _ref28.content;
            if (!t) return;
            var u = t.base,
                l = t.start,
                d = t.end;
            n || r || i ? (s.push({
              key: e,
              wrapperClass: "vc-day-layer vc-day-box-center-center",
              class: ["vc-highlight", l.class],
              style: l.style
            }), c.push({
              key: e + "-content",
              class: l.contentClass,
              style: l.contentStyle
            })) : a ? (s.push({
              key: e + "-base",
              wrapperClass: "vc-day-layer vc-day-box-right-center",
              class: ["vc-highlight vc-highlight-base-start", u.class],
              style: u.style
            }), s.push({
              key: e,
              wrapperClass: "vc-day-layer vc-day-box-center-center",
              class: ["vc-highlight", l.class],
              style: l.style
            }), c.push({
              key: e + "-content",
              class: l.contentClass,
              style: l.contentStyle
            })) : o ? (s.push({
              key: e + "-base",
              wrapperClass: "vc-day-layer vc-day-box-left-center",
              class: ["vc-highlight vc-highlight-base-end", u.class],
              style: u.style
            }), s.push({
              key: e,
              wrapperClass: "vc-day-layer vc-day-box-center-center",
              class: ["vc-highlight", d.class],
              style: d.style
            }), c.push({
              key: e + "-content",
              class: d.contentClass,
              style: d.contentStyle
            })) : (s.push({
              key: e + "-middle",
              wrapperClass: "vc-day-layer vc-day-box-center-center",
              class: ["vc-highlight vc-highlight-base-middle", u.class],
              style: u.style
            }), c.push({
              key: e + "-content",
              class: u.contentClass,
              style: u.contentStyle
            }));
          },
          processNonHighlight: function processNonHighlight(e, t, _ref29, o) {
            var n = _ref29.isDate,
                r = _ref29.onStart,
                a = _ref29.onEnd;
            if (!e[t]) return;
            var i = e.key,
                s = "vc-" + t,
                _e$t = e[t],
                c = _e$t.base,
                u = _e$t.start,
                l = _e$t.end;
            n || r ? o.push({
              key: i,
              class: [s, u.class],
              style: u.style
            }) : a ? o.push({
              key: i,
              class: [s, l.class],
              style: l.style
            }) : o.push({
              key: i,
              class: [s, c.class],
              style: c.style
            });
          },
          processPopover: function processPopover(e, _ref30) {
            var t = _ref30.popovers;
            var n = e.key,
                r = e.customData,
                a = e.popover;
            if (!a) return;
            var o = Object(dt["b"])({
              key: n,
              customData: r,
              attribute: e
            }, _objectSpread({}, a), {
              visibility: a.label ? "hover" : "click",
              placement: "bottom",
              isInteractive: !a.label
            });
            t.splice(0, 0, o);
          },
          refreshPopovers: function refreshPopovers() {
            var e = {};
            Object(ut["b"])(this.popovers) && (e = rn(Object(dt["b"]).apply(void 0, [{
              id: this.dayPopoverId,
              data: this.day
            }].concat(_toConsumableArray(this.popovers))))), this.dayContentEvents = Object(ut["h"])({
              click: this.click,
              mouseenter: this.mouseenter,
              mouseleave: this.mouseleave,
              focusin: this.focusin,
              focusout: this.focusout,
              keydown: this.keydown
            }, e), nn({
              id: this.dayPopoverId,
              data: this.day
            });
          }
        }
      },
          hn = pn,
          vn = (n("ea80"), ht(hn, an, on, !1, null, "005dafc8", null)),
          bn = vn.exports,
          mn = {
        name: "CalendarPane",
        mixins: [Et, Tt],
        render: function render(e) {
          var t = this;
          var n = this.safeScopedSlot("header", this.page) || e("div", {
            class: "vc-header align-" + this.titlePosition
          }, [e("div", {
            class: "vc-title",
            on: this.navPopoverEvents
          }, [this.safeScopedSlot("header-title", this.page, this.page.title)])]),
              r = this.weekdayLabels.map(function (t, n) {
            return e("div", {
              key: n + 1,
              class: "vc-weekday"
            }, [t]);
          }),
              a = this.showWeeknumbers_.startsWith("left"),
              o = this.showWeeknumbers_.startsWith("right");
          a ? r.unshift(e("div", {
            class: "vc-weekday"
          })) : o && r.push(e("div", {
            class: "vc-weekday"
          }));

          var i = function i(n) {
            return e("div", {
              class: ["vc-weeknumber"]
            }, [e("span", {
              class: ["vc-weeknumber-content", "is-" + t.showWeeknumbers_],
              on: {
                click: function click(e) {
                  t.$emit("weeknumberclick", {
                    weeknumber: n,
                    days: t.page.days.filter(function (e) {
                      return e[t.weeknumberKey] === n;
                    }),
                    event: e
                  });
                }
              }
            }, [n])]);
          },
              s = [],
              c = this.locale.daysInWeek;

          this.page.days.forEach(function (n, r) {
            var u = r % c;
            (a && 0 === u || o && u === c) && s.push(i(n[t.weeknumberKey])), s.push(e(bn, {
              attrs: {
                day: n
              },
              on: _objectSpread({}, t.$listeners),
              scopedSlots: t.$scopedSlots,
              key: n.id,
              ref: "days",
              refInFor: !0
            })), o && u === c - 1 && s.push(i(n[t.weeknumberKey]));
          });
          var u = e("div", {
            class: {
              "vc-weeks": !0,
              "vc-show-weeknumbers": this.showWeeknumbers_,
              "is-left": a,
              "is-right": o
            }
          }, [r, s]);
          return e("div", {
            class: ["vc-pane", "row-from-end-" + this.rowFromEnd, "column-from-end-" + this.columnFromEnd],
            ref: "pane"
          }, [n, u]);
        },
        inheritAttrs: !1,
        props: {
          page: Object,
          position: Number,
          row: Number,
          rowFromEnd: Number,
          column: Number,
          columnFromEnd: Number,
          titlePosition: String,
          navVisibility: String,
          showWeeknumbers: [Boolean, String],
          showIsoWeeknumbers: [Boolean, String]
        },
        computed: {
          weeknumberKey: function weeknumberKey() {
            return this.showWeeknumbers ? "weeknumber" : "isoWeeknumber";
          },
          showWeeknumbers_: function showWeeknumbers_() {
            var e = this.showWeeknumbers || this.showIsoWeeknumbers;
            return null == e ? "" : Object(dt["i"])(e) ? e ? "left" : "" : e.startsWith("right") ? this.columnFromEnd > 1 ? "right" : e : this.column > 1 ? "left" : e;
          },
          navVisibility_: function navVisibility_() {
            return this.propOrDefault("navVisibility", "navVisibility");
          },
          navPlacement: function navPlacement() {
            switch (this.titlePosition) {
              case "left":
                return "bottom-start";

              case "right":
                return "bottom-end";

              default:
                return "bottom";
            }
          },
          navPopoverEvents: function navPopoverEvents() {
            var e = this.sharedState,
                t = this.navVisibility_,
                n = this.navPlacement,
                r = this.page,
                a = this.position;
            return rn({
              id: e.navPopoverId,
              visibility: t,
              placement: n,
              modifiers: [{
                name: "flip",
                options: {
                  fallbackPlacements: ["bottom"]
                }
              }],
              data: {
                page: r,
                position: a
              },
              isInteractive: !0
            });
          },
          weekdayLabels: function weekdayLabels() {
            var e = this;
            return this.locale.getWeekdayDates().map(function (t) {
              return e.format(t, e.masks.weekdays);
            });
          }
        },
        methods: {
          refresh: function refresh() {
            this.$refs.days.forEach(function (e) {
              return e.refresh();
            });
          }
        }
      },
          gn = mn,
          yn = (n("f7c3"), n("4889"), ht(gn, sn, cn, !1, null, "37fb1233", null)),
          wn = yn.exports,
          xn = {
        name: "CustomTransition",
        render: function render(e) {
          return e("transition", {
            props: {
              name: this.name_,
              appear: this.appear
            },
            on: {
              beforeEnter: this.beforeEnter,
              afterEnter: this.afterEnter
            }
          }, [this.$slots.default]);
        },
        props: {
          name: String,
          appear: Boolean
        },
        computed: {
          name_: function name_() {
            return this.name || "none";
          }
        },
        methods: {
          beforeEnter: function beforeEnter(e) {
            this.$emit("beforeEnter", e), this.$emit("beforeTransition", e);
          },
          afterEnter: function afterEnter(e) {
            this.$emit("afterEnter", e), this.$emit("afterTransition", e);
          }
        }
      },
          Dn = xn,
          jn = (n("e76f"), ht(Dn, un, ln, !1, null, "8466592e", null)),
          On = jn.exports,
          kn = n("9349"),
          Mn = (n("3ee2"), {
        name: "Calendar",
        render: function render(e) {
          var t = this;

          var n = this.pages.map(function (n, r) {
            var a = r + 1,
                o = Math.ceil((r + 1) / t.columns),
                i = t.rows - o + 1,
                s = a % t.columns || t.columns,
                c = t.columns - s + 1;
            return e(wn, {
              attrs: _objectSpread(_objectSpread({}, t.$attrs), {}, {
                attributes: t.store
              }),
              props: {
                page: n,
                position: a,
                row: o,
                rowFromEnd: i,
                column: s,
                columnFromEnd: c,
                titlePosition: t.titlePosition_
              },
              on: _objectSpread(_objectSpread({}, t.$listeners), {}, {
                dayfocusin: function dayfocusin(e) {
                  t.lastFocusedDay = e, t.$emit("dayfocusin", e);
                },
                dayfocusout: function dayfocusout(e) {
                  t.lastFocusedDay = null, t.$emit("dayfocusout", e);
                }
              }),
              scopedSlots: t.$scopedSlots,
              key: n.key,
              ref: "pages",
              refInFor: !0
            });
          }),
              r = function r(n) {
            var r = function r() {
              return t.move(n ? -t.step_ : t.step_);
            },
                a = function a(e) {
              return Object(ut["l"])(e, r);
            },
                o = n ? !t.canMovePrev : !t.canMoveNext;

            return e("div", {
              class: ["vc-arrow", "is-" + (n ? "left" : "right"), {
                "is-disabled": o
              }],
              attrs: {
                role: "button"
              },
              on: {
                click: r,
                keydown: a
              }
            }, [(n ? t.safeScopedSlot("header-left-button", {
              click: r
            }) : t.safeScopedSlot("header-right-button", {
              click: r
            })) || e(Zt, {
              props: {
                name: n ? "left-arrow" : "right-arrow"
              }
            })]);
          },
              a = function a() {
            return e(bt, {
              props: {
                id: t.sharedState.navPopoverId,
                contentClass: "vc-nav-popover-container"
              },
              ref: "navPopover",
              scopedSlots: {
                default: function _default(_ref31) {
                  var n = _ref31.data;
                  var r = n.position,
                      a = n.page;
                  return e(Jt, {
                    props: {
                      value: a,
                      position: r,
                      validator: function validator(e) {
                        return t.canMove(e, {
                          position: r
                        });
                      }
                    },
                    on: {
                      input: function input(e) {
                        return t.move(e, {
                          position: r
                        });
                      }
                    },
                    scopedSlots: t.$scopedSlots
                  });
                }
              }
            });
          },
              o = function o() {
            return e(bt, {
              props: {
                id: t.sharedState.dayPopoverId,
                contentClass: "vc-day-popover-container"
              },
              scopedSlots: {
                default: function _default(_ref32) {
                  var n = _ref32.data,
                      r = _ref32.updateLayout,
                      a = _ref32.hide;
                  var o = Object.values(n.attributes).filter(function (e) {
                    return e.popover;
                  }),
                      i = t.$locale.masks,
                      s = t.formatDate,
                      c = s(n.date, i.dayPopover);
                  return t.safeScopedSlot("day-popover", {
                    day: n,
                    attributes: o,
                    masks: i,
                    format: s,
                    dayTitle: c,
                    updateLayout: r,
                    hide: a
                  }) || e("div", [i.dayPopover && e("div", {
                    class: ["vc-day-popover-header"]
                  }, [c]), o.map(function (t) {
                    return e(At, {
                      key: t.key,
                      props: {
                        attribute: t
                      }
                    });
                  })]);
                }
              }
            });
          };

          return e("div", {
            attrs: {
              "data-helptext": "Press the arrow keys to navigate by day, Home and End to navigate to week ends, PageUp and PageDown to navigate by month, Alt+PageUp and Alt+PageDown to navigate by year"
            },
            class: ["vc-container", "vc-" + this.$theme.color, {
              "vc-is-expanded": this.isExpanded,
              "vc-is-dark": this.$theme.isDark
            }],
            on: {
              keydown: this.handleKeydown,
              mouseup: function mouseup(e) {
                return e.preventDefault();
              }
            },
            ref: "container"
          }, [a(), e("div", {
            class: ["vc-pane-container", {
              "in-transition": this.inTransition
            }]
          }, [e(On, {
            props: {
              name: this.transitionName
            },
            on: {
              beforeEnter: function beforeEnter() {
                t.inTransition = !0;
              },
              afterEnter: function afterEnter() {
                t.inTransition = !1;
              }
            }
          }, [e("div", {
            class: "vc-pane-layout",
            style: {
              gridTemplateColumns: "repeat(".concat(this.columns, ", 1fr)")
            },
            attrs: _objectSpread({}, this.$attrs),
            key: Object(ut["b"])(this.pages) ? this.pages[0].key : ""
          }, n)]), e("div", {
            class: ["vc-arrows-container title-" + this.titlePosition_]
          }, [r(!0), r(!1)]), this.$scopedSlots.footer && this.$scopedSlots.footer()]), o()]);
        },
        mixins: [_t, Tt],
        provide: function provide() {
          return {
            sharedState: this.sharedState
          };
        },
        props: {
          rows: {
            type: Number,
            default: 1
          },
          columns: {
            type: Number,
            default: 1
          },
          step: Number,
          titlePosition: String,
          isExpanded: Boolean,
          fromDate: Date,
          toDate: Date,
          fromPage: Object,
          toPage: Object,
          minPage: Object,
          maxPage: Object,
          transition: String,
          attributes: [Object, Array],
          trimWeeks: Boolean,
          disablePageSwipe: Boolean
        },
        data: function data() {
          return {
            pages: [],
            store: null,
            lastFocusedDay: null,
            focusableDay: new Date().getDate(),
            transitionName: "",
            inTransition: !1,
            sharedState: {
              navPopoverId: Object(ut["c"])(),
              dayPopoverId: Object(ut["c"])(),
              theme: {},
              masks: {},
              locale: {}
            }
          };
        },
        computed: {
          titlePosition_: function titlePosition_() {
            return this.propOrDefault("titlePosition", "titlePosition");
          },
          firstPage: function firstPage() {
            return Object(dt["g"])(this.pages);
          },
          lastPage: function lastPage() {
            return Object(dt["p"])(this.pages);
          },
          minPage_: function minPage_() {
            return this.minPage || this.pageForDate(this.minDate);
          },
          maxPage_: function maxPage_() {
            return this.maxPage || this.pageForDate(this.maxDate);
          },
          count: function count() {
            return this.rows * this.columns;
          },
          step_: function step_() {
            return this.step || this.count;
          },
          canMovePrev: function canMovePrev() {
            return this.canMove(-this.step_);
          },
          canMoveNext: function canMoveNext() {
            return this.canMove(this.step_);
          }
        },
        watch: {
          $locale: function $locale() {
            this.refreshLocale(), this.refreshPages({
              page: this.firstPage,
              ignoreCache: !0
            }), this.initStore();
          },
          $theme: function $theme() {
            this.refreshTheme(), this.initStore();
          },
          fromDate: function fromDate() {
            this.refreshPages();
          },
          fromPage: function fromPage(e) {
            var t = this.pages && this.pages[0];
            Object(ut["q"])(e, t) || this.refreshPages();
          },
          toPage: function toPage(e) {
            var t = this.pages && this.pages[this.pages.length - 1];
            Object(ut["q"])(e, t) || this.refreshPages();
          },
          count: function count() {
            this.refreshPages();
          },
          attributes: function attributes(e) {
            var _this$store$refresh = this.store.refresh(e),
                t = _this$store$refresh.adds,
                n = _this$store$refresh.deletes;

            this.refreshAttrs(this.pages, t, n);
          },
          pages: function pages(e) {
            this.refreshAttrs(e, this.store.list, null, !0);
          },
          disabledAttribute: function disabledAttribute() {
            this.refreshDisabledDays();
          },
          lastFocusedDay: function lastFocusedDay(e) {
            e && (this.focusableDay = e.day, this.refreshFocusableDays());
          },
          inTransition: function inTransition(e) {
            e ? this.$emit("transition-start") : (this.$emit("transition-end"), this.transitionPromise && (this.transitionPromise.resolve(!0), this.transitionPromise = null));
          }
        },
        created: function created() {
          this.refreshLocale(), this.refreshTheme(), this.initStore(), this.refreshPages();
        },
        mounted: function mounted() {
          var e = this;

          if (!this.disablePageSwipe) {
            var _t9 = Object(lt["a"])(this.$refs.container, function (_ref33) {
              var t = _ref33.toLeft,
                  n = _ref33.toRight;
              t ? e.moveNext() : n && e.movePrev();
            }, this.$defaults.touch);

            this.$once("beforeDestroy", function () {
              return _t9();
            });
          }
        },
        methods: {
          refreshLocale: function refreshLocale() {
            this.sharedState.locale = this.$locale, this.sharedState.masks = this.$locale.masks;
          },
          refreshTheme: function refreshTheme() {
            this.sharedState.theme = this.$theme;
          },
          canMove: function canMove(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var n = this;
            var r = this.$locale.toPage(e, this.firstPage);
            var a = t.position;
            if (Object(dt["l"])(e) && (a = 1), !r) return Promise.reject(new Error("Invalid argument provided: " + e));
            if (!a) if (Object(ut["o"])(r, this.firstPage)) a = -1;else {
              if (!Object(ut["n"])(r, this.lastPage)) return Promise.resolve(!0);
              a = 1;
            }
            return Object.assign(t, this.getTargetPageRange(r, {
              position: a,
              force: !0
            })), Object(ut["s"])(t.fromPage, t.toPage).some(function (e) {
              return Object(ut["p"])(e, n.minPage_, n.maxPage_);
            });
          },
          movePrev: function movePrev(e) {
            return this.move(-this.step_, e);
          },
          moveNext: function moveNext(e) {
            return this.move(this.step_, e);
          },
          move: function move(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var n = this.canMove(e, t);
            return t.force || n ? (this.$refs.navPopover.hide({
              hideDelay: 0
            }), t.fromPage && !Object(ut["q"])(t.fromPage, this.firstPage) ? this.refreshPages(_objectSpread(_objectSpread({}, t), {}, {
              page: t.fromPage,
              position: 1,
              force: !0
            })) : Promise.resolve(!0)) : Promise.reject(new Error("Move target is disabled: " + JSON.stringify(t)));
          },
          focusDate: function focusDate(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var n = this;
            return this.move(e, t).then(function () {
              var t = n.$el.querySelector(".id-".concat(n.$locale.getDayId(e), ".in-month .vc-focusable"));
              return t ? (t.focus(), Promise.resolve(!0)) : Promise.resolve(!1);
            });
          },
          showPageRange: function showPageRange(e, t) {
            var n, r;
            if (Object(dt["j"])(e)) n = this.pageForDate(e);else {
              if (!Object(dt["m"])(e)) return Promise.reject(new Error("Invalid page range provided."));
              {
                var _t10 = e.month,
                    _a4 = e.year,
                    _o3 = e.from,
                    _i5 = e.to;
                Object(dt["l"])(_t10) && Object(dt["l"])(_a4) ? n = e : (_o3 || _i5) && (n = Object(dt["j"])(_o3) ? this.pageForDate(_o3) : _o3, r = Object(dt["j"])(_i5) ? this.pageForDate(_i5) : _i5);
              }
            }
            var a = this.lastPage;
            var o = n;
            return Object(ut["n"])(r, a) && (o = Object(ut["a"])(r, -(this.pages.length - 1))), Object(ut["o"])(o, n) && (o = n), this.refreshPages(_objectSpread(_objectSpread({}, t), {}, {
              page: o
            }));
          },
          getTargetPageRange: function getTargetPageRange(e) {
            var _ref34 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                t = _ref34.position,
                n = _ref34.force;

            var r = null,
                a = null;

            if (Object(ut["r"])(e)) {
              var _n7 = 0;
              t = +t, isNaN(t) || (_n7 = t > 0 ? 1 - t : -(this.count + t)), r = Object(ut["a"])(e, _n7);
            } else r = this.getDefaultInitialPage();

            return a = Object(ut["a"])(r, this.count - 1), n || (Object(ut["o"])(r, this.minPage_) ? r = this.minPage_ : Object(ut["n"])(a, this.maxPage_) && (r = Object(ut["a"])(this.maxPage_, 1 - this.count)), a = Object(ut["a"])(r, this.count - 1)), {
              fromPage: r,
              toPage: a
            };
          },
          getDefaultInitialPage: function getDefaultInitialPage() {
            var e = this.fromPage || this.pageForDate(this.fromDate);

            if (!Object(ut["r"])(e)) {
              var _t11 = this.toPage || this.pageForDate(this.toPage);

              Object(ut["r"])(_t11) && (e = Object(ut["a"])(_t11, 1 - this.count));
            }

            return Object(ut["r"])(e) || (e = this.getPageForAttributes()), Object(ut["r"])(e) || (e = this.pageForThisMonth()), e;
          },
          refreshPages: function refreshPages() {
            var _ref35 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                e = _ref35.page,
                _ref35$position = _ref35.position,
                t = _ref35$position === void 0 ? 1 : _ref35$position,
                n = _ref35.force,
                r = _ref35.transition,
                a = _ref35.ignoreCache;

            var o = this;
            return new Promise(function (i, s) {
              var _o$getTargetPageRange = o.getTargetPageRange(e, {
                position: t,
                force: n
              }),
                  c = _o$getTargetPageRange.fromPage,
                  u = _o$getTargetPageRange.toPage,
                  l = [];

              for (var _e14 = 0; _e14 < o.count; _e14++) {
                l.push(o.buildPage(Object(ut["a"])(c, _e14), a));
              }

              o.refreshDisabledDays(l), o.refreshFocusableDays(l), o.transitionName = o.getPageTransition(o.pages[0], l[0], r), o.pages = l, o.$emit("update:from-page", c), o.$emit("update:to-page", u), o.transitionName && "none" !== o.transitionName ? o.transitionPromise = {
                resolve: i,
                reject: s
              } : i(!0);
            });
          },
          refreshDisabledDays: function refreshDisabledDays(e) {
            var t = this;
            this.getPageDays(e).forEach(function (e) {
              e.isDisabled = !!t.disabledAttribute && t.disabledAttribute.intersectsDay(e);
            });
          },
          refreshFocusableDays: function refreshFocusableDays(e) {
            var t = this;
            this.getPageDays(e).forEach(function (e) {
              e.isFocusable = e.inMonth && e.day === t.focusableDay;
            });
          },
          getPageDays: function getPageDays() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pages;
            return e.reduce(function (e, t) {
              return e.concat(t.days);
            }, []);
          },
          getPageTransition: function getPageTransition(e, t) {
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.transition;
            if ("none" === n) return n;
            if ("fade" === n || !n && this.count > 1 || !Object(ut["r"])(e) || !Object(ut["r"])(t)) return "fade";
            var r = Object(ut["o"])(t, e);
            return "slide-v" === n ? r ? "slide-down" : "slide-up" : r ? "slide-right" : "slide-left";
          },
          getPageForAttributes: function getPageForAttributes() {
            var e = null;
            var t = this.store.pinAttr;

            if (t && t.hasDates) {
              var _t$dates = _slicedToArray(t.dates, 1),
                  _n8 = _t$dates[0];

              _n8 = _n8.start || _n8.date, e = this.pageForDate(_n8);
            }

            return e;
          },
          buildPage: function buildPage(_ref36, n) {
            var e = _ref36.month,
                t = _ref36.year;
            var r = this;
            var a = "".concat(t.toString(), "-").concat(e.toString());
            var o = this.pages.find(function (e) {
              return e.key === a;
            });

            if (!o || n) {
              var _n9 = new Date(t, e - 1, 15),
                  _i6 = this.$locale.getMonthComps(e, t),
                  _s3 = this.$locale.getPrevMonthComps(e, t),
                  _c2 = this.$locale.getNextMonthComps(e, t);

              o = {
                key: a,
                month: e,
                year: t,
                weeks: this.trimWeeks ? _i6.weeks : 6,
                title: this.$locale.format(_n9, this.$locale.masks.title),
                shortMonthLabel: this.$locale.format(_n9, "MMM"),
                monthLabel: this.$locale.format(_n9, "MMMM"),
                shortYearLabel: t.toString().substring(2),
                yearLabel: t.toString(),
                monthComps: _i6,
                prevMonthComps: _s3,
                nextMonthComps: _c2,
                canMove: function canMove(e) {
                  return r.canMove(e);
                },
                move: function move(e) {
                  return r.move(e);
                },
                moveThisMonth: function moveThisMonth() {
                  return r.moveThisMonth();
                },
                movePrevMonth: function movePrevMonth() {
                  return r.move(_s3);
                },
                moveNextMonth: function moveNextMonth() {
                  return r.move(_c2);
                },
                refresh: !0
              }, o.days = this.$locale.getCalendarDays(o);
            }

            return o;
          },
          initStore: function initStore() {
            this.store = new kn["a"](this.$theme, this.$locale, this.attributes), this.refreshAttrs(this.pages, this.store.list, [], !0);
          },
          refreshAttrs: function refreshAttrs() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var r = arguments.length > 3 ? arguments[3] : undefined;
            var a = this;
            Object(ut["b"])(e) && (e.forEach(function (e) {
              e.days.forEach(function (e) {
                var a = {};
                r ? e.refresh = !0 : Object(dt["f"])(e.attributesMap, n) ? (a = Object(dt["s"])(e.attributesMap, n), e.refresh = !0) : a = e.attributesMap || {}, t.forEach(function (t) {
                  var n = t.intersectsDay(e);

                  if (n) {
                    var _r3 = _objectSpread(_objectSpread({}, t), {}, {
                      targetDate: n
                    });

                    a[t.key] = _r3, e.refresh = !0;
                  }
                }), e.refresh && (e.attributesMap = a);
              });
            }), this.$nextTick(function () {
              a.$refs.pages.forEach(function (e) {
                return e.refresh();
              });
            }));
          },
          handleKeydown: function handleKeydown(e) {
            var t = this.lastFocusedDay;
            null != t && (t.event = e, this.handleDayKeydown(t));
          },
          handleDayKeydown: function handleDayKeydown(e) {
            var t = e.dateFromTime,
                n = e.event,
                a = t(12);
            var o = null;

            switch (n.key) {
              case "ArrowLeft":
                o = Object(r["a"])(a, -1);
                break;

              case "ArrowRight":
                o = Object(r["a"])(a, 1);
                break;

              case "ArrowUp":
                o = Object(r["a"])(a, -7);
                break;

              case "ArrowDown":
                o = Object(r["a"])(a, 7);
                break;

              case "Home":
                o = Object(r["a"])(a, 1 - e.weekdayPosition);
                break;

              case "End":
                o = Object(r["a"])(a, e.weekdayPositionFromEnd);
                break;

              case "PageUp":
                o = n.altKey ? c(a, -1) : s(a, -1);
                break;

              case "PageDown":
                o = n.altKey ? c(a, 1) : s(a, 1);
                break;
            }

            o && (n.preventDefault(), this.focusDate(o).catch(function () {}));
          }
        }
      }),
          Pn = Mn,
          Sn = (n("de5e"), ht(Pn, dn, fn, !1, null, null, null)),
          Yn = Sn.exports,
          En = function En() {
        var e = this,
            t = e.$createElement,
            n = e._self._c || t;
        return n("div", {
          staticClass: "vc-time-picker",
          class: [{
            "vc-disabled": e.isDisabled,
            "vc-bordered": e.showBorder
          }]
        }, [n("div", [n("svg", {
          staticClass: "vc-time-icon",
          attrs: {
            fill: "none",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          }
        }, [n("path", {
          attrs: {
            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          }
        })])]), n("div", {
          staticClass: "vc-date-time"
        }, [e.date ? n("div", {
          staticClass: "vc-date"
        }, [n("span", {
          staticClass: "vc-weekday"
        }, [e._v(" " + e._s(e.locale.format(e.date, "WWW")) + " ")]), n("span", {
          staticClass: "vc-month"
        }, [e._v(" " + e._s(e.locale.format(e.date, "MMM")) + " ")]), n("span", {
          staticClass: "vc-day"
        }, [e._v(" " + e._s(e.locale.format(e.date, "D")) + " ")]), n("span", {
          staticClass: "vc-year"
        }, [e._v(" " + e._s(e.locale.format(e.date, "YYYY")) + " ")])]) : e._e(), n("div", {
          staticClass: "vc-time"
        }, [n("time-select", {
          attrs: {
            options: e.hourOptions
          },
          model: {
            value: e.hours,
            callback: function callback(t) {
              e.hours = e._n(t);
            },
            expression: "hours"
          }
        }), n("span", {
          staticStyle: {
            margin: "0 4px"
          }
        }, [e._v(":")]), n("time-select", {
          attrs: {
            options: e.minuteOptions
          },
          model: {
            value: e.minutes,
            callback: function callback(t) {
              e.minutes = e._n(t);
            },
            expression: "minutes"
          }
        }), e.is24hr ? e._e() : n("div", {
          staticClass: "vc-am-pm",
          class: {
            "vc-disabled": !(e.hours >= 0)
          }
        }, [n("button", {
          class: {
            active: e.isAM
          },
          attrs: {
            type: "button"
          },
          on: {
            click: function click(t) {
              t.preventDefault(), e.isAM = !0;
            }
          }
        }, [e._v(" AM ")]), n("button", {
          class: {
            active: !e.isAM
          },
          attrs: {
            type: "button"
          },
          on: {
            click: function click(t) {
              t.preventDefault(), e.isAM = !1;
            }
          }
        }, [e._v(" PM ")])])], 1)])]);
      },
          _n = [],
          Tn = function Tn() {
        var e = this,
            t = e.$createElement,
            n = e._self._c || t;
        return n("div", {
          staticClass: "vc-select"
        }, [n("select", e._b({
          on: {
            change: function change(t) {
              return e.$emit("input", t.target.value);
            }
          }
        }, "select", e.$attrs, !1), e._l(e.options, function (t) {
          return n("option", {
            key: t.value,
            attrs: {
              disabled: t.disabled
            },
            domProps: {
              value: t.value
            }
          }, [e._v(e._s(t.label))]);
        }), 0), n("div", {
          staticClass: "vc-select-arrow"
        }, [n("svg", {
          attrs: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20"
          }
        }, [n("path", {
          attrs: {
            d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          }
        })])])]);
      },
          In = [],
          Cn = {
        inheritAttrs: !1,
        props: {
          options: Array
        }
      },
          $n = Cn,
          An = (n("3c06"), ht($n, Tn, In, !1, null, "d1c68c60", null)),
          Nn = An.exports,
          Fn = {
        name: "TimePicker",
        components: {
          TimeSelect: Nn
        },
        props: {
          value: {
            type: Object,
            required: !0
          },
          locale: {
            type: Object,
            required: !0
          },
          theme: {
            type: Object,
            required: !0
          },
          is24hr: {
            type: Boolean,
            default: !0
          },
          minuteIncrement: {
            type: Number,
            default: 1
          },
          showBorder: Boolean,
          isDisabled: Boolean
        },
        data: function data() {
          return {
            hours: 0,
            minutes: 0,
            isAM: !0
          };
        },
        computed: {
          date: function date() {
            var e = this.locale.normalizeDate(this.value);
            return 24 === this.value.hours && (e = new Date(e.getTime() - 1)), e;
          },
          hourOptions: function hourOptions() {
            var e = [{
              value: 0,
              label: "12"
            }, {
              value: 1,
              label: "1"
            }, {
              value: 2,
              label: "2"
            }, {
              value: 3,
              label: "3"
            }, {
              value: 4,
              label: "4"
            }, {
              value: 5,
              label: "5"
            }, {
              value: 6,
              label: "6"
            }, {
              value: 7,
              label: "7"
            }, {
              value: 8,
              label: "8"
            }, {
              value: 9,
              label: "9"
            }, {
              value: 10,
              label: "10"
            }, {
              value: 11,
              label: "11"
            }],
                t = [{
              value: 0,
              label: "00"
            }, {
              value: 1,
              label: "01"
            }, {
              value: 2,
              label: "02"
            }, {
              value: 3,
              label: "03"
            }, {
              value: 4,
              label: "04"
            }, {
              value: 5,
              label: "05"
            }, {
              value: 6,
              label: "06"
            }, {
              value: 7,
              label: "07"
            }, {
              value: 8,
              label: "08"
            }, {
              value: 9,
              label: "09"
            }, {
              value: 10,
              label: "10"
            }, {
              value: 11,
              label: "11"
            }, {
              value: 12,
              label: "12"
            }, {
              value: 13,
              label: "13"
            }, {
              value: 14,
              label: "14"
            }, {
              value: 15,
              label: "15"
            }, {
              value: 16,
              label: "16"
            }, {
              value: 17,
              label: "17"
            }, {
              value: 18,
              label: "18"
            }, {
              value: 19,
              label: "19"
            }, {
              value: 20,
              label: "20"
            }, {
              value: 21,
              label: "21"
            }, {
              value: 22,
              label: "22"
            }, {
              value: 23,
              label: "23"
            }];
            return this.is24hr ? t : e;
          },
          minuteOptions: function minuteOptions() {
            var e = [];
            var t = 0,
                n = !1;

            while (t <= 59) {
              e.push({
                value: t,
                label: Object(ut["m"])(t, 2)
              }), n = n || t === this.minutes, t += this.minuteIncrement, !n && t > this.minutes && (n = !0, e.push({
                value: this.minutes,
                label: Object(ut["m"])(this.minutes, 2),
                disabled: !0
              }));
            }

            return e;
          }
        },
        watch: {
          value: function value() {
            this.setup();
          },
          hours: function hours() {
            this.updateValue();
          },
          minutes: function minutes() {
            this.updateValue();
          },
          isAM: function isAM() {
            this.updateValue();
          }
        },
        created: function created() {
          this.setup();
        },
        methods: {
          protected: function _protected(e) {
            var t = this;
            this.busy || (this.busy = !0, e(), this.$nextTick(function () {
              return t.busy = !1;
            }));
          },
          setup: function setup() {
            var e = this;
            this.protected(function () {
              var t = e.value.hours;
              24 === t && (t = 0);
              var n = !0;
              !e.is24hr && t >= 12 && (t -= 12, n = !1), e.hours = t, e.minutes = e.value.minutes, e.isAM = n;
            });
          },
          updateValue: function updateValue() {
            var e = this;
            this.protected(function () {
              var t = e.hours;
              e.is24hr || e.isAM || (t += 12), e.$emit("input", _objectSpread(_objectSpread({}, e.value), {}, {
                hours: t,
                minutes: e.minutes,
                seconds: 0,
                milliseconds: 0
              }));
            });
          }
        }
      },
          zn = Fn,
          Ln = (n("d458"), ht(zn, En, _n, !1, null, "ee473b46", null)),
          Hn = Ln.exports;

      var Rn = {
        type: "auto",
        mask: "iso",
        timeAdjust: ""
      },
          Wn = {
        start: _objectSpread({}, Rn),
        end: _objectSpread({}, Rn)
      },
          Vn = {
        DATE: "date",
        DATE_TIME: "datetime",
        TIME: "time"
      },
          Un = {
        NONE: 0,
        START: 1,
        END: 2,
        BOTH: 3
      };
      var Bn,
          Zn,
          qn = {
        name: "DatePicker",
        render: function render(e) {
          var t = this;

          var n = function n() {
            if (!t.dateParts) return null;
            var n = t.isRange ? t.dateParts : [t.dateParts[0]];
            return e("div", [].concat(_toConsumableArray(n.map(function (n, r) {
              return e(Hn, {
                props: {
                  value: n,
                  locale: t.$locale,
                  theme: t.$theme,
                  is24hr: t.is24hr,
                  minuteIncrement: t.minuteIncrement,
                  showBorder: !t.isTime,
                  isDisabled: t.isDateTime && !n.isValid || t.isDragging
                },
                on: {
                  input: function input(e) {
                    return t.onTimeInput(e, 0 === r);
                  }
                }
              });
            })), [t.$scopedSlots.footer && t.$scopedSlots.footer()]));
          },
              r = function r() {
            return e(Yn, {
              attrs: _objectSpread(_objectSpread({}, t.$attrs), {}, {
                attributes: t.attributes_,
                theme: t.$theme,
                locale: t.$locale
              }),
              props: {
                minDate: t.minDateExact || t.minDate,
                maxDate: t.maxDateExact || t.maxDate,
                disabledDates: t.disabledDates,
                availableDates: t.availableDates
              },
              on: _objectSpread(_objectSpread({}, t.$listeners), {}, {
                dayclick: t.onDayClick,
                daykeydown: t.onDayKeydown,
                daymouseenter: t.onDayMouseEnter
              }),
              scopedSlots: _objectSpread(_objectSpread({}, t.$scopedSlots), {}, {
                footer: t.isDateTime ? n : t.$scopedSlots.footer
              }),
              ref: "calendar"
            });
          },
              a = function a() {
            return t.isTime ? e("div", {
              class: ["vc-container", "vc-" + t.$theme.color, {
                "vc-is-dark": t.$theme.isDark
              }]
            }, [n()]) : r();
          };

          return this.$scopedSlots.default && e("span", [this.$scopedSlots.default(this.slotArgs), e(bt, {
            props: {
              id: this.datePickerPopoverId,
              placement: "bottom-start",
              contentClass: "vc-container" + (this.isDark ? " vc-is-dark" : "")
            },
            on: {
              beforeShow: function beforeShow(e) {
                return t.$emit("popoverWillShow", e);
              },
              afterShow: function afterShow(e) {
                return t.$emit("popoverDidShow", e);
              },
              beforeHide: function beforeHide(e) {
                return t.$emit("popoverWillHide", e);
              },
              afterHide: function afterHide(e) {
                return t.$emit("popoverDidHide", e);
              }
            },
            scopedSlots: {
              default: function _default() {
                return a();
              }
            },
            ref: "popover"
          })]) || a();
        },
        mixins: [_t],
        props: {
          mode: {
            type: String,
            default: Vn.DATE
          },
          value: {
            type: null,
            required: !0
          },
          modelConfig: {
            type: Object,
            default: function _default() {
              return _objectSpread({}, Rn);
            }
          },
          is24hr: Boolean,
          minuteIncrement: Number,
          isRequired: Boolean,
          isRange: Boolean,
          updateOnInput: Boolean,
          inputDebounce: Number,
          popover: {
            type: Object,
            default: function _default() {
              return {};
            }
          },
          dragAttribute: Object,
          selectAttribute: Object,
          attributes: Array
        },
        data: function data() {
          return {
            value_: null,
            dateParts: null,
            activeDate: "",
            dragValue: null,
            inputValues: ["", ""],
            updateTimeout: null,
            watchValue: !0,
            datePickerPopoverId: Object(ut["c"])()
          };
        },
        computed: {
          updateOnInput_: function updateOnInput_() {
            return this.propOrDefault("updateOnInput", "datePicker.updateOnInput");
          },
          inputDebounce_: function inputDebounce_() {
            return this.propOrDefault("inputDebounce", "datePicker.inputDebounce");
          },
          isDate: function isDate() {
            return this.mode.toLowerCase() === Vn.DATE;
          },
          isDateTime: function isDateTime() {
            return this.mode.toLowerCase() === Vn.DATE_TIME;
          },
          isTime: function isTime() {
            return this.mode.toLowerCase() === Vn.TIME;
          },
          isDragging: function isDragging() {
            return !!this.dragValue;
          },
          modelConfig_: function modelConfig_() {
            return this.isRange ? {
              start: _objectSpread(_objectSpread({}, Wn.start), this.modelConfig.start || this.modelConfig),
              end: _objectSpread(_objectSpread({}, Wn.end), this.modelConfig.end || this.modelConfig)
            } : _objectSpread(_objectSpread({}, Rn), this.modelConfig);
          },
          inputMask: function inputMask() {
            var e = this.$locale.masks;
            return this.isTime ? this.is24hr ? e.inputTime24hr : e.inputTime : this.isDateTime ? this.is24hr ? e.inputDateTime24hr : e.inputDateTime : this.$locale.masks.input;
          },
          inputMaskHasTime: function inputMaskHasTime() {
            return /[Hh]/g.test(this.inputMask);
          },
          inputMaskHasDate: function inputMaskHasDate() {
            return /[dD]{1,2}|Do|W{1,4}|M{1,4}|YY(?:YY)?/g.test(this.inputMask);
          },
          inputMaskPatch: function inputMaskPatch() {
            return this.inputMaskHasTime && this.inputMaskHasDate ? kt["a"].DATE_TIME : this.inputMaskHasDate ? kt["a"].DATE : this.inputMaskHasTime ? kt["a"].TIME : void 0;
          },
          slotArgs: function slotArgs() {
            var e = this;
            var t = this.isRange,
                n = this.isDragging,
                r = this.updateValue,
                a = this.showPopover,
                o = this.hidePopover,
                i = this.togglePopover,
                s = t ? {
              start: this.inputValues[0],
              end: this.inputValues[1]
            } : this.inputValues[0],
                c = [!0, !1].map(function (t) {
              return _objectSpread({
                input: e.onInputInput(t),
                change: e.onInputChange(t),
                keyup: e.onInputKeyup
              }, rn(_objectSpread(_objectSpread({}, e.popover_), {}, {
                id: e.datePickerPopoverId,
                callback: function callback(n) {
                  "show" === n.action && n.completed && e.onInputShow(t);
                }
              })));
            }),
                u = t ? {
              start: c[0],
              end: c[1]
            } : c[0];
            return {
              inputValue: s,
              inputEvents: u,
              isDragging: n,
              updateValue: r,
              showPopover: a,
              hidePopover: o,
              togglePopover: i,
              getPopoverTriggerEvents: rn
            };
          },
          popover_: function popover_() {
            return this.propOrDefault("popover", "datePicker.popover", "merge");
          },
          selectAttribute_: function selectAttribute_() {
            if (!this.hasValue(this.value_)) return null;

            var e = _objectSpread(_objectSpread({
              key: "select-drag"
            }, this.selectAttribute), {}, {
              dates: this.value_,
              pinPage: !0
            }),
                t = e.dot,
                n = e.bar,
                r = e.highlight,
                a = e.content;

            return t || n || r || a || (e.highlight = !0), e;
          },
          dragAttribute_: function dragAttribute_() {
            if (!this.isRange || !this.hasValue(this.dragValue)) return null;

            var e = _objectSpread(_objectSpread({
              key: "select-drag"
            }, this.dragAttribute), {}, {
              dates: this.dragValue
            }),
                t = e.dot,
                n = e.bar,
                r = e.highlight,
                a = e.content;

            return t || n || r || a || (e.highlight = {
              startEnd: {
                fillMode: "outline"
              }
            }), e;
          },
          attributes_: function attributes_() {
            var e = Object(dt["h"])(this.attributes) ? _toConsumableArray(this.attributes) : [];
            return this.dragAttribute_ ? e.push(this.dragAttribute_) : this.selectAttribute_ && e.push(this.selectAttribute_), e;
          }
        },
        watch: {
          inputMask: function inputMask() {
            this.formatInput();
          },
          value: function value() {
            this.watchValue && this.forceUpdateValue(this.value, {
              config: this.modelConfig_,
              notify: !1,
              formatInput: !0,
              hidePopover: !1
            });
          },
          value_: function value_() {
            this.refreshDateParts();
          },
          dragValue: function dragValue() {
            this.refreshDateParts();
          },
          timezone: function timezone() {
            this.refreshDateParts(), this.forceUpdateValue(this.value_, {
              notify: !0,
              formatInput: !0
            });
          }
        },
        created: function created() {
          this.forceUpdateValue(this.value, {
            config: this.modelConfig_,
            notify: !1,
            formatInput: !0,
            hidePopover: !1
          }), this.refreshDateParts();
        },
        mounted: function mounted() {
          var e = this;
          Object(ut["k"])(document, "keydown", this.onDocumentKeyDown);
          var t = Object(lt["b"])(document, function (t) {
            document.body.contains(t.target) && !Object(ut["e"])(e.$el, t.target) && (e.dragValue = null, e.formatInput());
          });
          this.$once("beforeDestroy", function () {
            Object(ut["j"])(document, "keydown", e.onDocumentKeyDown), t();
          });
        },
        methods: {
          getDateParts: function getDateParts(e) {
            return this.$locale.getDateParts(e);
          },
          getDateFromParts: function getDateFromParts(e) {
            return this.$locale.getDateFromParts(e);
          },
          refreshDateParts: function refreshDateParts() {
            var e = this;
            var t = this.dragValue || this.value_,
                n = [];
            this.isRange ? (t && t.start ? n.push(this.getDateParts(t.start)) : n.push({}), t && t.end ? n.push(this.getDateParts(t.end)) : n.push({})) : t ? n.push(this.getDateParts(t)) : n.push({}), this.$nextTick(function () {
              return e.dateParts = n;
            });
          },
          onDocumentKeyDown: function onDocumentKeyDown(e) {
            this.dragValue && "Escape" === e.key && (this.dragValue = null);
          },
          onDayClick: function onDayClick(e) {
            this.handleDayClick(e), this.$emit("dayclick", e);
          },
          onDayKeydown: function onDayKeydown(e) {
            switch (e.event.key) {
              case " ":
              case "Enter":
                this.handleDayClick(e), e.event.preventDefault();
                break;

              case "Escape":
                this.hidePopover();
            }

            this.$emit("daykeydown", e);
          },
          handleDayClick: function handleDayClick(e) {
            var _this$popover_ = this.popover_,
                t = _this$popover_.keepVisibleOnInput,
                n = _this$popover_.visibility,
                r = {
              patch: kt["a"].DATE,
              adjustTime: !0,
              formatInput: !0,
              hidePopover: this.isDate && !t && "visible" !== n
            };
            this.isRange ? (this.isDragging ? this.dragTrackingValue.end = e.date : this.dragTrackingValue = _objectSpread({}, e.range), r.isDragging = !this.isDragging, r.rangePriority = r.isDragging ? Un.NONE : Un.BOTH, r.hidePopover = r.hidePopover && !r.isDragging, this.updateValue(this.dragTrackingValue, r)) : (r.clearIfEqual = !this.isRequired, this.updateValue(e.date, r));
          },
          onDayMouseEnter: function onDayMouseEnter(e) {
            this.isDragging && (this.dragTrackingValue.end = e.date, this.updateValue(this.dragTrackingValue, {
              patch: kt["a"].DATE,
              adjustTime: !0,
              formatInput: !0,
              hidePopover: !1,
              rangePriority: Un.NONE
            }));
          },
          onTimeInput: function onTimeInput(e, t) {
            var n = this;
            var r = null;

            if (this.isRange) {
              var _n10 = t ? e : this.dateParts[0],
                  _a5 = t ? this.dateParts[1] : e;

              r = {
                start: _n10,
                end: _a5
              };
            } else r = e;

            this.updateValue(r, {
              patch: kt["a"].TIME,
              rangePriority: t ? Un.START : Un.END
            }).then(function () {
              return n.adjustPageRange(t);
            });
          },
          onInputInput: function onInputInput(e) {
            var t = this;
            return function (n) {
              t.updateOnInput_ && t.onInputUpdate(n.target.value, e, {
                formatInput: !1,
                hidePopover: !1,
                debounce: t.inputDebounce_
              });
            };
          },
          onInputChange: function onInputChange(e) {
            var t = this;
            return function (n) {
              t.onInputUpdate(n.target.value, e, {
                formatInput: !0,
                hidePopover: !1
              });
            };
          },
          onInputUpdate: function onInputUpdate(e, t, n) {
            var r = this;
            this.inputValues.splice(t ? 0 : 1, 1, e);
            var a = this.isRange ? {
              start: this.inputValues[0],
              end: this.inputValues[1] || this.inputValues[0]
            } : e,
                o = {
              type: "string",
              mask: this.inputMask
            };
            this.updateValue(a, _objectSpread(_objectSpread({}, n), {}, {
              config: o,
              patch: this.inputMaskPatch,
              rangePriority: t ? Un.START : Un.END
            })).then(function () {
              return r.adjustPageRange(t);
            });
          },
          onInputShow: function onInputShow(e) {
            this.adjustPageRange(e);
          },
          onInputKeyup: function onInputKeyup(e) {
            "Escape" === e.key && this.updateValue(this.value_, {
              formatInput: !0,
              hidePopover: !0
            });
          },
          updateValue: function updateValue(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var n = this;
            return clearTimeout(this.updateTimeout), new Promise(function (r) {
              var a = t.debounce,
                  o = _objectWithoutProperties(t, ["debounce"]);

              a > 0 ? n.updateTimeout = setTimeout(function () {
                n.forceUpdateValue(e, o), r(n.value_);
              }, a) : (n.forceUpdateValue(e, o), r(n.value_));
            });
          },
          forceUpdateValue: function forceUpdateValue(e) {
            var _ref37 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref37$config = _ref37.config,
                t = _ref37$config === void 0 ? this.modelConfig_ : _ref37$config,
                _ref37$patch = _ref37.patch,
                n = _ref37$patch === void 0 ? kt["a"].DATE_TIME : _ref37$patch,
                _ref37$notify = _ref37.notify,
                r = _ref37$notify === void 0 ? !0 : _ref37$notify,
                _ref37$clearIfEqual = _ref37.clearIfEqual,
                a = _ref37$clearIfEqual === void 0 ? !1 : _ref37$clearIfEqual,
                _ref37$formatInput = _ref37.formatInput,
                o = _ref37$formatInput === void 0 ? !0 : _ref37$formatInput,
                _ref37$hidePopover = _ref37.hidePopover,
                i = _ref37$hidePopover === void 0 ? !1 : _ref37$hidePopover,
                _ref37$adjustTime = _ref37.adjustTime,
                s = _ref37$adjustTime === void 0 ? !1 : _ref37$adjustTime,
                _ref37$isDragging = _ref37.isDragging,
                c = _ref37$isDragging === void 0 ? this.isDragging : _ref37$isDragging,
                _ref37$rangePriority = _ref37.rangePriority,
                u = _ref37$rangePriority === void 0 ? Un.BOTH : _ref37$rangePriority;

            var l = this;
            var d = this.normalizeValue(e, t, n, u);
            !d && this.isRequired && (d = this.value_), s && (d = this.adjustTimeForValue(d, t));
            var f = this.valueIsDisabled(d);

            if (f) {
              if (c) return;
              d = this.value_, i = !1;
            }

            var p = c ? "dragValue" : "value_";
            var h = !this.valuesAreEqual(this[p], d);

            if (f || h || !a || (d = null, h = !0), h && (this.$set(this, p, d), c || (this.dragValue = null)), r && h) {
              var _e15 = this.denormalizeValue(d),
                  _t12 = this.isDragging ? "drag" : "input";

              this.watchValue = !1, this.$emit(_t12, _e15), this.$nextTick(function () {
                return l.watchValue = !0;
              });
            }

            i && this.hidePopover(), o && this.formatInput();
          },
          hasValue: function hasValue(e) {
            return this.isRange ? Object(dt["m"])(e) && e.start && e.end : !!e;
          },
          normalizeValue: function normalizeValue(e, t, n, r) {
            if (!this.hasValue(e)) return null;

            if (this.isRange) {
              var _a6 = {},
                  _o4 = e.start > e.end ? e.end : e.start,
                  _i7 = this.value_ && this.value_.start || this.modelConfig_.start.fillDate,
                  _s4 = t.start || t;

              _a6.start = this.normalizeDate(_o4, _objectSpread(_objectSpread({}, _s4), {}, {
                fillDate: _i7,
                patch: n
              }));

              var _c3 = e.start > e.end ? e.start : e.end,
                  _u2 = this.value_ && this.value_.end || this.modelConfig_.end.fillDate,
                  _l3 = t.end || t;

              return _a6.end = this.normalizeDate(_c3, _objectSpread(_objectSpread({}, _l3), {}, {
                fillDate: _u2,
                patch: n
              })), this.sortRange(_a6, r);
            }

            return this.normalizeDate(e, _objectSpread(_objectSpread({}, t), {}, {
              fillDate: this.value_ || this.modelConfig_.fillDate,
              patch: n
            }));
          },
          adjustTimeForValue: function adjustTimeForValue(e, t) {
            return this.hasValue(e) ? this.isRange ? {
              start: this.$locale.adjustTimeForDate(e.start, t.start || t),
              end: this.$locale.adjustTimeForDate(e.end, t.end || t)
            } : this.$locale.adjustTimeForDate(e, t) : null;
          },
          sortRange: function sortRange(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Un.NONE;
            var n = e.start,
                r = e.end;
            if (n > r) switch (t) {
              case Un.START:
                return {
                  start: n,
                  end: n
                };

              case Un.END:
                return {
                  start: r,
                  end: r
                };

              case Un.BOTH:
                return {
                  start: r,
                  end: n
                };
            }
            return {
              start: n,
              end: r
            };
          },
          denormalizeValue: function denormalizeValue(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.modelConfig_;
            return this.isRange ? this.hasValue(e) ? {
              start: this.$locale.denormalizeDate(e.start, t.start || t),
              end: this.$locale.denormalizeDate(e.end, t.end || t)
            } : null : this.$locale.denormalizeDate(e, t);
          },
          valuesAreEqual: function valuesAreEqual(e, t) {
            if (this.isRange) {
              var _n11 = this.hasValue(e),
                  _r4 = this.hasValue(t);

              return !_n11 && !_r4 || _n11 === _r4 && Object(ut["d"])(e.start, t.start) && Object(ut["d"])(e.end, t.end);
            }

            return Object(ut["d"])(e, t);
          },
          valueIsDisabled: function valueIsDisabled(e) {
            return this.hasValue(e) && this.disabledAttribute && this.disabledAttribute.intersectsDate(e);
          },
          formatInput: function formatInput() {
            var e = this;
            this.$nextTick(function () {
              var t = {
                type: "string",
                mask: e.inputMask
              },
                  n = e.denormalizeValue(e.dragValue || e.value_, t);
              e.isRange ? e.inputValues = [n && n.start, n && n.end] : e.inputValues = [n, ""];
            });
          },
          showPopover: function showPopover() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            Qt(_objectSpread(_objectSpread(_objectSpread({
              ref: this.$el
            }, this.popover_), e), {}, {
              isInteractive: !0,
              id: this.datePickerPopoverId
            }));
          },
          hidePopover: function hidePopover() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            en(_objectSpread(_objectSpread(_objectSpread({
              hideDelay: 10
            }, this.popover_), e), {}, {
              id: this.datePickerPopoverId
            }));
          },
          togglePopover: function togglePopover(e) {
            tn(_objectSpread(_objectSpread(_objectSpread({
              ref: this.$el
            }, this.popover_), e), {}, {
              isInteractive: !0,
              id: this.datePickerPopoverId
            }));
          },
          adjustPageRange: function adjustPageRange(e) {
            var t = this;
            this.$nextTick(function () {
              var n = t.$refs.calendar,
                  r = t.getPageForValue(e),
                  a = e ? 1 : -1;
              r && n && !Object(ut["p"])(r, n.firstPage, n.lastPage) && n.move(r, {
                position: a,
                transition: "fade"
              });
            });
          },
          getPageForValue: function getPageForValue(e) {
            return this.hasValue(this.value_) ? this.pageForDate(this.isRange ? this.value_[e ? "start" : "end"] : this.value_) : null;
          },
          move: function move(e, t) {
            return this.$refs.calendar ? this.$refs.calendar.move(e, t) : Promise.reject(new Error("Navigation disabled while calendar is not yet displayed"));
          },
          focusDate: function focusDate(e, t) {
            return this.$refs.calendar ? this.$refs.calendar.focusDate(e, t) : Promise.reject(new Error("Navigation disabled while calendar is not yet displayed"));
          }
        }
      },
          Gn = qn,
          Kn = ht(Gn, Bn, Zn, !1, null, null, null),
          Xn = Kn.exports;
    },
    "2b10": function b10(e, t) {
      function n(e, t, n) {
        var r = -1,
            a = e.length;
        t < 0 && (t = -t > a ? 0 : a + t), n = n > a ? a : n, n < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
        var o = Array(a);

        while (++r < a) {
          o[r] = e[r + t];
        }

        return o;
      }

      e.exports = n;
    },
    "2b27": function b27(e, t, n) {
      "use strict";

      var r = n("5849"),
          a = n.n(r);
      a.a;
    },
    "2b3e": function b3e(e, t, n) {
      var r = n("585a"),
          a = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
          o = r || a || Function("return this")();
      e.exports = o;
    },
    "2d7c": function d7c(e, t) {
      function n(e, t) {
        var n = -1,
            r = null == e ? 0 : e.length,
            a = 0,
            o = [];

        while (++n < r) {
          var i = e[n];
          t(i, n, e) && (o[a++] = i);
        }

        return o;
      }

      e.exports = n;
    },
    "2dcb": function dcb(e, t, n) {
      var r = n("91e9"),
          a = r(Object.getPrototypeOf, Object);
      e.exports = a;
    },
    "2ec1": function ec1(e, t, n) {
      var r = n("100e"),
          a = n("9aff");

      function o(e) {
        return r(function (t, n) {
          var r = -1,
              o = n.length,
              i = o > 1 ? n[o - 1] : void 0,
              s = o > 2 ? n[2] : void 0;
          i = e.length > 3 && "function" == typeof i ? (o--, i) : void 0, s && a(n[0], n[1], s) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t);

          while (++r < o) {
            var c = n[r];
            c && e(t, c, r, i);
          }

          return t;
        });
      }

      e.exports = o;
    },
    "2fa3": function fa3(e, t, n) {
      "use strict";

      n.d(t, "m", function () {
        return a;
      }), n.d(t, "f", function () {
        return o;
      }), n.d(t, "h", function () {
        return i;
      }), n.d(t, "r", function () {
        return s;
      }), n.d(t, "o", function () {
        return c;
      }), n.d(t, "n", function () {
        return u;
      }), n.d(t, "p", function () {
        return l;
      }), n.d(t, "q", function () {
        return d;
      }), n.d(t, "a", function () {
        return f;
      }), n.d(t, "s", function () {
        return p;
      }), n.d(t, "d", function () {
        return h;
      }), n.d(t, "b", function () {
        return v;
      }), n.d(t, "i", function () {
        return b;
      }), n.d(t, "k", function () {
        return m;
      }), n.d(t, "j", function () {
        return g;
      }), n.d(t, "e", function () {
        return y;
      }), n.d(t, "l", function () {
        return w;
      }), n.d(t, "c", function () {
        return x;
      }), n.d(t, "g", function () {
        return D;
      });
      n("ddb0");
      var r = n("9404");

      var a = function a(e, t) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
        e = null !== e && void 0 !== e ? String(e) : "", t = t || 2;

        while (e.length < t) {
          e = "".concat(n).concat(e);
        }

        return e;
      },
          o = function o(e, t) {
        return Object(r["k"])(e) ? e(t) : e;
      },
          i = function i() {
        var t = {};

        for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
          e[_key] = arguments[_key];
        }

        return e.forEach(function (e) {
          return Object.entries(e).forEach(function (_ref38) {
            var _ref39 = _slicedToArray(_ref38, 2),
                e = _ref39[0],
                n = _ref39[1];

            t[e] ? Object(r["h"])(t[e]) ? t[e].push(n) : t[e] = [t[e], n] : t[e] = n;
          });
        }), t;
      },
          s = function s(e) {
        return !!(e && e.month && e.year);
      },
          c = function c(e, t) {
        return !(!s(e) || !s(t)) && (e.year === t.year ? e.month < t.month : e.year < t.year);
      },
          u = function u(e, t) {
        return !(!s(e) || !s(t)) && (e.year === t.year ? e.month > t.month : e.year > t.year);
      },
          l = function l(e, t, n) {
        return !!e && !c(e, t) && !u(e, n);
      },
          d = function d(e, t) {
        return !(!e && t) && !(e && !t) && (!e && !t || e.month === t.month && e.year === t.year);
      },
          f = function f(_ref40, n) {
        var e = _ref40.month,
            t = _ref40.year;
        var r = n > 0 ? 1 : -1;

        for (var _a7 = 0; _a7 < Math.abs(n); _a7++) {
          e += r, e > 12 ? (e = 1, t++) : e < 1 && (e = 12, t--);
        }

        return {
          month: e,
          year: t
        };
      },
          p = function p(e, t) {
        if (!s(e) || !s(t)) return [];
        var n = [];

        while (!u(e, t)) {
          n.push(e), e = f(e, 1);
        }

        return n;
      };

      function h(e, t) {
        var n = Object(r["j"])(e),
            a = Object(r["j"])(t);
        return !n && !a || n === a && e.getTime() === t.getTime();
      }

      var v = function v(e) {
        return Object(r["h"])(e) && e.length;
      },
          b = function b(e, t, n) {
        var a = [];
        return n.forEach(function (n) {
          var o = n.name || n.toString(),
              i = n.mixin,
              s = n.validate;

          if (Object.prototype.hasOwnProperty.call(e, o)) {
            var _n12 = s ? s(e[o]) : e[o];

            t[o] = i && Object(r["m"])(_n12) ? _objectSpread(_objectSpread({}, i), _n12) : _n12, a.push(o);
          }
        }), {
          target: t,
          assigned: a.length ? a : null
        };
      },
          m = function m(e, t, n, r) {
        e && t && n && e.addEventListener(t, n, r);
      },
          g = function g(e, t, n, r) {
        e && t && e.removeEventListener(t, n, r);
      },
          y = function y(e, t) {
        return !!e && !!t && (e === t || e.contains(t));
      },
          w = function w(e, t) {
        " " !== e.key && "Enter" !== e.key || (t(e), e.preventDefault());
      },
          x = function x() {
        function e() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }

        return "".concat(e() + e(), "-").concat(e(), "-").concat(e(), "-").concat(e(), "-").concat(e()).concat(e()).concat(e());
      };

      function D(e) {
        var t,
            n = 0,
            r = 0;
        if (0 === e.length) return n;

        for (r = 0; r < e.length; r++) {
          t = e.charCodeAt(r), n = (n << 5) - n + t, n |= 0;
        }

        return n;
      }
    },
    "2fcc": function fcc(e, t) {
      function n(e) {
        var t = this.__data__,
            n = t["delete"](e);
        return this.size = t.size, n;
      }

      e.exports = n;
    },
    3092: function _(e, t, n) {
      var r = n("4284"),
          a = n("badf"),
          o = n("361d"),
          i = n("6747"),
          s = n("9aff");

      function c(e, t, n) {
        var c = i(e) ? r : o;
        return n && s(e, t, n) && (t = void 0), c(e, a(t, 3));
      }

      e.exports = c;
    },
    "30c9": function c9(e, t, n) {
      var r = n("9520"),
          a = n("b218");

      function o(e) {
        return null != e && a(e.length) && !r(e);
      }

      e.exports = o;
    },
    "32b3": function b3(e, t, n) {
      var r = n("872a"),
          a = n("9638"),
          o = Object.prototype,
          i = o.hasOwnProperty;

      function s(e, t, n) {
        var o = e[t];
        i.call(e, t) && a(o, n) && (void 0 !== n || t in e) || r(e, t, n);
      }

      e.exports = s;
    },
    "32f4": function f4(e, t, n) {
      var r = n("2d7c"),
          a = n("d327"),
          o = Object.prototype,
          i = o.propertyIsEnumerable,
          s = Object.getOwnPropertySymbols,
          c = s ? function (e) {
        return null == e ? [] : (e = Object(e), r(s(e), function (t) {
          return i.call(e, t);
        }));
      } : a;
      e.exports = c;
    },
    "34ac": function ac(e, t, n) {
      var r = n("9520"),
          a = n("1368"),
          o = n("1a8c"),
          i = n("dc57"),
          s = /[\\^$.*+?()[\]{}|]/g,
          c = /^\[object .+?Constructor\]$/,
          u = Function.prototype,
          l = Object.prototype,
          d = u.toString,
          f = l.hasOwnProperty,
          p = RegExp("^" + d.call(f).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

      function h(e) {
        if (!o(e) || a(e)) return !1;
        var t = r(e) ? p : c;
        return t.test(i(e));
      }

      e.exports = h;
    },
    "34e9": function e9(e, t, n) {
      "use strict";

      (function (e) {
        n("ddb0");
        var r = n("2af9"),
            a = n("ed08");

        function o(e, t) {
          if (o.installed) return;
          o.installed = !0;
          var n = a["setupCalendar"](t);
          Object.entries(r).forEach(function (_ref41) {
            var _ref42 = _slicedToArray(_ref41, 2),
                t = _ref42[0],
                r = _ref42[1];

            e.component("".concat(n.componentPrefix).concat(t), r);
          });
        }

        n.d(t, "c", function () {
          return r["Calendar"];
        }), n.d(t, "d", function () {
          return r["CalendarNav"];
        }), n.d(t, "f", function () {
          return r["DatePicker"];
        }), n.d(t, "h", function () {
          return r["Popover"];
        }), n.d(t, "a", function () {
          return a["Attribute"];
        }), n.d(t, "b", function () {
          return a["AttributeStore"];
        }), n.d(t, "e", function () {
          return a["DateInfo"];
        }), n.d(t, "g", function () {
          return a["Locale"];
        }), n.d(t, "i", function () {
          return a["addHorizontalSwipeHandler"];
        }), n.d(t, "j", function () {
          return a["addPages"];
        }), n.d(t, "k", function () {
          return a["addTapOrClickHandler"];
        }), n.d(t, "l", function () {
          return a["arrayHasItems"];
        }), n.d(t, "m", function () {
          return a["createGuid"];
        }), n.d(t, "n", function () {
          return a["datesAreEqual"];
        }), n.d(t, "p", function () {
          return a["elementContains"];
        }), n.d(t, "q", function () {
          return a["evalFn"];
        }), n.d(t, "r", function () {
          return a["hash"];
        }), n.d(t, "s", function () {
          return a["mergeEvents"];
        }), n.d(t, "t", function () {
          return a["mixinOptionalProps"];
        }), n.d(t, "u", function () {
          return a["off"];
        }), n.d(t, "v", function () {
          return a["on"];
        }), n.d(t, "w", function () {
          return a["onSpaceOrEnter"];
        }), n.d(t, "x", function () {
          return a["pad"];
        }), n.d(t, "y", function () {
          return a["pageIsAfterPage"];
        }), n.d(t, "z", function () {
          return a["pageIsBeforePage"];
        }), n.d(t, "A", function () {
          return a["pageIsBetweenPages"];
        }), n.d(t, "B", function () {
          return a["pageIsEqualToPage"];
        }), n.d(t, "C", function () {
          return a["pageIsValid"];
        }), n.d(t, "D", function () {
          return a["pageRangeToArray"];
        }), n.d(t, "E", function () {
          return a["setupCalendar"];
        });

        var i = _objectSpread(_objectSpread({
          install: o
        }, r), a);

        var s = null;
        "undefined" !== typeof window ? s = window.Vue : "undefined" !== typeof e && (s = e.Vue), s && s.use(i), t["o"] = i;
      }).call(this, n("c8ba"));
    },
    "361d": function d(e, t, n) {
      var r = n("48a0");

      function a(e, t) {
        var n;
        return r(e, function (e, r, a) {
          return n = t(e, r, a), !n;
        }), !!n;
      }

      e.exports = a;
    },
    3698: function _(e, t) {
      function n(e, t) {
        return null == e ? void 0 : e[t];
      }

      e.exports = n;
    },
    3729: function _(e, t, n) {
      var r = n("9e69"),
          a = n("00fd"),
          o = n("29f3"),
          i = "[object Null]",
          s = "[object Undefined]",
          c = r ? r.toStringTag : void 0;

      function u(e) {
        return null == e ? void 0 === e ? s : i : c && c in Object(e) ? a(e) : o(e);
      }

      e.exports = u;
    },
    "37e8": function e8(e, t, n) {
      var r = n("83ab"),
          a = n("9bf2"),
          o = n("825a"),
          i = n("df75");
      e.exports = r ? Object.defineProperties : function (e, t) {
        o(e);
        var n,
            r = i(t),
            s = r.length,
            c = 0;

        while (s > c) {
          a.f(e, n = r[c++], t[n]);
        }

        return e;
      };
    },
    3818: function _(e, t, n) {
      var r = n("7e64"),
          a = n("8057"),
          o = n("32b3"),
          i = n("5b01"),
          s = n("0f0f"),
          c = n("e538"),
          u = n("4359"),
          l = n("54eb"),
          d = n("1041"),
          f = n("a994"),
          p = n("1bac"),
          h = n("42a2"),
          v = n("c87c"),
          b = n("c2b6"),
          m = n("fa21"),
          g = n("6747"),
          y = n("0d24"),
          w = n("cc45"),
          x = n("1a8c"),
          D = n("d7ee"),
          j = n("ec69"),
          O = n("9934"),
          k = 1,
          M = 2,
          P = 4,
          S = "[object Arguments]",
          Y = "[object Array]",
          E = "[object Boolean]",
          _ = "[object Date]",
          T = "[object Error]",
          I = "[object Function]",
          C = "[object GeneratorFunction]",
          $ = "[object Map]",
          A = "[object Number]",
          N = "[object Object]",
          F = "[object RegExp]",
          z = "[object Set]",
          L = "[object String]",
          H = "[object Symbol]",
          R = "[object WeakMap]",
          W = "[object ArrayBuffer]",
          V = "[object DataView]",
          U = "[object Float32Array]",
          B = "[object Float64Array]",
          Z = "[object Int8Array]",
          q = "[object Int16Array]",
          G = "[object Int32Array]",
          K = "[object Uint8Array]",
          X = "[object Uint8ClampedArray]",
          J = "[object Uint16Array]",
          Q = "[object Uint32Array]",
          ee = {};

      function te(e, t, n, Y, E, _) {
        var T,
            $ = t & k,
            A = t & M,
            F = t & P;
        if (n && (T = E ? n(e, Y, E, _) : n(e)), void 0 !== T) return T;
        if (!x(e)) return e;
        var z = g(e);

        if (z) {
          if (T = v(e), !$) return u(e, T);
        } else {
          var L = h(e),
              H = L == I || L == C;
          if (y(e)) return c(e, $);

          if (L == N || L == S || H && !E) {
            if (T = A || H ? {} : m(e), !$) return A ? d(e, s(T, e)) : l(e, i(T, e));
          } else {
            if (!ee[L]) return E ? e : {};
            T = b(e, L, $);
          }
        }

        _ || (_ = new r());

        var R = _.get(e);

        if (R) return R;
        _.set(e, T), D(e) ? e.forEach(function (r) {
          T.add(te(r, t, n, r, e, _));
        }) : w(e) && e.forEach(function (r, a) {
          T.set(a, te(r, t, n, a, e, _));
        });
        var W = F ? A ? p : f : A ? O : j,
            V = z ? void 0 : W(e);
        return a(V || e, function (r, a) {
          V && (a = r, r = e[a]), o(T, a, te(r, t, n, a, e, _));
        }), T;
      }

      ee[S] = ee[Y] = ee[W] = ee[V] = ee[E] = ee[_] = ee[U] = ee[B] = ee[Z] = ee[q] = ee[G] = ee[$] = ee[A] = ee[N] = ee[F] = ee[z] = ee[L] = ee[H] = ee[K] = ee[X] = ee[J] = ee[Q] = !0, ee[T] = ee[I] = ee[R] = !1, e.exports = te;
    },
    3852: function _(e, t, n) {
      var r = n("96f3"),
          a = n("e2c0");

      function o(e, t) {
        return null != e && a(e, t, r);
      }

      e.exports = o;
    },
    "39ff": function ff(e, t, n) {
      var r = n("0b07"),
          a = n("2b3e"),
          o = r(a, "WeakMap");
      e.exports = o;
    },
    "3b4a": function b4a(e, t, n) {
      var r = n("0b07"),
          a = function () {
        try {
          var e = r(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch (t) {}
      }();

      e.exports = a;
    },
    "3bb4": function bb4(e, t, n) {
      var r = n("08cc"),
          a = n("ec69");

      function o(e) {
        var t = a(e),
            n = t.length;

        while (n--) {
          var o = t[n],
              i = e[o];
          t[n] = [o, i, r(i)];
        }

        return t;
      }

      e.exports = o;
    },
    "3bbe": function bbe(e, t, n) {
      var r = n("861d");

      e.exports = function (e) {
        if (!r(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");
        return e;
      };
    },
    "3c06": function c06(e, t, n) {
      "use strict";

      var r = n("69bc"),
          a = n.n(r);
      a.a;
    },
    "3c55": function c55(e, t, n) {
      "use strict";

      var r = n("e969"),
          a = n.n(r);
      a.a;
    },
    "3ee2": function ee2(e, t, n) {
      var r = n("dc8c");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("13d41af5", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    "3eea": function eea(e, t, n) {
      var r = n("7948"),
          a = n("3818"),
          o = n("4bb5"),
          i = n("e2e4"),
          s = n("8eeb"),
          c = n("e0e7"),
          u = n("c6cf"),
          l = n("1bac"),
          d = 1,
          f = 2,
          p = 4,
          h = u(function (e, t) {
        var n = {};
        if (null == e) return n;
        var u = !1;
        t = r(t, function (t) {
          return t = i(t, e), u || (u = t.length > 1), t;
        }), s(e, l(e), n), u && (n = a(n, d | f | p, c));
        var h = t.length;

        while (h--) {
          o(n, t[h]);
        }

        return n;
      });
      e.exports = h;
    },
    "3f84": function f84(e, t, n) {
      var r = n("85e3"),
          a = n("100e"),
          o = n("e031"),
          i = n("2411"),
          s = a(function (e) {
        return e.push(void 0, o), r(i, void 0, e);
      });
      e.exports = s;
    },
    "3f8c": function f8c(e, t) {
      e.exports = {};
    },
    "41c3": function c3(e, t, n) {
      var r = n("1a8c"),
          a = n("eac5"),
          o = n("ec8c"),
          i = Object.prototype,
          s = i.hasOwnProperty;

      function c(e) {
        if (!r(e)) return o(e);
        var t = a(e),
            n = [];

        for (var i in e) {
          ("constructor" != i || !t && s.call(e, i)) && n.push(i);
        }

        return n;
      }

      e.exports = c;
    },
    4245: function _(e, t, n) {
      var r = n("1290");

      function a(e, t) {
        var n = e.__data__;
        return r(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
      }

      e.exports = a;
    },
    4284: function _(e, t) {
      function n(e, t) {
        var n = -1,
            r = null == e ? 0 : e.length;

        while (++n < r) {
          if (t(e[n], n, e)) return !0;
        }

        return !1;
      }

      e.exports = n;
    },
    "428f": function f(e, t, n) {
      var r = n("da84");
      e.exports = r;
    },
    "42a2": function a2(e, t, n) {
      var r = n("b5a7"),
          a = n("79bc"),
          o = n("1cec"),
          i = n("c869"),
          s = n("39ff"),
          c = n("3729"),
          u = n("dc57"),
          l = "[object Map]",
          d = "[object Object]",
          f = "[object Promise]",
          p = "[object Set]",
          h = "[object WeakMap]",
          v = "[object DataView]",
          b = u(r),
          m = u(a),
          g = u(o),
          y = u(i),
          w = u(s),
          x = c;
      (r && x(new r(new ArrayBuffer(1))) != v || a && x(new a()) != l || o && x(o.resolve()) != f || i && x(new i()) != p || s && x(new s()) != h) && (x = function x(e) {
        var t = c(e),
            n = t == d ? e.constructor : void 0,
            r = n ? u(n) : "";
        if (r) switch (r) {
          case b:
            return v;

          case m:
            return l;

          case g:
            return f;

          case y:
            return p;

          case w:
            return h;
        }
        return t;
      }), e.exports = x;
    },
    4359: function _(e, t) {
      function n(e, t) {
        var n = -1,
            r = e.length;
        t || (t = Array(r));

        while (++n < r) {
          t[n] = e[n];
        }

        return t;
      }

      e.exports = n;
    },
    4416: function _(e, t) {
      function n(e) {
        var t = null == e ? 0 : e.length;
        return t ? e[t - 1] : void 0;
      }

      e.exports = n;
    },
    "44ad": function ad(e, t, n) {
      var r = n("d039"),
          a = n("c6b6"),
          o = "".split;
      e.exports = r(function () {
        return !Object("z").propertyIsEnumerable(0);
      }) ? function (e) {
        return "String" == a(e) ? o.call(e, "") : Object(e);
      } : Object;
    },
    "44d2": function d2(e, t, n) {
      var r = n("b622"),
          a = n("7c73"),
          o = n("9bf2"),
          i = r("unscopables"),
          s = Array.prototype;
      void 0 == s[i] && o.f(s, i, {
        configurable: !0,
        value: a(null)
      }), e.exports = function (e) {
        s[i][e] = !0;
      };
    },
    4889: function _(e, t, n) {
      "use strict";

      var r = n("df9e"),
          a = n.n(r);
      a.a;
    },
    "48a0": function a0(e, t, n) {
      var r = n("242e"),
          a = n("950a"),
          o = a(r);
      e.exports = o;
    },
    4930: function _(e, t, n) {
      var r = n("d039");
      e.exports = !!Object.getOwnPropertySymbols && !r(function () {
        return !String(Symbol());
      });
    },
    "499e": function e(_e16, t, n) {
      "use strict";

      function r(e, t) {
        for (var n = [], r = {}, a = 0; a < t.length; a++) {
          var o = t[a],
              i = o[0],
              s = o[1],
              c = o[2],
              u = o[3],
              l = {
            id: e + ":" + a,
            css: s,
            media: c,
            sourceMap: u
          };
          r[i] ? r[i].parts.push(l) : n.push(r[i] = {
            id: i,
            parts: [l]
          });
        }

        return n;
      }

      n.r(t), n.d(t, "default", function () {
        return h;
      });
      var a = "undefined" !== typeof document;
      if ("undefined" !== typeof DEBUG && DEBUG && !a) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");

      var o = {},
          i = a && (document.head || document.getElementsByTagName("head")[0]),
          s = null,
          c = 0,
          u = !1,
          l = function l() {},
          d = null,
          f = "data-vue-ssr-id",
          p = "undefined" !== typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

      function h(e, t, n, a) {
        u = n, d = a || {};
        var i = r(e, t);
        return v(i), function (t) {
          for (var n = [], a = 0; a < i.length; a++) {
            var s = i[a],
                c = o[s.id];
            c.refs--, n.push(c);
          }

          t ? (i = r(e, t), v(i)) : i = [];

          for (a = 0; a < n.length; a++) {
            c = n[a];

            if (0 === c.refs) {
              for (var u = 0; u < c.parts.length; u++) {
                c.parts[u]();
              }

              delete o[c.id];
            }
          }
        };
      }

      function v(e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t],
              r = o[n.id];

          if (r) {
            r.refs++;

            for (var a = 0; a < r.parts.length; a++) {
              r.parts[a](n.parts[a]);
            }

            for (; a < n.parts.length; a++) {
              r.parts.push(m(n.parts[a]));
            }

            r.parts.length > n.parts.length && (r.parts.length = n.parts.length);
          } else {
            var i = [];

            for (a = 0; a < n.parts.length; a++) {
              i.push(m(n.parts[a]));
            }

            o[n.id] = {
              id: n.id,
              refs: 1,
              parts: i
            };
          }
        }
      }

      function b() {
        var e = document.createElement("style");
        return e.type = "text/css", i.appendChild(e), e;
      }

      function m(e) {
        var t,
            n,
            r = document.querySelector("style[" + f + '~="' + e.id + '"]');

        if (r) {
          if (u) return l;
          r.parentNode.removeChild(r);
        }

        if (p) {
          var a = c++;
          r = s || (s = b()), t = y.bind(null, r, a, !1), n = y.bind(null, r, a, !0);
        } else r = b(), t = w.bind(null, r), n = function n() {
          r.parentNode.removeChild(r);
        };

        return t(e), function (r) {
          if (r) {
            if (r.css === e.css && r.media === e.media && r.sourceMap === e.sourceMap) return;
            t(e = r);
          } else n();
        };
      }

      var g = function () {
        var e = [];
        return function (t, n) {
          return e[t] = n, e.filter(Boolean).join("\n");
        };
      }();

      function y(e, t, n, r) {
        var a = n ? "" : r.css;
        if (e.styleSheet) e.styleSheet.cssText = g(t, a);else {
          var o = document.createTextNode(a),
              i = e.childNodes;
          i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(o, i[t]) : e.appendChild(o);
        }
      }

      function w(e, t) {
        var n = t.css,
            r = t.media,
            a = t.sourceMap;
        if (r && e.setAttribute("media", r), d.ssrId && e.setAttribute(f, t.id), a && (n += "\n/*# sourceURL=" + a.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;else {
          while (e.firstChild) {
            e.removeChild(e.firstChild);
          }

          e.appendChild(document.createTextNode(n));
        }
      }
    },
    "49f4": function f4(e, t, n) {
      var r = n("6044");

      function a() {
        this.__data__ = r ? r(null) : {}, this.size = 0;
      }

      e.exports = a;
    },
    "4bb5": function bb5(e, t, n) {
      var r = n("e2e4"),
          a = n("4416"),
          o = n("8296"),
          i = n("f4d6");

      function s(e, t) {
        return t = r(t, e), e = o(e, t), null == e || delete e[i(a(t))];
      }

      e.exports = s;
    },
    "4cfe": function cfe(e, t) {
      function n(e) {
        return void 0 === e;
      }

      e.exports = n;
    },
    "4d64": function d64(e, t, n) {
      var r = n("fc6a"),
          a = n("50c4"),
          o = n("23cb"),
          i = function i(e) {
        return function (t, n, i) {
          var s,
              c = r(t),
              u = a(c.length),
              l = o(i, u);

          if (e && n != n) {
            while (u > l) {
              if (s = c[l++], s != s) return !0;
            }
          } else for (; u > l; l++) {
            if ((e || l in c) && c[l] === n) return e || l || 0;
          }

          return !e && -1;
        };
      };

      e.exports = {
        includes: i(!0),
        indexOf: i(!1)
      };
    },
    "4d8c": function d8c(e, t, n) {
      var r = n("5c69");

      function a(e) {
        var t = null == e ? 0 : e.length;
        return t ? r(e, 1) : [];
      }

      e.exports = a;
    },
    "4f50": function f50(e, t, n) {
      var r = n("b760"),
          a = n("e538"),
          o = n("c8fe"),
          i = n("4359"),
          s = n("fa21"),
          c = n("d370"),
          u = n("6747"),
          l = n("dcbe"),
          d = n("0d24"),
          f = n("9520"),
          p = n("1a8c"),
          h = n("60ed"),
          v = n("73ac"),
          b = n("8adb"),
          m = n("8de2");

      function g(e, t, n, g, y, w, x) {
        var D = b(e, n),
            j = b(t, n),
            O = x.get(j);
        if (O) r(e, n, O);else {
          var k = w ? w(D, j, n + "", e, t, x) : void 0,
              M = void 0 === k;

          if (M) {
            var P = u(j),
                S = !P && d(j),
                Y = !P && !S && v(j);
            k = j, P || S || Y ? u(D) ? k = D : l(D) ? k = i(D) : S ? (M = !1, k = a(j, !0)) : Y ? (M = !1, k = o(j, !0)) : k = [] : h(j) || c(j) ? (k = D, c(D) ? k = m(D) : p(D) && !f(D) || (k = s(j))) : M = !1;
          }

          M && (x.set(j, k), y(k, j, g, w, x), x["delete"](j)), r(e, n, k);
        }
      }

      e.exports = g;
    },
    "501e": function e(_e17, t, n) {
      var r = n("3729"),
          a = n("1310"),
          o = "[object Number]";

      function i(e) {
        return "number" == typeof e || a(e) && r(e) == o;
      }

      _e17.exports = i;
    },
    "50c4": function c4(e, t, n) {
      var r = n("a691"),
          a = Math.min;

      e.exports = function (e) {
        return e > 0 ? a(r(e), 9007199254740991) : 0;
      };
    },
    "50d8": function d8(e, t) {
      function n(e, t) {
        var n = -1,
            r = Array(e);

        while (++n < e) {
          r[n] = t(n);
        }

        return r;
      }

      e.exports = n;
    },
    5135: function _(e, t) {
      var n = {}.hasOwnProperty;

      e.exports = function (e, t) {
        return n.call(e, t);
      };
    },
    "51ec": function ec(e, t, n) {
      "use strict";

      n.d(t, "b", function () {
        return f;
      }), n.d(t, "a", function () {
        return p;
      });
      var r = n("8bbf"),
          a = n.n(r),
          o = n("9404"),
          i = n("23a5"),
          s = n("7efe"),
          c = n("85a9"),
          u = n("f15d");
      var l = {
        componentPrefix: "v",
        navVisibility: "click",
        titlePosition: "center",
        transition: "slide-h",
        touch: i,
        masks: s,
        screens: c,
        locales: u["a"],
        datePicker: {
          updateOnInput: !0,
          inputDebounce: 1e3,
          popover: {
            visibility: "hover-focus",
            placement: "bottom-start",
            keepVisibleOnInput: !1,
            isInteractive: !0
          }
        }
      };
      var d = null;

      var f = function f(e) {
        return d || (d = new a.a({
          data: function data() {
            return {
              defaults: Object(o["c"])(e, l)
            };
          },
          computed: {
            locales: function locales() {
              var e = this;
              return Object(o["r"])(this.defaults.locales, function (t) {
                return t.masks = Object(o["c"])(t.masks, e.defaults.masks), t;
              });
            }
          }
        })), d.defaults;
      },
          p = {
        beforeCreate: function beforeCreate() {
          f();
        },
        computed: {
          $defaults: function $defaults() {
            return d.defaults;
          },
          $locales: function $locales() {
            return d.locales;
          }
        },
        methods: {
          propOrDefault: function propOrDefault(e, t, n) {
            return this.passedProp(e, Object(o["d"])(this.$defaults, t), n);
          },
          passedProp: function passedProp(e, t, n) {
            if (Object(o["e"])(this.$options.propsData, e)) {
              var _r5 = this[e];
              return Object(o["m"])(_r5) && "merge" === n ? Object(o["c"])(_r5, t) : _r5;
            }

            return t;
          }
        }
      };
    },
    5319: function _(e, t, n) {
      "use strict";

      var r = n("d784"),
          a = n("825a"),
          o = n("7b0b"),
          i = n("50c4"),
          s = n("a691"),
          c = n("1d80"),
          u = n("8aa5"),
          l = n("14c3"),
          d = Math.max,
          f = Math.min,
          p = Math.floor,
          h = /\$([$&'`]|\d\d?|<[^>]*>)/g,
          v = /\$([$&'`]|\d\d?)/g,
          b = function b(e) {
        return void 0 === e ? e : String(e);
      };

      r("replace", 2, function (e, t, n, r) {
        var m = r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
            g = r.REPLACE_KEEPS_$0,
            y = m ? "$" : "$0";
        return [function (n, r) {
          var a = c(this),
              o = void 0 == n ? void 0 : n[e];
          return void 0 !== o ? o.call(n, a, r) : t.call(String(a), n, r);
        }, function (e, r) {
          if (!m && g || "string" === typeof r && -1 === r.indexOf(y)) {
            var o = n(t, e, this, r);
            if (o.done) return o.value;
          }

          var c = a(e),
              p = String(this),
              h = "function" === typeof r;
          h || (r = String(r));
          var v = c.global;

          if (v) {
            var x = c.unicode;
            c.lastIndex = 0;
          }

          var D = [];

          while (1) {
            var j = l(c, p);
            if (null === j) break;
            if (D.push(j), !v) break;
            var O = String(j[0]);
            "" === O && (c.lastIndex = u(p, i(c.lastIndex), x));
          }

          for (var k = "", M = 0, P = 0; P < D.length; P++) {
            j = D[P];

            for (var S = String(j[0]), Y = d(f(s(j.index), p.length), 0), E = [], _ = 1; _ < j.length; _++) {
              E.push(b(j[_]));
            }

            var T = j.groups;

            if (h) {
              var I = [S].concat(E, Y, p);
              void 0 !== T && I.push(T);
              var C = String(r.apply(void 0, I));
            } else C = w(S, p, Y, E, T, r);

            Y >= M && (k += p.slice(M, Y) + C, M = Y + S.length);
          }

          return k + p.slice(M);
        }];

        function w(e, n, r, a, i, s) {
          var c = r + e.length,
              u = a.length,
              l = v;
          return void 0 !== i && (i = o(i), l = h), t.call(s, l, function (t, o) {
            var s;

            switch (o.charAt(0)) {
              case "$":
                return "$";

              case "&":
                return e;

              case "`":
                return n.slice(0, r);

              case "'":
                return n.slice(c);

              case "<":
                s = i[o.slice(1, -1)];
                break;

              default:
                var l = +o;
                if (0 === l) return t;

                if (l > u) {
                  var d = p(l / 10);
                  return 0 === d ? t : d <= u ? void 0 === a[d - 1] ? o.charAt(1) : a[d - 1] + o.charAt(1) : t;
                }

                s = a[l - 1];
            }

            return void 0 === s ? "" : s;
          });
        }
      });
    },
    "54eb": function eb(e, t, n) {
      var r = n("8eeb"),
          a = n("32f4");

      function o(e, t) {
        return r(e, a(e), t);
      }

      e.exports = o;
    },
    "55a3": function a3(e, t) {
      function n(e) {
        return this.__data__.has(e);
      }

      e.exports = n;
    },
    5692: function _(e, t, n) {
      var r = n("c430"),
          a = n("c6cd");
      (e.exports = function (e, t) {
        return a[e] || (a[e] = void 0 !== t ? t : {});
      })("versions", []).push({
        version: "3.6.5",
        mode: r ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
      });
    },
    "56ef": function ef(e, t, n) {
      var r = n("d066"),
          a = n("241c"),
          o = n("7418"),
          i = n("825a");

      e.exports = r("Reflect", "ownKeys") || function (e) {
        var t = a.f(i(e)),
            n = o.f;
        return n ? t.concat(n(e)) : t;
      };
    },
    "57a5": function a5(e, t, n) {
      var r = n("91e9"),
          a = r(Object.keys, Object);
      e.exports = a;
    },
    5849: function _(e, t, n) {
      var r = n("b803");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("0a9763a7", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    "585a": function a(e, t, n) {
      (function (t) {
        var n = "object" == _typeof(t) && t && t.Object === Object && t;
        e.exports = n;
      }).call(this, n("c8ba"));
    },
    5905: function _(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".none-enter-active[data-v-8466592e],.none-leave-active[data-v-8466592e]{transition-duration:0s}.fade-enter-active[data-v-8466592e],.fade-leave-active[data-v-8466592e],.slide-down-enter-active[data-v-8466592e],.slide-down-leave-active[data-v-8466592e],.slide-left-enter-active[data-v-8466592e],.slide-left-leave-active[data-v-8466592e],.slide-right-enter-active[data-v-8466592e],.slide-right-leave-active[data-v-8466592e],.slide-up-enter-active[data-v-8466592e],.slide-up-leave-active[data-v-8466592e]{transition:transform var(--slide-duration) var(--slide-timing),opacity var(--slide-duration) var(--slide-timing);-webkit-backface-visibility:hidden;backface-visibility:hidden}.fade-leave-active[data-v-8466592e],.none-leave-active[data-v-8466592e],.slide-down-leave-active[data-v-8466592e],.slide-left-leave-active[data-v-8466592e],.slide-right-leave-active[data-v-8466592e],.slide-up-leave-active[data-v-8466592e]{position:absolute;width:100%}.fade-enter[data-v-8466592e],.fade-leave-to[data-v-8466592e],.none-enter[data-v-8466592e],.none-leave-to[data-v-8466592e],.slide-down-enter[data-v-8466592e],.slide-down-leave-to[data-v-8466592e],.slide-left-enter[data-v-8466592e],.slide-left-leave-to[data-v-8466592e],.slide-right-enter[data-v-8466592e],.slide-right-leave-to[data-v-8466592e],.slide-up-enter[data-v-8466592e],.slide-up-leave-to[data-v-8466592e]{opacity:0}.slide-left-enter[data-v-8466592e],.slide-right-leave-to[data-v-8466592e]{transform:translateX(var(--slide-translate))}.slide-left-leave-to[data-v-8466592e],.slide-right-enter[data-v-8466592e]{transform:translateX(calc(var(--slide-translate)*-1))}.slide-down-leave-to[data-v-8466592e],.slide-up-enter[data-v-8466592e]{transform:translateY(var(--slide-translate))}.slide-down-enter[data-v-8466592e],.slide-up-leave-to[data-v-8466592e]{transform:translateY(calc(var(--slide-translate)*-1))}", ""]), e.exports = t;
    },
    "5b01": function b01(e, t, n) {
      var r = n("8eeb"),
          a = n("ec69");

      function o(e, t) {
        return e && r(t, a(t), e);
      }

      e.exports = o;
    },
    "5c69": function c69(e, t, n) {
      var r = n("087d"),
          a = n("0621");

      function o(e, t, n, i, s) {
        var c = -1,
            u = e.length;
        n || (n = a), s || (s = []);

        while (++c < u) {
          var l = e[c];
          t > 0 && n(l) ? t > 1 ? o(l, t - 1, n, i, s) : r(s, l) : i || (s[s.length] = l);
        }

        return s;
      }

      e.exports = o;
    },
    "5c6c": function c6c(e, t) {
      e.exports = function (e, t) {
        return {
          enumerable: !(1 & e),
          configurable: !(2 & e),
          writable: !(4 & e),
          value: t
        };
      };
    },
    "5d89": function d89(e, t, n) {
      var r = n("f8af");

      function a(e, t) {
        var n = t ? r(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }

      e.exports = a;
    },
    "5e2e": function e2e(e, t, n) {
      var r = n("28c9"),
          a = n("69d5"),
          o = n("b4c0"),
          i = n("fba5"),
          s = n("67ca");

      function c(e) {
        var t = -1,
            n = null == e ? 0 : e.length;
        this.clear();

        while (++t < n) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }

      c.prototype.clear = r, c.prototype["delete"] = a, c.prototype.get = o, c.prototype.has = i, c.prototype.set = s, e.exports = c;
    },
    6044: function _(e, t, n) {
      var r = n("0b07"),
          a = r(Object, "create");
      e.exports = a;
    },
    "60ed": function ed(e, t, n) {
      var r = n("3729"),
          a = n("2dcb"),
          o = n("1310"),
          i = "[object Object]",
          s = Function.prototype,
          c = Object.prototype,
          u = s.toString,
          l = c.hasOwnProperty,
          d = u.call(Object);

      function f(e) {
        if (!o(e) || r(e) != i) return !1;
        var t = a(e);
        if (null === t) return !0;
        var n = l.call(t, "constructor") && t.constructor;
        return "function" == typeof n && n instanceof n && u.call(n) == d;
      }

      e.exports = f;
    },
    6220: function _(e, t, n) {
      var r = n("b1d2"),
          a = n("b047"),
          o = n("99d3"),
          i = o && o.isDate,
          s = i ? a(i) : r;
      e.exports = s;
    },
    "62e4": function e4(e, t) {
      e.exports = function (e) {
        return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
          enumerable: !0,
          get: function get() {
            return e.l;
          }
        }), Object.defineProperty(e, "id", {
          enumerable: !0,
          get: function get() {
            return e.i;
          }
        }), e.webpackPolyfill = 1), e;
      };
    },
    "642a": function a(e, t, n) {
      var r = n("966f"),
          a = n("3bb4"),
          o = n("20ec");

      function i(e) {
        var t = a(e);
        return 1 == t.length && t[0][2] ? o(t[0][0], t[0][1]) : function (n) {
          return n === e || r(n, e, t);
        };
      }

      e.exports = i;
    },
    6547: function _(e, t, n) {
      var r = n("a691"),
          a = n("1d80"),
          o = function o(e) {
        return function (t, n) {
          var o,
              i,
              s = String(a(t)),
              c = r(n),
              u = s.length;
          return c < 0 || c >= u ? e ? "" : void 0 : (o = s.charCodeAt(c), o < 55296 || o > 56319 || c + 1 === u || (i = s.charCodeAt(c + 1)) < 56320 || i > 57343 ? e ? s.charAt(c) : o : e ? s.slice(c, c + 2) : i - 56320 + (o - 55296 << 10) + 65536);
        };
      };

      e.exports = {
        codeAt: o(!1),
        charAt: o(!0)
      };
    },
    "656b": function b(e, t, n) {
      var r = n("e2e4"),
          a = n("f4d6");

      function o(e, t) {
        t = r(t, e);
        var n = 0,
            o = t.length;

        while (null != e && n < o) {
          e = e[a(t[n++])];
        }

        return n && n == o ? e : void 0;
      }

      e.exports = o;
    },
    6679: function _(e, t, n) {
      var r = n("3729"),
          a = n("1310"),
          o = "[object Boolean]";

      function i(e) {
        return !0 === e || !1 === e || a(e) && r(e) == o;
      }

      e.exports = i;
    },
    6747: function _(e, t) {
      var n = Array.isArray;
      e.exports = n;
    },
    "67ca": function ca(e, t, n) {
      var r = n("cb5a");

      function a(e, t) {
        var n = this.__data__,
            a = r(n, e);
        return a < 0 ? (++this.size, n.push([e, t])) : n[a][1] = t, this;
      }

      e.exports = a;
    },
    "69bc": function bc(e, t, n) {
      var r = n("16c7");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("e36d046a", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    "69d5": function d5(e, t, n) {
      var r = n("cb5a"),
          a = Array.prototype,
          o = a.splice;

      function i(e) {
        var t = this.__data__,
            n = r(t, e);
        if (n < 0) return !1;
        var a = t.length - 1;
        return n == a ? t.pop() : o.call(t, n, 1), --this.size, !0;
      }

      e.exports = i;
    },
    "69f3": function f3(e, t, n) {
      var r,
          a,
          o,
          i = n("7f9a"),
          s = n("da84"),
          c = n("861d"),
          u = n("9112"),
          l = n("5135"),
          d = n("f772"),
          f = n("d012"),
          p = s.WeakMap,
          h = function h(e) {
        return o(e) ? a(e) : r(e, {});
      },
          v = function v(e) {
        return function (t) {
          var n;
          if (!c(t) || (n = a(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
          return n;
        };
      };

      if (i) {
        var b = new p(),
            m = b.get,
            g = b.has,
            y = b.set;
        r = function r(e, t) {
          return y.call(b, e, t), t;
        }, a = function a(e) {
          return m.call(b, e) || {};
        }, o = function o(e) {
          return g.call(b, e);
        };
      } else {
        var w = d("state");
        f[w] = !0, r = function r(e, t) {
          return u(e, w, t), t;
        }, a = function a(e) {
          return l(e, w) ? e[w] : {};
        }, o = function o(e) {
          return l(e, w);
        };
      }

      e.exports = {
        set: r,
        get: a,
        has: o,
        enforce: h,
        getterFor: v
      };
    },
    "6eeb": function eeb(e, t, n) {
      var r = n("da84"),
          a = n("9112"),
          o = n("5135"),
          i = n("ce4e"),
          s = n("8925"),
          c = n("69f3"),
          u = c.get,
          l = c.enforce,
          d = String(String).split("String");
      (e.exports = function (e, t, n, s) {
        var c = !!s && !!s.unsafe,
            u = !!s && !!s.enumerable,
            f = !!s && !!s.noTargetGet;
        "function" == typeof n && ("string" != typeof t || o(n, "name") || a(n, "name", t), l(n).source = d.join("string" == typeof t ? t : "")), e !== r ? (c ? !f && e[t] && (u = !0) : delete e[t], u ? e[t] = n : a(e, t, n)) : u ? e[t] = n : i(t, n);
      })(Function.prototype, "toString", function () {
        return "function" == typeof this && u(this).source || s(this);
      });
    },
    "6f6c": function f6c(e, t) {
      var n = /\w*$/;

      function r(e) {
        var t = new e.constructor(e.source, n.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }

      e.exports = r;
    },
    "6fcd": function fcd(e, t, n) {
      var r = n("50d8"),
          a = n("d370"),
          o = n("6747"),
          i = n("0d24"),
          s = n("c098"),
          c = n("73ac"),
          u = Object.prototype,
          l = u.hasOwnProperty;

      function d(e, t) {
        var n = o(e),
            u = !n && a(e),
            d = !n && !u && i(e),
            f = !n && !u && !d && c(e),
            p = n || u || d || f,
            h = p ? r(e.length, String) : [],
            v = h.length;

        for (var b in e) {
          !t && !l.call(e, b) || p && ("length" == b || d && ("offset" == b || "parent" == b) || f && ("buffer" == b || "byteLength" == b || "byteOffset" == b) || s(b, v)) || h.push(b);
        }

        return h;
      }

      e.exports = d;
    },
    "72af": function af(e, t, n) {
      var r = n("99cd"),
          a = r();
      e.exports = a;
    },
    "72f0": function f0(e, t) {
      function n(e) {
        return function () {
          return e;
        };
      }

      e.exports = n;
    },
    "72f5": function f5(e, t, n) {
      var r = n("9e2e");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("2997fbdf", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    "73ac": function ac(e, t, n) {
      var r = n("743f"),
          a = n("b047"),
          o = n("99d3"),
          i = o && o.isTypedArray,
          s = i ? a(i) : r;
      e.exports = s;
    },
    7418: function _(e, t) {
      t.f = Object.getOwnPropertySymbols;
    },
    "743f": function f(e, t, n) {
      var r = n("3729"),
          a = n("b218"),
          o = n("1310"),
          i = "[object Arguments]",
          s = "[object Array]",
          c = "[object Boolean]",
          u = "[object Date]",
          l = "[object Error]",
          d = "[object Function]",
          f = "[object Map]",
          p = "[object Number]",
          h = "[object Object]",
          v = "[object RegExp]",
          b = "[object Set]",
          m = "[object String]",
          g = "[object WeakMap]",
          y = "[object ArrayBuffer]",
          w = "[object DataView]",
          x = "[object Float32Array]",
          D = "[object Float64Array]",
          j = "[object Int8Array]",
          O = "[object Int16Array]",
          k = "[object Int32Array]",
          M = "[object Uint8Array]",
          P = "[object Uint8ClampedArray]",
          S = "[object Uint16Array]",
          Y = "[object Uint32Array]",
          E = {};

      function _(e) {
        return o(e) && a(e.length) && !!E[r(e)];
      }

      E[x] = E[D] = E[j] = E[O] = E[k] = E[M] = E[P] = E[S] = E[Y] = !0, E[i] = E[s] = E[y] = E[c] = E[w] = E[u] = E[l] = E[d] = E[f] = E[p] = E[h] = E[v] = E[b] = E[m] = E[g] = !1, e.exports = _;
    },
    7530: function _(e, t, n) {
      var r = n("1a8c"),
          a = Object.create,
          o = function () {
        function e() {}

        return function (t) {
          if (!r(t)) return {};
          if (a) return a(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = void 0, n;
        };
      }();

      e.exports = o;
    },
    "76dd": function dd(e, t, n) {
      var r = n("ce86");

      function a(e) {
        return null == e ? "" : r(e);
      }

      e.exports = a;
    },
    7839: function _(e, t) {
      e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
    },
    7948: function _(e, t) {
      function n(e, t) {
        var n = -1,
            r = null == e ? 0 : e.length,
            a = Array(r);

        while (++n < r) {
          a[n] = t(e[n], n, e);
        }

        return a;
      }

      e.exports = n;
    },
    "79bc": function bc(e, t, n) {
      var r = n("0b07"),
          a = n("2b3e"),
          o = r(a, "Map");
      e.exports = o;
    },
    "7a48": function a48(e, t, n) {
      var r = n("6044"),
          a = Object.prototype,
          o = a.hasOwnProperty;

      function i(e) {
        var t = this.__data__;
        return r ? void 0 !== t[e] : o.call(t, e);
      }

      e.exports = i;
    },
    "7b0b": function b0b(e, t, n) {
      var r = n("1d80");

      e.exports = function (e) {
        return Object(r(e));
      };
    },
    "7b83": function b83(e, t, n) {
      var r = n("7c64"),
          a = n("93ed"),
          o = n("2478"),
          i = n("a524"),
          s = n("1fc8");

      function c(e) {
        var t = -1,
            n = null == e ? 0 : e.length;
        this.clear();

        while (++t < n) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }

      c.prototype.clear = r, c.prototype["delete"] = a, c.prototype.get = o, c.prototype.has = i, c.prototype.set = s, e.exports = c;
    },
    "7b97": function b97(e, t, n) {
      var r = n("7e64"),
          a = n("a2be"),
          o = n("1c3c"),
          i = n("b1e5"),
          s = n("42a2"),
          c = n("6747"),
          u = n("0d24"),
          l = n("73ac"),
          d = 1,
          f = "[object Arguments]",
          p = "[object Array]",
          h = "[object Object]",
          v = Object.prototype,
          b = v.hasOwnProperty;

      function m(e, t, n, v, m, g) {
        var y = c(e),
            w = c(t),
            x = y ? p : s(e),
            D = w ? p : s(t);
        x = x == f ? h : x, D = D == f ? h : D;
        var j = x == h,
            O = D == h,
            k = x == D;

        if (k && u(e)) {
          if (!u(t)) return !1;
          y = !0, j = !1;
        }

        if (k && !j) return g || (g = new r()), y || l(e) ? a(e, t, n, v, m, g) : o(e, t, x, n, v, m, g);

        if (!(n & d)) {
          var M = j && b.call(e, "__wrapped__"),
              P = O && b.call(t, "__wrapped__");

          if (M || P) {
            var S = M ? e.value() : e,
                Y = P ? t.value() : t;
            return g || (g = new r()), m(S, Y, n, v, g);
          }
        }

        return !!k && (g || (g = new r()), i(e, t, n, v, m, g));
      }

      e.exports = m;
    },
    "7c64": function c64(e, t, n) {
      var r = n("e24b"),
          a = n("5e2e"),
          o = n("79bc");

      function i() {
        this.size = 0, this.__data__ = {
          hash: new r(),
          map: new (o || a)(),
          string: new r()
        };
      }

      e.exports = i;
    },
    "7c73": function c73(e, t, n) {
      var r,
          a = n("825a"),
          o = n("37e8"),
          i = n("7839"),
          s = n("d012"),
          c = n("1be4"),
          u = n("cc12"),
          l = n("f772"),
          d = ">",
          f = "<",
          p = "prototype",
          h = "script",
          v = l("IE_PROTO"),
          b = function b() {},
          m = function m(e) {
        return f + h + d + e + f + "/" + h + d;
      },
          g = function g(e) {
        e.write(m("")), e.close();
        var t = e.parentWindow.Object;
        return e = null, t;
      },
          y = function y() {
        var e,
            t = u("iframe"),
            n = "java" + h + ":";
        return t.style.display = "none", c.appendChild(t), t.src = String(n), e = t.contentWindow.document, e.open(), e.write(m("document.F=Object")), e.close(), e.F;
      },
          _w = function w() {
        try {
          r = document.domain && new ActiveXObject("htmlfile");
        } catch (t) {}

        _w = r ? g(r) : y();
        var e = i.length;

        while (e--) {
          delete _w[p][i[e]];
        }

        return _w();
      };

      s[v] = !0, e.exports = Object.create || function (e, t) {
        var n;
        return null !== e ? (b[p] = a(e), n = new b(), b[p] = null, n[v] = e) : n = _w(), void 0 === t ? n : o(n, t);
      };
    },
    "7d1f": function d1f(e, t, n) {
      var r = n("087d"),
          a = n("6747");

      function o(e, t, n) {
        var o = t(e);
        return a(e) ? o : r(o, n(e));
      }

      e.exports = o;
    },
    "7dd0": function dd0(e, t, n) {
      "use strict";

      var r = n("23e7"),
          a = n("9ed3"),
          o = n("e163"),
          i = n("d2bb"),
          s = n("d44e"),
          c = n("9112"),
          u = n("6eeb"),
          l = n("b622"),
          d = n("c430"),
          f = n("3f8c"),
          p = n("ae93"),
          h = p.IteratorPrototype,
          v = p.BUGGY_SAFARI_ITERATORS,
          b = l("iterator"),
          m = "keys",
          g = "values",
          y = "entries",
          w = function w() {
        return this;
      };

      e.exports = function (e, t, n, l, p, x, D) {
        a(n, t, l);

        var j,
            O,
            k,
            M = function M(e) {
          if (e === p && _) return _;
          if (!v && e in Y) return Y[e];

          switch (e) {
            case m:
              return function () {
                return new n(this, e);
              };

            case g:
              return function () {
                return new n(this, e);
              };

            case y:
              return function () {
                return new n(this, e);
              };
          }

          return function () {
            return new n(this);
          };
        },
            P = t + " Iterator",
            S = !1,
            Y = e.prototype,
            E = Y[b] || Y["@@iterator"] || p && Y[p],
            _ = !v && E || M(p),
            T = "Array" == t && Y.entries || E;

        if (T && (j = o(T.call(new e())), h !== Object.prototype && j.next && (d || o(j) === h || (i ? i(j, h) : "function" != typeof j[b] && c(j, b, w)), s(j, P, !0, !0), d && (f[P] = w))), p == g && E && E.name !== g && (S = !0, _ = function _() {
          return E.call(this);
        }), d && !D || Y[b] === _ || c(Y, b, _), f[t] = _, p) if (O = {
          values: M(g),
          keys: x ? _ : M(m),
          entries: M(y)
        }, D) for (k in O) {
          (v || S || !(k in Y)) && u(Y, k, O[k]);
        } else r({
          target: t,
          proto: !0,
          forced: v || S
        }, O);
        return O;
      };
    },
    "7e64": function e64(e, t, n) {
      var r = n("5e2e"),
          a = n("efb6"),
          o = n("2fcc"),
          i = n("802a"),
          s = n("55a3"),
          c = n("d02c");

      function u(e) {
        var t = this.__data__ = new r(e);
        this.size = t.size;
      }

      u.prototype.clear = a, u.prototype["delete"] = o, u.prototype.get = i, u.prototype.has = s, u.prototype.set = c, e.exports = u;
    },
    "7ed2": function ed2(e, t) {
      var n = "__lodash_hash_undefined__";

      function r(e) {
        return this.__data__.set(e, n), this;
      }

      e.exports = r;
    },
    "7efe": function efe(e) {
      e.exports = JSON.parse('{"title":"MMMM YYYY","weekdays":"W","navMonths":"MMM","input":["L","YYYY-MM-DD","YYYY/MM/DD"],"inputDateTime":["L h:mm A","YYYY-MM-DD h:mm A","YYYY/MM/DD h:mm A"],"inputDateTime24hr":["L HH:mm","YYYY-MM-DD HH:mm","YYYY/MM/DD HH:mm"],"inputTime":["h:mm A"],"inputTime24hr":["HH:mm"],"dayPopover":"WWW, MMM D, YYYY","data":["L","YYYY-MM-DD","YYYY/MM/DD"],"iso":"YYYY-MM-DDTHH:mm:ss.SSSZ"}');
    },
    "7f9a": function f9a(e, t, n) {
      var r = n("da84"),
          a = n("8925"),
          o = r.WeakMap;
      e.exports = "function" === typeof o && /native code/.test(a(o));
    },
    "802a": function a(e, t) {
      function n(e) {
        return this.__data__.get(e);
      }

      e.exports = n;
    },
    8057: function _(e, t) {
      function n(e, t) {
        var n = -1,
            r = null == e ? 0 : e.length;

        while (++n < r) {
          if (!1 === t(e[n], n, e)) break;
        }

        return e;
      }

      e.exports = n;
    },
    "825a": function a(e, t, n) {
      var r = n("861d");

      e.exports = function (e) {
        if (!r(e)) throw TypeError(String(e) + " is not an object");
        return e;
      };
    },
    8296: function _(e, t, n) {
      var r = n("656b"),
          a = n("2b10");

      function o(e, t) {
        return t.length < 2 ? e : r(e, a(t, 0, -1));
      }

      e.exports = o;
    },
    8384: function _(e, t) {
      function n(e, t, n) {
        return e === e && (void 0 !== n && (e = e <= n ? e : n), void 0 !== t && (e = e >= t ? e : t)), e;
      }

      e.exports = n;
    },
    "83ab": function ab(e, t, n) {
      var r = n("d039");
      e.exports = !r(function () {
        return 7 != Object.defineProperty({}, 1, {
          get: function get() {
            return 7;
          }
        })[1];
      });
    },
    "85a9": function a9(e) {
      e.exports = JSON.parse('{"sm":"640px","md":"768px","lg":"1024px","xl":"1280px"}');
    },
    "85e3": function e3(e, t) {
      function n(e, t, n) {
        switch (n.length) {
          case 0:
            return e.call(t);

          case 1:
            return e.call(t, n[0]);

          case 2:
            return e.call(t, n[0], n[1]);

          case 3:
            return e.call(t, n[0], n[1], n[2]);
        }

        return e.apply(t, n);
      }

      e.exports = n;
    },
    8604: function _(e, t, n) {
      var r = n("26e8"),
          a = n("e2c0");

      function o(e, t) {
        return null != e && a(e, t, r);
      }

      e.exports = o;
    },
    "861d": function d(e, t) {
      e.exports = function (e) {
        return "object" === _typeof(e) ? null !== e : "function" === typeof e;
      };
    },
    "872a": function a(e, t, n) {
      var r = n("3b4a");

      function a(e, t, n) {
        "__proto__" == t && r ? r(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }

      e.exports = a;
    },
    8925: function _(e, t, n) {
      var r = n("c6cd"),
          a = Function.toString;
      "function" != typeof r.inspectSource && (r.inspectSource = function (e) {
        return a.call(e);
      }), e.exports = r.inspectSource;
    },
    "89d9": function d9(e, t, n) {
      var r = n("656b"),
          a = n("159a"),
          o = n("e2e4");

      function i(e, t, n) {
        var i = -1,
            s = t.length,
            c = {};

        while (++i < s) {
          var u = t[i],
              l = r(e, u);
          n(l, u) && a(c, o(u, e), l);
        }

        return c;
      }

      e.exports = i;
    },
    "8aa5": function aa5(e, t, n) {
      "use strict";

      var r = n("6547").charAt;

      e.exports = function (e, t, n) {
        return t + (n ? r(e, t).length : 1);
      };
    },
    "8adb": function adb(e, t) {
      function n(e, t) {
        if (("constructor" !== t || "function" !== typeof e[t]) && "__proto__" != t) return e[t];
      }

      e.exports = n;
    },
    "8bbf": function bbf(t, n) {
      t.exports = e;
    },
    "8c86": function c86(e, t, n) {
      "use strict";

      function r(e, t) {
        if (t.length < e) throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
      }

      n.d(t, "a", function () {
        return r;
      });
    },
    "8dad": function dad(e, t, n) {
      var r = n("1497");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("e59e570c", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    "8de2": function de2(e, t, n) {
      var r = n("8eeb"),
          a = n("9934");

      function o(e) {
        return r(e, a(e));
      }

      e.exports = o;
    },
    "8eeb": function eeb(e, t, n) {
      var r = n("32b3"),
          a = n("872a");

      function o(e, t, n, o) {
        var i = !n;
        n || (n = {});
        var s = -1,
            c = t.length;

        while (++s < c) {
          var u = t[s],
              l = o ? o(n[u], e[u], u, n, e) : void 0;
          void 0 === l && (l = e[u]), i ? a(n, u, l) : r(n, u, l);
        }

        return n;
      }

      e.exports = o;
    },
    "90e3": function e3(e, t) {
      var n = 0,
          r = Math.random();

      e.exports = function (e) {
        return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++n + r).toString(36);
      };
    },
    9112: function _(e, t, n) {
      var r = n("83ab"),
          a = n("9bf2"),
          o = n("5c6c");
      e.exports = r ? function (e, t, n) {
        return a.f(e, t, o(1, n));
      } : function (e, t, n) {
        return e[t] = n, e;
      };
    },
    "91e9": function e9(e, t) {
      function n(e, t) {
        return function (n) {
          return e(t(n));
        };
      }

      e.exports = n;
    },
    9263: function _(e, t, n) {
      "use strict";

      var r = n("ad6d"),
          a = n("9f7f"),
          o = RegExp.prototype.exec,
          i = String.prototype.replace,
          s = o,
          c = function () {
        var e = /a/,
            t = /b*/g;
        return o.call(e, "a"), o.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex;
      }(),
          u = a.UNSUPPORTED_Y || a.BROKEN_CARET,
          l = void 0 !== /()??/.exec("")[1],
          d = c || l || u;

      d && (s = function s(e) {
        var t,
            n,
            a,
            s,
            d = this,
            f = u && d.sticky,
            p = r.call(d),
            h = d.source,
            v = 0,
            b = e;
        return f && (p = p.replace("y", ""), -1 === p.indexOf("g") && (p += "g"), b = String(e).slice(d.lastIndex), d.lastIndex > 0 && (!d.multiline || d.multiline && "\n" !== e[d.lastIndex - 1]) && (h = "(?: " + h + ")", b = " " + b, v++), n = new RegExp("^(?:" + h + ")", p)), l && (n = new RegExp("^" + h + "$(?!\\s)", p)), c && (t = d.lastIndex), a = o.call(f ? n : d, b), f ? a ? (a.input = a.input.slice(v), a[0] = a[0].slice(v), a.index = d.lastIndex, d.lastIndex += a[0].length) : d.lastIndex = 0 : c && a && (d.lastIndex = d.global ? a.index + a[0].length : t), l && a && a.length > 1 && i.call(a[0], n, function () {
          for (s = 1; s < arguments.length - 2; s++) {
            void 0 === arguments[s] && (a[s] = void 0);
          }
        }), a;
      }), e.exports = s;
    },
    9349: function _(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return o;
      });
      n("ddb0");
      var r = n("22f3"),
          a = n("2fa3");

      var o = /*#__PURE__*/function () {
        function o(e, t, n) {
          _classCallCheck(this, o);

          this.theme = e, this.locale = t, this.map = {}, this.refresh(n, !0);
        }

        _createClass(o, [{
          key: "refresh",
          value: function refresh(e, t) {
            var n = this;
            var _o5 = {},
                i = [];
            var s = null;
            var c = [],
                u = t ? new Set() : new Set(Object.keys(this.map));
            return Object(a["b"])(e) && e.forEach(function (e, l) {
              if (!e || !e.dates) return;
              var d = e.key ? e.key.toString() : l.toString(),
                  f = e.order || 0,
                  p = Object(a["g"])(JSON.stringify(e));
              var h = n.map[d];
              !t && h && h.hashcode === p ? u.delete(d) : (h = new r["a"](_objectSpread({
                key: d,
                order: f,
                hashcode: p
              }, e), n.theme, n.locale), c.push(h)), h && h.pinPage && (s = h), _o5[d] = h, i.push(h);
            }), this.map = _o5, this.list = i, this.pinAttr = s, {
              adds: c,
              deletes: Array.from(u)
            };
          }
        }]);

        return o;
      }();
    },
    "93ed": function ed(e, t, n) {
      var r = n("4245");

      function a(e) {
        var t = r(this, e)["delete"](e);
        return this.size -= t ? 1 : 0, t;
      }

      e.exports = a;
    },
    9404: function _(e, t, n) {
      "use strict";

      n.d(t, "j", function () {
        return B;
      }), n.d(t, "m", function () {
        return Z;
      }), n.d(t, "e", function () {
        return q;
      }), n.d(t, "f", function () {
        return G;
      }), n.d(t, "v", function () {
        return K;
      });
      var r = n("6679"),
          a = n.n(r);
      n.d(t, "i", function () {
        return a.a;
      });
      var o = n("501e"),
          i = n.n(o);
      n.d(t, "l", function () {
        return i.a;
      });
      var s = n("e2a0"),
          c = n.n(s);
      n.d(t, "n", function () {
        return c.a;
      });
      var u = n("dcbe"),
          l = n.n(u);
      n.d(t, "h", function () {
        return l.a;
      });
      var d = n("9520"),
          f = n.n(d);
      n.d(t, "k", function () {
        return f.a;
      });
      var p = n("4cfe"),
          h = n.n(p);
      n.d(t, "o", function () {
        return h.a;
      });
      var v = n("6220"),
          b = n.n(v),
          m = n("f678"),
          g = n.n(m);
      n.d(t, "a", function () {
        return g.a;
      });
      var y = n("9b02"),
          w = n.n(y);
      n.d(t, "d", function () {
        return w.a;
      });
      var x = n("0f5c"),
          D = n.n(x);
      n.d(t, "u", function () {
        return D.a;
      });
      var j = n("9e86"),
          O = n.n(j);
      n.d(t, "r", function () {
        return O.a;
      });
      var k = n("f542"),
          M = n.n(k);
      n.d(t, "w", function () {
        return M.a;
      });
      var P = n("95ae"),
          S = n.n(P);
      n.d(t, "b", function () {
        return S.a;
      });
      var Y = n("3f84"),
          E = n.n(Y);
      n.d(t, "c", function () {
        return E.a;
      });

      var _ = n("2593"),
          T = n.n(_);

      n.d(t, "t", function () {
        return T.a;
      });
      var I = n("3eea"),
          C = n.n(I);
      n.d(t, "s", function () {
        return C.a;
      });
      var $ = n("3852"),
          A = n.n($),
          N = n("dd61"),
          F = n.n(N);
      n.d(t, "q", function () {
        return F.a;
      });
      var z = n("a59b"),
          L = n.n(z);
      n.d(t, "g", function () {
        return L.a;
      });
      var H = n("4416"),
          R = n.n(H);
      n.d(t, "p", function () {
        return R.a;
      });
      var W = n("3092"),
          V = n.n(W);

      var U = function U(e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
          B = function B(e) {
        return b()(e) && !isNaN(e.getTime());
      },
          Z = function Z(e) {
        return "Object" === U(e);
      },
          q = A.a,
          G = function G(e, t) {
        return V()(t, function (t) {
          return A()(e, t);
        });
      },
          K = V.a;
    },
    "94ca": function ca(e, t, n) {
      var r = n("d039"),
          a = /#|\.prototype\./,
          o = function o(e, t) {
        var n = s[i(e)];
        return n == u || n != c && ("function" == typeof t ? r(t) : !!t);
      },
          i = o.normalize = function (e) {
        return String(e).replace(a, ".").toLowerCase();
      },
          s = o.data = {},
          c = o.NATIVE = "N",
          u = o.POLYFILL = "P";

      e.exports = o;
    },
    "950a": function a(e, t, n) {
      var r = n("30c9");

      function a(e, t) {
        return function (n, a) {
          if (null == n) return n;
          if (!r(n)) return e(n, a);
          var o = n.length,
              i = t ? o : -1,
              s = Object(n);

          while (t ? i-- : ++i < o) {
            if (!1 === a(s[i], i, s)) break;
          }

          return n;
        };
      }

      e.exports = a;
    },
    9520: function _(e, t, n) {
      var r = n("3729"),
          a = n("1a8c"),
          o = "[object AsyncFunction]",
          i = "[object Function]",
          s = "[object GeneratorFunction]",
          c = "[object Proxy]";

      function u(e) {
        if (!a(e)) return !1;
        var t = r(e);
        return t == i || t == s || t == o || t == c;
      }

      e.exports = u;
    },
    "95ae": function ae(e, t, n) {
      var r = n("100e"),
          a = n("9638"),
          o = n("9aff"),
          i = n("9934"),
          s = Object.prototype,
          c = s.hasOwnProperty,
          u = r(function (e, t) {
        e = Object(e);
        var n = -1,
            r = t.length,
            u = r > 2 ? t[2] : void 0;
        u && o(t[0], t[1], u) && (r = 1);

        while (++n < r) {
          var l = t[n],
              d = i(l),
              f = -1,
              p = d.length;

          while (++f < p) {
            var h = d[f],
                v = e[h];
            (void 0 === v || a(v, s[h]) && !c.call(e, h)) && (e[h] = l[h]);
          }
        }

        return e;
      });
      e.exports = u;
    },
    9638: function _(e, t) {
      function n(e, t) {
        return e === t || e !== e && t !== t;
      }

      e.exports = n;
    },
    "966f": function f(e, t, n) {
      var r = n("7e64"),
          a = n("c05f"),
          o = 1,
          i = 2;

      function s(e, t, n, s) {
        var c = n.length,
            u = c,
            l = !s;
        if (null == e) return !u;
        e = Object(e);

        while (c--) {
          var d = n[c];
          if (l && d[2] ? d[1] !== e[d[0]] : !(d[0] in e)) return !1;
        }

        while (++c < u) {
          d = n[c];
          var f = d[0],
              p = e[f],
              h = d[1];

          if (l && d[2]) {
            if (void 0 === p && !(f in e)) return !1;
          } else {
            var v = new r();
            if (s) var b = s(p, h, f, e, t, v);
            if (!(void 0 === b ? a(h, p, o | i, s, v) : b)) return !1;
          }
        }

        return !0;
      }

      e.exports = s;
    },
    "96f3": function f3(e, t) {
      var n = Object.prototype,
          r = n.hasOwnProperty;

      function a(e, t) {
        return null != e && r.call(e, t);
      }

      e.exports = a;
    },
    "97d3": function d3(e, t, n) {
      var r = n("48a0"),
          a = n("30c9");

      function o(e, t) {
        var n = -1,
            o = a(e) ? Array(e.length) : [];
        return r(e, function (e, r, a) {
          o[++n] = t(e, r, a);
        }), o;
      }

      e.exports = o;
    },
    9934: function _(e, t, n) {
      var r = n("6fcd"),
          a = n("41c3"),
          o = n("30c9");

      function i(e) {
        return o(e) ? r(e, !0) : a(e);
      }

      e.exports = i;
    },
    "99cd": function cd(e, t) {
      function n(e) {
        return function (t, n, r) {
          var a = -1,
              o = Object(t),
              i = r(t),
              s = i.length;

          while (s--) {
            var c = i[e ? s : ++a];
            if (!1 === n(o[c], c, o)) break;
          }

          return t;
        };
      }

      e.exports = n;
    },
    "99d3": function d3(e, t, n) {
      (function (e) {
        var r = n("585a"),
            a = t && !t.nodeType && t,
            o = a && "object" == _typeof(e) && e && !e.nodeType && e,
            i = o && o.exports === a,
            s = i && r.process,
            c = function () {
          try {
            var e = o && o.require && o.require("util").types;

            return e || s && s.binding && s.binding("util");
          } catch (t) {}
        }();

        e.exports = c;
      }).call(this, n("62e4")(e));
    },
    "9aff": function aff(e, t, n) {
      var r = n("9638"),
          a = n("30c9"),
          o = n("c098"),
          i = n("1a8c");

      function s(e, t, n) {
        if (!i(n)) return !1;

        var s = _typeof(t);

        return !!("number" == s ? a(n) && o(t, n.length) : "string" == s && t in n) && r(n[t], e);
      }

      e.exports = s;
    },
    "9b02": function b02(e, t, n) {
      var r = n("656b");

      function a(e, t, n) {
        var a = null == e ? void 0 : r(e, t);
        return void 0 === a ? n : a;
      }

      e.exports = a;
    },
    "9bf2": function bf2(e, t, n) {
      var r = n("83ab"),
          a = n("0cfb"),
          o = n("825a"),
          i = n("c04e"),
          s = Object.defineProperty;
      t.f = r ? s : function (e, t, n) {
        if (o(e), t = i(t, !0), o(n), a) try {
          return s(e, t, n);
        } catch (r) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
        return "value" in n && (e[t] = n.value), e;
      };
    },
    "9e2e": function e2e(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-pane-container{width:100%;position:relative}.vc-pane-container.in-transition{overflow:hidden}.vc-pane-layout{display:grid}.vc-arrow{display:flex;justify-content:center;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;pointer-events:auto;color:var(--gray-600);border-width:2px;border-style:solid;border-radius:var(--rounded);border-color:transparent}.vc-arrow:hover{background:var(--gray-200)}.vc-arrow:focus{border-color:var(--gray-300)}.vc-arrow.is-disabled{opacity:.25;pointer-events:none;cursor:not-allowed}.vc-day-popover-container{color:var(--white);background-color:var(--gray-800);border:1px solid;border-color:var(--gray-700);border-radius:var(--rounded);font-size:var(--text-xs);font-weight:var(--font-medium);padding:4px 8px;box-shadow:var(--shadow)}.vc-day-popover-header{font-size:var(--text-xs);color:var(--gray-300);font-weight:var(--font-semibold);text-align:center}.vc-arrows-container{width:100%;position:absolute;top:0;display:flex;justify-content:space-between;padding:8px 10px;pointer-events:none}.vc-arrows-container.title-left{justify-content:flex-end}.vc-arrows-container.title-right{justify-content:flex-start}.vc-is-dark .vc-arrow{color:var(--white)}.vc-is-dark .vc-arrow:hover{background:var(--gray-800)}.vc-is-dark .vc-arrow:focus{border-color:var(--gray-700)}.vc-is-dark .vc-day-popover-container{color:var(--gray-800);background-color:var(--white);border-color:var(--gray-100)}.vc-is-dark .vc-day-popover-header{color:var(--gray-700)}", ""]), e.exports = t;
    },
    "9e69": function e69(e, t, n) {
      var r = n("2b3e"),
          a = r.Symbol;
      e.exports = a;
    },
    "9e83": function e83(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-nav-popover-container{color:var(--white);font-size:var(--text-sm);font-weight:var(--font-semibold);background-color:var(--gray-800);border:1px solid;border-color:var(--gray-700);border-radius:var(--rounded-lg);padding:4px;box-shadow:var(--shadow)}.vc-is-dark .vc-nav-popover-container{color:var(--gray-800);background-color:var(--white);border-color:var(--gray-100)}", ""]), e.exports = t;
    },
    "9e86": function e86(e, t, n) {
      var r = n("872a"),
          a = n("242e"),
          o = n("badf");

      function i(e, t) {
        var n = {};
        return t = o(t, 3), a(e, function (e, a, o) {
          r(n, a, t(e, a, o));
        }), n;
      }

      e.exports = i;
    },
    "9ed3": function ed3(e, t, n) {
      "use strict";

      var r = n("ae93").IteratorPrototype,
          a = n("7c73"),
          o = n("5c6c"),
          i = n("d44e"),
          s = n("3f8c"),
          c = function c() {
        return this;
      };

      e.exports = function (e, t, n) {
        var u = t + " Iterator";
        return e.prototype = a(r, {
          next: o(1, n)
        }), i(e, u, !1, !0), s[u] = c, e;
      };
    },
    "9f7f": function f7f(e, t, n) {
      "use strict";

      var r = n("d039");

      function a(e, t) {
        return RegExp(e, t);
      }

      t.UNSUPPORTED_Y = r(function () {
        var e = a("a", "y");
        return e.lastIndex = 2, null != e.exec("abcd");
      }), t.BROKEN_CARET = r(function () {
        var e = a("^r", "gy");
        return e.lastIndex = 2, null != e.exec("str");
      });
    },
    a029: function a029(e, t, n) {
      var r = n("087d"),
          a = n("2dcb"),
          o = n("32f4"),
          i = n("d327"),
          s = Object.getOwnPropertySymbols,
          c = s ? function (e) {
        var t = [];

        while (e) {
          r(t, o(e)), e = a(e);
        }

        return t;
      } : i;
      e.exports = c;
    },
    a2be: function a2be(e, t, n) {
      var r = n("d612"),
          a = n("4284"),
          o = n("c584"),
          i = 1,
          s = 2;

      function c(e, t, n, c, u, l) {
        var d = n & i,
            f = e.length,
            p = t.length;
        if (f != p && !(d && p > f)) return !1;
        var h = l.get(e),
            v = l.get(t);
        if (h && v) return h == t && v == e;
        var b = -1,
            m = !0,
            g = n & s ? new r() : void 0;
        l.set(e, t), l.set(t, e);

        while (++b < f) {
          var y = e[b],
              w = t[b];
          if (c) var x = d ? c(w, y, b, t, e, l) : c(y, w, b, e, t, l);

          if (void 0 !== x) {
            if (x) continue;
            m = !1;
            break;
          }

          if (g) {
            if (!a(t, function (e, t) {
              if (!o(g, t) && (y === e || u(y, e, n, c, l))) return g.push(t);
            })) {
              m = !1;
              break;
            }
          } else if (y !== w && !u(y, w, n, c, l)) {
            m = !1;
            break;
          }
        }

        return l["delete"](e), l["delete"](t), m;
      }

      e.exports = c;
    },
    a2db: function a2db(e, t, n) {
      var r = n("9e69"),
          a = r ? r.prototype : void 0,
          o = a ? a.valueOf : void 0;

      function i(e) {
        return o ? Object(o.call(e)) : {};
      }

      e.exports = i;
    },
    a3fd: function a3fd(e, t, n) {
      var r = n("7948");

      function a(e, t) {
        return r(t, function (t) {
          return [t, e[t]];
        });
      }

      e.exports = a;
    },
    a454: function a454(e, t, n) {
      var r = n("72f0"),
          a = n("3b4a"),
          o = n("cd9d"),
          i = a ? function (e, t) {
        return a(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: r(t),
          writable: !0
        });
      } : o;
      e.exports = i;
    },
    a524: function a524(e, t, n) {
      var r = n("4245");

      function a(e) {
        return r(this, e).has(e);
      }

      e.exports = a;
    },
    a59b: function a59b(e, t) {
      function n(e) {
        return e && e.length ? e[0] : void 0;
      }

      e.exports = n;
    },
    a691: function a691(e, t) {
      var n = Math.ceil,
          r = Math.floor;

      e.exports = function (e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
      };
    },
    a994: function a994(e, t, n) {
      var r = n("7d1f"),
          a = n("32f4"),
          o = n("ec69");

      function i(e) {
        return r(e, o, a);
      }

      e.exports = i;
    },
    ac1f: function ac1f(e, t, n) {
      "use strict";

      var r = n("23e7"),
          a = n("9263");
      r({
        target: "RegExp",
        proto: !0,
        forced: /./.exec !== a
      }, {
        exec: a
      });
    },
    ac41: function ac41(e, t) {
      function n(e) {
        var t = -1,
            n = Array(e.size);
        return e.forEach(function (e) {
          n[++t] = e;
        }), n;
      }

      e.exports = n;
    },
    ad6d: function ad6d(e, t, n) {
      "use strict";

      var r = n("825a");

      e.exports = function () {
        var e = r(this),
            t = "";
        return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
      };
    },
    ae93: function ae93(e, t, n) {
      "use strict";

      var r,
          a,
          o,
          i = n("e163"),
          s = n("9112"),
          c = n("5135"),
          u = n("b622"),
          l = n("c430"),
          d = u("iterator"),
          f = !1,
          p = function p() {
        return this;
      };

      [].keys && (o = [].keys(), "next" in o ? (a = i(i(o)), a !== Object.prototype && (r = a)) : f = !0), void 0 == r && (r = {}), l || c(r, d) || s(r, d, p), e.exports = {
        IteratorPrototype: r,
        BUGGY_SAFARI_ITERATORS: f
      };
    },
    b047: function b047(e, t) {
      function n(e) {
        return function (t) {
          return e(t);
        };
      }

      e.exports = n;
    },
    b1d2: function b1d2(e, t, n) {
      var r = n("3729"),
          a = n("1310"),
          o = "[object Date]";

      function i(e) {
        return a(e) && r(e) == o;
      }

      e.exports = i;
    },
    b1e5: function b1e5(e, t, n) {
      var r = n("a994"),
          a = 1,
          o = Object.prototype,
          i = o.hasOwnProperty;

      function s(e, t, n, o, s, c) {
        var u = n & a,
            l = r(e),
            d = l.length,
            f = r(t),
            p = f.length;
        if (d != p && !u) return !1;
        var h = d;

        while (h--) {
          var v = l[h];
          if (!(u ? v in t : i.call(t, v))) return !1;
        }

        var b = c.get(e),
            m = c.get(t);
        if (b && m) return b == t && m == e;
        var g = !0;
        c.set(e, t), c.set(t, e);
        var y = u;

        while (++h < d) {
          v = l[h];
          var w = e[v],
              x = t[v];
          if (o) var D = u ? o(x, w, v, t, e, c) : o(w, x, v, e, t, c);

          if (!(void 0 === D ? w === x || s(w, x, n, o, c) : D)) {
            g = !1;
            break;
          }

          y || (y = "constructor" == v);
        }

        if (g && !y) {
          var j = e.constructor,
              O = t.constructor;
          j == O || !("constructor" in e) || !("constructor" in t) || "function" == typeof j && j instanceof j && "function" == typeof O && O instanceof O || (g = !1);
        }

        return c["delete"](e), c["delete"](t), g;
      }

      e.exports = s;
    },
    b218: function b218(e, t) {
      var n = 9007199254740991;

      function r(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= n;
      }

      e.exports = r;
    },
    b4b0: function b4b0(e, t, n) {
      var r = n("1a8c"),
          a = n("ffd6"),
          o = NaN,
          i = /^\s+|\s+$/g,
          s = /^[-+]0x[0-9a-f]+$/i,
          c = /^0b[01]+$/i,
          u = /^0o[0-7]+$/i,
          l = parseInt;

      function d(e) {
        if ("number" == typeof e) return e;
        if (a(e)) return o;

        if (r(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = r(t) ? t + "" : t;
        }

        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(i, "");
        var n = c.test(e);
        return n || u.test(e) ? l(e.slice(2), n ? 2 : 8) : s.test(e) ? o : +e;
      }

      e.exports = d;
    },
    b4c0: function b4c0(e, t, n) {
      var r = n("cb5a");

      function a(e) {
        var t = this.__data__,
            n = r(t, e);
        return n < 0 ? void 0 : t[n][1];
      }

      e.exports = a;
    },
    b5a7: function b5a7(e, t, n) {
      var r = n("0b07"),
          a = n("2b3e"),
          o = r(a, "DataView");
      e.exports = o;
    },
    b622: function b622(e, t, n) {
      var r = n("da84"),
          a = n("5692"),
          o = n("5135"),
          i = n("90e3"),
          s = n("4930"),
          c = n("fdbf"),
          u = a("wks"),
          l = r.Symbol,
          d = c ? l : l && l.withoutSetter || i;

      e.exports = function (e) {
        return o(u, e) || (s && o(l, e) ? u[e] = l[e] : u[e] = d("Symbol." + e)), u[e];
      };
    },
    b760: function b760(e, t, n) {
      var r = n("872a"),
          a = n("9638");

      function o(e, t, n) {
        (void 0 !== n && !a(e[t], n) || void 0 === n && !(t in e)) && r(e, t, n);
      }

      e.exports = o;
    },
    b803: function b803(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-day-popover-row[data-v-4975d69e]{--day-content-transition-time:0.13s ease-in;display:flex;align-items:center;transition:all var(--day-content-transition-time)}.vc-day-popover-row[data-v-4975d69e]:not(:first-child){margin-top:3px}.vc-day-popover-row-indicator[data-v-4975d69e]{display:flex;justify-content:center;align-items:center;flex-grow:0;width:15px;margin-right:3px}.vc-day-popover-row-indicator span[data-v-4975d69e]{transition:all var(--day-content-transition-time)}.vc-day-popover-row-content[data-v-4975d69e]{display:flex;align-items:center;flex-wrap:none;flex-grow:1;width:-webkit-max-content;width:max-content}", ""]), e.exports = t;
    },
    badf: function badf(e, t, n) {
      var r = n("642a"),
          a = n("1838"),
          o = n("cd9d"),
          i = n("6747"),
          s = n("f9ce");

      function c(e) {
        return "function" == typeof e ? e : null == e ? o : "object" == _typeof(e) ? i(e) ? a(e[0], e[1]) : r(e) : s(e);
      }

      e.exports = c;
    },
    bbc0: function bbc0(e, t, n) {
      var r = n("6044"),
          a = "__lodash_hash_undefined__",
          o = Object.prototype,
          i = o.hasOwnProperty;

      function s(e) {
        var t = this.__data__;

        if (r) {
          var n = t[e];
          return n === a ? void 0 : n;
        }

        return i.call(t, e) ? t[e] : void 0;
      }

      e.exports = s;
    },
    bffb: function bffb(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, '.vc-popover-content-wrapper[data-v-05016e86]{--popover-horizontal-content-offset:8px;--popover-vertical-content-offset:10px;--popover-slide-translation:15px;--popover-transition-time:0.14s ease-in-out;--popover-caret-horizontal-offset:18px;--popover-caret-vertical-offset:8px;position:absolute;display:block;outline:none;z-index:10}.vc-popover-content-wrapper[data-v-05016e86]:not(.is-interactive){pointer-events:none}.vc-popover-content[data-v-05016e86]{position:relative;outline:none;z-index:10;box-shadow:var(--shadow-lg)}.vc-popover-content.direction-bottom[data-v-05016e86]{margin-top:var(--popover-vertical-content-offset)}.vc-popover-content.direction-top[data-v-05016e86]{margin-bottom:var(--popover-vertical-content-offset)}.vc-popover-content.direction-left[data-v-05016e86]{margin-right:var(--popover-horizontal-content-offset)}.vc-popover-content.direction-right[data-v-05016e86]{margin-left:var(--popover-horizontal-content-offset)}.vc-popover-caret[data-v-05016e86]{content:"";position:absolute;display:block;width:12px;height:12px;border-top:inherit;border-left:inherit;background-color:inherit;-webkit-user-select:none;user-select:none;z-index:-1}.vc-popover-caret.direction-bottom[data-v-05016e86]{top:0}.vc-popover-caret.direction-bottom.align-left[data-v-05016e86]{transform:translateY(-50%) rotate(45deg)}.vc-popover-caret.direction-bottom.align-center[data-v-05016e86]{transform:translateX(-50%) translateY(-50%) rotate(45deg)}.vc-popover-caret.direction-bottom.align-right[data-v-05016e86]{transform:translateY(-50%) rotate(45deg)}.vc-popover-caret.direction-top[data-v-05016e86]{top:100%}.vc-popover-caret.direction-top.align-left[data-v-05016e86]{transform:translateY(-50%) rotate(-135deg)}.vc-popover-caret.direction-top.align-center[data-v-05016e86]{transform:translateX(-50%) translateY(-50%) rotate(-135deg)}.vc-popover-caret.direction-top.align-right[data-v-05016e86]{transform:translateY(-50%) rotate(-135deg)}.vc-popover-caret.direction-left[data-v-05016e86]{left:100%}.vc-popover-caret.direction-left.align-top[data-v-05016e86]{transform:translateX(-50%) rotate(135deg)}.vc-popover-caret.direction-left.align-middle[data-v-05016e86]{transform:translateY(-50%) translateX(-50%) rotate(135deg)}.vc-popover-caret.direction-left.align-bottom[data-v-05016e86]{transform:translateX(-50%) rotate(135deg)}.vc-popover-caret.direction-right[data-v-05016e86]{left:0}.vc-popover-caret.direction-right.align-top[data-v-05016e86]{transform:translateX(-50%) rotate(-45deg)}.vc-popover-caret.direction-right.align-middle[data-v-05016e86]{transform:translateY(-50%) translateX(-50%) rotate(-45deg)}.vc-popover-caret.direction-right.align-bottom[data-v-05016e86]{transform:translateX(-50%) rotate(-45deg)}.vc-popover-caret.align-left[data-v-05016e86]{left:var(--popover-caret-horizontal-offset)}.vc-popover-caret.align-center[data-v-05016e86]{left:50%}.vc-popover-caret.align-right[data-v-05016e86]{right:var(--popover-caret-horizontal-offset)}.vc-popover-caret.align-top[data-v-05016e86]{top:var(--popover-caret-vertical-offset)}.vc-popover-caret.align-middle[data-v-05016e86]{top:50%}.vc-popover-caret.align-bottom[data-v-05016e86]{bottom:var(--popover-caret-vertical-offset)}.fade-enter-active[data-v-05016e86],.fade-leave-active[data-v-05016e86],.slide-fade-enter-active[data-v-05016e86],.slide-fade-leave-active[data-v-05016e86]{transition:all var(--popover-transition-time);pointer-events:none}.fade-enter[data-v-05016e86],.fade-leave-to[data-v-05016e86],.slide-fade-enter[data-v-05016e86],.slide-fade-leave-to[data-v-05016e86]{opacity:0}.slide-fade-enter.direction-bottom[data-v-05016e86],.slide-fade-leave-to.direction-bottom[data-v-05016e86]{transform:translateY(calc(var(--popover-slide-translation)*-1))}.slide-fade-enter.direction-top[data-v-05016e86],.slide-fade-leave-to.direction-top[data-v-05016e86]{transform:translateY(var(--popover-slide-translation))}.slide-fade-enter.direction-left[data-v-05016e86],.slide-fade-leave-to.direction-left[data-v-05016e86]{transform:translateX(var(--popover-slide-translation))}.slide-fade-enter.direction-right[data-v-05016e86],.slide-fade-leave-to.direction-right[data-v-05016e86]{transform:translateX(calc(var(--popover-slide-translation)*-1))}', ""]), e.exports = t;
    },
    c04e: function c04e(e, t, n) {
      var r = n("861d");

      e.exports = function (e, t) {
        if (!r(e)) return e;
        var n, a;
        if (t && "function" == typeof (n = e.toString) && !r(a = n.call(e))) return a;
        if ("function" == typeof (n = e.valueOf) && !r(a = n.call(e))) return a;
        if (!t && "function" == typeof (n = e.toString) && !r(a = n.call(e))) return a;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    c05f: function c05f(e, t, n) {
      var r = n("7b97"),
          a = n("1310");

      function o(e, t, n, i, s) {
        return e === t || (null == e || null == t || !a(e) && !a(t) ? e !== e && t !== t : r(e, t, n, i, o, s));
      }

      e.exports = o;
    },
    c098: function c098(e, t) {
      var n = 9007199254740991,
          r = /^(?:0|[1-9]\d*)$/;

      function a(e, t) {
        var a = _typeof(e);

        return t = null == t ? n : t, !!t && ("number" == a || "symbol" != a && r.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }

      e.exports = a;
    },
    c1c9: function c1c9(e, t, n) {
      var r = n("a454"),
          a = n("f3c1"),
          o = a(r);
      e.exports = o;
    },
    c2b6: function c2b6(e, t, n) {
      var r = n("f8af"),
          a = n("5d89"),
          o = n("6f6c"),
          i = n("a2db"),
          s = n("c8fe"),
          c = "[object Boolean]",
          u = "[object Date]",
          l = "[object Map]",
          d = "[object Number]",
          f = "[object RegExp]",
          p = "[object Set]",
          h = "[object String]",
          v = "[object Symbol]",
          b = "[object ArrayBuffer]",
          m = "[object DataView]",
          g = "[object Float32Array]",
          y = "[object Float64Array]",
          w = "[object Int8Array]",
          x = "[object Int16Array]",
          D = "[object Int32Array]",
          j = "[object Uint8Array]",
          O = "[object Uint8ClampedArray]",
          k = "[object Uint16Array]",
          M = "[object Uint32Array]";

      function P(e, t, n) {
        var P = e.constructor;

        switch (t) {
          case b:
            return r(e);

          case c:
          case u:
            return new P(+e);

          case m:
            return a(e, n);

          case g:
          case y:
          case w:
          case x:
          case D:
          case j:
          case O:
          case k:
          case M:
            return s(e, n);

          case l:
            return new P();

          case d:
          case h:
            return new P(e);

          case f:
            return o(e);

          case p:
            return new P();

          case v:
            return i(e);
        }
      }

      e.exports = P;
    },
    c3fc: function c3fc(e, t, n) {
      var r = n("42a2"),
          a = n("1310"),
          o = "[object Set]";

      function i(e) {
        return a(e) && r(e) == o;
      }

      e.exports = i;
    },
    c430: function c430(e, t) {
      e.exports = !1;
    },
    c584: function c584(e, t) {
      function n(e, t) {
        return e.has(t);
      }

      e.exports = n;
    },
    c6b6: function c6b6(e, t) {
      var n = {}.toString;

      e.exports = function (e) {
        return n.call(e).slice(8, -1);
      };
    },
    c6cd: function c6cd(e, t, n) {
      var r = n("da84"),
          a = n("ce4e"),
          o = "__core-js_shared__",
          i = r[o] || a(o, {});
      e.exports = i;
    },
    c6cf: function c6cf(e, t, n) {
      var r = n("4d8c"),
          a = n("2286"),
          o = n("c1c9");

      function i(e) {
        return o(a(e, void 0, r), e + "");
      }

      e.exports = i;
    },
    c869: function c869(e, t, n) {
      var r = n("0b07"),
          a = n("2b3e"),
          o = r(a, "Set");
      e.exports = o;
    },
    c87c: function c87c(e, t) {
      var n = Object.prototype,
          r = n.hasOwnProperty;

      function a(e) {
        var t = e.length,
            n = new e.constructor(t);
        return t && "string" == typeof e[0] && r.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }

      e.exports = a;
    },
    c8ba: function c8ba(e, t) {
      var n;

      n = function () {
        return this;
      }();

      try {
        n = n || new Function("return this")();
      } catch (r) {
        "object" === (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
      }

      e.exports = n;
    },
    c8fe: function c8fe(e, t, n) {
      var r = n("f8af");

      function a(e, t) {
        var n = t ? r(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }

      e.exports = a;
    },
    ca84: function ca84(e, t, n) {
      var r = n("5135"),
          a = n("fc6a"),
          o = n("4d64").indexOf,
          i = n("d012");

      e.exports = function (e, t) {
        var n,
            s = a(e),
            c = 0,
            u = [];

        for (n in s) {
          !r(i, n) && r(s, n) && u.push(n);
        }

        while (t.length > c) {
          r(s, n = t[c++]) && (~o(u, n) || u.push(n));
        }

        return u;
      };
    },
    cb5a: function cb5a(e, t, n) {
      var r = n("9638");

      function a(e, t) {
        var n = e.length;

        while (n--) {
          if (r(e[n][0], t)) return n;
        }

        return -1;
      }

      e.exports = a;
    },
    cc12: function cc12(e, t, n) {
      var r = n("da84"),
          a = n("861d"),
          o = r.document,
          i = a(o) && a(o.createElement);

      e.exports = function (e) {
        return i ? o.createElement(e) : {};
      };
    },
    cc2e: function cc2e(e, t, n) {
      "use strict";

      var r = n("8dad"),
          a = n.n(r);
      a.a;
    },
    cc45: function cc45(e, t, n) {
      var r = n("1a2d"),
          a = n("b047"),
          o = n("99d3"),
          i = o && o.isMap,
          s = i ? a(i) : r;
      e.exports = s;
    },
    cd9d: function cd9d(e, t) {
      function n(e) {
        return e;
      }

      e.exports = n;
    },
    ce4e: function ce4e(e, t, n) {
      var r = n("da84"),
          a = n("9112");

      e.exports = function (e, t) {
        try {
          a(r, e, t);
        } catch (n) {
          r[e] = t;
        }

        return t;
      };
    },
    ce86: function ce86(e, t, n) {
      var r = n("9e69"),
          a = n("7948"),
          o = n("6747"),
          i = n("ffd6"),
          s = 1 / 0,
          c = r ? r.prototype : void 0,
          u = c ? c.toString : void 0;

      function l(e) {
        if ("string" == typeof e) return e;
        if (o(e)) return a(e, l) + "";
        if (i(e)) return u ? u.call(e) : "";
        var t = e + "";
        return "0" == t && 1 / e == -s ? "-0" : t;
      }

      e.exports = l;
    },
    cebd: function cebd(e, t) {
      function n(e) {
        var t = -1,
            n = Array(e.size);
        return e.forEach(function (e) {
          n[++t] = [e, e];
        }), n;
      }

      e.exports = n;
    },
    cfe5: function cfe5(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return c;
      });
      var r = n("f7f1"),
          a = n("2fa3"),
          o = n("9404"),
          i = n("29ae");
      var s = 864e5;

      var c = /*#__PURE__*/function () {
        function c(e) {
          var _ref43 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref43$order = _ref43.order,
              t = _ref43$order === void 0 ? 0 : _ref43$order,
              n = _ref43.locale,
              s = _ref43.isFullDay;

          _classCallCheck(this, c);

          if (this.isDateInfo = !0, this.order = t, this.locale = n instanceof i["b"] ? n : new i["b"](n), this.firstDayOfWeek = this.locale.firstDayOfWeek, !Object(o["m"])(e)) {
            var _t13 = this.locale.normalizeDate(e);

            e = s ? {
              start: _t13,
              end: _t13
            } : {
              startOn: _t13,
              endOn: _t13
            };
          }

          var u = null,
              l = null;

          if (e.start ? u = this.locale.normalizeDate(e.start, _objectSpread(_objectSpread({}, this.opts), {}, {
            time: "00:00:00"
          })) : e.startOn && (u = this.locale.normalizeDate(e.startOn, this.opts)), e.end ? l = this.locale.normalizeDate(e.end, _objectSpread(_objectSpread({}, this.opts), {}, {
            time: "23:59:59"
          })) : e.endOn && (l = this.locale.normalizeDate(e.endOn, this.opts)), u && l && u > l) {
            var _e18 = u;
            u = l, l = _e18;
          } else u && e.span >= 1 && (l = Object(r["a"])(u, e.span - 1));

          this.start = u, this.startTime = u ? u.getTime() : NaN, this.end = l, this.endTime = l ? l.getTime() : NaN, this.isDate = this.startTime && this.startTime === this.endTime, this.isRange = !this.isDate;
          var d = Object(a["i"])(e, {}, c.patternProps);

          if (d.assigned && (this.on = {
            and: d.target
          }), e.on) {
            var _t14 = (Object(o["h"])(e.on) ? e.on : [e.on]).map(function (e) {
              if (Object(o["k"])(e)) return e;
              var t = Object(a["i"])(e, {}, c.patternProps);
              return t.assigned ? t.target : null;
            }).filter(function (e) {
              return e;
            });

            _t14.length && (this.on = _objectSpread(_objectSpread({}, this.on), {}, {
              or: _t14
            }));
          }

          this.isComplex = !!this.on;
        }

        _createClass(c, [{
          key: "opts",
          get: function get() {
            return {
              order: this.order,
              locale: this.locale
            };
          }
        }, {
          key: "toDateInfo",
          value: function toDateInfo(e) {
            return e.isDateInfo ? e : new c(e, this.opts);
          }
        }, {
          key: "startOfWeek",
          value: function startOfWeek(e) {
            var t = e.getDay() + 1,
                n = t >= this.firstDayOfWeek ? this.firstDayOfWeek - t : -(7 - (this.firstDayOfWeek - t));
            return Object(r["a"])(e, n);
          }
        }, {
          key: "diffInDays",
          value: function diffInDays(e, t) {
            return Math.round((t - e) / s);
          }
        }, {
          key: "diffInWeeks",
          value: function diffInWeeks(e, t) {
            return this.diffInDays(this.startOfWeek(e), this.startOfWeek(t));
          }
        }, {
          key: "diffInYears",
          value: function diffInYears(e, t) {
            return t.getUTCFullYear() - e.getUTCFullYear();
          }
        }, {
          key: "diffInMonths",
          value: function diffInMonths(e, t) {
            return 12 * this.diffInYears(e, t) + (t.getMonth() - e.getMonth());
          }
        }, {
          key: "iterateDatesInRange",
          value: function iterateDatesInRange(_ref44, n) {
            var e = _ref44.start,
                t = _ref44.end;
            if (!e || !t || !Object(o["k"])(n)) return null;
            e = this.locale.normalizeDate(e, _objectSpread(_objectSpread({}, this.opts), {}, {
              time: "00:00:00"
            }));
            var a = {
              i: 0,
              date: e,
              day: this.locale.getDateParts(e),
              finished: !1
            };
            var i = null;

            for (; !a.finished && a.date <= t; a.i++) {
              i = n(a), a.date = Object(r["a"])(a.date, 1), a.day = this.locale.getDateParts(a.date);
            }

            return i;
          }
        }, {
          key: "shallowIntersectingRange",
          value: function shallowIntersectingRange(e) {
            return this.rangeShallowIntersectingRange(this, this.toDateInfo(e));
          }
        }, {
          key: "rangeShallowIntersectingRange",
          value: function rangeShallowIntersectingRange(e, t) {
            if (!this.dateShallowIntersectsDate(e, t)) return null;
            var n = e.toRange(),
                r = t.toRange();
            var a = null,
                o = null;
            return n.start ? a = r.start ? n.start > r.start ? n.start : r.start : n.start : r.start && (a = r.start), n.end ? o = r.end ? n.end < r.end ? n.end : r.end : n.end : r.end && (o = r.end), {
              start: a,
              end: o
            };
          }
        }, {
          key: "intersectsDate",
          value: function intersectsDate(e) {
            var t = this;
            var n = this.toDateInfo(e);
            if (!this.shallowIntersectsDate(n)) return null;
            if (!this.on) return this;
            var r = this.rangeShallowIntersectingRange(this, n);
            var a = !1;
            return this.iterateDatesInRange(r, function (e) {
              t.matchesDay(e.day) && (a = a || n.matchesDay(e.day), e.finished = a);
            }), a;
          }
        }, {
          key: "shallowIntersectsDate",
          value: function shallowIntersectsDate(e) {
            return this.dateShallowIntersectsDate(this, this.toDateInfo(e));
          }
        }, {
          key: "dateShallowIntersectsDate",
          value: function dateShallowIntersectsDate(e, t) {
            return e.isDate ? t.isDate ? e.startTime === t.startTime : this.dateShallowIncludesDate(t, e) : t.isDate ? this.dateShallowIncludesDate(e, t) : !(e.start && t.end && e.start > t.end) && !(e.end && t.start && e.end < t.start);
          }
        }, {
          key: "includesDate",
          value: function includesDate(e) {
            var t = this;
            var n = this.toDateInfo(e);
            if (!this.shallowIncludesDate(n)) return !1;
            if (!this.on) return !0;
            var r = this.rangeShallowIntersectingRange(this, n);
            var a = !0;
            return this.iterateDatesInRange(r, function (e) {
              t.matchesDay(e.day) && (a = a && n.matchesDay(e.day), e.finished = !a);
            }), a;
          }
        }, {
          key: "shallowIncludesDate",
          value: function shallowIncludesDate(e) {
            return this.dateShallowIncludesDate(this, e.isDate ? e : new c(e, this.opts));
          }
        }, {
          key: "dateShallowIncludesDate",
          value: function dateShallowIncludesDate(e, t) {
            return e.isDate ? t.isDate ? e.startTime === t.startTime : !(!t.startTime || !t.endTime) && e.startTime === t.startTime && e.startTime === t.endTime : t.isDate ? !(e.start && t.start < e.start) && !(e.end && t.start > e.end) : !(e.start && (!t.start || t.start < e.start)) && !(e.end && (!t.end || t.end > e.end));
          }
        }, {
          key: "intersectsDay",
          value: function intersectsDay(e) {
            return this.shallowIntersectsDate(e.range) && this.matchesDay(e) ? this : null;
          }
        }, {
          key: "matchesDay",
          value: function matchesDay(e) {
            var t = this;
            return !this.on || !(this.on.and && !c.testConfig(this.on.and, e, this)) && !(this.on.or && !this.on.or.some(function (n) {
              return c.testConfig(n, e, t);
            }));
          }
        }, {
          key: "toRange",
          value: function toRange() {
            return new c({
              start: this.start,
              end: this.end
            }, this.opts);
          }
        }, {
          key: "compare",
          value: function compare(e) {
            if (this.order !== e.order) return this.order - e.order;
            if (this.isDate !== e.isDate) return this.isDate ? 1 : -1;
            if (this.isDate) return 0;
            var t = this.start - e.start;
            return 0 !== t ? t : this.end - e.end;
          }
        }], [{
          key: "patterns",
          get: function get() {
            return {
              dailyInterval: {
                test: function test(e, t, n) {
                  return n.diffInDays(n.start || new Date(), e.date) % t === 0;
                }
              },
              weeklyInterval: {
                test: function test(e, t, n) {
                  return n.diffInWeeks(n.start || new Date(), e.date) % t === 0;
                }
              },
              monthlyInterval: {
                test: function test(e, t, n) {
                  return n.diffInMonths(n.start || new Date(), e.date) % t === 0;
                }
              },
              yearlyInterval: {
                test: function test() {
                  return function (e, t, n) {
                    return n.diffInYears(n.start || new Date(), e.date) % t === 0;
                  };
                }
              },
              days: {
                validate: function validate(e) {
                  return Object(o["h"])(e) ? e : [parseInt(e, 10)];
                },
                test: function test(e, t) {
                  return t.includes(e.day) || t.includes(-e.dayFromEnd);
                }
              },
              weekdays: {
                validate: function validate(e) {
                  return Object(o["h"])(e) ? e : [parseInt(e, 10)];
                },
                test: function test(e, t) {
                  return t.includes(e.weekday);
                }
              },
              ordinalWeekdays: {
                validate: function validate(e) {
                  return Object.keys(e).reduce(function (t, n) {
                    var r = e[n];
                    return r ? (t[n] = Object(o["h"])(r) ? r : [parseInt(r, 10)], t) : t;
                  }, {});
                },
                test: function test(e, t) {
                  return Object.keys(t).map(function (e) {
                    return parseInt(e, 10);
                  }).find(function (n) {
                    return t[n].includes(e.weekday) && (n === e.weekdayOrdinal || n === -e.weekdayOrdinalFromEnd);
                  });
                }
              },
              weekends: {
                validate: function validate(e) {
                  return e;
                },
                test: function test(e) {
                  return 1 === e.weekday || 7 === e.weekday;
                }
              },
              workweek: {
                validate: function validate(e) {
                  return e;
                },
                test: function test(e) {
                  return e.weekday >= 2 && e.weekday <= 6;
                }
              },
              weeks: {
                validate: function validate(e) {
                  return Object(o["h"])(e) ? e : [parseInt(e, 10)];
                },
                test: function test(e, t) {
                  return t.includes(e.week) || t.includes(-e.weekFromEnd);
                }
              },
              months: {
                validate: function validate(e) {
                  return Object(o["h"])(e) ? e : [parseInt(e, 10)];
                },
                test: function test(e, t) {
                  return t.includes(e.month);
                }
              },
              years: {
                validate: function validate(e) {
                  return Object(o["h"])(e) ? e : [parseInt(e, 10)];
                },
                test: function test(e, t) {
                  return t.includes(e.year);
                }
              }
            };
          }
        }, {
          key: "patternProps",
          get: function get() {
            return Object.keys(c.patterns).map(function (e) {
              return {
                name: e,
                validate: c.patterns[e].validate
              };
            });
          }
        }, {
          key: "testConfig",
          value: function testConfig(e, t, n) {
            return Object(o["k"])(e) ? e(t) : Object(o["m"])(e) ? Object.keys(e).every(function (r) {
              return c.patterns[r].test(t, e[r], n);
            }) : null;
          }
        }]);

        return c;
      }();
    },
    d012: function d012(e, t) {
      e.exports = {};
    },
    d02c: function d02c(e, t, n) {
      var r = n("5e2e"),
          a = n("79bc"),
          o = n("7b83"),
          i = 200;

      function s(e, t) {
        var n = this.__data__;

        if (n instanceof r) {
          var s = n.__data__;
          if (!a || s.length < i - 1) return s.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new o(s);
        }

        return n.set(e, t), this.size = n.size, this;
      }

      e.exports = s;
    },
    d039: function d039(e, t) {
      e.exports = function (e) {
        try {
          return !!e();
        } catch (t) {
          return !0;
        }
      };
    },
    d066: function d066(e, t, n) {
      var r = n("428f"),
          a = n("da84"),
          o = function o(e) {
        return "function" == typeof e ? e : void 0;
      };

      e.exports = function (e, t) {
        return arguments.length < 2 ? o(r[e]) || o(a[e]) : r[e] && r[e][t] || a[e] && a[e][t];
      };
    },
    d1e7: function d1e7(e, t, n) {
      "use strict";

      var r = {}.propertyIsEnumerable,
          a = Object.getOwnPropertyDescriptor,
          o = a && !r.call({
        1: 2
      }, 1);
      t.f = o ? function (e) {
        var t = a(this, e);
        return !!t && t.enumerable;
      } : r;
    },
    d2bb: function d2bb(e, t, n) {
      var r = n("825a"),
          a = n("3bbe");
      e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
        var e,
            t = !1,
            n = {};

        try {
          e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, e.call(n, []), t = n instanceof Array;
        } catch (o) {}

        return function (n, o) {
          return r(n), a(o), t ? e.call(n, o) : n.__proto__ = o, n;
        };
      }() : void 0);
    },
    d2e1: function d2e1(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-time-picker[data-v-ee473b46]{display:flex;align-items:center;padding:8px}.vc-time-picker.vc-invalid[data-v-ee473b46]{pointer-events:none;opacity:.5}.vc-time-picker.vc-bordered[data-v-ee473b46]{border-top:1px solid var(--gray-400)}.vc-date-time[data-v-ee473b46]{margin-left:8px}.vc-disabled[data-v-ee473b46]{pointer-events:none;opacity:.5}.vc-time-icon[data-v-ee473b46]{width:16px;height:16px;color:var(--gray-600)}.vc-date[data-v-ee473b46]{display:flex;align-items:center;font-size:var(--text-sm);font-weight:var(--font-semibold);text-transform:uppercase;padding:0 0 4px 4px;margin-top:-4px}.vc-date .vc-weekday[data-v-ee473b46]{color:var(--gray-700);letter-spacing:var(--tracking-wide)}.vc-date .vc-month[data-v-ee473b46]{color:var(--accent-600);margin-left:8px}.vc-date .vc-day[data-v-ee473b46]{color:var(--accent-600);margin-left:4px}.vc-date .vc-year[data-v-ee473b46]{color:var(--gray-500);margin-left:8px}.vc-am-pm[data-v-ee473b46],.vc-time[data-v-ee473b46]{display:flex;align-items:center}.vc-am-pm[data-v-ee473b46]{background:var(--gray-200);margin-left:8px;padding:4px;border-radius:var(--rounded);height:30px}.vc-am-pm button[data-v-ee473b46]{color:var(--gray-900);font-size:var(--text-sm);font-weight:var(--font-medium);padding:0 4px;background:transparent;border:2px solid transparent;border-radius:var(--rounded);line-height:var(--leading-snug)}.vc-am-pm button[data-v-ee473b46]:hover{color:var(--gray-600)}.vc-am-pm button[data-v-ee473b46]:focus{border-color:var(--accent-400)}.vc-am-pm button.active[data-v-ee473b46]{background:var(--accent-600);color:var(--white)}.vc-am-pm button.active[data-v-ee473b46]:hover{background:var(--accent-500)}.vc-am-pm button.active[data-v-ee473b46]:focus{border-color:var(--accent-400)}.vc-is-dark .vc-time-picker[data-v-ee473b46]{border-color:var(--gray-700)}.vc-is-dark .vc-time-icon[data-v-ee473b46],.vc-is-dark .vc-weekday[data-v-ee473b46]{color:var(--gray-400)}.vc-is-dark .vc-day[data-v-ee473b46],.vc-is-dark .vc-month[data-v-ee473b46]{color:var(--accent-400)}.vc-is-dark .vc-year[data-v-ee473b46]{color:var(--gray-500)}.vc-is-dark .vc-am-pm[data-v-ee473b46]{background:var(--gray-700)}.vc-is-dark .vc-am-pm[data-v-ee473b46]:focus{border-color:var(--accent-500)}.vc-is-dark .vc-am-pm button[data-v-ee473b46]{color:var(--gray-100)}.vc-is-dark .vc-am-pm button[data-v-ee473b46]:hover{color:var(--gray-400)}.vc-is-dark .vc-am-pm button[data-v-ee473b46]:focus{border-color:var(--accent-500)}.vc-is-dark .vc-am-pm button.active[data-v-ee473b46]{background:var(--accent-500);color:var(--white)}.vc-is-dark .vc-am-pm button.active[data-v-ee473b46]:hover{background:var(--accent-600)}.vc-is-dark .vc-am-pm button.active[data-v-ee473b46]:focus{border-color:var(--accent-500)}", ""]), e.exports = t;
    },
    d327: function d327(e, t) {
      function n() {
        return [];
      }

      e.exports = n;
    },
    d370: function d370(e, t, n) {
      var r = n("253c"),
          a = n("1310"),
          o = Object.prototype,
          i = o.hasOwnProperty,
          s = o.propertyIsEnumerable,
          c = r(function () {
        return arguments;
      }()) ? r : function (e) {
        return a(e) && i.call(e, "callee") && !s.call(e, "callee");
      };
      e.exports = c;
    },
    d44e: function d44e(e, t, n) {
      var r = n("9bf2").f,
          a = n("5135"),
          o = n("b622"),
          i = o("toStringTag");

      e.exports = function (e, t, n) {
        e && !a(e = n ? e : e.prototype, i) && r(e, i, {
          configurable: !0,
          value: t
        });
      };
    },
    d458: function d458(e, t, n) {
      "use strict";

      var r = n("08de"),
          a = n.n(r);
      a.a;
    },
    d483: function d483(e, t, n) {
      var r = n("bffb");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("e3b25692", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    d612: function d612(e, t, n) {
      var r = n("7b83"),
          a = n("7ed2"),
          o = n("dc0f");

      function i(e) {
        var t = -1,
            n = null == e ? 0 : e.length;
        this.__data__ = new r();

        while (++t < n) {
          this.add(e[t]);
        }
      }

      i.prototype.add = i.prototype.push = a, i.prototype.has = o, e.exports = i;
    },
    d784: function d784(e, t, n) {
      "use strict";

      n("ac1f");

      var r = n("6eeb"),
          a = n("d039"),
          o = n("b622"),
          i = n("9263"),
          s = n("9112"),
          c = o("species"),
          u = !a(function () {
        var e = /./;
        return e.exec = function () {
          var e = [];
          return e.groups = {
            a: "7"
          }, e;
        }, "7" !== "".replace(e, "$<a>");
      }),
          l = function () {
        return "$0" === "a".replace(/./, "$0");
      }(),
          d = o("replace"),
          f = function () {
        return !!/./[d] && "" === /./[d]("a", "$0");
      }(),
          p = !a(function () {
        var e = /(?:)/,
            t = e.exec;

        e.exec = function () {
          return t.apply(this, arguments);
        };

        var n = "ab".split(e);
        return 2 !== n.length || "a" !== n[0] || "b" !== n[1];
      });

      e.exports = function (e, t, n, d) {
        var h = o(e),
            v = !a(function () {
          var t = {};
          return t[h] = function () {
            return 7;
          }, 7 != ""[e](t);
        }),
            b = v && !a(function () {
          var t = !1,
              n = /a/;
          return "split" === e && (n = {}, n.constructor = {}, n.constructor[c] = function () {
            return n;
          }, n.flags = "", n[h] = /./[h]), n.exec = function () {
            return t = !0, null;
          }, n[h](""), !t;
        });

        if (!v || !b || "replace" === e && (!u || !l || f) || "split" === e && !p) {
          var m = /./[h],
              g = n(h, ""[e], function (e, t, n, r, a) {
            return t.exec === i ? v && !a ? {
              done: !0,
              value: m.call(t, n, r)
            } : {
              done: !0,
              value: e.call(n, t, r)
            } : {
              done: !1
            };
          }, {
            REPLACE_KEEPS_$0: l,
            REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: f
          }),
              y = g[0],
              w = g[1];
          r(String.prototype, e, y), r(RegExp.prototype, h, 2 == t ? function (e, t) {
            return w.call(e, this, t);
          } : function (e) {
            return w.call(e, this);
          });
        }

        d && s(RegExp.prototype[h], "sham", !0);
      };
    },
    d7ee: function d7ee(e, t, n) {
      var r = n("c3fc"),
          a = n("b047"),
          o = n("99d3"),
          i = o && o.isSet,
          s = i ? a(i) : r;
      e.exports = s;
    },
    d99e: function d99e(e, t, n) {
      "use strict";

      var r = n("d483"),
          a = n.n(r);
      a.a;
    },
    da03: function da03(e, t, n) {
      var r = n("2b3e"),
          a = r["__core-js_shared__"];
      e.exports = a;
    },
    da84: function da84(e, t, n) {
      (function (t) {
        var n = function n(e) {
          return e && e.Math == Math && e;
        };

        e.exports = n("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) && globalThis) || n("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window) || n("object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self) || n("object" == _typeof(t) && t) || Function("return this")();
      }).call(this, n("c8ba"));
    },
    dc0f: function dc0f(e, t) {
      function n(e) {
        return this.__data__.has(e);
      }

      e.exports = n;
    },
    dc57: function dc57(e, t) {
      var n = Function.prototype,
          r = n.toString;

      function a(e) {
        if (null != e) {
          try {
            return r.call(e);
          } catch (t) {}

          try {
            return e + "";
          } catch (t) {}
        }

        return "";
      }

      e.exports = a;
    },
    dc8c: function dc8c(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-container{--white:#fff;--black:#000;--gray-100:#f7fafc;--gray-200:#edf2f7;--gray-300:#e2e8f0;--gray-400:#cbd5e0;--gray-500:#a0aec0;--gray-600:#718096;--gray-700:#4a5568;--gray-800:#2d3748;--gray-900:#1a202c;--red-100:#fff5f5;--red-200:#fed7d7;--red-300:#feb2b2;--red-400:#fc8181;--red-500:#f56565;--red-600:#e53e3e;--red-700:#c53030;--red-800:#9b2c2c;--red-900:#742a2a;--orange-100:#fffaf0;--orange-200:#feebc8;--orange-300:#fbd38d;--orange-400:#f6ad55;--orange-500:#ed8936;--orange-600:#dd6b20;--orange-700:#c05621;--orange-800:#9c4221;--orange-900:#7b341e;--yellow-100:ivory;--yellow-200:#fefcbf;--yellow-300:#faf089;--yellow-400:#f6e05e;--yellow-500:#ecc94b;--yellow-600:#d69e2e;--yellow-700:#b7791f;--yellow-800:#975a16;--yellow-900:#744210;--green-100:#f0fff4;--green-200:#c6f6d5;--green-300:#9ae6b4;--green-400:#68d391;--green-500:#48bb78;--green-600:#38a169;--green-700:#2f855a;--green-800:#276749;--green-900:#22543d;--teal-100:#e6fffa;--teal-200:#b2f5ea;--teal-300:#81e6d9;--teal-400:#4fd1c5;--teal-500:#38b2ac;--teal-600:#319795;--teal-700:#2c7a7b;--teal-800:#285e61;--teal-900:#234e52;--blue-100:#ebf8ff;--blue-200:#bee3f8;--blue-300:#90cdf4;--blue-400:#63b3ed;--blue-500:#4299e1;--blue-600:#3182ce;--blue-700:#2b6cb0;--blue-800:#2c5282;--blue-900:#2a4365;--indigo-100:#ebf4ff;--indigo-200:#c3dafe;--indigo-300:#a3bffa;--indigo-400:#7f9cf5;--indigo-500:#667eea;--indigo-600:#5a67d8;--indigo-700:#4c51bf;--indigo-800:#434190;--indigo-900:#3c366b;--purple-100:#faf5ff;--purple-200:#e9d8fd;--purple-300:#d6bcfa;--purple-400:#b794f4;--purple-500:#9f7aea;--purple-600:#805ad5;--purple-700:#6b46c1;--purple-800:#553c9a;--purple-900:#44337a;--pink-100:#fff5f7;--pink-200:#fed7e2;--pink-300:#fbb6ce;--pink-400:#f687b3;--pink-500:#ed64a6;--pink-600:#d53f8c;--pink-700:#b83280;--pink-800:#97266d;--pink-900:#702459}.vc-container.vc-red{--accent-100:var(--red-100);--accent-200:var(--red-200);--accent-300:var(--red-300);--accent-400:var(--red-400);--accent-500:var(--red-500);--accent-600:var(--red-600);--accent-700:var(--red-700);--accent-800:var(--red-800);--accent-900:var(--red-900)}.vc-container.vc-orange{--accent-100:var(--orange-100);--accent-200:var(--orange-200);--accent-300:var(--orange-300);--accent-400:var(--orange-400);--accent-500:var(--orange-500);--accent-600:var(--orange-600);--accent-700:var(--orange-700);--accent-800:var(--orange-800);--accent-900:var(--orange-900)}.vc-container.vc-yellow{--accent-100:var(--yellow-100);--accent-200:var(--yellow-200);--accent-300:var(--yellow-300);--accent-400:var(--yellow-400);--accent-500:var(--yellow-500);--accent-600:var(--yellow-600);--accent-700:var(--yellow-700);--accent-800:var(--yellow-800);--accent-900:var(--yellow-900)}.vc-container.vc-green{--accent-100:var(--green-100);--accent-200:var(--green-200);--accent-300:var(--green-300);--accent-400:var(--green-400);--accent-500:var(--green-500);--accent-600:var(--green-600);--accent-700:var(--green-700);--accent-800:var(--green-800);--accent-900:var(--green-900)}.vc-container.vc-teal{--accent-100:var(--teal-100);--accent-200:var(--teal-200);--accent-300:var(--teal-300);--accent-400:var(--teal-400);--accent-500:var(--teal-500);--accent-600:var(--teal-600);--accent-700:var(--teal-700);--accent-800:var(--teal-800);--accent-900:var(--teal-900)}.vc-container.vc-blue{--accent-100:var(--blue-100);--accent-200:var(--blue-200);--accent-300:var(--blue-300);--accent-400:var(--blue-400);--accent-500:var(--blue-500);--accent-600:var(--blue-600);--accent-700:var(--blue-700);--accent-800:var(--blue-800);--accent-900:var(--blue-900)}.vc-container.vc-indigo{--accent-100:var(--indigo-100);--accent-200:var(--indigo-200);--accent-300:var(--indigo-300);--accent-400:var(--indigo-400);--accent-500:var(--indigo-500);--accent-600:var(--indigo-600);--accent-700:var(--indigo-700);--accent-800:var(--indigo-800);--accent-900:var(--indigo-900)}.vc-container.vc-purple{--accent-100:var(--purple-100);--accent-200:var(--purple-200);--accent-300:var(--purple-300);--accent-400:var(--purple-400);--accent-500:var(--purple-500);--accent-600:var(--purple-600);--accent-700:var(--purple-700);--accent-800:var(--purple-800);--accent-900:var(--purple-900)}.vc-container.vc-pink{--accent-100:var(--pink-100);--accent-200:var(--pink-200);--accent-300:var(--pink-300);--accent-400:var(--pink-400);--accent-500:var(--pink-500);--accent-600:var(--pink-600);--accent-700:var(--pink-700);--accent-800:var(--pink-800);--accent-900:var(--pink-900)}.vc-container{--font-normal:400;--font-medium:500;--font-semibold:600;--font-bold:700;--text-xs:12px;--text-sm:14px;--text-base:16px;--text-lg:18px;--leading-snug:1.375;--rounded:0.25rem;--rounded-lg:0.5rem;--rounded-full:9999px;--shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);--shadow-lg:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);--shadow-inner:inset 0 2px 4px 0 rgba(0,0,0,0.06);--slide-translate:22px;--slide-duration:0.15s;--slide-timing:ease;--day-content-transition-time:0.13s ease-in;--weeknumber-offset:-34px;position:relative;display:inline-flex;width:-webkit-max-content;width:max-content;height:-webkit-max-content;height:max-content;font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;color:var(--gray-900);background-color:var(--white);border:1px solid;border-color:var(--gray-400);border-radius:var(--rounded-lg);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent}.vc-container,.vc-container *{box-sizing:border-box}.vc-container:focus,.vc-container :focus{outline:none}.vc-container [role=button],.vc-container button{cursor:pointer}.vc-container.vc-is-expanded{min-width:100%}.vc-container .vc-container{border:none}.vc-container.vc-is-dark{color:var(--gray-100);background-color:var(--gray-900);border-color:var(--gray-700)}", ""]), e.exports = t;
    },
    dcbe: function dcbe(e, t, n) {
      var r = n("30c9"),
          a = n("1310");

      function o(e) {
        return a(e) && r(e);
      }

      e.exports = o;
    },
    dd61: function dd61(e, t, n) {
      var r = n("7948"),
          a = n("badf"),
          o = n("97d3"),
          i = n("6747");

      function s(e, t) {
        var n = i(e) ? r : o;
        return n(e, a(t, 3));
      }

      e.exports = s;
    },
    ddb0: function ddb0(e, t, n) {
      var r = n("da84"),
          a = n("fdbc"),
          o = n("e260"),
          i = n("9112"),
          s = n("b622"),
          c = s("iterator"),
          u = s("toStringTag"),
          l = o.values;

      for (var d in a) {
        var f = r[d],
            p = f && f.prototype;

        if (p) {
          if (p[c] !== l) try {
            i(p, c, l);
          } catch (v) {
            p[c] = l;
          }
          if (p[u] || i(p, u, d), a[d]) for (var h in o) {
            if (p[h] !== o[h]) try {
              i(p, h, o[h]);
            } catch (v) {
              p[h] = o[h];
            }
          }
        }
      }
    },
    de5e: function de5e(e, t, n) {
      "use strict";

      var r = n("72f5"),
          a = n.n(r);
      a.a;
    },
    de97: function de97(e, t, n) {
      var r = n("e6f8");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("58a4211a", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    df75: function df75(e, t, n) {
      var r = n("ca84"),
          a = n("7839");

      e.exports = Object.keys || function (e) {
        return r(e, a);
      };
    },
    df9e: function df9e(e, t, n) {
      var r = n("9e83");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("29f48e5f", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    e031: function e031(e, t, n) {
      var r = n("f909"),
          a = n("1a8c");

      function o(e, t, n, i, s, c) {
        return a(e) && a(t) && (c.set(t, e), r(e, t, void 0, o, c), c["delete"](t)), e;
      }

      e.exports = o;
    },
    e0e7: function e0e7(e, t, n) {
      var r = n("60ed");

      function a(e) {
        return r(e) ? void 0 : e;
      }

      e.exports = a;
    },
    e163: function e163(e, t, n) {
      var r = n("5135"),
          a = n("7b0b"),
          o = n("f772"),
          i = n("e177"),
          s = o("IE_PROTO"),
          c = Object.prototype;
      e.exports = i ? Object.getPrototypeOf : function (e) {
        return e = a(e), r(e, s) ? e[s] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? c : null;
      };
    },
    e177: function e177(e, t, n) {
      var r = n("d039");
      e.exports = !r(function () {
        function e() {}

        return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;
      });
    },
    e24b: function e24b(e, t, n) {
      var r = n("49f4"),
          a = n("1efc"),
          o = n("bbc0"),
          i = n("7a48"),
          s = n("2524");

      function c(e) {
        var t = -1,
            n = null == e ? 0 : e.length;
        this.clear();

        while (++t < n) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }

      c.prototype.clear = r, c.prototype["delete"] = a, c.prototype.get = o, c.prototype.has = i, c.prototype.set = s, e.exports = c;
    },
    e260: function e260(e, t, n) {
      "use strict";

      var r = n("fc6a"),
          a = n("44d2"),
          o = n("3f8c"),
          i = n("69f3"),
          s = n("7dd0"),
          c = "Array Iterator",
          u = i.set,
          l = i.getterFor(c);
      e.exports = s(Array, "Array", function (e, t) {
        u(this, {
          type: c,
          target: r(e),
          index: 0,
          kind: t
        });
      }, function () {
        var e = l(this),
            t = e.target,
            n = e.kind,
            r = e.index++;
        return !t || r >= t.length ? (e.target = void 0, {
          value: void 0,
          done: !0
        }) : "keys" == n ? {
          value: r,
          done: !1
        } : "values" == n ? {
          value: t[r],
          done: !1
        } : {
          value: [r, t[r]],
          done: !1
        };
      }, "values"), o.Arguments = o.Array, a("keys"), a("values"), a("entries");
    },
    e2a0: function e2a0(e, t, n) {
      var r = n("3729"),
          a = n("6747"),
          o = n("1310"),
          i = "[object String]";

      function s(e) {
        return "string" == typeof e || !a(e) && o(e) && r(e) == i;
      }

      e.exports = s;
    },
    e2c0: function e2c0(e, t, n) {
      var r = n("e2e4"),
          a = n("d370"),
          o = n("6747"),
          i = n("c098"),
          s = n("b218"),
          c = n("f4d6");

      function u(e, t, n) {
        t = r(t, e);
        var u = -1,
            l = t.length,
            d = !1;

        while (++u < l) {
          var f = c(t[u]);
          if (!(d = null != e && n(e, f))) break;
          e = e[f];
        }

        return d || ++u != l ? d : (l = null == e ? 0 : e.length, !!l && s(l) && i(f, l) && (o(e) || a(e)));
      }

      e.exports = u;
    },
    e2e4: function e2e4(e, t, n) {
      var r = n("6747"),
          a = n("f608"),
          o = n("18d8"),
          i = n("76dd");

      function s(e, t) {
        return r(e) ? e : a(e, t) ? [e] : o(i(e));
      }

      e.exports = s;
    },
    e380: function e380(e, t, n) {
      var r = n("7b83"),
          a = "Expected a function";

      function o(e, t) {
        if ("function" != typeof e || null != t && "function" != typeof t) throw new TypeError(a);

        var n = function n() {
          var r = arguments,
              a = t ? t.apply(this, r) : r[0],
              o = n.cache;
          if (o.has(a)) return o.get(a);
          var i = e.apply(this, r);
          return n.cache = o.set(a, i) || o, i;
        };

        return n.cache = new (o.Cache || r)(), n;
      }

      o.Cache = r, e.exports = o;
    },
    e3f8: function e3f8(e, t, n) {
      var r = n("656b");

      function a(e) {
        return function (t) {
          return r(t, e);
        };
      }

      e.exports = a;
    },
    e538: function e538(e, t, n) {
      (function (e) {
        var r = n("2b3e"),
            a = t && !t.nodeType && t,
            o = a && "object" == _typeof(e) && e && !e.nodeType && e,
            i = o && o.exports === a,
            s = i ? r.Buffer : void 0,
            c = s ? s.allocUnsafe : void 0;

        function u(e, t) {
          if (t) return e.slice();
          var n = e.length,
              r = c ? c(n) : new e.constructor(n);
          return e.copy(r), r;
        }

        e.exports = u;
      }).call(this, n("62e4")(e));
    },
    e6f8: function e6f8(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-day[data-v-005dafc8]{position:relative;min-height:32px;z-index:1}.vc-day.is-not-in-month *[data-v-005dafc8]{opacity:0;pointer-events:none}.vc-day-layer[data-v-005dafc8]{position:absolute;left:0;right:0;top:0;bottom:0;pointer-events:none}.vc-day-box-center-center[data-v-005dafc8]{display:flex;justify-content:center;align-items:center;transform-origin:50% 50%}.vc-day-box-left-center[data-v-005dafc8]{display:flex;justify-content:flex-start;align-items:center;transform-origin:0 50%}.vc-day-box-right-center[data-v-005dafc8]{display:flex;justify-content:flex-end;align-items:center;transform-origin:100% 50%}.vc-day-box-center-bottom[data-v-005dafc8]{display:flex;justify-content:center;align-items:flex-end}.vc-day-content[data-v-005dafc8]{display:flex;justify-content:center;align-items:center;font-size:var(--text-sm);font-weight:var(--font-medium);width:28px;height:28px;line-height:28px;border-radius:var(--rounded-full);-webkit-user-select:none;user-select:none;cursor:pointer}.vc-day-content[data-v-005dafc8]:hover{background-color:rgba(204,214,224,.3)}.vc-day-content[data-v-005dafc8]:focus{font-weight:var(--font-bold);background-color:rgba(204,214,224,.4)}.vc-day-content.is-disabled[data-v-005dafc8]{color:var(--gray-400)}.vc-is-dark .vc-day-content[data-v-005dafc8]:hover{background-color:rgba(114,129,151,.3)}.vc-is-dark .vc-day-content[data-v-005dafc8]:focus{background-color:rgba(114,129,151,.4)}.vc-is-dark .vc-day-content.is-disabled[data-v-005dafc8]{color:var(--gray-600)}.vc-highlights[data-v-005dafc8]{overflow:hidden;pointer-events:none;z-index:-1}.vc-highlight[data-v-005dafc8]{width:28px;height:28px}.vc-highlight.vc-highlight-base-start[data-v-005dafc8]{width:50%!important;border-radius:0!important;border-right-width:0!important}.vc-highlight.vc-highlight-base-end[data-v-005dafc8]{width:50%!important;border-radius:0!important;border-left-width:0!important}.vc-highlight.vc-highlight-base-middle[data-v-005dafc8]{width:100%;border-radius:0!important;border-left-width:0!important;border-right-width:0!important;margin:0 -1px}.vc-dots[data-v-005dafc8]{display:flex;justify-content:center;align-items:center}.vc-dot[data-v-005dafc8]{width:5px;height:5px;border-radius:50%;transition:all var(--day-content-transition-time)}.vc-dot[data-v-005dafc8]:not(:last-child){margin-right:3px}.vc-bars[data-v-005dafc8]{display:flex;justify-content:flex-start;align-items:center;width:75%}.vc-bar[data-v-005dafc8]{flex-grow:1;height:3px;transition:all var(--day-content-transition-time)}", ""]), e.exports = t;
    },
    e76f: function e76f(e, t, n) {
      "use strict";

      var r = n("255e"),
          a = n.n(r);
      a.a;
    },
    e893: function e893(e, t, n) {
      var r = n("5135"),
          a = n("56ef"),
          o = n("06cf"),
          i = n("9bf2");

      e.exports = function (e, t) {
        for (var n = a(t), s = i.f, c = o.f, u = 0; u < n.length; u++) {
          var l = n[u];
          r(e, l) || s(e, l, c(t, l));
        }
      };
    },
    e969: function e969(e, t, n) {
      var r = n("0da5");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("61c2bd5e", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    e99f: function e99f(e, t, n) {
      var r = n("f31c");
      "string" === typeof r && (r = [[e.i, r, ""]]), r.locals && (e.exports = r.locals);
      var a = n("499e").default;
      a("3d092d67", r, !0, {
        sourceMap: !1,
        shadowMode: !1
      });
    },
    ea80: function ea80(e, t, n) {
      "use strict";

      var r = n("de97"),
          a = n.n(r);
      a.a;
    },
    eac5: function eac5(e, t) {
      var n = Object.prototype;

      function r(e) {
        var t = e && e.constructor,
            r = "function" == typeof t && t.prototype || n;
        return e === r;
      }

      e.exports = r;
    },
    ec47: function ec47(e, t, n) {
      var r = n("a3fd"),
          a = n("42a2"),
          o = n("edfa"),
          i = n("cebd"),
          s = "[object Map]",
          c = "[object Set]";

      function u(e) {
        return function (t) {
          var n = a(t);
          return n == s ? o(t) : n == c ? i(t) : r(t, e(t));
        };
      }

      e.exports = u;
    },
    ec69: function ec69(e, t, n) {
      var r = n("6fcd"),
          a = n("03dd"),
          o = n("30c9");

      function i(e) {
        return o(e) ? r(e) : a(e);
      }

      e.exports = i;
    },
    ec8c: function ec8c(e, t) {
      function n(e) {
        var t = [];
        if (null != e) for (var n in Object(e)) {
          t.push(n);
        }
        return t;
      }

      e.exports = n;
    },
    ed08: function ed08(e, t, n) {
      "use strict";

      n.r(t), n.d(t, "Locale", function () {
        return r["b"];
      }), n.d(t, "DateInfo", function () {
        return a["a"];
      }), n.d(t, "Attribute", function () {
        return o["a"];
      }), n.d(t, "AttributeStore", function () {
        return i["a"];
      }), n.d(t, "setupCalendar", function () {
        return u;
      }), n.d(t, "pad", function () {
        return l["m"];
      }), n.d(t, "evalFn", function () {
        return l["f"];
      }), n.d(t, "mergeEvents", function () {
        return l["h"];
      }), n.d(t, "pageIsValid", function () {
        return l["r"];
      }), n.d(t, "pageIsBeforePage", function () {
        return l["o"];
      }), n.d(t, "pageIsAfterPage", function () {
        return l["n"];
      }), n.d(t, "pageIsBetweenPages", function () {
        return l["p"];
      }), n.d(t, "pageIsEqualToPage", function () {
        return l["q"];
      }), n.d(t, "addPages", function () {
        return l["a"];
      }), n.d(t, "pageRangeToArray", function () {
        return l["s"];
      }), n.d(t, "datesAreEqual", function () {
        return l["d"];
      }), n.d(t, "arrayHasItems", function () {
        return l["b"];
      }), n.d(t, "mixinOptionalProps", function () {
        return l["i"];
      }), n.d(t, "on", function () {
        return l["k"];
      }), n.d(t, "off", function () {
        return l["j"];
      }), n.d(t, "elementContains", function () {
        return l["e"];
      }), n.d(t, "onSpaceOrEnter", function () {
        return l["l"];
      }), n.d(t, "createGuid", function () {
        return l["c"];
      }), n.d(t, "hash", function () {
        return l["g"];
      }), n.d(t, "addTapOrClickHandler", function () {
        return d["b"];
      }), n.d(t, "addHorizontalSwipeHandler", function () {
        return d["a"];
      });

      var r = n("29ae"),
          a = n("cfe5"),
          o = n("22f3"),
          i = n("9349"),
          s = n("51ec"),
          c = n("1315"),
          u = function u(e) {
        var t = Object(s["b"])(e);
        return Object(c["a"])(t.screens, !0), t;
      },
          l = n("2fa3"),
          d = n("0733");
    },
    edfa: function edfa(e, t) {
      function n(e) {
        var t = -1,
            n = Array(e.size);
        return e.forEach(function (e, r) {
          n[++t] = [r, e];
        }), n;
      }

      e.exports = n;
    },
    ef5d: function ef5d(e, t) {
      function n(e) {
        return function (t) {
          return null == t ? void 0 : t[e];
        };
      }

      e.exports = n;
    },
    efb6: function efb6(e, t, n) {
      var r = n("5e2e");

      function a() {
        this.__data__ = new r(), this.size = 0;
      }

      e.exports = a;
    },
    f15d: function f15d(e, t, n) {
      "use strict";

      n("ddb0");
      var r = n("9404");
      var a = {
        ar: {
          dow: 7,
          L: "D/‏M/‏YYYY"
        },
        bg: {
          dow: 2,
          L: "D.MM.YYYY"
        },
        ca: {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        "zh-CN": {
          dow: 2,
          L: "YYYY/MM/DD"
        },
        "zh-TW": {
          dow: 1,
          L: "YYYY/MM/DD"
        },
        hr: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        cs: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        da: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        nl: {
          dow: 2,
          L: "DD-MM-YYYY"
        },
        "en-US": {
          dow: 1,
          L: "MM/DD/YYYY"
        },
        "en-AU": {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        "en-CA": {
          dow: 1,
          L: "YYYY-MM-DD"
        },
        "en-GB": {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        "en-IE": {
          dow: 2,
          L: "DD-MM-YYYY"
        },
        "en-NZ": {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        "en-ZA": {
          dow: 1,
          L: "YYYY/MM/DD"
        },
        eo: {
          dow: 2,
          L: "YYYY-MM-DD"
        },
        et: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        fi: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        fr: {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        "fr-CA": {
          dow: 1,
          L: "YYYY-MM-DD"
        },
        "fr-CH": {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        de: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        he: {
          dow: 1,
          L: "DD.MM.YYYY"
        },
        id: {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        it: {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        ja: {
          dow: 1,
          L: "YYYY年M月D日"
        },
        ko: {
          dow: 1,
          L: "YYYY.MM.DD"
        },
        lv: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        lt: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        mk: {
          dow: 2,
          L: "D.MM.YYYY"
        },
        nb: {
          dow: 2,
          L: "D. MMMM YYYY"
        },
        nn: {
          dow: 2,
          L: "D. MMMM YYYY"
        },
        pl: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        pt: {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        ro: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        ru: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        sk: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        "es-ES": {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        "es-MX": {
          dow: 2,
          L: "DD/MM/YYYY"
        },
        sv: {
          dow: 2,
          L: "YYYY-MM-DD"
        },
        th: {
          dow: 1,
          L: "DD/MM/YYYY"
        },
        tr: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        uk: {
          dow: 2,
          L: "DD.MM.YYYY"
        },
        vi: {
          dow: 2,
          L: "DD/MM/YYYY"
        }
      };
      a.en = a["en-US"], a.es = a["es-ES"], a.no = a.nb, a.zh = a["zh-CN"], Object(r["w"])(a).forEach(function (_ref45) {
        var _ref46 = _slicedToArray(_ref45, 2),
            e = _ref46[0],
            _ref46$ = _ref46[1],
            t = _ref46$.dow,
            n = _ref46$.L;

        a[e] = {
          id: e,
          firstDayOfWeek: t,
          masks: {
            L: n
          }
        };
      }), t["a"] = a;
    },
    f31c: function f31c(e, t, n) {
      var r = n("24fb");
      t = r(!1), t.push([e.i, ".vc-pane[data-v-37fb1233]{min-width:250px}.vc-header[data-v-37fb1233]{display:flex;justify-content:center;align-items:center;padding:10px 18px 0 18px}.vc-header.align-left[data-v-37fb1233]{justify-content:flex-start}.vc-header.align-right[data-v-37fb1233]{justify-content:flex-end}.vc-title[data-v-37fb1233]{font-size:var(--text-lg);color:var(--gray-800);font-weight:var(--font-semibold);line-height:28px;cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap}.vc-title[data-v-37fb1233]:hover{opacity:.75}.vc-weeknumber[data-v-37fb1233]{position:relative}.vc-weeknumber[data-v-37fb1233],.vc-weeknumber-content[data-v-37fb1233]{display:flex;justify-content:center;align-items:center}.vc-weeknumber-content[data-v-37fb1233]{font-size:var(--text-xs);font-weight:var(--font-medium);font-style:italic;width:28px;height:28px;margin-top:2px;color:var(--gray-500);-webkit-user-select:none;user-select:none}.vc-weeknumber-content.is-left-outside[data-v-37fb1233]{position:absolute;left:var(--weeknumber-offset)}.vc-weeknumber-content.is-right-outside[data-v-37fb1233]{position:absolute;right:var(--weeknumber-offset)}.vc-weeks[data-v-37fb1233]{display:grid;grid-template-columns:repeat(7,1fr);position:relative;-webkit-overflow-scrolling:touch;padding:5px;min-width:250px}.vc-weeks.vc-show-weeknumbers[data-v-37fb1233]{grid-template-columns:auto repeat(7,1fr)}.vc-weeks.vc-show-weeknumbers.is-right[data-v-37fb1233]{grid-template-columns:repeat(7,1fr) auto}.vc-weekday[data-v-37fb1233]{text-align:center;color:var(--gray-500);font-size:var(--text-sm);font-weight:var(--font-bold);line-height:14px;padding-top:4px;padding-bottom:8px;cursor:default;-webkit-user-select:none;user-select:none}.vc-is-dark .vc-header[data-v-37fb1233]{color:var(--gray-200)}.vc-is-dark .vc-title[data-v-37fb1233]{color:var(--gray-100)}.vc-is-dark .vc-weekday[data-v-37fb1233]{color:var(--accent-200)}", ""]), e.exports = t;
    },
    f3c1: function f3c1(e, t) {
      var n = 800,
          r = 16,
          a = Date.now;

      function o(e) {
        var t = 0,
            o = 0;
        return function () {
          var i = a(),
              s = r - (i - o);

          if (o = i, s > 0) {
            if (++t >= n) return arguments[0];
          } else t = 0;

          return e.apply(void 0, arguments);
        };
      }

      e.exports = o;
    },
    f4d6: function f4d6(e, t, n) {
      var r = n("ffd6"),
          a = 1 / 0;

      function o(e) {
        if ("string" == typeof e || r(e)) return e;
        var t = e + "";
        return "0" == t && 1 / e == -a ? "-0" : t;
      }

      e.exports = o;
    },
    f542: function f542(e, t, n) {
      var r = n("ec47"),
          a = n("ec69"),
          o = r(a);
      e.exports = o;
    },
    f608: function f608(e, t, n) {
      var r = n("6747"),
          a = n("ffd6"),
          o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          i = /^\w*$/;

      function s(e, t) {
        if (r(e)) return !1;

        var n = _typeof(e);

        return !("number" != n && "symbol" != n && "boolean" != n && null != e && !a(e)) || i.test(e) || !o.test(e) || null != t && e in Object(t);
      }

      e.exports = s;
    },
    f678: function f678(e, t, n) {
      var r = n("8384"),
          a = n("b4b0");

      function o(e, t, n) {
        return void 0 === n && (n = t, t = void 0), void 0 !== n && (n = a(n), n = n === n ? n : 0), void 0 !== t && (t = a(t), t = t === t ? t : 0), r(a(e), t, n);
      }

      e.exports = o;
    },
    f772: function f772(e, t, n) {
      var r = n("5692"),
          a = n("90e3"),
          o = r("keys");

      e.exports = function (e) {
        return o[e] || (o[e] = a(e));
      };
    },
    f7c3: function f7c3(e, t, n) {
      "use strict";

      var r = n("e99f"),
          a = n.n(r);
      a.a;
    },
    f7f1: function f7f1(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return i;
      });
      var r = n("fe1f"),
          a = n("fd3a"),
          o = n("8c86");

      function i(e, t) {
        Object(o["a"])(2, arguments);
        var n = Object(a["a"])(e),
            i = Object(r["a"])(t);
        return isNaN(i) ? new Date(NaN) : i ? (n.setDate(n.getDate() + i), n) : n;
      }
    },
    f8af: function f8af(e, t, n) {
      var r = n("2474");

      function a(e) {
        var t = new e.constructor(e.byteLength);
        return new r(t).set(new r(e)), t;
      }

      e.exports = a;
    },
    f909: function f909(e, t, n) {
      var r = n("7e64"),
          a = n("b760"),
          o = n("72af"),
          i = n("4f50"),
          s = n("1a8c"),
          c = n("9934"),
          u = n("8adb");

      function l(e, t, n, d, f) {
        e !== t && o(t, function (o, c) {
          if (f || (f = new r()), s(o)) i(e, t, c, n, l, d, f);else {
            var p = d ? d(u(e, c), o, c + "", e, t, f) : void 0;
            void 0 === p && (p = o), a(e, c, p);
          }
        }, c);
      }

      e.exports = l;
    },
    f9ce: function f9ce(e, t, n) {
      var r = n("ef5d"),
          a = n("e3f8"),
          o = n("f608"),
          i = n("f4d6");

      function s(e) {
        return o(e) ? r(i(e)) : a(e);
      }

      e.exports = s;
    },
    fa21: function fa21(e, t, n) {
      var r = n("7530"),
          a = n("2dcb"),
          o = n("eac5");

      function i(e) {
        return "function" != typeof e.constructor || o(e) ? {} : r(a(e));
      }

      e.exports = i;
    },
    fb15: function fb15(e, t, n) {
      "use strict";

      if (n.r(t), n.d(t, "Calendar", function () {
        return o["c"];
      }), n.d(t, "CalendarNav", function () {
        return o["d"];
      }), n.d(t, "DatePicker", function () {
        return o["f"];
      }), n.d(t, "Popover", function () {
        return o["h"];
      }), n.d(t, "Locale", function () {
        return o["g"];
      }), n.d(t, "DateInfo", function () {
        return o["e"];
      }), n.d(t, "Attribute", function () {
        return o["a"];
      }), n.d(t, "AttributeStore", function () {
        return o["b"];
      }), n.d(t, "setupCalendar", function () {
        return o["E"];
      }), n.d(t, "pad", function () {
        return o["x"];
      }), n.d(t, "evalFn", function () {
        return o["q"];
      }), n.d(t, "mergeEvents", function () {
        return o["s"];
      }), n.d(t, "pageIsValid", function () {
        return o["C"];
      }), n.d(t, "pageIsBeforePage", function () {
        return o["z"];
      }), n.d(t, "pageIsAfterPage", function () {
        return o["y"];
      }), n.d(t, "pageIsBetweenPages", function () {
        return o["A"];
      }), n.d(t, "pageIsEqualToPage", function () {
        return o["B"];
      }), n.d(t, "addPages", function () {
        return o["j"];
      }), n.d(t, "pageRangeToArray", function () {
        return o["D"];
      }), n.d(t, "datesAreEqual", function () {
        return o["n"];
      }), n.d(t, "arrayHasItems", function () {
        return o["l"];
      }), n.d(t, "mixinOptionalProps", function () {
        return o["t"];
      }), n.d(t, "on", function () {
        return o["v"];
      }), n.d(t, "off", function () {
        return o["u"];
      }), n.d(t, "elementContains", function () {
        return o["p"];
      }), n.d(t, "onSpaceOrEnter", function () {
        return o["w"];
      }), n.d(t, "createGuid", function () {
        return o["m"];
      }), n.d(t, "hash", function () {
        return o["r"];
      }), n.d(t, "addTapOrClickHandler", function () {
        return o["k"];
      }), n.d(t, "addHorizontalSwipeHandler", function () {
        return o["i"];
      }), "undefined" !== typeof window) {
        var r = window.document.currentScript,
            a = r && r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
        a && (n.p = a[1]);
      }

      var o = n("34e9");
      t["default"] = o["o"];
    },
    fba5: function fba5(e, t, n) {
      var r = n("cb5a");

      function a(e) {
        return r(this.__data__, e) > -1;
      }

      e.exports = a;
    },
    fc6a: function fc6a(e, t, n) {
      var r = n("44ad"),
          a = n("1d80");

      e.exports = function (e) {
        return r(a(e));
      };
    },
    fd3a: function fd3a(e, t, n) {
      "use strict";

      n.d(t, "a", function () {
        return a;
      });
      var r = n("8c86");

      function a(e) {
        Object(r["a"])(1, arguments);
        var t = Object.prototype.toString.call(e);
        return e instanceof Date || "object" === _typeof(e) && "[object Date]" === t ? new Date(e.getTime()) : "number" === typeof e || "[object Number]" === t ? new Date(e) : ("string" !== typeof e && "[object String]" !== t || "undefined" === typeof console || (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"), console.warn(new Error().stack)), new Date(NaN));
      }
    },
    fdbc: function fdbc(e, t) {
      e.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      };
    },
    fdbf: function fdbf(e, t, n) {
      var r = n("4930");
      e.exports = r && !Symbol.sham && "symbol" == _typeof(Symbol.iterator);
    },
    fe1f: function fe1f(e, t, n) {
      "use strict";

      function r(e) {
        if (null === e || !0 === e || !1 === e) return NaN;
        var t = Number(e);
        return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
      }

      n.d(t, "a", function () {
        return r;
      });
    },
    ffd6: function ffd6(e, t, n) {
      var r = n("3729"),
          a = n("1310"),
          o = "[object Symbol]";

      function i(e) {
        return "symbol" == _typeof(e) || a(e) && r(e) == o;
      }

      e.exports = i;
    }
  });
});
},{"vue":"QPfz"}],"Gcav":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vCalendar = require("v-calendar");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: "DatePicker",
  data: function data() {
    return {
      date: {
        start: null,
        end: null
      },
      masks: {
        input: 'DD.MM.YYYY'
      }
    };
  },
  components: {
    VDatePicker: _vCalendar.DatePicker
  },
  methods: {
    dateChanged: function dateChanged(date) {
      this.$emit('input', date);
    }
  }
};
exports.default = _default;
        var $c71fe9 = exports.default || module.exports;
      
      if (typeof $c71fe9 === 'function') {
        $c71fe9 = $c71fe9.options;
      }
    
        /* template */
        Object.assign($c71fe9, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-date-picker',{attrs:{"popover":{visibility: 'click'},"masks":{input: 'DD.MM.YYYY'},"is-range":""},on:{"input":function($event){return _vm.dateChanged($event)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var inputValue = ref.inputValue;
var inputEvents = ref.inputEvents;
return [_c('div',{staticClass:"flex flex-row"},[_c('input',_vm._g({attrs:{"placeholder":"From","type":"text"},domProps:{"value":inputValue.start}},inputEvents.start)),_vm._v(" "),_c('input',_vm._g({attrs:{"placeholder":"To","type":"text"},domProps:{"value":inputValue.end}},inputEvents.end))])]}}]),model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v},expression:"date"}})}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-c71fe9",
            functional: undefined
          };
        })());
      
},{"v-calendar":"Rkmr"}],"aRaC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: "Pagination",
  components: {},
  props: {
    limit: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    nbHits: {
      type: Number,
      required: true
    }
  },
  computed: {
    to: function to() {
      if (this.showingLastPage) {
        return this.nbHits;
      }

      return this.limit + this.offset;
    },
    showingLastPage: function showingLastPage() {
      return this.nbHits < this.limit + this.offset;
    },
    showingFirstPage: function showingFirstPage() {
      return this.offset === 0;
    },
    currentPage: function currentPage() {
      var currentPage = Math.ceil(this.offset / this.limit) + 1;

      if (currentPage === 0) {
        return 1;
      }

      return currentPage;
    },
    hasSecondPreviousPage: function hasSecondPreviousPage() {
      return this.currentPage > 2 && this.showingLastPage;
    },
    hasPreviousPage: function hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage: function hasNextPage() {
      return this.nbHits > this.limit * this.currentPage;
    },
    hasSecondNextPage: function hasSecondNextPage() {
      return this.currentPage === 1 && this.nbHits > this.limit * (this.currentPage + 1);
    }
  },
  methods: {
    updateOffset: function updateOffset(page) {
      var offset = (page - 1) * this.limit;
      this.$emit('update-offset', offset);
    }
  }
};
exports.default = _default;
        var $3eb402 = exports.default || module.exports;
      
      if (typeof $3eb402 === 'function') {
        $3eb402 = $3eb402.options;
      }
    
        /* template */
        Object.assign($3eb402, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6"},[_c('div',{staticClass:"flex-1 flex justify-between sm:hidden"},[_c('a',{staticClass:"relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover",attrs:{"href":"#"}},[_vm._v("\n      "+_vm._s(_vm.$t('Previous'))+"\n    ")]),_vm._v(" "),_c('a',{staticClass:"ml-3 relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover",attrs:{"href":"#"}},[_vm._v("\n      "+_vm._s(_vm.$t('Next'))+"\n    ")])]),_vm._v(" "),_c('div',{staticClass:"hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"},[_c('div',[_c('p',{staticClass:"text-sm text-gray-800"},[_vm._v("\n        "+_vm._s(_vm.$t('Showing'))+"\n        "),_c('span',{staticClass:"font-medium"},[_vm._v(_vm._s(_vm.offset + 1))]),_vm._v("\n        "+_vm._s(_vm.$t('to'))+"\n        "),_c('span',{staticClass:"font-medium"},[_vm._v(_vm._s(_vm.to))]),_vm._v("\n        "+_vm._s(_vm.$t('of'))+"\n        "),_c('span',{staticClass:"font-medium"},[_vm._v(_vm._s(_vm.nbHits))]),_vm._v("\n        "+_vm._s(_vm.$t('results'))+"\n        "+_vm._s(_vm.currentPage)+"\n      ")])]),_vm._v(" "),_c('div',[_c('nav',{staticClass:"relative z-0 inline-flex shadow-sm -space-x-px",attrs:{"aria-label":"Pagination"}},[(_vm.nbHits > (_vm.limit * 3))?_c('button',{staticClass:"relative inline-flex items-center px-2 py-2 border border-gray-800 text-sm font-medium hover:bg-gray-50",attrs:{"disabled":_vm.showingFirstPage},on:{"click":function($event){return _vm.updateOffset(_vm.currentPage-1)}}},[_c('span',{staticClass:"sr-only"},[_vm._v("Previous")]),_vm._v(" "),_c('svg',{staticClass:"h-5 w-5",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 20 20","fill":"currentColor","aria-hidden":"true"}},[_c('path',{attrs:{"fill-rule":"evenodd","d":"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"}})])]):_vm._e(),_vm._v(" "),(_vm.hasSecondPreviousPage)?_c('button',{staticClass:"relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500",on:{"click":function($event){return _vm.updateOffset(_vm.currentPage-2)}}},[_vm._v("\n          "+_vm._s(_vm.currentPage - 2)+"\n        ")]):_vm._e(),_vm._v(" "),(_vm.hasPreviousPage)?_c('button',{staticClass:"relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500",on:{"click":function($event){return _vm.updateOffset(_vm.currentPage-1)}}},[_vm._v("\n          "+_vm._s(_vm.currentPage - 1)+"\n        ")]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 bg-gray-500"},[_vm._v("\n          "+_vm._s(_vm.currentPage)+"\n        ")]),_vm._v(" "),(_vm.hasNextPage)?_c('button',{staticClass:"relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500",on:{"click":function($event){return _vm.updateOffset(_vm.currentPage+1)}}},[_vm._v("\n          "+_vm._s(_vm.currentPage + 1)+"\n        ")]):_vm._e(),_vm._v(" "),(_vm.hasSecondNextPage)?_c('button',{staticClass:"relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500",on:{"click":function($event){return _vm.updateOffset(_vm.currentPage+2)}}},[_vm._v("\n          "+_vm._s(_vm.currentPage + 2)+"\n        ")]):_vm._e(),_vm._v(" "),(_vm.nbHits > (_vm.limit * 3))?_c('button',{staticClass:"relative inline-flex items-center px-2 py-2 border border-gray-800 text-sm font-medium hover:bg-gray-50",attrs:{"disabled":_vm.showingLastPage},on:{"click":function($event){return _vm.updateOffset(_vm.currentPage+1)}}},[_c('span',{staticClass:"sr-only"},[_vm._v("Next")]),_vm._v(" "),_c('svg',{staticClass:"h-5 w-5",attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 20 20","fill":"currentColor","aria-hidden":"true"}},[_c('path',{attrs:{"fill-rule":"evenodd","d":"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"}})])]):_vm._e()])])])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3eb402",
            functional: undefined
          };
        })());
      
},{}],"n6Qj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  name: "Hit",
  props: {
    hit: {
      type: Object,
      required: true
    }
  }
};
exports.default = _default;
        var $7b613a = exports.default || module.exports;
      
      if (typeof $7b613a === 'function') {
        $7b613a = $7b613a.options;
      }
    
        /* template */
        Object.assign($7b613a, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"border border-gray-800 p-5"},[_c('a',{attrs:{"href":_vm.hit.guid}},[_vm._v(_vm._s(_vm.hit.post_title))])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-7b613a",
            functional: undefined
          };
        })());
      
},{}],"yiHz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Hit = _interopRequireDefault(require("./Hit.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
var _default = {
  name: "Hits",
  components: {
    Hit: _Hit.default
  },
  props: {
    hits: {
      type: Array,
      required: true
    }
  }
};
exports.default = _default;
        var $75d9ce = exports.default || module.exports;
      
      if (typeof $75d9ce === 'function') {
        $75d9ce = $75d9ce.options;
      }
    
        /* template */
        Object.assign($75d9ce, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"grid grid-cols-3 gap-3"},[_vm._l((_vm.hits),function(hit){return _c('hit',{key:hit.id,attrs:{"hit":hit}})}),_vm._v(" "),(!_vm.hits.length)?_c('span',[_vm._v(_vm._s(_vm.$t('No items found')))]):_vm._e()],2)}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-75d9ce",
            functional: undefined
          };
        })());
      
},{"./Hit.vue":"n6Qj"}],"u9vI":[function(require,module,exports) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"j3D9":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"MIhM":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"j3D9"}],"pJf5":[function(require,module,exports) {
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":"MIhM"}],"x2wq":[function(require,module,exports) {
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;

},{}],"SK01":[function(require,module,exports) {
var trimmedEndIndex = require('./_trimmedEndIndex');

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;

},{"./_trimmedEndIndex":"x2wq"}],"wppe":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"MIhM"}],"uiOY":[function(require,module,exports) {
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":"wppe"}],"lPmd":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],"e5TX":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"wppe","./_getRawTag":"uiOY","./_objectToString":"lPmd"}],"OuyB":[function(require,module,exports) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"bgO7":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":"e5TX","./isObjectLike":"OuyB"}],"iS0Z":[function(require,module,exports) {
var baseTrim = require('./_baseTrim'),
    isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./_baseTrim":"SK01","./isObject":"u9vI","./isSymbol":"bgO7"}],"CXfR":[function(require,module,exports) {
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":"u9vI","./now":"pJf5","./toNumber":"iS0Z"}],"CQH0":[function(require,module,exports) {
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
})(typeof self !== 'undefined' ? self : this);

},{}],"yYQX":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cross-fetch/polyfill')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cross-fetch/polyfill'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var MeiliSearchError =
    /** @class */
    function (_super) {
      __extends(MeiliSearchError, _super);

      function MeiliSearchError(message) {
        var _this = _super.call(this, message) || this;

        _this.name = 'MeiliSearchError';
        _this.type = 'MeiliSearchError';

        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, MeiliSearchError);
        }

        return _this;
      }

      return MeiliSearchError;
    }(Error);

    var MeiliSearchTimeOutError =
    /** @class */
    function (_super) {
      __extends(MeiliSearchTimeOutError, _super);

      function MeiliSearchTimeOutError(message) {
        var _this = _super.call(this, message) || this;

        _this.name = 'MeiliSearchTimeOutError';
        _this.type = _this.constructor.name;

        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, MeiliSearchTimeOutError);
        }

        return _this;
      }

      return MeiliSearchTimeOutError;
    }(Error);

    /**
     * Removes undefined entries from object
     */

    function removeUndefinedFromObject(obj) {
      return Object.entries(obj).reduce(function (acc, curEntry) {
        var key = curEntry[0],
            val = curEntry[1];
        if (val !== undefined) acc[key] = val;
        return acc;
      }, {});
    }

    function sleep(ms) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , new Promise(function (resolve) {
                return setTimeout(resolve, ms);
              })];

            case 1:
              return [2
              /*return*/
              , _a.sent()];
          }
        });
      });
    }

    var MeiliSearchCommunicationError =
    /** @class */
    function (_super) {
      __extends(MeiliSearchCommunicationError, _super);

      function MeiliSearchCommunicationError(message, body) {
        var _this = _super.call(this, message) || this;

        _this.name = 'MeiliSearchCommunicationError';
        _this.type = 'MeiliSearchCommunicationError';

        if (body instanceof Response) {
          _this.message = body.statusText;
          _this.statusCode = body.status;
        }

        if (body instanceof Error) {
          _this.errno = body.errno;
          _this.code = body.code;
        }

        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, MeiliSearchCommunicationError);
        }

        return _this;
      }

      return MeiliSearchCommunicationError;
    }(Error);

    var MeiliSearchApiError =
    /** @class */
    function (_super) {
      __extends(class_1, _super);

      function class_1(error, status) {
        var _this = _super.call(this, error.message) || this;

        _this.type = 'MeiliSearchApiError';
        _this.name = 'MeiliSearchApiError';
        _this.errorCode = error.errorCode;
        _this.errorType = error.errorType;
        _this.errorLink = error.errorLink;
        _this.message = error.message;
        _this.httpStatus = status;

        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, MeiliSearchApiError);
        }

        return _this;
      }

      return class_1;
    }(Error);

    function httpResponseErrorHandler(response) {
      return __awaiter(this, void 0, void 0, function () {
        var err;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!!response.ok) return [3
              /*break*/
              , 5];
              err = void 0;
              _a.label = 1;

            case 1:
              _a.trys.push([1, 3,, 4]);

              return [4
              /*yield*/
              , response.json()];

            case 2:
              err = _a.sent();
              return [3
              /*break*/
              , 4];

            case 3:
              _a.sent();
              throw new MeiliSearchCommunicationError(response.statusText, response);

            case 4:
              throw new MeiliSearchApiError(err, response.status);

            case 5:
              return [2
              /*return*/
              , response];
          }
        });
      });
    }

    function httpErrorHandler(response) {
      if (response.type !== 'MeiliSearchApiError') {
        throw new MeiliSearchCommunicationError(response.message, response);
      }

      throw response;
    }

    var HttpRequests =
    /** @class */
    function () {
      function HttpRequests(config) {
        this.headers = __assign(__assign(__assign({}, config.headers || {}), {
          'Content-Type': 'application/json'
        }), config.apiKey ? {
          'X-Meili-API-Key': config.apiKey
        } : {});
        this.url = new URL(config.host);
      }

      HttpRequests.addTrailingSlash = function (url) {
        if (!url.endsWith('/')) {
          url += '/';
        }

        return url;
      };

      HttpRequests.prototype.request = function (_a) {
        var method = _a.method,
            url = _a.url,
            params = _a.params,
            body = _a.body,
            config = _a.config;
        return __awaiter(this, void 0, void 0, function () {
          var constructURL, queryParams_1, response, parsedBody, parsedJson, e_1;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 3,, 4]);

                constructURL = new URL(url, this.url);

                if (params) {
                  queryParams_1 = new URLSearchParams();
                  Object.keys(params).filter(function (x) {
                    return params[x] !== null;
                  }).map(function (x) {
                    return queryParams_1.set(x, params[x]);
                  });
                  constructURL.search = queryParams_1.toString();
                }

                return [4
                /*yield*/
                , fetch(constructURL.toString(), __assign(__assign({}, config), {
                  method: method,
                  body: body ? JSON.stringify(body) : undefined,
                  headers: this.headers
                })).then(function (res) {
                  return httpResponseErrorHandler(res);
                })];

              case 1:
                response = _b.sent();
                return [4
                /*yield*/
                , response.text()];

              case 2:
                parsedBody = _b.sent();

                try {
                  parsedJson = JSON.parse(parsedBody);
                  return [2
                  /*return*/
                  , parsedJson];
                } catch (_) {
                  return [2
                  /*return*/
                  ];
                }

                return [3
                /*break*/
                , 4];

              case 3:
                e_1 = _b.sent();
                httpErrorHandler(e_1);
                return [3
                /*break*/
                , 4];

              case 4:
                return [2
                /*return*/
                ];
            }
          });
        });
      };

      HttpRequests.prototype.get = function (url, params, config) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , this.request({
                  method: 'GET',
                  url: url,
                  params: params,
                  config: config
                })];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      HttpRequests.prototype.post = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , this.request({
                  method: 'POST',
                  url: url,
                  body: data,
                  params: params,
                  config: config
                })];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      HttpRequests.prototype.put = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , this.request({
                  method: 'PUT',
                  url: url,
                  body: data,
                  params: params,
                  config: config
                })];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      HttpRequests.prototype["delete"] = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , this.request({
                  method: 'DELETE',
                  url: url,
                  body: data,
                  params: params,
                  config: config
                })];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      return HttpRequests;
    }();

    /*
     * Bundle: MeiliSearch / Indexes
     * Project: MeiliSearch - Javascript API
     * Author: Quentin de Quelen <quentin@meilisearch.com>
     * Copyright: 2019, MeiliSearch
     */

    var Index =
    /** @class */
    function () {
      function Index(config, uid, primaryKey) {
        this.uid = uid;
        this.primaryKey = primaryKey;
        this.httpRequest = new HttpRequests(config);
      } ///
      /// STATIC
      ///


      Index.getApiRoutes = function () {
        return Index.apiRoutes;
      };

      Index.getRouteConstructors = function () {
        return Index.routeConstructors;
      }; ///
      /// UPDATES
      ///

      /**
       * Get the informations about an update status
       * @memberof Index
       * @method getUpdateStatus
       */


      Index.prototype.getUpdateStatus = function (updateId) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getUpdateStatus(this.uid, updateId);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      Index.prototype.waitForPendingUpdate = function (updateId, _a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.timeOutMs,
            timeOutMs = _c === void 0 ? 5000 : _c,
            _d = _b.intervalMs,
            intervalMs = _d === void 0 ? 50 : _d;

        return __awaiter(this, void 0, void 0, function () {
          var startingTime, response;
          return __generator(this, function (_e) {
            switch (_e.label) {
              case 0:
                startingTime = Date.now();
                _e.label = 1;

              case 1:
                if (!(Date.now() - startingTime < timeOutMs)) return [3
                /*break*/
                , 4];
                return [4
                /*yield*/
                , this.getUpdateStatus(updateId)];

              case 2:
                response = _e.sent();
                if (response.status !== 'enqueued') return [2
                /*return*/
                , response];
                return [4
                /*yield*/
                , sleep(intervalMs)];

              case 3:
                _e.sent();

                return [3
                /*break*/
                , 1];

              case 4:
                throw new MeiliSearchTimeOutError("timeout of " + timeOutMs + "ms has exceeded on process " + updateId + " when waiting for pending update to resolve.");
            }
          });
        });
      };
      /**
       * Get the list of all updates
       * @memberof Index
       * @method getAllUpdateStatus
       */


      Index.prototype.getAllUpdateStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getAllUpdateStatus(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// SEARCH
      ///

      /**
       * Search for documents into an index
       * @memberof Index
       * @method search
       */


      Index.prototype.search = function (query, options, method, config) {
        if (method === void 0) {
          method = 'POST';
        }

        return __awaiter(this, void 0, void 0, function () {
          var url, params, getParams;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.search(this.uid);
                params = {
                  q: query,
                  offset: options === null || options === void 0 ? void 0 : options.offset,
                  limit: options === null || options === void 0 ? void 0 : options.limit,
                  cropLength: options === null || options === void 0 ? void 0 : options.cropLength,
                  filters: options === null || options === void 0 ? void 0 : options.filters,
                  matches: options === null || options === void 0 ? void 0 : options.matches,
                  facetFilters: options === null || options === void 0 ? void 0 : options.facetFilters,
                  facetsDistribution: options === null || options === void 0 ? void 0 : options.facetsDistribution,
                  attributesToRetrieve: options === null || options === void 0 ? void 0 : options.attributesToRetrieve,
                  attributesToCrop: options === null || options === void 0 ? void 0 : options.attributesToCrop,
                  attributesToHighlight: options === null || options === void 0 ? void 0 : options.attributesToHighlight
                };
                if (!(method.toUpperCase() === 'POST')) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , this.httpRequest.post(url, removeUndefinedFromObject(params), undefined, config)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];

              case 2:
                if (!(method.toUpperCase() === 'GET')) return [3
                /*break*/
                , 4];
                getParams = __assign(__assign({}, params), {
                  facetFilters: Array.isArray(options === null || options === void 0 ? void 0 : options.facetFilters) && (options === null || options === void 0 ? void 0 : options.facetFilters) ? JSON.stringify(options.facetFilters) : undefined,
                  facetsDistribution: (options === null || options === void 0 ? void 0 : options.facetsDistribution) ? JSON.stringify(options.facetsDistribution) : undefined,
                  attributesToRetrieve: (options === null || options === void 0 ? void 0 : options.attributesToRetrieve) ? options.attributesToRetrieve.join(',') : undefined,
                  attributesToCrop: (options === null || options === void 0 ? void 0 : options.attributesToCrop) ? options.attributesToCrop.join(',') : undefined,
                  attributesToHighlight: (options === null || options === void 0 ? void 0 : options.attributesToHighlight) ? options.attributesToHighlight.join(',') : undefined
                });
                return [4
                /*yield*/
                , this.httpRequest.get(url, removeUndefinedFromObject(getParams), config)];

              case 3:
                return [2
                /*return*/
                , _a.sent()];

              case 4:
                throw new MeiliSearchError('method parameter should be either POST or GET');
            }
          });
        });
      }; ///
      /// INDEX
      ///

      /**
       * Get index information.
       * @memberof Index
       * @method getRawInfo
       */


      Index.prototype.getRawInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url, res;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.indexRoute(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                res = _a.sent();
                this.primaryKey = res.primaryKey;
                return [2
                /*return*/
                , res];
            }
          });
        });
      };
      /**
       * Fetch and update Index information.
       * @memberof Index
       * @method fetchInfo
       */


      Index.prototype.fetchInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , this.getRawInfo()];

              case 1:
                _a.sent();

                return [2
                /*return*/
                , this];
            }
          });
        });
      };
      /**
       * Get Primary Key.
       * @memberof Index
       * @method fetchPrimaryKey
       */


      Index.prototype.fetchPrimaryKey = function () {
        return __awaiter(this, void 0, void 0, function () {
          var _a;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _a = this;
                return [4
                /*yield*/
                , this.getRawInfo()];

              case 1:
                _a.primaryKey = _b.sent().primaryKey;
                return [2
                /*return*/
                , this.primaryKey];
            }
          });
        });
      };
      /**
       * Create an index.
       * @memberof Index
       * @method create
       */


      Index.create = function (config, uid, options) {
        if (options === void 0) {
          options = {};
        }

        return __awaiter(this, void 0, void 0, function () {
          var url, req, index;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.apiRoutes.indexes;
                req = new HttpRequests(config);
                return [4
                /*yield*/
                , req.post(url, __assign(__assign({}, options), {
                  uid: uid
                }))];

              case 1:
                index = _a.sent();
                return [2
                /*return*/
                , new Index(config, uid, index.primaryKey)];
            }
          });
        });
      };
      /**
       * Update an index.
       * @memberof Index
       * @method update
       */


      Index.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
          var url, index;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.update(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.put(url, data)];

              case 1:
                index = _a.sent();
                this.primaryKey = index.primaryKey;
                return [2
                /*return*/
                , this];
            }
          });
        });
      };
      /**
       * Delete an index.
       * @memberof Index
       * @method delete
       */


      Index.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors["delete"](this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// STATS
      ///

      /**
       * get stats of an index
       * @memberof Index
       * @method getStats
       */


      Index.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = "/indexes/" + this.uid + "/stats";
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// DOCUMENTS
      ///

      /**
       * get documents of an index
       * @memberof Index
       * @method getDocuments
       */


      Index.prototype.getDocuments = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var url, attr;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getDocuments(this.uid);

                if (options !== undefined && Array.isArray(options.attributesToRetrieve)) {
                  attr = options.attributesToRetrieve.join(',');
                }

                return [4
                /*yield*/
                , this.httpRequest.get(url, __assign(__assign({}, options), attr !== undefined ? {
                  attributesToRetrieve: attr
                } : {}))];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Get one document
       * @memberof Index
       * @method getDocument
       */


      Index.prototype.getDocument = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getDocument(this.uid, documentId);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Add or replace multiples documents to an index
       * @memberof Index
       * @method addDocuments
       */


      Index.prototype.addDocuments = function (documents, options) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.addDocuments(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, documents, options)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Add or update multiples documents to an index
       * @memberof Index
       * @method updateDocuments
       */


      Index.prototype.updateDocuments = function (documents, options) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateDocuments(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.put(url, documents, options)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Delete one document
       * @memberof Index
       * @method deleteDocument
       */


      Index.prototype.deleteDocument = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.deleteDocument(this.uid, documentId);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Delete multiples documents of an index
       * @memberof Index
       * @method deleteDocuments
       */


      Index.prototype.deleteDocuments = function (documentsIds) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.deleteDocuments(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, documentsIds)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Delete all documents of an index
       * @memberof Index
       * @method deleteAllDocuments
       */


      Index.prototype.deleteAllDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.deleteAllDocuments(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// SETTINGS
      ///

      /**
       * Retrieve all settings
       * @memberof Index
       * @method getSettings
       */


      Index.prototype.getSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getSettings(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update all settings
       * Any parameters not provided will be left unchanged.
       * @memberof Index
       * @method updateSettings
       */


      Index.prototype.updateSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateSettings(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, settings)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset settings.
       * @memberof Index
       * @method resetSettings
       */


      Index.prototype.resetSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetSettings(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// SYNONYMS
      ///

      /**
       * Get the list of all synonyms
       * @memberof Index
       * @method getSynonyms
       */


      Index.prototype.getSynonyms = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getSynonyms(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the list of synonyms. Overwrite the old list.
       * @memberof Index
       * @method updateSynonyms
       */


      Index.prototype.updateSynonyms = function (synonyms) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateSynonyms(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, synonyms)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the synonym list to be empty again
       * @memberof Index
       * @method resetSynonyms
       */


      Index.prototype.resetSynonyms = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetSynonyms(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// STOP WORDS
      ///

      /**
       * Get the list of all stop-words
       * @memberof Index
       * @method getStopWords
       */


      Index.prototype.getStopWords = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getStopWords(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the list of stop-words. Overwrite the old list.
       * @memberof Index
       * @method updateStopWords
       */


      Index.prototype.updateStopWords = function (stopWords) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateStopWords(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, stopWords)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the stop-words list to be empty again
       * @memberof Index
       * @method resetStopWords
       */


      Index.prototype.resetStopWords = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetStopWords(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// RANKING RULES
      ///

      /**
       * Get the list of all ranking-rules
       * @memberof Index
       * @method getRankingRules
       */


      Index.prototype.getRankingRules = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getRankingRules(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the list of ranking-rules. Overwrite the old list.
       * @memberof Index
       * @method updateRankingRules
       */


      Index.prototype.updateRankingRules = function (rankingRules) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateRankingRules(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, rankingRules)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the ranking rules list to its default value
       * @memberof Index
       * @method resetRankingRules
       */


      Index.prototype.resetRankingRules = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetRankingRules(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// DISTINCT ATTRIBUTE
      ///

      /**
       * Get the distinct-attribute
       * @memberof Index
       * @method getDistinctAttribute
       */


      Index.prototype.getDistinctAttribute = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getDistinctAttribute(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the distinct-attribute.
       * @memberof Index
       * @method updateDistinctAttribute
       */


      Index.prototype.updateDistinctAttribute = function (distinctAttribute) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateDistinctAttribute(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, distinctAttribute)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the distinct-attribute.
       * @memberof Index
       * @method resetDistinctAttribute
       */


      Index.prototype.resetDistinctAttribute = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetDistinctAttribute(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// ATTRIBUTES FOR FACETING
      ///

      /**
       * Get the attributes-for-faceting
       * @memberof Index
       * @method getAttributesForFaceting
       */


      Index.prototype.getAttributesForFaceting = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getAttributesForFaceting(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the attributes-for-faceting.
       * @memberof Index
       * @method updateAttributesForFaceting
       */


      Index.prototype.updateAttributesForFaceting = function (attributesForFaceting) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateAttributesForFaceting(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, attributesForFaceting)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the attributes-for-faceting.
       * @memberof Index
       * @method resetAttributesForFaceting
       */


      Index.prototype.resetAttributesForFaceting = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetAttributesForFaceting(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// SEARCHABLE ATTRIBUTE
      ///

      /**
       * Get the searchable-attributes
       * @memberof Index
       * @method getSearchableAttributes
       */


      Index.prototype.getSearchableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getSearchableAttributes(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the searchable-attributes.
       * @memberof Index
       * @method updateSearchableAttributes
       */


      Index.prototype.updateSearchableAttributes = function (searchableAttributes) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateSearchableAttributes(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, searchableAttributes)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the searchable-attributes.
       * @memberof Index
       * @method resetSearchableAttributes
       */


      Index.prototype.resetSearchableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetSearchableAttributes(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// DISPLAYED ATTRIBUTE
      ///

      /**
       * Get the displayed-attributes
       * @memberof Index
       * @method getDisplayedAttributes
       */


      Index.prototype.getDisplayedAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.getDisplayedAttributes(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update the displayed-attributes.
       * @memberof Index
       * @method updateDisplayedAttributes
       */


      Index.prototype.updateDisplayedAttributes = function (displayedAttributes) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.updateDisplayedAttributes(this.uid);
                return [4
                /*yield*/
                , this.httpRequest.post(url, displayedAttributes)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Reset the displayed-attributes.
       * @memberof Index
       * @method resetDisplayedAttributes
       */


      Index.prototype.resetDisplayedAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = Index.routeConstructors.resetDisplayedAttributes(this.uid);
                return [4
                /*yield*/
                , this.httpRequest["delete"](url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      Index.apiRoutes = {
        indexes: 'indexes'
      };
      Index.routeConstructors = {
        indexRoute: function indexRoute(indexUid) {
          return Index.apiRoutes.indexes + "/" + indexUid;
        },
        getUpdateStatus: function getUpdateStatus(indexUid, updateId) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + ("updates/" + updateId);
        },
        getAllUpdateStatus: function getAllUpdateStatus(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "updates";
        },
        search: function search(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "search";
        },
        getRawInfo: function getRawInfo(indexUid) {
          return "indexes/" + indexUid;
        },
        update: function update(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid);
        },
        "delete": function _delete(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid);
        },
        getStats: function getStats(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "stats";
        },
        getDocument: function getDocument(indexUid, documentId) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + ("documents/" + documentId);
        },
        getDocuments: function getDocuments(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "documents";
        },
        addDocuments: function addDocuments(indexUid) {
          return Index.routeConstructors.getDocuments(indexUid);
        },
        updateDocuments: function updateDocuments(indexUid) {
          return Index.routeConstructors.getDocuments(indexUid);
        },
        deleteAllDocuments: function deleteAllDocuments(indexUid) {
          return Index.routeConstructors.getDocuments(indexUid);
        },
        deleteDocument: function deleteDocument(indexUid, documentId) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + ("documents/" + documentId);
        },
        deleteDocuments: function deleteDocuments(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "documents/delete-batch";
        },
        getSettings: function getSettings(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings";
        },
        updateSettings: function updateSettings(indexUid) {
          return Index.routeConstructors.getSettings(indexUid);
        },
        resetSettings: function resetSettings(indexUid) {
          return Index.routeConstructors.getSettings(indexUid);
        },
        getSynonyms: function getSynonyms(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/synonyms";
        },
        updateSynonyms: function updateSynonyms(indexUid) {
          return Index.routeConstructors.getSynonyms(indexUid);
        },
        resetSynonyms: function resetSynonyms(indexUid) {
          return Index.routeConstructors.getSynonyms(indexUid);
        },
        getStopWords: function getStopWords(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/stop-words";
        },
        updateStopWords: function updateStopWords(indexUid) {
          return Index.routeConstructors.getStopWords(indexUid);
        },
        resetStopWords: function resetStopWords(indexUid) {
          return Index.routeConstructors.getStopWords(indexUid);
        },
        getRankingRules: function getRankingRules(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/ranking-rules";
        },
        updateRankingRules: function updateRankingRules(indexUid) {
          return Index.routeConstructors.getRankingRules(indexUid);
        },
        resetRankingRules: function resetRankingRules(indexUid) {
          return Index.routeConstructors.getRankingRules(indexUid);
        },
        getDistinctAttribute: function getDistinctAttribute(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/distinct-attribute";
        },
        updateDistinctAttribute: function updateDistinctAttribute(indexUid) {
          return Index.routeConstructors.getDistinctAttribute(indexUid);
        },
        resetDistinctAttribute: function resetDistinctAttribute(indexUid) {
          return Index.routeConstructors.getDistinctAttribute(indexUid);
        },
        getAttributesForFaceting: function getAttributesForFaceting(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/attributes-for-faceting";
        },
        updateAttributesForFaceting: function updateAttributesForFaceting(indexUid) {
          return Index.routeConstructors.getAttributesForFaceting(indexUid);
        },
        resetAttributesForFaceting: function resetAttributesForFaceting(indexUid) {
          return Index.routeConstructors.getAttributesForFaceting(indexUid);
        },
        getSearchableAttributes: function getSearchableAttributes(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/searchable-attributes";
        },
        updateSearchableAttributes: function updateSearchableAttributes(indexUid) {
          return Index.routeConstructors.getSearchableAttributes(indexUid);
        },
        resetSearchableAttributes: function resetSearchableAttributes(indexUid) {
          return Index.routeConstructors.getSearchableAttributes(indexUid);
        },
        getDisplayedAttributes: function getDisplayedAttributes(indexUid) {
          return Index.routeConstructors.indexRoute(indexUid) + '/' + "settings/displayed-attributes";
        },
        updateDisplayedAttributes: function updateDisplayedAttributes(indexUid) {
          return Index.routeConstructors.getDisplayedAttributes(indexUid);
        },
        resetDisplayedAttributes: function resetDisplayedAttributes(indexUid) {
          return Index.routeConstructors.getDisplayedAttributes(indexUid);
        }
      };
      return Index;
    }();

    /*
     * Bundle: MeiliSearch
     * Project: MeiliSearch - Javascript API
     * Author: Quentin de Quelen <quentin@meilisearch.com>
     * Copyright: 2019, MeiliSearch
     */

    var MeiliSearch =
    /** @class */
    function () {
      function MeiliSearch(config) {
        config.host = HttpRequests.addTrailingSlash(config.host);
        this.config = config;
        this.httpRequest = new HttpRequests(config);
      }

      MeiliSearch.getApiRoutes = function () {
        return MeiliSearch.apiRoutes;
      };

      MeiliSearch.getRouteConstructors = function () {
        return MeiliSearch.routeConstructors;
      };
      /**
       * Return an Index instance
       * @memberof MeiliSearch
       * @method index
       */


      MeiliSearch.prototype.index = function (indexUid) {
        return new Index(this.config, indexUid);
      };
      /**
       * Gather information about an index by calling MeiliSearch and
       * return an Index instance with the gathered information
       * @memberof MeiliSearch
       * @method getIndex
       */


      MeiliSearch.prototype.getIndex = function (indexUid) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2
            /*return*/
            , new Index(this.config, indexUid).fetchInfo()];
          });
        });
      };
      /**
       * Get an index or create it if it does not exist
       * @memberof MeiliSearch
       * @method getOrCreateIndex
       */


      MeiliSearch.prototype.getOrCreateIndex = function (uid, options) {
        if (options === void 0) {
          options = {};
        }

        return __awaiter(this, void 0, void 0, function () {
          var index, e_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2,, 3]);

                return [4
                /*yield*/
                , this.getIndex(uid)];

              case 1:
                index = _a.sent();
                return [2
                /*return*/
                , index];

              case 2:
                e_1 = _a.sent();

                if (e_1.errorCode === 'index_not_found') {
                  return [2
                  /*return*/
                  , this.createIndex(uid, options)];
                }

                throw new MeiliSearchApiError(e_1, e_1.status);

              case 3:
                return [2
                /*return*/
                ];
            }
          });
        });
      };
      /**
       * List all indexes in the database
       * @memberof MeiliSearch
       * @method listIndexes
       */


      MeiliSearch.prototype.listIndexes = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = MeiliSearch.apiRoutes.listIndexes;
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Create a new index
       * @memberof MeiliSearch
       * @method createIndex
       */


      MeiliSearch.prototype.createIndex = function (uid, options) {
        if (options === void 0) {
          options = {};
        }

        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , Index.create(this.config, uid, options)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Update an index
       * @memberof MeiliSearch
       * @method updateIndex
       */


      MeiliSearch.prototype.updateIndex = function (uid, options) {
        if (options === void 0) {
          options = {};
        }

        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2
            /*return*/
            , new Index(this.config, uid).update(options)];
          });
        });
      };
      /**
       * Delete an index
       * @memberof MeiliSearch
       * @method deleteIndex
       */


      MeiliSearch.prototype.deleteIndex = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2
            /*return*/
            , new Index(this.config, uid)["delete"]()];
          });
        });
      }; ///
      /// KEYS
      ///

      /**
       * Get private and public key
       * @memberof MeiliSearch
       * @method getKey
       */


      MeiliSearch.prototype.getKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = MeiliSearch.apiRoutes.getKeys;
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// HEALTH
      ///

      /**
       * Checks if the server is healthy, otherwise an error will be thrown.
       *
       * @memberof MeiliSearch
       * @method health
       */


      MeiliSearch.prototype.health = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4
                /*yield*/
                , this.httpRequest.get(MeiliSearch.apiRoutes.health)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Checks if the server is healthy, return true or false.
       *
       * @memberof MeiliSearch
       * @method isHealthy
       */


      MeiliSearch.prototype.isHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2,, 3]);

                return [4
                /*yield*/
                , this.httpRequest.get(MeiliSearch.apiRoutes.health)];

              case 1:
                _a.sent();

                return [2
                /*return*/
                , true];

              case 2:
                _a.sent();
                return [2
                /*return*/
                , false];

              case 3:
                return [2
                /*return*/
                ];
            }
          });
        });
      }; ///
      /// STATS
      ///

      /**
       * Get the stats of all the database
       * @memberof MeiliSearch
       * @method stats
       */


      MeiliSearch.prototype.stats = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = MeiliSearch.apiRoutes.stats;
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Get the version of MeiliSearch
       * @memberof MeiliSearch
       * @method version
       */


      MeiliSearch.prototype.version = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = MeiliSearch.apiRoutes.version;
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      }; ///
      /// DUMPS
      ///

      /**
       * Triggers a dump creation process
       * @memberof MeiliSearch
       * @method createDump
       */


      MeiliSearch.prototype.createDump = function () {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = MeiliSearch.apiRoutes.createDump;
                return [4
                /*yield*/
                , this.httpRequest.post(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };
      /**
       * Get the status of a dump creation process
       * @memberof MeiliSearch
       * @method getDumpStatus
       */


      MeiliSearch.prototype.getDumpStatus = function (dumpUid) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                url = MeiliSearch.routeConstructors.getDumpStatus(dumpUid);
                return [4
                /*yield*/
                , this.httpRequest.get(url)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      MeiliSearch.apiRoutes = {
        listIndexes: 'indexes',
        getKeys: 'keys',
        health: 'health',
        stats: 'stats',
        version: 'version',
        createDump: 'dumps'
      };
      MeiliSearch.routeConstructors = {
        getDumpStatus: function getDumpStatus(dumpUid) {
          return "dumps/" + dumpUid + "/status";
        }
      };
      return MeiliSearch;
    }();

    exports.MeiliSearch = MeiliSearch;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"cross-fetch/polyfill":"CQH0"}],"rF0s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _Api = _interopRequireDefault(require("../../Common/js/Api.js"));

var _vueSliderComponent = _interopRequireDefault(require("vue-slider-component"));

require("vue-slider-component/theme/antd.css");

var _DatePicker = _interopRequireDefault(require("./components/DatePicker"));

var _Pagination = _interopRequireDefault(require("./components/Pagination"));

var _Hits = _interopRequireDefault(require("./components/Hits"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _meilisearch = require("meilisearch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  data: function data() {
    return {
      loading: false,
      searchClient: null,
      meilisearchUrl: null,
      meilisearchKey: null,
      searchString: null,
      fees: null,
      filterFields: [],
      filterValues: {},
      limit: 12,
      offset: 0,
      nbHits: 0,
      hits: [],
      meilisearchFail: false
    };
  },
  components: {
    Hits: _Hits.default,
    VueSlider: _vueSliderComponent.default,
    DatePicker: _DatePicker.default,
    Pagination: _Pagination.default
  },
  watch: {
    searchString: function searchString() {
      var _this = this;

      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.querySearch();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    limit: function limit() {
      this.search();
    }
  },
  created: function created() {
    this.loadData();
  },
  methods: {
    querySearch: (0, _debounce.default)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.search();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })), 500),
    loadData: function loadData() {
      var _this2 = this;

      var formData = new FormData();
      formData.append("action", "get_meilisearch_key");

      var setSearchClient = _Api.default.post(ajaxurl, formData).then(function (response) {
        _this2.meilisearchUrl = response.data.url;
        _this2.meilisearchKey = response.data.key;
        _this2.searchClient = new _meilisearch.MeiliSearch({
          host: _this2.meilisearchUrl,
          apiKey: _this2.meilisearchKey
        });
      });

      formData = new FormData();
      formData.append("action", "get_xml_fields");

      var xmlFieldsPromise = _Api.default.post(ajaxurl, formData).then(function (response) {
        var _iterator = _createForOfIteratorHelper(response.data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var field = _step.value;

            if (!field.filter) {
              continue;
            }

            if (field.filter === 'disabled') {
              continue;
            }

            var filter = {
              type: field.filter,
              field: field.slug,
              title: field.title
            };

            if (field.filter === 'slider') {
              filter.max = field.max;
              filter.min = field.min;

              if (filter.max === filter.min) {
                continue;
              }

              _this2.$set(_this2.filterValues, field.slug, [field.min, field.max]);
            }

            if (field.filter === 'checkbox') {
              filter.values = field.values;

              _this2.$set(_this2.filterValues, field.slug, []);
            }

            _this2.filterFields.push(filter);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });

      Promise.all([xmlFieldsPromise, setSearchClient]).then(function () {
        _this2.search();
      });
    },
    search: function search() {
      var _this3 = this;

      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var filters, facets, searchParams, search;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this3.searchClient) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _this3.loading = true;
                filters = _this3.getFilters();
                facets = _this3.getFacets();
                searchParams = {};

                if (filters.length) {
                  searchParams.filters = filters.join(' AND ');
                }

                if (facets.length) {
                  searchParams.facetFilters = facets;
                }

                searchParams.limit = _this3.limit;
                searchParams.offset = _this3.offset;
                _context3.prev = 10;
                _context3.next = 13;
                return _this3.searchClient.index('loc_catalogue_item').search(_this3.searchString, searchParams);

              case 13:
                search = _context3.sent;
                _this3.hits = search.hits;
                _this3.nbHits = search.nbHits;
                _context3.next = 21;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](10);
                _this3.meilisearchFail = true;

              case 21:
                _this3.loading = false;

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[10, 18]]);
      }))();
    },
    getFilters: function getFilters() {
      var filters = [];

      var _iterator2 = _createForOfIteratorHelper(this.filterFields),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var filterField = _step2.value;

          if (!this.filterValues[filterField.field]) {
            continue;
          }

          var value = this.filterValues[filterField.field];
          var slug = filterField.field;

          if (filterField.type === 'slider') {
            if (value[0] == filterField.min && value[1] == filterField.max) {
              continue;
            }

            filters.push(" ((" + slug + " >= " + value[0] + " AND " + slug + " <= " + value[1] + ") OR " + slug + " = '') ");
          }

          if (filterField.type === 'date') {
            if (!value[0] && value[1] == filterField.max) {
              continue;
            }

            filters.push(" ((" + slug + " >= " + value[0] + " AND " + slug + " <= " + value[1] + ") OR " + slug + " = '') ");
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return filters;
    },
    getFacets: function getFacets() {
      var facets = [];

      var _iterator3 = _createForOfIteratorHelper(this.filterFields),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var filterField = _step3.value;

          if (!this.filterValues[filterField.field]) {
            continue;
          }

          var values = this.filterValues[filterField.field];
          var slug = filterField.field;

          if (filterField.type === 'checkbox') {
            var facetItems = [];

            var _iterator4 = _createForOfIteratorHelper(values),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var value = _step4.value;

                if (value) {
                  facetItems.push(slug + ":" + value);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            if (facetItems.length) {
              facets.push(facetItems);
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return facets;
    },
    filterDate: function filterDate(dates, slug) {
      if (!dates) {
        this.filterValues[slug] = null;
        this.search();
        return;
      }

      this.filterValues[slug] = [dates.start.getTime() / 1000, dates.end.getTime() / 1000];
      this.search();
    },
    updateOffset: function updateOffset(offset) {
      this.offset = offset;
      this.search();
    }
  }
};
exports.default = _default;
        var $2347e7 = exports.default || module.exports;
      
      if (typeof $2347e7 === 'function') {
        $2347e7 = $2347e7.options;
      }
    
        /* template */
        Object.assign($2347e7, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"grid grid-cols-4 gap-10"},[_c('div',{staticClass:"col-span-1"}),_vm._v(" "),_c('div',{staticClass:"col-span-3 flex justify-between"},[_c('div',[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.limit),expression:"limit"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.limit=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{domProps:{"value":3}},[_vm._v("3")]),_vm._v(" "),_c('option',{domProps:{"value":6}},[_vm._v("6")]),_vm._v(" "),_c('option',{domProps:{"value":12}},[_vm._v("12")]),_vm._v(" "),_c('option',{domProps:{"value":24}},[_vm._v("24")]),_vm._v(" "),_c('option',{domProps:{"value":48}},[_vm._v("48")]),_vm._v(" "),_c('option',{domProps:{"value":96}},[_vm._v("96")])])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchString),expression:"searchString"}],attrs:{"placeholder":_vm.$t('Search...'),"type":"text"},domProps:{"value":(_vm.searchString)},on:{"input":function($event){if($event.target.composing){ return; }_vm.searchString=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"col-span-1"},_vm._l((_vm.filterFields),function(filterField,index){return _c('div',{key:index,staticClass:" mb-5"},[_c('h4',{staticClass:"mb-3"},[_vm._v(_vm._s(filterField.title))]),_vm._v(" "),(filterField.type === 'date')?_c('date-picker',{on:{"input":function($event){return _vm.filterDate($event, filterField.field)}}}):(filterField.type === 'slider')?_c('vue-slider',{attrs:{"min":filterField.min,"max":filterField.max,"lazy":true},on:{"change":function($event){return _vm.search()}},model:{value:(_vm.filterValues[filterField.field]),callback:function ($$v) {_vm.$set(_vm.filterValues, filterField.field, $$v)},expression:"filterValues[filterField.field]"}}):_c('ul',{staticClass:"list-none p-0"},_vm._l((filterField.values),function(value,key){return _c('li',{key:key,staticClass:"flex items-center"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterValues[filterField.field]),expression:"filterValues[filterField.field]"}],attrs:{"type":"checkbox"},domProps:{"value":key,"checked":Array.isArray(_vm.filterValues[filterField.field])?_vm._i(_vm.filterValues[filterField.field],key)>-1:(_vm.filterValues[filterField.field])},on:{"change":[function($event){var $$a=_vm.filterValues[filterField.field],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=key,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.filterValues, filterField.field, $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.filterValues, filterField.field, $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.filterValues, filterField.field, $$c)}},function($event){return _vm.search()}]}}),_vm._v(" "),_c('span',{staticClass:"ml-5"},[_vm._v(_vm._s(value))])])}),0)],1)}),0),_vm._v(" "),_c('div',{staticClass:"col-span-3"},[(_vm.loading)?_c('div',{staticClass:"loader"},[_vm._v(_vm._s(_vm.$t('Loading...')))]):_vm._e(),_vm._v(" "),(_vm.meilisearchFail)?_c('span',[_vm._v("\n              "+_vm._s(_vm.$t('There is a problem with search engine. Try using default wordpress search at top of the page...'))+"\n            ")]):_c('hits',{attrs:{"hits":_vm.hits}})],1),_vm._v(" "),_c('div',{staticClass:"col-span-4"},[_c('pagination',{attrs:{"limit":_vm.limit,"offset":_vm.offset,"nb-hits":_vm.nbHits},on:{"update-offset":function($event){return _vm.updateOffset($event)}}})],1)])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"@babel/runtime/helpers/asyncToGenerator":"agGE","@babel/runtime/regenerator":"PMvg","../../Common/js/Api.js":"XPwX","vue-slider-component":"SdYw","vue-slider-component/theme/antd.css":"KlXm","./components/DatePicker":"Gcav","./components/Pagination":"aRaC","./components/Hits":"yiHz","lodash/debounce":"CXfR","meilisearch":"yYQX"}],"LVLt":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.config.productionTip = false;
var _x = wp.i18n._x;
_vue.default.prototype.$t = _x;

if (document.getElementById("search-catalog-items")) {
  new _vue.default({
    // store,
    el: "#search-catalog-items",
    // router,
    render: function render(h) {
      return h(_App.default);
    }
  });
}
},{"vue":"QPfz","./App.vue":"rF0s"}],"dCOt":[function(require,module,exports) {
/**
 * All of the code for your public-facing JavaScript belongs in this directory, split into as many JS files as you wish,
 * such as just this one or feel free to add additional JS files.
 *
 * All *.js files in this directory get included in a build process.
 * The single/concatenated .js file gets enqueued from src/Frontend/class-Assets.php.
 */
(function (frontend, $) {
  $(document).ready(function () {
    // @TODO This is an example console.log(). Remove for production.
    console.log('hello from Frontend. jQuery $ is working.');
    $('.loc-show-other-information').on('click', function () {
      $('.loc-other-information').removeClass('hidden');
      $('.loc-hide-other-information').removeClass('hidden');
      $('.loc-show-other-information').addClass('hidden');
    });
    $('.loc-hide-other-information').on('click', function () {
      $('.loc-other-information').addClass('hidden');
      $('.loc-hide-other-information').addClass('hidden');
      $('.loc-show-other-information').removeClass('hidden');
    });
  });
})(window.frontend = window.frontend || {}, jQuery);
},{}],"WWoB":[function(require,module,exports) {
module.exports = {
  "main": require("./main.js"),
  "index": require("./index.js")
};
},{"./main.js":"LVLt","./index.js":"dCOt"}],"LJu5":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("../src/Common/pcss/*.pcss"));

var _2 = _interopRequireDefault(require("../src/Frontend/pcss/*.pcss"));

var _3 = _interopRequireDefault(require("../src/Common/js/*.js"));

var _4 = _interopRequireDefault(require("../src/Frontend/js/*.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"../src/Common/pcss/*.pcss":"BEhD","../src/Frontend/pcss/*.pcss":"b6iZ","../src/Common/js/*.js":"uI9n","../src/Frontend/js/*.js":"WWoB"}]},{},["LJu5"], null)