module.exports = function(grunt) {
	'use strict';
	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
		min: {
			dist: {
				src: {['js/onlinesites.js'],['js/onlinesites.mobile.js']}
				dest: 'scripts/onlinesites.min.js'
			}
		},
        cssmin: {
            dist: {
                src: { ['Content/onlinesites.basico.css'],['Content/onlinesites.default.css'],['Content/onlinesites.mobile.css'] },
                dest: 'Content/onlinesites.min.css'
            }
        },
        imageoptim: {
            dist: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                files: [{
                    expand: true,
                    cwd: 'Images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'Images'
                }]
            }
        },

        // uncomment for use less and comment cssmin configs
		// less: {
        //     development: {
        //         options: {
        //             yuicompress: true
        //         },
        //         files: {
        //             "./src/assets/css/all.min.css":
        //             ["./src/assets/css/less/main.less"]
        //         }
        //     }
        // },

        // Deploy using Rsync task
		rsync: {
			dist: {
				src: './src/',
				dest: './dist',
				recursive: true,
				syncDest: true,
				exclude: ['main.*', 'less']
			},
      // uncomment and config
			// deploy: {
			// 	src: './dist/',
			// 	dest: '/var/www',
			// 	host: 'root@vagnersantana.com',
			// 	recursive: true,
			// 	syncDest: true
			// }
		}
	};
	grunt.initConfig(gruntConfig);

	var keys = Object.keys(gruntConfig);
	var tasks = [];

	for(var i = 1, l = keys.length; i < l; i++) {
		tasks.push(keys[i]);
	}

	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-rsync');
    // uncomment for use less
	// grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', tasks);
};
