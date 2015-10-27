var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.2636126, lng: 120.1212502},
		zoom: 15
	});
}