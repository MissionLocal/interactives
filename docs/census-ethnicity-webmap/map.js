mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";

// define outer bounds of map
const bounds = [
  [-122.8, 37.5], // southwest coordinate
  [-122, 38] // northeast coordinate
  ];

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/cktwav9fx00eg18piyvomhrrs',
  zoom: 11,
  center: [-122.44, 37.77],
  maxBounds: bounds
});

// function to define color scale for map layers
function fillColorFunction(fillColorBin) {
  fillColor =  ["match",["get", fillColorBin],
    "-100 to -90","#78281F",
    "-90 to -80","#943126",
    "-80 to -70","#B03A2E",
    "-70 to -60","#CB4335",
    "-60 to -50","#E74C3C",
    "-50 to -40","#EC7063",
    "-40 to -30","#F1948A",
    "-30 to -20","#F5B7B1",
    "-20 to -10","#FADBD8",
    "-10 to 0","#FDEDEC",
    "0 to 10","#EBF5FB",
    "10 to 20","#D6EAF8",
    "20 to 30","#AED6F1",
    "30 to 40","#85C1E9",
    "40 to 50","#5DADE2",
    "50 to 60","#3498DB",
    "60 to 70","#2E86C1",  
    "70 to 80","#2874A6",
    "80 to 90","#21618C",  
    "90 to 100","#1B4F72",  
    "100+","#154360",
    "#ffffff"]
  return fillColor;
}

// function to define map layers information
function mapDetailsFunction(mapID, visibility) {
  mapDetails = {
    id: mapID,
    type: "fill",
    source: {
      type: "geojson",
      data: "neighborhoodDemographicChangesMapbox.geojson",
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
  fillColorFunction("population_change_bin");
  mapDetailsFunction("population_change_id", "visible");
    map.addLayer(mapDetails);

  fillColorFunction("hispanic_change_bin");
  mapDetailsFunction("hispanic_change_id", "none");
    map.addLayer(mapDetails);

  fillColorFunction("afr_american_change_bin");
  mapDetailsFunction("black_change_id", "none");
    map.addLayer(mapDetails);

  fillColorFunction("white_change_bin");
  mapDetailsFunction("white_change_id", "none");
  map.addLayer(mapDetails);

  fillColorFunction("asian_change_bin");
  mapDetailsFunction("asian_change_id", "none");
  map.addLayer(mapDetails);
});

// Create the popup - population
map.on('click', 'population_change_id', function (e) {
    var nhood = e.features[0].properties.nhood;
    var population_change = e.features[0].properties.population_change;
    var population_2010 = e.features[0].properties.population_2010;
    var population_2020 = e.features[0].properties.population_2020;
    nhood = nhood.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+nhood+'</h4>'
            + '<p>2010 population: '+population_2010+'</p>'
            + '<p>2020 population: '+population_2020+'</p>'
            + '<p>Change: '+population_change.toFixed(1)+'%</p>')
        .addTo(map);
});
map.on('mouseenter', 'population_change_id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'population_change_id', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - hispanic
map.on('click', 'hispanic_change_id', function (e) {
  var nhood = e.features[0].properties.nhood;
  var hispanic_change = e.features[0].properties.hispanic_change;
  var hispanic_2010 = e.features[0].properties.eth_hispanic_2010;
  var hispanic_2020 = e.features[0].properties.eth_hispanic_2020;
  nhood = nhood.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+nhood+'</h4>'
          + '<p>2010 Hispanic population: '+hispanic_2010+'</p>'
          + '<p>2020 Hispanic population: '+hispanic_2020+'</p>'
          + '<p>Change: '+hispanic_change.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'hispanic_change_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'hispanic_change_id', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - black
map.on('click', 'black_change_id', function (e) {
  var nhood = e.features[0].properties.nhood;
  var black_change = e.features[0].properties.afr_american_change;
  var black_2010 = e.features[0].properties.eth_afr_american_2010;
  var black_2020 = e.features[0].properties.eth_afr_american_2020;
  nhood = nhood.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+nhood+'</h4>'
          + '<p>2010 Black population: '+black_2010+'</p>'
          + '<p>2020 Black population: '+black_2020+'</p>'
          + '<p>Change: '+black_change.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'black_change_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'black_change_id', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - white
map.on('click', 'white_change_id', function (e) {
  var nhood = e.features[0].properties.nhood;
  var white_change = e.features[0].properties.white_change;
  var white_2010 = e.features[0].properties.eth_white_2010;
  var white_2020 = e.features[0].properties.eth_white_2020;
  nhood = nhood.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+nhood+'</h4>'
          + '<p>2010 White population: '+white_2010+'</p>'
          + '<p>2020 White population: '+white_2020+'</p>'
          + '<p>Change: '+white_change.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'white_change_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'white_change_id', function () {
  map.getCanvas().style.cursor = '';
});

// Create the popup - asian
map.on('click', 'asian_change_id', function (e) {
  var nhood = e.features[0].properties.nhood;
  var asian_change = e.features[0].properties.asian_change;
  var asian_2010 = e.features[0].properties.eth_asian_2010;
  var asian_2020 = e.features[0].properties.eth_asian_2020;
  nhood = nhood.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+nhood+'</h4>'
          + '<p>2010 Asian population: '+asian_2010+'</p>'
          + '<p>2020 Asian population: '+asian_2020+'</p>'
          + '<p>Change: '+asian_change.toFixed(1)+'%</p>')
      .addTo(map);
});
map.on('mouseenter', 'asian_change_id', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'asian_change_id', function () {
  map.getCanvas().style.cursor = '';
});

// change map when clicking button
function changeMap(population, hispanic, black, white, asian) {
  map.setLayoutProperty('population_change_id', 'visibility', population);
  map.setLayoutProperty('hispanic_change_id', 'visibility', hispanic);
  map.setLayoutProperty('black_change_id', 'visibility', black);
  map.setLayoutProperty('white_change_id', 'visibility', white);
  map.setLayoutProperty('asian_change_id', 'visibility', asian);
}

function population() {changeMap('visible', 'none', 'none', 'none', 'none');}
function hispanic() {changeMap('none', 'visible', 'none', 'none', 'none');}
function black() {changeMap('none', 'none', 'visible', 'none', 'none');}
function white() {changeMap('none', 'none', 'none', 'visible', 'none');}
function asian() {changeMap('none', 'none', 'none', 'none', 'visible');}

// make buttons stay active colour
$(document).ready(function(){
  $('.getnowbutton').click(function(){
    $('.getnowbutton').removeClass('active');
    $(this).addClass('active');
  });
});
