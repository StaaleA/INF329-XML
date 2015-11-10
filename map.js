function googleMap() {
	// Dette er standard-stilen som ligger hos google sin DEV-guide
	var styles = [{
		stylers: [{
			hue: "#00ffe6"
		}, {
			saturation: -20
		}]
	}, {
		featureType: "road",
		elementType: "geometry",
		stylers: [{
			lightness: 100
		}, {
			visibility: "simplified"
		}]
	}, {
		featureType: "road",
		elementType: "labels",
		stylers: [{
			visibility: "off"
		}]
	}];

	// Lager ett nytt STIL-objekt og velger hva den skal hete "stil"
	var styledMap = new google.maps.StyledMapType(styles, {
		name: "Stil"
	});

	// Lager KART-objektet
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(lat, lon),
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};
	var map = new google.maps.Map(document.getElementById('kart'),
		mapOptions);

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}