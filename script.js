var map;

var posone = airportList[0];
var postwo = airportList[1];

var areaOnePos = [
  { lat: 52.2045475, lng: 4.62583333 },
  { lat: 52.18091667, lng: 5.0 },
  { lat: 52.1958333, lng: 5.073333 },
  { lat: 51.47973889, lng: 4.511111 },
  { lat: 51.2695, lng: 4.114166 },
  { lat: 51.42527778, lng: 3.40527 },
  { lat: 51.9405111, lng: 3.750555 },
  { lat: 51.988888, lng: 4.11111 }
];

var areaTwoPos = [
  { lat: 52.19583333, lng: 5.0733333 },
  { lat: 52.16644722, lng: 5.2319444 },
  { lat: 52.05646389, lng: 5.1611111 },
  { lat: 51.9626444, lng: 5.2547222 },
  { lat: 51.85559167, lng: 5.03277778 },
  { lat: 51.49709, lng: 4.806666 },
  { lat: 51.47973889, lng: 4.51138889 }
];

ehamAirportCoords = { lat: 52.30805556, lng: 4.76416667 }; //amsterdam

ehehAirportCoords = { lat: 51.45000000, lng: 5.37444444 }; //eindhoven

bruAirportCoords = { lat: 50.90083056, lng: 4.48388889 }; //bruxelles

anrAirportCoords = { lat: 51.18700000, lng: 4.45611111 }; //antwerp

pariAirportCoords = { lat: 49.009724, lng: 2.547778 }; // paris

lhrAirportCoords = { lat: 51.470020, lng: -0.454295 }; //london

bdpAirportCoords = { lat: 47.437, lng: 19.2571 }; //budapesta

wswAirportCoords = { lat: 52.15949, lng: 20.96699 }; //warsaw
var markerpic = {
  url: './pics/marker.png',
} 

var svgAnimated = btoa([
  '<?xml version="1.0"?>',
  '<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
  '<g fill="none" stroke-width="3" transform="translate(11,11)">',
  '<circle id="my-circle" cx="0" cy="0" r="9" stroke="darkorange" fill="seagreen" />',
  '<animate href="#my-circle" attributeName="opacity"  values="1;-2" dur="1s" repeatCount="indefinite" />',
  '</g></svg>'
].join('\n'));


//----------------
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.55, lng: 4.511 },
    zoom: 8
  });
  

  var marker = new google.maps.Marker({
    position: ehamAirportCoords,
    map: map
  }); 
  marker.setMap(map);
  
  var dottedLine = {
    path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 2
  };

  var flightPath = (departureAirport, arrivalAirport) => new google.maps.Polyline({
    path: [departureAirport, arrivalAirport],
    geodesic: true,
    strokeColor: 'blue',
    strokeOpacity: 0,
    icons: [{
      icon: dottedLine,
      offset: '0',
      repeat: '12px'
    }]
  });

  flightPath(airportList[0], airportList[4]).setMap(map);
  flightPath(airportList[5], airportList[7]).setMap(map);
  flightPath(airportList[5], airportList[9]).setMap(map);
  flightPath(airportList[10], airportList[11]).setMap(map);
  flightPath(airportList[12], airportList[13]).setMap(map);
  flightPath(airportList[14], airportList[12]).setMap(map);
  flightPath(airportList[0], airportList[16]).setMap(map);
  flightPath(airportList[6], airportList[15]).setMap(map);
  flightPath(airportList[0], airportList[4]).setMap(map);
  flightPath(airportList[17], airportList[18]).setMap(map);
  flightPath(airportList[14], airportList[19]).setMap(map);
  


/* ---------------------------------
defining sectors + event handling
-----------------------------------*/
  var areaOnePolygon = new google.maps.Polygon({
    paths: areaOnePos,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "rgba(255,255,255,0.5);",
    fillOpacity: 0
  });
  areaOnePolygon.setMap(map);

  var areaTwoPolygon = new google.maps.Polygon({
    paths: areaTwoPos,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "rgba(255,255,255,0.5);",
    fillOpacity: 0
  });
  areaTwoPolygon.setMap(map);

  google.maps.event.addListener(areaOnePolygon, "mouseover", function() {
    areaOnePolygon.setOptions({ fillOpacity: 0.35 });
  });

  google.maps.event.addListener(areaOnePolygon, "mouseout", function() {
    areaOnePolygon.setOptions({ fillOpacity: 0 });
  });

  google.maps.event.addListener(areaTwoPolygon, "mouseover", function() {
    areaTwoPolygon.setOptions({ fillOpacity: 0.35 });
  });

  google.maps.event.addListener(areaTwoPolygon, "mouseout", function() {
    areaTwoPolygon.setOptions({ fillOpacity: 0 });
  });
}
