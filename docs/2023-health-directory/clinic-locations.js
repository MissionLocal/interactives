mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mlnow/ckuszv4rhph8u19qjhaveg3g0',
zoom: 12,
pitch: 0, // pitch in degrees
bearing: 0, // bearing in degrees
center: [-122.43, 37.77],
});

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
    'circle-color': '#ec31d9',
    "circle-opacity": 0.8,
    "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "annual_patient_visits"],
        10000, 8,
        20000, 16, 
        30000, 32,
    ]
    // 'circle-radius': {
    //     'base': 8,
    //     'stops': [
    //         [12, 8],
    //         [16, 50]
    //     ]
    // },
    },
}
return mapDetails;
}

// load my map layers
map.on("load", function () {
var mapDetails = mapDetailsFunction("Clinics", "visible", "new_clinics.geojson");
    map.addLayer(mapDetails);
});


// Create the popup - clinics
map.on('click', 'Clinics', function (e) {
    var annual_patient_visits = e.features[0].properties.annual_patient_visits;
    var location = e.features[0].properties.location;
    var neighborhood = e.features[0].properties.neighborhood;
    var full_time_employees = e.features[0].properties.full_time_employees;
    var approximate_budget = e.features[0].properties.approximate_budget;
    var Clinic = e.features[0].properties.Clinic;
    var programs_funded = e.features[0].properties.programs_funded;

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+Clinic+'</h4>'
            + '<p><strong>Location</strong>: '+location+'</p>'
            + '<p><strong>Neighborhood</strong>: '+neighborhood+'</p>'
            + '<p><strong>Budget</strong>: '+approximate_budget+'</p>'
            + '<p><strong>Full time employees</strong>: '+full_time_employees+'</p>'
            + '<p><strong>Annual patient visits</strong>: '+annual_patient_visits+'</p>'
            + '<p><strong>Programs funded</strong>: '+programs_funded ?? 'None'+'</p>'
        )
        .addTo(map);
});
map.on('mouseenter', 'Clinics', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'Clinics', function () {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());

this.map.once('load', () => {
    this.map.resize();
});