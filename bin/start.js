#!/usr/bin/env node
/*global configurations of setup*/
global.name='news dahsboard'
global.config = require('../root-config/dev-config.json')  
/*End of configurations setup*/

var utils = require('../src/utils.js');

/*connecting with mongo db*/
utils.isDBReady((err, dbflag) => {
	if(!dbflag){
		log.error(e.toString())	
		process.exit();
	}
});

/*starting core system*/
var http = require('http');
var app = require('../index.js');

var server = http.createServer(app);
server.listen(8080);
console.log("System running in dev mode on port 8080...");

