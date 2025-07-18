////
//// DEFINE MAPBOX THINGS
////

// define access token
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";

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
    if (fillColorBin == 'assembly17') {
        fillColor =  [
            'match',
            ['get', "winner"],
            'Matt Haney','#5082c3',
            'Manuel Noris-Barrera','#df1f26',
            'Otto Duke','#f3cd39',
            /* other */ '#CECECE']
        return fillColor;
    }
    if (fillColorBin == 'assembly19') {
        fillColor =  [
            'match',
            ['get', "winner"],
            'Nadia Flamenco','#09ba00',
            'Catherine Stefani','#f48575',
            'Arjun Gustav Sodhani','#f3cd39',
            'David Lee','#282250',
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
// Assembly 17
async function fetchDataAssembly17() {

    // GRAB
    const response = await fetch('003_assembly17.geojson?nocache='  + (new Date()).getTime());
    var data = await response.json();
    haney_array = []
    norisBarrera_array = []
    duke_array = []
    for (let i = 0; i < data.features.length; i++) {
        haney_array.push(data.features[i].properties['Matt Haney'])
        norisBarrera_array.push(data.features[i].properties['Manuel Noris-Barrera'])
        duke_array.push(data.features[i].properties['Otto Duke'])
    }

    // SUM
    haney_sum = haney_array.reduce((pv, cv) => pv + cv, 0);
    norisBarrera_sum = norisBarrera_array.reduce((pv, cv) => pv + cv, 0);
    duke_sum = duke_array.reduce((pv, cv) => pv + cv, 0);
    total_votes = haney_sum + norisBarrera_sum + duke_sum

    // PERCENTAGES
    haney_perc = roundTo((haney_sum / total_votes * 100), 1)
    norisBarrera_perc = roundTo((norisBarrera_sum / total_votes * 100), 1)
    duke_perc = roundTo((duke_sum / total_votes * 100), 1)

    document.getElementById('Matt Haney').innerHTML = 'Matt Haney (' + haney_perc + "%)"
    document.getElementById('Manuel Noris-Barrera').innerHTML = 'Manuel Noris-Barrera (' + norisBarrera_perc + "%)"
    document.getElementById('Otto Duke').innerHTML = 'Otto Duke (' + duke_perc + "%)"
    document.getElementById('legend').style.textAlign = 'left';
    document.getElementById("legend").style.lineHeight="22px";
    document.getElementById("legend").style.width=null;
    document.getElementById("legend").style.height=null;
}

// Assembly 19
async function fetchDataAssembly19() {

    // GRAB
    const response = await fetch('004_assembly19.geojson?nocache='  + (new Date()).getTime());
    var data = await response.json();
    flamenco_array = []
    stefani_array = []
    sodhani_array = []
    lee_array = []
    for (let i = 0; i < data.features.length; i++) {
        flamenco_array.push(data.features[i].properties['Nadia Flamenco'])
        stefani_array.push(data.features[i].properties['Catherine Stefani'])
        sodhani_array.push(data.features[i].properties['Arjun Gustav Sodhani'])
        lee_array.push(data.features[i].properties['David Lee'])
    }

    // SUM
    flamenco_sum = flamenco_array.reduce((pv, cv) => pv + cv, 0);
    stefani_sum = stefani_array.reduce((pv, cv) => pv + cv, 0);
    sodhani_sum = sodhani_array.reduce((pv, cv) => pv + cv, 0);
    lee_sum = lee_array.reduce((pv, cv) => pv + cv, 0);
    total_votes = flamenco_sum + stefani_sum + sodhani_sum + lee_sum

    // PERCENTAGES
    flamenco_perc = roundTo((flamenco_sum / total_votes * 100), 1)
    stefani_perc = roundTo((stefani_sum / total_votes * 100), 1)
    sodhani_perc = roundTo((sodhani_sum / total_votes * 100), 1)
    lee_perc = roundTo((lee_sum / total_votes * 100), 1)

    document.getElementById('Nadia Flamenco').innerHTML = 'Nadia Flamenco (' + flamenco_perc + "%)"
    document.getElementById('Catherine Stefani').innerHTML = 'Catherine Stefani (' + stefani_perc + "%)"
    document.getElementById('Arjun Gustav Sodhani').innerHTML = 'Arjun Gustav Sodhani (' + sodhani_perc + "%)"
    document.getElementById('David Lee').innerHTML = 'David Lee (' + lee_perc + "%)"
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
    document.getElementById('turnout-legend-image').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-assembly-results/legends/turnout_interactive_legend.svg">'
    document.getElementById("legend").style.lineHeight="0px";
    document.getElementById("legend").style.width="255px";
    document.getElementById("legend").style.height="80px";
}

////
//// LOAD MAP
////

// load my map layers
map.on("load", function () {
mapLayers = ['003_assembly17', '004_assembly19', '007_turnout']
for (var i = 0; i < mapLayers.length; i++) {
    map.addSource(mapLayers[i], {
        'type': 'geojson',
        'data': mapLayers[i]+'.geojson?nocache='  + (new Date()).getTime(),
        'promoteId': 'precinct'
    });
}

// trigger the map-building functions, create everything
fillColorFunction("assembly17");
mapFillFunction("map_fill_003", "visible", "003_assembly17");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_003", "visible", "003_assembly17");
    map.addLayer(mapOutlineDetails,"water-point-label");

fillColorFunction("assembly19");
mapFillFunction("map_fill_004", "none", "004_assembly19");
    map.addLayer(mapFillDetails,"water-point-label");
mapOutlineFunction("map_outline_004", "visible", "004_assembly19");
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
    if (type === 'assembly17') {
        addPopups('map_fill_003', '003_assembly17');
        //flyto(12, [-122.49503101743572, 37.757823270966284]);
        createLegend(['Matt Haney','Manuel Noris-Barrera','Otto Duke'], ['#5082c3','#df1f26','#f3cd39'], fetchDataAssembly17);
        map.setLayoutProperty('map_fill_003','visibility','visible');
        map.setLayoutProperty('map_fill_004','visibility','none');
        map.setLayoutProperty('map_fill_007','visibility','none');
    } else if (type === 'assembly19') {
        addPopups('map_fill_004', '004_assembly19');
        //flyto(12, [-122.39798670435795, 37.79039960415292]);
        createLegend(['Nadia Flamenco','Catherine Stefani','Arjun Gustav Sodhani','David Lee'], ['#09ba00','#f48575','#f3cd39','#282250'], fetchDataAssembly19);
        map.setLayoutProperty('map_fill_003','visibility','none');
        map.setLayoutProperty('map_fill_004','visibility','visible');
        map.setLayoutProperty('map_fill_007','visibility','none');
    } else if (type === 'turnout') {
        addPopups('map_fill_007', '007_turnout');
        //flyto(11, [-122.438, 37.77]);
        createLegend(['turnout-legend','turnout-legend-image'], ['#50505000','#50505000'], fetchDataTurnout);
        map.setLayoutProperty('map_fill_003','visibility','none');
        map.setLayoutProperty('map_fill_004','visibility','none');
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
    if (mapFill == 'map_fill_003') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var votes_cast = e.features[0].properties.votes_cast;
            var haney = e.features[0].properties['Matt Haney'];
            var norisBarrera = e.features[0].properties['Manuel Noris-Barrera'];
            var duke = e.features[0].properties['Otto Duke'];
            var haneyPerc = roundTo((haney / votes_cast) * 100);
            var norisBarreraPerc = roundTo((norisBarrera / votes_cast) * 100);
            var dukePerc = roundTo((duke / votes_cast) * 100);
            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="candidate-haney"><strong>Matt Haney</strong>: '+haneyPerc+'% ('+numberWithCommas(haney)+')</p>'
                    + '<p class="candidate-norisBarrera"><strong>Manuel Noris-Barrera</strong>: '+norisBarreraPerc+'% ('+numberWithCommas(norisBarrera)+')</p>'
                    + '<p class="candidate-duke"><strong>Otto Duke</strong>: '+dukePerc+'% ('+numberWithCommas(duke)+')</p>'
                    + '<p><strong>Turnout</strong>: '+turnout+'%</p>'
                    )
                .addTo(map)
            document.getElementsByClassName('candidate-haney')[0].style.width = haneyPerc + '%';
            document.getElementsByClassName('candidate-norisBarrera')[0].style.width = norisBarreraPerc + '%';
            document.getElementsByClassName('candidate-duke')[0].style.width = dukePerc + '%';
    });
    }
    if (mapFill == 'map_fill_004') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var votes_cast = e.features[0].properties.votes_cast;
            var flamenco = e.features[0].properties['Nadia Flamenco'];
            var stefani = e.features[0].properties['Catherine Stefani'];
            var sodhani = e.features[0].properties['Arjun Gustav Sodhani'];
            var lee = e.features[0].properties['David Lee'];
            var flamencoPerc = roundTo((flamenco / votes_cast) * 100);
            var stefaniPerc = roundTo((stefani / votes_cast) * 100);
            var sodhaniPerc = roundTo((sodhani / votes_cast) * 100);
            var leePerc = roundTo((lee / votes_cast) * 100);

            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="candidate-flamenco"><strong>Nadia Flamenco</strong>: '+flamencoPerc+'% ('+numberWithCommas(flamenco)+')</p>'
                    + '<p class="candidate-stefani"><strong>Catherine Stefani</strong>: '+stefaniPerc+'% ('+numberWithCommas(stefani)+')</p>'
                    + '<p class="candidate-sodhani"><strong>Arjun Gustav Sodhani</strong>: '+sodhaniPerc+'% ('+numberWithCommas(sodhani)+')</p>'
                    + '<p class="candidate-lee"><strong>David Lee</strong>: '+leePerc+'% ('+numberWithCommas(lee)+')</p>'
                    + '<p><strong>Turnout</strong>: '+turnout+'%</p>'
                    )
                .addTo(map)
            document.getElementsByClassName('candidate-flamenco')[0].style.width = flamencoPerc + '%';
            document.getElementsByClassName('candidate-stefani')[0].style.width = stefaniPerc + '%';
            document.getElementsByClassName('candidate-sodhani')[0].style.width = sodhaniPerc + '%';
            document.getElementsByClassName('candidate-lee')[0].style.width = leePerc + '%';
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

addPopups('map_fill_003', '003_assembly17');
createLegend(['Matt Haney','Manuel Noris-Barrera','Otto Duke'], ['#5082c3','#df1f26','#f3cd39'], fetchDataAssembly17);
this.map.once('load', () => {
    this.map.resize();
});