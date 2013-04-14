'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        concat : {
            dist : {
                files : {
                    'dist/gestures.js' : [ 'src/hammerjs/1.0.0/hammer.min.js',
                            'src/gestures.js' ]
                }
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
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', [ 'build' ]);
};
