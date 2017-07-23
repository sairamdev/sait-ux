var showMyCurrentPostion = function(position) {
	console.log(position);
	var infoWindow = new google.maps.InfoWindow({
		map : map
	});
	var pos = {
		lat : position.lat,
		lng : position.lng
	};
	infoWindow.setPosition(pos);
	infoWindow.setContent('Location found.');
	map.setCenter(pos);

}

var getMyLocation = function(callback) {
	try {

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat : position.coords.latitude,
					lng : position.coords.longitude
				};
				callback(pos);
			}, function(error) {
				handleLocationError(error);

				// handleLocationError(true, infoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			// handleLocationError(false, infoWindow, map.getCenter());
		}
	} catch (e) {
		// TODO: handle exception
		console.log(e);
	}

}

var handleLocationError = function(error) {
	return {
		"error" : error
	};

}

var reverseGeoCode = function(position) {

	var geocoder = new google.maps.Geocoder;
	 var infowindow = new google.maps.InfoWindow;

	geocoder.geocode({
		'location' : position
	}, function(results, status) {
		if (status === 'OK') {
			setCurrentAddress(results[0], position)
			if (results[1]) {
				map.setZoom(11);
				var marker = new google.maps.Marker({
					position : position,
					map : map
				});

				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

var setCurrentAddress = function(addressResult, position) {
	var adrComponents = addressResult.address_components;
	$("#CurrentPosition").val(position.lat.toPrecision(5)+"," +position.lng.toPrecision(5));
	$("#Locality").val(adrComponents[2].long_name);
	$("#StreetAddress").val(adrComponents[1].long_name);
	$("#City").val(adrComponents[4].long_name);
	$("#District").val(adrComponents[5].long_name);
	$("#State").val(adrComponents[6].long_name);
	$("#Country").val(adrComponents[7].long_name);
	$("#ZipCode").val(adrComponents[8].long_name);

}