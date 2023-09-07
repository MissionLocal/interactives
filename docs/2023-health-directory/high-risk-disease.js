////
//// DEFINE MAPBOX THINGS
////

// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ";

// define basemap
var map = new mapboxgl.Map({
container: 'map',
// style: Basic-with-roads-no-districts
// style: 'mapbox://styles/mlnow/cldawa4al004m01nx5rn6a9gi',
style: 'mapbox://styles/mlnow/ckuszv4rhph8u19qjhaveg3g0',
zoom: 11.7, 
center: [-122.438, 37.77],
});

map.on("load", function () {
    map.addLayer({
        id: "health_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "outcome.geojson",
        },
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.3,
        },
    },"waterway-label");

    map.addLayer({
        id: "health_fill",
        type: "fill",
        source: {
            type: "geojson",
            data: "outcome.geojson",
            promoteId: 'nhood'
        },
        paint: {
            "fill-color": [
                "step",
                ["get", "high_count"],
                "#fcf5f7",
                1, "#fce6eb",
                2, "#ffccd5",
                3, "#ff8fa3",
                4, "#ff758f",
                5, "#ff4d6d",
                6, "#c9184a",
                7, "#a4133c",
                8, "#800f2f",
                9, "#590d22",
                10, "#350917",
                11, "#19050c"],
                "fill-outline-color": "#ffffff",
                "fill-opacity": 0.9
            },
        }, "health_outline");
    
    map.addLayer({
        id: "nbhood_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "AnalysisNeighborhoods.geojson",
            promoteId: 'nhood'
        },
        paint:{
            "line-color": "#627BC1",
            "line-width": ['case',['boolean',['feature-state','hover'],false],2,0]
        },
    }, "health_outline");
});

// Create the popup
map.on('click', 'health_fill', function (e) {
    var nhood = e.features[0].properties.nhood;
    var risk = determine(e.features[0].properties.high_count);
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
      return ("<p class='summary'><span class='risk'>" + d + " disease</span> is more prevalant in this area than other parts of the city.</p>")
  }
  if (d == 0 ) {
      return "<p class='summary'>No disease is more prevalant in this area than other parts of the city.</p>"
  }
  else {
      return ("<p class='summary'><span class='risk'>" + d + " diseases</span> are more prevalant in this area than other parts of the city.</p>" )
  }
}

// Change the cursor to a pointer 
map.on('mouseenter', 'health_fill', function () {
  map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'health_fill', function () {
  map.getCanvas().style.cursor = '';
});
