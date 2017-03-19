var express = require('express');
var router = express.Router();
var toiApi = require('../src/services/toi-api.js');

router.get('/',function(req, res, next){
		toiApi.getToiNews(req, res);
});

module.exports = router;
