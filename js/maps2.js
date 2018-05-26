/*
  Código de direcciones por Socramg
  Disponible en jsfiddle.net/Socramg/0po00agp/
*/

// Instantiate a directions service.
var directionsService = new google.maps.DirectionsService;

// Crear el mapa.
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 15,
	center: {lat: 19.439331, lng: -99.20226000000002},
	scrollwheel: false,
});

// Create a renderer for directions and bind it to the map.
var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
function writeMessage(message){
	document.getElementById("message").innerHTML = message;
}
// Request route directions
const my_place = {
		lat: 19.439331,
		lng: -99.20226000000002
	}
	class UserLocation {
		static get(callback){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((location)=>{
					callback({
						lat: location.coords.latitude,
						lng: location.coords.longitude
					})
				})
			} else {
				Push.create("Error en localización", {
					body: "Al parecer yu navegador no soporta la localización. Haz clic aquí para actualizarlo.",
					icon: "/imgs/error.png",
					timeout: 10000,
					link: "https://browsehappy.com"
				})
			}
		}
	}
	UserLocation.get((coords)=>{
			let origen = new google.maps.LatLng(coords.lat, coords.lng)
			let service = new  google.maps.DistanceMatrixService()
			directionsService.route({
	origin: origen,
	destination: my_place,
	travelMode: google.maps.TravelMode.DRIVING
}, function(response, status) {
	if (status === google.maps.DirectionsStatus.OK) {
		
		// Get first route duration
		var route = response.routes[0];
		var duration = 0;
		
		route.legs.forEach(function (leg) {
			// The leg duration in seconds.
			duration += leg.duration.value;
		});
		
		directionsDisplay.setDirections(response);
			if (Math.round(duration / 60) < 2) {
					document.getElementById('message').innerHTML = 'Estás a ' + Math.round(duration / 60) + ' minuto de nuestra sede.';
			}
			if (Math.round(duration / 60) < 60 && Math.round(duration / 60) >= 2) {
				document.getElementById('message').innerHTML = 'Estás a ' + Math.round(duration / 60) + ' minutos de nuestra sede.';
			} else {
				if (Math.round(duration / 60 / 60) == 1) {
					document.getElementById('message').innerHTML = 'Estás a ' + Math.round(duration / 60 / 60) + ' hora de nuestra sede.';
				}
				if (Math.round(duration / 60 / 60) < 24 && duration / 60 / 60 > 1) {
					document.getElementById('message').innerHTML = 'Estás a ' + Math.round(duration / 60 / 60) + ' horas de nuestra sede.';
				}
				if (Math.round(duration / 60 / 60 / 24) == 1) {
					document.getElementById('message').innerHTML = 'Estás a ' + Math.round(duration / 60 / 60 / 24) + ' dia de nuestra sede.';
				}
				if (duration / 60 / 60 / 24 > 1) {
					document.getElementById('message').innerHTML = 'Estás a ' + Math.round(duration / 60 / 60 / 24) + ' dias de nuestra sede.';
				}
			}
	} else {
		Push.create("Error en localización", {
					body: "Hubo un error al obtenrer las direcciones. " + status,
					icon: "/imgs/error.png",
					timeout: 6000,
		})
		const marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "Learning Center by Tecnocursos.com",
			visible: true
		})
		writeMessage("Ubícanos en Antara Fashion Hall en la CDMX.")
	}
	})
});