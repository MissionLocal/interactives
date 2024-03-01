////
//// DEFINE MAPBOX THINGS
////

// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
    container: 'map',
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

// DEFINE COLORS
function fillColorFunction(fillColorBin) {
    if (fillColorBin == 'court1') {
        fillColor =  [
            'match',
            ['get', "winner"],
            'Michael Isaku Begert','#ffe050',
            'Chip Zecher','#5159a1',
            'no data','#CECECE',
            /* other */ '#CECECE']
        return fillColor;
    }
    if (fillColorBin == 'court13') {
        fillColor =  [
            'match',
            ['get', "winner"],
            'Patrick Thompson','#ffe050',
            'Jean Myungjin Roland','#5159a1',
            'no data','#CECECE',
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

// FIGURE OUT PERCENTAGES FOR EACH CANDIDATE
// COURT 1
async function fetchDataCourt1() {

    // GRAB
    const response = await fetch('005_court1.geojson?nocache='  + (new Date()).getTime());
    var data = await response.json();

    begert_array = []
    zecher_array = []

    for (let i = 0; i < data.features.length; i++) {
        begert_array.push(data.features[i].properties['Michael Isaku Begert'])
        zecher_array.push(data.features[i].properties['Chip Zecher'])
    }

    // SUM
    begert_sum = begert_array.reduce((pv, cv) => pv + cv, 0);
    zecher_sum = zecher_array.reduce((pv, cv) => pv + cv, 0);
    total_votes = begert_sum + zecher_sum

    // PERCENTAGES
    begert_perc = roundTo((begert_sum / total_votes * 100), 1)
    zecher_perc = roundTo((zecher_sum / total_votes * 100), 1)

    document.getElementById('Michael Isaku Begert').innerHTML = 'Michael Isaku Begert (' + begert_perc + "%)"
    document.getElementById('Chip Zecher').innerHTML = 'Chip Zecher (' + zecher_perc + "%)"
    document.getElementById('legend').style.textAlign = 'left';
    document.getElementById("legend").style.lineHeight="22px";
    document.getElementById("legend").style.width=null;
    document.getElementById("legend").style.height=null;
}

// Court 13
async function fetchDataCourt13() {

    // GRAB
    const response = await fetch('006_court13.geojson?nocache='  + (new Date()).getTime());
    var data = await response.json();

    thompson_array = []
    roland_array = []

    for (let i = 0; i < data.features.length; i++) {
        thompson_array.push(data.features[i].properties['Patrick Thompson'])
        roland_array.push(data.features[i].properties['Jean Myungjin Roland'])
    }

    // SUM
    thompson_sum = thompson_array.reduce((pv, cv) => pv + cv, 0);
    roland_sum = roland_array.reduce((pv, cv) => pv + cv, 0);
    total_votes = thompson_sum + roland_sum

    // PERCENTAGES
    thompson_perc = roundTo((thompson_sum / total_votes * 100), 1)
    roland_perc = roundTo((roland_sum / total_votes * 100), 1)

    document.getElementById('Patrick Thompson').innerHTML = 'Patrick Thompson (' + thompson_perc + "%)"
    document.getElementById('Jean Myungjin Roland').innerHTML = 'Jean Myungjin Roland (' + roland_perc + "%)"
    document.getElementById('legend').style.textAlign = 'left';
    document.getElementById("legend").style.lineHeight="22px";
    document.getElementById("legend").style.width=null;
    document.getElementById("legend").style.height=null;
}

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
mapLayers = ['005_court1', '006_court13', '007_turnout']
for (var i = 0; i < mapLayers.length; i++) {
    map.addSource(mapLayers[i], {
        'type': 'geojson',
        'data': mapLayers[i]+'.geojson?nocache='  + (new Date()).getTime(),
        'promoteId': 'precinct'
    });
}

// trigger the map-building functions, create everything
fillColorFunction("court1");
mapFillFunction("map_fill_005", "visible", "005_court1");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_005", "visible", "005_court1");
    map.addLayer(mapOutlineDetails,"water-point-label");

fillColorFunction("court13");
mapFillFunction("map_fill_006", "none", "006_court13");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_004", "visible", "006_court13");
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
    if (type === 'court1') {
        addPopups('map_fill_005', '005_court1');
        //flyto(12, [-122.49503101743572, 37.757823270966284]);
        createLegend(['Michael Isaku Begert','Chip Zecher'], ['#ffe050','#5159a1'], fetchDataCourt1);
        map.setLayoutProperty('map_fill_005','visibility','visible');
        map.setLayoutProperty('map_fill_006','visibility','none');
        map.setLayoutProperty('map_fill_007','visibility','none');
    } else if (type === 'court13') {
        addPopups('map_fill_006', '006_court13');
        //flyto(12, [-122.39798670435795, 37.79039960415292]);
        createLegend(['Patrick Thompson','Jean Myungjin Roland'], ['#ffe050','#5159a1'], fetchDataCourt13);
        map.setLayoutProperty('map_fill_005','visibility','none');
        map.setLayoutProperty('map_fill_006','visibility','visible');
        map.setLayoutProperty('map_fill_007','visibility','none');
    } else if (type === 'turnout') {
        addPopups('map_fill_007', '007_turnout');
        //flyto(11, [-122.438, 37.77]);
        createLegend(['turnout-legend','turnout-legend-image'], ['#50505000','#50505000'], fetchDataTurnout);
        map.setLayoutProperty('map_fill_005','visibility','none');
        map.setLayoutProperty('map_fill_006','visibility','none');
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
    if (mapFill == 'map_fill_005') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var votes_cast = e.features[0].properties.votes_cast;
            var begert = e.features[0].properties['Michael Isaku Begert'];
            var zecher = e.features[0].properties['Chip Zecher'];
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="candidate-begert"><strong>Michael Isaku Begert</strong>: '+roundTo((begert / votes_cast) * 100, 1)+'% ('+numberWithCommas(begert)+')</p>'
                    + '<p class="candidate-zecher"><strong>Chip Zecher</strong>: '+roundTo((zecher / votes_cast) * 100, 1)+'% ('+numberWithCommas(zecher)+')</p>'
                    + '<p><strong>Turnout</strong>: '+turnout+'%</p>'
                    )
                .addTo(map)
    });
    }
    if (mapFill == 'map_fill_006') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var votes_cast = e.features[0].properties.votes_cast;
            var thompson = e.features[0].properties['Patrick Thompson'];
            var roland = e.features[0].properties['Jean Myungjin Roland'];
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="candidate-thompson"><strong>Patrick Thompson</strong>: '+roundTo((thompson / votes_cast) * 100, 1)+'% ('+numberWithCommas(thompson)+')</p>'
                    + '<p class="candidate-roland"><strong>Jean Myungjin Roland</strong>: '+roundTo((roland / votes_cast) * 100, 1)+'% ('+numberWithCommas(roland)+')</p>'
                    + '<p><strong>Turnout</strong>: '+turnout+'%</p>'
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

addPopups('map_fill_005', '005_court1');
createLegend(['Michael Isaku Begert','Chip Zecher'], ['#ffe050','#5159a1'], fetchDataCourt1);
this.map.once('load', () => {
    this.map.resize();
});