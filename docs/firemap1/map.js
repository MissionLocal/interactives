mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define outer bounds of map
const bounds = [
  [-122.8, 37.5], // southwest coordinate
  [-122, 38] // northeast coordinate
  ];

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/ckunawnac3rtn17s7xksr52md',
  zoom: 13.5,
  center: [-122.415, 37.755],
  maxBounds: bounds
});

// function to define color scale for map layers
function fillColorFunction(fillColorBin) {
  fillColor =  ["match",["get", fillColorBin],
    "building","red",
    "not_building","orange",
    "#ffffff"]
  return fillColor;
}

// function to define map layers information
function mapDetailsFunction(mapID, visibility) {
  mapDetails = {
    id: mapID,
    type: "circle",
    source: {
      type: "geojson",
      data: "fires2021MissionExtinguish.geojson",
    },
    layout: {
      'visibility': visibility
      },
    paint: {
      "circle-color": fillColor,
      "circle-opacity": 0.7,
    },
  }
  return mapDetails;
}

// load my map layers
map.on("load", function () {
  fillColorFunction("building_or_not");
  mapDetailsFunction("fires_id", "visible");
    map.addLayer(mapDetails);
});

// Create the popup - population
map.on('click', 'fires_id', function (e) {
    var date = e.features[0].properties.date;
    var situation = e.features[0].properties.situation;
    var action = e.features[0].properties.action;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+date+'</h4>'
            + '<p><strong>Situation</strong>: '+situation+'</p>'
            + '<p><strong>Action taken</strong>: '+action+'</p>')
        .addTo(map);
});
map.on('mouseenter', 'fires_id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'fires_id', function () {
    map.getCanvas().style.cursor = '';
});