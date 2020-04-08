//airport lists and their index
var airportList = [
    /* 0 */  { lat: 52.30805556, lng: 4.76416667 }, //amsterdam 
    /* 1 */  { lat: 51.45000000, lng: 5.37444444 }, //eindhoven 
    /* 2 */  { lat: 50.90083056, lng: 4.48388889 }, //bruxelles 
    /* 3 */  { lat: 51.18700000, lng: 4.45611111 }, //antwerp 
    /* 4 */  { lat: 49.009724, lng: 2.547778 }, //paris 
    /* 5 */  { lat: 51.470020, lng: -0.454295 }, //london
    /* 6 */  { lat: 47.437, lng: 19.2571 }, //budapest
    /* 7 */  { lat: 52.15949, lng: 20.96699 }, //warsaw
    /* 8 */  { lat: 44.56933, lng: 26.084332 }, //bucharest
    /* 9 */  { lat: 51.420998, lng: 12.235165 }, //leipzig
    /* 10 */ { lat: 53.35233, lng: -2.2727 }, //manchester
    /* 11 */ { lat: 45.7408, lng: 16.0674 }, //zagreb
    /* 12 */ { lat: 53.4264, lng: -6.2499 }, //dublin
    /* 13 */ { lat: 48.1126, lng: 16.5755 }, //wien
    /* 14 */ { lat: 50.859496, lng: 7.138999 }, //koln
    /* 15 */ { lat: 40.6413, lng: -73.7781 }, //new york
    /* 16 */ { lat: 27.925829, lng: -15.385331}, //gran canaria
    /* 17 */ { lat: 50.033333, lng: 8.570556 }, //frankfurt
    /* 18 */ { lat: 41.978611, lng: -87.904724}, //chicago
    /* 19 */ { lat: 52.829374, lng: -1.332134 } //east midlands
];


//flight routes
// x - departure airport index, y - arrival airport index
var flightIndex = [
    { x: airportList[0],  y: airportList[4]  },
    { x: airportList[5],  y: airportList[7]  },
    { x: airportList[5],  y: airportList[9]  },
    { x: airportList[10], y: airportList[11] },
    { x: airportList[12], y: airportList[13] },
    { x: airportList[14], y: airportList[12] },
    { x: airportList[2],  y: airportList[0] },
    { x: airportList[1],  y: airportList[5] },
   // { x: airportList[17], y: airportList[18] },
    { x: airportList[14], y: airportList[19] },
    //{ x: airportList[5],  y: airportList[21] },
    //{ x: airportList[20], y: airportList[22] },
    { x: airportList[9],  y: airportList[19] },
    //{ x: airportList[23], y: airportList[12] },
    // { x: airportList[24], y: airportList[5] },
    // { x: airportList[28], y: airportList[8] },
    { x: airportList[13], y: airportList[8] },
    { x: airportList[2], y: airportList[8] },
    // { x: airportList[24], y: airportList[29] },
    // { x: airportList[25], y: airportList[27] },
    // { x: airportList[31], y: airportList[28] },
    // { x: airportList[32], y: airportList[13] },
    // { x: airportList[33], y: airportList[28] },
    // { x: airportList[14], y: airportList[34] },
    // { x: airportList[35], y: airportList[4] },
    // { x: airportList[4], y: airportList[36] },
    // { x: airportList[4], y: airportList[36] },
    // { x: airportList[2], y: airportList[36] }
];

