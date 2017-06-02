function showMyCurrentPostion(position) {
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

function getMyLocation(callback) {
try {
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};
			showMyCurrentPostion(pos);
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

function handleLocationError(error) {
	return {
		"error" : error
	};

}

