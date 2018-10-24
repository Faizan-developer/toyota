var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '');
var packageName = "package/package" + utc;
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        assemble: {
            options: {
                flatten: true,
                partials: ['templates/includes/*.hbs'],
                layoutdir: 'templates/layouts',
                layout: 'default.hbs',
                helpers: ['lib/**/*.js'],
                removeHbsWhitespace: true,
                production: "false",
                data: ['json/data.json'],
                version: Math.floor((Math.random() * 1000) + 1),
                //    deploy:"false"
                //  ext: '_en.html'
            },
            //build:{
            //
            //    options:{
            //        production: true
            //    }
            //},
            en: {
                options: {
                    language: "en"
                },
                files: {'en/': ['templates/*.hbs']}
            },
            ar: {
                options: {
                    language: "ar"
                },
                files: {'ar/': ['templates/*.hbs']}
            },
            enProduction: {
                options: {
                    language: "en",
                    production: "true"
                },
                files: {'en/': ['templates/*.hbs']}
            },
            arProduction: {
                options: {
                    language: "ar",
                    production: "true"
                },
                files: {'ar/': ['templates/*.hbs']}
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'needreplace/media/Project/ToyotaTheme/Common/css/style.css': 'needreplace/media/Project/ToyotaTheme/Common/sass/style.scss',
                    'needreplace/media/Project/ToyotaTheme/Common/css/style_ar.css': 'needreplace/media/Project/ToyotaTheme/Common/sass/style_ar.scss'

                    // 'needreplace/media/Project/ToyotaTheme/Common/css/style_ar.css': 'needreplace/media/Project/ToyotaTheme/Common/css/style_ar.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['needreplace/media/Project/ToyotaTheme/Common/sass/*.scss', 'needreplace/media/Project/ToyotaTheme/Common/sass/**/*.scss'],
                tasks: ['sass', 'rtlcss', 'cssmin']
            },
            assemble: {
                files: ['templates/**/*.hbs'],
                tasks: ['assemble:en', 'assemble:ar']
            },
            compass: {
                files: ['needreplace/media/Project/ToyotaTheme/Common/images/icons/icons/*.png'],
                tasks: ['compass', 'sass'],
                options: {
                    event: ['changed', 'added', 'deleted']
                }
            },
            options: {
                spawn: false,
                //   event: ['added', 'deleted']
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            target: {
                files: {
                    'needreplace/media/Project/ToyotaTheme/Common/css/reset.min.css': ['needreplace/media/Project/ToyotaTheme/Common/css/reset.css'],
                    'needreplace/media/Project/ToyotaTheme/Common/css/style.min.css': ['needreplace/media/Project/ToyotaTheme/Common/css/style.css'],
                    'needreplace/media/Project/ToyotaTheme/Common/css/style_ar.min.css': ['needreplace/media/Project/ToyotaTheme/Common/css/style_arabic.css', 'needreplace/media/Project/ToyotaTheme/Common/css/style_ar.css'],
                    'needreplace/media/Project/ToyotaTheme/Common/css/edit-main.min.css': ['needreplace/media/Project/ToyotaTheme/Common/css/edit-main.css'],
                    'needreplace/media/Project/ToyotaTheme/Common/css/app.min.css': ['needreplace/media/Project/ToyotaTheme/Common/css/reset.css', 'needreplace/media/Project/ToyotaTheme/Common/css/style.css'],
                    'needreplace/media/Project/ToyotaTheme/Common/css/app-ar.min.css': ['needreplace/media/Project/ToyotaTheme/Common/css/reset.css', 'needreplace/media/Project/ToyotaTheme/Common/css/style_arabic.css', 'needreplace/media/Project/ToyotaTheme/Common/css/style_ar.css']
                }
            }
        },
        tinypng: {
            options: {
                apiKey: "JrouuOhPO189HHtUstQnQ1zAzJ3etgon",
                checkSigs: false,
                sigFile: 'file_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true
            },
            compress_jpg: {
                expand: true,
                src: 'needreplace/media/Project/ToyotaTheme/Common/images/icons/**/*.{jpg,jpeg}',
                dest: 'compress-img/'
                // ext: '.min.png'
            },
            compress_png: {
                expand: true,
                src: ['needreplace/media/Project/ToyotaTheme/Common/images/icons/**/*.png', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons/*.png'],
                dest: 'compress-img/'
                // ext: '.min.png'
            }
        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['needreplace/media/Project/ToyotaTheme/Common/js/jquery/jquery-3.2.1.min.js', 'needreplace/media/Project/ToyotaTheme/Common/js/lib/*.js', 'needreplace/media/Project/ToyotaTheme/Common/js/plugins/storeLocator/local-jquery.storelocator.js', 'needreplace/media/Project/ToyotaTheme/Common/js/default.js'],
                dest: 'needreplace/media/Project/ToyotaTheme/Common/js/app.js'
            }
        },
        uglify: {
            my_target: {
                options: {
                    mangle: false
                },
                files: [{
                    'needreplace/media/Project/ToyotaTheme/Common/js/app.min.js': 'needreplace/media/Project/ToyotaTheme/Common/js/app.js'
                }, {
                    expand: true,
                    cwd: 'needreplace/media/Project/ToyotaTheme/Common/js/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'needreplace/media/Project/ToyotaTheme/Common/js/',
                    ext: '.min.js'
                }, {
                    expand: true,
                    cwd: 'needreplace/media/Project/ToyotaTheme/Common/js/lib',
                    src: ['*.js', '!*.min.js'],
                    dest: 'needreplace/media/Project/ToyotaTheme/Common/js/lib',
                    ext: '.min.js'
                }]
            },
        },
        compass: {                  // Task
            dist: {                   // Target
                options: {
                    config: 'config.rb',
                    force: true,
                    sassDir: 'needreplace/media/Project/ToyotaTheme/Common/sass/icon/',
                    cssDir: 'needreplace/media/Project/ToyotaTheme/Common/css/',
                    environment: 'development'
                }
            }
        },
        htmlmin: {                                     // Task
            en: {
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },// Another target
                files: [{
                    expand: true,
                    cwd: 'en/',
                    src: ['*.html'],
                    dest: 'en/'
                }]
            },
            ar: {
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },                                          // Another target
                files: [{
                    expand: true,
                    cwd: 'ar/',
                    src: ['*.html'],
                    dest: 'ar/'
                }]
            }
        },
        zip: {
            'unminified': {
                src: ['needreplace/media/Project/ToyotaTheme/Common/**/*', 'en/**/*', 'ar/**/*', '!needreplace/media/Project/ToyotaTheme/Common/css/app.min.css', '!needreplace/media/Project/ToyotaTheme/Common/css/app-ar.min.css', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons/**', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons-2x/**', '!needreplace/media/Project/ToyotaTheme/Common/js/app.min.js'],
                dest: packageName + ".zip"
            },
            //'minified': {
            //    src: ['needreplace/media/Project/ToyotaTheme/Common/css/app.min.css', 'needreplace/media/Project/ToyotaTheme/Common/css/app-ar.min.css', 'needreplace/media/Project/ToyotaTheme/Common/fonts/*', 'needreplace/media/Project/ToyotaTheme/Common/images/icons/**/*', 'ar/**/*', 'en/**/*', 'needreplace/media/Project/ToyotaTheme/Common/js/app.min.js', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons/**', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons-2x/**'],
            //    dest: packageName + "-min.zip"
            //},
            'backup': {
                src: ['needreplace//**/*', 'templates/**/*', 'lib/**/*', 'lib/**/*', 'needreplace/media/Project/ToyotaTheme/Common/**/*', 'en/**/*', 'ar/**/*', '!needreplace/media/Project/ToyotaTheme/Common/css/app.min.css', '!needreplace/media/Project/ToyotaTheme/Common/css/app-ar.min.css', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons/**', '!needreplace/media/Project/ToyotaTheme/Common/images/icons/icons-2x/**', '!needreplace/media/Project/ToyotaTheme/Common/js/app.min.js'],
                dest: packageName + "-backup.zip"
            }
        },
        validation: {
            //options: {
            //    stoponerror: false,
            //    relaxerror: ['Section lacks heading. Consider using',
            //    'Consider avoiding viewport values that prevent users from resizing documents.'] //ignores these errors
            //},
            files: {
                src: ['en/**/*.html']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'needreplace/media/Project/ToyotaTheme/Common/css/*.css',
                        'needreplace/media/Project/ToyotaTheme/Common/js/*.js',
                        'en/*.html'
                    ]
                },
                options: {
                    proxy: "http://localhost:63342/markup-git/en/"
                }
            }
        },
        rtlcss: {
            myTask: {
                // task options
                options: {
                    // generate source maps
                    // autoRename: true,
                    map: {inline: false},
                    // rtlcss options
                    opts: {
                        clean: false
                    },
                    // rtlcss plugins
                    plugins: [],
                    // save unmodified files
                    saveUnmodified: true,
                },
                expand: true,
                cwd: 'needreplace/media/Project/ToyotaTheme/Common/css',
                //dest: 'rtl',
                //files: {
                //    'styles-rtl.css': 'styles.css',
                //},
                src: ['style.css'],
                dest: 'needreplace/media/Project/ToyotaTheme/Common/css',
                ext: '_arabic.css'
            }
        },
        copy: {
            /*main: {
             files: [
             {
             expand: true,
             cwd: 'D:/Projects/OL 2394 Toyota/Markup/needreplace/',
             src: ['**'],
             dest: 'E:/Projects/OL 2394 Toyota/Markup/needreplace/',
             filter: 'isFile'
             }, {
             expand: true,
             cwd: 'D:/Projects/OL 2394 Toyota/Markup/en/',
             src: ['**'],
             dest: 'E:/Projects/OL 2394 Toyota/Markup/en/',
             filter: 'isFile'
             }, {
             expand: true,
             cwd: 'D:/Projects/OL 2394 Toyota/Markup/ar/',
             src: ['**'],
             dest: 'E:/Projects/OL 2394 Toyota/Markup/ar/',
             filter: 'isFile'
             }]
             },*/
            dc01: {
                files: [
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/',
                        src: ['**', '!*.min.js'],
                        dest: '\\\\dc01\\Projects\\OL-All-23-Project\\OL 2393 Toyota\\Markup\\needreplace\\',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/en/',
                        src: ['**'],
                        dest: '\\\\dc01\\Projects\\OL-All-23-Project\\OL 2393 Toyota\\Markup\\en\\',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/ar/',
                        src: ['**'],
                        dest: '\\\\dc01\\Projects\\OL-All-23-Project\\OL 2393 Toyota\\Markup\\ar\\',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/templates/',
                        src: ['**'],
                        dest: '\\\\dc01\\Projects\\OL-All-23-Project\\OL 2393 Toyota\\Markup\\templates\\',
                        filter: 'isFile'
                    }]
            },
            developer: {
                files: [
                    /*{
                     expand: true,
                     cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common',
                     src: ['**'],
                     dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\',
                     filter: 'isFile'
                     },*/

                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/css',
                        src: ['**'],
                        dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/sass',
                        src: ['**'],
                        dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\sass',
                        filter: 'isFile'
                    },
                    /*{
                     expand: true,
                     cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/',
                     src: ['**'],
                     dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\',
                     filter: 'isFile'
                     }*/
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/js',
                        src: ['**', '!*.min.js'],
                        dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\js',
                        filter: 'isFile'
                    },]
            },
            developer2: {
                files: [
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/css',
                        src: ['**'],
                        dest: '\\\\192.168.1.59\\toyota.ksa.sc\\Common\\theme\\css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/sass',
                        src: ['**'],
                        dest: '\\\\192.168.1.59\\toyota.ksa.sc\\Common\\theme\\sass',
                        filter: 'isFile'
                    }
                    /*{
                     expand: true,
                     cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/',
                     src: ['**'],
                     dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\',
                     filter: 'isFile'
                     },*/
                    /*{
                     expand: true,
                     cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/js',
                     src: ['**', '!*.min.js'],
                     dest: '\\\\192.168.1.59\\toyota.ksa.sc\\Common\\theme\\js',
                     filter: 'isFile'
                     }*/]
            },
            tfs: {
                files: [
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/css',
                        src: ['**'],
                        dest: 'F:\\HeathWallace\\OL 2394 Toyota KSA\\Toyota.KSA.SC\\src\\Foundation\\Bootstrap\\code\\Common\\theme\\css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/sass',
                        src: ['**'],
                        dest: 'F:\\HeathWallace\\OL 2394 Toyota KSA\\Toyota.KSA.SC\\src\\Foundation\\Bootstrap\\code\\Common\\theme\\sass',
                        filter: 'isFile'
                    }
                    /*{
                        expand: true,
                        cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/js',
                        src: ['**'],
                        dest: 'F:\\HeathWallace\\OL 2394 Toyota KSA\\Toyota.KSA.SC\\src\\Foundation\\Bootstrap\\code\\Common\\theme\\js',
                        filter: 'isFile'
                    }*/]
            },
            /*developerTest: {
             files: [{
             expand: true,
             cwd: 'F:/Projects/OL 2394 Toyota/Markup/needreplace/media/Project/ToyotaTheme/Common/css',
             src: ['**'],
             dest: '\\\\192.168.1.62\\toyota.ksa.sc\\Common\\theme\\css',
             filter: 'isFile'
             }]
             },*/
            //'ftp-deploy': {
            //    build: {
            //        forceVerbose:true,
            //        auth: {
            //            host: '83.222.234.17',
            //            port: 21,
            //            authKey: 'key1'
            //        },
            //        src: 'F:/Projects/OL 2394 Toyota/Markup/ar/',
            //        dest: '/Staging/2394-toyota/Web/ar/',
            //        exclusions: ['F:/Projects/OL 2394 Toyota/Markup/needreplace/**/.DS_Store', 'F:/Projects/OL 2394 Toyota/Markup/needreplace/**/Thumbs.db', 'F:/Projects/OL 2394 Toyota/Markup/node_modules/', 'F:/Projects/OL 2394 Toyota/Markup/.git/', 'F:/Projects/OL 2394 Toyota/Markup/.idea/']
            //    }
            //}

        }
    });
    // Load the Assemble plugin.
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-rtlcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['watch']);

    grunt.registerTask(
        'build',
        [
            'assemble:enProduction',
            'assemble:arProduction',
            'htmlmin',
            //'uglify',
            /*'compass',*/
            'sass',
            'cssmin',
            'concat',
            'uglify'
        ]
    );

    grunt.registerTask(
        'create',
        [
            'assemble:en',
            'assemble:ar',
            /*'compass',*/
            'sass',
            'cssmin'
        ]
    );
    grunt.registerTask(
        'createPackage',
        [
            'create',
            'zip:unminified',
            'zip:backup',
            'build',
            'zip:minified'
        ]
    );
};
