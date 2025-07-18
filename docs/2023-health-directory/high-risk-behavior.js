////
//// DEFINE MAPBOX THINGS
////

// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";

// define basemap
var map = new mapboxgl.Map({
container: 'map',
// style: Basic-with-roads-no-districts
// style: 'mapbox://styles/mlnow/cldawa4al004m01nx5rn6a9gi',
style: 'mapbox://styles/mlnow/clmgwl44x01ba01r9cmafghkk',
zoom: 11.5, 
center: [-122.438, 37.77],
});

map.on("load", function () {
    map.addLayer({
        id: "health_fill",
        type: "fill",
        source: {
            type: "geojson",
            data: "risky.geojson",
        },
        paint: {
            "fill-color": [
                "step",
                ["get", "high_count"],
                "#dfe5e5",
                1, "#fcc3d2",
                2, "#cc627e",
                3, "#9b0029"],
                "fill-outline-color": "#ffffff",
                "fill-opacity": 0.9
            },
        });
});

// Create the popup
map.on('click', 'health_fill', function (e) {
    var nhood = e.features[0].properties.nhood;
    var risk = determine(e.features[0].properties['high_count']);
    var name = e.features[0].properties.locationname.substring(5, 10);
    var text = haveDisease(e.features[0].properties['display']);
    new mapboxgl.Popup()
    .setLngLat(e.lngLat).setHTML(
        '<h4>'+ nhood + ' - ' + name +'</h4>'
        + risk
        + text)
        .addTo(map);
});

function haveDisease(d) {
  if (d == "null") {
      return ""
  }
  else {
      return d 
  }
}

function determine(d) {
  if (d == 1 ) {
      return ("<p class='summary'><span class='risk'>" + d + " high-risk behavior</span> is more prevalent in this area than the city.</p>")
  }
  if (d == 0 ) {
      return "<p class='summary'>No high-risk behavior is more prevalent in this area than the city.</p>"
  }
  else {
      return ("<p class='summary'><span class='risk'>" + d + " high-risk behaviors</span> are more prevalent in this area than the city.</p>" )
  }
}
// Change the cursor to a pointer when the mouse is over the us_county layer.
map.on('mouseenter', 'health_fill', function () {
  map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'health_fill', function () {
  map.getCanvas().style.cursor = '';
});
