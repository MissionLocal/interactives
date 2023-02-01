mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ";

// define outer bounds of map
const bounds = [
  [-122.8, 37.5], // southwest coordinate
  [-122, 38] // northeast coordinate
  ];

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/cldawa4al004m01nx5rn6a9gi',
  zoom: 11,
  center: [-122.44, 37.77],
  maxBounds: bounds
});

// function to define color scale for map layers
function fillColorFunction(fillColorBin) {
  fillColor =  ["step",
    ["get", fillColorBin],
    "#90e0ef",
    2, "#48cae4",
    4, "#00b4d8",
    6, "#0096c7",
    8, "#0077b6",
    13, "#023e8a"]
  return fillColor;
}

// function to define map layers information
function mapDetailsFunction(mapID, visibility) {
  mapDetails = {
    id: mapID,
    type: "fill",
    source: {
      type: "geojson",
      data: "healthdatatest_bin.geojson",
    },
    layout: {
      'visibility': visibility
      },
    paint: {
      "fill-outline-color": "#5E5E5E",
      "fill-color": fillColor,
      "fill-opacity": 0.8,
    },
  }
  return mapDetails;
}

// load my map layers
map.on("load", function () {
  fillColorFunction("population_bin");
  mapDetailsFunction("population_id", "visible");
    map.addLayer(mapDetails);

  fillColorFunction("mental_bin");
  mapDetailsFunction("mental_id", "none");
    map.addLayer(mapDetails);

  fillColorFunction("obesity_bin");
  mapDetailsFunction("obesity_id", "none");
    map.addLayer(mapDetails);

  fillColorFunction("diabetes_bin");
  mapDetailsFunction("diabetes_id", "none");
  map.addLayer(mapDetails);

  fillColorFunction("insurance_bin");
  mapDetailsFunction("insurance_id", "none");
  map.addLayer(mapDetails);
});

// Create the popup - population
map.on('click', 'population_id', function (e) {
    var locationname = e.features[0].properties.locationname;
    var population = e.features[0].properties.totalpopulation;

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>Tract: '+locationname+'</h4>'
            + '<p>Population: '+population+'</p>')
        .addTo(map);
});
map.on('mouseenter', 'population_id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'population_id', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - mental
map.on('click', 'mental_id', function (e) {
  var locationname = e.features[0].properties.locationname;
  var mental = e.features[0].properties['poor mental health'];

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>Tract: '+locationname+'</h4>'
          + '<p>Poor Mental Health: '+mental.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'mental_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'mental_id', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - obesity
map.on('click', 'obesity_id', function (e) {
  var locationname = e.features[0].properties.locationname;
  var obesity = e.features[0].properties['obesity'];

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>Tract: '+locationname+'</h4>'
          + '<p>Obesity: '+obesity.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'obesity_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'obesity_id', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - diabetes
map.on('click', 'diabetes_id', function (e) {
  var locationname = e.features[0].properties.locationname;
  var diabetes = e.features[0].properties['diabetes'];

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>Tract: '+locationname+'</h4>'
          + '<p>Diabetes: '+diabetes.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'diabetes_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'diabetes_id', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - no insurance
map.on('click', 'insurance_id', function (e) {
  var locationname = e.features[0].properties.locationname;
  var insurance = e.features[0].properties['no insurance'];

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>Tract: '+locationname+'</h4>'
          + '<p>Poor Mental Health: '+insurance.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'insurance_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'insurance_id', function () {
  map.getCanvas().style.cursor = '';
});

// change map when clicking button
function changeMap(population, mental, obesity, diabetes, insurance) {
  map.setLayoutProperty('population_id', 'visibility', population);
  map.setLayoutProperty('mental_id', 'visibility', mental);
  map.setLayoutProperty('obesity_id', 'visibility', obesity);
  map.setLayoutProperty('diabetes_id', 'visibility', diabetes);
  map.setLayoutProperty('insurance_id', 'visibility', insurance);
}

function population() {changeMap('visible', 'none', 'none', 'none', 'none');}
function mental() {changeMap('none', 'visible', 'none', 'none', 'none');}
function obesity() {changeMap('none', 'none', 'visible', 'none', 'none');}
function diabetes() {changeMap('none', 'none', 'none', 'visible', 'none');}
function insurance() {changeMap('none', 'none', 'none', 'none', 'visible');}

// make buttons stay active colour
$(document).ready(function(){
  $('.getnowbutton').click(function(){
    $('.getnowbutton').removeClass('active');
    $(this).addClass('active');
  });
});