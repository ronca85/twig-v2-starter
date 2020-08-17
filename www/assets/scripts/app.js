(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _default = /*#__PURE__*/function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.mAttr = 'data-' + options.dataName;
      this.mCaptureEvents = ['mouseenter', 'mouseleave'];
      this.el = options.el;
    }

    _createClass(_default, [{
      key: "mInit",
      value: function mInit(modules) {
        var _this = this;

        this.modules = modules;
        this.mCheckEventTarget = this.mCheckEventTarget.bind(this);

        if (this.events) {
          Object.keys(this.events).forEach(function (event) {
            return _this.mAddEvent(event);
          });
        }
      }
    }, {
      key: "mUpdate",
      value: function mUpdate(modules) {
        this.modules = modules;
      }
    }, {
      key: "mDestroy",
      value: function mDestroy() {
        var _this2 = this;

        if (this.events) {
          Object.keys(this.events).forEach(function (event) {
            return _this2.mRemoveEvent(event);
          });
        }
      }
    }, {
      key: "mAddEvent",
      value: function mAddEvent(event) {
        var capture = this.mCaptureEvents.includes(event) ? true : false;
        this.el.addEventListener(event, this.mCheckEventTarget, capture);
      }
    }, {
      key: "mRemoveEvent",
      value: function mRemoveEvent(event) {
        var capture = this.mCaptureEvents.includes(event) ? true : false;
        this.el.removeEventListener(event, this.mCheckEventTarget, capture);
      }
    }, {
      key: "mCheckEventTarget",
      value: function mCheckEventTarget(e) {
        var event = this.events[e.type];

        if (typeof event === "string") {
          this[event](e);
        } else {
          var data = '[' + this.mAttr + ']';
          var target = e.target;

          if (this.mCaptureEvents.includes(e.type)) {
            if (target.matches(data)) {
              this.mCallEventMethod(e, event, target);
            }
          } else {
            while (target && target !== document) {
              if (target.matches(data)) {
                if (this.mCallEventMethod(e, event, target) != 'undefined') {
                  break;
                }
              }

              target = target.parentNode;
            }
          }
        }
      }
    }, {
      key: "mCallEventMethod",
      value: function mCallEventMethod(e, event, target) {
        var name = target.getAttribute(this.mAttr);

        if (event.hasOwnProperty(name)) {
          var method = event[name];

          if (!e.hasOwnProperty('currentTarget')) {
            Object.defineProperty(e, 'currentTarget', {
              value: target
            });
          }

          if (!e.hasOwnProperty('curTarget')) {
            Object.defineProperty(e, 'curTarget', {
              value: target
            }); // For IE 11
          }

          this[method](e);
        }
      }
    }, {
      key: "$",
      value: function $(query, context) {
        var classIndex = query.indexOf('.');
        var idIndex = query.indexOf('#');
        var attrIndex = query.indexOf('[');
        var indexes = [classIndex, idIndex, attrIndex].filter(function (index) {
          return index != -1;
        });
        var index = false;
        var name = query;
        var more = '';
        var parent = this.el;

        if (indexes.length) {
          index = Math.min.apply(Math, _toConsumableArray(indexes));
          name = query.slice(0, index);
          more = query.slice(index);
        }

        if (_typeof(context) == 'object') {
          parent = context;
        }

        return parent.querySelectorAll('[' + this.mAttr + '=' + name + ']' + more);
      }
    }, {
      key: "parent",
      value: function parent(query, context) {
        var data = '[' + this.mAttr + '=' + query + ']';
        var parent = context.parentNode;

        while (parent && parent !== document) {
          if (parent.matches(data)) {
            return parent;
          }

          parent = parent.parentNode;
        }
      }
    }, {
      key: "getData",
      value: function getData(name, context) {
        var target = context || this.el;
        return target.getAttribute(this.mAttr + '-' + name);
      }
    }, {
      key: "setData",
      value: function setData(name, value, context) {
        var target = context || this.el;
        return target.setAttribute(this.mAttr + '-' + name, value);
      }
    }, {
      key: "call",
      value: function call(func, args, mod, id) {
        var _this3 = this;

        if (args && !mod) {
          mod = args;
          args = false;
        }

        if (this.modules[mod]) {
          if (id) {
            if (this.modules[mod][id]) {
              this.modules[mod][id][func](args);
            }
          } else {
            Object.keys(this.modules[mod]).forEach(function (id) {
              _this3.modules[mod][id][func](args);
            });
          }
        }
      }
    }, {
      key: "on",
      value: function on(e, mod, func, id) {
        var _this4 = this;

        if (this.modules[mod]) {
          if (id) {
            this.modules[mod][id].el.addEventListener(e, function (o) {
              return func(o);
            });
          } else {
            Object.keys(this.modules[mod]).forEach(function (i) {
              _this4.modules[mod][i].el.addEventListener(e, function (o) {
                return func(o);
              });
            });
          }
        }
      }
    }, {
      key: "init",
      value: function init() {}
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);

    return _default;
  }();

  var _default$1 = /*#__PURE__*/function () {
    function _default(options) {
      _classCallCheck(this, _default);

      this.app;
      this.modules = options.modules;
      this.currentModules = {};
      this.activeModules = {};
      this.newModules = {};
      this.moduleId = 0;
    }

    _createClass(_default, [{
      key: "init",
      value: function init(app, scope) {
        var _this = this;

        var container = scope || document;
        var elements = container.querySelectorAll('*');

        if (app && !this.app) {
          this.app = app;
        }

        this.activeModules['app'] = {
          'app': this.app
        };
        elements.forEach(function (el) {
          Array.from(el.attributes).forEach(function (i) {
            if (i.name.startsWith('data-module')) {
              var moduleExists = false;
              var dataName = i.name.split('-').splice(2);

              var moduleName = _this.toCamel(dataName);

              if (_this.modules[moduleName]) {
                moduleExists = true;
              } else if (_this.modules[_this.toUpper(moduleName)]) {
                moduleName = _this.toUpper(moduleName);
                moduleExists = true;
              }

              if (moduleExists) {
                var options = {
                  el: el,
                  name: moduleName,
                  dataName: dataName.join('-')
                };
                var module = new _this.modules[moduleName](options);
                var id = i.value;

                if (!id) {
                  _this.moduleId++;
                  id = 'm' + _this.moduleId;
                  el.setAttribute(i.name, id);
                }

                _this.addActiveModule(moduleName, id, module);

                var moduleId = moduleName + '-' + id;

                if (scope) {
                  _this.newModules[moduleId] = module;
                } else {
                  _this.currentModules[moduleId] = module;
                }
              }
            }
          });
        });
        Object.entries(this.currentModules).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              id = _ref2[0],
              module = _ref2[1];

          if (scope) {
            var split = id.split('-');
            var moduleName = split.shift();
            var moduleId = split.pop();

            _this.addActiveModule(moduleName, moduleId, module);
          } else {
            _this.initModule(module);
          }
        });
      }
    }, {
      key: "initModule",
      value: function initModule(module) {
        module.mInit(this.activeModules);
        module.init();
      }
    }, {
      key: "addActiveModule",
      value: function addActiveModule(name, id, module) {
        if (this.activeModules[name]) {
          Object.assign(this.activeModules[name], _defineProperty({}, id, module));
        } else {
          this.activeModules[name] = _defineProperty({}, id, module);
        }
      }
    }, {
      key: "update",
      value: function update(scope) {
        var _this2 = this;

        this.init(this.app, scope);
        Object.entries(this.currentModules).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              id = _ref4[0],
              module = _ref4[1];

          module.mUpdate(_this2.activeModules);
        });
        Object.entries(this.newModules).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              id = _ref6[0],
              module = _ref6[1];

          _this2.initModule(module);
        });
        Object.assign(this.currentModules, this.newModules);
      }
    }, {
      key: "destroy",
      value: function destroy(scope) {
        if (scope) {
          this.destroyScope(scope);
        } else {
          this.destroyModules();
        }
      }
    }, {
      key: "destroyScope",
      value: function destroyScope(scope) {
        var _this3 = this;

        var elements = scope.querySelectorAll('*');
        elements.forEach(function (el) {
          Array.from(el.attributes).forEach(function (i) {
            if (i.name.startsWith('data-module')) {
              var id = i.value;
              var dataName = i.name.split('-').splice(2);
              var moduleName = _this3.toCamel(dataName) + '-' + id;
              var moduleExists = false;

              if (_this3.currentModules[moduleName]) {
                moduleExists = true;
              } else if (_this3.currentModules[_this3.toUpper(moduleName)]) {
                moduleName = _this3.toUpper(moduleName);
                moduleExists = true;
              }

              if (moduleExists) {
                _this3.destroyModule(_this3.currentModules[moduleName]);

                delete _this3.currentModules[moduleName];
              }
            }
          });
        });
        this.activeModules = {};
        this.newModules = {};
      }
    }, {
      key: "destroyModules",
      value: function destroyModules() {
        var _this4 = this;

        Object.entries(this.currentModules).forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              id = _ref8[0],
              module = _ref8[1];

          _this4.destroyModule(module);
        });
        this.currentModules = [];
      }
    }, {
      key: "destroyModule",
      value: function destroyModule(module) {
        module.mDestroy();
        module.destroy();
      }
    }, {
      key: "toCamel",
      value: function toCamel(arr) {
        var _this5 = this;

        return arr.reduce(function (a, b) {
          return a + _this5.toUpper(b);
        });
      }
    }, {
      key: "toUpper",
      value: function toUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }]);

    return _default;
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var svg4everybody = createCommonjsModule(function (module) {
  !function(root, factory) {
        module.exports ? // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory() : root.svg4everybody = factory();
  }(commonjsGlobal, function() {
      /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
      function embed(parent, svg, target) {
          // if the target exists
          if (target) {
              // create a document fragment to hold the contents of the target
              var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
              // conditionally set the viewBox on the svg
              viewBox && svg.setAttribute("viewBox", viewBox);
              // copy the contents of the clone into the fragment
              for (// clone the target
              var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                  fragment.appendChild(clone.firstChild);
              }
              // append the fragment into the svg
              parent.appendChild(fragment);
          }
      }
      function loadreadystatechange(xhr) {
          // listen to changes in the request
          xhr.onreadystatechange = function() {
              // if the request is ready
              if (4 === xhr.readyState) {
                  // get the cached html document
                  var cachedDocument = xhr._cachedDocument;
                  // ensure the cached html document based on the xhr response
                  cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                  cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                  xhr._embeds.splice(0).map(function(item) {
                      // get the cached target
                      var target = xhr._cachedTarget[item.id];
                      // ensure the cached target
                      target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                      // embed the target into the svg
                      embed(item.parent, item.svg, target);
                  });
              }
          }, // test the ready state change immediately
          xhr.onreadystatechange();
      }
      function svg4everybody(rawopts) {
          function oninterval() {
              // while the index exists in the live <use> collection
              for (// get the cached <use> index
              var index = 0; index < uses.length; ) {
                  // get the current <use>
                  var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                  if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                  svg && src) {
                      if (polyfill) {
                          if (!opts.validate || opts.validate(src, svg, use)) {
                              // remove the <use> element
                              parent.removeChild(use);
                              // parse the src and get the url and id
                              var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                              // if the link is external
                              if (url.length) {
                                  // get the cached xhr request
                                  var xhr = requests[url];
                                  // ensure the xhr request exists
                                  xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                  xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                  xhr._embeds.push({
                                      parent: parent,
                                      svg: svg,
                                      id: id
                                  }), // prepare the xhr ready state change event
                                  loadreadystatechange(xhr);
                              } else {
                                  // embed the local id into the svg
                                  embed(parent, svg, document.getElementById(id));
                              }
                          } else {
                              // increase the index when the previous value was not "valid"
                              ++index, ++numberOfSvgUseElementsToBypass;
                          }
                      }
                  } else {
                      // increase the index when the previous value was not "valid"
                      ++index;
                  }
              }
              // continue the interval
              (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
          }
          var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
          polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
          // create xhr requests object
          var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
          // conditionally start the interval if the polyfill is active
          polyfill && oninterval();
      }
      function getSVGAncestor(node) {
          for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
          return svg;
      }
      return svg4everybody;
  });
  });

  function t(t,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}function n(n,r,i){return r&&t(n.prototype,r),i&&t(n,i),n}function r(){return (r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);}return t}).apply(this,arguments)}function i(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;}function e(t){return (e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,n){return (o=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function u(t,n,r){return (u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return !1}}()?Reflect.construct:function(t,n,r){var i=[null];i.push.apply(i,n);var e=new(Function.bind.apply(t,i));return r&&o(e,r.prototype),e}).apply(null,arguments)}function s(t){var n="function"==typeof Map?new Map:void 0;return (s=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,r);}function r(){return u(t,arguments,e(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,t)})(t)}function f(t,n){try{var r=t();}catch(t){return n(t)}return r&&r.then?r.then(void 0,n):r}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var c,a="2.9.7",h=function(){};!function(t){t[t.off=0]="off",t[t.error=1]="error",t[t.warning=2]="warning",t[t.info=3]="info",t[t.debug=4]="debug";}(c||(c={}));var v=c.off,l=function(){function t(t){this.t=t;}t.getLevel=function(){return v},t.setLevel=function(t){return v=c[t]};var n=t.prototype;return n.error=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.error,c.error,n);},n.warn=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.warn,c.warning,n);},n.info=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.info,c.info,n);},n.debug=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.i(console.log,c.debug,n);},n.i=function(n,r,i){r<=t.getLevel()&&n.apply(console,["["+this.t+"] "].concat(i));},t}(),d=O,m=E,w=g,p=x,b=T,y="/",P=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function g(t,n){for(var r,i=[],e=0,o=0,u="",s=n&&n.delimiter||y,f=n&&n.whitelist||void 0,c=!1;null!==(r=P.exec(t));){var a=r[0],h=r[1],v=r.index;if(u+=t.slice(o,v),o=v+a.length,h)u+=h[1],c=!0;else {var l="",d=r[2],m=r[3],w=r[4],p=r[5];if(!c&&u.length){var b=u.length-1,g=u[b];(!f||f.indexOf(g)>-1)&&(l=g,u=u.slice(0,b));}u&&(i.push(u),u="",c=!1);var E=m||w,x=l||s;i.push({name:d||e++,prefix:l,delimiter:x,optional:"?"===p||"*"===p,repeat:"+"===p||"*"===p,pattern:E?A(E):"[^"+k(x===s?x:x+s)+"]+?"});}}return (u||o<t.length)&&i.push(u+t.substr(o)),i}function E(t,n){return function(r,i){var e=t.exec(r);if(!e)return !1;for(var o=e[0],u=e.index,s={},f=i&&i.decode||decodeURIComponent,c=1;c<e.length;c++)if(void 0!==e[c]){var a=n[c-1];s[a.name]=a.repeat?e[c].split(a.delimiter).map((function(t){return f(t,a)})):f(e[c],a);}return {path:o,index:u,params:s}}}function x(t,n){for(var r=new Array(t.length),i=0;i<t.length;i++)"object"==typeof t[i]&&(r[i]=new RegExp("^(?:"+t[i].pattern+")$",R(n)));return function(n,i){for(var e="",o=i&&i.encode||encodeURIComponent,u=!i||!1!==i.validate,s=0;s<t.length;s++){var f=t[s];if("string"!=typeof f){var c,a=n?n[f.name]:void 0;if(Array.isArray(a)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but got array');if(0===a.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var h=0;h<a.length;h++){if(c=o(a[h],f),u&&!r[s].test(c))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'"');e+=(0===h?f.prefix:f.delimiter)+c;}}else if("string"!=typeof a&&"number"!=typeof a&&"boolean"!=typeof a){if(!f.optional)throw new TypeError('Expected "'+f.name+'" to be '+(f.repeat?"an array":"a string"))}else {if(c=o(String(a),f),u&&!r[s].test(c))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but got "'+c+'"');e+=f.prefix+c;}}else e+=f;}return e}}function k(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function A(t){return t.replace(/([=!:$/()])/g,"\\$1")}function R(t){return t&&t.sensitive?"":"i"}function T(t,n,r){for(var i=(r=r||{}).strict,e=!1!==r.start,o=!1!==r.end,u=r.delimiter||y,s=[].concat(r.endsWith||[]).map(k).concat("$").join("|"),f=e?"^":"",c=0;c<t.length;c++){var a=t[c];if("string"==typeof a)f+=k(a);else {var h=a.repeat?"(?:"+a.pattern+")(?:"+k(a.delimiter)+"(?:"+a.pattern+"))*":a.pattern;n&&n.push(a),f+=a.optional?a.prefix?"(?:"+k(a.prefix)+"("+h+"))?":"("+h+")?":k(a.prefix)+"("+h+")";}}if(o)i||(f+="(?:"+k(u)+")?"),f+="$"===s?"$":"(?="+s+")";else {var v=t[t.length-1],l="string"==typeof v?v[v.length-1]===u:void 0===v;i||(f+="(?:"+k(u)+"(?="+s+"))?"),l||(f+="(?="+k(u)+"|"+s+")");}return new RegExp(f,R(r))}function O(t,n,r){return t instanceof RegExp?function(t,n){if(!n)return t;var r=t.source.match(/\((?!\?)/g);if(r)for(var i=0;i<r.length;i++)n.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(t,n):Array.isArray(t)?function(t,n,r){for(var i=[],e=0;e<t.length;e++)i.push(O(t[e],n,r).source);return new RegExp("(?:"+i.join("|")+")",R(r))}(t,n,r):function(t,n,r){return T(g(t,r),n,r)}(t,n,r)}d.match=function(t,n){var r=[];return E(O(t,r,n),r)},d.regexpToFunction=m,d.parse=w,d.compile=function(t,n){return x(g(t,n),n)},d.tokensToFunction=p,d.tokensToRegExp=b;var S={container:"container",history:"history",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},j=new(function(){function t(){this.o=S,this.u=new DOMParser;}var n=t.prototype;return n.toString=function(t){return t.outerHTML},n.toDocument=function(t){return this.u.parseFromString(t,"text/html")},n.toElement=function(t){var n=document.createElement("div");return n.innerHTML=t,n},n.getHtml=function(t){return void 0===t&&(t=document),this.toString(t.documentElement)},n.getWrapper=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.wrapper+'"]')},n.getContainer=function(t){return void 0===t&&(t=document),t.querySelector("["+this.o.prefix+'="'+this.o.container+'"]')},n.removeContainer=function(t){document.body.contains(t)&&t.parentNode.removeChild(t);},n.addContainer=function(t,n){var r=this.getContainer();r?this.s(t,r):n.appendChild(t);},n.getNamespace=function(t){void 0===t&&(t=document);var n=t.querySelector("["+this.o.prefix+"-"+this.o.namespace+"]");return n?n.getAttribute(this.o.prefix+"-"+this.o.namespace):null},n.getHref=function(t){if(t.tagName&&"a"===t.tagName.toLowerCase()){if("string"==typeof t.href)return t.href;var n=t.getAttribute("href")||t.getAttribute("xlink:href");if(n)return this.resolveUrl(n.baseVal||n)}return null},n.resolveUrl=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var i=n.length;if(0===i)throw new Error("resolveUrl requires at least one argument; got none.");var e=document.createElement("base");if(e.href=arguments[0],1===i)return e.href;var o=document.getElementsByTagName("head")[0];o.insertBefore(e,o.firstChild);for(var u,s=document.createElement("a"),f=1;f<i;f++)s.href=arguments[f],e.href=u=s.href;return o.removeChild(e),u},n.s=function(t,n){n.parentNode.insertBefore(t,n.nextSibling);},t}()),M=new(function(){function t(){this.h=[],this.v=-1;}var i=t.prototype;return i.init=function(t,n){this.l="barba";var r={ns:n,scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(r),this.v=0;var i={from:this.l,index:0,states:[].concat(this.h)};window.history&&window.history.replaceState(i,"",t);},i.change=function(t,n,r){if(r&&r.state){var i=r.state,e=i.index;n=this.m(this.v-e),this.replace(i.states),this.v=e;}else this.add(t,n);return n},i.add=function(t,n){var r=this.size,i=this.p(n),e={ns:"tmp",scroll:{x:window.scrollX,y:window.scrollY},url:t};this.h.push(e),this.v=r;var o={from:this.l,index:r,states:[].concat(this.h)};switch(i){case"push":window.history&&window.history.pushState(o,"",t);break;case"replace":window.history&&window.history.replaceState(o,"",t);}},i.update=function(t,n){var i=n||this.v,e=r({},this.get(i),{},t);this.set(i,e);},i.remove=function(t){t?this.h.splice(t,1):this.h.pop(),this.v--;},i.clear=function(){this.h=[],this.v=-1;},i.replace=function(t){this.h=t;},i.get=function(t){return this.h[t]},i.set=function(t,n){return this.h[t]=n},i.p=function(t){var n="push",r=t,i=S.prefix+"-"+S.history;return r.hasAttribute&&r.hasAttribute(i)&&(n=r.getAttribute(i)),n},i.m=function(t){return Math.abs(t)>1?t>0?"forward":"back":0===t?"popstate":t>0?"back":"forward"},n(t,[{key:"current",get:function(){return this.h[this.v]}},{key:"state",get:function(){return this.h[this.h.length-1]}},{key:"previous",get:function(){return this.v<1?null:this.h[this.v-1]}},{key:"size",get:function(){return this.h.length}}]),t}()),L=function(t,n){try{var r=function(){if(!n.next.html)return Promise.resolve(t).then((function(t){var r=n.next;if(t){var i=j.toElement(t);r.namespace=j.getNamespace(i),r.container=j.getContainer(i),r.html=t,M.update({ns:r.namespace});var e=j.toDocument(t);document.title=e.title;}}))}();return Promise.resolve(r&&r.then?r.then((function(){})):void 0)}catch(t){return Promise.reject(t)}},$=d,_={__proto__:null,update:L,nextTick:function(){return new Promise((function(t){window.requestAnimationFrame(t);}))},pathToRegexp:$},q=function(){return window.location.origin},B=function(t){return void 0===t&&(t=window.location.href),U(t).port},U=function(t){var n,r=t.match(/:\d+/);if(null===r)/^http/.test(t)&&(n=80),/^https/.test(t)&&(n=443);else {var i=r[0].substring(1);n=parseInt(i,10);}var e,o=t.replace(q(),""),u={},s=o.indexOf("#");s>=0&&(e=o.slice(s+1),o=o.slice(0,s));var f=o.indexOf("?");return f>=0&&(u=D(o.slice(f+1)),o=o.slice(0,f)),{hash:e,path:o,port:n,query:u}},D=function(t){return t.split("&").reduce((function(t,n){var r=n.split("=");return t[r[0]]=r[1],t}),{})},F=function(t){return void 0===t&&(t=window.location.href),t.replace(/(\/#.*|\/|#.*)$/,"")},H={__proto__:null,getHref:function(){return window.location.href},getOrigin:q,getPort:B,getPath:function(t){return void 0===t&&(t=window.location.href),U(t).path},parse:U,parseQuery:D,clean:F};function I(t,n,r){return void 0===n&&(n=2e3),new Promise((function(i,e){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE)if(200===o.status)i(o.responseText);else if(o.status){var n={status:o.status,statusText:o.statusText};r(t,n),e(n);}},o.ontimeout=function(){var i=new Error("Timeout error ["+n+"]");r(t,i),e(i);},o.onerror=function(){var n=new Error("Fetch error");r(t,n),e(n);},o.open("GET",t),o.timeout=n,o.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),o.setRequestHeader("x-barba","yes"),o.send();}))}var C=function(t){return !!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then};function N(t,n){return void 0===n&&(n={}),function(){for(var r=arguments.length,i=new Array(r),e=0;e<r;e++)i[e]=arguments[e];var o=!1,u=new Promise((function(r,e){n.async=function(){return o=!0,function(t,n){t?e(t):r(n);}};var u=t.apply(n,i);o||(C(u)?u.then(r,e):r(u));}));return u}}var X=new(function(t){function n(){var n;return (n=t.call(this)||this).logger=new l("@barba/core"),n.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeOnce","once","afterOnce","before","beforeLeave","leave","afterLeave","beforeEnter","enter","afterEnter","after"],n.registered=new Map,n.init(),n}i(n,t);var r=n.prototype;return r.init=function(){var t=this;this.registered.clear(),this.all.forEach((function(n){t[n]||(t[n]=function(r,i){t.registered.has(n)||t.registered.set(n,new Set),t.registered.get(n).add({ctx:i||{},fn:r});});}));},r.do=function(t){for(var n=this,r=arguments.length,i=new Array(r>1?r-1:0),e=1;e<r;e++)i[e-1]=arguments[e];if(this.registered.has(t)){var o=Promise.resolve();return this.registered.get(t).forEach((function(t){o=o.then((function(){return N(t.fn,t.ctx).apply(void 0,i)}));})),o.catch((function(r){n.logger.debug("Hook error ["+t+"]"),n.logger.error(r);}))}return Promise.resolve()},r.clear=function(){var t=this;this.all.forEach((function(n){delete t[n];})),this.init();},r.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var t=[];this.registered.forEach((function(n,r){return t.push(r)})),this.logger.info("Registered hooks: "+t.join(","));},n}(h)),z=function(){function t(t){if(this.P=[],"boolean"==typeof t)this.g=t;else {var n=Array.isArray(t)?t:[t];this.P=n.map((function(t){return $(t)}));}}return t.prototype.checkHref=function(t){if("boolean"==typeof this.g)return this.g;var n=U(t).path;return this.P.some((function(t){return null!==t.exec(n)}))},t}(),G=function(t){function n(n){var r;return (r=t.call(this,n)||this).k=new Map,r}i(n,t);var e=n.prototype;return e.set=function(t,n,r){return this.k.set(t,{action:r,request:n}),{action:r,request:n}},e.get=function(t){return this.k.get(t)},e.getRequest=function(t){return this.k.get(t).request},e.getAction=function(t){return this.k.get(t).action},e.has=function(t){return !this.checkHref(t)&&this.k.has(t)},e.delete=function(t){return this.k.delete(t)},e.update=function(t,n){var i=r({},this.k.get(t),{},n);return this.k.set(t,i),i},n}(z),Q=function(){return !window.history.pushState},W=function(t){return !t.el||!t.href},J=function(t){var n=t.event;return n.which>1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey},K=function(t){var n=t.el;return n.hasAttribute("target")&&"_blank"===n.target},V=function(t){var n=t.el;return void 0!==n.protocol&&window.location.protocol!==n.protocol||void 0!==n.hostname&&window.location.hostname!==n.hostname},Y=function(t){var n=t.el;return void 0!==n.port&&B()!==B(n.href)},Z=function(t){var n=t.el;return n.getAttribute&&"string"==typeof n.getAttribute("download")},tt=function(t){return t.el.hasAttribute(S.prefix+"-"+S.prevent)},nt=function(t){return Boolean(t.el.closest("["+S.prefix+"-"+S.prevent+'="all"]'))},rt=function(t){var n=t.href;return F(n)===F()&&B(n)===B()},it=function(t){function n(n){var r;return (r=t.call(this,n)||this).suite=[],r.tests=new Map,r.init(),r}i(n,t);var r=n.prototype;return r.init=function(){this.add("pushState",Q),this.add("exists",W),this.add("newTab",J),this.add("blank",K),this.add("corsDomain",V),this.add("corsPort",Y),this.add("download",Z),this.add("preventSelf",tt),this.add("preventAll",nt),this.add("sameUrl",rt,!1);},r.add=function(t,n,r){void 0===r&&(r=!0),this.tests.set(t,n),r&&this.suite.push(t);},r.run=function(t,n,r,i){return this.tests.get(t)({el:n,event:r,href:i})},r.checkLink=function(t,n,r){var i=this;return this.suite.some((function(e){return i.run(e,t,n,r)}))},n}(z),et=function(t){function n(r,i){var e;void 0===i&&(i="Barba error");for(var o=arguments.length,u=new Array(o>2?o-2:0),s=2;s<o;s++)u[s-2]=arguments[s];return (e=t.call.apply(t,[this].concat(u))||this).error=r,e.label=i,Error.captureStackTrace&&Error.captureStackTrace(function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(e),n),e.name="BarbaError",e}return i(n,t),n}(s(Error)),ot=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.all=[],this.page=[],this.once=[],this.A=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],t&&(this.all=this.all.concat(t)),this.update();}var n=t.prototype;return n.add=function(t,n){switch(t){case"rule":this.A.splice(n.position||0,0,n.value);break;case"transition":default:this.all.push(n);}this.update();},n.resolve=function(t,n){var r=this;void 0===n&&(n={});var i=n.once?this.once:this.page;i=i.filter(n.self?function(t){return t.name&&"self"===t.name}:function(t){return !t.name||"self"!==t.name});var e=new Map,o=i.find((function(i){var o=!0,u={};return !(!n.self||"self"!==i.name)||(r.A.reverse().forEach((function(n){o&&(o=r.R(i,n,t,u),i.from&&i.to&&(o=r.R(i,n,t,u,"from")&&r.R(i,n,t,u,"to")),i.from&&!i.to&&(o=r.R(i,n,t,u,"from")),!i.from&&i.to&&(o=r.R(i,n,t,u,"to")));})),e.set(i,u),o)})),u=e.get(o),s=[];if(s.push(n.once?"once":"page"),n.self&&s.push("self"),u){var f,c=[o];Object.keys(u).length>0&&c.push(u),(f=this.logger).info.apply(f,["Transition found ["+s.join(",")+"]"].concat(c));}else this.logger.info("No transition found ["+s.join(",")+"]");return o},n.update=function(){var t=this;this.all=this.all.map((function(n){return t.T(n)})).sort((function(t,n){return t.priority-n.priority})).reverse().map((function(t){return delete t.priority,t})),this.page=this.all.filter((function(t){return void 0!==t.leave||void 0!==t.enter})),this.once=this.all.filter((function(t){return void 0!==t.once}));},n.R=function(t,n,r,i,e){var o=!0,u=!1,s=t,f=n.name,c=f,a=f,h=f,v=e?s[e]:s,l="to"===e?r.next:r.current;if(e?v&&v[f]:v[f]){switch(n.type){case"strings":default:var d=Array.isArray(v[c])?v[c]:[v[c]];l[c]&&-1!==d.indexOf(l[c])&&(u=!0),-1===d.indexOf(l[c])&&(o=!1);break;case"object":var m=Array.isArray(v[a])?v[a]:[v[a]];l[a]?(l[a].name&&-1!==m.indexOf(l[a].name)&&(u=!0),-1===m.indexOf(l[a].name)&&(o=!1)):o=!1;break;case"function":v[h](r)?u=!0:o=!1;}u&&(e?(i[e]=i[e]||{},i[e][f]=s[e][f]):i[f]=s[f]);}return o},n.O=function(t,n,r){var i=0;return (t[n]||t.from&&t.from[n]||t.to&&t.to[n])&&(i+=Math.pow(10,r),t.from&&t.from[n]&&(i+=1),t.to&&t.to[n]&&(i+=2)),i},n.T=function(t){var n=this;t.priority=0;var r=0;return this.A.forEach((function(i,e){r+=n.O(t,i.name,e+1);})),t.priority=r,t},t}(),ut=function(){function t(t){void 0===t&&(t=[]),this.logger=new l("@barba/core"),this.S=!1,this.store=new ot(t);}var r=t.prototype;return r.get=function(t,n){return this.store.resolve(t,n)},r.doOnce=function(t){var n=t.data,r=t.transition;try{var i=function(){e.S=!1;},e=this,o=r||{};e.S=!0;var u=f((function(){return Promise.resolve(e.j("beforeOnce",n,o)).then((function(){return Promise.resolve(e.once(n,o)).then((function(){return Promise.resolve(e.j("afterOnce",n,o)).then((function(){}))}))}))}),(function(t){e.S=!1,e.logger.debug("Transition error [before/after/once]"),e.logger.error(t);}));return Promise.resolve(u&&u.then?u.then(i):i())}catch(t){return Promise.reject(t)}},r.doPage=function(t){var n=t.data,r=t.transition,i=t.page,e=t.wrapper;try{var o=function(t){if(u)return t;s.S=!1;},u=!1,s=this,c=r||{},a=!0===c.sync||!1;s.S=!0;var h=f((function(){function t(){return Promise.resolve(s.j("before",n,c)).then((function(){var t=!1;function r(r){return t?r:Promise.resolve(s.remove(n)).then((function(){return Promise.resolve(s.j("after",n,c)).then((function(){}))}))}var o=function(){if(a)return f((function(){return Promise.resolve(s.add(n,e)).then((function(){return Promise.resolve(s.j("beforeLeave",n,c)).then((function(){return Promise.resolve(s.j("beforeEnter",n,c)).then((function(){return Promise.resolve(Promise.all([s.leave(n,c),s.enter(n,c)])).then((function(){return Promise.resolve(s.j("afterLeave",n,c)).then((function(){return Promise.resolve(s.j("afterEnter",n,c)).then((function(){}))}))}))}))}))}))}),(function(t){if(s.M(t))throw new et(t,"Transition error [sync]")}));var r=function(r){return t?r:f((function(){var t=function(){if(!1!==o)return Promise.resolve(s.add(n,e)).then((function(){return Promise.resolve(s.j("beforeEnter",n,c)).then((function(){return Promise.resolve(s.enter(n,c,o)).then((function(){return Promise.resolve(s.j("afterEnter",n,c)).then((function(){}))}))}))}))}();if(t&&t.then)return t.then((function(){}))}),(function(t){if(s.M(t))throw new et(t,"Transition error [before/after/enter]")}))},o=!1,u=f((function(){return Promise.resolve(s.j("beforeLeave",n,c)).then((function(){return Promise.resolve(Promise.all([s.leave(n,c),L(i,n)]).then((function(t){return t[0]}))).then((function(t){return o=t,Promise.resolve(s.j("afterLeave",n,c)).then((function(){}))}))}))}),(function(t){if(s.M(t))throw new et(t,"Transition error [before/after/leave]")}));return u&&u.then?u.then(r):r(u)}();return o&&o.then?o.then(r):r(o)}))}var r=function(){if(a)return Promise.resolve(L(i,n)).then((function(){}))}();return r&&r.then?r.then(t):t()}),(function(t){if(s.S=!1,t.name&&"BarbaError"===t.name)throw s.logger.debug(t.label),s.logger.error(t.error),t;throw s.logger.debug("Transition error [page]"),s.logger.error(t),t}));return Promise.resolve(h&&h.then?h.then(o):o(h))}catch(t){return Promise.reject(t)}},r.once=function(t,n){try{return Promise.resolve(X.do("once",t,n)).then((function(){return n.once?N(n.once,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.leave=function(t,n){try{return Promise.resolve(X.do("leave",t,n)).then((function(){return n.leave?N(n.leave,n)(t):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.enter=function(t,n,r){try{return Promise.resolve(X.do("enter",t,n)).then((function(){return n.enter?N(n.enter,n)(t,r):Promise.resolve()}))}catch(t){return Promise.reject(t)}},r.add=function(t,n){try{return j.addContainer(t.next.container,n),X.do("nextAdded",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.remove=function(t){try{return j.removeContainer(t.current.container),X.do("currentRemoved",t),Promise.resolve()}catch(t){return Promise.reject(t)}},r.M=function(t){return t.message?!/Timeout error|Fetch error/.test(t.message):!t.status},r.j=function(t,n,r){try{return Promise.resolve(X.do(t,n,r)).then((function(){return r[t]?N(r[t],r)(n):Promise.resolve()}))}catch(t){return Promise.reject(t)}},n(t,[{key:"isRunning",get:function(){return this.S},set:function(t){this.S=t;}},{key:"hasOnce",get:function(){return this.store.once.length>0}},{key:"hasSelf",get:function(){return this.store.all.some((function(t){return "self"===t.name}))}},{key:"shouldWait",get:function(){return this.store.all.some((function(t){return t.to&&!t.to.route||t.sync}))}}]),t}(),st=function(){function t(t){var n=this;this.names=["beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,0!==t.length&&(t.forEach((function(t){n.byNamespace.set(t.namespace,t);})),this.names.forEach((function(t){X[t](n.L(t));})));}return t.prototype.L=function(t){var n=this;return function(r){var i=t.match(/enter/i)?r.next:r.current,e=n.byNamespace.get(i.namespace);return e&&e[t]?N(e[t],e)(r):Promise.resolve()}},t}();Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var n=this;do{if(n.matches(t))return n;n=n.parentElement||n.parentNode;}while(null!==n&&1===n.nodeType);return null});var ft={container:null,html:"",namespace:"",url:{hash:"",href:"",path:"",port:null,query:{}}},ct=new(function(){function t(){this.version=a,this.schemaPage=ft,this.Logger=l,this.logger=new l("@barba/core"),this.plugins=[],this.hooks=X,this.dom=j,this.helpers=_,this.history=M,this.request=I,this.url=H;}var i=t.prototype;return i.use=function(t,n){var r=this.plugins;r.indexOf(t)>-1?this.logger.warn("Plugin ["+t.name+"] already installed."):"function"==typeof t.install?(t.install(this,n),r.push(t)):this.logger.warn("Plugin ["+t.name+'] has no "install" method.');},i.init=function(t){var n=void 0===t?{}:t,i=n.transitions,e=void 0===i?[]:i,o=n.views,u=void 0===o?[]:o,s=n.schema,f=void 0===s?S:s,c=n.requestError,a=n.timeout,h=void 0===a?2e3:a,v=n.cacheIgnore,d=void 0!==v&&v,m=n.prefetchIgnore,w=void 0!==m&&m,p=n.preventRunning,b=void 0!==p&&p,y=n.prevent,P=void 0===y?null:y,g=n.debug,E=n.logLevel;if(l.setLevel(!0===(void 0!==g&&g)?"debug":void 0===E?"off":E),this.logger.info(this.version),Object.keys(f).forEach((function(t){S[t]&&(S[t]=f[t]);})),this.$=c,this.timeout=h,this.cacheIgnore=d,this.prefetchIgnore=w,this.preventRunning=b,this._=this.dom.getWrapper(),!this._)throw new Error("[@barba/core] No Barba wrapper found");this._.setAttribute("aria-live","polite"),this.q();var x=this.data.current;if(!x.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new G(d),this.prevent=new it(w),this.transitions=new ut(e),this.views=new st(u),null!==P){if("function"!=typeof P)throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",P);}this.history.init(x.url.href,x.namespace),this.B=this.B.bind(this),this.U=this.U.bind(this),this.D=this.D.bind(this),this.F(),this.plugins.forEach((function(t){return t.init()}));var k=this.data;k.trigger="barba",k.next=k.current,k.current=r({},this.schemaPage),this.hooks.do("ready",k),this.once(k),this.q();},i.destroy=function(){this.q(),this.H(),this.history.clear(),this.hooks.clear(),this.plugins=[];},i.force=function(t){window.location.assign(t);},i.go=function(t,n,r){var i;if(void 0===n&&(n="barba"),this.transitions.isRunning)this.force(t);else if(!(i="popstate"===n?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(t):this.prevent.run("sameUrl",null,null,t))||this.transitions.hasSelf)return n=this.history.change(t,n,r),r&&(r.stopPropagation(),r.preventDefault()),this.page(t,n,i)},i.once=function(t){try{var n=this;return Promise.resolve(n.hooks.do("beforeEnter",t)).then((function(){function r(){return Promise.resolve(n.hooks.do("afterEnter",t)).then((function(){}))}var i=function(){if(n.transitions.hasOnce){var r=n.transitions.get(t,{once:!0});return Promise.resolve(n.transitions.doOnce({transition:r,data:t})).then((function(){}))}}();return i&&i.then?i.then(r):r()}))}catch(t){return Promise.reject(t)}},i.page=function(t,n,i){try{var e=function(){var t=o.data;return Promise.resolve(o.hooks.do("page",t)).then((function(){var n=f((function(){var n=o.transitions.get(t,{once:!1,self:i});return Promise.resolve(o.transitions.doPage({data:t,page:u,transition:n,wrapper:o._})).then((function(){o.q();}))}),(function(){0===l.getLevel()&&o.force(t.current.url.href);}));if(n&&n.then)return n.then((function(){}))}))},o=this;o.data.next.url=r({href:t},o.url.parse(t)),o.data.trigger=n;var u=o.cache.has(t)?o.cache.update(t,{action:"click"}).request:o.cache.set(t,o.request(t,o.timeout,o.onRequestError.bind(o,n)),"click").request,s=function(){if(o.transitions.shouldWait)return Promise.resolve(L(u,o.data)).then((function(){}))}();return Promise.resolve(s&&s.then?s.then(e):e())}catch(t){return Promise.reject(t)}},i.onRequestError=function(t){this.transitions.isRunning=!1;for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];var e=r[0],o=r[1],u=this.cache.getAction(e);return this.cache.delete(e),!(this.$&&!1===this.$(t,u,e,o)||("click"===u&&this.force(e),1))},i.prefetch=function(t){var n=this;this.cache.has(t)||this.cache.set(t,this.request(t,this.timeout,this.onRequestError.bind(this,"barba")).catch((function(t){n.logger.error(t);})),"prefetch");},i.F=function(){!0!==this.prefetchIgnore&&(document.addEventListener("mouseover",this.B),document.addEventListener("touchstart",this.B)),document.addEventListener("click",this.U),window.addEventListener("popstate",this.D);},i.H=function(){!0!==this.prefetchIgnore&&(document.removeEventListener("mouseover",this.B),document.removeEventListener("touchstart",this.B)),document.removeEventListener("click",this.U),window.removeEventListener("popstate",this.D);},i.B=function(t){var n=this,r=this.I(t);if(r){var i=this.dom.getHref(r);this.prevent.checkHref(i)||this.cache.has(i)||this.cache.set(i,this.request(i,this.timeout,this.onRequestError.bind(this,r)).catch((function(t){n.logger.error(t);})),"enter");}},i.U=function(t){var n=this.I(t);if(n)return this.transitions.isRunning&&this.preventRunning?(t.preventDefault(),void t.stopPropagation()):void this.go(this.dom.getHref(n),n,t)},i.D=function(t){this.go(this.url.getHref(),"popstate",t);},i.I=function(t){for(var n=t.target;n&&!this.dom.getHref(n);)n=n.parentNode;if(n&&!this.prevent.checkLink(n,t,this.dom.getHref(n)))return n},i.q=function(){var t=this.url.getHref(),n={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:r({href:t},this.url.parse(t))};this.C={current:n,next:r({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data);},n(t,[{key:"data",get:function(){return this.C}},{key:"wrapper",get:function(){return this._}}]),t}());

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
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
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
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
          context.arg = undefined$1;
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

            next.value = undefined$1;
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
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
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
            context.arg = undefined$1;
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
          this.arg = undefined$1;
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
     module.exports 
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
  });

  /* locomotive-scroll v3.5.4 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray$1(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var defaults = {
    el: document,
    elMobile: document,
    name: 'scroll',
    offset: [0, 0],
    repeat: false,
    smooth: false,
    smoothMobile: false,
    direction: 'vertical',
    lerp: 0.1,
    "class": 'is-inview',
    scrollbarClass: 'c-scrollbar',
    scrollingClass: 'has-scroll-scrolling',
    draggingClass: 'has-scroll-dragging',
    smoothClass: 'has-scroll-smooth',
    initClass: 'has-scroll-init',
    getSpeed: false,
    getDirection: false,
    multiplier: 1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
    scrollFromAnywhere: false
  };

  var _default$2 = /*#__PURE__*/function () {
    function _default() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      Object.assign(this, defaults, options);
      this.namespace = 'locomotive';
      this.html = document.documentElement;
      this.windowHeight = window.innerHeight;
      this.windowMiddle = this.windowHeight / 2;
      this.els = [];
      this.listeners = {};
      this.hasScrollTicking = false;
      this.hasCallEventSet = false;
      this.checkScroll = this.checkScroll.bind(this);
      this.checkResize = this.checkResize.bind(this);
      this.checkEvent = this.checkEvent.bind(this);
      this.instance = {
        scroll: {
          x: 0,
          y: 0
        },
        limit: this.html.offsetHeight
      };

      if (this.getDirection) {
        this.instance.direction = null;
      }

      if (this.getDirection) {
        this.instance.speed = 0;
      }

      this.html.classList.add(this.initClass);
      window.addEventListener('resize', this.checkResize, false);
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.initEvents();
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        this.dispatchScroll();
      }
    }, {
      key: "checkResize",
      value: function checkResize() {
        var _this = this;

        if (!this.resizeTick) {
          this.resizeTick = true;
          requestAnimationFrame(function () {
            _this.resize();

            _this.resizeTick = false;
          });
        }
      }
    }, {
      key: "resize",
      value: function resize() {}
    }, {
      key: "initEvents",
      value: function initEvents() {
        var _this2 = this;

        this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
        this.setScrollTo = this.setScrollTo.bind(this);
        this.scrollToEls.forEach(function (el) {
          el.addEventListener('click', _this2.setScrollTo, false);
        });
      }
    }, {
      key: "setScrollTo",
      value: function setScrollTo(event) {
        event.preventDefault();
        this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute('href'), event.currentTarget.getAttribute("data-".concat(this.name, "-offset")));
      }
    }, {
      key: "addElements",
      value: function addElements() {}
    }, {
      key: "detectElements",
      value: function detectElements(hasCallEventSet) {
        var _this3 = this;

        var scrollTop = this.instance.scroll.y;
        var scrollBottom = scrollTop + this.windowHeight;
        this.els.forEach(function (el, i) {
          if (el && (!el.inView || hasCallEventSet)) {
            if (scrollBottom >= el.top && scrollTop < el.bottom) {
              _this3.setInView(el, i);
            }
          }

          if (el && el.inView) {
            if (scrollBottom < el.top || scrollTop > el.bottom) {
              _this3.setOutOfView(el, i);
            }
          }
        });
        this.els = this.els.filter(function (current, i) {
          return current !== null;
        });
        this.hasScrollTicking = false;
      }
    }, {
      key: "setInView",
      value: function setInView(current, i) {
        this.els[i].inView = true;
        current.el.classList.add(current["class"]);

        if (current.call && this.hasCallEventSet) {
          this.dispatchCall(current, 'enter');

          if (!current.repeat) {
            this.els[i].call = false;
          }
        }

        if (!current.repeat && !current.speed && !current.sticky) {
          if (!current.call || current.call && this.hasCallEventSet) {
            this.els[i] = null;
          }
        }
      }
    }, {
      key: "setOutOfView",
      value: function setOutOfView(current, i) {
        if (current.repeat || current.speed !== undefined) {
          this.els[i].inView = false;
        }

        if (current.call && this.hasCallEventSet) {
          this.dispatchCall(current, 'exit');
        }

        if (current.repeat) {
          current.el.classList.remove(current["class"]);
        }
      }
    }, {
      key: "dispatchCall",
      value: function dispatchCall(current, way) {
        this.callWay = way;
        this.callValue = current.call.split(',').map(function (item) {
          return item.trim();
        });
        this.callObj = current;
        if (this.callValue.length == 1) this.callValue = this.callValue[0];
        var callEvent = new Event(this.namespace + 'call');
        this.el.dispatchEvent(callEvent);
      }
    }, {
      key: "dispatchScroll",
      value: function dispatchScroll() {
        var scrollEvent = new Event(this.namespace + 'scroll');
        this.el.dispatchEvent(scrollEvent);
      }
    }, {
      key: "setEvents",
      value: function setEvents(event, func) {
        if (!this.listeners[event]) {
          this.listeners[event] = [];
        }

        var list = this.listeners[event];
        list.push(func);

        if (list.length === 1) {
          this.el.addEventListener(this.namespace + event, this.checkEvent, false);
        }

        if (event === 'call') {
          this.hasCallEventSet = true;
          this.detectElements(true);
        }
      }
    }, {
      key: "unsetEvents",
      value: function unsetEvents(event, func) {
        if (!this.listeners[event]) return;
        var list = this.listeners[event];
        var index = list.indexOf(func);
        if (index < 0) return;
        list.splice(index, 1);

        if (list.index === 0) {
          this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
        }
      }
    }, {
      key: "checkEvent",
      value: function checkEvent(event) {
        var _this4 = this;

        var name = event.type.replace(this.namespace, '');
        var list = this.listeners[name];
        if (!list || list.length === 0) return;
        list.forEach(function (func) {
          switch (name) {
            case 'scroll':
              return func(_this4.instance);

            case 'call':
              return func(_this4.callValue, _this4.callWay, _this4.callObj);

            default:
              return func();
          }
        });
      }
    }, {
      key: "startScroll",
      value: function startScroll() {}
    }, {
      key: "stopScroll",
      value: function stopScroll() {}
    }, {
      key: "setScroll",
      value: function setScroll(x, y) {
        this.instance.scroll = {
          x: 0,
          y: 0
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this5 = this;

        window.removeEventListener('resize', this.checkResize, false);
        Object.keys(this.listeners).forEach(function (event) {
          _this5.el.removeEventListener(_this5.namespace + event, _this5.checkEvent, false);
        });
        this.listeners = {};
        this.scrollToEls.forEach(function (el) {
          el.removeEventListener('click', _this5.setScrollTo, false);
        });
      }
    }]);

    return _default;
  }();

  var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule$1(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var smoothscroll = createCommonjsModule$1(function (module, exports) {
  /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
  (function () {

    // polyfill
    function polyfill() {
      // aliases
      var w = window;
      var d = document;

      // return if scroll behavior is supported and polyfill is not forced
      if (
        'scrollBehavior' in d.documentElement.style &&
        w.__forceSmoothScrollPolyfill__ !== true
      ) {
        return;
      }

      // globals
      var Element = w.HTMLElement || w.Element;
      var SCROLL_TIME = 468;

      // object gathering original scroll methods
      var original = {
        scroll: w.scroll || w.scrollTo,
        scrollBy: w.scrollBy,
        elementScroll: Element.prototype.scroll || scrollElement,
        scrollIntoView: Element.prototype.scrollIntoView
      };

      // define timing method
      var now =
        w.performance && w.performance.now
          ? w.performance.now.bind(w.performance)
          : Date.now;

      /**
       * indicates if a the current browser is made by Microsoft
       * @method isMicrosoftBrowser
       * @param {String} userAgent
       * @returns {Boolean}
       */
      function isMicrosoftBrowser(userAgent) {
        var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

        return new RegExp(userAgentPatterns.join('|')).test(userAgent);
      }

      /*
       * IE has rounding bug rounding down clientHeight and clientWidth and
       * rounding up scrollHeight and scrollWidth causing false positives
       * on hasScrollableSpace
       */
      var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

      /**
       * changes scroll position inside an element
       * @method scrollElement
       * @param {Number} x
       * @param {Number} y
       * @returns {undefined}
       */
      function scrollElement(x, y) {
        this.scrollLeft = x;
        this.scrollTop = y;
      }

      /**
       * returns result of applying ease math function to a number
       * @method ease
       * @param {Number} k
       * @returns {Number}
       */
      function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      }

      /**
       * indicates if a smooth behavior should be applied
       * @method shouldBailOut
       * @param {Number|Object} firstArg
       * @returns {Boolean}
       */
      function shouldBailOut(firstArg) {
        if (
          firstArg === null ||
          typeof firstArg !== 'object' ||
          firstArg.behavior === undefined ||
          firstArg.behavior === 'auto' ||
          firstArg.behavior === 'instant'
        ) {
          // first argument is not an object/null
          // or behavior is auto, instant or undefined
          return true;
        }

        if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
          // first argument is an object and behavior is smooth
          return false;
        }

        // throw error when behavior is not supported
        throw new TypeError(
          'behavior member of ScrollOptions ' +
            firstArg.behavior +
            ' is not a valid value for enumeration ScrollBehavior.'
        );
      }

      /**
       * indicates if an element has scrollable space in the provided axis
       * @method hasScrollableSpace
       * @param {Node} el
       * @param {String} axis
       * @returns {Boolean}
       */
      function hasScrollableSpace(el, axis) {
        if (axis === 'Y') {
          return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
        }

        if (axis === 'X') {
          return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
        }
      }

      /**
       * indicates if an element has a scrollable overflow property in the axis
       * @method canOverflow
       * @param {Node} el
       * @param {String} axis
       * @returns {Boolean}
       */
      function canOverflow(el, axis) {
        var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

        return overflowValue === 'auto' || overflowValue === 'scroll';
      }

      /**
       * indicates if an element can be scrolled in either axis
       * @method isScrollable
       * @param {Node} el
       * @param {String} axis
       * @returns {Boolean}
       */
      function isScrollable(el) {
        var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
        var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

        return isScrollableY || isScrollableX;
      }

      /**
       * finds scrollable parent of an element
       * @method findScrollableParent
       * @param {Node} el
       * @returns {Node} el
       */
      function findScrollableParent(el) {
        while (el !== d.body && isScrollable(el) === false) {
          el = el.parentNode || el.host;
        }

        return el;
      }

      /**
       * self invoked function that, given a context, steps through scrolling
       * @method step
       * @param {Object} context
       * @returns {undefined}
       */
      function step(context) {
        var time = now();
        var value;
        var currentX;
        var currentY;
        var elapsed = (time - context.startTime) / SCROLL_TIME;

        // avoid elapsed times higher than one
        elapsed = elapsed > 1 ? 1 : elapsed;

        // apply easing to elapsed time
        value = ease(elapsed);

        currentX = context.startX + (context.x - context.startX) * value;
        currentY = context.startY + (context.y - context.startY) * value;

        context.method.call(context.scrollable, currentX, currentY);

        // scroll more if we have not reached our destination
        if (currentX !== context.x || currentY !== context.y) {
          w.requestAnimationFrame(step.bind(w, context));
        }
      }

      /**
       * scrolls window or element with a smooth behavior
       * @method smoothScroll
       * @param {Object|Node} el
       * @param {Number} x
       * @param {Number} y
       * @returns {undefined}
       */
      function smoothScroll(el, x, y) {
        var scrollable;
        var startX;
        var startY;
        var method;
        var startTime = now();

        // define scroll context
        if (el === d.body) {
          scrollable = w;
          startX = w.scrollX || w.pageXOffset;
          startY = w.scrollY || w.pageYOffset;
          method = original.scroll;
        } else {
          scrollable = el;
          startX = el.scrollLeft;
          startY = el.scrollTop;
          method = scrollElement;
        }

        // scroll looping over a frame
        step({
          scrollable: scrollable,
          method: method,
          startTime: startTime,
          startX: startX,
          startY: startY,
          x: x,
          y: y
        });
      }

      // ORIGINAL METHODS OVERRIDES
      // w.scroll and w.scrollTo
      w.scroll = w.scrollTo = function() {
        // avoid action when no arguments are passed
        if (arguments[0] === undefined) {
          return;
        }

        // avoid smooth behavior if not required
        if (shouldBailOut(arguments[0]) === true) {
          original.scroll.call(
            w,
            arguments[0].left !== undefined
              ? arguments[0].left
              : typeof arguments[0] !== 'object'
                ? arguments[0]
                : w.scrollX || w.pageXOffset,
            // use top prop, second argument if present or fallback to scrollY
            arguments[0].top !== undefined
              ? arguments[0].top
              : arguments[1] !== undefined
                ? arguments[1]
                : w.scrollY || w.pageYOffset
          );

          return;
        }

        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
          w,
          d.body,
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : w.scrollX || w.pageXOffset,
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : w.scrollY || w.pageYOffset
        );
      };

      // w.scrollBy
      w.scrollBy = function() {
        // avoid action when no arguments are passed
        if (arguments[0] === undefined) {
          return;
        }

        // avoid smooth behavior if not required
        if (shouldBailOut(arguments[0])) {
          original.scrollBy.call(
            w,
            arguments[0].left !== undefined
              ? arguments[0].left
              : typeof arguments[0] !== 'object' ? arguments[0] : 0,
            arguments[0].top !== undefined
              ? arguments[0].top
              : arguments[1] !== undefined ? arguments[1] : 0
          );

          return;
        }

        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
          w,
          d.body,
          ~~arguments[0].left + (w.scrollX || w.pageXOffset),
          ~~arguments[0].top + (w.scrollY || w.pageYOffset)
        );
      };

      // Element.prototype.scroll and Element.prototype.scrollTo
      Element.prototype.scroll = Element.prototype.scrollTo = function() {
        // avoid action when no arguments are passed
        if (arguments[0] === undefined) {
          return;
        }

        // avoid smooth behavior if not required
        if (shouldBailOut(arguments[0]) === true) {
          // if one number is passed, throw error to match Firefox implementation
          if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
            throw new SyntaxError('Value could not be converted');
          }

          original.elementScroll.call(
            this,
            // use left prop, first number argument or fallback to scrollLeft
            arguments[0].left !== undefined
              ? ~~arguments[0].left
              : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
            // use top prop, second argument or fallback to scrollTop
            arguments[0].top !== undefined
              ? ~~arguments[0].top
              : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
          );

          return;
        }

        var left = arguments[0].left;
        var top = arguments[0].top;

        // LET THE SMOOTHNESS BEGIN!
        smoothScroll.call(
          this,
          this,
          typeof left === 'undefined' ? this.scrollLeft : ~~left,
          typeof top === 'undefined' ? this.scrollTop : ~~top
        );
      };

      // Element.prototype.scrollBy
      Element.prototype.scrollBy = function() {
        // avoid action when no arguments are passed
        if (arguments[0] === undefined) {
          return;
        }

        // avoid smooth behavior if not required
        if (shouldBailOut(arguments[0]) === true) {
          original.elementScroll.call(
            this,
            arguments[0].left !== undefined
              ? ~~arguments[0].left + this.scrollLeft
              : ~~arguments[0] + this.scrollLeft,
            arguments[0].top !== undefined
              ? ~~arguments[0].top + this.scrollTop
              : ~~arguments[1] + this.scrollTop
          );

          return;
        }

        this.scroll({
          left: ~~arguments[0].left + this.scrollLeft,
          top: ~~arguments[0].top + this.scrollTop,
          behavior: arguments[0].behavior
        });
      };

      // Element.prototype.scrollIntoView
      Element.prototype.scrollIntoView = function() {
        // avoid smooth behavior if not required
        if (shouldBailOut(arguments[0]) === true) {
          original.scrollIntoView.call(
            this,
            arguments[0] === undefined ? true : arguments[0]
          );

          return;
        }

        // LET THE SMOOTHNESS BEGIN!
        var scrollableParent = findScrollableParent(this);
        var parentRects = scrollableParent.getBoundingClientRect();
        var clientRects = this.getBoundingClientRect();

        if (scrollableParent !== d.body) {
          // reveal element inside parent
          smoothScroll.call(
            this,
            scrollableParent,
            scrollableParent.scrollLeft + clientRects.left - parentRects.left,
            scrollableParent.scrollTop + clientRects.top - parentRects.top
          );

          // reveal parent in viewport unless is fixed
          if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
            w.scrollBy({
              left: parentRects.left,
              top: parentRects.top,
              behavior: 'smooth'
            });
          }
        } else {
          // reveal element in viewport
          w.scrollBy({
            left: clientRects.left,
            top: clientRects.top,
            behavior: 'smooth'
          });
        }
      };
    }

    {
      // commonjs
      module.exports = { polyfill: polyfill };
    }

  }());
  });
  var smoothscroll_1 = smoothscroll.polyfill;

  var _default$1$1 = /*#__PURE__*/function (_Core) {
    _inherits(_default, _Core);

    function _default() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, options));
      window.addEventListener('scroll', _this.checkScroll, false);
      smoothscroll.polyfill();
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        this.instance.scroll.y = window.pageYOffset;
        this.addElements();
        this.detectElements();

        _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        var _this2 = this;

        _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);

        if (this.getDirection) {
          this.addDirection();
        }

        if (this.getSpeed) {
          this.addSpeed();
          this.timestamp = Date.now();
        }

        this.instance.scroll.y = window.pageYOffset;

        if (this.els.length) {
          if (!this.hasScrollTicking) {
            requestAnimationFrame(function () {
              _this2.detectElements();
            });
            this.hasScrollTicking = true;
          }
        }
      }
    }, {
      key: "addDirection",
      value: function addDirection() {
        if (window.pageYOffset > this.instance.scroll.y) {
          if (this.instance.direction !== 'down') {
            this.instance.direction = 'down';
          }
        } else if (window.pageYOffset < this.instance.scroll.y) {
          if (this.instance.direction !== 'up') {
            this.instance.direction = 'up';
          }
        }
      }
    }, {
      key: "addSpeed",
      value: function addSpeed() {
        if (window.pageYOffset != this.instance.scroll.y) {
          this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / (Date.now() - this.timestamp);
        } else {
          this.instance.speed = 0;
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        if (this.els.length) {
          this.windowHeight = window.innerHeight;
          this.updateElements();
        }
      }
    }, {
      key: "addElements",
      value: function addElements() {
        var _this3 = this;

        this.els = [];
        var els = this.el.querySelectorAll('[data-' + this.name + ']');
        els.forEach(function (el, id) {
          var cl = el.dataset[_this3.name + 'Class'] || _this3["class"];

          var top = el.getBoundingClientRect().top + _this3.instance.scroll.y;

          var bottom = top + el.offsetHeight;
          var offset = typeof el.dataset[_this3.name + 'Offset'] === 'string' ? el.dataset[_this3.name + 'Offset'].split(',') : _this3.offset;
          var repeat = el.dataset[_this3.name + 'Repeat'];
          var call = el.dataset[_this3.name + 'Call'];

          if (repeat == 'false') {
            repeat = false;
          } else if (repeat != undefined) {
            repeat = true;
          } else {
            repeat = _this3.repeat;
          }

          var relativeOffset = _this3.getRelativeOffset(offset);

          var mappedEl = {
            el: el,
            id: id,
            "class": cl,
            top: top + relativeOffset[0],
            bottom: bottom - relativeOffset[1],
            offset: offset,
            repeat: repeat,
            inView: el.classList.contains(cl) ? true : false,
            call: call
          };

          _this3.els.push(mappedEl);
        });
      }
    }, {
      key: "updateElements",
      value: function updateElements() {
        var _this4 = this;

        this.els.forEach(function (el, i) {
          var top = el.el.getBoundingClientRect().top + _this4.instance.scroll.y;

          var bottom = top + el.el.offsetHeight;

          var relativeOffset = _this4.getRelativeOffset(el.offset);

          _this4.els[i].top = top + relativeOffset[0];
          _this4.els[i].bottom = bottom - relativeOffset[1];
        });
        this.hasScrollTicking = false;
      }
    }, {
      key: "getRelativeOffset",
      value: function getRelativeOffset(offset) {
        var relativeOffset = [0, 0];

        if (offset) {
          for (var i = 0; i < offset.length; i++) {
            if (typeof offset[i] == 'string') {
              if (offset[i].includes('%')) {
                relativeOffset[i] = parseInt(offset[i].replace('%', '') * this.windowHeight / 100);
              } else {
                relativeOffset[i] = parseInt(offset[i]);
              }
            } else {
              relativeOffset[i] = offset[i];
            }
          }
        }

        return relativeOffset;
      }
      /**
       * Scroll to a desired target.
       *
       * @param  Available options :
       *          targetOption {node, string, "top", "bottom", int} - The DOM element we want to scroll to
       *          offsetOption {int} - An absolute vertical scroll value to reach, or an offset to apply on top of given `target` or `sourceElem`'s target
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(targetOption, offsetOption, duration, easing, disableLerp, callback) {
        // TODO - In next breaking update, use an object as 2nd parameter for options (offset, duration, easing, disableLerp, callback)
        var target;
        var offset = offsetOption ? parseInt(offsetOption) : 0;

        if (typeof targetOption === 'string') {
          // Selector or boundaries
          if (targetOption === 'top') {
            target = this.html;
          } else if (targetOption === 'bottom') {
            target = this.html.offsetHeight - window.innerHeight;
          } else {
            target = document.querySelector(targetOption); // If the query fails, abort

            if (!target) {
              return;
            }
          }
        } else if (typeof targetOption === 'number') {
          // Absolute coordinate
          target = parseInt(targetOption);
        } else if (targetOption && targetOption.tagName) {
          // DOM Element
          target = targetOption;
        } else {
          console.warn('`targetOption` parameter is not valid');
          return;
        } // We have a target that is not a coordinate yet, get it


        if (typeof target !== 'number') {
          offset = target.getBoundingClientRect().top + offset + this.instance.scroll.y;
        } else {
          offset = target + offset;
        }

        if (callback) {
          offset = offset.toFixed();

          var onScroll = function onScroll() {
            if (window.pageYOffset.toFixed() === offset) {
              window.removeEventListener('scroll', onScroll);
              callback();
            }
          };

          window.addEventListener('scroll', onScroll);
        }

        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    }, {
      key: "update",
      value: function update() {
        this.addElements();
        this.detectElements();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        window.removeEventListener('scroll', this.checkScroll, false);
      }
    }]);

    return _default;
  }(_default$2);

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  function E$1 () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E$1.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  var tinyEmitter = E$1;

  var lethargy = createCommonjsModule$1(function (module, exports) {
  // Generated by CoffeeScript 1.9.2
  (function() {
    var root;

    root =  exports !== null ? exports : this;

    root.Lethargy = (function() {
      function Lethargy(stability, sensitivity, tolerance, delay) {
        this.stability = stability != null ? Math.abs(stability) : 8;
        this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
        this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
        this.delay = delay != null ? delay : 150;
        this.lastUpDeltas = (function() {
          var i, ref, results;
          results = [];
          for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
            results.push(null);
          }
          return results;
        }).call(this);
        this.lastDownDeltas = (function() {
          var i, ref, results;
          results = [];
          for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
            results.push(null);
          }
          return results;
        }).call(this);
        this.deltasTimestamp = (function() {
          var i, ref, results;
          results = [];
          for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
            results.push(null);
          }
          return results;
        }).call(this);
      }

      Lethargy.prototype.check = function(e) {
        var lastDelta;
        e = e.originalEvent || e;
        if (e.wheelDelta != null) {
          lastDelta = e.wheelDelta;
        } else if (e.deltaY != null) {
          lastDelta = e.deltaY * -40;
        } else if ((e.detail != null) || e.detail === 0) {
          lastDelta = e.detail * -40;
        }
        this.deltasTimestamp.push(Date.now());
        this.deltasTimestamp.shift();
        if (lastDelta > 0) {
          this.lastUpDeltas.push(lastDelta);
          this.lastUpDeltas.shift();
          return this.isInertia(1);
        } else {
          this.lastDownDeltas.push(lastDelta);
          this.lastDownDeltas.shift();
          return this.isInertia(-1);
        }
      };

      Lethargy.prototype.isInertia = function(direction) {
        var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
        lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
        if (lastDeltas[0] === null) {
          return direction;
        }
        if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {
          return false;
        }
        lastDeltasOld = lastDeltas.slice(0, this.stability);
        lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
        oldSum = lastDeltasOld.reduce(function(t, s) {
          return t + s;
        });
        newSum = lastDeltasNew.reduce(function(t, s) {
          return t + s;
        });
        oldAverage = oldSum / lastDeltasOld.length;
        newAverage = newSum / lastDeltasNew.length;
        if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {
          return direction;
        } else {
          return false;
        }
      };

      Lethargy.prototype.showLastUpDeltas = function() {
        return this.lastUpDeltas;
      };

      Lethargy.prototype.showLastDownDeltas = function() {
        return this.lastDownDeltas;
      };

      return Lethargy;

    })();

  }).call(commonjsGlobal$1);
  });

  var support = (function getSupport() {
      return {
          hasWheelEvent: 'onwheel' in document,
          hasMouseWheelEvent: 'onmousewheel' in document,
          hasTouch: ('ontouchstart' in window) || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
          hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
          hasPointer: !!window.navigator.msPointerEnabled,
          hasKeyDown: 'onkeydown' in document,
          isFirefox: navigator.userAgent.indexOf('Firefox') > -1
      };
  })();

  var toString = Object.prototype.toString,
      hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  var bindallStandalone = function(object) {
      if(!object) return console.warn('bindAll requires at least one argument.');

      var functions = Array.prototype.slice.call(arguments, 1);

      if (functions.length === 0) {

          for (var method in object) {
              if(hasOwnProperty$1.call(object, method)) {
                  if(typeof object[method] == 'function' && toString.call(object[method]) == "[object Function]") {
                      functions.push(method);
                  }
              }
          }
      }

      for(var i = 0; i < functions.length; i++) {
          var f = functions[i];
          object[f] = bind(object[f], object);
      }
  };

  /*
      Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
      bindAll is only needed for events binding so no need to make slow fixes for constructor
      or partial application.
  */
  function bind(func, context) {
    return function() {
      return func.apply(context, arguments);
    };
  }

  var Lethargy = lethargy.Lethargy;



  var EVT_ID = 'virtualscroll';

  var src = VirtualScroll;

  var keyCodes = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACE: 32
  };

  function VirtualScroll(options) {
      bindallStandalone(this, '_onWheel', '_onMouseWheel', '_onTouchStart', '_onTouchMove', '_onKeyDown');

      this.el = window;
      if (options && options.el) {
          this.el = options.el;
          delete options.el;
      }
      this.options = objectAssign({
          mouseMultiplier: 1,
          touchMultiplier: 2,
          firefoxMultiplier: 15,
          keyStep: 120,
          preventTouch: false,
          unpreventTouchClass: 'vs-touchmove-allowed',
          limitInertia: false,
          useKeyboard: true,
          useTouch: true
      }, options);

      if (this.options.limitInertia) this._lethargy = new Lethargy();

      this._emitter = new tinyEmitter();
      this._event = {
          y: 0,
          x: 0,
          deltaX: 0,
          deltaY: 0
      };
      this.touchStartX = null;
      this.touchStartY = null;
      this.bodyTouchAction = null;

      if (this.options.passive !== undefined) {
          this.listenerOptions = {passive: this.options.passive};
      }
  }

  VirtualScroll.prototype._notify = function(e) {
      var evt = this._event;
      evt.x += evt.deltaX;
      evt.y += evt.deltaY;

     this._emitter.emit(EVT_ID, {
          x: evt.x,
          y: evt.y,
          deltaX: evt.deltaX,
          deltaY: evt.deltaY,
          originalEvent: e
     });
  };

  VirtualScroll.prototype._onWheel = function(e) {
      var options = this.options;
      if (this._lethargy && this._lethargy.check(e) === false) return;
      var evt = this._event;

      // In Chrome and in Firefox (at least the new one)
      evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
      evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

      // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
      // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
      if(support.isFirefox && e.deltaMode == 1) {
          evt.deltaX *= options.firefoxMultiplier;
          evt.deltaY *= options.firefoxMultiplier;
      }

      evt.deltaX *= options.mouseMultiplier;
      evt.deltaY *= options.mouseMultiplier;

      this._notify(e);
  };

  VirtualScroll.prototype._onMouseWheel = function(e) {
      if (this.options.limitInertia && this._lethargy.check(e) === false) return;

      var evt = this._event;

      // In Safari, IE and in Chrome if 'wheel' isn't defined
      evt.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
      evt.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

      this._notify(e);
  };

  VirtualScroll.prototype._onTouchStart = function(e) {
      var t = (e.targetTouches) ? e.targetTouches[0] : e;
      this.touchStartX = t.pageX;
      this.touchStartY = t.pageY;
  };

  VirtualScroll.prototype._onTouchMove = function(e) {
      var options = this.options;
      if(options.preventTouch
          && !e.target.classList.contains(options.unpreventTouchClass)) {
          e.preventDefault();
      }

      var evt = this._event;

      var t = (e.targetTouches) ? e.targetTouches[0] : e;

      evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
      evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

      this.touchStartX = t.pageX;
      this.touchStartY = t.pageY;

      this._notify(e);
  };

  VirtualScroll.prototype._onKeyDown = function(e) {
      var evt = this._event;
      evt.deltaX = evt.deltaY = 0;
      var windowHeight = window.innerHeight - 40;

      switch(e.keyCode) {
          case keyCodes.LEFT:
          case keyCodes.UP:
              evt.deltaY = this.options.keyStep;
              break;

          case keyCodes.RIGHT:
          case keyCodes.DOWN:
              evt.deltaY = - this.options.keyStep;
              break;
          case  e.shiftKey:
              evt.deltaY = windowHeight;
              break;
          case keyCodes.SPACE:
              evt.deltaY = - windowHeight;
              break;
          default:
              return;
      }

      this._notify(e);
  };

  VirtualScroll.prototype._bind = function() {
      if(support.hasWheelEvent) this.el.addEventListener('wheel', this._onWheel, this.listenerOptions);
      if(support.hasMouseWheelEvent) this.el.addEventListener('mousewheel', this._onMouseWheel, this.listenerOptions);

      if(support.hasTouch && this.options.useTouch) {
          this.el.addEventListener('touchstart', this._onTouchStart, this.listenerOptions);
          this.el.addEventListener('touchmove', this._onTouchMove, this.listenerOptions);
      }

      if(support.hasPointer && support.hasTouchWin) {
          this.bodyTouchAction = document.body.style.msTouchAction;
          document.body.style.msTouchAction = 'none';
          this.el.addEventListener('MSPointerDown', this._onTouchStart, true);
          this.el.addEventListener('MSPointerMove', this._onTouchMove, true);
      }

      if(support.hasKeyDown && this.options.useKeyboard) document.addEventListener('keydown', this._onKeyDown);
  };

  VirtualScroll.prototype._unbind = function() {
      if(support.hasWheelEvent) this.el.removeEventListener('wheel', this._onWheel);
      if(support.hasMouseWheelEvent) this.el.removeEventListener('mousewheel', this._onMouseWheel);

      if(support.hasTouch) {
          this.el.removeEventListener('touchstart', this._onTouchStart);
          this.el.removeEventListener('touchmove', this._onTouchMove);
      }

      if(support.hasPointer && support.hasTouchWin) {
          document.body.style.msTouchAction = this.bodyTouchAction;
          this.el.removeEventListener('MSPointerDown', this._onTouchStart, true);
          this.el.removeEventListener('MSPointerMove', this._onTouchMove, true);
      }

      if(support.hasKeyDown && this.options.useKeyboard) document.removeEventListener('keydown', this._onKeyDown);
  };

  VirtualScroll.prototype.on = function(cb, ctx) {
    this._emitter.on(EVT_ID, cb, ctx);

    var events = this._emitter.e;
    if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
  };

  VirtualScroll.prototype.off = function(cb, ctx) {
    this._emitter.off(EVT_ID, cb, ctx);

    var events = this._emitter.e;
    if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
  };

  VirtualScroll.prototype.reset = function() {
      var evt = this._event;
      evt.x = 0;
      evt.y = 0;
  };

  VirtualScroll.prototype.destroy = function() {
      this._emitter.off();
      this._unbind();
  };

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function getTranslate(el) {
    var translate = {};
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(el);
    var transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);

    if (mat) {
      translate.x = mat ? parseFloat(mat[1].split(', ')[12]) : 0;
      translate.y = mat ? parseFloat(mat[1].split(', ')[13]) : 0;
    } else {
      mat = transform.match(/^matrix\((.+)\)$/);
      translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
      translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    }

    return translate;
  }

  /**
   * Returns an array containing all the parent nodes of the given node
   * @param  {object} node
   * @return {array} parent nodes
   */
  function getParents(elem) {
    // Set up a parent array
    var parents = []; // Push each parent element to the array

    for (; elem && elem !== document; elem = elem.parentNode) {
      parents.push(elem);
    } // Return our parent array


    return parents;
  } // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

  /**
   * https://github.com/gre/bezier-easing
   * BezierEasing - use bezier curve for transition easing function
   * by Gaëtan Renaudeau 2014 - 2015 – MIT License
   */

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  function A$1 (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B$1 (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C$1 (aA1)      { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier (aT, aA1, aA2) { return ((A$1(aA1, aA2) * aT + B$1(aA1, aA2)) * aT + C$1(aA1)) * aT; }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope (aT, aA1, aA2) { return 3.0 * A$1(aA1, aA2) * aT * aT + 2.0 * B$1(aA1, aA2) * aT + C$1(aA1); }

  function binarySubdivide (aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
   for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
     var currentSlope = getSlope(aGuessT, mX1, mX2);
     if (currentSlope === 0.0) {
       return aGuessT;
     }
     var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
     aGuessT -= currentX / currentSlope;
   }
   return aGuessT;
  }

  function LinearEasing (x) {
    return x;
  }

  var src$1 = function bezier (mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }

    if (mX1 === mY1 && mX2 === mY2) {
      return LinearEasing;
    }

    // Precompute samples table
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }

    function getTForX (aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }

    return function BezierEasing (x) {
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  };

  var keyCodes$1 = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    TAB: 9,
    PAGEUP: 33,
    PAGEDOWN: 34,
    HOME: 36,
    END: 35
  };

  var _default$2$1 = /*#__PURE__*/function (_Core) {
    _inherits(_default, _Core);

    function _default() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      window.scrollTo(0, 0);
      history.scrollRestoration = 'manual';
      _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, options));
      if (_this.inertia) _this.lerp = _this.inertia * 0.1;
      _this.isScrolling = false;
      _this.isDraggingScrollbar = false;
      _this.isTicking = false;
      _this.hasScrollTicking = false;
      _this.parallaxElements = [];
      _this.stop = false;
      _this.checkKey = _this.checkKey.bind(_assertThisInitialized(_this));
      window.addEventListener('keydown', _this.checkKey, false);
      return _this;
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.html.classList.add(this.smoothClass);
        this.instance = _objectSpread2({
          delta: {
            x: 0,
            y: 0
          }
        }, this.instance);
        this.vs = new src({
          el: this.scrollFromAnywhere ? document : this.el,
          mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
          firefoxMultiplier: this.firefoxMultiplier,
          touchMultiplier: this.touchMultiplier,
          useKeyboard: false,
          passive: true
        });
        this.vs.on(function (e) {
          if (_this2.stop) {
            return;
          }

          if (!_this2.isTicking && !_this2.isDraggingScrollbar) {
            requestAnimationFrame(function () {
              _this2.updateDelta(e);

              if (!_this2.isScrolling) _this2.startScrolling();
            });
            _this2.isTicking = true;
          }

          _this2.isTicking = false;
        });
        this.setScrollLimit();
        this.initScrollBar();
        this.addSections();
        this.addElements();
        this.detectElements();
        this.transformElements(true, true);
        this.checkScroll(true);

        _get(_getPrototypeOf(_default.prototype), "init", this).call(this);
      }
    }, {
      key: "setScrollLimit",
      value: function setScrollLimit() {
        this.instance.limit = this.el.offsetHeight - this.windowHeight;
      }
    }, {
      key: "startScrolling",
      value: function startScrolling() {
        this.isScrolling = true;
        this.checkScroll();
        this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "stopScrolling",
      value: function stopScrolling() {
        if (this.scrollToRaf) {
          cancelAnimationFrame(this.scrollToRaf);
          this.scrollToRaf = null;
        }

        this.isScrolling = false;
        this.instance.scroll.y = Math.round(this.instance.scroll.y);
        this.html.classList.remove(this.scrollingClass);
      }
    }, {
      key: "checkKey",
      value: function checkKey(e) {
        var _this3 = this;

        if (this.stop) {
          // If we are stopped, we don't want any scroll to occur because of a keypress
          // Prevent tab to scroll to activeElement
          if (e.keyCode == keyCodes$1.TAB) {
            requestAnimationFrame(function () {
              // Make sure native scroll is always at top of page
              _this3.html.scrollTop = 0;
              document.body.scrollTop = 0;
            });
          }

          return;
        }

        switch (e.keyCode) {
          case keyCodes$1.TAB:
            // Do not remove the RAF
            // It allows to override the browser's native scrollTo, which is essential
            requestAnimationFrame(function () {
              // Make sure native scroll is always at top of page
              _this3.html.scrollTop = 0;
              document.body.scrollTop = 0; // Request scrollTo on the focusedElement, putting it at the center of the screen

              _this3.scrollTo(document.activeElement, -window.innerHeight / 2);
            });
            break;

          case keyCodes$1.UP:
            this.instance.delta.y -= 240;
            break;

          case keyCodes$1.DOWN:
            this.instance.delta.y += 240;
            break;

          case keyCodes$1.PAGEUP:
            this.instance.delta.y -= window.innerHeight;
            break;

          case keyCodes$1.PAGEDOWN:
            this.instance.delta.y += window.innerHeight;
            break;

          case keyCodes$1.HOME:
            this.instance.delta.y -= this.instance.limit;
            break;

          case keyCodes$1.END:
            this.instance.delta.y += this.instance.limit;
            break;

          case keyCodes$1.SPACE:
            if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
              if (e.shiftKey) {
                this.instance.delta.y -= window.innerHeight;
              } else {
                this.instance.delta.y += window.innerHeight;
              }
            }

            break;

          default:
            return;
        }

        if (this.instance.delta.y < 0) this.instance.delta.y = 0;
        if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
        this.isScrolling = true;
        this.checkScroll();
        this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "checkScroll",
      value: function checkScroll() {
        var _this4 = this;

        var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (forced || this.isScrolling || this.isDraggingScrollbar) {
          if (!this.hasScrollTicking) {
            requestAnimationFrame(function () {
              return _this4.checkScroll();
            });
            this.hasScrollTicking = true;
          }

          this.updateScroll();
          var distance = Math.abs(this.instance.delta.y - this.instance.scroll.y);

          if (!this.animatingScroll && (distance < 0.5 && this.instance.delta.y != 0 || distance < 0.5 && this.instance.delta.y == 0)) {
            this.stopScrolling();
          }

          for (var i = this.sections.length - 1; i >= 0; i--) {
            if (this.sections[i].persistent || this.instance.scroll.y > this.sections[i].offset && this.instance.scroll.y < this.sections[i].limit) {
              this.transform(this.sections[i].el, 0, -this.instance.scroll.y);

              if (!this.sections[i].inView) {
                this.sections[i].inView = true;
                this.sections[i].el.style.opacity = 1;
                this.sections[i].el.style.pointerEvents = 'all';
                this.sections[i].el.setAttribute("data-".concat(this.name, "-section-inview"), '');
              }
            } else {
              if (this.sections[i].inView) {
                this.sections[i].inView = false;
                this.sections[i].el.style.opacity = 0;
                this.sections[i].el.style.pointerEvents = 'none';
                this.sections[i].el.removeAttribute("data-".concat(this.name, "-section-inview"));
              }

              this.transform(this.sections[i].el, 0, 0);
            }
          }

          if (this.getDirection) {
            this.addDirection();
          }

          if (this.getSpeed) {
            this.addSpeed();
            this.timestamp = Date.now();
          }

          this.detectElements();
          this.transformElements();
          var scrollBarTranslation = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
          this.transform(this.scrollbarThumb, 0, scrollBarTranslation);

          _get(_getPrototypeOf(_default.prototype), "checkScroll", this).call(this);

          this.hasScrollTicking = false;
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        this.windowHeight = window.innerHeight;
        this.windowMiddle = this.windowHeight / 2;
        this.update();
      }
    }, {
      key: "updateDelta",
      value: function updateDelta(e) {
        this.instance.delta.y -= e.deltaY * this.multiplier;
        if (this.instance.delta.y < 0) this.instance.delta.y = 0;
        if (this.instance.delta.y > this.instance.limit) this.instance.delta.y = this.instance.limit;
      }
    }, {
      key: "updateScroll",
      value: function updateScroll(e) {
        if (this.isScrolling || this.isDraggingScrollbar) {
          this.instance.scroll.y = lerp(this.instance.scroll.y, this.instance.delta.y, this.lerp);
        } else {
          if (this.instance.scroll.y > this.instance.limit) {
            this.setScroll(this.instance.scroll.x, this.instance.limit);
          } else if (this.instance.scroll.y < 0) {
            this.setScroll(this.instance.scroll.x, 0);
          } else {
            this.setScroll(this.instance.scroll.x, this.instance.delta.y);
          }
        }
      }
    }, {
      key: "addDirection",
      value: function addDirection() {
        if (this.instance.delta.y > this.instance.scroll.y) {
          if (this.instance.direction !== 'down') {
            this.instance.direction = 'down';
          }
        } else if (this.instance.delta.y < this.instance.scroll.y) {
          if (this.instance.direction !== 'up') {
            this.instance.direction = 'up';
          }
        }
      }
    }, {
      key: "addSpeed",
      value: function addSpeed() {
        if (this.instance.delta.y != this.instance.scroll.y) {
          this.instance.speed = (this.instance.delta.y - this.instance.scroll.y) / Math.max(1, Date.now() - this.timestamp);
        } else {
          this.instance.speed = 0;
        }
      }
    }, {
      key: "initScrollBar",
      value: function initScrollBar() {
        this.scrollbar = document.createElement('span');
        this.scrollbarThumb = document.createElement('span');
        this.scrollbar.classList.add("".concat(this.scrollbarClass));
        this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
        this.scrollbar.append(this.scrollbarThumb);
        document.body.append(this.scrollbar); // Scrollbar Events

        this.getScrollBar = this.getScrollBar.bind(this);
        this.releaseScrollBar = this.releaseScrollBar.bind(this);
        this.moveScrollBar = this.moveScrollBar.bind(this);
        this.scrollbarThumb.addEventListener('mousedown', this.getScrollBar);
        window.addEventListener('mouseup', this.releaseScrollBar);
        window.addEventListener('mousemove', this.moveScrollBar); // Set scrollbar values

        if (this.instance.limit + this.windowHeight <= this.windowHeight) {
          return;
        }

        this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height;
        this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px");
        this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height;
      }
    }, {
      key: "reinitScrollBar",
      value: function reinitScrollBar() {
        if (this.instance.limit + this.windowHeight <= this.windowHeight) {
          return;
        }

        this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height;
        this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px");
        this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height;
      }
    }, {
      key: "destroyScrollBar",
      value: function destroyScrollBar() {
        this.scrollbarThumb.removeEventListener('mousedown', this.getScrollBar);
        window.removeEventListener('mouseup', this.releaseScrollBar);
        window.removeEventListener('mousemove', this.moveScrollBar);
        this.scrollbar.remove();
      }
    }, {
      key: "getScrollBar",
      value: function getScrollBar(e) {
        this.isDraggingScrollbar = true;
        this.checkScroll();
        this.html.classList.remove(this.scrollingClass);
        this.html.classList.add(this.draggingClass);
      }
    }, {
      key: "releaseScrollBar",
      value: function releaseScrollBar(e) {
        this.isDraggingScrollbar = false;
        this.html.classList.add(this.scrollingClass);
        this.html.classList.remove(this.draggingClass);
      }
    }, {
      key: "moveScrollBar",
      value: function moveScrollBar(e) {
        var _this5 = this;

        if (!this.isTicking && this.isDraggingScrollbar) {
          requestAnimationFrame(function () {
            var y = e.clientY * 100 / _this5.scrollbarHeight * _this5.instance.limit / 100;

            if (y > 0 && y < _this5.instance.limit) {
              _this5.instance.delta.y = y;
            }
          });
          this.isTicking = true;
        }

        this.isTicking = false;
      }
    }, {
      key: "addElements",
      value: function addElements() {
        var _this6 = this;

        this.els = [];
        this.parallaxElements = [];
        this.sections.forEach(function (section, y) {
          var els = _this6.sections[y].el.querySelectorAll("[data-".concat(_this6.name, "]"));

          els.forEach(function (el, id) {
            var cl = el.dataset[_this6.name + 'Class'] || _this6["class"];
            var top;
            var repeat = el.dataset[_this6.name + 'Repeat'];
            var call = el.dataset[_this6.name + 'Call'];
            var position = el.dataset[_this6.name + 'Position'];
            var delay = el.dataset[_this6.name + 'Delay'];
            var direction = el.dataset[_this6.name + 'Direction'];
            var sticky = typeof el.dataset[_this6.name + 'Sticky'] === 'string';
            var speed = el.dataset[_this6.name + 'Speed'] ? parseFloat(el.dataset[_this6.name + 'Speed']) / 10 : false;
            var offset = typeof el.dataset[_this6.name + 'Offset'] === 'string' ? el.dataset[_this6.name + 'Offset'].split(',') : _this6.offset;
            var target = el.dataset[_this6.name + 'Target'];
            var targetEl;

            if (target !== undefined) {
              targetEl = document.querySelector("".concat(target));
            } else {
              targetEl = el;
            }

            if (!_this6.sections[y].inView) {
              top = targetEl.getBoundingClientRect().top - getTranslate(_this6.sections[y].el).y - getTranslate(targetEl).y;
            } else {
              top = targetEl.getBoundingClientRect().top + _this6.instance.scroll.y - getTranslate(targetEl).y;
            }

            var bottom = top + targetEl.offsetHeight;
            var middle = (bottom - top) / 2 + top;

            if (sticky) {
              var elTop = el.getBoundingClientRect().top;
              var elDistance = elTop - top;
              top += window.innerHeight;
              bottom = elTop + targetEl.offsetHeight - el.offsetHeight - elDistance;
              middle = (bottom - top) / 2 + top;
            }

            if (repeat == 'false') {
              repeat = false;
            } else if (repeat != undefined) {
              repeat = true;
            } else {
              repeat = _this6.repeat;
            }

            var relativeOffset = [0, 0];

            if (offset) {
              for (var i = 0; i < offset.length; i++) {
                if (typeof offset[i] == 'string') {
                  if (offset[i].includes('%')) {
                    relativeOffset[i] = parseInt(offset[i].replace('%', '') * _this6.windowHeight / 100);
                  } else {
                    relativeOffset[i] = parseInt(offset[i]);
                  }
                } else {
                  relativeOffset[i] = offset[i];
                }
              }
            }

            var mappedEl = {
              el: el,
              id: id,
              "class": cl,
              top: top + relativeOffset[0],
              middle: middle,
              bottom: bottom - relativeOffset[1],
              offset: offset,
              repeat: repeat,
              inView: el.classList.contains(cl) ? true : false,
              call: call,
              speed: speed,
              delay: delay,
              position: position,
              target: targetEl,
              direction: direction,
              sticky: sticky
            };

            _this6.els.push(mappedEl);

            if (speed !== false || sticky) {
              _this6.parallaxElements.push(mappedEl);
            }
          });
        });
      }
    }, {
      key: "addSections",
      value: function addSections() {
        var _this7 = this;

        this.sections = [];
        var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));

        if (sections.length === 0) {
          sections = [this.el];
        }

        sections.forEach(function (section, i) {
          var offset = section.getBoundingClientRect().top - window.innerHeight * 1.5 - getTranslate(section).y;
          var limit = offset + section.getBoundingClientRect().height + window.innerHeight * 2;
          var persistent = typeof section.dataset[_this7.name + 'Persistent'] === 'string';
          var mappedSection = {
            el: section,
            offset: offset,
            limit: limit,
            inView: false,
            persistent: persistent
          };
          _this7.sections[i] = mappedSection;
        });
      }
    }, {
      key: "transform",
      value: function transform(element, x, y, delay) {
        var transform;

        if (!delay) {
          transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)");
        } else {
          var start = getTranslate(element);
          var lerpX = lerp(start.x, x, delay);
          var lerpY = lerp(start.y, y, delay);
          transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
        }

        element.style.webkitTransform = transform;
        element.style.msTransform = transform;
        element.style.transform = transform;
      }
    }, {
      key: "transformElements",
      value: function transformElements(isForced) {
        var _this8 = this;

        var setAllElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var scrollBottom = this.instance.scroll.y + this.windowHeight;
        var scrollMiddle = this.instance.scroll.y + this.windowMiddle;
        this.parallaxElements.forEach(function (current, i) {
          var transformDistance = false;

          if (isForced) {
            transformDistance = 0;
          }

          if (current.inView || setAllElements) {
            switch (current.position) {
              case 'top':
                transformDistance = _this8.instance.scroll.y * -current.speed;
                break;

              case 'elementTop':
                transformDistance = (scrollBottom - current.top) * -current.speed;
                break;

              case 'bottom':
                transformDistance = (_this8.instance.limit - scrollBottom + _this8.windowHeight) * current.speed;
                break;

              default:
                transformDistance = (scrollMiddle - current.middle) * -current.speed;
                break;
            }
          }

          if (current.sticky) {
            if (current.inView) {
              transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight;
            } else {
              if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) {
                transformDistance = 0;
              } else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) {
                transformDistance = current.bottom - current.top + window.innerHeight;
              } else {
                transformDistance = false;
              }
            }
          }

          if (transformDistance !== false) {
            if (current.direction === 'horizontal') {
              _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay);
            } else {
              _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
            }
          }
        });
      }
      /**
       * Scroll to a desired target.
       *
       * @param  Available options :
       *          targetOption {node, string, "top", "bottom", int} - The DOM element we want to scroll to
       *          offsetOption {int} - An offset to apply on top of given `target` or `sourceElem`'s target
       *          duration {int} - Duration of the scroll animation in milliseconds
       *          easing {array} - An array of 4 floats between 0 and 1 defining the bezier curve for the animation's easing. See http://greweb.me/bezier-easing-editor/example/
       * @return {void}
       */

    }, {
      key: "scrollTo",
      value: function scrollTo(targetOption, offsetOption) {
        var _this9 = this;

        var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
        var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [0.25, 0.00, 0.35, 1.00];
        var disableLerp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var callback = arguments.length > 5 ? arguments[5] : undefined;
        // TODO - In next breaking update, use an object as 2nd parameter for options (offset, duration, easing, disableLerp, callback)
        var target;
        var offset = offsetOption ? parseInt(offsetOption) : 0;
        easing = src$1.apply(void 0, _toConsumableArray$1(easing));

        if (typeof targetOption === 'string') {
          // Selector or boundaries
          if (targetOption === 'top') {
            target = 0;
          } else if (targetOption === 'bottom') {
            target = this.instance.limit;
          } else {
            target = document.querySelector(targetOption); // If the query fails, abort

            if (!target) {
              return;
            }
          }
        } else if (typeof targetOption === 'number') {
          // Absolute coordinate
          target = parseInt(targetOption);
        } else if (targetOption && targetOption.tagName) {
          // DOM Element
          target = targetOption;
        } else {
          console.warn('`targetOption` parameter is not valid');
          return;
        } // We have a target that is not a coordinate yet, get it


        if (typeof target !== 'number') {
          // Verify the given target belongs to this scroll scope
          var targetInScope = getParents(target).includes(this.el);

          if (!targetInScope) {
            // If the target isn't inside our main element, abort any action
            return;
          } // Get target offset from top


          var targetBCR = target.getBoundingClientRect();
          var offsetTop = targetBCR.top; // Try and find the target's parent section

          var targetParents = getParents(target);
          var parentSection = targetParents.find(function (candidate) {
            return _this9.sections.find(function (section) {
              return section.el == candidate;
            });
          });
          var parentSectionOffset = 0;

          if (parentSection) {
            parentSectionOffset = getTranslate(parentSection).y; // We got a parent section, store it's current offset to remove it later
          } // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)


          offset = offsetTop + offset - parentSectionOffset;
        } else {
          offset = target + offset;
        } // Actual scrollto
        // ==========================================================================
        // Setup


        var scrollStart = parseFloat(this.instance.delta.y);
        var scrollTarget = Math.max(0, Math.min(offset, this.instance.limit)); // Make sure our target is in the scroll boundaries

        var scrollDiff = scrollTarget - scrollStart;

        var render = function render(p) {
          if (disableLerp) _this9.setScroll(_this9.instance.delta.x, scrollStart + scrollDiff * p);else _this9.instance.delta.y = scrollStart + scrollDiff * p;
        }; // Prepare the scroll


        this.animatingScroll = true; // This boolean allows to prevent `checkScroll()` from calling `stopScrolling` when the animation is slow (i.e. at the beginning of an EaseIn)

        this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

        this.startScrolling(); // Restart the scroll
        // Start the animation loop

        var start = Date.now();

        var loop = function loop() {
          var p = (Date.now() - start) / duration; // Animation progress

          if (p > 1) {
            // Animation ends
            render(1);
            _this9.animatingScroll = false;
            if (duration == 0) _this9.update();
            if (callback) callback();
          } else {
            _this9.scrollToRaf = requestAnimationFrame(loop);
            render(easing(p));
          }
        };

        loop();
      }
    }, {
      key: "update",
      value: function update() {
        this.setScrollLimit();
        this.addSections();
        this.addElements();
        this.detectElements();
        this.updateScroll();
        this.transformElements(true);
        this.reinitScrollBar();
        this.checkScroll(true);
      }
    }, {
      key: "startScroll",
      value: function startScroll() {
        this.stop = false;
      }
    }, {
      key: "stopScroll",
      value: function stopScroll() {
        this.stop = true;
      }
    }, {
      key: "setScroll",
      value: function setScroll(x, y) {
        this.instance = _objectSpread2({}, this.instance, {
          scroll: {
            x: x,
            y: y
          },
          delta: {
            x: x,
            y: y
          },
          speed: 0
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(_default.prototype), "destroy", this).call(this);

        this.stopScrolling();
        this.html.classList.remove(this.smoothClass);
        this.vs.destroy();
        this.destroyScrollBar();
        window.removeEventListener('keydown', this.checkKey, false);
      }
    }]);

    return _default;
  }(_default$2);

  var _default$3 = /*#__PURE__*/function () {
    function _default() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      this.options = options;
      Object.assign(this, defaults, options);
      this.init();
    }

    _createClass$1(_default, [{
      key: "init",
      value: function init() {
        if (!this.smoothMobile) {
          this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
        }

        if (this.smooth === true && !this.isMobile) {
          this.scroll = new _default$2$1(this.options);
        } else {
          this.scroll = new _default$1$1(this.options);
        }

        this.scroll.init();

        if (window.location.hash) {
          // Get the hash without the '#' and find the matching element
          var id = window.location.hash.slice(1, window.location.hash.length);
          var target = document.getElementById(id); // If found, scroll to the element

          if (target) this.scroll.scrollTo(target);
        }
      }
    }, {
      key: "update",
      value: function update() {
        this.scroll.update();
      }
    }, {
      key: "start",
      value: function start() {
        this.scroll.startScroll();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.scroll.stopScroll();
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(target, offset, duration, easing, disableLerp, callback) {
        // TODO - In next breaking update, use an object as 2nd parameter for options (offset, duration, easing, disableLerp, callback)
        this.scroll.scrollTo(target, offset, duration, easing, disableLerp, callback);
      }
    }, {
      key: "setScroll",
      value: function setScroll(x, y) {
        this.scroll.setScroll(x, y);
      }
    }, {
      key: "on",
      value: function on(event, func) {
        this.scroll.setEvents(event, func);
      }
    }, {
      key: "off",
      value: function off(event, func) {
        this.scroll.unsetEvents(event, func);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
      }
    }]);

    return _default;
  }();

  var scroll;
  console.log("barba", ct); // (function(){
  // 	// document.documentElement.classList.remove('is-loaded');
  // 	// document.documentElement.classList.add('is-loading');
  // 	setTimeout(() => {
  // 		// document.documentElement.classList.remove('is-ready');
  // 		document.documentElement.classList.add("dom-is-loaded");
  // 		document.documentElement.classList.add("has-ANYTHING-open");
  // 	}, 300)
  // })();

  function smoothScroll(container) {
    setTimeout(function () {
      scroll = new _default$3({
        el: container.querySelector('[data-scroll-container]'),
        smooth: true,
        getSpeed: true,
        getDirection: true,
        useKeyboard: true
      });
    }, 1000); // timeout is CRUCIAL. more content on the page = set a longer timeout
    // if timeout is not set the document will still be loading
    // when smoothScroll inits and the height calculation will be wrong
    // which will make elements snap in and out of the viewport while scrolling
  }

  function transitionCallbackFn(container, obj) {
    setTimeout(function () {
      scroll.destroy(); // console.log("container", container);

      smoothScroll(container);
      document.documentElement.classList.remove("dom-is-loading");
      document.documentElement.classList.add("dom-is-loaded");
      obj.subFunction();
    }, 1050);
  }

  ct.init({
    debug: true,
    transitions: [{
      name: "Test transition",
      // sync: true,
      once: function once(data) {
        // console.log("O N C E", data.next.container);
        smoothScroll(data.next.container);
        document.documentElement.classList.add("dom-is-loading");
      },
      afterOnce: function afterOnce(data) {
        // console.log("after once", data.next.container);
        document.documentElement.classList.remove("dom-is-loading");
        document.documentElement.classList.add("dom-is-loaded");
        setTimeout(function () {
          document.documentElement.classList.add("dom-is-animated");
        }, 1050);
      },
      leave: function leave(data) {
        // console.log("L E A V E", data.current.container);
        document.documentElement.classList.remove("dom-is-loaded");
        document.documentElement.classList.remove("dom-is-animated");
        document.documentElement.classList.add("dom-is-loading");
      },
      enter: function enter(data) {// console.log("E N T E R", data.next.container);
      },
      beforeEnter: function beforeEnter(data) {
        var done = this.async();
        transitionCallbackFn(data.next.container, {
          subFunction: function subFunction() {
            done();
          }
        });
      },
      afterEnter: function afterEnter(data) {
        // console.log("after enter", data.next.container);
        document.documentElement.classList.remove("dom-is-loading");
        setTimeout(function () {
          document.documentElement.classList.add("dom-is-loaded");
          document.documentElement.classList.add("dom-is-animated");
        }, 1050);
      }
    }]
  });

  var onLoadMakeCollapsablesInert = function onLoadMakeCollapsablesInert() {
    var collapsables = document.querySelectorAll("[data-collapsed]");

    if (collapsables) {
      collapsables.forEach(function (item) {
        item.inert = true;
      });
    }
  };

  var handlePageNav = function handlePageNav() {
    var pageNav = document.querySelector(".js-page-nav");
    var pageNavToggle = document.querySelector(".js-page-nav-toggle");

    if (pageNav && pageNavToggle) {
      pageNavToggle.addEventListener("click", function () {
        var isCollapsed = pageNav.getAttribute('data-collapsed') === 'true';

        if (isCollapsed) {
          pageNav.setAttribute('data-collapsed', 'false');
          pageNav.classList.add("is-open");
          pageNav.inert = false;
          this.setAttribute("aria-expanded", "true");
        } else {
          pageNav.setAttribute('data-collapsed', 'true');
          pageNav.classList.remove("is-open");
          pageNav.inert = true;
          this.setAttribute("aria-expanded", "false");
        }
      });
    }
  };

  var handleSubmenusCollapsing = function handleSubmenusCollapsing() {
    var menuComponents = [];
    var descendantButtons = [];
    var submenuButtons = document.querySelectorAll(".js-menu-button");

    if (submenuButtons) {
      submenuButtons.forEach(function (item) {
        var itemHeader = item.parentNode;
        var itemMenu = itemHeader.nextElementSibling;
        var transitionDuration = parseFloat(window.getComputedStyle(itemMenu).transitionDuration) * 1000;
        var itemButton = itemHeader.querySelector(".js-menu-button");
        var component = {
          menu: itemMenu,
          btn: itemButton,
          transitionDuration: transitionDuration,
          collapsed: true
        };
        menuComponents.push(component);
      });
    }

    menuComponents.forEach(function (component) {
      component.btn.addEventListener("click", function () {
        var listHeader = this.parentNode;
        descendantButtons = listHeader.parentNode.querySelectorAll(".js-menu-button");

        if (component.collapsed) {
          expandSubmenu(component);
        } else {
          collapseDescendantSubmenus(descendantButtons);
          collapseSubmenu(component);
        }
      });
    });

    function collapseSubmenu(element) {
      var menu = element.menu;
      var btn = element.btn;
      var listHeader = element.btn.parentNode;
      var transitionDuration = element.transitionDuration; // get the height of the element's inner content, regardless of its actual size

      var sectionHeight = menu.scrollHeight; // temporarily disable all css transitions

      var elementTransition = menu.style.transition;
      menu.style.transition = ''; // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we 
      // aren't transitioning out of 'auto'

      requestAnimationFrame(function () {
        menu.style.height = sectionHeight + 'px';
        menu.style.transition = elementTransition; // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0

        requestAnimationFrame(function () {
          menu.style.height = 0 + 'px';
          setTimeout(function () {
            element.collapsed = true;
          }, transitionDuration);
        });
      }); // mark the section as "currently collapsed"

      menu.setAttribute('data-collapsed', 'true');
      menu.classList.remove("is-open");
      menu.inert = true;
      listHeader.querySelector("a").setAttribute("aria-expanded", "false");
      listHeader.querySelector("button").setAttribute("aria-expanded", "false");
    }

    function expandSubmenu(element) {
      var menu = element.menu;
      var btn = element.btn;
      var listHeader = element.btn.parentNode;
      var transitionDuration = element.transitionDuration; // get the height of the element's inner content, regardless of its actual size

      var sectionHeight = menu.scrollHeight; // have the element transition to the height of its inner content

      menu.style.height = sectionHeight + 'px'; // when the next css transition finishes (which should be the one we just triggered)

      menu.addEventListener('transitionend', function (e) {
        // remove this event listener so it only gets triggered once
        menu.removeEventListener('transitionend', arguments.callee); // remove "height" from the element's inline styles, so it can return to its initial value

        menu.style.height = null;
      });
      setTimeout(function () {
        element.collapsed = false;
      }, transitionDuration); // mark the section as "currently not collapsed"

      menu.setAttribute('data-collapsed', 'false');
      menu.classList.add("is-open");
      menu.inert = false;
      listHeader.querySelector("a").setAttribute("aria-expanded", "true");
      listHeader.querySelector("button").setAttribute("aria-expanded", "true");
    }

    function collapseDescendantSubmenus(element) {
      element.forEach(function (btn) {
        var menusToBeCollapsed = [];
        menusToBeCollapsed.push(btn.parentNode.nextElementSibling);
        menusToBeCollapsed.forEach(function (menu) {
          var notCollapsed = menu.getAttribute('data-collapsed') === 'false';

          if (notCollapsed) {
            btn.click();
          }
        });
      });
    }
  };

  window.addEventListener("DOMContentLoaded", function () {
    onLoadMakeCollapsablesInert();
    handleSubmenusCollapsing();
    handlePageNav();
  });

  function globals () {
    svg4everybody();
  }

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf$1(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$1(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$1(this, result);
    };
  }

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var _default$4 =
  /*#__PURE__*/
  function () {
    function _default(options) {
      _classCallCheck$3(this, _default);

      this.defaults = {
        name: 'load',
        loadingClass: 'is-loading',
        loadedClass: 'is-loaded',
        readyClass: 'is-ready',
        transitionsPrefix: 'is-',
        transitionsHistory: true,
        enterDelay: 0,
        exitDelay: 0,
        loadedDelay: 0,
        isLoaded: false,
        isEntered: false,
        isUrl: false,
        transitionContainer: null
      };
      Object.assign(this, this.defaults, options);
      this.options = options;
      this.namespace = 'modular';
      this.html = document.documentElement;
      this.href = window.location.href;
      this.container = 'data-' + this.name + '-container';
      this.subContainer = false;
      this.prevTransition = null;
      this.loadAttributes = ['src', 'srcset', 'style', 'href'];
      this.isInserted = false;
      this.isLoading = false;
      this.enterTimeout = false;
      this.controller = new AbortController();
      this.classContainer = this.html;
      this.isChrome = navigator.userAgent.indexOf("Chrome") != -1 ? true : false;
      this.init();
    }

    _createClass$3(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        window.addEventListener('popstate', function (e) {
          return _this.checkState(e);
        }, false);
        this.html.addEventListener('click', function (e) {
          return _this.checkClick(e);
        }, false);
        this.loadEls(document);
      }
    }, {
      key: "checkClick",
      value: function checkClick(e) {
        if (!e.ctrlKey && !e.metaKey) {
          var target = e.target;

          while (target && target !== document) {
            if (target.matches('a') && target.getAttribute('download') == null) {
              var href = target.getAttribute('href');

              if (!href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                this.reset();
                this.getClickOptions(target);
              }

              break;
            }

            target = target.parentNode;
          }
        }
      }
    }, {
      key: "checkState",
      value: function checkState() {
        this.reset();
        this.getStateOptions();
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.isLoading) {
          this.controller.abort();
          this.isLoading = false;
          this.controller = new AbortController();
        }

        window.clearTimeout(this.enterTimeout);

        if (this.isInserted) {
          this.removeContainer();
        }

        this.classContainer = this.html;
        Object.assign(this, this.defaults, this.options);
      }
    }, {
      key: "getClickOptions",
      value: function getClickOptions(link) {
        this.transition = link.getAttribute('data-' + this.name);
        this.isUrl = link.getAttribute('data-' + this.name + '-url');
        var href = link.getAttribute('href');
        var target = link.getAttribute('target');

        if (target == '_blank') {
          window.open(href, '_blank');
          return;
        }

        if (this.transition == 'false') {
          window.location = href;
          return;
        }

        this.setOptions(href, true);
      }
    }, {
      key: "getStateOptions",
      value: function getStateOptions() {
        if (this.transitionsHistory) {
          this.transition = history.state;
        } else {
          this.transition = false;
        }

        var href = window.location.href;
        this.setOptions(href);
      }
    }, {
      key: "goTo",
      value: function goTo(href, transition, isUrl) {
        this.reset();
        this.transition = transition;
        this.isUrl = isUrl;
        this.setOptions(href, true);
      }
    }, {
      key: "setOptions",
      value: function setOptions(href, push) {
        var container = '[' + this.container + ']';
        var oldContainer;

        if (this.transition && this.transition != 'true') {
          this.transitionContainer = '[' + this.container + '="' + this.transition + '"]';
          this.loadingClass = this.transitions[this.transition].loadingClass || this.loadingClass;
          this.loadedClass = this.transitions[this.transition].loadedClass || this.loadedClass;
          this.readyClass = this.transitions[this.transition].readyClass || this.readyClass;
          this.transitionsPrefix = this.transitions[this.transition].transitionsPrefix || this.transitionsPrefix;
          this.enterDelay = this.transitions[this.transition].enterDelay || this.enterDelay;
          this.exitDelay = this.transitions[this.transition].exitDelay || this.exitDelay;
          this.loadedDelay = this.transitions[this.transition].loadedDelay || this.loadedDelay;
          oldContainer = document.querySelector(this.transitionContainer);
        }

        if (oldContainer) {
          container = this.transitionContainer;
          this.oldContainer = oldContainer;
          this.classContainer = this.oldContainer.parentNode;

          if (!this.subContainer) {
            history.replaceState(this.transition, null, this.href);
          }

          this.subContainer = true;
        } else {
          this.oldContainer = document.querySelector(container);

          if (this.subContainer) {
            history.replaceState(this.prevTransition, null, this.href);
          }

          this.subContainer = false;
        }

        this.href = href;
        this.parentContainer = this.oldContainer.parentNode;

        if (this.isUrl === '' || this.isUrl != null && this.isUrl != 'false' && this.isUrl != false) {
          history.pushState(this.transition, null, href);
        } else {
          this.oldContainer.classList.add('is-old');
          this.setLoading();
          this.startEnterDelay();
          this.loadHref(href, container, push);
        }
      }
    }, {
      key: "setLoading",
      value: function setLoading() {
        this.classContainer.classList.remove(this.loadedClass, this.readyClass);
        this.classContainer.classList.add(this.loadingClass);
        this.classContainer.classList.remove(this.transitionsPrefix + this.prevTransition);

        if (this.transition) {
          this.classContainer.classList.add(this.transitionsPrefix + this.transition);
        }

        if (!this.subContainer) {
          this.prevTransition = this.transition;
        }

        var loadingEvent = new Event(this.namespace + 'loading');
        window.dispatchEvent(loadingEvent);
      }
    }, {
      key: "startEnterDelay",
      value: function startEnterDelay() {
        var _this2 = this;

        this.enterTimeout = window.setTimeout(function () {
          _this2.isEntered = true;

          if (_this2.isLoaded) {
            _this2.transitionContainers();
          }
        }, this.enterDelay);
      }
    }, {
      key: "loadHref",
      value: function loadHref(href, container, push) {
        var _this3 = this;

        this.isLoading = true;
        var signal = this.controller.signal;
        fetch(href, {
          signal: signal
        }).then(function (response) {
          return response.text();
        }).then(function (data) {
          if (push) {
            history.pushState(_this3.transition, null, href);
          }

          var parser = new DOMParser();
          _this3.data = parser.parseFromString(data, 'text/html');
          _this3.newContainer = _this3.data.querySelector(container);

          _this3.newContainer.classList.add('is-new');

          _this3.parentNewContainer = _this3.newContainer.parentNode;

          _this3.hideContainer();

          _this3.parentContainer.insertBefore(_this3.newContainer, _this3.oldContainer);

          _this3.isInserted = true;

          _this3.setSvgs();

          _this3.isLoaded = true;

          if (_this3.isEntered) {
            _this3.transitionContainers();
          }

          _this3.loadEls(_this3.newContainer);

          _this3.isLoading = false;
        })["catch"](function (err) {
          window.location = href;
        });
      }
    }, {
      key: "transitionContainers",
      value: function transitionContainers() {
        var _this4 = this;

        this.setAttributes();
        this.showContainer();
        this.setLoaded();
        setTimeout(function () {
          _this4.removeContainer();

          _this4.setReady();
        }, this.exitDelay);
      }
    }, {
      key: "setSvgs",
      value: function setSvgs() {
        if (this.isChrome) {
          var svgs = this.newContainer.querySelectorAll('use');

          if (svgs.length) {
            svgs.forEach(function (svg) {
              var xhref = svg.getAttribute('xlink:href');

              if (xhref) {
                svg.parentNode.innerHTML = '<use xlink:href="' + xhref + '"></use>';
              } else {
                var href = svg.getAttribute('href');
                if (href) svg.parentNode.innerHTML = '<use href="' + href + '"></use>';
              }
            });
          }
        }
      }
    }, {
      key: "setAttributes",
      value: function setAttributes() {
        var _this5 = this;

        var title = this.data.getElementsByTagName('title')[0];
        var newDesc = this.data.head.querySelector('meta[name="description"]');
        var oldDesc = document.head.querySelector('meta[name="description"]');
        var container;
        var newContainer;

        if (this.subContainer) {
          newContainer = this.parentNewContainer;
          container = document.querySelector(this.transitionContainer).parentNode;
        } else {
          newContainer = this.data.querySelector('html');
          container = document.querySelector('html');
        }

        var datas = Object.assign({}, newContainer.dataset);
        if (title) document.title = title.innerHTML;
        if (oldDesc && newDesc) oldDesc.setAttribute('content', newDesc.getAttribute('content'));

        if (datas) {
          Object.entries(datas).forEach(function (_ref) {
            var _ref2 = _slicedToArray$1(_ref, 2),
                key = _ref2[0],
                val = _ref2[1];

            container.setAttribute('data-' + _this5.toDash(key), val);
          });
        }
      }
    }, {
      key: "toDash",
      value: function toDash(str) {
        return str.split(/(?=[A-Z])/).join('-').toLowerCase();
      }
    }, {
      key: "hideContainer",
      value: function hideContainer() {
        this.newContainer.style.visibility = 'hidden';
        this.newContainer.style.height = 0;
        this.newContainer.style.overflow = 'hidden';
      }
    }, {
      key: "showContainer",
      value: function showContainer() {
        this.newContainer.style.visibility = '';
        this.newContainer.style.height = '';
        this.newContainer.style.overflow = '';
      }
    }, {
      key: "loadEls",
      value: function loadEls(container) {
        var _this6 = this;

        var promises = [];
        this.loadAttributes.forEach(function (attr) {
          var data = 'data-' + _this6.name + '-' + attr;
          var els = container.querySelectorAll('[' + data + ']');

          if (els.length) {
            els.forEach(function (el) {
              var elData = el.getAttribute(data);
              el.setAttribute(attr, elData);

              if (attr == 'src' || attr == 'srcset') {
                var promise = new Promise(function (resolve) {
                  el.onload = function () {
                    return resolve(el);
                  };
                });
                promises.push(promise);
              }
            });
          }
        });
        Promise.all(promises).then(function (val) {
          var imagesEvent = new Event(_this6.namespace + 'images');
          window.dispatchEvent(imagesEvent);
        });
      }
    }, {
      key: "setLoaded",
      value: function setLoaded() {
        var _this7 = this;

        this.classContainer.classList.remove(this.loadingClass);
        setTimeout(function () {
          _this7.classContainer.classList.add(_this7.loadedClass);
        }, this.loadedDelay);
        var loadedEvent = new Event(this.namespace + 'loaded');
        window.dispatchEvent(loadedEvent);
      }
    }, {
      key: "removeContainer",
      value: function removeContainer() {
        this.parentContainer.removeChild(this.oldContainer);
        this.newContainer.classList.remove('is-new');
        this.isInserted = false;
      }
    }, {
      key: "setReady",
      value: function setReady() {
        this.classContainer.classList.add(this.readyClass);
        var readyEvent = new Event(this.namespace + 'ready');
        window.dispatchEvent(readyEvent);
      }
    }, {
      key: "on",
      value: function on(event, func) {
        var _this8 = this;

        window.addEventListener(this.namespace + event, function () {
          switch (event) {
            case 'loading':
              return func(_this8.transition, _this8.oldContainer);

            case 'loaded':
              return func(_this8.transition, _this8.oldContainer, _this8.newContainer);

            case 'ready':
              return func(_this8.transition, _this8.newContainer);

            default:
              return func();
          }
        }, false);
      }
    }]);

    return _default;
  }();

  var _default$5 = /*#__PURE__*/function (_module) {
    _inherits$1(_default, _module);

    var _super = _createSuper(_default);

    function _default(m) {
      _classCallCheck$2(this, _default);

      return _super.call(this, m);
    }

    _createClass$2(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        var load = new _default$4({
          enterDelay: 0,
          transitions: {
            customTransition: {}
          }
        });
        load.on('loaded', function (transition, oldContainer, newContainer) {
          _this.call('destroy', oldContainer, 'app');

          _this.call('update', newContainer, 'app');
        });
      }
    }]);

    return _default;
  }(_default);

  var _default$6 = /*#__PURE__*/function (_module) {
    _inherits$1(_default, _module);

    var _super = _createSuper(_default);

    function _default(m) {
      _classCallCheck$2(this, _default);

      return _super.call(this, m);
    }

    _createClass$2(_default, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.scroll = new _default$3({
          el: this.el,
          smooth: true
        });
        this.scroll.on('call', function (func, way, obj, id) {
          // Using modularJS
          _this.call(func[0], {
            way: way,
            obj: obj
          }, func[1], func[2]);
        });
        this.scroll.on('scroll', function (args) {// console.log(args.scroll);
        });
      }
    }, {
      key: "toggleLazy",
      value: function toggleLazy(args) {
        var src = this.getData('lazy', args.obj.el);

        if (src.length) {
          if (args.obj.el.tagName == "IMG") {
            args.obj.el.src = src;
          } else {
            args.obj.el.style.backgroundImage = "url(".concat(src, ")");
          }

          this.setData('lazy', '', args.obj.el);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
      }
    }]);

    return _default;
  }(_default);

  var modules = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Load: _default$5,
    Scroll: _default$6
  });

  var html = document.documentElement;
  var isDebug = !!html.getAttribute('data-debug');

  var app = new _default$1({
    modules: modules
  });

  window.onload = function (event) {
    // const $style = document.getElementById("stylesheet");
    var $style = document.getElementById("app-css");

    if ($style.isLoaded) {
      init();
    } else {
      $style.addEventListener('load', function (event) {
        init();
      });
    }
  };

  function init() {
    app.init(app);
    globals();
    html.classList.add('is-loaded', 'is-ready');
    html.classList.remove('is-loading');
  }

}());
//# sourceMappingURL=app.js.map
