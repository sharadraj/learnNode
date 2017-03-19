var URL = require('url');
var http = require('http');
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var dbserver = mongodb.MongoClient;
var url = 'mongodb://localhost/news-feed';
var _db = null;

    var keepAliveAgent = new http.Agent({
        keepAlive: true,
        maxSockets: 10
    });

    var cookieCache = {};

	this.isDBReady = function(callback){
		dbserver.connect(url, function(err, db){
			if(err){
				return callback(err, false)
			}else{
				return callback(err, true)
			}
		})	
	},

	this.buildHttpUrl = function(method, url, headers = {}, cookie = undefined) {
        url = URL.parse(url);
        url.method = method;
        url.headers = headers;
        if (url.protocol === 'http:') url.agent = keepAliveAgent;
        cookie = cookieCache[url.host];
        if (cookie) url.headers.cookie = cookie;
        url.headers['connection'] = 'keep-alive'
        let contentType = url.headers['content-type'];
        return url;
    },

    this.httpRequest = function(url) {
        return new Promise((resolve, reject) => {
            let time = Date.now();
            console.log('http > sent', url.method, url.href)
            let protocol = (url.protocol === 'https:') ? https : http;
            let req = protocol.request(url, (res) => {
                console.log('http > status', res.statusCode)
                readHttpRespStream(res, result => {
                    if (result.cookie) cookieCache[url.host] = result.cookie;
                    if (result.status === 200) {
                        resolve(result)
                    } else {
                        reject('error at remote server-' + result.status);
                    }
                });
            });
            req.setTimeout(1000 * 300, () => {
                reject('remote server is not responded - timeout(40 s)')
            })
            req.end();
        });
    }

    function readHttpRespStream(res, callback) {
        let chunks = [];
        res.on("data", (chunk) => { chunks.push(chunk) });
        res.on("end", () => {
            let result = { headers: res.headers, status: res.statusCode };
            if (res.statusCode === 200) {
                //let cookie = res.headers['set-cookie'];            
                //cookie = cookie ? cookie[0].split(';')[0] : cookie;
                //if (cookie) console.log('http > set-cookie:', cookie)
                let cookies = res.headers['set-cookie']
                let cookie = ''
                if (cookies) {
                    for (let i = 0; i < cookies.length; i++) {
                        cookie = cookie.concat(cookies[i].split(';')[0])
                        cookie = cookie.concat('; ')
                    }
                }
                if (cookie) result.cookie = cookie;
                result.content = Buffer.concat(chunks);
            }
            return callback(result);
        });
    }
