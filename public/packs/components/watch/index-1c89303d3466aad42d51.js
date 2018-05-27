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
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/*!*********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/component-normalizer.js ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 13:
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ 36);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 5)))

/***/ }),

/***/ 2:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/*! exports used: default, mapActions, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mapState; });
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapActions; });
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    "development" !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ("development" !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),

/***/ 36:
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 5), __webpack_require__(/*! ./../process/browser.js */ 4)))

/***/ }),

/***/ 4:
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
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
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
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

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 5:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 59:
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./app/javascript/packs/components/watch/index.vue ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_dplayer__ = __webpack_require__(/*! vue-dplayer */ 82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_dplayer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_dplayer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(/*! vuex */ 2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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





/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      options: {
        screenshot: true,
        video: { url: '', pic: '' }
      },
      lastUpdateTime: 0,
      lastUpdateActive: false,
      loaded: false
    };
  },

  components: {
    'd-player': __WEBPACK_IMPORTED_MODULE_0_vue_dplayer___default.a
  },
  methods: _extends({
    finishPlayer: function finishPlayer() {
      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      this.updatePlayer({
        id: this.movie.id,
        elapsed_time: this.$refs.player.dp.video.currentTime,
        end_time: datetime
      });
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])({
    getPlayer: 'Player/show',
    updatePlayer: 'Player/update'
  }), {
    setupPlayer: function setupPlayer() {
      if (this.player && this.player.elapsed_time != null) {
        this.$refs.player.dp.seek(this.player.elapsed_time);
      }
    },
    progressUpdate: function progressUpdate() {
      if (this.$refs.player.dp.video.currentTime - this.lastUpdateTime > 5) {
        this.lastUpdateTime = this.$refs.player.dp.video.currentTime;
        if (this.lastUpdateActive == true) {
          this.updatePlayer({
            id: this.movie.id,
            elapsed_time: this.$refs.player.dp.video.currentTime,
            end_time: null
          });
        } else {
          this.lastUpdateActive = true;
        }
      }
    }
  }),
  mounted: function mounted() {
    this.getPlayer(this.$route.params.id);
  },

  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapState */])({
    player: function player(state) {
      return state.Player.player;
    },
    movie: function movie(state) {
      return state.Player.movie;
    },
    serie: function serie(state) {
      return state.Player.serie;
    }
  })),
  watch: {
    movie: function movie() {
      this.options.video.url = this.movie.attributes.video_url;
      this.options.video.pic = this.movie.attributes.thumbnail_cover_url;
      this.loaded = true;
    }
  }

});

/***/ }),

