////
//// DEFINE MAPBOX THINGS
////

// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
if (window.innerWidth < 400) {
    var mapZoom = 10.4;
    var mapY = 37.765;
} else {
    var mapZoom = 10.7;
    var mapY = 37.758;
}

var map = new mapboxgl.Map({
    container: 'map',
    // style: Basic-with-roads-no-districts
    style: 'mapbox://styles/mlnow/cl9yzhray000314qmqyxagj82',
    zoom: mapZoom,
    center: [-122.438, mapY],
});

////
//// FUNCTIONS
////

// function to return numbers with commas
function numberWithCommas(x) {
    if (isFinite(x)) {
        x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return x;
    }
    else {
        return '0'
    }
}

// function to round to two decimal places
function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }
    n = Number(n);
    if (!isNaN(n)) {
        var roundedNumber = parseFloat(n.toFixed(digits));
        var result = roundedNumber % 1 === 0 ? roundedNumber.toFixed(0) : roundedNumber.toFixed(digits);
        return result;
    } else {
        return '0';
    }
}

// DEFINE COLORS
function fillColorFunction(fillColorBin) {
    if (fillColorBin == 'demsForChange') {
        fillColor =  [
            'match',
            ['get', "demsForChange_bin"],
            '0-5','#d2dbff',
            '5-10','#bcc5ef',
            '10-15','#a7b0e0',
            '15-20','#929ad0',
            '20-25','#7c84c0',
            '25-30','#666fb1',
            '30-35','#5159a1',
            '35-40','#5159a1',
            '40-45','#5159a1',
            '45-50','#5159a1',
            '50+','#5159a1',
            /* other */ '#CECECE']
    return fillColor;
    }
    if (fillColorBin == 'laborAndWorkingFamilies') {
        fillColor =  [
            'match',
            ['get', "laborAndWorkingFamilies_bin"],
            '0-5','#ffd5b8',
            '5-10','#ffc399',
            '10-15','#ffb27b',
            '15-20','#ffa05c',
            '20-25','#ff8e3d',
            '25-30','#ff7d1f',
            '30-35','#ff6b00',
            '35-40','#ff6b00',
            '40-45','#ff6b00',
            '45-50','#ff6b00',
            '50+','#ff6b00',
            /* other */ '#CECECE']
    return fillColor;
    }
    if (fillColorBin == 'turnout') {
        fillColor =  [
            'match',
            ['get', "turnout_percentage_bin"],
            '0-10','#C9F4E6',
            '10-20','#AAF2DF',
            '20-30','#91EDDB',
            '30-40','#5EEAD6',
            '40-50','#37DACF',
            '50-60','#0FCAC7',
            '60-70','#0BB5B5',
            '70-80','#07A3A3',
            '80-90','#038E8E',
            '90-100','#046F7A',
            'no data','#CECECE',
            /* other */ '#CECECE']
    return fillColor;
    }
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
        "fill-opacity": 0.85
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

// flyto function
function flyto(zoom, center) {
    map.flyTo({
        zoom: zoom,
        center: center,
        duration: 1000,
        essential: true
    });
}

///
/// DEFINE LEGEND
///

// create legend
function createLegend(layers, colors, fetchData) {
    // remove any previous stuff
    document.getElementById('legend').textContent = '';

    // create legend box
    const legend = document.getElementById('legend');
    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
        
        // populate with content
        const value = document.createElement('span');
        value.setAttribute("id", `${layer}`);
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });

    // fetch percentages
    fetchData();
}

// Dems for Change


