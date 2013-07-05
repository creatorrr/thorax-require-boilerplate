/* Index file. */

define(['app/namespace' /* ,'modules/sample/router' */], function(Application) {

  // Declare vars.
  var compatible, init, $, Thorax, Backbone, Modernizr, routers;

  // Load libs.
  $ = Application.libs.$;
  Thorax = Application.libs.Thorax;
  Backbone = Application.libs.Backbone;
  Modernizr = Application.libs.Modernizr;

  // Load Routers.
  routers = [];
  for(var i in arguments)
    if(i > 0) routers.push(arguments[i]);

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

    // Init routers.
    Application.routers = [];
    for(var i in routers) Application.routers.push(new routers[i]);

    // Start Backbone history.
    Backbone.history.start({
      pushState: true,
      root: '/',
      silent: true
    });

    // Render template.
    Application.template = Thorax.templates.application;
    Application.appendTo('body');

    // Dispatch.
    Backbone.history.loadUrl();

    // Setup a[href] pushstate listeners
    $(document).on('click', 'a:not([data-bypass])', function(e) {
      var href, protocol;

      // Get the anchor href and protocol.
      href = $(this).prop('href');
      protocol = this.protocol;

      // Ensure relative url.
      if(href && href.slice(0, protocol.length) !== protocol) {
        e.preventDefault();

        // Application.router.navigate(href, {trigger: true});
      }
    });
  }

  // Exports
  return init;
});
