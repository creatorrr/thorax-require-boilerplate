/* Gruntfile */
module.exports = function(grunt) {
  // Globals.
  TEMPLATE_DIR = '../templates/';

  // Config.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Docs: (https://npmjs.org/package/grunt-contrib-watch)
    watch: {
      scripts: {
        files: ['../templates/**.handlebars'],
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
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks.
  grunt.registerTask('default', ['handlebars', 'watch']);

}
