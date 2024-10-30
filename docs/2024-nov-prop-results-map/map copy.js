// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ";

// define basemap
if (window.innerWidth < 400) {
    var mapZoom = 10.4;
    var mapY = 37.771;
} else {
    var mapZoom = 11.2;
    var mapY = 37.77;
}


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/cm2tndow500co01pw3fho5d21',
    zoom: mapZoom,
    center: [-122.429, mapY],
});

map.on('load', () => {
    // Add GeoJSON data source
    map.addSource('precincts', {
        'type': 'geojson',
        'data': 'data/A.geojson' // Replace with your data file or object
    });

    // Add a layer to style precinct polygons based on yes_perc_bin
    map.addLayer({
        'id': 'precincts-layer',
        'type': 'fill',
        'source': 'precincts',
        'paint': {
            'fill-color': [
                'match',
                ['get', 'yes_perc_bin'],
                'Less than 25%', '#990000',
                '25-30%', '#E02214',
                '30-35%', '#E54C4C',
                '35-40%', '#EE7651',
                '40-45%', '#EF9F6A',
                '45-50%', '#FFCB78',
                '50-55%', '#9DF4D9',
                '55-60%', '#65EAD0',
                '60-65%', '#0DD6C7',
                '65-70%', '#0DC1D3',
                '70-75%', '#00A4BF',
                '75% and more', '#007DBC',
                /* default color if none of the above match */
                '#CECECE'
            ],
            'fill-opacity': 0.6
        }
    });

    document.getElementById('propositionDropdown').addEventListener('change', (event) => {
        const selectedProp = event.target.value.charAt(0); // Get the first letter of the selected value
        const dataUrl = `data/${selectedProp}.geojson`; // Update with the correct path to your GeoJSON files

        // Update the precincts source data to the new file based on the selected proposition
        map.getSource('precincts').setData(dataUrl);
    });
    // Add a base outline for the precincts
    map.addLayer({
        'id': 'precincts-outline',
        'type': 'line',
        'source': 'precincts',
        'paint': {
            'line-color': '#ffffff',
            'line-width': 0.5
        }
    });

    // Add hover outline layer for highlighted polygons
    map.addLayer({
        'id': 'precincts-hover-outline',
        'type': 'line',
        'source': 'precincts',
        'paint': {
            'line-color': '#ffffff', // Highlight color
            'line-width': 2.5, // Increased line width for hover
        },
        'filter': ['==', ['get', 'precinct'], ''] // Initially hidden
    });

    // Add hover event listeners
    map.on('mousemove', 'precincts-layer', (e) => {
        if (e.features.length > 0) {
            map.getCanvas().style.cursor = 'pointer';

            // Obtain the feature's precinct property
            const featurePrecinct = e.features[0].properties.precinct;

            // Update the filter in the hover-outline layer to highlight the precinct
            map.setFilter('precincts-hover-outline', ['==', ['get', 'precinct'], featurePrecinct]);
        }
    });

    map.on('mouseleave', 'precincts-layer', () => {
        map.getCanvas().style.cursor = '';
        // Reset the hover filter to hide the outline
        map.setFilter('precincts-hover-outline', ['==', ['get', 'precinct'], '']);
    });
});


// Create the popup
map.on('click', 'precincts-layer', function (e) {
    // Check if features are present
    if (e.features.length > 0) {
        const properties = e.features[0].properties;

        const content = `
        <h3 class="popup-header">Precinct ${properties.precinct || 'N/A'}</h3>
        <p class="popup-text">${properties.registered_voters} voters</p>
        <hr>
        <div style="display: grid; grid-template-columns: auto auto; row-gap: 4px; column-gap: 10px;">            
            <p class="popup-text"><strong>YES</strong></p> 
            <p class="popup-text">${(properties.yes_perc !== undefined && properties.yes_perc !== null) ? Number(properties.yes_perc).toFixed(2) : 'N/A'}% (${properties.yes || 'N/A'})</p>            
            <p class="popup-text"><strong>NO</strong></p> 
            <p class="popup-text">${(properties.yes_perc !== undefined && properties.yes_perc !== null) ? (100 - Number(properties.yes_perc)).toFixed(2) : 'N/A'}% (${properties.no || 'N/A'})</p>            
            <p class="popup-text"><strong>Turnout:</strong></p> 
            <p class="popup-text">${properties.turnout || 'N/A'}%</p>
        </div>
    `;


        // Create and add the popup
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(content)
            .addTo(map);
    } else {
        console.warn("No features found at clicked location.");
    }
});

