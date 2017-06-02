/* //Creating a tiled WMS Service and adding it to the map
			var tiledWMS = new WMSTiled({
				url : 'http://localhost:8080/geoserver/topp/wms?service=WMS',
				version : '1.1.1',
				layers : 'topp:states',
				styles : ''
			}); */

			var layerObj = {
				url : 'http://localhost:8080/geoserver/topp/wms?service=WMS',
				version : '1.1.1',
				layers : 'topp:states'

			}
			wmsLyrObj = getWMSLayer(layerObj);
			addWmsLayerToMap(map, wmsLyrObj);
			
			
			layerInfoOption={
				url : 'http://localhost:8080/geoserver/topp/wms?',
				version : '1.1.1',
				layers : 'topp:states'

			}
			//map.overlayMapTypes.push(wmsLyrObj);

			//map.overlayMapTypes.push(tiledWMS);

			//Creating a WMSFeatureInfo class to get info from map.
			//var WMSInfoObj = new WMSFeatureInfo(map, ); 
			
			WMSInfoObj=getLayerInfoObj(map,layerInfoOption);
			

			google.maps.event.addListener(map, 'click', function(e) {
				//WMS Feature Info URL is prepared by the help of
				//getUrl method of WMSFeatureInfo object created before
				wmsInfoUrl=getWmsInfoURL(map, WMSInfoObj, e.latLng)
				//var url = WMSInfoObj.getUrl(e.latLng);
				$.ajax({
					url : wmsInfoUrl,
					dataType : 'json'
					
				}).done(
						function(data) {
							if (infowindow != null) {
								infowindow.close();
							}
							var info = '<b>State Name : </b>'
									+ data.features[0].properties.STATE_NAME
									+ '<br><b>Population : </b>'
									+ data.features[0].properties.SAMP_POP;
							infowindow = new google.maps.InfoWindow({
								content : info,
								position : e.latLng
							});
							infowindow.open(map);
						});
			});
