var exec = require('child_process').exec;

function validateJS(filesName) {
	var re = /(?:\.([^.]+))?$/;

	if(filesName.length > 0) {
		filesName.forEach(function(item) {
			if(item !== "") {

				console.log(re.exec(item)[1]);
			}
		});
	}
	
	// exec('jscs', function (error, stdout, stderr) {
	// });
}

exec('git diff --name-only --cached', function (error, stdout, stderr) {
	var filesName;
	filesName = stdout.split("\n");
	validateJS(filesName);	

		// process.exit(1);
});