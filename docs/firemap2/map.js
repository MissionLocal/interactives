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
    "trash","#F39C12",
    "encampment","#A569BD",
    "vehicle","#58D68D",
    "other","#7F8C8D",
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
      "circle-opacity": 1,
      'circle-radius': {
        'base': 2,
        'stops': [
        [16, 5],
        [22, 180]
        ]
        },
    },
  }
  return mapDetails;
}

// load my map layers
map.on("load", function () {
  fillColorFunction("type");
  mapDetailsFunction("fires_id", "visible");
    map.addLayer(mapDetails);
});

// define legend
// define layer names
const layers = [
  'Trash',
  'Encampment',
  'Vehicle',
  'Other'
  ];
  const colors = [
  '#F39C12',
  '#A569BD',
  '#58D68D',
  '#7F8C8D'
  ];
   
  // create legend
  const legend = document.getElementById('legend');

  layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;
   
  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
  });

// Create the popup - population
map.on('click', 'fires_id', function (e) {
    var date = e.features[0].properties.date_string;
    var situation = e.features[0].properties.situation;
    var id = e.features[0].properties.id;
    var response = e.features[0].properties.time_to_respond_string;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+date+'</h4>'
            + '<p><strong>Situation</strong>: '+situation+'</p>'
            + '<p><strong>Response time</strong>: ' +response+'</p>'
            + '<p><strong>Incident ID</strong>: '+id+'</p>')
        .addTo(map);
});
map.on('mouseenter', 'fires_id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'fires_id', function () {
    map.getCanvas().style.cursor = '';
});