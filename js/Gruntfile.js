/* Gruntfile */
module.exports = function(grunt) {
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
          amd: true
        },
        files: {
          'app/templates.js': ['../templates/**.handlebars']
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
