var express = require('express');
var router = express.Router();
var cnode = require('../spider/cnode');


/* GET home page. */
router.get('/', function(req, res, next) {
	var requestUrl = "https://cnodejs.org/";


	var tab = req.query.tab;
	var page = req.query.page;
	if (tab!=undefined&&page!=undefined) {
		requestUrl='https://cnodejs.org/?tab='+tab+'&page='+page;
	};
	
	var _cnode = new cnode(requestUrl);
	_cnode.getData(res);
  //res.render('list', { title: 'lsit' });
});

module.exports = router;
