// define basemap
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/ckuszv4rhph8u19qjhaveg3g0',
    zoom: 11.5,
    pitch: 0,
    bearing: 0,
    center: [-122.43, 37.77],
});

// define boolean variables
let openPopup = null;
let isSearchBarSelected = false;
let checkboxArray = [];

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
        'circle-color':
        ['case',
            ['==', ['get', 'dbi_employee'], 'Kevin T. Birmingham'], '#d84cbe',
            ['==', ['get', 'dbi_employee'], 'Sean Birmingham'], '#467ed1',
            ['==', ['get', 'dbi_employee'], 'Mark Walls'], '#38c645',
            '#ffffff'
        ],
        "circle-opacity": 0.8,
        'circle-radius': {
            'base': 5,
            'stops': [
            [16, 7],
            [20, 20],
            ]
            },
        },
    }
    return mapDetails;
}

// Function to create and open a popup
function createPopup(features, coordinates) {
    var address = features.address;
    var work_cost = features.work_cost;
    var desc = features.desc;
    var year = features.year;
    var url_1 = features.url_1;
    var url_2 = features.url_2;

    if (openPopup) {
        openPopup.remove();
        openPopup = null;
    }

    // url function
    function urlFunction(url_1, url_2) {
        if (url_2 == "None") {
            return '<p><a href="' + url_1 + '" target="_blank">Investigate permit</a></p>'
        } else {
            return '<p><a href="' + url_1 + '" target="_blank">Investigate permit 1</a></p><p><a href="' + url_2 + '" target="_blank">Investigate permit 2</a></p>'
        }
    }

    openPopup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('<h4>' + address + '</h4>' +
            '<p><strong>When?</strong> ' + year + '</p>' +
            '<p><strong>What?</strong> ' + desc + '</p>' +
            '<p><strong>Work cost?</strong> ' + work_cost + '</p>' +
            urlFunction(url_1, url_2)
        )
        .addTo(map);
}

// function to handle layer click and hover events
function handleLayerClick(layerId) {
    map.on('click', layerId, function (e) {
        var coordinates = e.features[0].geometry.coordinates;
        createPopup(e.features[0].properties, coordinates);
    });

    map.on('mouseenter', layerId, function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', layerId, function () {
        map.getCanvas().style.cursor = '';
    });
}

// load my map layers, initialize pop-ups
map.on("load", function () {
    const dataLayer = mapDetailsFunction("data", "visible", "data.geojson");
    map.addLayer(dataLayer);
    handleLayerClick('data');
});

// add navigation control, resize map on load
map.addControl(new mapboxgl.NavigationControl());
this.map.once('load', () => {
    this.map.resize();
});
