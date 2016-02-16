//添加superagent
var superagent = require('superagent');
//添加cheerio
var cheerio = require('cheerio');
//对url进行解析
var url = require('url');
//对参数进行解析  添加qs
var qs = require('querystring');

//定义cnode url
var cnodeUrl="https://cnode.js.org/";


//定义对象CNode
var CNode=function(url){
	cnodeUrl = url;    
}
//对CNode进行扩展
CNode.prototype={
	getData:function(res){
	//superagent获取数据
    	superagent.get(cnodeUrl).end(function(err,sres){
    		if (err) {
    			return next(err);
    		};
    		//cherrio 获取sres中的数据
    		var $ = cheerio.load(sres.text);
    		//获取总页数
            var lastPageUrl= $('.pagination li:last-child').find('a').attr('href');
            console.log(lastPageUrl);
    		if(lastPageUrl!=undefined){
                var queryUrl = url.parse(lastPageUrl).query;
                console.log(queryUrl);
                var obj= qs.parse(queryUrl);
                console.log(obj);

                var totalPages=obj.page;
                console.log(totalPages);
            }else{
                var totalPages=$('.pagination').attr('current_page');
                console.log(totalPages);
            }

    		var items=[];
    		$('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                var type=$element.parent().parent().find('.topiclist-tab').text();
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                    link:url.resolve(cnodeUrl, $element.attr('href')),
                    type:type
                });
            });
            items.totalPages=totalPages;
            console.log(items);
    		//return items;
    		//res.send(items);
            res.render('list',{
                title:'资源列表',
                items:items
            });
    	});
	}
}

module.exports = CNode;