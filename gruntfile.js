module.exports = function(grunt) {

  grunt.initConfig({
		concat: {
			libs: {
				src: [
					"node_modules/jquery/dist/jquery.js"
				],
				dest: "bundles/libs.js"
			},
			css : {
				src: ["css/*.css", "components/**/*.css"],
				dest: "bundles/styles.css"
			}
		},

		watch: {
			js: {
				files: [
					"components/**/*.vue", "components/**/*.js", "dataaccess/*.js", "stores/*.js", "main.js", "tests/*.js"
				],
				tasks: ["eslint", "browserify"]
			},
			css: {
				files: [
					"css/*.css", "components/**/*.css"
				],
				tasks: ["concat:css"]
			}
		},

		browserify: {
					dist: {
						options: {
							debug: true,
							standalone: 'Bundle',
							transform: ["vueify",["babelify", { "presets": ["es2015"] }]]
						},
						src: ["main.js"],
						dest: 'bundles/scripts.js',
					}
		},

		eslint: {
			target: ["components/**/*.vue", "components/**/*.js", "dataaccess/*.js", "stores/*.js", "main.js", "tests/*.js"]
		}
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask("default", ["eslint", "browserify", "concat"]);
};