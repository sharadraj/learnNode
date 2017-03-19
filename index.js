var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = express();

/*rendering using jage*/
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'html');
index.use(bodyParser.json()); 
index.use(bodyParser.urlencoded({ extended: false }));

/*following will join path of javascript, css and html to project*/
index.use(express.static(path.join(__dirname, 'public')));
index.use(express.static(path.join(__dirname, 'src')));
index.use(express.static(path.join(__dirname, 'views')));


var newsHpRouter = require('./routes/news-hp.js');
var newsRouter = require('./routes/toi-news.js');


index.use("/", newsHpRouter);
index.use("/api/v1/news", newsRouter);


module.exports = index;
