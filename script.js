var map;

var dottedLine = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 2
};

function planeMotion(line) {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 1000;
    var icons = line.get("icons");
    icons[1].offset = count / 10 + "%";
    line.set("icons", icons);
  }, 20);
}

//----------------
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.55, lng: 4.511 },
    zoom: 8
  });

  var marker = airportList =>
    new google.maps.Marker({
      position: airportList,
      map: map,
      icon: new google.maps.MarkerImage(
        "./pics/marker.svg",
        null,
        null,
        null,
        new google.maps.Size(20, 20)
      )
    });

    var circleSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      strokeOpacity: '1'
    };
    
  
  var flightPath = (departureAirport, arrivalAirport) =>
    new google.maps.Polyline({
      path: [departureAirport, arrivalAirport],
      geodesic: true,
      strokeColor: "blue",
      strokeOpacity: 0,
      icons: [
        {
          icon: dottedLine,
          offset: "0",
          repeat: "12px"
        },
        {
          icon: circleSymbol,
          offset: "0"
        }
      ],
      map: map
    });

  for (let i = 0; i < flightIndex.length; i++) {
    planeMotion(flightPath(flightIndex[i].x, flightIndex[i].y));
  }

  for (let i = 0; i < airportList.length; i++) {
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
