// define mapbox access token
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
    style: 'mapbox://styles/mlnow/cl9yzhray000314qmqyxagj82',
    zoom: mapZoom,
    center: [-122.438, mapY],
});

// define fill and source for geography
var mapFill = 'map_fill_001'
var source = 'basemap'

// define other stuff
var selectedAreas = []
var legendDetails = document.getElementById("legend-details")
var results = document.getElementById('results')
var areaList = document.getElementById('area-list')
var pymChild = new pym.Child();

///
/// PRIMARY FUNCTIONS
///

// main function
async function main() {
    const fullnames = {
        'propA': ['Proposition A', 'Affordable housing bond'],
        'propB': ['Proposition B', 'Police officer staffing'],
        'propC': ['Proposition C', 'Transfer tax exemption'],
        'propD': ['Proposition D', 'Tightened ethics rules'],
        'propE': ['Proposition E', 'Loosened police rules'],
        'propF': ['Proposition F', 'Welfare drug screening'],
        'propG': ['Proposition G', 'Algebra in 8th grade'],
        'dccc17': ['DCCC Assembly District 17', ''],
        'dccc19': ['DCCC Assembly District 19', ''],
        'assembly17': ['Assembly District 17', ''],
        'assembly19': ['Assembly District 19', ''],
        'court1': ['Superior Court Seat 1', ''],
        'court13': ['Superior Court Seat 13', ''],
        'turnout': ['Turnout', '']}

    const datasets = await fetchData(Object.keys(fullnames));
    
    var total_voters = Object.values(datasets['turnout']['votes_cast']).reduce((acc, value) => acc + value, 0);
    legendDetails.innerHTML = "<span class='local-highlight legend-label'>0</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(total_voters) + "</span>"

    // when something is clicked, trigger interaction code
    map.on('click', mapFill, (e) => {
        onInteraction(datasets, fullnames);
    });
}

// do everything when something is clicked
function onInteraction(datasets, fullnames) {

    // when area changes, select or deselect area as needed
    if (selectedAreas.includes(hoveredId)) {
        removeItem(selectedAreas, hoveredId)
    } else {
        selectedAreas.push(hoveredId)
    }
    changeAreaSelect(source, hoveredId, selectedAreas.includes(hoveredId))

    // clear the results
    results.innerHTML = ""

    // check list is not empty - if it is not, run the rest of the code
    if (validation(datasets['turnout'])) {

        // set up the list of areas at the bottom of the map
        let areaListHTML = ""
        for (let i = 0; i < selectedAreas.length; i++) {
            areaListHTML += "<span class='area'>" + selectedAreas[i] + "</span>"
        }
        areaList.innerHTML = areaListHTML + "<button id='clear-button'>Clear selection</button>"
            
        // create clear button
        var clearButton = document.getElementById("clear-button")
        clearButton.addEventListener("click", clear);

        ///
        /// calculate rate values
        ///

        // iterate through each dataset
        let keys = Object.keys(datasets);
        for (let i = 0; i < keys.length - 1; i++) {
            let key = keys[i];
            let dataset = datasets[key];
            let columns = Object.keys(dataset);
        
            // sum each column - citywide
            let columnCitySums = columns.map(column => Object.values(dataset[column]).reduce((acc, value) => acc + value, 0));

            // sum each column - local
            let localColumnSums = columns.map(column =>
                selectedAreas.reduce((localAcc, area) => localAcc + dataset[column][area], 0)
            );

            // create local rates by dividing each column by the local sum
            const totalLocalSum = localColumnSums[localColumnSums.length - 1];
            localColumnSums = localColumnSums.slice(0, -1); // trim the last value, which is the total
            columns = columns.slice(0, -1); // trim the last value, which is the total
            const localRates = columns.map((_, j) => (localColumnSums[j] / totalLocalSum) * 100);
            
            // create citywide rates by dividing each column by the citywide sum
            const totalCitySum = columnCitySums[columnCitySums.length - 1];
            columnCitySums = columnCitySums.slice(0, -1); // trim the last value, which is the total
            const cityRates = columns.map((_, j) => (columnCitySums[j] / totalCitySum) * 100);

            // create chart
            if (localColumnSums[0] > 0) {
                var HTML = "<h4>" + fullnames[key][0] + "</h4>" + '<div class="chart" id="chart-' + key + '">' + '<p><em>' + fullnames[key][1] + '</em></p>';
                for (let i = 0; i < columns.length; i++) {
                    HTML +=
                    '<div class="glass">' +
                        `<p class="bar-label" id="label-${removeSpaces(key+columns[i])}"></p>` +
                        `<div class="progress-citywide" id="progress-citywide-${removeSpaces(key+columns[i])}"></div>` +
                        `<div class="progress-local" id="progress-local-${removeSpaces(key+columns[i])}"></div>` +
                        `<div class="mark-text" id="mark-text-${removeSpaces(key+columns[i])}"></div>` +
                    '</div>';
                };
                HTML += '</div><hr>';
                results.innerHTML += HTML;
    
                // match values to chart
                for (let i = 0; i < columns.length; i++) {
                    document.getElementById("progress-local-" + removeSpaces(key+columns[i])).style.width = String(localRates[i]) + "%";
                    document.getElementById("mark-text-" + removeSpaces(key+columns[i])).style.left = String(localRates[i]) + "%";
                    document.getElementById("mark-text-" + removeSpaces(key+columns[i])).innerHTML = "<span class='bar-highlight local-highlight'>" + String(round(localRates[i]),0) + "%</span>";
            
                    document.getElementById("progress-citywide-" + removeSpaces(key+columns[i])).style.width = String(cityRates[i]) + "%";
                    document.getElementById("label-" + removeSpaces(key+columns[i])).innerHTML = "<strong>" + toTitleCase(columns[i]) + "</strong>" + " (<span class='overall-highlight'>" + String(round(cityRates[i]),0) + "%</span>)";
    
                    // set height of chart, depending on if there is a fullnames[key][1]
                    if (fullnames[key][1] == '') {
                        document.getElementById("chart-" + key).style.height = String((80 * columns.length) - 10) + "px";
                    } else {
                        document.getElementById("chart-" + key).style.height = String((80 * columns.length) + 20) + "px";
                    }
                }
            }
        }

        // get turnout sum in selected areas
        let local_voters = selectedAreas.reduce((localAcc, area) => localAcc + datasets['turnout']['votes_cast'][area], 0);
        legendDetails.innerHTML = "<span class='local-highlight legend-label'>" + numberWithCommas(local_voters) + "</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(total_voters) + "</span>"
    }
}

