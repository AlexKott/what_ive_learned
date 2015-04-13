module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            build: {
                options: {
                    port: 9000,
                    base: '',
                    keepalive: false
                }
            }
        },

        less: {
            build: {
                files: {
                    'style.css': 'less/main.less'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/script.js': 'dist/script.js',
                },
                options: {
                    preserveComments: false,
                }
            }
        },

        watch: {
            js: {
                files: 'js/**',
                options: {
                    livereload: true,
                },
            },
            css: {
                files: 'less/**',
                tasks: 'less',
                options: {
                    livereload: true,
                },
            },
            html: {
                files: 'html/**',
                tasks: ['copy:dev', 'rename:dev', 'replace'],
                options: {
                    livereload: true,
                },
            },
        },

        webpack: {
            build: {
                entry: "./js/main.js",
                output: {
                    path: __dirname,
                    filename: "bundle.js"
                }
            }
        }

});

    grunt.registerTask('serve', ['webpack', 'connect:build', 'watch']);

};
