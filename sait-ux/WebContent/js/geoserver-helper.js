/*The layerObj should of following type.
Currently supports EPSG:3857 by default.(Web Mercator.)
		layerObj={
		
		"url":"",
		"version":"",
	 	"layers":"",
	}*/
//This function is used to create WMSLayer Object.
getWMSLayer = function(layerObj) {

	var tiledWMS = new WMSTiled({
		url : layerObj.url,
		version : layerObj.version,
		layers : layerObj.layers,
		styles : ''

	});
	return tiledWMS;
};

// This function is used to add WMSLayer to the map
addWmsLayerToMap = function(map, WMSObj) {
	// WMSObj is returned just in case this is used on aleready created
	// WMSObject.
	map.overlayMapTypes.push(WMSObj);
	return WMSObj;

};

// This function is used to create WMSInfoURL.

/*
 * { url : 'http://localhost:8080/geoserver/topp/wms?', version : '1.1.1',
 * layers : 'topp:states'
 *  }
 */

getLayerInfoObj = function(map, layerInfoOption) {
	var WMSInfoObj = new WMSFeatureInfo(map, layerInfoOption);
	return WMSInfoObj;

}

//This function is used to get wms info url.
getWmsInfoURL = function(map, WMSInfoObj, eventlatLngObj) {

	var wmsInfoUrl = WMSInfoObj.getUrl(eventlatLngObj);
	return wmsInfoUrl

}
