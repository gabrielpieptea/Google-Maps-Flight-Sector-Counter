// plane path design
var dottedLine = {
  path: "M 0,-1 0,1",
  strokeOpacity: 1,
  scale: 2,
};

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
      dep: flightIndex[i].x,
      des: flightIndex[i].y,
      count: 0,
      line: flightPath(flightIndex[i].x, flightIndex[i].y),
      inSector: false,
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
    clickable: false
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


  /* ---------------------------------
plane animation along its path
-----------------------------------*/

  window.setInterval(function () {
    for (let i = 0; i < flightIndex.length; i++) {
      allFlights[i].count = (allFlights[i].count + 0.5) % 1000;
      var icons = allFlights[i].line.get("icons");
      icons[1].offset = allFlights[i].count / 10 + "%";
      allFlights[i].line.set("icons", icons);

      var a = new google.maps.LatLng(
        allFlights[i].dep.lat,
        allFlights[i].dep.lng
      );
      var b = new google.maps.LatLng(
        allFlights[i].des.lat,
        allFlights[i].des.lng
      );

      var e = google.maps.geometry.spherical.interpolate(
        a,
        b,
        allFlights[0].count / 1000
      ); 

      /* ---------------------------------
verifies if plane icon is contained in the two sectors
-----------------------------------*/
      var newInSector =
        google.maps.geometry.poly.containsLocation(e, areaOnePolygon) ||
        google.maps.geometry.poly.containsLocation(e, areaTwoPolygon);
      if (allFlights[i].inSector && !newInSector) acftInSector--;
      else if (!allFlights[i].inSector && newInSector) acftInSector++;

      allFlights[i].inSector = newInSector;
    }

    // Update value
    document.getElementById("flightno").innerHTML = acftInSector;
  }, 20);
}
