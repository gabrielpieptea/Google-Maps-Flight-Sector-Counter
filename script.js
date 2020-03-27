   var map,
   otpPos = {lat: 44.55, lng: 26.06667},
   lriaPos = {lat: 47.173999304, lng: 27.6186641},
   ffrPos = {lat: 50.033333, lng: 8.570556};

  
   var xCoordinates;
   var yCoordinates;
   
   yOne = {lat: 52.19583333, lng: 5.0733333},
   yTwo = {lat: 52.16644722, lng: 5.2319444},
   yThree = {lat: 52.05646389, lng: 5.1611111},
   yFour = {lat: 51.9626444, lng: 5.2547222} ;
   yFive = {lat: 51.85559167, lng: 5.03277778},
   ySix = {lat: 51.49709, lng: 4.806666} ;
   ySeven = {lat: 51.47973889, lng: 4.51138889} ;
   

   xOne = {lat: 52.204547500, lng: 4.62583333},
   xTwo = {lat: 52.18091667, lng: 5.000},
   xThree = {lat: 52.1958333, lng: 5.073333},
   xFour = {lat: 51.47973889, lng: 4.511111} ;
   xFive = {lat: 51.2695, lng: 4.114166},
   xSix = {lat: 51.42527778, lng: 3.40527},
   xSeven = {lat: 51.9405111, lng: 3.750555},
   xEight = {lat: 51.988888, lng: 4.11111} ;
   
   
   xCoordinates = [xOne, xTwo, xThree, xFour, xFive, xSix, xSeven, xEight, xOne];
   yCoordinates = [yOne, yTwo, yThree, yFour, yFive, ySix, ySeven, yOne];

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.55, lng: 4.511},
          zoom: 8
        });

        var markerLRIA = new google.maps.Marker({position: lriaPos, map: map});
        var markerOTP = new google.maps.Marker({position: otpPos, map: map});
        
        
        /*
        var flightPlanCoordinates = [
            otpPos, lriaPos
          ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
  
          flightPath.setMap(map);
        */
        

          var svgPath = 'm-2,-2 2,2 m2,-2 -2,2';
          var symbolOne = {
            path: svgPath,
            strokeColor: 'blue',
            fillColor: 'blue',
            fillOpacity: 1
          };

          var line = new google.maps.Polyline({
            path: xCoordinates,
            icons: [
              {
                icon: symbolOne,
                offset: '50%'
              }
            ],
            map: map
          });

          var line = new google.maps.Polyline({
            path: yCoordinates,
            icons: [
              {
                icon: symbolOne,
                offset: '50%'
              }
            ],
            map: map
          });
        
          
      }