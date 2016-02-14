var express = require('express');
var router = express.Router();
var cnode = require('../spider/cnode');


/* GET home page. */
router.get('/', function(req, res, next) {
	var requestUrl = "https://cnodejs.org/";
	var _cnode = new cnode(requestUrl);
	_cnode.getData(res);
  //res.render('list', { title: 'lsit' });
});

module.exports = router;
