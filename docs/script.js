mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/ckupqbcwzedlb18qxbjyv9o8g',
    zoom: 14,
    center: [-122.421, 37.7585],
    pitch: 50 // pitch in degrees
});

map.addControl(new mapboxgl.NavigationControl());

function addLayersToMap(map, layerId, geojsonFile) {
    map.addLayer({
        'id': layerId,
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': geojsonFile
        },
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
        },
        'paint': {
            'circle-color': [
                'match',
                ['get', 'time'],
                '5pm-6pm',
                '#48C9B0',
                '6:30pm-7:30pm',
                '#e7a553',
                '8pm-9pm',
                '#292965',
                /* other */ '#FFFFFF'
            ],
            'circle-radius': {
                'base': 5,
                'stops': [
                    [12, 10],
                    [22, 100]
                ]
            },
            'circle-stroke-width': 0,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.9
        },
    });
}

    // Usage
    map.on('load', () => {
        addLayersToMap(map, 'late', 'litcrawlMap_late.geojson');
        addLayersToMap(map, 'mid', 'litcrawlMap_mid.geojson');
        addLayersToMap(map, 'early', 'litcrawlMap_early.geojson');

    });

    //iterate through data in 'early' layer


    // dropdown control
    var dropdown5_6pm = document.getElementById('id5_6pm');
    dropdown5_6pm.addEventListener('change', (event) => {
        map.moveLayer(map.getLayer('early').id);
        if (dropdown5_6pm.value == "all5_6pm") {
            map.setFilter('early', ['==', ['get', 'time'], '5pm-6pm']);
        }
        else {
            for (var i = 0; i < dropdown5_6pm.options.length; i++) {
                dropdownId = dropdown5_6pm.options[i].value;
                if (dropdown5_6pm.value == dropdownId) {
                    map.setFilter('early', ['==', ['get', 'id'], dropdownId]);
                }
            }
        }
    });

    var dropdown630_730pm = document.getElementById('id630_730pm');
    dropdown630_730pm.addEventListener('change', (event) => {
        map.moveLayer(map.getLayer('mid').id);
        if (dropdown630_730pm.value == "all630_730pm") {
            map.setFilter('mid', ['==', ['get', 'time'], '6:30pm-7:30pm']);
        }
        else {
            for (var i = 0; i < dropdown630_730pm.options.length; i++) {
                dropdownId = dropdown630_730pm.options[i].value;
                if (dropdown630_730pm.value == dropdownId) {
                    map.setFilter('mid', ['==', ['get', 'id'], dropdownId]);
                }
            }
        }
    });

    var dropdown8_9pm = document.getElementById('id8_9pm');
    dropdown8_9pm.addEventListener('change', (event) => {
        map.moveLayer(map.getLayer('late').id);
        if (dropdown8_9pm.value == "all8_9pm") {
            map.setFilter('late', ['==', ['get', 'time'], '8pm-9pm']);
        }
        else {
            for (var i = 0; i < dropdown8_9pm.options.length; i++) {
                dropdownId = dropdown8_9pm.options[i].value;
                if (dropdown8_9pm.value == dropdownId) {
                    map.setFilter('late', ['==', ['get', 'id'], dropdownId]);
                }
            }
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        anchor: 'bottom', 
        closeButton: true,
        closeOnClick: true
    });

    // mouse enter effects
    map.on('mouseenter', 'early', (e) => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseenter', 'mid', (e) => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseenter', 'late', (e) => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // early click
    map.on('click', 'early', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const time = e.features[0].properties.time;
        const description = e.features[0].properties.description;
        const address = e.features[0].properties.address;
        const link = e.features[0].properties.link;
        const register_link = e.features[0].properties.register_link;
        const labelMap = '<h4>'+time+'</h4>'
                  + '<h5>'+title+'</h5>'
                  + '<p><strong>What?</strong> '+description+'</p>'
                  + '<p><strong>Where?</strong> '+address+'</p>'
                  + '<p><strong>More details:</strong> <a target="_blank" href="'+link+'"> click here</a></p>'
                  + '<p><strong>Register:</strong> <a target="_blank" href="'+register_link+'"> click here</a></p>';
        while(Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates).setHTML(labelMap).addTo(map);
    });

    // mid click
    map.on('click', 'mid', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const time = e.features[0].properties.time;
        const description = e.features[0].properties.description;
        const address = e.features[0].properties.address;
        const link = e.features[0].properties.link;
        const register_link = e.features[0].properties.register_link;
        const labelMap = '<h4>'+time+'</h4>'
                  + '<h5>'+title+'</h5>'
                  + '<p><strong>What?</strong> '+description+'</p>'
                  + '<p><strong>Where?</strong> '+address+'</p>'
                  + '<p><strong>More details:</strong> <a target="_blank" href="'+link+'"> click here</a></p>'
                  + '<p><strong>Register:</strong> <a target="_blank" href="'+register_link+'"> click here</a></p>';
        while(Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates).setHTML(labelMap).addTo(map);
    });

    // late click
    map.on('click', 'late', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const time = e.features[0].properties.time;
        const description = e.features[0].properties.description;
        const address = e.features[0].properties.address;
        const link = e.features[0].properties.link;
        const register_link = e.features[0].properties.register_link;
        const labelMap = '<h4>'+time+'</h4>'
                  + '<h5>'+title+'</h5>'
                  + '<p><strong>What?</strong> '+description+'</p>'
                  + '<p><strong>Where?</strong> '+address+'</p>'
                  + '<p><strong>More details:</strong> <a target="_blank" href="'+link+'"> click here</a></p>'
                  + '<p><strong>Register:</strong> <a target="_blank" href="'+register_link+'"> click here</a></p>';
        while(Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates).setHTML(labelMap).addTo(map);
    });

    // mouse leave effects
    map.on('mouseleave', 'early', () => {
        map.getCanvas().style.cursor = '';
    });
    map.on('mouseleave', 'mid', () => {
        map.getCanvas().style.cursor = '';
    });
    map.on('mouseleave', 'late', () => {
        map.getCanvas().style.cursor = '';
    });


// script for datatable
$(document).ready(function () {
    $('#example').DataTable();
});