mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/cl94nw8sj002i15qkzorhnpji',
    zoom: 13.7,
    maxZoom: 18,
    minZoom: 13,
    center: [-122.415, 37.762],
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
          ['exponential', 0.7],
          ['zoom'],
          13,
          10,
          18,
          17
          ],
          "circle-opacity": 0.9,
          "circle-color":"#7c77b9",
          "circle-stroke-color": "#FFFFFF",
          "circle-stroke-width": 2
      },
      minzoom: 13,
      },
      "waterway-label"
  );
});

  
// Create the popup
map_point.on('click', 'event', function (e) {
  var name = e.features[0].properties.name;
  var event1 = haveEvent1(e.features[0].properties.event1);
  var event2 = haveEvent2(e.features[0].properties.event2);
  var event3 = haveEvent3(e.features[0].properties.event3);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + name + '</h4>'
          +  event1
          +  event2
          +  event3
          )
      .addTo(map_point);
});

function haveEvent1(d) {
  if (d == "") {
      return ""
  }
  else {
      return "<h2>5:00-6:00</h2><p>" + d + "</p>"
  }
}

function haveEvent2(d) {
  if (d == "") {
      return ""
  }
  else {
      return "<h2>6:30-7:30</h2><p>" + d + "</p>"
  }
}

function haveEvent3(d) {
  if (d == "") {
      return ""
  }
  else {
      return "<h2>8:00-9:00</h2><p>" + d + "</p>"
  }
}

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
