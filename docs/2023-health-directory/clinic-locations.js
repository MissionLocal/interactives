mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mlnow/clmgwl44x01ba01r9cmafghkk',
zoom: 11.5, 
center: [-122.438, 37.77],
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
        'circle-color': [
            'match',
            ['get', 'public'],
            'yes',
            '#eb34db',
            'no',
            '#0096FF',
            /* other */ '#eb6534'
        ],
    "circle-opacity": 0.8,
    "circle-radius": ["case", ["has", "annual_patient_visits"],
    ["interpolate",["linear"],
        ["get", "annual_patient_visits"],
        10000, 8,
        20000, 16,
        30000, 32
    ],
    14 // Default value for points without "annual_patient_visits"
]
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

    var popup_labels = ['<p><strong>Location</strong>: ','<p><strong>Neighborhood</strong>: ',
    '<p><strong>Budget</strong>: ','<p><strong>Full time employees</strong>: ','<p><strong>Annual patient visits</strong>: '];

    var popup_values = [location, neighborhood, approximate_budget, full_time_employees, annual_patient_visits];

    var popup_content = '';
    for(var i = 0; i < popup_values.length; i ++ ) {
        if(popup_values[i]) {
            popup_content += popup_labels[i] + popup_values[i]
        }
    }
    popup_content += '<p><strong>Additional programs funded</strong>: '+programs_funded ?? 'None'+'</p>'

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+Clinic+'</h4>'
              + popup_content
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
