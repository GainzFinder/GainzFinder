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

function onLoad() {
	document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
	//after device is ready run initialize
	console.log("device ready work!");
	initialize();
}


function initialize(){
	//sets up event listeners & variables for using Google APIs
	
	//find gyms, location search bar, and current location inputs
	let findGymBtn = document.getElementById("find");
	let locationInput = document.getElementById("loc");
	let currentLocBtn = document.getElementById("cur");
	
	//google API variables
	var geocoder;
	var location;
	var map, infoWindow;
	var service;
	var autocomplete;
	//now initialize map
	
	console.log(" initialize work!");
	initMap();
	
}

function initMap(){
	var chicago = {lat: 41.8781, lng: -87.6298};
	
	map = new google.maps.Map(
		document.getElementById('map'), {
		zoom: 8,
		center: chicago,
		fullscreenControl: false,
		streetViewControl: false});
	console.log("Map initialized");
	var marker = new google.maps.Marker({position: chicago, map: map});
	console.log("Marker added");
	//add autocomplete api to locationInput
	//var options = {types: ['address']};
	//autocomplete = new google.maps.places.Autocomplete(document.getElementById("loc"), options);
}

onLoad();


