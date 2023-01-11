mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/clcs9azl6000115l83esldxz5',
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
          data: "pedestrian2020-2022.geojson",
      },
      paint: {
          "circle-radius": [
            'interpolate',
            // Set the exponential rate of change to 0.5
            ['exponential', 0.5],
            ['zoom'],
            11.8,
            5.5,
            16,
            10
            ],
          "circle-opacity": 0.7,
          "circle-color": [
          "match",
          ["get", "collision_severity"],
          "Injury (Severe)",
          "#473335",
          "Fatal",
          "#B0413E",
          "#ffffff",
          ],
          "circle-stroke-color": "#000000",
      },
      minzoom: 3,
      },
      "road-label"
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
  var age = haveAge(e.features[0].properties.victim_age);
  var gender = haveGender(e.features[0].properties.victim_sex);
  var disp = haveDist(e.features[0].properties.vz_pcf_description);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + date + '  ' + time + '</h4>'
          + '<h2>Pedestrian Involved: </h2>' 
          + age + gender
          + '<h2>Description: </h2>' 
          + disp)
      .addTo(map_point);
});

function haveAge(d) {
  if (d == "unknown") {
      return "<p>Age-unknown "
  }
  else {
      return '<p>' + d + '-year-old '
  }
}

function haveGender(d) {
  if (d == "people") {
      return "Gender-unknown</p>"
  }
  else {
      return d +'</p>'
  }
}

function haveDist(d) {
  if (d == "") {
      return "No detail available"
  }
  else {
      return '<p>' + d + '</p>'
  }
}


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