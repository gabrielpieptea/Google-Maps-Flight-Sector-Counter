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


var markerpic = {
  url: './pics/marker.png',
  scaledSize: new google.maps.Size(50,50),
  origin: new google.maps.Point(0.0),
  anchor: new google.maps.Point(0, 0)
} 


//----------------
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.55, lng: 4.511 },
    zoom: 8
  });
  

  var marker = (airportMarker) => new google.maps.Marker({
    position: airportMarker,
    icon: markerpic,
    map: map
  }); 
  
  
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


  for(let i = 0; i < flightIndex.length; i++){
    flightPath(flightIndex[i].x, flightIndex[i].y).setMap(map);
  }


 for(let i = 0; i < airportList.length; i++){
  marker(airportList[i]).setMap(map);
}
    

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
