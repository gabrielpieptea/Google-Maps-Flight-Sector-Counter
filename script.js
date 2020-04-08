

// plane path design
var dottedLine = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 2,
};

/* ---------------------------------
plane animation along its path
-----------------------------------*/
function planeMotion(line) {
  var count = 0;
  window.setInterval(function () {
    count = (count + 1) % 1000;
    var icons = line.get("icons");
    icons[1].offset = count / 4 + "%";
    line.set("icons", icons);

    console.log(count);
  }, 20);
}

/* ---------------------------------
map initialization
-----------------------------------*/
function initMap() {
  var map;
  var allFlights = [];
  var acftInSector = 0;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.55, lng: 4.511 },
    zoom: 8,
  });
  /* ---------------------------------
all markers defined
-----------------------------------*/
  var marker = (airportList) =>
    new google.maps.Marker({
      position: airportList,
      map: map,
      icon: new google.maps.MarkerImage(
        "./pics/marker.svg",
        null,
        null,
        null,
        new google.maps.Size(20, 20)
      ),
    });

  for (let i = 0; i < airportList.length; i++) {
    marker(airportList[i]).setMap(map);
  }

  /* ---------------------------------
all flight path defined
-----------------------------------*/
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
          repeat: "12px",
        },
        {
          icon: planeSymbol,
          offset: "0",
        },
      ],
      map: map,
    });
  
  for (let i = 0; i < flightIndex.length; i++) {
    allFlights.push({
      "dep": flightIndex[i].x,
      "des": flightIndex[i].y,
      "count": 0,
      "line": flightPath(flightIndex[i].x, flightIndex[i].y),
      "inSector": false
    });
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
    fillOpacity: 0,
    clickable: false,
  });
  areaOnePolygon.setMap(map);

  var areaTwoPolygon = new google.maps.Polygon({
    paths: areaTwoPos,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "rgba(255,255,255,0.5);",
    fillOpacity: 0,
  });
  areaTwoPolygon.setMap(map);

  /* ---------------------------------
action buttons for methods
-----------------------------------*/
  const hoverButt = document.getElementById("hoverArea");
  const resetButt = document.getElementById("resetArea");
  const nightButt = document.getElementById("nightMode");

  hoverButt.setAttribute("style", "background-color: #007bff");
  hoverButt.addEventListener("click", hovertheArea);
  resetButt.addEventListener("click", (e) => initMap());
  nightButt.addEventListener("click", (e) => toggleDarkMode());
  nightButt.setAttribute("style", "background-color: #007bff");

  /* ---------------------------------
map night mode
-----------------------------------*/
  let darkModeBool = false;
  function toggleDarkMode() {
    if (darkModeBool) {
      map.setOptions({ styles: "" });
      darkModeBool = false;
      nightButt.setAttribute("style", "background-color: #007bff");
    } else {
      map.setOptions({ styles: darkMode });
      darkModeBool = true;
      nightButt.setAttribute("style", "background-color: green");
    }
  }

  /* ---------------------------------
map hover area for sectors
-----------------------------------*/
  let cond = true;
  function hovertheArea() {
    if (cond) {
      areaOnePolygon.setOptions({ fillOpacity: 0.35 });
      areaTwoPolygon.setOptions({ fillOpacity: 0.35 });
      cond = false;
    } else {
      areaOnePolygon.setOptions({ fillOpacity: 0 });
      areaTwoPolygon.setOptions({ fillOpacity: 0 });
      cond = true;
    }
  }

  //map sectors hover - mouseover
  /*
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
*/

  punctu = new google.maps.LatLng({ lat: -34, lng: 151 });

  google.maps.event.addListener(map, "click", function (event) {
    alert(google.maps.geometry.poly.containsLocation(punctu, areaOnePolygon));
  });

  // Animation Test by AndreiU
  window.setInterval(function() {
    for (let i = 0; i < flightIndex.length; i++) {
      allFlights[i].count = (allFlights[i].count + 0.5) % 1000;
      var icons = allFlights[i].line.get("icons");
      icons[1].offset = allFlights[i].count / 10 + "%";
      allFlights[i].line.set("icons", icons);
    
      // verifica pls toata partea asta

      // Compute coordinates based on offset
/*
      var lat1 = allFlights[i].dep.lat;
      var lat2 = allFlights[i].des.lat;
      var lon1 = allFlights[i].dep.lng;
      var lon2 = allFlights[i].des.lng;
      
      var R = 6371e3; // metres
      var φ1 = lat1 * Math.PI/180;
      var φ2 = lat2 * Math.PI/180;
      var λ1 = lon1 * Math.PI/180
      var λ2 = lon2 * Math.PI/180
      var Δφ = (φ2-φ1);
      var Δλ = (λ2-λ1) * Math.PI/180;

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var D = R * c;

      // Compute initial bearing
      var y = Math.sin(λ2-λ1) * Math.cos(φ2);
      var x = Math.cos(φ1)*Math.sin(φ2) -
      Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
      var brng = Math.atan2(y, x) * 180 / Math.PI;
      
      d = allFlights[i].count / 1000 * D;
      // Calculate final point based on initial bearing and 
      var φ3 = Math.asin( Math.sin(φ1)*Math.cos(d/R) +
                    Math.cos(φ1)*Math.sin(d/R)*Math.cos(brng) );
      var λ3 = λ1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(φ1),
                         Math.cos(d/R)-Math.sin(φ1)*Math.sin(φ3));


      var lat3 = φ3 * 180 / Math.PI;
      var lon3 = λ3 * 180 / Math.PI;
*/
      // debugger;

      // verifica intrare sau iesir din sector.
      
      var a = new google.maps.LatLng(allFlights[i].dep.lat, allFlights[i].dep.lng);
      var b = new google.maps.LatLng(allFlights[i].des.lat, allFlights[i].des.lng);

      var e = google.maps.geometry.spherical.interpolate(a, b, (allFlights[0].count / 1000));//(count / 200));
      
      
      // console.log("e = ");
      // console.log(e);

      // var newMarker = (e) =>
      // new google.maps.Marker({
      // position: e,
      // map: map
      // });

      //newMarker(e).setMap(map);
      //var e = new google.maps.LatLng(lat3, lon3);
      //var e = new google.maps.LatLng(0, 45);
      
      var newInSector = google.maps.geometry.poly.containsLocation(e, areaOnePolygon) || google.maps.geometry.poly.containsLocation(e, areaTwoPolygon);
      if (allFlights[i].inSector && !newInSector)
        acftInSector--;
      else if (!allFlights[i].inSector && newInSector)
        acftInSector++;

      allFlights[i].inSector = newInSector;
    }

    // Update value
  document.getElementById("flightno").innerHTML = acftInSector;
  }, 20);

  
}
