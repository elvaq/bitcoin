
var apis = require("../apis/apis.js")
	,decorator = require("./jsonParser.js")
	,request = require("request");


function priceTicker() {
	this.addApis(apis);
}

function requestOptions(url) {
	return {
		url : url,
		headers : {
			"User-Agent" : "priceTicker.js"
		}
	};
}

function currencyTickerApi(apiElement) {
	return function(callback) {
		getPrices(apiElement,callback);		
	};
}

function getPrices(apiElement,callback){
	request.get(requestOptions(apiElement.tickerUrl), function(error,
				response, body) {
			if (error) {
				callback(error);
			} else if (response.statusCode !== 200) {
				callback("response.statusCode = " + response.statusCode);
			} else {
				callback(null, decorator.ticker(JSON.parse(body), apiElement.jsonSchema));
			}
	});
}

priceTicker.prototype.addApis = function(apis) {
	for ( var apiName in apis) {
		this[apiName] = {
			"ticker" : currencyTickerApi(apis[apiName])
		};
	}
};

module.exports = new priceTicker();
              