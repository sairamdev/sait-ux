//var output = Mustache.render(template, person);
//$("#modalDiv").html(output);

var carModalData;
var breakDownHistoryModal;
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
	setCarDetailsModalData();
	$("#my-registered-cars-Div").load(
			"Templates.html #my-registered-cars",
			function() {
				var myRegisteredCarDetails = document
						.getElementById('my-registered-cars').innerHTML;
				var output = Mustache.render(myRegisteredCarDetails,
						myCarDetails);
				$("#my-registered-cars-Div").html(output);
			});

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
	var carDetailsModalData = [];
	var myObj = {}
	for (carObjsInx in myCarDetails.myCars) {
		console.log(myCarDetails.myCars[carObjsInx])
		var myObj = {};
		myObj.myCarObj = myCarDetails.myCars[carObjsInx];
		carDetailsModalData[myCarDetails.myCars[carObjsInx]["carId"]] = myObj;

	}

	return carDetailsModalData;

}
var getCarDetailsModalData = function() {
	var resultData = initCarDetailsModalData();
	return resultData;
}

var setCarDetailsModalData = function() {
	carModalData = getCarDetailsModalData();

}

// End

var showBreakDownRequestForm=function()
{
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

var showBreakDownHistory=function()
{
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
	breakDownHistoryModal=carBrkDownModalData;

	return carBrkDownModalData;

}


var populateBreakDownHistoryModal=function(brkDwnId)
{
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