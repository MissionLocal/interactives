mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
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

map_point.on('load', () => {
  // Load an image from an external URL.
  map_point.loadImage(
    'dod.png',
    (error, image) => {
    if (error) throw error;
  
  // Add the image to the map style.
  map_point.addImage('dod', image);
   
  // Add a layer to use the image to represent the data.
  map_point.addLayer({
  'id': 'events_dod',
  'type': 'symbol',
  'source': {
    type: "geojson",
    data: "map.geojson",
   }, // reference the data source
   'filter': ['==','halloween_bool',1],
  'layout': {
    'icon-image': 'dod', // reference the image
    'icon-size': [
      'interpolate',
      // Set the exponential rate of change to 0.5
      ['exponential', 0.5],
      ['zoom'],
      11.8,
      0.04,
      16,
      0.1
      ],
    'icon-allow-overlap': true,
  },
  minzoom: 11.8,
  });
  }
  );
  });

map_point.on('load', () => {
    // Load an image from an external URL.
    map_point.loadImage(
      'hlw.png',
      (error, image) => {
      if (error) throw error;
    
    // Add the image to the map style.
    map_point.addImage('hlw', image);
     
    // Add a layer to use the image to represent the data.
    map_point.addLayer({
    'id': 'events_hlw',
    'type': 'symbol',
    'source': {
      type: "geojson",
      data: "map.geojson",
     }, // reference the data source
     'filter': ['==','halloween_bool',0],
    'layout': {
      'icon-image': 'hlw', // reference the image
      'icon-size': [
        'interpolate',
        // Set the exponential rate of change to 0.5
        ['exponential', 0.5],
        ['zoom'],
        11.8,
        0.04,
        16,
        0.1
        ],
      'icon-allow-overlap': true,
    }
    });
    }
    );
    });

// Create the popup
map_point.on('click', 'events_dod', function (e) {
  var date = e.features[0].properties.event_date;
  var name = e.features[0].properties.event_name;
  var link = e.features[0].properties.event_link;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + date + '</h4>'
          + '<h2>' + name + '</h2>'
          + '<p>More info <a href="' + link + '">here</a></p>')
      .addTo(map_point);
});

map_point.on('mouseenter', 'events_dod', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'events_dod', function () {
  map_point.getCanvas().style.cursor = '';
});

// Create the popup
map_point.on('click', 'events_hlw', function (e) {
  var date = e.features[0].properties.event_date;
  var name = e.features[0].properties.event_name;
  var link = e.features[0].properties.event_link;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + date + '</h4>'
          + '<h2>' + name + '</h2>'
          + '<p>More info <a href="' + link + '">here</a></p>')
      .addTo(map_point);
});

map_point.on('mouseenter', 'events_hlw', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'events_hlw', function () {
  map_point.getCanvas().style.cursor = '';
});
