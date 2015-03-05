var ticker = require("./ticker");

function responseParser(){
	this.responseParser = responseParser;
}

//parse a josn format
var jsonParser = function(ob) {
	var result = {};
	for (var i in ob) {
		if (!ob.hasOwnProperty(i)) {
			continue;
		}
		if ((typeof ob[i]) === "object" && ob[i] !== null) {
			var flatObject = jsonParser(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) {
					continue;
				}
				result[i + "." + x] = flatObject[x];
			}
		} else {
			result[i] = ob[i];
		}
	}
	return result;
};

responseParser.prototype.ticker = function(jsonBody, jsonSchema) {
	var resp = new ticker();
	var flattenedObj = jsonParser(jsonBody);
	for(var key in jsonSchema){
		var mappedKey = jsonSchema[key];
		resp[mappedKey] = flattenedObj[key];
	}
	return resp;
},

module.exports = new responseParser();