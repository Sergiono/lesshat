var exec = require('child_process').exec;
var path = require('path');

module.exports = function (grunt) {
	grunt.registerTask('build', function () {
		var done = this.async();
		
		var build_script_path = path.resolve(__dirname, '..', 'src', 'build.js');
		var build_result_path = path.resolve(__dirname, '..', 'build', 'lesshat.less');
		var proc;
		
		proc = exec('node ' + build_script_path + ' > ' + build_result_path);
		
		proc.stderr.on('data', process.stderr.write);
		proc.on('exit', function (code) {
			if (code !== 0) {
				return done(false);
			}
			console.log('> ' + build_result_path);
			done(true);
		});
		
		grunt.task.run('mixins_update');
		grunt.task.run('prefix');
	});
	
};
