mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/cl94nw8sj002i15qkzorhnpji',
    zoom: 14.32,
    maxZoom: 15,
    minZoom: 14,
    center: [-122.415, 37.762],
    maxBounds: [
      [-122.42, 37.761], // Southwest coordinates
      [-122.41, 37.763] // Northeast coordinates
    ],
    projection: "albers",
});

map_point.on("load", function () {
  map_point.addLayer(
      {
      id: "event",
      type: "circle",
      source: {
          type: "geojson",
          data: "event_place.geojson",
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
});

  
// Create the popup
map_point.on('click', 'event', function (e) {
  var name = e.features[0].properties.name;
  var event1 = e.features[0].properties.event1;
  var event2 = e.features[0].properties.event2;
  var event3 = e.features[0].properties.event3;
  new mapboxgl.Popup()
      .setLngLat([-122.410, 37.762])
      .setHTML('<h4>' + name + '</h4>'
          + '<h2>5:00-6:00 </h2>' 
          + '<p>' + event1 + '</p>'
          + '<h2>6:30-7:30 </h2>' 
          + '<p>' + event2 + '</p>'
          + '<h2>8:00-9:00 </h2>' 
          + '<p>' + event3 + '</p>')
      .addTo(map_point);
});

      //('<h4>'+ date + ' - '+ time +'</h4>'
      //    +'<h2>Party Involved:</h2><p>'+category +'</p>' 
      //   +'<h2>Collision Severity:</h2><p>' + severity +'</p>' )
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map_point.on('mouseenter', 'event', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'event', function () {
  map_point.getCanvas().style.cursor = '';
});