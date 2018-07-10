var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');


gulp.task('default', function(){
	nodemon({
		script : "./bin/start.js",
		ext : 'js',
		env : {
			PORT : 8000 
		}
	})
	.on('restart', function(){
		console.log("restarting server");
	});
})