// function to check if an area is selected
function validation(data) {

    // sum each value in data
    total_voters = Object.values(data['votes_cast']).reduce((acc, value) => acc + value, 0);

    if (selectedAreas == '') {
        areaList.innerHTML = "<span class='area'>No area selected</span>"
        results.innerHTML = "<p>Please select a precinct to see results.</p>"
        legendDetails.innerHTML = "<span class='local-highlight legend-label'>0</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(total_voters) + "</span>";
        return false;
    }
    else {
        return true;
    }
}

// function to clear everything
function clear() {

    // clear the map
    selectedAreas.forEach(function (area) {
        changeAreaSelect(source, area, false)
    });
    selectedAreas = [];

    // clear the list of areas at the bottom of the map
    areaList.innerHTML = "<span class='area'>No area selected</span>"
    results.innerHTML = ""
    legendDetails.innerHTML = "<span class='local-highlight legend-label'>0</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(total_voters) + "</span>";
    
    // change pym height
    delay(250).then(() => pymChild.sendHeight());
};

///
/// MAPBOX FUNCTIONS
///

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
        "fill-color": [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#f220de',
            '#c6c6c5'],
        "fill-opacity": [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.85,
            0.65
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

///
/// SECONDARY FUNCTIONS
///

// function to set parcel color on click
function changeAreaSelect(source, hoveredId, bool) {
    map.setFeatureState(
        { source: source, id: hoveredId },
        { selected: bool }
    );
}

// function to remove spaces
function removeSpaces(inputString) {
    return inputString.replace(/\s/g, '');
}

// delay for a bit
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// function to round numbers
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

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

// function to remove value from an array
function removeItem(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
        arr.splice(i, 1);
        } else {
        ++i;
        }
    }
    return arr;
}

// function to make stuff title case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    ).replace(
        /-\w/g,
        function (txt) {
            return txt.charAt(0) + txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase();
        }
    );
}

///
/// LOAD MAP DATA
///

// load my map layers
map.on("load", function () {
    mapLayers = ['basemap']
    for (var i = 0; i < mapLayers.length; i++) {
        map.addSource(mapLayers[i], {
            'type': 'geojson',
            'data': 'data/'+mapLayers[i]+'.geojson?nocache='  + (new Date()).getTime(),
            'promoteId': 'precinct'
        });
    }
    mapFillFunction("map_fill_001", "visible", "basemap");
    map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineFunction("map_outline_001", "visible", "basemap");
    map.addLayer(mapOutlineDetails,"water-point-label");
});

// function to fetch data
async function fetchData(files) {
    let datasets = {};
    for (let i = 0; i < files.length; i++) {
        var response = await fetch('data/'+files[i]+'.json?nocache='  + (new Date()).getTime());
        var data = await response.json();
        datasets[files[i]] = data;
    }
    return datasets
}

// trigger hover effects when entering area
map.on('mouseenter', mapFill, function () {map.getCanvas().style.cursor = 'pointer';});
map.on('mouseleave', mapFill, function () {map.getCanvas().style.cursor = '';});
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

// add navigation
map.addControl(new mapboxgl.NavigationControl());

// fit map to container
this.map.once('load', () => {
    this.map.resize();
});

//set everything off
main();