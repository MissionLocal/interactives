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

map_point.on('load', () => {
  // Load an image from an external URL.
  map_point.loadImage(
    'logo.png',
    (error, image) => {
    if (error) throw error;
  
  // Add the image to the map style.
  map_point.addImage('logo', image);
   
  // Add a layer to use the image to represent the data.
  map_point.addLayer({
  'id': 'new_logo',
  'type': 'symbol',
  'source': {
    type: "geojson",
    data: "map-legacy.geojson",
   }, // reference the data source
  'layout': {
    'icon-image': 'logo', // reference the image
    'icon-size': [
      'interpolate',
      // Set the exponential rate of change to 0.5
      ['exponential', 0.5],
      ['zoom'],
      11.8,
      0.02,
      16,
      0.05
      ],
    'icon-allow-overlap': true,
  },
  minzoom: 11.8,
  });
  }
  );
  });


// Create the popup
map_point.on('click', 'new_logo', function (e) {
  var name = e.features[0].properties.name;
  var dscp = e.features[0].properties.dscp;
  var address = e.features[0].properties.address;
  var link = e.features[0].properties.link;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + address + '</h2>'
      + '<h2>' + name + '</h2>'
      +'<p>' + dscp + '</p>'
      + '<a href="http://' + link + '">' + link + '</a>')
      .addTo(map_point);
});

map_point.on('mouseenter', 'new_logo', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'new_logo', function () {
  map_point.getCanvas().style.cursor = '';
});
