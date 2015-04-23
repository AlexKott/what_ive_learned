module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
          options: {
            browsers: ['last 2 versions']
          },
          build: {
            src: 'style.css',
            dest: 'build/style.css'
          }
        },

        connect: {
            build: {
                options: {
                    port: 9000,
                    base: '',
                    keepalive: false
                }
            }
        },

        cssmin: {
          target: {
            files: [{
              src: 'build/style.css',
              dest: 'build/style.css'
            }]
          }
        },

        htmlmin: {
          dist: {
            options: {
              removeComments: true,
              collapseWhitespace: true
            },
            files: {
              'build/index.html': 'index.html'
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
                    'build/bundle.js': 'bundle.js',
                },
                options: {
                    preserveComments: false,
                }
            }
        },

        watch: {
            js: {
                files: 'js/**',
                tasks: 'webpack',
                options: {
                    livereload: true,
                },
            },
            less: {
                files: 'less/**',
                tasks: ['less', 'webpack'],
                options: {
                    livereload: true,
                }
            }
        },

        webpack: {
            build: {
                entry: "./js/app.js",
                output: {
                    path: __dirname,
                    filename: "bundle.js"
                }
            }
        }

});

    grunt.registerTask('serve', ['webpack', 'connect:build', 'watch']);
    grunt.registerTask('build', ['webpack', 'uglify', 'less', 'autoprefixer:build', 'cssmin', 'htmlmin']);

};
