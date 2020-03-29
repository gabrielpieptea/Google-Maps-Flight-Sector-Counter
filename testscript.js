var map;

function animateCircle(line) {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 200;

    var icons = line.get('icons');
    //icons[0].offset = (count / 2) + '%';
    icons[1].offset = (count / 2) + '%';
    line.set('icons', icons);
}, 20);
}


//----------------
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.55, lng: 4.511 },
    zoom: 8
  });
  

  
  var dottedLine = {
    path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 2
  };
//-------------



  var circleSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    strokeOpacity: 1,
    strokeColor: '#393'
  };

  var coordtestone = { lat: 51.45000000, lng: 5.37444444 };
  var coordtesttwo = { lat: 52.30805556, lng: 4.76416667 };
/*
  var flightPathTwo = new google.maps.Polyline({
    path: [coordtestone, coordtesttwo],
    geodesic: true,
    strokeOpacity: 0,
    icons: [
      {
        icon: circleSymbol,
        offset: '0'
      },
      {
        icon: dottedLine,
        offset: '0',
        repeat: '12px'
      }
    ],
    map: map
  });
  
  animateCircle(flightPathTwo);
*/
//------------

    var flightPath = (departureAirport, arrivalAirport) => new google.maps.Polyline({
        path: [departureAirport, arrivalAirport],
        geodesic: true,
        strokeColor: 'blue',
        strokeOpacity: 0,
        icons: [
            {
                icon: dottedLine,
                offset: '0',
                repeat: '12px'
            },
            {
                icon: circleSymbol,
                offset: '0'
            }
            ],
            map: map
            
  });

//flightPathTwo.setMap(map);

  for(let i = 0; i < flightIndex.length; i++){
      
    flightPath(flightIndex[i].x, flightIndex[i].y).setMap(map);
    animateCircle(flightPath(flightIndex[i].x, flightIndex[i].y));
    
  }
  /*for(let i = 0; i < flightIndex.length; i++){
    flightPathTwo(flightIndex[i].x, flightIndex[i].y).setMap(map);
  }  */
 


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