// Turnout
async function fetchDataTurnout() {
    const response = await fetch('007_turnout.geojson?nocache='  + (new Date()).getTime());
    var data = await response.json();
    turnout_array = []
    registered_voters_array = []
    for (let i = 0; i < data.features.length; i++) {
        turnout_array.push(data.features[i].properties.votes_cast)
        registered_voters_array.push(data.features[i].properties.registered_voters)
    }

    turnout_sum = turnout_array.reduce((pv, cv) => pv + cv, 0);
    registered_voters_sum = registered_voters_array.reduce((pv, cv) => pv + cv, 0);
    turnout_perc = roundTo((turnout_sum / registered_voters_sum * 100), 1)

    document.getElementById('turnout-legend').innerHTML = 'Turnout (' + turnout_perc + "%)"
    document.getElementById('legend').style.textAlign = 'center';
    document.getElementById('turnout-legend-image').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-court-results/legends/turnout_interactive_legend.svg">'
    document.getElementById("legend").style.lineHeight="0px";
    document.getElementById("legend").style.width="255px";
    document.getElementById("legend").style.height="80px";
}

////
//// LOAD MAP
////

// load my map layers
map.on("load", function () {
mapLayers = ['001_demsForChange', '002_laborAndWorkingFamilies', '007_turnout']
for (var i = 0; i < mapLayers.length; i++) {
    map.addSource(mapLayers[i], {
        'type': 'geojson',
        'data': mapLayers[i]+'.geojson?nocache='  + (new Date()).getTime(),
        'promoteId': 'precinct'
    });
}

// trigger the map-building functions, create everything
fillColorFunction("demsForChange");
mapFillFunction("map_fill_001", "visible", "001_demsForChange");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_001", "visible", "001_demsForChange");
    map.addLayer(mapOutlineDetails,"water-point-label");

fillColorFunction("laborAndWorkingFamilies");
mapFillFunction("map_fill_002", "none", "002_laborAndWorkingFamilies");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_002", "visible", "002_laborAndWorkingFamilies");
    map.addLayer(mapOutlineDetails,"water-point-label");

fillColorFunction("turnout");
mapFillFunction("map_fill_007", "none", "007_turnout");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_007", "visible", "007_turnout");
    map.addLayer(mapOutlineDetails,"water-point-label");

});

// radio button control
document.getElementById('button-container').addEventListener('change', (event) => {
    // remove the last clicked precinct and popup
    popup.remove();

    // update the map filter
    const type = event.target.value;
    if (type === 'demsForChange') {
        addPopups('map_fill_001', '001_demsForChange');
        document.getElementById('legend').innerHTML = '<img id="turnout-legend-image" src="legends/demsForChange_legend.svg">'
        map.setLayoutProperty('map_fill_001','visibility','visible');
        map.setLayoutProperty('map_fill_002','visibility','none');
        map.setLayoutProperty('map_fill_007','visibility','none');
    } else if (type === 'laborAndWorkingFamilies') {
        addPopups('map_fill_002', '002_laborAndWorkingFamilies');
        document.getElementById('legend').innerHTML = '<img src="legends/laborAndWorkingFamilies_legend.svg">'
        map.setLayoutProperty('map_fill_001','visibility','none');
        map.setLayoutProperty('map_fill_002','visibility','visible');
        map.setLayoutProperty('map_fill_007','visibility','none');
    } else if (type === 'turnout') {
        addPopups('map_fill_007', '007_turnout');
        createLegend(['turnout-legend','turnout-legend-image'], ['#50505000','#50505000'], fetchDataTurnout);
        map.setLayoutProperty('map_fill_001','visibility','none');
        map.setLayoutProperty('map_fill_002','visibility','none');
        map.setLayoutProperty('map_fill_007','visibility','visible');
    }
});

