"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ozymandias/app', ['exports', 'ember', 'ozymandias/resolver', 'ember-load-initializers', 'ozymandias/config/environment'], function (exports, _ember, _ozymandiasResolver, _emberLoadInitializers, _ozymandiasConfigEnvironment) {

    var App = undefined;

    _ember['default'].MODEL_FACTORY_INJECTIONS = true;

    App = _ember['default'].Application.extend({
        rootElement: 'main',
        modulePrefix: _ozymandiasConfigEnvironment['default'].modulePrefix,
        podModulePrefix: _ozymandiasConfigEnvironment['default'].podModulePrefix,
        Resolver: _ozymandiasResolver['default']
    });

    (0, _emberLoadInitializers['default'])(App, _ozymandiasConfigEnvironment['default'].modulePrefix);

    exports['default'] = App;
});
define('ozymandias/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ozymandias/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _ozymandiasConfigEnvironment) {

  var name = _ozymandiasConfigEnvironment['default'].APP.name;
  var version = _ozymandiasConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ozymandias/components/dashboard-chart', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        tagName: 'canvas',
        setup: false,

        /**
        * Construction handler
        * This will create the canvas and check the given
        * input values since Chart.js can react pretty odd
        * when getting wrong and/or missing values.
        */
        didInsertElement: function didInsertElement() {
            var canvas = this.get('element');
            var context = canvas.getContext('2d');

            canvas.width = this.get('width') || $(canvas).parent().width();
            canvas.height = this.get('height') || $(canvas).parent().height();

            var data = this.get('data');
            var type = this.get('type') || 'line';
            if (!type.match(/(line|bar|radar|polarArea|pie|doughnut)/)) type = 'line';
            var options = this.get('options') !== undefined ? this.get('options') : {};

            this.setProperties({
                '_data': data,
                '_type': type,
                '_canvas': canvas,
                '_context': context,
                '_options': options
            });
            this.chartRender();
        },

        /**
        * Render the chart to the canvas
        * This function is separated from the event hook to
        * allow data overwriting which more or less results
        * in updating the chart.
        */
        chartRender: function chartRender() {
            var chart = this.get('_chart');
            if (chart !== undefined) {
                chart.destroy();
            }

            chart = new Chart(this.get('_context'), {
                type: this.get('_type'),
                data: this.get('_data'),
                options: this.get('_options')
            });

            this.setProperties({
                '_chart': chart,
                'setup': true
            });
        },

        /**
        * Chart Update Handler
        * This will re-render the chart whenever its data or
        * options changes, if the 'update' property is set to true
        */
        chartUpdate: (function () {
            if (this.get('update') === true && this.get('setup') === true) {
                this.setProperties({
                    '_data': this.get('data'),
                    '_options': this.get('options')
                });
                this.chartRender();
            }
        }).observes('data', 'options')
    });
});
define('ozymandias/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ozymandias/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ozymandias/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ozymandias/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ozymandiasConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_ozymandiasConfigEnvironment['default'].APP.name, _ozymandiasConfigEnvironment['default'].APP.version)
  };
});
define('ozymandias/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ozymandias/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ozymandias/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ozymandias/initializers/export-application-global', ['exports', 'ember', 'ozymandias/config/environment'], function (exports, _ember, _ozymandiasConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_ozymandiasConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _ozymandiasConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_ozymandiasConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ozymandias/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ozymandias/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ozymandias/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ozymandias/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ozymandias/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ozymandias/router', ['exports', 'ember', 'ozymandias/config/environment'], function (exports, _ember, _ozymandiasConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ozymandiasConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('ozymandias/routes/index', ['exports', 'ember'], function (exports, _ember) {

    var data = {
        labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
        datasets: [{
            label: 'Living Room',
            data: [69.4, 68.3, 70.1, 75.9, 55.4, 66.6]
        }, {
            label: 'Garage',
            data: [55.2, 58.4, 60.2, 60.4, 60.3, 55.9]
        }]
    };

    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            return data;
        }
    });
});
define('ozymandias/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("ozymandias/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ozymandias/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ozymandias/templates/components/dashboard-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ozymandias/templates/components/dashboard-chart.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ozymandias/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "ozymandias/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Dashboard");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "dashboard-chart", [], ["height", "400", "data", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 36], [3, 41]]]]], [], []], "update", true], ["loc", [null, [3, 0], [3, 55]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ozymandias/config/environment', ['ember'], function(Ember) {
  var prefix = 'ozymandias';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ozymandias/app")["default"].create({"name":"ozymandias","version":"0.0.0+e74f4b6c"});
}

/* jshint ignore:end */
//# sourceMappingURL=ozymandias.map