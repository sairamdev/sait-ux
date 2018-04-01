
var carModalData;
var breakDownHistoryModal;

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
		"url" : "https://192.168.1.4:8443/sait-services/rest/amigoo-services/getMyCarInfo",
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
	$("#overlay").hide();
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
	
	//This is the New Car Object. Any addition of the attribute here should be added to the newCarDetailsModalTemplate template 
	//in the Template.html.
	/*{
		"Brand" : "Brand",
		"Model" : "FuelType",
		"Year" : "Year",
		"Variant":"Variant",
		"Km-Driven":"Km-Driven",
		"Fuel-Type":"Fuel-Type",
		"Registration-Number":"Registration-Number"
		

	}*/
	
	/*{"jsonObj":outputJsonObj,"modalFormVals":outputObj}*/
	$("#loader").show();
	$("#overlay").show();
	
	var userDetails=getLoggedInUserData();
	var modalFormResultObj=getMyModalFormValues($("#newCarDetailsModalBody"))
	modalFormResultObj[0]["jsonObj"].UserID=userDetails.UserID
	modalFormResultObj[0]["jsonObj"].carId=userDetails.UserID +modalFormResultObj[0]["jsonObj"]["Registration-Number"];

	
	reqObject = {
		"url" : "https://192.168.1.4:8443/sait-services/rest/amigoo-services/setMyCarInfo",
		"srvcMethod" : "POST",
		"data" : modalFormResultObj[0]["jsonObj"],
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
	$("#loader").hide();
	$("#overlay").hide();
	$("#newCarDetailsModal").modal('hide')
	alert("New Car Details Added Sucessfully");
	
}

var onFailureAddCarInfo=function(jqXHR, textStatus, errorThrown)
{
	console.log(errorThrown +"," +JSON.stringify(jqXHR));
	alert("error"+JSON.stringify(jqXHR))
	$("#loader").hide();
	$("#overlay").hide();
	$("#newCarDetailsModal").modal('hide')
	
}



//************************** Add My Car Details END***********************//

//************************** Add My Car Break-Down Details START***********************//


//This function would add the car break-down details from the new car break down details modal.

var addMyCarBrkDownDetails=function()
{
	$("#loader").show();
	$("#overlay").show();
	
	var userDetails=getLoggedInUserData();
	var modalFormResultObj=getMyModalFormValues($("#newCarBrkDwnReqModal"))
	var randomNum=Math.random();
	var brkDownId=parseInt(randomNum*10000000)
	//"brkDwnId" : "BrkID1"
	modalFormResultObj[0]["jsonObj"].UserID=userDetails.UserID
	modalFormResultObj[0]["jsonObj"].brkDwnId=brkDownId

	
	reqObject = {
		"url" : "https://192.168.1.4:8443/sait-services/rest/amigoo-services/setMyCarBrkDwnInfo",
		"srvcMethod" : "POST",
		"data" : modalFormResultObj[0]["jsonObj"],
		"dataType" : "json",
		"contentType":"application/json",
		"onDone" : onSuccessAddBrkDwnInfo,
		"onFail" : onFailureAddBrkDwnInfo,
		"onAlways" : ""
	}
	callMyWebService(reqObject)
	

}

var onSuccessAddBrkDwnInfo=function(data, jqXHR)
{
	console.log(data +","+ "Added Sucessfully");
	$("#loader").hide();
	$("#overlay").hide();
	$("#newCarBrkDwnReqModal").modal('hide')
	alert("Break Down Request Made Sucessfully!! Your vehicle buddy will Assist you shortly");
}

var onFailureAddBrkDwnInfo=function(jqXHR, textStatus, errorThrown){
	
	console.log(errorThrown +"," +JSON.stringify(jqXHR));
	alert("error"+JSON.stringify(jqXHR) +","+errorThrown)
	$("#loader").hide();
	$("#overlay").hide();
	$("#newCarBrkDwnReqModal").modal('hide')
	
}



//************************** Add My Car Break-Down Details END***********************//








//***********************Utility Functions START********************************//

//This function would return an array containing a JSON object of the Modal and Associative array of the Modal input values
//Sample [JSONObject,[]]
var getMyModalFormValues=function(modalObject)
{
	var outputJsonObj={};
	var  inputGrpArray=modalObject.find("input");
	var outputObj= new Array();
	var resultObject=new Array();
	for(i=0;i<inputGrpArray.length;i++)
		{
		var objKey=inputGrpArray[i].id
		var objValue=$("#"+objKey).val();
		outputObj[objKey]=objValue;
		outputJsonObj[objKey]=objValue;
		
		}
	resultObject.push({"jsonObj":outputJsonObj,"modalFormVals":outputObj});
return resultObject
}



//***********************Utility Functions END********************************//

var showBreakDownRequestForm = function() {
	$("#newCarBrkDwnReqModalBody").load(
		"Templates.html #myCarBrkDwnNewRequestTemplate",
		function() {
			var carBreakDownTemplate = document
				.getElementById("myCarBrkDwnNewRequestTemplate").innerHTML;
			var rendered = Mustache.render(carBreakDownTemplate,
				myCarBreakDownDetails);
			$("#newCarBrkDwnReqModalBody").html(rendered);
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


//****************Car Break Down History Service START*********************//


var getCarBreakDownHistory = function() {

	$("#loader").show();
	$("#overlay").show()
	userDetails=getLoggedInUserData()
	reqObject = {
		"url" : "https://192.168.1.4:8443/sait-services/rest/amigoo-services/getMyCarBrkDwnInfo",
		"srvcMethod" : "POST",
		"data" : userDetails,
		"dataType" : "json",
		"contentType":"application/json",
		"onDone" : onSucessGetCarBrkDownInfo,
		"onFail" : onFailureGetCarBrkDownInfo,
		"onAlways" : ""
	}
	callMyWebService(reqObject)
}

var onSucessGetCarBrkDownInfo =function(data, jqXHR)
{
	
	
	$("#myBreakDownHistoryDiv").load(
			"Templates.html #myBreakDownsDiv-template",
			function() {
				var carBreakDownTemplate = document
					.getElementById("myBreakDownsDiv-template").innerHTML;
				var rendered = Mustache.render(carBreakDownTemplate,
						{"myBreakDowns":data});// {"myBreakDowns":data} just to conform to the data model. 
											   // As the service is returning only arraylist
				$("#myBreakDownHistoryDiv").html(rendered);
			});
	var carBrkDownModalData = [];
	var myObj = {}
	for (carBrkDownObjsInx in data) {
		//console.log(myCarDetails.myCars[carObjsInx])
		var myObj = {};
		myObj.myCarBrkDownObj = data[carBrkDownObjsInx];
		carBrkDownModalData[data[carBrkDownObjsInx]["brkDwnId"]] = myObj;

	}
	breakDownHistoryModal = carBrkDownModalData;
	
	$("#loader").hide();
	$("#overlay").hide();
	
	
}

var onFailureGetCarBrkDownInfo =function(data, jqXHR,errorThrown)
{
	console.log(errorThrown +"," +JSON.stringify(jqXHR));
	alert("error"+JSON.stringify(jqXHR) +","+errorThrown)
	$("#loader").hide();
	$("#overlay").hide();
	}

//****************Car Break Down History Service END*********************//