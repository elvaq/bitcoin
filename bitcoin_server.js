var http = require("http");
var fs = require("fs");
var xchange = require("./lib/priceTicker.js");
var apis = require("./apis/apis.js");
var async = require("./node_modules/async");
var last = 0;
var date;
var bits = new Array();
var updating = false;
var apisNames = new Array();
var i = 0, count = 0;

for(var apisName in apis){
	apisNames[i] = apisName;
	i++;
}
var interval, inner_interval;
http.createServer(function (req, res) {
  var index = "./index.htm";
  var fileName;
  var interval;
  if (req.url === "/")
    fileName = index;
  else
    fileName = "." + req.url;
  if (fileName === "./stream") {
    res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive"});
    res.write("retry: 300000\n");
    res.write("event: connecttime\n");
    res.write("data:" + (new Date()) + "\n\n");
    interval = setInterval(function() {
	    outter(res);
    }, 1000*60);
    req.connection.addListener("close", function () {
      clearInterval(interval);
      clearInterval(inner_interval);
      console.log("connection terminated!");
      console.log(count);
      count = 0;
    }, false);
  } else if (fileName === index) {
    fs.exists(fileName, function(exists) {
      if (exists) {
        fs.readFile(fileName, function(error, content) {
          if (error) {
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(content, "utf-8");
          }
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }

}).listen(80, "127.0.0.1");
console.log("Server running at http://127.0.0.1:80/");


var refresh_CAD = function(){
	xchange.bit_CAD.ticker(function(error,resp){
				if(!error){
				bits[0] = resp;
				count++;
				}else console.log('errorc');
			});
}
var refresh_USD = function(){
	xchange.bit_USD.ticker(function(error,resp){
		if(!error){
		bits[1] = resp;
		count++;
		}else console.log('erroru');
	});
}
var refresh_CLP = function(){
	xchange.bit_CLP.ticker(function(error,resp){
		if(!error){
		bits[2] = resp;
		count++;
		}else console.log('errorp');
	});
}

var refresh = function(item){
	if(item == 'bit_CAD')
		refresh_CAD();
	else if(item == 'bit_USD')
			refresh_USD();
	else if(item == 'bit_CLP')
		 	refresh_CLP();
	else console.log('error1');	
}


var update = function(){
	async.each(apisNames, function( file, callback) {
	 refresh(file);						
	}, function(err,bits){
	    if(err) {
	      console.log('A visit failed to process');
	    } else {
	    }
	});
}

var outter = function(res){
      updating = true;
      update();
      inner_interval = setInterval(function(){
	      inner(res);
      }, 1000);
}

var inner = function(res){
	   if(count % 3 == 0 && count != 0){
		   count = 0;
		    var today = new Date();
		    var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
			//res.write("event: message\n");
			var message = "data:"+'{'+'"CAD":'+bits[0].last+","+'"USD":'+bits[1].last+','+'"CLP":'+bits[2].last+','+'"h":'+h+','+'"m":'+m+','+'"s":'+s+'}'+"\n\n";
			console.log(h+":"+m+":"+s);
			res.write("event: message\n");
			res.write(message);
			console.log(message);
			//console.log(count);
			updating = false;		 
	   }
}
