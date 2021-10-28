mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/ckunawnac3rtn17s7xksr52md',
  zoom: 13.5,
  center: [-122.418, 37.7555],
  pitch: 40,
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
      data: "distillationsMap.geojson",
    },
    layout: {
      'visibility': visibility
      },
    paint: {
      "circle-color": "purple",
      "circle-opacity": 0.65,
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
    var title = e.features[0].properties.title;
    var date = e.features[0].properties.date;
    var address = e.features[0].properties.address;
    var desc = e.features[0].properties.desc;
    var link = e.features[0].properties.link;
    var image = e.features[0].properties.image;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+title+'</h4>'
            + '<img class="center" style="max-width: 180px" src="images/'+image+'">'
            + '<p><strong>Review date</strong>: '+date+'</p>'
            + '<p><strong>Address</strong>: '+address+'</p>'
            //+ '<p>'+desc+'</p>'
            + '<p><strong>Read the review</strong>: <a target="_blank" href="'+link+'">Click here</a></p>')
        .addTo(map);
});
map.on('mouseenter', 'id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'id', function () {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());