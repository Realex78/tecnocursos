;(function(){
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
				alert("Tu navegador no soporta la localización. Te recomendamos acceder a browsehappy.com para actualizar tu navegador.")
			}
		}
	}
	const my_place = {
		lat: 19.439331,
		lng: -99.20226000000002
	}
	google.maps.event.addDomListener(window,"load",()=>{
		const map = new google.maps.Map(
			document.getElementById('map'),{
				center: my_place,
				zoom: 15,
				scrollwheel: false,
				language: "es",
			}
		)
		const marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "Learning Center by Tecnocursos.com",
			visible: true
		})
		UserLocation.get((coords)=>{
			let origen = new google.maps.LatLng(coords.lat, coords.lng)
			let destino = new google.maps.LatLng(my_place.lat, my_place.lng)
			let service = new  google.maps.DistanceMatrixService()
			service.getDistanceMatrix({
				origins: [origen],
				destinations: [destino],
				travelMode: google.maps.TravelMode.DRIVING
			}, (response, status)=>{
				if (status === google.maps.DistanceMatrixStatus.OK) {
					const duration_element = response.rows[0].elements[0]
					const duracion_viaje = duration_element.duration.text
					document.querySelector("#message")
					writeMessage(`
	  				Estás a ${duracion_viaje} del Learning Center más cercano.
	  			`)
				}
			})
		})
	})
	function writeMessage(message){
		document.getElementById("message").innerHTML = message;
	}
})()