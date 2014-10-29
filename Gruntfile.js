'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        concat : {
            dist : {
                files : {
                    'dist/gestures.js' : [ 'components/hammerjs/hammer.js',
                            'src/gestures.js' ]
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
                    {expand: true, src: ['./bower.json'], dest: 'dist/',
                      filter: 'isFile'}, //copy bower.json
                    {expand: true, src: ['./*.md'], dest: 'dist/',
                        filter: 'isFile'}, // copy *.md
                ]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'concat',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('default', [ 'build' ]);
    grunt.registerTask('watchme', [ 'watch' ]);
};
