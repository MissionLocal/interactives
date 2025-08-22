mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/cl8ar5p4e000614mnl4zz5kkx',
    zoom: 11.85,
    maxZoom: 16,
    minZoom: 11.8,
    center: [-122.447, 37.768],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: "albers",
});

map_point.on("load", function () {
  map_point.addLayer(
      {
      id: "collisions",
      type: "circle",
      source: {
          type: "geojson",
          data: "collisions_clean.geojson",
      },
      paint: {
          "circle-radius": [
            'interpolate',
            // Set the exponential rate of change to 0.5
            ['exponential', 0.5],
            ['zoom'],
            11.8,
            6,
            16,
            12
            ],
          "circle-opacity": 0.8,
          "circle-color": [
          "match",
          ["get", "dph_col_grp_description"],
          "Vehicle-Bicycle",
          "#e85d04",
          "Bicycle-Parked Car",
          "#f48c06",
          "Bicycle Only ",
          "#7d7c7c",
          "Vehicle-Bicycle-Pedestrian",
          "#7d7c7c",
          "Vehicle(s) Only Involved",
          "#6695c0",
          "Vehicle-Pedestrian",
          "#7d7c7c",
          "#ffffff",
          ],
          "circle-stroke-color": "#000000",
      },
      minzoom: 3,
      },
      "waterway-label"
  );
  map_point.addLayer({
    id: "neighborhood",
    type: "line",
    source: {
      type: "geojson",
      data: "mission.geojson",
    },
    maxzoom: 20,
    paint: {
      "line-color": "#023047",
      "line-width": 2,
      "line-opacity":0.5
    },
  },"waterway-label");

});
  
// Create the popup
map_point.on('click', 'collisions', function (e) {
  var date = e.features[0].properties.collision_date;
  var time = e.features[0].properties.collision_time;
  var category = e.features[0].properties.dph_col_grp_description;
  var severity = e.features[0].properties.collision_severity;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + date + '  ' + time + '</h4>'
          + '<h2>Party Involved: </h2>' 
          + '<p>' + category + '</p>'
          + '<h2>Collision Severity: </h2>' 
          + '<p>' + severity + '</p>')
      .addTo(map_point);
});

      //('<h4>'+ date + ' - '+ time +'</h4>'
      //    +'<h2>Party Involved:</h2><p>'+category +'</p>' 
      //   +'<h2>Collision Severity:</h2><p>' + severity +'</p>' )
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map_point.on('mouseenter', 'collisions', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'collisions', function () {
  map_point.getCanvas().style.cursor = '';
});
