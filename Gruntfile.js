/* Gruntfile */
module.exports = function(grunt) {
  // Globals.
  var TEMPLATE_DIR = 'templates/',
      COMPONENT_DIR = 'bower_components/',
      LIB_DIR = 'lib/';

  // Config.
  grunt.config.init({
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
          'app/templates.js': [TEMPLATE_DIR + '**.handlebars']
        }
      }
    },

    // Docs: (https://npmjs.org/package/grunt-contrib-requirejs)
    requirejs: {
      compile: {
        options: {
          name: 'application',
          baseUrl: "/",
          mainConfigFile: 'config.js',
          out: "./script.js"
        }
      }
    }
  });

  grunt.config.set('copy', {

    // Docs: (https://github.com/gruntjs/grunt-contrib-copy/blob/master/README.md)
    builds: {
      files: (function() {
        var dest, pairs, out = [];

        for(src in pairs = grunt.config('config.bower').alias) {
          dest = pairs[src];
          out.push({
            src: COMPONENT_DIR + src,
            dest: LIB_DIR + dest + '.js'
          });
        }

        return out;
      })()
    }

  });

  // Vars.
  var modules;

  // Load plugins.
  modules = Object.keys(grunt.config('config.package').devDependencies);
  modules.forEach(function(plugin) {
    if(!!~plugin.indexOf('grunt-'))
      grunt.loadNpmTasks(plugin);
  });

  // Register tasks.
  grunt.registerTask('setup', ['copy:builds']);
  grunt.registerTask('default', ['handlebars', 'watch']);

};
