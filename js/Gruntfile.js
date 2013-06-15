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
          processName: function(filename) {
            var key, dir, files, match, path;

            files = grunt.config('handlebars.compile.files');
            match = files[Object.keys(files)[0]][0];
            dir = match.slice(0, match.lastIndexOf('/')+1);
            path = filename.split(dir)[1];

            key = path.split('.')[0];

            return key;
          }
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
