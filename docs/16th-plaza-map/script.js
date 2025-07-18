mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/clnc3ppi900b201r74g6u2cjt',
    zoom: 19,
    center: [-122.42000016365328, 37.764819725285584],
});

// Add point layers
function addMapLayer(id, data, visibility) {
    var mapDetails = {
        'id': id,
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': data
        },
        'paint': {
            'circle-color': // color based on 'type' property
                ['match', ['get', 'type'],
                    'vendor', '#46c134',
                    'police', '#57a4ea',
                    'dpw', '#ff8400',
                    '#000000',
                ],
            'circle-stroke-width': 0,
            'circle-opacity': 0.8,
            'circle-radius': {
                'base': 5,
                'stops': [
                    [12, 8],
                    [22, 30]
                ]
            },
        },
        'layout': {
            'visibility': visibility // Initially, set this layer to be visible
        }
    }
    return mapDetails;
}

// load my map layers
map.on("load", function () {
    map.addLayer(addMapLayer("nov27", "nov27.geojson", "visible"));
    map.addLayer(addMapLayer("nov28", "nov28.geojson", "none"));
    map.addLayer(addMapLayer("nov29", "nov29.geojson", "none"));
    map.addLayer(addMapLayer("nov30", "nov30.geojson", "none"));
    map.addLayer(addMapLayer("dec1", "dec1.geojson", "none"))
    map.addLayer(addMapLayer("dec2", "dec2.geojson", "none"))
    map.addLayer(addMapLayer("dec3", "dec3.geojson", "none"))
    map.addLayer(addMapLayer("dec4", "dec4.geojson", "none"));
});

// switch between layers using dropdown menu
var dropdown = document.getElementById('date');
dropdown.addEventListener('change', function (event) {
    var value = event.target.value;
    map.setLayoutProperty('nov27', 'visibility', 'none');
    map.setLayoutProperty('nov28', 'visibility', 'none');
    map.setLayoutProperty('nov29', 'visibility', 'none');
    map.setLayoutProperty('nov30', 'visibility', 'none');
    map.setLayoutProperty('dec1', 'visibility', 'none');
    map.setLayoutProperty('dec2', 'visibility', 'none');
    map.setLayoutProperty('dec3', 'visibility', 'none');
    map.setLayoutProperty('dec4', 'visibility', 'none');
    map.setLayoutProperty(value, 'visibility', 'visible');
});

// set times for slider
sliderLabel = document.getElementById('timeSliderLabel');
slider = document.getElementById('timeSlider');

var sliderValues = ['All day', '8-10am', '10am-noon', 'noon-2pm', '2-4pm', '4-6pm', '6-8pm'];
var timeValue = sliderValues[0];
slider.value = 0;

// update the time value when the slider is moved
slider.addEventListener('input', function (event) {
    timeValue = sliderValues[event.target.value];
    sliderLabel.innerHTML = "Time (" + timeValue + "): ";

    if (timeValue == 'All day') {
        // show all results
        map.setFilter('nov27', null);
        map.setFilter('nov28', null);
        map.setFilter('nov29', null);
        map.setFilter('nov30', null);
        map.setFilter('dec1', null);
        map.setFilter('dec2', null);
        map.setFilter('dec3', null);
        map.setFilter('dec4', null);
    }
    else {
        // filter map data based on time
        var filter = ['match', ['get', 'time_bucket'], timeValue, true, false];
        map.setFilter('nov27', filter);
        map.setFilter('nov28', filter);
        map.setFilter('nov29', filter);
        map.setFilter('nov30', filter);
        map.setFilter('dec1', filter);
        map.setFilter('dec2', filter);
        map.setFilter('dec3', filter);
        map.setFilter('dec4', filter);
    }


});

// Create the popup - nov27
map.on('click', 'nov27', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'nov27', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'nov27', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - nov28
map.on('click', 'nov28', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'nov28', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'nov28', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - nov29
map.on('click', 'nov29', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'nov29', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'nov29', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - nov30
map.on('click', 'nov30', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'nov30', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'nov30', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - dec1
map.on('click', 'dec1', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'dec1', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'dec1', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - dec2
map.on('click', 'dec2', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'dec2', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'dec2', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - dec3
map.on('click', 'dec3', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'dec3', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'dec3', function () {
    map.getCanvas().style.cursor = '';
});

// Create the popup - dec4
map.on('click', 'dec4', function (e) {
    var datetime = e.features[0].properties.datetime_string;
    var quote = e.features[0].properties.quote;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+datetime+'</h4>'
            + '<p><strong>Quote:</strong> '+quote
            )
        .addTo(map);
});
map.on('mouseenter', 'dec4', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'dec4', function () {
    map.getCanvas().style.cursor = '';
});

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());
