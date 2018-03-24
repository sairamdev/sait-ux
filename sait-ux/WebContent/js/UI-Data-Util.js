
var carModalData;
var breakDownHistoryModal;

//***********************MyCar and Associated Funtions Start**************//

// This function is used to load the template for creating new car data.
var initAddCarForm = function() {

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

// The below set of function is used to create a data structure for the modal to
// consume.
// Start

var initCarDetailsModalData = function() {

	$("#loader").show();
	$("#overlay").show()
	reqObject = {
		"url" : "https://192.168.1.9:8443/sait-services/rest/amigoo-services/getMyCarInfo",
		"srvcMethod" : "POST",
		"data" : {},
		"dataType" : "json",
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