////
//// DEFINE MAPBOX THINGS
////

// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
container: 'map',
// style: Basic-with-roads-no-districts
style: 'mapbox://styles/mlnow/cl9yzhray000314qmqyxagj82',
zoom: 11, 
center: [-122.438, 37.77],
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
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    if (isFinite(n)) {
        return n;
    }
    else {
        return '0'
    }
}

/// DEFINE COLORS
function fillColorFunctionProp(fillColorBin) {
    if (fillColorBin == 'prop') {
        fillColor =  ['match',
        ['get', 'yesToNo_bin'],
        '0-25','#990000',
        '25-30','#E02214',
        '30-35','#E54C4C',
        '35-40','#EE7651',
        '40-45','#EF9F6A',
        '45-50','#FFCB78',
        '50-55','#9DF4D9',
        '55-60','#65EAD0',
        '60-65','#0DD6C7',
        '65-70','#0DC1D3',
        '70-75','#00A4BF',
        '75+','#007DBC',
        /* other */ '#CECECE']
    return fillColor;
    }
    if (fillColorBin == 'turnout') {
        fillColor =  [
            'match',
            ['get', 'turnout_percentage_bin'],
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
function createLegend(layers, colors, fetchData, prop, geojsonFile) {
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
    fetchData(prop, geojsonFile);
}

// fetch data for each proposition
async function fetchDataProp(proposition, geojsonFile) {
    const response = await fetch(geojsonFile + '?nocache=' + (new Date()).getTime());
    const data = await response.json();
    const yes_array = [];
    const no_array = [];
    for (let i = 0; i < data.features.length; i++) {
        yes_array.push(data.features[i].properties.yes);
        no_array.push(data.features[i].properties.no);
    }

    const yes_sum = yes_array.reduce((pv, cv) => pv + cv, 0);
    const no_sum = no_array.reduce((pv, cv) => pv + cv, 0);
    const total_votes = yes_sum + no_sum;
    const yes_perc = roundTo((yes_sum / total_votes * 100), 1);
    const no_perc = roundTo((no_sum / total_votes * 100), 1);

    document.getElementById('prop-legend').innerHTML = 'Yes (' + yes_perc + "%)"
    document.getElementById('legend').style.textAlign = 'center';
    document.getElementById('prop-legend-image').innerHTML = '<img src="/legends/prop_legend.svg">'
    document.getElementById("legend").style.lineHeight="0px";
    document.getElementById("legend").style.width="255px";
    document.getElementById("legend").style.height="80px";
}
fetchDataProp('Prop A', '008_propA.geojson');
fetchDataProp('Prop B', '009_propB.geojson');
fetchDataProp('Prop C', '010_propC.geojson');
fetchDataProp('Prop D', '011_propD.geojson');
fetchDataProp('Prop E', '012_propE.geojson');
fetchDataProp('Prop F', '013_propF.geojson');
fetchDataProp('Prop G', '014_propG.geojson');

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
    document.getElementById('turnout-legend-image').innerHTML = '<img src="/legends/turnout_interactive_legend.svg">'
    document.getElementById("legend").style.lineHeight="0px";
    document.getElementById("legend").style.width="255px";
    document.getElementById("legend").style.height="80px";
}

////
//// LOAD MAP
////

// load my map layers
map.on("load", function () {
    mapLayers = ['008_propA', '009_propB', '010_propC', '011_propD', '012_propE', '013_propF', '014_propG', '007_turnout']
    for (var i = 0; i < mapLayers.length; i++) {
        map.addSource(mapLayers[i], {
            'type': 'geojson',
            'data': mapLayers[i]+'.geojson?nocache='  + (new Date()).getTime(),
            'promoteId': 'precinct'
        });
    }

    // function to add map fill and outline layers
    function addMapLayers(mapFillID, mapOutlineID, visibility, source) {
        fillColorFunctionProp("prop");
        mapFillFunction(mapFillID, visibility, source);
        map.addLayer(mapFillDetails, "water-point-label");
        mapOutlineFunction(mapOutlineID, "visible", source);
        map.addLayer(mapOutlineDetails, "water-point-label");
    }
    addMapLayers("map_fill_008", "map_outline_008", "visible", "008_propA");
    addMapLayers("map_fill_009", "map_outline_009", "none", "009_propB");
    addMapLayers("map_fill_010", "map_outline_010", "none", "010_propC");
    addMapLayers("map_fill_011", "map_outline_011", "none", "011_propD");
    addMapLayers("map_fill_012", "map_outline_012", "none", "012_propE");
    addMapLayers("map_fill_013", "map_outline_013", "none", "013_propF");
    addMapLayers("map_fill_014", "map_outline_014", "none", "014_propG");
    addMapLayers("map_fill_007", "map_outline_007", "none", "007_turnout");

});

    // radio button control
    document.getElementById('button-container').addEventListener('change', (event) => {
        popup.remove();
        const type = event.target.value;
        // update the map filter
        if (type === 'propA') {
            addPopups('map_fill_008', '008_propA');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop A', '008_propA.geojson');
            map.setLayoutProperty('map_fill_008','visibility','visible');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','none');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'propB') {
            addPopups('map_fill_009', '009_propB');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop B', '009_propB.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','visible');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','none');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'propC') {
            addPopups('map_fill_010', '010_propC');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop C', '010_propC.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','visible');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','none');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'propD') {
            addPopups('map_fill_011', '011_propD');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop D', '011_propD.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','visible');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','none');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'propE') {
            addPopups('map_fill_012', '012_propE');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop E', '012_propE.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','visible');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','none');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'propF') {
            addPopups('map_fill_013', '013_propF');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop F', '013_propF.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','visible');
            map.setLayoutProperty('map_fill_014','visibility','none');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'propG') {
            addPopups('map_fill_014', '014_propG');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop G', '014_propG.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','visible');
            map.setLayoutProperty('map_fill_007','visibility','none');
        } else if (type === 'turnout') {
            addPopups('map_fill_007', '007_turnout');
            //flyto(11, [-122.438, 37.77]);
            createLegend(['turnout-legend','turnout-legend-image'], ['#50505000','#50505000'], fetchDataTurnout, 'Turnout', '007_turnout.geojson');
            map.setLayoutProperty('map_fill_008','visibility','none');
            map.setLayoutProperty('map_fill_009','visibility','none');
            map.setLayoutProperty('map_fill_010','visibility','none');
            map.setLayoutProperty('map_fill_011','visibility','none');
            map.setLayoutProperty('map_fill_012','visibility','none');
            map.setLayoutProperty('map_fill_013','visibility','none');
            map.setLayoutProperty('map_fill_014','visibility','none');
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
        if (mapFill == 'map_fill_008') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
        });
        }
        if (mapFill == 'map_fill_009') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
        });
        }
        if (mapFill == 'map_fill_010') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
        });
        }
        if (mapFill == 'map_fill_011') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
        });
        }
        if (mapFill == 'map_fill_012') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
        });
        }
        if (mapFill == 'map_fill_013') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
        });
        }
        if (mapFill == 'map_fill_014') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+roundTo((yes / votes_cast) * 100, 1)+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+roundTo((no / votes_cast) * 100, 1)+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
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

    addPopups('map_fill_008', '008_propA');
    createLegend(['prop-legend','prop-legend-image'], ['#50505000','#50505000'], fetchDataProp, 'Prop A', '008_propA.geojson');
    this.map.once('load', () => {
        this.map.resize();
    });