/* Gruntfile */
module.exports = function(grunt) {
  // Globals.
  var TEMPLATE_DIR = 'templates/';

  // Vars.
  var modules;

  // Config.
  grunt.initConfig({
    config: {
      package: grunt.file.readJSON('package.json'),
      bower: grunt.file.readJSON('bower.json')
    },

    // Docs: (https://npmjs.org/package/grunt-contrib-watch)
    watch: {
      scripts: {
        files: [TEMPLATE_DIR + '**.handlebars'],
        tasks: ['handlebars'],
      }
    },

    // Docs: (https://npmjs.org/package/grunt-contrib-handlebars)
    handlebars: {
      compile:{
        options: {
          namespace: 'Handlebars.templates',
          partialsUseNamespace: true,
          processName: function(filename) {
            var key, path;

            path = filename.split(TEMPLATE_DIR)[1];
            key = path.split('.')[0];

            return key;
          }
        },
        files: {
          'js/app/templates.js': [TEMPLATE_DIR + '**.handlebars']
        }
      }
    },


    // Docs: (https://github.com/yatskevich/grunt-bower-task/blob/master/README.md)
    bower: {
      install: {
        options: {
          targetDir: 'js/components',
          layout:    'byType',
          install:   true,
          cleanup:   true
        }
      }
    },

    // Docs: (https://npmjs.org/package/grunt-contrib-requirejs)
    requirejs: {
      compile: {
        options: {
          name: 'application',
          baseUrl: "js",
          mainConfigFile: 'js/config.js',
          out: "./<%= config.bower.name %>-<%= config.bower.version %>.js"
        }
      }
    }
  });

  // Load plugins.
  modules = Object.keys(grunt.config('config.package').devDependencies);
  modules.forEach(function(plugin) {
    if(!!~plugin.indexOf('grunt-'))
      grunt.loadNpmTasks(plugin);
  });

  // Register tasks.
  grunt.registerTask('default', ['handlebars', 'watch']);

}