// create popup, don't add yet
const popup = new mapboxgl.Popup({
    closeButton: true,
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
            hoveredId = e.features[0].properties.precinct;
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

    // remove pop-up if precinct not selected
    map.on('click', (e) => {
        var clickedFeatures = map.queryRenderedFeatures(e.point);
        var hasClickedFeatures = clickedFeatures.length > 0;
        var isClickedLayer = clickedFeatures.some(feature => feature.layer.id === mapFill);
        if (!hasClickedFeatures || !isClickedLayer) {
            popup.remove();
        }
    });
        
}

function definePopupContents(mapFill) {
    if (mapFill == 'map_fill_001') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var demsForChange = e.features[0].properties.demsForChange;
            var laborAndWorkingFamilies = e.features[0].properties.laborAndWorkingFamilies;
            var other = e.features[0].properties.splitTicket;
            var turnout = demsForChange + laborAndWorkingFamilies + other;
            var demsForChangePerc = e.features[0].properties.demsForChange_perc;
            var laborAndWorkingFamiliesPerc = e.features[0].properties.laborAndWorkingFamilies_perc;
            var otherPerc = e.features[0].properties.splitTicket_perc;
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="dems-for-change"><strong>Democrats for Change</strong>: '+roundTo(demsForChangePerc,1)+'% ('+numberWithCommas(demsForChange)+')</p>'
                    + '<p class="labor-and-working-families"><strong>Labor & Working Families</strong>: '+roundTo(laborAndWorkingFamiliesPerc,1)+'% ('+numberWithCommas(laborAndWorkingFamilies)+')</p>'
                    + '<p class="other"><strong>Other</strong>: '+roundTo(otherPerc,1)+'% ('+numberWithCommas(other)+')</p>'
                    + '<p><strong>Total votes</strong>: '+numberWithCommas(turnout)+'</p>'
                    )
                .addTo(map)
            document.getElementsByClassName('dems-for-change')[0].style.width = demsForChangePerc + '%';
            document.getElementsByClassName('labor-and-working-families')[0].style.width = laborAndWorkingFamiliesPerc + '%';
            document.getElementsByClassName('other')[0].style.width = otherPerc + '%';
    });
    }
    if (mapFill == 'map_fill_002') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var demsForChange = e.features[0].properties.demsForChange;
            var laborAndWorkingFamilies = e.features[0].properties.laborAndWorkingFamilies;
            var other = e.features[0].properties.splitTicket;
            var turnout = demsForChange + laborAndWorkingFamilies + other;
            var demsForChangePerc = e.features[0].properties.demsForChange_perc;
            var laborAndWorkingFamiliesPerc = e.features[0].properties.laborAndWorkingFamilies_perc;
            var otherPerc = e.features[0].properties.splitTicket_perc;
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="dems-for-change"><strong>Democrats for Change</strong>: '+roundTo(demsForChangePerc,1)+'% ('+numberWithCommas(demsForChange)+')</p>'
                    + '<p class="labor-and-working-families"><strong>Labor & Working Families</strong>: '+roundTo(laborAndWorkingFamiliesPerc,1)+'% ('+numberWithCommas(laborAndWorkingFamilies)+')</p>'
                    + '<p class="other"><strong>Other</strong>: '+roundTo(otherPerc,1)+'% ('+numberWithCommas(other)+')</p>'
                    + '<p><strong>Total votes</strong>: '+numberWithCommas(turnout)+'</p>'
                    )
                .addTo(map)
            document.getElementsByClassName('dems-for-change')[0].style.width = demsForChangePerc + '%';
            document.getElementsByClassName('labor-and-working-families')[0].style.width = laborAndWorkingFamiliesPerc + '%';
            document.getElementsByClassName('other')[0].style.width = otherPerc + '%';
    });
    }
    if (mapFill == 'map_fill_007') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var votes_cast = e.features[0].properties.votes_cast;
            var registered_voters = e.features[0].properties.registered_voters;
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p><strong>Turnout</strong>: '+roundTo(turnout, 1)+'% ('+numberWithCommas(votes_cast)+')</p>'
                    + '<p><strong>Registered voters</strong>: '+numberWithCommas(registered_voters)+'</p>'
                    )
                .addTo(map)
    });
    }
}

addPopups('map_fill_001', '001_demsForChange');
document.getElementById('legend').innerHTML = '<img src="legends/demsForChange_legend.svg">'
this.map.once('load', () => {
    this.map.resize();
});