/***/ 80:
/*!*********************************************************!*\
  !*** ./app/javascript/packs/components/watch/index.vue ***!
  \*********************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(/*! !babel-loader!../../../../../node_modules/vue-loader/lib/selector?type=script&index=0!./index.vue */ 59);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f6391eb8_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/template-compiler/index?{"id":"data-v-f6391eb8","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!../../../../../node_modules/vue-loader/lib/selector?type=template&index=0!./index.vue */ 83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/component-normalizer */ 1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(/*! !../../../../../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index?{"optionsId":"0","vue":true,"id":"data-v-f6391eb8","scoped":true,"sourceMap":true}!../../../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./index.vue */ 81)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f6391eb8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f6391eb8_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f6391eb8_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/javascript/packs/components/watch/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f6391eb8", Component.options)
  } else {
    hotAPI.reload("data-v-f6391eb8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 81:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!./node_modules/css-loader?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-f6391eb8","scoped":true,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app/javascript/packs/components/watch/index.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 82:
/*!******************************************************!*\
  !*** ./node_modules/vue-dplayer/dist/vue-dplayer.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate, clearImmediate) {/*!
 * vue-dplayer v0.0.9
 * (c) 2017-present sinchang <sinchangwen@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vueDplayer = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var DPlayer_min = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t), a.l=!0, a.exports}var n={};return t.m=e, t.c=n, t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i});}, t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n), n}, t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}, t.p="/", t(t.s=1)}([function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var i=/mobile/i.test(window.navigator.userAgent),a={secondToTime:function(e){var t=function(e){return e<10?"0"+e:""+e},n=parseInt(e/60),i=parseInt(e-60*n);return t(n)+":"+t(i)},getElementViewLeft:function(e){var t=e.offsetLeft,n=e.offsetParent,i=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;null!==n&&n!==e;)t+=n.offsetLeft, n=n.offsetParent;else for(;null!==n;)t+=n.offsetLeft, n=n.offsetParent;return t-i},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(e){var t=e.left,n=void 0===t?0:t,i=e.top,a=void 0===i?0:i;this.isFirefox?(document.documentElement.scrollLeft=n, document.documentElement.scrollTop=a):window.scrollTo(n,a);},isMobile:i,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),storage:{set:function(e,t){localStorage.setItem(e,t);},get:function(e){return localStorage.getItem(e)}},cumulativeOffset:function(e){var t=0,n=0;do{t+=e.offsetTop||0, n+=e.offsetLeft||0, e=e.offsetParent;}while(e);return{top:t,left:n}},nameMap:{dragStart:i?"touchstart":"mousedown",dragMove:i?"touchmove":"mousemove",dragEnd:i?"touchend":"mouseup"}};t.default=a;},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}), n(2);var i=n(3),a=function(e){return e&&e.__esModule?e:{default:e}}(i);console.log("\n %c DPlayer 1.21.0 8e69ada %c http://dplayer.js.org \n\n","color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;"), t.default=a.default;},function(e,t){},function(e,t,n){function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),s=n(4),r=i(s),l=n(0),c=i(l),u=n(9),d=i(u),p=n(12),h=i(p),y=n(13),m=i(y),f=n(14),v=i(f),g=n(15),b=i(g),k=n(16),w=i(k),S=n(17),T=i(S),L=n(18),x=i(L),M=n(19),_=i(M),E=n(20),q=i(E),B=n(21),P=i(B),O=n(22),j=i(O),C=n(23),z=i(C),F=n(25),I=i(F),W=n(26),D=i(W),H=n(27),A=i(H),R=n(28),V=i(R),N=0,X=[],Q=function(){function e(t){var n=this;a(this,e), this.options=(0, d.default)(t), this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality, this.quality=this.options.video.quality[this.options.video.defaultQuality]), this.tran=new h.default(this.options.lang).tran, this.icons=new v.default(this.options), this.events=new w.default, this.user=new x.default(this), this.container=this.options.container, this.container.classList.add("dplayer"), this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"), this.options.live&&this.container.classList.add("dplayer-live"), c.default.isMobile&&this.container.classList.add("dplayer-mobile"), this.arrow=this.container.offsetWidth<=500, this.arrow&&this.container.classList.add("dplayer-arrow"), this.template=new m.default({container:this.container,options:this.options,index:N,tran:this.tran,icons:this.icons}), this.video=this.template.video, this.bar=new q.default(this.template), this.bezel=new j.default(this.template.bezel), this.fullScreen=new T.default(this), this.controller=new z.default(this), this.options.danmaku&&(this.danmaku=new b.default({container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){n.template.danmakuLoading.style.display="none", n.options.autoplay?n.play():c.default.isMobile&&n.pause();},0);},error:function(e){n.notice(e);},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return n.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user},events:this.events}), this.comment=new D.default(this)), this.setting=new I.default(this), document.addEventListener("click",function(){n.focus=!1;},!0), this.container.addEventListener("click",function(){n.focus=!0;},!0), this.paused=!0, this.time=new P.default(this), this.hotkey=new A.default(this), this.contextmenu=new V.default(this), this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type), !this.danmaku&&this.options.autoplay&&this.play(), N++, X.push(this);}return o(e,[{key:"seek",value:function(e){e=Math.max(e,0), this.video.duration&&(e=Math.min(e,this.video.duration)), this.video.currentTime<e?this.notice(this.tran("FF")+" "+(e-this.video.currentTime).toFixed(0)+" "+this.tran("s")):this.video.currentTime>e&&this.notice(this.tran("REW")+" "+(this.video.currentTime-e).toFixed(0)+" "+this.tran("s")), this.video.currentTime=e, this.danmaku&&this.danmaku.seek(), this.bar.set("played",e/this.video.duration,"width");}},{key:"play",value:function(){var e=this;if(this.paused=!1, this.video.paused&&this.bezel.switch(this.icons.get("play")), this.template.playButton.innerHTML=this.icons.get("pause"), r.default.resolve(this.video.play()).catch(function(){e.pause();}).then(function(){}), this.time.enable(), this.container.classList.add("dplayer-playing"), this.danmaku&&this.danmaku.play(), this.options.mutex)for(var t=0;t<X.length;t++)this!==X[t]&&X[t].pause();}},{key:"pause",value:function(){this.paused=!0, this.container.classList.remove("dplayer-loading"), this.video.paused||this.bezel.switch(this.icons.get("pause")), this.ended=!1, this.template.playButton.innerHTML=this.icons.get("play"), this.video.pause(), this.time.disable(), this.container.classList.remove("dplayer-playing"), this.danmaku&&this.danmaku.pause();}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=this.icons.get("volume-up"):this.volume()>0?this.template.volumeIcon.innerHTML=this.icons.get("volume-down"):this.template.volumeIcon.innerHTML=this.icons.get("volume-off");}},{key:"volume",value:function(e,t,n){if(e=parseFloat(e), !isNaN(e)){e=Math.max(e,0), e=Math.min(e,1), this.bar.set("volume",e,"width");var i=(100*e).toFixed(0)+"%";this.template.volumeBarWrapWrap.dataset.balloon=i, t||this.user.set("volume",e), n||this.notice(this.tran("Volume")+" "+(100*e).toFixed(0)+"%"), this.video.volume=e, this.video.muted&&(this.video.muted=!1), this.switchVolumeIcon();}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause();}},{key:"on",value:function(e,t){this.events.on(e,t);}},{key:"switchVideo",value:function(e,t){this.pause(), this.video.poster=e.pic?e.pic:"", this.video.src=e.url, this.initMSE(this.video,e.type||"auto"), t&&(this.template.danmakuLoading.style.display="block", this.bar.set("played",0,"width"), this.bar.set("loaded",0,"width"), this.template.ptime.innerHTML="00:00", this.template.danmaku.innerHTML="", this.danmaku&&this.danmaku.reload({id:t.id,address:t.api,token:t.token,maximum:t.maximum,addition:t.addition,user:t.user}));}},{key:"initMSE",value:function(e,t){var n=this;if(this.type=t, this.options.video.customType&&this.options.video.customType[t])"[object Function]"===Object.prototype.toString.call(this.options.video.customType[t])?this.options.video.customType[t](this.video,this):console.error("Illegal customType: "+t);else switch("auto"===this.type&&(/m3u8(#|\?|$)/i.exec(e.src)?this.type="hls":/.flv(#|\?|$)/i.exec(e.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(e.src)?this.type="dash":this.type="normal"), this.type){case"hls":if(Hls)if(Hls.isSupported()){var i=new Hls;i.loadSource(e.src), i.attachMedia(e);}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(flvjs&&flvjs.isSupported())if(flvjs.isSupported()){var a=flvjs.createPlayer({type:"flv",url:e.src});a.attachMediaElement(e), a.load();}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":dashjs?dashjs.MediaPlayer().create().initialize(e,e.src,!1):this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(WebTorrent)if(WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var o=new WebTorrent,s=e.src;o.add(s,function(e){e.files.find(function(e){return e.name.endsWith(".mp4")}).renderTo(n.video,{autoplay:n.options.autoplay},function(){n.container.classList.remove("dplayer-loading");});});}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.");}}},{key:"initVideo",value:function(e,t){var n=this;this.initMSE(e,t), this.on("durationchange",function(){1!==e.duration&&(n.template.dtime.innerHTML=c.default.secondToTime(e.duration));}), this.on("progress",function(){var t=e.buffered.length?e.buffered.end(e.buffered.length-1)/e.duration:0;n.bar.set("loaded",t,"width");}), this.on("error",function(){n.tran&&n.notice&&(n.type, n.notice(n.tran("This video fails to load"),-1));}), this.ended=!1, this.on("ended",function(){n.bar.set("played",1,"width"), n.setting.loop?(n.seek(0), e.play()):(n.ended=!0, n.pause()), n.danmaku&&(n.danmaku.danIndex=0);}), this.on("play",function(){n.paused&&n.play();}), this.on("pause",function(){n.paused||n.pause();});for(var i=0;i<this.events.videoEvents.length;i++)!function(t){e.addEventListener(n.events.videoEvents[t],function(){n.events.trigger(n.events.videoEvents[t]);});}(i);this.volume(this.user.get("volume"),!0,!0), this.options.subtitle&&(this.subtitle=new _.default(this.template.subtitle,this.video,this.options.subtitle,this.events), this.user.get("subtitle")||this.subtitle.hide());}},{key:"switchQuality",value:function(e){var t=this;if(this.qualityIndex!==e&&!this.switchingQuality){this.qualityIndex=e, this.switchingQuality=!0, this.quality=this.options.video.quality[e], this.template.qualityButton.innerHTML=this.quality.name;var n=this.video.paused;this.video.pause();var i=this.template.tplVideo(!1,null,this.options.screenshot,"auto",this.quality.url,this.options.subtitle),a=(new DOMParser).parseFromString(i,"text/html").body.firstChild;this.template.videoWrap.insertBefore(a,this.template.videoWrap.getElementsByTagName("div")[0]), this.prevVideo=this.video, this.video=a, this.initVideo(this.video,this.quality.type||this.options.video.type), this.seek(this.prevVideo.currentTime), this.notice(this.tran("Switching to")+" "+this.quality.name+" "+this.tran("quality"),-1), this.events.trigger("quality_start",this.quality), this.on("canplay",function(){if(t.prevVideo){if(t.video.currentTime!==t.prevVideo.currentTime)return void t.seek(t.prevVideo.currentTime);t.template.videoWrap.removeChild(t.prevVideo), t.video.classList.add("dplayer-video-current"), n||t.video.play(), t.prevVideo=null, t.notice(t.tran("Switched to")+" "+t.quality.name+" "+t.tran("quality")), t.switchingQuality=!1, t.events.trigger("quality_end");}});}}},{key:"notice",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.8;this.template.notice.innerHTML=e, this.template.notice.style.opacity=i, this.noticeTime&&clearTimeout(this.noticeTime), this.events.trigger("notice_show",e), this.noticeTime=setTimeout(function(){t.template.notice.style.opacity=0, t.events.trigger("notice_hide");},n);}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(), this.events.trigger("resize");}},{key:"speed",value:function(e){this.video.playbackRate=e;}},{key:"destroy",value:function(){X.splice(X.indexOf(this),1), this.pause(), this.controller.destroy(), this.time.destroy(), this.video.src="", this.container.innerHTML="", this.events.trigger("destroy");for(var e in this)this.hasOwnProperty(e)&&"paused"!==e&&delete this[e];}}]), e}();t.default=Q;},function(e,t,n){(function(e){function n(){}function i(e,t){return function(){e.apply(t,arguments);}}function a(e,t){for(;3===e._state;)e=e._value;if(0===e._state)return void e._deferreds.push(t);e._handled=!0, u._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?o:s)(t.promise,e._value);var i;try{i=n(e._value);}catch(e){return void s(t.promise,e)}o(t.promise,i);});}function o(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":d(t))||"function"==typeof t)){var n=t.then;if(t instanceof u)return e._state=3, e._value=t, void r(e);if("function"==typeof n)return void c(i(n,t),e)}e._state=1, e._value=t, r(e);}catch(t){s(e,t);}}function s(e,t){e._state=2, e._value=t, r(e);}function r(e){2===e._state&&0===e._deferreds.length&&u._immediateFn(function(){e._handled||u._unhandledRejectionFn(e._value);});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null;}function l(e,t,n){this.onFulfilled="function"==typeof e?e:null, this.onRejected="function"==typeof t?t:null, this.promise=n;}function c(e,t){var n=!1;try{e(function(e){n||(n=!0, o(t,e));},function(e){n||(n=!0, s(t,e));});}catch(e){if(n)return;n=!0, s(t,e);}}function u(e){if(!(this instanceof u))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0, this._handled=!1, this._value=void 0, this._deferreds=[], c(e,this);}Object.defineProperty(t,"__esModule",{value:!0});var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p=setTimeout,h=u.prototype;h.catch=function(e){return this.then(null,e)}, h.then=function(e,t){var i=new this.constructor(n);return a(this,new l(e,t,i)), i}, u.all=function(e){return new u(function(t,n){function i(e,s){try{if(s&&("object"===(void 0===s?"undefined":d(s))||"function"==typeof s)){var r=s.then;if("function"==typeof r)return void r.call(s,function(t){i(e,t);},n)}a[e]=s, 0==--o&&t(a);}catch(e){n(e);}}if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var a=Array.prototype.slice.call(e);if(0===a.length)return t([]);for(var o=a.length,s=0;s<a.length;s++)i(s,a[s]);})}, u.resolve=function(e){return e&&"object"===(void 0===e?"undefined":d(e))&&e.constructor===u?e:new u(function(t){t(e);})}, u.reject=function(e){return new u(function(t,n){n(e);})}, u.race=function(e){return new u(function(t,n){for(var i=0,a=e.length;i<a;i++)e[i].then(t,n);})}, u._immediateFn="function"==typeof e&&function(t){e(t);}||function(e){p(e,0);}, u._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e);}, t.default=u;}).call(t,n(5).setImmediate);},function(e,t,n){function i(e,t){this._id=e, this._clearFn=t;}var a=Function.prototype.apply;t.setTimeout=function(){return new i(a.call(setTimeout,window,arguments),clearTimeout)}, t.setInterval=function(){return new i(a.call(setInterval,window,arguments),clearInterval)}, t.clearTimeout=t.clearInterval=function(e){e&&e.close();}, i.prototype.unref=i.prototype.ref=function(){}, i.prototype.close=function(){this._clearFn.call(window,this._id);}, t.enroll=function(e,t){clearTimeout(e._idleTimeoutId), e._idleTimeout=t;}, t.unenroll=function(e){clearTimeout(e._idleTimeoutId), e._idleTimeout=-1;}, t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout();},t));}, n(6), t.setImmediate=setImmediate, t.clearImmediate=clearImmediate;},function(e,t,n){(function(e,t){!function(e,n){function i(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return c[l]=i, r(l), l++}function a(e){delete c[e];}function o(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i);}}function s(e){if(u)setTimeout(s,0,e);else{var t=c[e];if(t){u=!0;try{o(t);}finally{a(e), u=!1;}}}}if(!e.setImmediate){var r,l=1,c={},u=!1,d=e.document,p=Object.getPrototypeOf&&Object.getPrototypeOf(e);p=p&&p.setTimeout?p:e, "[object process]"==={}.toString.call(e.process)?function(){r=function(e){t.nextTick(function(){s(e);});};}():function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1;}, e.postMessage("","*"), e.onmessage=n, t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&s(+n.data.slice(t.length));};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n), r=function(n){e.postMessage(t+n,"*");};}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){s(e.data);}, r=function(t){e.port2.postMessage(t);};}():d&&"onreadystatechange"in d.createElement("script")?function(){var e=d.documentElement;r=function(t){var n=d.createElement("script");n.onreadystatechange=function(){s(t), n.onreadystatechange=null, e.removeChild(n), n=null;}, e.appendChild(n);};}():function(){r=function(e){setTimeout(s,0,e);};}(), p.setImmediate=i, p.clearImmediate=a;}}("undefined"==typeof self?void 0===e?void 0:e:self);}).call(t,n(7),n(8));},function(e,t,n){var i,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};i=function(){return this}();try{i=i||Function("return this")()||(eval)("this");}catch(e){"object"===("undefined"==typeof window?"undefined":a(window))&&(i=window);}e.exports=i;},function(e,t,n){function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function o(e){if(d===setTimeout)return setTimeout(e,0);if((d===i||!d)&&setTimeout)return d=setTimeout, setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}function s(e){if(p===clearTimeout)return clearTimeout(e);if((p===a||!p)&&clearTimeout)return p=clearTimeout, clearTimeout(e);try{return p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}function r(){f&&y&&(f=!1, y.length?m=y.concat(m):v=-1, m.length&&l());}function l(){if(!f){var e=o(r);f=!0;for(var t=m.length;t;){for(y=m, m=[];++v<t;)y&&y[v].run();v=-1, t=m.length;}y=null, f=!1, s(e);}}function c(e,t){this.fun=e, this.array=t;}function u(){}var d,p,h=e.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:i;}catch(e){d=i;}try{p="function"==typeof clearTimeout?clearTimeout:a;}catch(e){p=a;}}();var y,m=[],f=!1,v=-1;h.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)), 1!==m.length||f||o(l);}, c.prototype.run=function(){this.fun.apply(null,this.array);}, h.title="browser", h.browser=!0, h.env={}, h.argv=[], h.version="", h.versions={}, h.on=u, h.addListener=u, h.once=u, h.off=u, h.removeListener=u, h.removeAllListeners=u, h.emit=u, h.prependListener=u, h.prependOnceListener=u, h.listeners=function(e){return[]}, h.binding=function(e){throw new Error("process.binding is not supported")}, h.cwd=function(){return"/"}, h.chdir=function(e){throw new Error("process.chdir is not supported")}, h.umask=function(){return 0};},function(e,t,n){function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=n(10),s=i(o),r=n(11),l=i(r);t.default=function(e){var t={container:e.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,hotkey:!0,preload:"auto",volume:.7,apiBackend:l.default,video:{},icons:{play:["0 0 16 32","M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"],pause:["0 0 17 32","M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"],"volume-up":["0 0 21 32","M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"],"volume-down":["0 0 21 32","M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"],"volume-off":["0 0 21 32","M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"],loop:["0 0 32 32","M1.882 16.941c0 4.152 3.221 7.529 7.177 7.529v1.882c-4.996 0-9.060-4.222-9.060-9.412s4.064-9.412 9.060-9.412h7.96l-3.098-3.098 1.331-1.331 5.372 5.37-5.37 5.372-1.333-1.333 3.1-3.098h-7.962c-3.957 0-7.177 3.377-7.177 7.529zM22.94 7.529v1.882c3.957 0 7.177 3.377 7.177 7.529s-3.221 7.529-7.177 7.529h-7.962l3.098-3.098-1.331-1.331-5.37 5.37 5.372 5.372 1.331-1.331-3.1-3.1h7.96c4.998 0 9.062-4.222 9.062-9.412s-4.064-9.412-9.060-9.412z"],full:["0 0 32 33","M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"],"full-in":["0 0 32 33","M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"],setting:["0 0 32 28","M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"],right:["0 0 32 32","M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"],comment:["0 0 32 32","M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"],"comment-off":["0 0 32 32","M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"],send:["0 0 32 32","M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"],pallette:["0 0 32 32","M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"],camera:["0 0 32 32","M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"],subtitle:["0 0 32 32","M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"]},iconsColor:"#ffffff",contextmenu:[],mutex:!0};for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n]);return e.video&&!e.video.type&&(e.video.type="auto"), "object"===a(e.danmaku)&&e.danmaku&&!e.danmaku.user&&(e.danmaku.user="DIYgod"), e.subtitle&&(!e.subtitle.type&&(e.subtitle.type="webvtt"), !e.subtitle.fontSize&&(e.subtitle.fontSize="20px"), !e.subtitle.bottom&&(e.subtitle.bottom="40px"), !e.subtitle.color&&(e.subtitle.color="#fff")), e.video.quality&&(e.video.url=[e.video.quality[e.video.defaultQuality].url]), e.lang&&(e.lang=e.lang.toLowerCase()), e.icons&&(e.icons=(0, s.default)({},t.icons,e.icons)), e.contextmenu=e.contextmenu.concat([{text:"About author",link:"https://diygod.me"},{text:"About DPlayer",link:"https://github.com/MoePlayer/DPlayer"},{text:"DPlayer feedback",link:"https://github.com/DIYgod/DPlayer/issues"},{text:"DPlayer 1.21.0 8e69ada",link:"https://github.com/MoePlayer/DPlayer/releases"}]), e};},function(e,t,n){function i(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de", "5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(e){i[e]=e;}), "abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,r,l=i(e),c=1;c<arguments.length;c++){n=Object(arguments[c]);for(var u in n)o.call(n,u)&&(l[u]=n[u]);if(a){r=a(n);for(var d=0;d<r.length;d++)s.call(n,r[d])&&(l[r[d]]=n[r[d]]);}}return l};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t,n,i,a){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(4===o.readyState){if(o.status>=200&&o.status<300||304===o.status){var e=JSON.parse(o.responseText);return 0!==e.code?i(o,e):n(o,e)}a(o);}}, o.open(null!==t?"POST":"GET",e,!0), o.send(null!==t?JSON.stringify(t):null);};t.default={send:function(e,t,n){i(e,t,function(e,t){console.log("Post danmaku: ",t), n&&n();},function(e,t){alert(t.msg);},function(e){console.log("Request was unsuccessful: "+e.status);});},read:function(e,t){i(e,null,function(e,n){t(null,n.danmaku);},function(e,n){t({status:e.status,response:n});},function(e){t({status:e.status,response:null});});}};},function(e,t,n){function i(e){var t=this;this.lang=e, this.tran=function(e){return a[t.lang]&&a[t.lang][e]?a[t.lang][e]:e};}Object.defineProperty(t,"__esModule",{value:!0});var a={"zh-cn":{"Danmaku is loading":"\u5f39\u5e55\u52a0\u8f7d\u4e2d",Top:"\u9876\u90e8",Bottom:"\u5e95\u90e8",Rolling:"\u6eda\u52a8","Input danmaku, hit Enter":"\u8f93\u5165\u5f39\u5e55\uff0c\u56de\u8f66\u53d1\u9001","About author":"\u5173\u4e8e\u4f5c\u8005","DPlayer feedback":"\u64ad\u653e\u5668\u610f\u89c1\u53cd\u9988","About DPlayer":"\u5173\u4e8e DPlayer \u64ad\u653e\u5668",Loop:"\u6d17\u8111\u5faa\u73af",Speed:"\u901f\u5ea6","Opacity for danmaku":"\u5f39\u5e55\u900f\u660e\u5ea6",Normal:"\u6b63\u5e38","Please input danmaku content!":"\u8981\u8f93\u5165\u5f39\u5e55\u5185\u5bb9\u554a\u5582\uff01","Set danmaku color":"\u8bbe\u7f6e\u5f39\u5e55\u989c\u8272","Set danmaku type":"\u8bbe\u7f6e\u5f39\u5e55\u7c7b\u578b","Show danmaku":"\u663e\u793a\u5f39\u5e55","This video fails to load":"\u89c6\u9891\u52a0\u8f7d\u5931\u8d25","Switching to":"\u6b63\u5728\u5207\u6362\u81f3","Switched to":"\u5df2\u7ecf\u5207\u6362\u81f3",quality:"\u753b\u8d28",FF:"\u5feb\u8fdb",REW:"\u5feb\u9000","Unlimited danmaku":"\u6d77\u91cf\u5f39\u5e55","Send danmaku":"\u53d1\u9001\u5f39\u5e55",Setting:"\u8bbe\u7f6e","Full screen":"\u5168\u5c4f","Web full screen":"\u9875\u9762\u5168\u5c4f",Send:"\u53d1\u9001",Screenshot:"\u622a\u56fe",s:"\u79d2","Show subtitle":"\u663e\u793a\u5b57\u5e55","Hide subtitle":"\u9690\u85cf\u5b57\u5e55",Volume:"\u97f3\u91cf",Live:"\u76f4\u64ad"},"zh-tw":{"Danmaku is loading":"\u5f48\u5e55\u52a0\u8f09\u4e2d",Top:"\u9802\u90e8",Bottom:"\u5e95\u90e8",Rolling:"\u6efe\u52d5","Input danmaku, hit Enter":"\u8f38\u5165\u5f48\u5e55\uff0cEnter \u767c\u9001","About author":"\u95dc\u65bc\u4f5c\u8005","DPlayer feedback":"\u64ad\u653e\u5668\u610f\u898b\u53cd\u994b","About DPlayer":"\u95dc\u65bc DPlayer \u64ad\u653e\u5668",Loop:"\u5faa\u74b0\u64ad\u653e",Speed:"\u901f\u5ea6","Opacity for danmaku":"\u5f48\u5e55\u900f\u660e\u5ea6",Normal:"\u6b63\u5e38","Please input danmaku content!":"\u8acb\u8f38\u5165\u5f48\u5e55\u5185\u5bb9\u554a\uff01","Set danmaku color":"\u8a2d\u7f6e\u5f48\u5e55\u984f\u8272","Set danmaku type":"\u8a2d\u7f6e\u5f48\u5e55\u985e\u578b","Show danmaku":"\u986f\u793a\u5f48\u5e55","This video fails to load":"\u8996\u983b\u52a0\u8f09\u5931\u6557","Switching to":"\u6b63\u5728\u5207\u63db\u81f3","Switched to":"\u5df2\u7d93\u5207\u63db\u81f3",quality:"\u756b\u8cea",FF:"\u5feb\u9032",REW:"\u5feb\u9000","Unlimited danmaku":"\u6d77\u91cf\u5f48\u5e55","Send danmaku":"\u767c\u9001\u5f48\u5e55",Setting:"\u8a2d\u7f6e","Full screen":"\u5168\u5c4f","Web full screen":"\u9801\u9762\u5168\u5c4f",Send:"\u767c\u9001",Screenshot:"\u622a\u5716",s:"\u79d2","Show subtitle":"\u986f\u793a\u5b57\u5e55","Hide subtitle":"\u96b1\u85cf\u5b57\u5e55",Volume:"\u97f3\u91cf",Live:"\u76f4\u64ad"}};t.default=i;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){i(this,e), this.container=t.container, this.options=t.options, this.index=t.index, this.tran=t.tran, this.icons=t.icons, this.init();}return a(e,[{key:"init",value:function(){this.container.innerHTML=this.tpl(this.options,this.index,this.tran,this.icons), this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"), this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"), this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"), this.volumeButton=this.container.querySelector(".dplayer-volume"), this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"), this.playedBar=this.container.querySelector(".dplayer-played"), this.loadedBar=this.container.querySelector(".dplayer-loaded"), this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"), this.playedBarTime=this.container.querySelector(".dplayer-bar-time"), this.danmaku=this.container.querySelector(".dplayer-danmaku"), this.danmakuLoading=this.container.querySelector(".dplayer-danloading"), this.video=this.container.querySelector(".dplayer-video-current"), this.bezel=this.container.querySelector(".dplayer-bezel-icon"), this.playButton=this.container.querySelector(".dplayer-play-icon"), this.videoWrap=this.container.querySelector(".dplayer-video-wrap"), this.controllerMask=this.container.querySelector(".dplayer-controller-mask"), this.ptime=this.container.querySelector(".dplayer-ptime"), this.settingButton=this.container.querySelector(".dplayer-setting-icon"), this.settingBox=this.container.querySelector(".dplayer-setting-box"), this.mask=this.container.querySelector(".dplayer-mask"), this.loop=this.container.querySelector(".dplayer-setting-loop"), this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"), this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"), this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"), this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"), this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"), this.speed=this.container.querySelector(".dplayer-setting-speed"), this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"), this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"), this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"), this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"), this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"), this.dtime=this.container.querySelector(".dplayer-dtime"), this.controller=this.container.querySelector(".dplayer-controller"), this.commentInput=this.container.querySelector(".dplayer-comment-input"), this.commentButton=this.container.querySelector(".dplayer-comment-icon"), this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"), this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"), this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon .dplayer-fill"), this.commentSendButton=this.container.querySelector(".dplayer-send-icon"), this.commentSendFill=this.container.querySelector(".dplayer-send-icon .dplayer-fill"), this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"), this.browserFullButton=this.container.querySelector(".dplayer-full-icon"), this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"), this.menu=this.container.querySelector(".dplayer-menu"), this.qualityList=this.container.querySelector(".dplayer-quality-list"), this.camareButton=this.container.querySelector(".dplayer-camera-icon"), this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"), this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"), this.subtitle=this.container.querySelector(".dplayer-subtitle"), this.qualityButton=this.container.querySelector(".dplayer-quality-icon"), this.barPreview=this.container.querySelector(".dplayer-bar-preview"), this.barWrap=this.container.querySelector(".dplayer-bar-wrap"), this.notice=this.container.querySelector(".dplayer-notice");}},{key:"tpl",value:function(e,t,n,i){return'<div class="dplayer-mask"></div><div class="dplayer-video-wrap">'+this.tplVideo(!0,e.video.pic,e.screenshot,e.preload,e.video.url,e.subtitle)+(e.logo?'<div class="dplayer-logo"><img src="'+e.logo+'"></div>':"")+'<div class="dplayer-danmaku" style="'+(e.danmaku?this.tplDanmakumargin(e.danmaku.margin):"")+'"><div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div></div><div class="dplayer-subtitle"></div><div class="dplayer-bezel"><span class="dplayer-bezel-icon"></span>'+(e.danmaku?'<span class="dplayer-danloading">'+n("Danmaku is loading")+"</span>":"")+'<span class="diplayer-loading-icon"><svg height="100%" version="1.1" viewBox="0 0 22 22" width="100%"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg></span></div></div><div class="dplayer-controller-mask"></div><div class="dplayer-controller"><div class="dplayer-icons dplayer-comment-box"><button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="'+n("Setting")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("pallette")+'</span></button><div class="dplayer-comment-setting-box"><div class="dplayer-comment-setting-color"><div class="dplayer-comment-setting-title">'+n("Set danmaku color")+'</div><label><input type="radio" name="dplayer-danmaku-color-'+t+'" value="#fff" checked><span style="background: #fff;"></span></label><label><input type="radio" name="dplayer-danmaku-color-'+t+'" value="#e54256"><span style="background: #e54256"></span></label><label><input type="radio" name="dplayer-danmaku-color-'+t+'" value="#ffe133"><span style="background: #ffe133"></span></label><label><input type="radio" name="dplayer-danmaku-color-'+t+'" value="#64DD17"><span style="background: #64DD17"></span></label><label><input type="radio" name="dplayer-danmaku-color-'+t+'" value="#39ccff"><span style="background: #39ccff"></span></label><label><input type="radio" name="dplayer-danmaku-color-'+t+'" value="#D500F9"><span style="background: #D500F9"></span></label></div><div class="dplayer-comment-setting-type"><div class="dplayer-comment-setting-title">'+n("Set danmaku type")+'</div><label><input type="radio" name="dplayer-danmaku-type-'+t+'" value="top"><span>'+n("Top")+'</span></label><label><input type="radio" name="dplayer-danmaku-type-'+t+'" value="right" checked><span>'+n("Rolling")+'</span></label><label><input type="radio" name="dplayer-danmaku-type-'+t+'" value="bottom"><span>'+n("Bottom")+'</span></label></div></div><input class="dplayer-comment-input" type="text" placeholder="'+n("Input danmaku, hit Enter")+'" maxlength="30"><button class="dplayer-icon dplayer-send-icon" data-balloon="'+n("Send")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("send")+'</span></button></div><div class="dplayer-icons dplayer-icons-left"><button class="dplayer-icon dplayer-play-icon"><span class="dplayer-icon-content">'+i.get("play")+'</span></button><div class="dplayer-volume"><button class="dplayer-icon dplayer-volume-icon"><span class="dplayer-icon-content">'+i.get("volume-down")+'</span></button><div class="dplayer-volume-bar-wrap" data-balloon-pos="up"><div class="dplayer-volume-bar"><div class="dplayer-volume-bar-inner" style="background: '+e.theme+';"><span class="dplayer-thumb" style="background: '+e.theme+'"></span></div></div></div></div><span class="dplayer-time"><span class="dplayer-ptime">0:00</span> / <span class="dplayer-dtime">0:00</span></span>'+(e.live?'<span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: '+e.theme+';"></span>'+n("Live")+"</span>":"")+'</div><div class="dplayer-icons dplayer-icons-right">'+(e.video.quality?'<div class="dplayer-quality"><button class="dplayer-icon dplayer-quality-icon">'+e.video.quality[e.video.defaultQuality].name+'</button><div class="dplayer-quality-mask">'+this.tplQualityList(e.video.quality)+"</div></div>":"")+(e.screenshot?'<a href="#" class="dplayer-icon dplayer-camera-icon" data-balloon="'+n("Screenshot")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("camera")+"</span></a>":"")+'<div class="dplayer-comment"><button class="dplayer-icon dplayer-comment-icon" data-balloon="'+n("Send danmaku")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("comment")+"</span></button></div>"+(e.subtitle?'<div class="dplayer-subtitle-btn"><button class="dplayer-icon dplayer-subtitle-icon" data-balloon="'+n("Hide subtitle")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("subtitle")+"</span></button></div>":"")+'<div class="dplayer-setting"><button class="dplayer-icon dplayer-setting-icon" data-balloon="'+n("Setting")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("setting")+'</span></button><div class="dplayer-setting-box"><div class="dplayer-setting-origin-panel"><div class="dplayer-setting-item dplayer-setting-speed"><span class="dplayer-label">'+n("Speed")+'</span><div class="dplayer-toggle">'+i.get("right")+'</div></div><div class="dplayer-setting-item dplayer-setting-loop"><span class="dplayer-label">'+n("Loop")+'</span><div class="dplayer-toggle"><input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle"><label for="dplayer-toggle"></label></div></div><div class="dplayer-setting-item dplayer-setting-showdan"><span class="dplayer-label">'+n("Show danmaku")+'</span><div class="dplayer-toggle"><input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan"><label for="dplayer-toggle-dan"></label></div></div><div class="dplayer-setting-item dplayer-setting-danunlimit"><span class="dplayer-label">'+n("Unlimited danmaku")+'</span><div class="dplayer-toggle"><input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit"><label for="dplayer-toggle-danunlimit"></label></div></div><div class="dplayer-setting-item dplayer-setting-danmaku"><span class="dplayer-label">'+n("Opacity for danmaku")+'</span><div class="dplayer-danmaku-bar-wrap"><div class="dplayer-danmaku-bar"><div class="dplayer-danmaku-bar-inner"><span class="dplayer-thumb"></span></div></div></div></div></div><div class="dplayer-setting-speed-panel"><div class="dplayer-setting-speed-item" data-speed="0.5"><span class="dplayer-label">0.5</span></div><div class="dplayer-setting-speed-item" data-speed="0.75"><span class="dplayer-label">0.75</span></div><div class="dplayer-setting-speed-item" data-speed="1"><span class="dplayer-label">'+n("Normal")+'</span></div><div class="dplayer-setting-speed-item" data-speed="1.25"><span class="dplayer-label">1.25</span></div><div class="dplayer-setting-speed-item" data-speed="1.5"><span class="dplayer-label">1.5</span></div><div class="dplayer-setting-speed-item" data-speed="2"><span class="dplayer-label">2</span></div></div></div></div><div class="dplayer-full"><button class="dplayer-icon dplayer-full-in-icon" data-balloon="'+n("Web full screen")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("full-in")+'</span></button><button class="dplayer-icon dplayer-full-icon" data-balloon="'+n("Full screen")+'" data-balloon-pos="up"><span class="dplayer-icon-content">'+i.get("full")+'</span></button></div></div><div class="dplayer-bar-wrap"><div class="dplayer-bar-time hidden">00:00</div><div class="dplayer-bar-preview"></div><div class="dplayer-bar"><div class="dplayer-loaded" style="width: 0;"></div><div class="dplayer-played" style="width: 0; background: '+e.theme+'"><span class="dplayer-thumb" style="background: '+e.theme+'"></span></div></div></div></div>'+this.tplContextmenuList(e.contextmenu,n)+'<div class="dplayer-notice"></div>'}},{key:"tplDanmakumargin",value:function(e){var t="";if(e)for(var n in e)t+=n+":"+e[n]+";";return t}},{key:"tplContextmenuList",value:function(e,t){for(var n='<div class="dplayer-menu">',i=0;i<e.length;i++)n+='<div class="dplayer-menu-item"><a target="_blank" href="'+e[i].link+'">'+t(e[i].text)+"</a></div>";return n+="</div>"}},{key:"tplQualityList",value:function(e){for(var t='<div class="dplayer-quality-list">',n=0;n<e.length;n++)t+='<div class="dplayer-quality-item" data-index="'+n+'">'+e[n].name+"</div>";return t+="</div>"}},{key:"tplVideo",value:function(e,t,n,i,a,o){var s=o&&"webvtt"===o.type;return'<video class="dplayer-video '+(e?'dplayer-video-current"':"")+'" '+(t?'poster="'+t+'"':"")+" webkit-playsinline playsinline "+(n||s?'crossorigin="anonymous"':"")+" "+(i?'preload="'+i+'"':"")+' src="'+a+'">'+(s?'<track kind="metadata" default src="'+o.url+'"></track>':"")+"</video>"}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){i(this,e), this.icons=t.icons, this.iconColor=t.iconsColor;}return a(e,[{key:"get",value:function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+(this.icons[e][2]||"100%")+'" height="'+(this.icons[e][2]||"100%")+'" version="1.1" viewBox="'+this.icons[e][0]+'"><path class="dplayer-fill" style="fill:'+this.iconColor+'" d="'+this.icons[e][1]+'" id="dplayer-'+e+'"></path></svg>'}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),s=function(){function e(t){i(this,e), this.options=t, this.container=this.options.container, this.danTunnel={right:{},top:{},bottom:{}}, this.danIndex=0, this.dan=[], this.showing=!0, this._opacity=this.options.opacity, this.events=this.options.events, this.unlimited=this.options.unlimited, this._measure(""), this.load();}return o(e,[{key:"load",value:function(){var e=this,t=void 0;t=this.options.api.maximum?this.options.api.address+"v2/?id="+this.options.api.id+"&max="+this.options.api.maximum:this.options.api.address+"v2/?id="+this.options.api.id;var n=(this.options.api.addition||[]).slice(0);n.push(t), this.events&&this.events.trigger("danmaku_load_start",n), this._readAllEndpoints(n,function(t){e.dan=[].concat.apply([],t).sort(function(e,t){return e.time-t.time}), window.requestAnimationFrame(function(){e.frame();}), e.options.callback(), e.events&&e.events.trigger("danmaku_load_end");});}},{key:"reload",value:function(e){this.options.api=e, this.dan=[], this.clear(), this.load();}},{key:"_readAllEndpoints",value:function(e,t){for(var n=this,i=[],a=0,o=0;o<e.length;++o)this.options.apiBackend.read(e[o],function(o){return function(s,r){if(++a, s)s.response?n.options.error(s.response.msg):n.options.error("Request was unsuccessful: "+s.status), i[o]=[];else{var l=["right","top","bottom"];i[o]=r?r.map(function(e){return{time:e[0],type:l[e[1]],color:e[2],author:e[3],text:e[4]}}):[];}if(a===e.length)return t(i)}}(o));}},{key:"send",value:function(e,t){var n={token:this.options.api.token,player:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:e.text,color:e.color,type:e.type};this.options.apiBackend.send(this.options.api.address+"v2/",n,t), this.dan.splice(this.danIndex,0,n), this.danIndex++;var i={text:this.htmlEncode(n.text),color:n.color,type:n.type,border:"2px solid "+this.options.borderColor};this.draw(i), this.events&&this.events.trigger("danmaku_send",n);}},{key:"frame",value:function(){var e=this;if(this.dan.length&&!this.paused&&this.showing){for(var t=this.dan[this.danIndex],n=[];t&&this.options.time()>parseFloat(t.time);)n.push(t), t=this.dan[++this.danIndex];this.draw(n);}window.requestAnimationFrame(function(){e.frame();});}},{key:"opacity",value:function(e){if(void 0!==e){for(var t=this.container.getElementsByClassName("dplayer-danmaku-item"),n=0;n<t.length;n++)t[n].style.opacity=e;this._opacity=e, this.events&&this.events.trigger("danmaku_opacity",this._opacity);}return this._opacity}},{key:"draw",value:function(e){var t=this;if(this.showing){var n=this.options.height,i=this.container.offsetWidth,o=this.container.offsetHeight,s=parseInt(o/n),r=function(e){var n=e.offsetWidth||parseInt(e.style.width),i=e.getBoundingClientRect().right||t.container.getBoundingClientRect().right+n;return t.container.getBoundingClientRect().right-i},l=function(e){return(i+e)/5},c=function(e,n,o){for(var c=i/l(o),u=0;t.unlimited||u<s;u++){var d=function(a){var o=t.danTunnel[n][a+""];if(!o||!o.length)return t.danTunnel[n][a+""]=[e], e.addEventListener("animationend",function(){t.danTunnel[n][a+""].splice(0,1);}), {v:a%s};if("right"!==n)return"continue";for(var u=0;u<o.length;u++){var d=r(o[u])-10;if(d<=i-c*l(parseInt(o[u].style.width))||d<=0)break;if(u===o.length-1)return t.danTunnel[n][a+""].push(e), e.addEventListener("animationend",function(){t.danTunnel[n][a+""].splice(0,1);}), {v:a%s}}}(u);switch(d){case"continue":continue;default:if("object"===(void 0===d?"undefined":a(d)))return d.v}}return-1};"[object Array]"!==Object.prototype.toString.call(e)&&(e=[e]);for(var u=document.createDocumentFragment(),d=0;d<e.length;d++)!function(a){e[a].type||(e[a].type="right"), e[a].color||(e[a].color="#fff");var o=document.createElement("div");o.classList.add("dplayer-danmaku-item"), o.classList.add("dplayer-danmaku-"+e[a].type), e[a].border?o.innerHTML='<span style="border:'+e[a].border+'">'+e[a].text+"</span>":o.innerHTML=e[a].text, o.style.opacity=t._opacity, o.style.color=e[a].color, o.addEventListener("animationend",function(){t.container.removeChild(o);});var s=t._measure(e[a].text),r=void 0;switch(e[a].type){case"right":r=c(o,e[a].type,s), r>=0&&(o.style.width=s+1+"px", o.style.top=n*r+"px", o.style.transform="translateX(-"+i+"px)");break;case"top":r=c(o,e[a].type), r>=0&&(o.style.top=n*r+"px");break;case"bottom":r=c(o,e[a].type), r>=0&&(o.style.bottom=n*r+"px");break;default:console.error("Can't handled danmaku type: "+e[a].type);}r>=0&&(o.classList.add("dplayer-danmaku-move"), u.appendChild(o));}(d);return this.container.appendChild(u), u}}},{key:"play",value:function(){this.paused=!1;}},{key:"pause",value:function(){this.paused=!0;}},{key:"_measure",value:function(e){if(!this.context){var t=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"), this.context.font=t.getPropertyValue("font");}return this.context.measureText(e).width}},{key:"seek",value:function(){this.clear();for(var e=0;e<this.dan.length;e++){if(this.dan[e].time>=this.options.time()){this.danIndex=e;break}this.danIndex=this.dan.length;}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}}, this.danIndex=0, this.options.container.innerHTML="", this.events&&this.events.trigger("danmaku_clear");}},{key:"htmlEncode",value:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var e=this.container.offsetWidth,t=this.container.getElementsByClassName("dplayer-danmaku-item"),n=0;n<t.length;n++)t[n].style.transform="translateX(-"+e+"px)";}},{key:"hide",value:function(){this.showing=!1, this.pause(), this.clear(), this.events&&this.events.trigger("danmaku_hide");}},{key:"show",value:function(){this.seek(), this.showing=!0, this.play(), this.events&&this.events.trigger("danmaku_show");}},{key:"unlimit",value:function(e){this.unlimited=e;}}]), e}();t.default=s;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(){i(this,e), this.events={}, this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"], this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"];}return a(e,[{key:"on",value:function(e,t){this.type(e)&&"function"==typeof t&&(this.events[e]||(this.events[e]=[]), this.events[e].push(t));}},{key:"trigger",value:function(e,t){if(this.events[e]&&this.events[e].length)for(var n=0;n<this.events[e].length;n++)this.events[e][n](t);}},{key:"type",value:function(e){return-1!==this.playerEvents.indexOf(e)?"player":-1!==this.videoEvents.indexOf(e)?"video":(console.error("Unknown event name: "+e), null)}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=n(0),s=function(e){return e&&e.__esModule?e:{default:e}}(o),r=function(){function e(t){var n=this;i(this,e), this.player=t, this.player.events.on("webfullscreen",function(){n.player.resize();}), this.player.events.on("webfullscreen_cancel",function(){n.player.resize(), s.default.setScrollPosition(n.lastScrollPosition);});var a=function(){n.player.resize(), n.isFullScreen("browser")?n.player.events.trigger("fullscreen"):(s.default.setScrollPosition(n.lastScrollPosition), n.player.events.trigger("fullscreen_cancel"));};this.player.container.addEventListener("fullscreenchange",a), this.player.container.addEventListener("mozfullscreenchange",a), this.player.container.addEventListener("webkitfullscreenchange",a);}return a(e,[{key:"isFullScreen",value:function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"browser"){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"browser",t="browser"===e?"web":"browser",n=this.isFullScreen(t);switch(n||(this.lastScrollPosition=s.default.getScrollPosition()), e){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen&&this.player.video.webkitEnterFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"), document.body.classList.add("dplayer-web-fullscreen-fix"), this.player.events.trigger("webfullscreen");}n&&this.cancel(t);}},{key:"cancel",value:function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"browser"){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"), document.body.classList.remove("dplayer-web-fullscreen-fix"), this.player.events.trigger("webfullscreen_cancel");}}},{key:"toggle",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"browser";this.isFullScreen(e)?this.cancel(e):this.request(e);}}]), e}();t.default=r;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=n(0),s=function(e){return e&&e.__esModule?e:{default:e}}(o),r=function(){function e(t){i(this,e), this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"}, this.default={opacity:.7,volume:t.options.volume||.7,unlimited:(t.options.danmaku&&t.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1}, this.data={}, this.init();}return a(e,[{key:"init",value:function(){for(var e in this.storageName){var t=this.storageName[e];this.data[e]=parseFloat(s.default.storage.get(t)||this.default[e]);}}},{key:"get",value:function(e){return this.data[e]}},{key:"set",value:function(e,t){this.data[e]=t, s.default.storage.set(this.storageName[e],t);}}]), e}();t.default=r;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t,n,a,o){i(this,e), this.container=t, this.video=n, this.options=a, this.events=o, this.init();}return a(e,[{key:"init",value:function(){var e=this;if(this.container.style.fontSize=this.options.fontSize, this.container.style.bottom=this.options.bottom, this.container.style.color=this.options.color, this.video.textTracks&&this.video.textTracks[0]){var t=this.video.textTracks[0];t.oncuechange=function(){var n=t.activeCues[0];if(n){e.container.innerHTML="";var i=document.createElement("p");i.appendChild(n.getCueAsHTML()), e.container.appendChild(i);}else e.container.innerHTML="";e.events.trigger("subtitle_change");};}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"), this.events.trigger("subtitle_show");}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"), this.events.trigger("subtitle_hide");}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide();}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){i(this,e), this.elements={}, this.elements.volume=t.volumeBar, this.elements.played=t.playedBar, this.elements.loaded=t.loadedBar, this.elements.danmaku=t.danmakuOpacityBar;}return a(e,[{key:"set",value:function(e,t,n){t=Math.max(t,0), t=Math.min(t,1), this.elements[e].style[n]=100*t+"%";}},{key:"get",value:function(e){return parseFloat(this.elements[e].style.width)/100}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=n(0),s=function(e){return e&&e.__esModule?e:{default:e}}(o),r=function(){function e(t){i(this,e), this.player=t, window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60);}}(), this.types=["loading","progress"], this.init();}return a(e,[{key:"init",value:function(){for(var e=0;e<this.types.length;e++){this["init"+this.types[e]+"Checker"]();}}},{key:"initloadingChecker",value:function(){var e=this,t=0,n=0,i=!1;this.loadingChecker=setInterval(function(){e.enableloadingChecker&&(n=e.player.video.currentTime, i||n!==t||e.player.video.paused||(e.player.container.classList.add("dplayer-loading"), i=!0), i&&n>t&&!e.player.video.paused&&(e.player.container.classList.remove("dplayer-loading"), i=!1), t=n);},100);}},{key:"initprogressChecker",value:function(){var e=this;this.progressChecker=setInterval(function(){if(e.enableprogressChecker){e.player.bar.set("played",e.player.video.currentTime/e.player.video.duration,"width");var t=s.default.secondToTime(e.player.video.currentTime);e.player.template.ptime.innerHTML!==t&&(e.player.template.ptime.innerHTML=s.default.secondToTime(e.player.video.currentTime));}},100);}},{key:"enable",value:function(e){if(e)this["enable"+e+"Checker"]=!0;else for(var t=0;t<this.types.length;t++){var n=this.types[t];this["enable"+n+"Checker"]=!0;}}},{key:"disable",value:function(e){if(e)this["enable"+e+"Checker"]=!1;else for(var t=0;t<this.types.length;t++){var n=this.types[t];this["enable"+n+"Checker"]=!1;}}},{key:"destroy",value:function(e){if(e)clearInterval(this[e+"Checker"]);else for(var t=0;t<this.types.length;t++)clearInterval(this[this.types[t]+"Checker"]);}}]), e}();t.default=r;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){var n=this;i(this,e), this.container=t, this.container.addEventListener("animationend",function(){n.container.classList.remove("dplayer-bezel-transition");});}return a(e,[{key:"switch",value:function(e){this.container.innerHTML=e, this.container.classList.add("dplayer-bezel-transition");}}]), e}();t.default=o;},function(e,t,n){function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),s=n(0),r=i(s),l=n(24),c=i(l),u=function(){function e(t){var n=this;a(this,e), this.player=t, this.autoHideTimer=0, r.default.isMobile||(this.player.container.addEventListener("mousemove",function(){n.setAutoHide();}), this.player.container.addEventListener("click",function(){n.setAutoHide();}), this.player.on("play",function(){n.setAutoHide();}), this.player.on("pause",function(){n.setAutoHide();})), this.initPlayButton(), this.initThumbnails(), this.initPlayedBar(), this.initFullButton(), this.initQualityButton(), this.initScreenshotButton(), this.initSubtitleButton(), r.default.isMobile||this.initVolumeButton();}return o(e,[{key:"initPlayButton",value:function(){var e=this;this.player.template.playButton.addEventListener("click",function(){e.player.toggle();}), r.default.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){e.toggle();}), this.player.template.controllerMask.addEventListener("click",function(){e.toggle();})):(this.player.template.videoWrap.addEventListener("click",function(){e.player.toggle();}), this.player.template.controllerMask.addEventListener("click",function(){e.player.toggle();}));}},{key:"initThumbnails",value:function(){var e=this;this.player.options.video.thumbnails&&(this.thumbnails=new c.default({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}), this.player.on("loadedmetadata",function(){e.thumbnails.resize(160,e.player.video.videoHeight/e.player.video.videoWidth*160);}));}},{key:"initPlayedBar",value:function(){var e=this,t=function(t){var n=((t.clientX||t.changedTouches[0].clientX)-r.default.getElementViewLeft(e.player.template.playedBarWrap))/e.player.template.playedBarWrap.clientWidth;n=Math.max(n,0), n=Math.min(n,1), e.player.bar.set("played",n,"width"), e.player.template.ptime.innerHTML=r.default.secondToTime(n*e.player.video.duration);},n=function n(i){document.removeEventListener(r.default.nameMap.dragEnd,n), document.removeEventListener(r.default.nameMap.dragMove,t);var a=((i.clientX||i.changedTouches[0].clientX)-r.default.getElementViewLeft(e.player.template.playedBarWrap))/e.player.template.playedBarWrap.clientWidth;a=Math.max(a,0), a=Math.min(a,1), e.player.bar.set("played",a,"width"), e.player.seek(e.player.bar.get("played")*e.player.video.duration), e.player.time.enable("progress");};this.player.template.playedBarWrap.addEventListener(r.default.nameMap.dragStart,function(){e.player.time.disable("progress"), document.addEventListener(r.default.nameMap.dragMove,t), document.addEventListener(r.default.nameMap.dragEnd,n);}), this.player.template.playedBarWrap.addEventListener(r.default.nameMap.dragMove,function(t){if(e.player.video.duration){var n=r.default.cumulativeOffset(e.player.template.playedBarWrap).left,i=(t.clientX||t.changedTouches[0].clientX)-n;if(i<0||i>e.player.template.playedBarWrap.offsetWidth)return;var a=e.player.video.duration*(i/e.player.template.playedBarWrap.offsetWidth);e.thumbnails&&e.thumbnails.move(i), e.player.template.playedBarTime.style.left=i-20+"px", e.player.template.playedBarTime.innerText=r.default.secondToTime(a), e.player.template.playedBarTime.classList.remove("hidden");}}), this.player.template.playedBarWrap.addEventListener("mouseenter",function(){e.player.video.duration&&(e.thumbnails&&e.thumbnails.show(), e.player.template.playedBarTime.classList.remove("hidden"));}), this.player.template.playedBarWrap.addEventListener("mouseleave",function(){e.player.video.duration&&(e.thumbnails&&e.thumbnails.hide(), e.player.template.playedBarTime.classList.add("hidden"));});}},{key:"initFullButton",value:function(){var e=this;this.player.template.browserFullButton.addEventListener("click",function(){e.player.fullScreen.toggle("browser");}), this.player.template.webFullButton.addEventListener("click",function(){e.player.fullScreen.toggle("web");});}},{key:"initVolumeButton",value:function(){var e=this,t=function(t){var n=t||window.event,i=((n.clientX||n.changedTouches[0].clientX)-r.default.getElementViewLeft(e.player.template.volumeBarWrap)-5.5)/35;e.player.volume(i);},n=function n(){document.removeEventListener(r.default.nameMap.dragEnd,n), document.removeEventListener(r.default.nameMap.dragMove,t), e.player.template.volumeButton.classList.remove("dplayer-volume-active");};this.player.template.volumeBarWrapWrap.addEventListener("click",function(t){var n=t||window.event,i=((n.clientX||n.changedTouches[0].clientX)-r.default.getElementViewLeft(e.player.template.volumeBarWrap)-5.5)/35;e.player.volume(i);}), this.player.template.volumeBarWrapWrap.addEventListener(r.default.nameMap.dragStart,function(){document.addEventListener(r.default.nameMap.dragMove,t), document.addEventListener(r.default.nameMap.dragEnd,n), e.player.template.volumeButton.classList.add("dplayer-volume-active");}), this.player.template.volumeIcon.addEventListener("click",function(){e.player.video.muted?(e.player.video.muted=!1, e.player.switchVolumeIcon(), e.player.bar.set("volume",e.player.volume(),"width")):(e.player.video.muted=!0, e.player.template.volumeIcon.innerHTML=e.player.icons.get("volume-off"), e.player.bar.set("volume",0,"width"));});}},{key:"initQualityButton",value:function(){var e=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(t){t.target.classList.contains("dplayer-quality-item")&&e.player.switchQuality(t.target.dataset.index);});}},{key:"initScreenshotButton",value:function(){var e=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var t=document.createElement("canvas");t.width=e.player.video.videoWidth, t.height=e.player.video.videoHeight, t.getContext("2d").drawImage(e.player.video,0,0,t.width,t.height);var n=t.toDataURL();e.player.template.camareButton.href=n, e.player.template.camareButton.download="DPlayer.png", e.player.events.trigger("screenshot",n);});}},{key:"initSubtitleButton",value:function(){var e=this;this.player.options.subtitle&&(this.player.events.on("subtitle_show",function(){e.player.template.subtitleButton.dataset.balloon=e.player.tran("Hide subtitle"), e.player.template.subtitleButtonInner.style.opacity="", e.player.user.set("subtitle",1);}), this.player.events.on("subtitle_hide",function(){e.player.template.subtitleButton.dataset.balloon=e.player.tran("Show subtitle"), e.player.template.subtitleButtonInner.style.opacity="0.4", e.player.user.set("subtitle",0);}), this.player.template.subtitleButton.addEventListener("click",function(){e.player.subtitle.toggle();}));}},{key:"setAutoHide",value:function(){var e=this;this.show(), clearTimeout(this.autoHideTimer), this.autoHideTimer=setTimeout(function(){!e.player.video.played.length||e.player.paused||e.disableAutoHide||e.hide();},3e3);}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller");}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"), this.player.setting.hide(), this.player.comment&&this.player.comment.hide();}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show();}},{key:"destroy",value:function(){clearTimeout(this.autoHideTimer);}}]), e}();t.default=u;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){i(this,e), this.container=t.container, this.barWidth=t.barWidth, this.container.style.backgroundImage="url('"+t.url+"')", this.events=t.events;}return a(e,[{key:"resize",value:function(e,t){this.container.style.width=e+"px", this.container.style.height=t+"px", this.container.style.top=2-t+"px";}},{key:"show",value:function(){this.container.style.display="block", this.events&&this.events.trigger("thumbnails_show");}},{key:"move",value:function(e){this.container.style.backgroundPosition="-"+160*(Math.ceil(e/this.barWidth*100)-1)+"px 0", this.container.style.left=e-this.container.offsetWidth/2+"px";}},{key:"hide",value:function(){this.container.style.display="none", this.events&&this.events.trigger("thumbnails_hide");}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=n(0),s=function(e){return e&&e.__esModule?e:{default:e}}(o),r=function(){function e(t){var n=this;i(this,e), this.player=t, this.player.template.mask.addEventListener("click",function(){n.hide();}), this.player.template.settingButton.addEventListener("click",function(){n.show();}), this.loop=this.player.options.loop, this.player.template.loopToggle.checked=this.loop, this.player.template.loop.addEventListener("click",function(){n.player.template.loopToggle.checked=!n.player.template.loopToggle.checked, n.player.template.loopToggle.checked?n.loop=!0:n.loop=!1, n.hide();}), this.showDanmaku=this.player.user.get("danmaku"), this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(), this.player.template.showDanmakuToggle.checked=this.showDanmaku, this.player.template.showDanmaku.addEventListener("click",function(){n.player.template.showDanmakuToggle.checked=!n.player.template.showDanmakuToggle.checked, n.player.template.showDanmakuToggle.checked?(n.showDanmaku=!0, n.player.danmaku.show()):(n.showDanmaku=!1, n.player.danmaku.hide()), n.player.user.set("danmaku",n.showDanmaku?1:0), n.hide();}), this.unlimitDanmaku=this.player.user.get("unlimited"), this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku, this.player.template.unlimitDanmaku.addEventListener("click",function(){n.player.template.unlimitDanmakuToggle.checked=!n.player.template.unlimitDanmakuToggle.checked, n.player.template.unlimitDanmakuToggle.checked?(n.unlimitDanmaku=!0, n.player.danmaku.unlimit(!0)):(n.unlimitDanmaku=!1, n.player.danmaku.unlimit(!1)), n.player.user.set("unlimited",n.unlimitDanmaku?1:0), n.hide();}), this.player.template.speed.addEventListener("click",function(){n.player.template.settingBox.classList.add("dplayer-setting-box-narrow"), n.player.template.settingBox.classList.add("dplayer-setting-box-speed");});for(var a=0;a<this.player.template.speedItem.length;a++)!function(e){n.player.template.speedItem[e].addEventListener("click",function(){n.player.speed(n.player.template.speedItem[e].dataset.speed), n.hide();});}(a);if(this.player.danmaku){this.player.on("danmaku_opacity",function(e){n.player.bar.set("danmaku",e,"width"), n.player.user.set("opacity",e);}), this.player.danmaku.opacity(this.player.user.get("opacity"));var o=function(e){var t=e||window.event,i=((t.clientX||t.changedTouches[0].clientX)-s.default.getElementViewLeft(n.player.template.danmakuOpacityBarWrap))/130;i=Math.max(i,0), i=Math.min(i,1), n.player.danmaku.opacity(i);},r=function e(){document.removeEventListener(s.default.nameMap.dragEnd,e), document.removeEventListener(s.default.nameMap.dragMove,o), n.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active");};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(e){var t=e||window.event,i=((t.clientX||t.changedTouches[0].clientX)-s.default.getElementViewLeft(n.player.template.danmakuOpacityBarWrap))/130;i=Math.max(i,0), i=Math.min(i,1), n.player.danmaku.opacity(i);}), this.player.template.danmakuOpacityBarWrapWrap.addEventListener(s.default.nameMap.dragStart,function(){document.addEventListener(s.default.nameMap.dragMove,o), document.addEventListener(s.default.nameMap.dragEnd,r), n.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active");});}}return a(e,[{key:"hide",value:function(){var e=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"), this.player.template.mask.classList.remove("dplayer-mask-show"), setTimeout(function(){e.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"), e.player.template.settingBox.classList.remove("dplayer-setting-box-speed");},300), this.player.controller.disableAutoHide=!1;}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"), this.player.template.mask.classList.add("dplayer-mask-show"), this.player.controller.disableAutoHide=!0;}}]), e}();t.default=r;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){var n=this;i(this,e), this.player=t, this.player.template.mask.addEventListener("click",function(){n.hide();}), this.player.template.commentButton.addEventListener("click",function(){n.show();}), this.player.template.commentSettingButton.addEventListener("click",function(){n.toggleSetting();}), this.player.template.commentColorSettingBox.addEventListener("click",function(){if(n.player.template.commentColorSettingBox.querySelector("input:checked+span")){var e=n.player.template.commentColorSettingBox.querySelector("input:checked").value;n.player.template.commentSettingFill.style.fill=e, n.player.template.commentInput.style.color=e, n.player.template.commentSendFill.style.fill=e;}}), this.player.template.commentInput.addEventListener("click",function(){n.hideSetting();}), this.player.template.commentInput.addEventListener("keydown",function(e){13===(e||window.event).keyCode&&n.send();}), this.player.template.commentSendButton.addEventListener("click",function(){n.send();});}return a(e,[{key:"show",value:function(){this.player.controller.disableAutoHide=!0, this.player.template.controller.classList.add("dplayer-controller-comment"), this.player.template.mask.classList.add("dplayer-mask-show"), this.player.container.classList.add("dplayer-show-controller"), this.player.template.commentInput.focus();}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"), this.player.template.mask.classList.remove("dplayer-mask-show"), this.player.container.classList.remove("dplayer-show-controller"), this.player.controller.disableAutoHide=!1, this.hideSetting();}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open");}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open");}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting();}},{key:"send",value:function(){var e=this;if(this.player.template.commentInput.blur(), !this.player.template.commentInput.value.replace(/^\s+|\s+$/g,""))return void this.player.notice(this.player.tran("Please input danmaku content!"));this.player.danmaku.send({text:this.player.template.commentInput.value,color:this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value,type:this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value},function(){e.player.template.commentInput.value="", e.hide();});}}]), e}();t.default=o;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function e(t){i(this,e), t.options.hotkey&&document.addEventListener("keydown",function(e){if(t.focus){var n=document.activeElement.tagName.toUpperCase(),i=document.activeElement.getAttribute("contenteditable");if("INPUT"!==n&&"TEXTAREA"!==n&&""!==i&&"true"!==i){var a=e||window.event,o=void 0;switch(a.keyCode){case 32:a.preventDefault(), t.toggle();break;case 37:a.preventDefault(), t.seek(t.video.currentTime-5), t.controller.setAutoHide();break;case 39:a.preventDefault(), t.seek(t.video.currentTime+5), t.controller.setAutoHide();break;case 38:a.preventDefault(), o=t.volume()+.1, t.volume(o);break;case 40:a.preventDefault(), o=t.volume()-.1, t.volume(o);}}}}), document.addEventListener("keydown",function(e){switch((e||window.event).keyCode){case 27:t.fullScreen.isFullScreen("web")&&t.fullScreen.cancel("web");}});};t.default=a;},function(e,t,n){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1, i.configurable=!0, "value"in i&&(i.writable=!0), Object.defineProperty(e,i.key,i);}}return function(t,n,i){return n&&e(t.prototype,n), i&&e(t,i), t}}(),o=function(){function e(t){var n=this;i(this,e), this.player=t, this.player.container.addEventListener("contextmenu",function(e){var t=e||window.event;t.preventDefault();var i=n.player.container.getBoundingClientRect();n.show(t.clientX-i.left,t.clientY-i.top), n.player.template.mask.addEventListener("click",function(){n.hide();});});}return a(e,[{key:"show",value:function(e,t){this.player.template.menu.classList.add("dplayer-menu-show");var n=this.player.container.getBoundingClientRect();e+this.player.template.menu.offsetWidth>=n.width?(this.player.template.menu.style.right=n.width-e+"px", this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=e+"px", this.player.template.menu.style.right="initial"), t+this.player.template.menu.offsetHeight>=n.height?(this.player.template.menu.style.bottom=n.height-t+"px", this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=t+"px", this.player.template.menu.style.bottom="initial"), this.player.template.mask.classList.add("dplayer-mask-show"), this.player.events.trigger("contextmenu_show");}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"), this.player.template.menu.classList.remove("dplayer-menu-show"), this.player.events.trigger("contextmenu_hide");}}]), e}();t.default=o;}]).default});

});

var DPlayer = unwrapExports(DPlayer_min);
var DPlayer_min_1 = DPlayer_min.DPlayer;

var VueDPlayer = {
  props: {
    options: {
      type: Object
    }
  },
  data: function data() {
    return {
      dp: null
    };
  },
  mounted: function mounted() {
    var this$1 = this;

    this.options.container = this.$el;
    var player = this.dp = new DPlayer(this.options);
    var events = player.events;
    Object.keys(events).forEach(function (item) {
      if (item === 'events') {
        return false;
      } else {
        events[item].forEach(function (event) {
          player.on(event, function () { return this$1.$emit(event); });
        });
      }
    });
  },
  install: function install(Vue, ref) {
    if ( ref === void 0 ) ref = {};
    var name = ref.name; if ( name === void 0 ) name = 'd-player';

    Vue.component(name, this);
  },
  render: function render(h) {
    return h('div', {
      class: 'dplayer'
    }, []);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.VueDPlayer = VueDPlayer;
}

return VueDPlayer;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 5), __webpack_require__(/*! ./../../timers-browserify/main.js */ 13).setImmediate, __webpack_require__(/*! ./../../timers-browserify/main.js */ 13).clearImmediate))

