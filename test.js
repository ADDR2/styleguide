var exec = require('child_process').exec;


function validateJS(filesName) {
	var re = /(?:\.([^.]+))?$/;

	if(filesName.length > 0) {
		filesName.forEach(function(item) {
			if(re.exec(item)[1] === "js") {
				exec('jscs '+item, function (error, stdout, stderr) {
					if(!stdout.search("No code style errors found.")) {
						console.log("no errors");
					}else {
						console.log("errors");
					}
				});
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