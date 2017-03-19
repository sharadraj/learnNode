var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
	res.render('news-hp', {title : 'First Express Applications'});
});

module.exports = router;