/***/ }),

/***/ 83:
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f6391eb8","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app/javascript/packs/components/watch/index.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.loaded
    ? _c(
        "v-container",
        { attrs: { "mt-1": "" } },
        [
          _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", md10: "", "offset-md1": "", center: "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "" } },
                    [
                      _c("v-flex", { attrs: { xs12: "", md10: "" } }, [
                        _vm.serie
                          ? _c("h1", { staticClass: "main_title" }, [
                              _vm._v(_vm._s(_vm.serie.attributes.title))
                            ])
                          : _c("h1", { staticClass: "main_title" }, [
                              _vm._v(_vm._s(_vm.movie.attributes.title))
                            ])
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-layout",
                    { attrs: { row: "", "pt-2": "", "pb-2": "" } },
                    [
                      _c(
                        "v-flex",
                        { attrs: { xs12: "", md12: "" } },
                        [
                          _c("d-player", {
                            ref: "player",
                            attrs: { options: _vm.options },
                            on: {
                              loadstart: _vm.setupPlayer,
                              ended: _vm.finishPlayer,
                              timeupdate: _vm.progressUpdate
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    [
                      _c(
                        "v-flex",
                        { attrs: { xs12: "", md6: "", "mt-1": "" } },
                        [
                          _vm.serie
                            ? _c("h1", { staticClass: "secundary_title" }, [
                                _vm._v(_vm._s(_vm.movie.attributes.title))
                              ])
                            : _vm._e()
                        ]
                      ),
                      _vm._v(" "),
                      _vm.serie
                        ? _c(
                            "v-flex",
                            {
                              staticClass: "text-lg-right",
                              attrs: { xs8: "", md3: "" }
                            },
                            [
                              _c(
                                "v-menu",
                                {
                                  attrs: {
                                    "open-on-hover": "",
                                    top: "",
                                    "offset-y": ""
                                  }
                                },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        slot: "activator",
                                        dark: "",
                                        large: ""
                                      },
                                      slot: "activator"
                                    },
                                    [
                                      _c("v-icon", { attrs: { left: "" } }, [
                                        _vm._v("video_library")
                                      ]),
                                      _vm._v("Episodios\n            ")
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-list",
                                    { attrs: { dark: "" } },
                                    _vm._l(
                                      _vm.serie.attributes.episodes,
                                      function(episode, index) {
                                        return _c(
                                          "v-list-tile",
                                          {
                                            key: index,
                                            attrs: {
                                              to: "/watch/" + episode.id
                                            }
                                          },
                                          [
                                            _c("v-list-tile-title", [
                                              _vm._v(_vm._s(episode.title))
                                            ])
                                          ],
                                          1
                                        )
                                      }
                                    )
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.serie
                        ? _c(
                            "v-flex",
                            {
                              staticClass: "text-lg-right",
                              attrs: { xs8: "", md3: "" }
                            },
                            [
                              _c(
                                "v-btn",
                                { attrs: { dark: "", large: "" } },
                                [
                                  _c("v-icon", { attrs: { left: "" } }, [
                                    _vm._v("skip_next")
                                  ]),
                                  _vm._v("Proximo\n          ")
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f6391eb8", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

/******/ });
//# sourceMappingURL=index-1c89303d3466aad42d51.js.map