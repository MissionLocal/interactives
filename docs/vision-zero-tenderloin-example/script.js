mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/clnc3ppi900b201r74g6u2cjt',
    zoom: 15,
    center: [-122.41508619884628, 37.78362834698695],
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
            'circle-color': [
                'match',
                ['get', 'role'],
                'Pedestrian/Bicyclist', '#ee6d5d',
                'Car person', '#efbe25',
                '#ed43e5'
            ],
            'circle-stroke-width': 0,
            'circle-opacity': 0.8,
            'circle-radius': {
                'base': 5,
                'stops': [
                    [12, 7],
                    [22, 30]
                ]
            },
        },
        'layout': {
            'visibility': visibility
        }
    }
    return mapDetails;
}


// load my map layers
map.on("load", function () {
    map.addLayer(addMapLayer("2018", "TL2018.geojson", "visible"));
    map.addLayer(addMapLayer("2019", "TL2019.geojson", "none"));
    map.addLayer(addMapLayer("2020", "TL2020.geojson", "none"));
    map.addLayer(addMapLayer("2021", "TL2021.geojson", "none"));
    map.addLayer(addMapLayer("2022", "TL2022.geojson", "none"));
    map.addLayer(addMapLayer("2023", "TL2023.geojson", "none"));
});

// set times for slider
sliderLabel = document.getElementById('timeSliderLabel');
slider = document.getElementById('timeSlider');

var sliderValues = ['2018', '2019', '2020', '2021', '2022', '2023'];
var timeValue = sliderValues[0];
slider.value = 0;

// update the time value when the slider is moved
slider.addEventListener('input', function (event) {
    timeValue = sliderValues[event.target.value];
    sliderLabel.innerHTML = "Year: " + timeValue;

    // Show data for the selected year
    map.setLayoutProperty('2018', 'visibility', timeValue === '2018' ? 'visible' : 'none');
    map.setLayoutProperty('2019', 'visibility', timeValue === '2019' ? 'visible' : 'none');
    map.setLayoutProperty('2020', 'visibility', timeValue === '2020' ? 'visible' : 'none');
    map.setLayoutProperty('2021', 'visibility', timeValue === '2021' ? 'visible' : 'none');
    map.setLayoutProperty('2022', 'visibility', timeValue === '2022' ? 'visible' : 'none');
    map.setLayoutProperty('2023', 'visibility', timeValue === '2023' ? 'visible' : 'none');
});


// Create the popup for each year
for (let year of sliderValues) {
    map.on('click', year, function (e) {
        var date = e.features[0].properties.collision_date_full;
        var injury = e.features[0].properties.number_injured;
        var fatality = e.features[0].properties.number_killed;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<h4>'+date+'</h4>'
                + '<p><strong>Injury:</strong> '+injury
                + '<p><strong>Fatality:</strong> '+fatality
            )
            .addTo(map);
    });

    map.on('mouseenter', year, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', year, function () {
        map.getCanvas().style.cursor = '';
    });
}

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());