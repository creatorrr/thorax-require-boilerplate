/* Application init. */

// Setup requirejs.
require.config({
  paths: {
    'thorax': 'lib/thorax-mobile',
    'handlebars': 'lib/handlebars',
    'backbone': 'lib/backbone',
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'modernizr': 'lib/modernizr',
    'store': 'lib/store'
  },
  shim: {
    'thorax': {
      deps: ['jquery', 'handlebars', 'backbone', 'underscore', 'app/templates'],
      exports: 'Thorax'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'modernizr': {
      exports: 'modernizr'
    },
    'app/templates': {
      deps: ['handlebars']
    }
  }
});

// Start application.
require(['jquery', 'app/index'], function($, init) {
  $(init);
});
