module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jscs: {
      src: "ExampleCode.js"
    },
    githooks: {
      all: {
       'pre-commit': 'test'
     }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-githooks");

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('test', ['jscs']);
};