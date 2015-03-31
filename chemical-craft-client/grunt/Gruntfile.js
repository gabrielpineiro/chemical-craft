module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        karma: {
          unit: {
            configFile: '../app/tests.config.js'
          }
        },
        uglify: {
          prod: {
            files: {
                '../app/chemical.min.js': ['../app/app.js', '../app/chemical-controller.js', '../app/chemical-service.js']
            },
            options: {
              mangle: false
            }
          }
        },
		scriptlinker: {
		  defaultOptions: {
			options: {
			  startTag: '<!--SCRIPTS-->',
			  endTag: '<!--SCRIPTS END-->',
			  fileTmpl: '<script src="%s"></script>',
			  appRoot: '../app/'
			},
			files: {
			  // Target-specific file lists and/or options go here. 
			  'app/index.html': ['app/chemical.min.js']
			},
		  },
		},
		jslint: {
			client: {
				src: [ '../app/*.js' ],
				directives: {
				  browser: true,
				  predef: [
					'jQuery'
				  ]
				}
			}
		}
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-scriptlinker');
	grunt.loadNpmTasks('grunt-jslint');
	
    // Task definitions
    grunt.registerTask('dev', ['jslint','karma']);
	grunt.registerTask('prod', ['karma', 'uglify']);
};