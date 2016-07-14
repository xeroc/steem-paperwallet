module.exports = function(grunt) {
 require("load-grunt-tasks")(grunt);
 grunt.initConfig({
  uglify: {
   build: {
    src: 'bundle.js',
    dest: 'bundle.min.js'
   }
  },
  browserify: {
   build: {
    src: 'main.js',
    dest: 'bundle.js'
   }
  },
  babel: {
   options: {
    sourceMap: true,
    presets: ['es2015']
   },
   dist: {
    files: {
     'main.js': 'app.js'
    }
   }
  }
 });
 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-browserify');
 grunt.registerTask('default', [
  'babel',
  'browserify',
  'uglify'
 ]);
};
