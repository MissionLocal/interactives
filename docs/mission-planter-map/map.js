mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/ckunawnac3rtn17s7xksr52md',
  zoom: 13.8,
  center: [-122.41682618629616, 37.75959812360193],
  pitch: 0,
  bearing: 0,
});

map.on('load', function () {
  map.resize();
});

// function to define map layers information
function mapDetailsFunction(mapID, visibility) {
  mapDetails = {
    id: mapID,
    type: "circle",
    source: {
      type: "geojson",
      data: "coordinates.geojson",
    },
    layout: {
      'visibility': visibility
      },
    paint: {
      "circle-color": "green",
      "circle-opacity": 0.5,
      'circle-radius': {
        'base': 1.75,
        'stops': [
        [12, 6],
        [22, 220]
        ]
        },
    },
  }
  return mapDetails;
}

// load my map layers
map.on("load", function () {
  mapDetailsFunction("id", "visible");
    map.addLayer(mapDetails);
});

// Create the popup
map.on('click', 'id', function (e) {
    var address = e.features[0].properties.address;
    var image = e.features[0].properties.photo_name;
    var description = e.features[0].properties.description;
    var open = openOrClosed(e.features[0].properties.open)
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+address+'</h4>'
            + '<img class="center" style="max-width: 700px; width: 100%" src="images/'+image+'">'
            + '<h4>Description</h4>'+description
            + '<p><strong>'+open+'</strong></p>')
        .addTo(map);
});
map.on('mouseenter', 'id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'id', function () {
    map.getCanvas().style.cursor = '';
});

function openOrClosed(d) {
  if (d == "no") {
    return "Please note, this venue has now closed."
  }
  else {
    return ""
  }
}

map.addControl(new mapboxgl.NavigationControl());
