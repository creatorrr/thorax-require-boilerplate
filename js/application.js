/* Application init. */

// Setup requirejs.
require.config({
  paths: {
    'thorax': 'lib/thorax-mobile',
    'handlebars': 'lib/handlebars',
    'backbone': 'lib/backbone',
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'modernizr': 'lib/modernizr'
  },
  shim: {
    'thorax': {
      deps: ['jquery', 'handlebars', 'backbone', 'underscore'],
      exports: 'Thorax'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'modernizr': {
      exports: 'modernizr'
    }
  }
});

// Start application.
require(['jquery', 'app/index'], function($, init) {
  $(init);
});
