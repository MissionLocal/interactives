mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/clo3ra7ut003y01r2eok49ae7',
    zoom: 11.5,
    center: [-122.436, 37.76]
});

map.on('load', function () {
    map.addSource('lines', {
        type: 'geojson',
        data: 'data.geojson'
    });

    // Add a layer to display the lines
    map.addLayer({
        id: 'streets',
        type: 'line',
        source: 'lines',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#efbe25', // Line color
            'line-width': 3 // Line width
        }
    });
});



// Add a popup to display information on hover for point features
map.on('click', 'streets', function (e) {
    const feature = e.features[0];

    // Extract the properties you want to display in the popup
    const event = feature.properties["Event"];
    const dtime = feature.properties["When"];
    const location = feature.properties["Where"];

    // Get the coordinates of the point feature
    const coordinates = feature.geometry.coordinates.slice();

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<p><strong>Event</strong>: ' + event +
            '<p><strong>When</strong>: ' + dtime +
            '<p><strong>Where</strong>: ' + location
        )
        .addTo(map);
});

map.on('mouseenter', 'streets', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'streets', function () {
    map.getCanvas().style.cursor = '';
});

