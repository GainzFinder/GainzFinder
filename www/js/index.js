/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var geocoder;
var map;
var service;
document.addEventListener('deviceready', onDeviceReady, false);

document.getElementById("search").addEventListener("click", function(){
	var loc = document.getElementById("loc").value;
	console.log('address is: ' + loc);
	
	var distance = document.getElementById("dis").value;
	console.log('distance is: ' + distance);
	if(distance == "none"){
			alert("Please select a search radius");
	}
	else if(loc == ''){
		alert("Please enter a location");
	}
	else{
	onSearch(loc, distance);	
	}	
});



function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
	geocoder = new google.maps.Geocoder();
	initMap();
}


function initMap(){
	console.log('initializing map');
	//var chicago = {lat: 41.8781, lng: -87.6298};

	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 41.8781, lng: -87.6298},
		zoom: 8,});
	
	//add google autocomplete api to the location text bar
    //no options allows towns/cities/locations of interest to be used
	autocomplete = new google.maps.places.Autocomplete(document.getElementById("loc"));
	service = new google.maps.places.PlacesService(map);
}

function onSearch(address, distance){
	//function to clear output of any previous results listed
	clearOutput()
	//adjusts map zoom based on search radius
	//could use some refining for optimal UX, but a good start
	if (distance = 5)
	{
		map.setZoom(11);
	}
	else if (distance = 15)
	{
		map.setZoom(7);
	}
	
	var MeterDistance = distance * 1609.34; //Approximate miles to meters conversion
	//geocoder converts address to latatude and longitude for the places API to use
	geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
		//add center marker of entered location  
		var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
		
		//call to function that places the Google Places API request
		placeSearch(results[0].geometry.location, MeterDistance);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  
//Begins calls to Google Places API
//nearby search to get places within the range
function placeSearch(location, MeterDistance){
	console.log("location: " + location);
	console.log("MeterDistance: " + MeterDistance);
	var request = {
	location: location,
	radius: MeterDistance,
	type: ['gym']
	};		
	service.nearbySearch(request, detailSearch);
}
//detailed search to get more information on those place
function detailSearch(results, status){
	if(status == google.maps.places.PlacesServiceStatus.OK)
	  {
		//display list that results get output to 
		//change the display here, so it isn't updated with every gym result output in the next function
		document.getElementById("output").style.display = "block";
		results.forEach(function(value){
			var request = {
				placeId : value.place_id,
				fields : ['name', 'formatted_address', 'website', 'geometry', 'formatted_phone_number', 'opening_hours']
			};
			service.getDetails(request, displayResults)
			
		});
	  }
	else
	  {
		  alert('Place Search was not successful for the following reason: ' + status);
	  }
}
//displaying the places as markers and in the list
//setting up event listeners for infoWindow
function displayResults(place, status){
	console.log("displaying results");
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		
		//add marker to map
		map.setCenter(place.geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
		//content string for the infoWindow
		var contentString = place.name + "<br> Phone: " + place.formatted_phone_number;
		//add infoWindow to marker
		
		var infoWindow = new google.maps.InfoWindow({
    content: contentString,
  });
		var a = document.createElement("a");
		a.href = place.website;
		a.textContent = place.name;
		var li = document.createElement("li");
		li.appendChild(a);
		
		//All gyms seem to be returning undefined, so commenting out for now
		//console.log(place.opening_hours.isOpen());
		//if(place.opening_hours.isOpen() != undefined && place.opening_hours.isOpen() == false)
		//{
		//	var p = document.createElement("p");
		//	p.textContent = "Closed";
		//	p.style.color = "red";
		//	li.appendChild(p);
		//}
				
		var ul = document.getElementById("output");
		ul.appendChild(li);
		var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
		
		//add event listeners to the marker and the list
		
		marker.addListener('click', function(){
			infoWindow.open(map, marker);
		});
		
		li.addEventListener('click', function(){
			infoWindow.open(map, marker);
		});
		
		
		
    }
	
}

function clearOutput(){
	let list = document.getElementById('output');
	list.innerHTML = '';
	list.style.display = "none";
	
	console.log("Gyms removed");
}