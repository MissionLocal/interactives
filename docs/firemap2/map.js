mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/ckunawnac3rtn17s7xksr52md',
  zoom: 11,
  center: [-122.43, 37.76],
});

// function to define color scale for map layers
function fillColorFunction(fillColorBin) {
  fillColor =  ["match",["get", fillColorBin],
    "trash","#FFC550",
    "structure","#EC7063",
    "encampment","#A569BD",
    "vehicle","#58D68D",
    "other","#7F8C8D",
    "#ffffff"]
  return fillColor;
}

// function to define map layers information
function mapDetailsFunction(mapID, visibility, source) {
  mapDetails = {
    id: mapID,
    type: "circle",
    source: {
      type: "geojson",
      data: source,
    },
    layout: {
      'visibility': visibility
      },
    paint: {
      "circle-color": fillColor,
      "circle-opacity": 0.8,
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
  fillColorFunction("type");
  mapDetailsFunction("other", "visible", "fires2021_other.geojson");
    map.addLayer(mapDetails);
  mapDetailsFunction("vehicle", "visible", "fires2021_vehicle.geojson");
    map.addLayer(mapDetails);
  mapDetailsFunction("structure", "visible", "fires2021_structure.geojson");
    map.addLayer(mapDetails);
  mapDetailsFunction("encampment", "visible", "fires2021_encampment.geojson");
    map.addLayer(mapDetails);
  mapDetailsFunction("trash", "visible", "fires2021_trash.geojson");
    map.addLayer(mapDetails);
});

		// radio button control
		document.getElementById('legend').addEventListener('change', (event) => {
			const type = event.target.value;
			// update the map filter
			if (type === 'all') {
				map.setLayoutProperty('trash','visibility','visible');
				map.setLayoutProperty('structure','visibility','visible');
        map.setLayoutProperty('encampment','visibility','visible');
				map.setLayoutProperty('vehicle','visibility','visible');
				map.setLayoutProperty('other','visibility','visible');
			} else if (type === 'trash') {
				map.setLayoutProperty('trash','visibility','visible');
				map.setLayoutProperty('structure','visibility','none');
        map.setLayoutProperty('encampment','visibility','none');
				map.setLayoutProperty('vehicle','visibility','none');
				map.setLayoutProperty('other','visibility','none');
      } else if (type === 'structure') {
				map.setLayoutProperty('trash','visibility','none');
				map.setLayoutProperty('structure','visibility','visible');
        map.setLayoutProperty('encampment','visibility','none');
				map.setLayoutProperty('vehicle','visibility','none');
				map.setLayoutProperty('other','visibility','none');
      } else if (type === 'encampment') {
				map.setLayoutProperty('trash','visibility','none');
				map.setLayoutProperty('structure','visibility','none');
        map.setLayoutProperty('encampment','visibility','visible');
				map.setLayoutProperty('vehicle','visibility','none');
				map.setLayoutProperty('other','visibility','none');
			} else if (type === 'vehicle') {
				map.setLayoutProperty('trash','visibility','none');
				map.setLayoutProperty('structure','visibility','none');
        map.setLayoutProperty('encampment','visibility','none');
				map.setLayoutProperty('vehicle','visibility','visible');
				map.setLayoutProperty('other','visibility','none');
			} else if (type === 'other') {
				map.setLayoutProperty('trash','visibility','none');
				map.setLayoutProperty('structure','visibility','none');
        map.setLayoutProperty('encampment','visibility','none');
				map.setLayoutProperty('vehicle','visibility','none');
				map.setLayoutProperty('other','visibility','visible');
			}
		});

// Create the popup - other
map.on('click', 'other', function (e) {
    var date = e.features[0].properties.date_string;
    var situation = e.features[0].properties.situation;
    var address = e.features[0].properties.address;
    var property_use = e.features[0].properties.property_use;
    var response = e.features[0].properties.time_to_respond_string;
    /*var id = e.features[0].properties.id;*/
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+date+'</h4>'
            + '<p><strong>Situation</strong>: '+situation+'</p>'
            + '<p><strong>Address</strong>: '+address+'</p>'
            + '<p><strong>Property use</strong>: ' +property_use+'</p>'
            + '<p><strong>Response time</strong>: ' +response+'</p>'
            /*+ '<p><strong>Incident ID</strong>: '+id+'</p>'*/
            )
        .addTo(map);
});
map.on('mouseenter', 'other', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'other', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - vehicle
map.on('click', 'vehicle', function (e) {
  var date = e.features[0].properties.date_string;
  var situation = e.features[0].properties.situation;
  var address = e.features[0].properties.address;
  var property_use = e.features[0].properties.property_use;
  var response = e.features[0].properties.time_to_respond_string;
  /*var id = e.features[0].properties.id;*/
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+date+'</h4>'
          + '<p><strong>Situation</strong>: '+situation+'</p>'
          + '<p><strong>Address</strong>: '+address+'</p>'
          + '<p><strong>Property use</strong>: ' +property_use+'</p>'
          + '<p><strong>Response time</strong>: ' +response+'</p>'
          /*+ '<p><strong>Incident ID</strong>: '+id+'</p>'*/
          )
      .addTo(map);
});
map.on('mouseenter', 'vehicle', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'vehicle', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - structure
map.on('click', 'structure', function (e) {
  var date = e.features[0].properties.date_string;
  var situation = e.features[0].properties.situation;
  var address = e.features[0].properties.address;
  var property_use = e.features[0].properties.property_use;
  var response = e.features[0].properties.time_to_respond_string;
  /*var id = e.features[0].properties.id;*/
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+date+'</h4>'
          + '<p><strong>Situation</strong>: '+situation+'</p>'
          + '<p><strong>Address</strong>: '+address+'</p>'
          + '<p><strong>Property use</strong>: ' +property_use+'</p>'
          + '<p><strong>Response time</strong>: ' +response+'</p>'
          /*+ '<p><strong>Incident ID</strong>: '+id+'</p>'*/
          )
      .addTo(map);
});
map.on('mouseenter', 'structure', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'structure', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - encampment
map.on('click', 'encampment', function (e) {
  var date = e.features[0].properties.date_string;
  var situation = e.features[0].properties.situation;
  var address = e.features[0].properties.address;
  var property_use = e.features[0].properties.property_use;
  var response = e.features[0].properties.time_to_respond_string;
  /*var id = e.features[0].properties.id;*/
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+date+'</h4>'
          + '<p><strong>Situation</strong>: '+situation+'</p>'
          + '<p><strong>Address</strong>: '+address+'</p>'
          + '<p><strong>Property use</strong>: ' +property_use+'</p>'
          + '<p><strong>Response time</strong>: ' +response+'</p>'
          /*+ '<p><strong>Incident ID</strong>: '+id+'</p>'*/
          )
      .addTo(map);
});
map.on('mouseenter', 'encampment', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'encampment', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - trash
map.on('click', 'trash', function (e) {
  var date = e.features[0].properties.date_string;
  var situation = e.features[0].properties.situation;
  var address = e.features[0].properties.address;
  var property_use = e.features[0].properties.property_use;
  var response = e.features[0].properties.time_to_respond_string;
  /*var id = e.features[0].properties.id;*/
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+date+'</h4>'
          + '<p><strong>Situation</strong>: '+situation+'</p>'
          + '<p><strong>Address</strong>: '+address+'</p>'
          + '<p><strong>Property use</strong>: ' +property_use+'</p>'
          + '<p><strong>Response time</strong>: ' +response+'</p>'
          /*+ '<p><strong>Incident ID</strong>: '+id+'</p>'*/
          )
      .addTo(map);
});
map.on('mouseenter', 'trash', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'trash', function () {
  map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());

this.map.once('load', () => {
  this.map.resize();
});