'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    concat : {
      dist : {
        files : {
          /*'components/hammerjs/hammer.js', */
          'dist/gestures.js' : [ 'src/gestures.js' ]
        }
      }
    },
    watch: {
      js: {
        files: ['src/{,*/}*.js'],
        tasks: ['build']
      }
    },
    clean : {
      dist : {
        files : [ {
          dot : true,
          src : [ 'dist/**' ]
        } ]
      },
      server : '.tmp'
    },
    uglify: {
      dist: {
        files: { 'dist/gestures.min.js': [ 'dist/gestures.js' ] }
      }
    },
    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      all : [ 'Gruntfile.js', 'src/*.js' ]
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['./*.md'],
            dest: 'dist/',
            filter: 'isFile'
          } // copy *.md
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'concat',
    'uglify',
    'copy',
    'bowerdist'
  ]);

  grunt.registerTask('default', [ 'build' ]);
  grunt.registerTask('watchme', [ 'watch' ]);

  grunt.registerTask('bowerdist', function () {
    var bower = require('./bower.json');
    var fs = require('fs');

    bower.main = bower.main.map(function (main) {
      return main.replace('dist/', '');
    });

    fs.writeFileSync('./dist/bower.json', JSON.stringify(bower, null, 2));
  });
};
