
var carModalData;
var breakDownHistoryModal;

//***********************MyCar and Associated Funtions Start**************//

// This function is used to load the template for creating new car data.
/*var initAddCarForm = function() {

	$("#AddCarDetailsDiv").load(
		"Templates.html #CarInputData",
		function() {
			var carDetailsTemplate = document
				.getElementById('CarInputData').innerHTML;
			var rendered = Mustache.render(carDetailsTemplate,
				carAttributes);
			$("#AddCarDetailsDiv").html(rendered);
		});

}
*/
// This function is used to create a list of cars that are registered with the
// user logged-in.
var showMyCars = function() {
	// Add web service calls to fetch data of cars registerd to users account.
	initCarDetailsModalData();

}

// This function is used to populate the modal when individual cars resigtered
// by users.
var populateCarDetailsModal = function(carID) {

	$("#MyCarDetailsModalBody").load(
		"Templates.html #MyCarDetailsModalTemplate",
		function() {
			var myCarObjs = '';
			myCarObjs = document
				.getElementById('MyCarDetailsModalTemplate').innerHTML;
			var output = Mustache.render(myCarObjs, carModalData[carID]);
			$("#MyCarDetailsModalBody").html(output);
		});

}


// New Car Details input Modal


var populateNewCarDetailsModal = function() {

	$("#newCarDetailsModalBody").load(
		"Templates.html #newCarDetailsModalTemplate",
		function() {
			var myCarObjs = '';
			myCarObjs = document
				.getElementById('newCarDetailsModalTemplate').innerHTML;
			var output = Mustache.render(myCarObjs, carAttributes);
			$("#newCarDetailsModalBody").html(output);
		});

}


//






// The below set of function is used to create a data structure for the modal to
// consume.
// Start
var getLoggedInUserData=function(){
	//Need to return user login information like user-id role from a webservice
	//currently retturing a dummy value.
	var userLoginData={"UserID":"251615"}
	return userLoginData;
}
var initCarDetailsModalData = function() {

	$("#loader").show();
	$("#overlay").show()
	userDetails=getLoggedInUserData()
	reqObject = {
		"url" : "https://192.168.1.8:8443/sait-services/rest/amigoo-services/getMyCarInfo",
		"srvcMethod" : "POST",
		"data" : userDetails,
		"dataType" : "json",
		"contentType":"application/json",
		"onDone" : onSucessGetCarInfo,
		"onFail" : onFailureGetCarInfo,
		"onAlways" : ""
	}


	callMyWebService(reqObject)
}

var onSucessGetCarInfo = function(data, jqXHR) {
	var carDetailsModalData = [];
	var myObj = {}
	for (carObjsInx in data) {
		console.log(data[carObjsInx])
		var myObj = {};
		myObj.myCarObj = data[carObjsInx];
		carDetailsModalData[data[carObjsInx]["carId"]] = myObj;
	}

	//Added {"myCars":data} to satisfy the template format.Need to add such things 
	//whenever we are getting an array only as the ouput from webservice

	$("#my-registered-cars-Div").load(
		"Templates.html #my-registered-cars",
		function() {
			var myRegisteredCarDetails = document
				.getElementById('my-registered-cars').innerHTML;
			var output = Mustache.render(myRegisteredCarDetails,
				{
					"myCars" : data
				});
			$("#my-registered-cars-Div").html(output);
		});
	carModalData = carDetailsModalData;
	$("#loader").hide();
	$("#overlay").hide()
}

var onFailureGetCarInfo = function(jqXHR, textStatus, errorThrown) {
	console.log(errorThrown)
	alert("error"+JSON.stringify(jqXHR))
	$("#loader").hide();
	$("#overlay").hide()
}

// End
//***********************MyCar and Associated Funtions End**************//

//************************** Add My Car Details START***********************//
var addMyCarData=function()
{
	userDetails=getLoggedInUserData()
	reqObject = {
		"url" : "https://192.168.1.8:8443/sait-services/rest/amigoo-services/setMyCarInfo",
		"srvcMethod" : "POST",
		"data" : userDetails,
		"dataType" : "json",
		"contentType":"application/json",
		"onDone" : onSucessAddCarInfo,
		"onFail" : onFailureAddCarInfo,
		"onAlways" : ""
	}
	callMyWebService(reqObject)
}

var onSucessAddCarInfo=function(data, jqXHR)
{
	console.log(data +","+ "Added Sucessfully");
	
}

var onFailureAddCarInfo=function(jqXHR, textStatus, errorThrown)
{
	console.log(errorThrown)
	alert("error"+JSON.stringify(jqXHR))
	//$("#loader").hide();
	//$("#overlay").hide();
	
}



//************************** Add My Car Details END***********************//



var showBreakDownRequestForm = function() {
	$("#breakDownDataDiv").load(
		"Templates.html #carBreakDownData",
		function() {
			var carBreakDownTemplate = document
				.getElementById("carBreakDownData").innerHTML;
			var rendered = Mustache.render(carBreakDownTemplate,
				myCarBreakDownDetails);
			$("#breakDownDataDiv").html(rendered);
		});
}

var showBreakDownHistory = function() {
	$("#myBreakDownHistoryDiv").load(
		"Templates.html #myBreakDownsDiv-template",
		function() {
			var carBreakDownTemplate = document
				.getElementById("myBreakDownsDiv-template").innerHTML;
			var rendered = Mustache.render(carBreakDownTemplate,
				brekDownHistory);
			$("#myBreakDownHistoryDiv").html(rendered);
		});
	initCarBreakDownHistoryModal();
}


var initCarBreakDownHistoryModal = function() {
	
	var carBrkDownModalData = [];
	var myObj = {}
	for (carBrkDownObjsInx in brekDownHistory.myBreakDowns) {
		//console.log(myCarDetails.myCars[carObjsInx])
		var myObj = {};
		myObj.myCarBrkDownObj = brekDownHistory.myBreakDowns[carBrkDownObjsInx];
		carBrkDownModalData[brekDownHistory.myBreakDowns[carBrkDownObjsInx]["brkDwnId"]] = myObj;

	}
	breakDownHistoryModal = carBrkDownModalData;

	return carBrkDownModalData;

}


var populateBreakDownHistoryModal = function(brkDwnId) {
	$("#myCarBrkDownModalBody").load(
		"Templates.html #myCarBreakDownDetails-template",
		function() {
			var myCarObjs = '';
			myCarBrkDownObjs = document
				.getElementById('myCarBreakDownDetails-template').innerHTML;
			var output = Mustache.render(myCarBrkDownObjs, breakDownHistoryModal[brkDwnId]);
			$("#myCarBrkDownModalBody").html(output);
		});

}