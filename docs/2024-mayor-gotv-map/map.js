mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/ckunawnac3rtn17s7xksr52md',
  zoom: 11.2,
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
      "circle-color": [
        "match",
        ["get", "Type"],
        "peskin", "#49d5da",
        "lurie", "#3669a1",
        "breed", "#f9de4b",
        "farrell", "#c85935",
        "#ffffff" //default color if neither matches
      ],
      "circle-opacity": 0.9,
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

map.addControl(new mapboxgl.NavigationControl());
