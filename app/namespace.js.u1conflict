/* Application namespace */

define(['app/utils/store', 'jquery', 'thorax', 'underscore', 'backbone', 'modernizr'],
  function(Store, $, Thorax, _ /* FIXME: , Backbone, Modernizr */) {

    // Create the Application object, Application.setView() will
    // place a view inside the {{layout-element}}
    var Application = window.Application = new Thorax.LayoutView({
      name: 'application'
    });

    // Alias the special hashes for naming consistency
    Application.templates = Thorax.templates;
    Application.Views = Thorax.Views;
    Application.Models = Thorax.Models;
    Application.Collections = Thorax.Collections;

    // Initialize main application store
    Application.store = store = new Store('application');

    // Encapsulate libs
    Application.libs = {
      '$': $,
      'jQuery': $,
      '_': _,
      'Modernizr': Modernizr,
      'Backbone': Backbone,
      'Thorax': Thorax,

      'Store': Store
    };

    return Application;
});
