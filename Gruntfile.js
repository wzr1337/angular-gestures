'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        concat : {
            dist : {
                files : {
                    'dist/gestures.js' : [ 'bower_components/hammerjs/dist/hammer.js',
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
        },
        compress: {
            main: {
                options: {
                    archive: 'angular-gestures.zip'
                },
                files: [{flatten: true,
                    src: ['dist/*'],
                    dest: 'angular-gestures/',
                    filter: 'isFile'}]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['./*.json'], dest: 'dist/',
                      filter: 'isFile'}, //copy *.json
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
        'copy',
        'compress'
    ]);

    grunt.registerTask('default', [ 'build' ]);
};
