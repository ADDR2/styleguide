var exec = require('child_process').exec;

exec('git diff --name-only --cached', function (error, stdout, stderr) {
	console.log("empieza aqui");
	console.log(stdout.split(" "));
		
  //  if(stdout.search("console.log") !== -1) {
  //  		console.log("remove console.log in js files");
		// process.exit(1);
  //  }
});