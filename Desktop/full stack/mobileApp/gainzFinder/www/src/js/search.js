

function initMap() {
	var options = {
		zoom: 8,
		center: {
			lat: 42.3601,
			lng: -71.0589
		}
	}
	var map = new google.maps.Map(document.getElementById('map'), options);

	
	addMarker({
		coords:{ lat: 41.8781,lng: -87.623177},
		iconImage: '',
		content: '<h1> 24 hours gym </h1>'
	});
	addMarker({
		coords:{lat: 41.8781,lng: -87.6288},
		content: '<h1> Loyola Gym </h1>'
	});
	
	// add marker function
	function addMarker(props) {
		var marker = new google.maps.Marker({
			position: props.coords,
			map: map,
			icon: props.iconImage
		});
		if(props.content) {
			var infoWindow = new google.maps.InfoWindow({
				content: props.content
			});
			marker.addListener('click', function(){
				infoWindow.open(map, marker);
			})
		}
	}
}

// let app_map = {
// 	map:null,
// 	currentmarker: null,
// 	defaultPos: {
// 		coords: {
// 			latitude: 41.98781,
// 			longitude: -87.6298
// 		}
// 	},
// 	init: function() {
// 		// if we use any cordova plugin, we have to replace it to deviceready
// 		document.addEventListener("DOMContentLoaded", app_map.ready);
// 	},
// 	ready: function() { // create map load script under map id
        
//         let s = document.createElement("script");
// 		let container = document.getElementById("map");
// 		container.appendChild(s);
// 		s.addEventListener("load", app_map.mapScriptReady);
// 		s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAh9Ovz3HoQXMyBEWuSasB0Hd0O3Z55h0I&libraries=places"
//     },
// 	mapScriptReady: function() {
// 		if(navigator.geolocation) {
// 			let options = {
// 				enableHighAccuracy:true,
// 				timeout:20000,
// 				maximumAge: 1000 * 60 * 60
// 			};
// 			navigator.geolocation.getCurrentPosition (
// 				app_map.gotPosition,
// 				app_map.failPosition,
// 				options
// 			);
// 		} else {
// 			app_map.gotPosition(app_map.defaultPos);
// 		}
// 	},
// 	gotPosition: function(position) { // get user's geolocation
// 		console.log("gotPosition", position.coords);
// 		app_map.map = new google.maps.Map(document.getElementById("map"), {
// 			zoom: 8,
// 			center: {
// 				lat:position.coords.latitude,
// 				lng:position.coords.longitude
// 			},
// 			disableDoubleClickZoom:true
// 		});
// 		// app_map.addMapListeners();
// 	},
// 	failPosition: function(err) {
// 		console.log("failPosition", err);
// 		app_map.gotPosition(app_map.defaultPos);
// 	}
// 	// addMapListeners: function() {
// 	// 	console.log("addMapListeners");
// 	// 	app_map.map.addEventListener("dblclick", app_map.addMarker);
// 	// },
// 	// addMarker: function() {
// 	// 	console.log("addMarker", ev);
// 	// 	let marker = new google.maps.Marker({
// 	// 		map:app_map.map,
// 	// 		draggable:false,
// 	// 		position: {
// 	// 			lat:ev.latLng.lat(),
// 	// 			lng:ev.latLng.lng()
// 	// 		}
// 	// 	});
// 	// 	marker.addListener("click", app_map.markerClick);
// 	// 	marker.addListener("dblclick", app_map.markerDblClick);
// 	// },
// 	// markerClick: function(ev) {
// 	// 	console.log("Click", ev);
// 	// 	console.log(this);
// 	// 	let marker = this;
// 	// 	app_map.currentMarker = marker; 
// 	// 	app_map.map.panTo(marker.getPosition());
// 	// },
// 	// markerDblClick: function(ev) {
// 	// 	console.log("Double Click", ev);
// 	// 	console.log(this);
// 	// 	let marker = this; 
// 	// 	marker.setMap(null);
// 	// 	app_map.currentMarker = null;
// 	// },
	
// };
// app_map.init();
