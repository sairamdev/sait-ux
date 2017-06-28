setModalDataForMyCar = function() {

	/*
	 * <h5 class="my-h5-for-modal">Registration#</h5> <div
	 * class="my-input-group"> <input type="text" class="form-control"
	 * placeholder="Registration#" aria-describedby="basic-addon1"> </div>
	 */
	
	$('<input/>', {
	    'type': 'Text',
	    'value':'Some Text',
	    'size': '30'
	}).appendTo("#MyCarDetailsModalBody");

	
	getDataForMyCar();

}

getDataForMyCar = function() {
	// TO-DO This function should return the car details for the given account
	// Should call the web-service when written.
	return carDetailsData;

}
