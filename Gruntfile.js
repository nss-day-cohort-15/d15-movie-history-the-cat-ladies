module.exports = function(grunt) {

  grunt.initConfig({
    // Change the b-fy task to add a transform task
    browserify: {
      js: {
          src: ['./src/js/script.js'],
          dest: './dist/app.js'
      },
      options: {
          transform: ['hbsfy']
      }
    },
    jshint: {
      options: {
        esversion: 6,
        predef: [ "document", "console" ],
        jquery: true,
        globalstrict: true,
        globals: {},
        browserify: true,
        asi: true
      },
      files: ['./src/js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          './css/main.css': './sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['./src/js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass']
      },
      hbs: {
        files: ['./templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};
