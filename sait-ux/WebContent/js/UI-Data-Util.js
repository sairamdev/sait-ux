//var output = Mustache.render(template, person);
//$("#modalDiv").html(output);

var carModalData;
var initAddCarForm = function() {
	var carDetailsTemplate = document.getElementById("CarInputData").innerHTML;
	var rendered = Mustache.render(carDetailsTemplate, carAttributes);
	$('#AddCarDetailsDiv').html(rendered);
}

var showMyCars = function() {
	// Add web service calls to fetch data.

	var myRegisteredCarDetails = document.getElementById("my-registered-cars").innerHTML;
	var rendered = Mustache.render(myRegisteredCarDetails, myCarDetails);
	$('#my-registered-cars-Div').html(rendered);
}

var populateCarDetailsModal = function(carID) {

	alert(carID);
	$('#MyCarDetailsModal').modal('show')
	var myCarObjs = document.getElementById("MyCarDetailsModalTemplate").innerHTML;
	tempObj=myCarObjs;
	var rendered = Mustache.render(myCarObjs, carModalData[carID]);
	$('#MyCarDetailsModalBody').html(rendered);
}

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
