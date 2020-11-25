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
		alert("Please enter an address");
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
	
	//add google autocomplete api to the location text bar for addresses
    var options = {types: ['address']};
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("loc"), options);
	service = new google.maps.places.PlacesService(map);
}

function onSearch(address, distance){
	//function to clear output of any previous results listed
	clearOutput()
	var MeterDistance = distance * 1609.34; //Approximate miles to meters conversion
	//geocoder converts address to latatude and longitude for the places API to use
	geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
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
  
  //Calls to Google Places API
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
  
function detailSearch(results, status){
	if(status == google.maps.places.PlacesServiceStatus.OK)
	  {
		//display list that results get output to  
		document.getElementById("output").style.display = "block";
		results.forEach(function(value){
			var request = {
				placeId : value.place_id,
				fields : ['name', 'formatted_address', 'website', 'geometry']
			};
			service.getDetails(request, displayResults)
			console.log("searching details...");
		});
	  }
	else
	  {
		  alert('Place Search was not successful for the following reason: ' + status);
	  }
}
	
function displayResults(place, status){
	
	console.log("to displaying results");
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		var a = document.createElement("a");
		a.href = place.website;
		a.textContent = place.name;
		var li = document.createElement("li");
		li.appendChild(a)
		var ul = document.getElementById("output");
		ul.appendChild(li);
    }
}

function clearOutput(){
	let list = document.getElementById('output');
	list.innerHTML = '';
	list.style.display = "none";
	
	console.log("Gyms removed");
}