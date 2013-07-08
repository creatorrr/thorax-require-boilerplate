/* Index file. */

define(['app/namespace' /* ,'modules/sample/router' */], function(Application) {

  // Declare vars.
  var compatible, init, $, Thorax, Backbone, Modernizr, routers;

  // Load libs.
  $ = Application.libs.$;
  Thorax = Application.libs.Thorax;
  Backbone = Application.libs.Backbone;
  Modernizr = Application.libs.Modernizr;

  // Catch-all router. (Must be initialized before any other routers are initialized)
  Application.router = new (Backbone.Router.extend({
    routes: {
      '*notFound': 'catchAll'
    },
    catchAll: function (notFound) {
      var error;

      // Render error page.
      error = new Thorax.View({
        template: Thorax.templates.error,
        notFound: notFound
      });

      Application.setView(error);

    }
  }));

  // Init Routers.
  routers = [];
  for(var i in arguments)
    if(i > 0) routers.push(new arguments[i]);

  Application.routers = routers;

  // Check compatibility.
  compatible = function compatible() {
    var really = true; // Modernizr.localstorage && JSON;
    delete Modernizr;

    return really;
  }

  // Allows load:end and load:start events to propagate.
  // to the application object.
  Thorax.setRootObject(Application);

  // Hell yeah!
  init = function init() {
    // Reject incompatible devices.
    if(!compatible()) {
      alert('Oops! Seems like your device isn\'t compatible..');
      return false;
    }

    // Render template.
    Application.template = Thorax.templates.application;
    Application.appendTo('body');

    // Start Backbone history.
    Backbone.history.start({
      pushState: true,
      root: '/',
      silent: true
    });

    // Dispatch.
    Backbone.history.loadUrl();

    // Setup a[href] pushstate listeners
    $(document).on('click', 'a:not([data-bypass])', function(e) {
      var href, protocol;

      // Get the anchor href and protocol.
      href = $(this).attr('href');
      protocol = this.protocol;

      // Ensure relative url.
      if(href && href.slice(0, protocol.length) !== protocol) {
        e.preventDefault();

        Application.router.navigate(href, {trigger: true});
      }
    });
  }

  // Exports
  return init;
});
