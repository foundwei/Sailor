var http = require('http');
var Buffer = require('buffer');
var jsdom = require('jsdom');
var $ = require('jquery')(jsdom.jsdom().defaultView);

function getTopNewsOfYesterday() {
	var curLocDate = new Date();
	curLocDate.setDate(curLocDate.getDate() - 1);
	var formatDate = '(' + curLocDate.getDate() + ' ' + getMonthName(curLocDate.getMonth()) + ' ' + curLocDate.getFullYear() + ')';

	var options = {
		hostname: 'www.navy.mil',
		port: 80,
		path: '/listStories.asp?x=4', 
		method: 'GET'
	};
	
	var req = http.request(options, function(res) {
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		
		res.on('end', function() {
			var re = new RegExp(formatDate,"gi");

			$(body).find('div[style="width:950px; margin: 10px 25px;"]').each(function($this) {
				var title = $($(this).children('div')[0]).text();
				if(re.test(title)) {
					console.log(title);
				}
			});
		});
		
		req.on('error', function() {
			console.error('encounter an error when request resource');
		});
	});
	
	req.end();
}

function getMonthName(i) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	
	return months[i];
}

getTopNewsOfYesterday();