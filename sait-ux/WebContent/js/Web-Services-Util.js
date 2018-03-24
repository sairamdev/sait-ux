/**
 * This file would hold all the web-service calls to the Amigoo application.
 */

//Request object is in the following format.
// requestObject={"url":"", "srvcMethod":"GET/POST/PUT","dataType":"json","onDone":function,"onFail":function,"onAlways":"function"}
callMyWebService = function(requestObject) {

	$.ajax({
		url : requestObject.url,
		method : requestObject.srvcMethod,
		dataType : requestObject.dataType
	})
		.done(requestObject.onDone).fail(requestObject.onFail).always(requestObject.onAlways);


}