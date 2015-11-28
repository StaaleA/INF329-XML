//Denne siden er utviklet av Christian Rennemo siste gang endret 28.11.2015
//Denne siden er kontrollert av Christian Rennemo, siste gang 28.11.2015
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
		scrollwheel: false,
		center: new google.maps.LatLng(lat, lon),
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};
	var map = new google.maps.Map(document.getElementById('kart'),
		mapOptions);
	var map2 = new google.maps.Map(document.getElementById('mobilKart'),
		mapOptions);

	//Legger til egendefinert stil til kart-objektet vårt
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	map2.mapTypes.set('map_style', styledMap);
	map2.setMapTypeId('map_style');
}