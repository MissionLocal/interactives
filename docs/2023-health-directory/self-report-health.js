// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ";

// define basemap
var map = new mapboxgl.Map({
    container: 'map',
    // style: Basic-with-roads-no-districts
    style: 'mapbox://styles/mlnow/cldawa4al004m01nx5rn6a9gi',
    zoom: 11.5, 
    center: [-122.438, 37.77],
});

////
//// FUNCTIONS
////

/// Define colors
function fillColorFunction(fillColorBin) {
    fillColor =  [
                    'interpolate', ['linear'],
                    ['number', ['get', fillColorBin]],
                    1, '#d3d3d3',
                    5, '#ba181b',
                    10, '#660708']
    return fillColor;
}

// function to define map fill information
function mapFillFunction(mapID, visibility, source) {
    mapFillDetails = {
        id: mapID,
        type: "fill",
        source: source,
        layout: {
        'visibility': visibility
        },
        paint: {
        "fill-color": fillColor,
        "fill-opacity": [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.85,
            0.75
            ],
        },
    }
    return mapFillDetails;
}

// function to define map outline information
function mapOutlineFunction(mapID, visibility, source) {
    mapOutlineDetails = {
        id: mapID,
        type: "line",
        source: source,
        layout: {
            "visibility": visibility
        },
        paint: {
            "line-color": "black",
            "line-width": ['case',['boolean',['feature-state','hover'],false],2,0]
        },
    }
    return mapOutlineDetails;
}

////
//// LOAD MAP
////

// load my map layers
map.on("load", function () {
    mapLayers = ['general', 'physical', 'mental']
    for (var i = 0; i < mapLayers.length; i++) {
        map.addSource(mapLayers[i], {
            'type': 'geojson',
            'data': mapLayers[i]+'.geojson',
            'promoteId': 'locationname'
        });
    }

    // trigger the map-building functions, create everything
    fillColorFunction("percentile");
    mapFillFunction("map_fill_001", "visible", "general");
        map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineFunction("map_outline_001", "visible", "general");
        map.addLayer(mapOutlineDetails,"water-point-label");
    
    fillColorFunction("percentile");
    mapFillFunction("map_fill_002", "none", "physical");
        map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineFunction("map_outline_002", "visible", "physical");
        map.addLayer(mapOutlineDetails,"water-point-label");

    fillColorFunction("percentile");
    mapFillFunction("map_fill_003", "none", "mental");
        map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineFunction("map_outline_003", "visible", "mental");
        map.addLayer(mapOutlineDetails,"water-point-label");

});

// radio button control
document.getElementById('button-container').addEventListener('change', (event) => {
    const type = event.target.value;
    // update the map filter
    if (type === 'general') {
        addPopups('map_fill_001', 'general');
        map.setLayoutProperty('map_fill_001','visibility','visible');
        map.setLayoutProperty('map_fill_002','visibility','none');
        map.setLayoutProperty('map_fill_003','visibility','none');
    } else if (type === 'physical') {
        addPopups('map_fill_002', 'physical');
        map.setLayoutProperty('map_fill_001','visibility','none');
        map.setLayoutProperty('map_fill_002','visibility','visible');
        map.setLayoutProperty('map_fill_003','visibility','none');
    } else if (type === 'mental') {
        addPopups('map_fill_003', 'mental');
        map.setLayoutProperty('map_fill_001','visibility','none');
        map.setLayoutProperty('map_fill_002','visibility','none');
        map.setLayoutProperty('map_fill_003','visibility','visible');
    }
});

// create popup, don't add yet
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: [0, -5]
});

///
/// POP-UPS
///

// define contents
function addPopups(mapFill, source) {
    definePopupContents(mapFill);
    map.on('mouseenter', mapFill, function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', mapFill, function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    // trigger hover effects when entering area
    let hoveredId = null;
    map.on('mousemove', mapFill, (e) => {
        if (e.features.length > 0) {
            if (hoveredId !== null) {
                map.setFeatureState(
                    { source: source, id: hoveredId },
                    { hover: false }
                );
            }
            hoveredId = e.features[0].properties.locationname;
            map.setFeatureState(
                { source: source, id: hoveredId },
                { hover: true }
            );
        }
    });
    
    // stop hover effects when leaving area
    map.on('mouseleave', mapFill, () => {
        if (hoveredId !== null) {
            map.setFeatureState(
                { source: source, id: hoveredId },
                { hover: false }
            );
        }
        hoveredId = null;
    });
}

function definePopupContents(mapFill) {
    if (mapFill == 'map_fill_001') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.locationname.substring(5, 10);
            var nhood = e.features[0].properties['nhood'];
            var population = e.features[0].properties['totalpopulation'].toLocaleString();
            var percent = e.features[0].properties['GHLTH']
            var label = e.features[0].properties['GHLTH_label'];
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>'+ nhood + ' - ' + name +'</h4>'
                + '<p>Population: <strong>' + population + '</strong></p>'
                +'<p class="summary">Fair or poor self-rated health status among adults: <strong>' + percent + '%</strong></p>'
                +'<p> The number is <span class="label">' + label + '</span> in the city.</p>'
                    )
                .addTo(map)
        });
    }
    if (mapFill == 'map_fill_002') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.locationname.substring(5, 10);
            var nhood = e.features[0].properties['nhood'];
            var population = e.features[0].properties['totalpopulation'].toLocaleString();
            var percent = e.features[0].properties['PHLTH']
            var label = e.features[0].properties['PHLTH_label'];
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>'+ nhood + ' - ' + name +'</h4>'
                + '<p>Population: <strong>' + population + '</strong></p>'
                +'<p class="summary">Physical health not good for two weeks among adults: <strong>' + percent + ' %</strong></p>'
                +'<p> The number is <span class="label">' + label + '</span> in the city.</p>'
                    )
                .addTo(map)
        });
    }
    if (mapFill == 'map_fill_003') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.locationname.substring(5, 10);
            var nhood = e.features[0].properties['nhood'];
            var population = e.features[0].properties['totalpopulation'].toLocaleString();
            var percent = e.features[0].properties['MHLTH']
            var label = e.features[0].properties['MHLTH_label'];
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>'+ nhood + ' - ' + name +'</h4>'
                + '<p>Population:<strong> ' + population + '</strong></p>'
                +'<p class="summary">Mental health not good for two weeks among adults: <strong>' + percent + ' %</strong></p>'
                +'<p> The number is <span class="label">' + label + '</span> in the city.</p>'
                    )
                .addTo(map)
        });
    }
}

//map.addControl(new mapboxgl.NavigationControl());
addPopups('map_fill_001', 'general');
this.map.once('load', () => {
    this.map.resize();
});