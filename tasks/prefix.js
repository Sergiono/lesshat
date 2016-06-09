module.exports = function (grunt) {
	grunt.registerTask('prefix', function () {
		var path = require('path');
		var fs = require('fs');
		
		var buildPath = path.resolve(__dirname, '..', 'build');
		// Check whether build folder exists
		if (!fs.existsSync(buildPath)) {
			grunt.fail.fatal('Mixins folder does not exist.');
		}
		// Check whether lesshat.less exists
		if (!fs.existsSync(buildPath + 'lesshat.less')) {
			grunt.fail.fatal('Mixin template does not exist.');
		}
		var mixins = fs.readFileSync(path.resolve(buildPath, 'lesshat.less'), 'utf8');
		mixins = mixins.replace(/^\.([a-z0-9-]+\([a-z@., 0-9-]+)/gmi, function (match, sub_1) {
			return '.lh-' + sub_1;
		});
		fs.writeFileSync(path.resolve(buildPath, 'lesshat-prefixed.less'), mixins);
		
		grunt.log.ok('Prefixed version – DONE');
	});
};
