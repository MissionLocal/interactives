// define main mapbox elements
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/cl9yzhray000314qmqyxagj82',
    zoom: 11, 
    center: [-122.438, 37.77],
});

var mapFill = 'map_fill_001'
var source = 'basemap'
var selectedTracts = []
var footnotes = {'race': 'Data from the <a href="https://data.census.gov/table?q=B03002&g=0500000US06075$1400000&tid=ACSDT5Y2021.B03002&tp=true">2021 American Community Survey</a>.',
                'age': 'Data from the <a href="https://data.census.gov/table?q=age&g=0500000US06075$1400000&tid=ACSDP5Y2021.DP05&tp=true">2021 American Community Survey</a>.',
                'income': 'Data from the <a href="https://data.census.gov/table?q=B19001&g=0500000US06075$1400000&tid=ACSDT5Y2021.B19001&tp=true">2021 American Community Survey</a>.',
                'internet': 'Data from the <a href="https://data.census.gov/table?q=B28011&g=0500000US06075$1400000&tid=ACSDT5Y2021.B28011&tp=true">2021 American Community Survey</a>.',
                'sex': 'Data from the <a href="https://data.census.gov/table?q=age&g=0500000US06075$1400000&tid=ACSDP5Y2021.DP05&tp=true">2021 American Community Survey</a>.',
                'vehicles': 'Data from the <a href="https://data.census.gov/table?q=B25044&g=0500000US06075$1400000&tid=ACSDT5Y2021.B25044&tp=true">2021 American Community Survey</a>.',
                'crime': 'Data from San Francisco Police Department <a href="https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783">incident reports for 2022</a>. Please note that incident reports are not the same as <a href="https://www.sanfranciscopolice.org/stay-safe/crime-data/crime-dashboard">official crime statistics</a>. Incidents without geographic data are omitted.'}

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
/// CUSTOM FUNCTIONS
///

// function to set parcel color on click
function changeFeatureState(source, hoveredId, bool) {
    map.setFeatureState(
        { source: source, id: hoveredId },
        { selected: bool }
    );
}

// function to figure out combined population of selected tracts
async function fetchData(selectedTracts, file, columns) {
    const response = await fetch('data/'+file+'.json?nocache='  + (new Date()).getTime());
    var data = await response.json();
    const columnArrays = columns.map(column => []);

    // sum up every SELECTED TRACT value by column
    localSums = []
    selectedTracts.forEach(function (tract) {
        for (let i = 0; i < columnArrays.length; i++) {
            columnArrays[i].push(data[columns[i]][tract]);
        }
    });
    for (let i = 0; i < columnArrays.length; i++) {
        localSums.push(columnArrays[i].reduce((partialSum, a) => partialSum + a, 0));
    }

    // sum ALL TRACTS by column
    var citySums = columns.map(column => {
        return Object.values(data[column]).reduce((sum, value) => sum + value, 0);
    });

    // figure out percentages
    var LSfinalElement = localSums[localSums.length - 1]
    var localSums= localSums.slice(0, -1);
    var LSratios = localSums.map(sum => ((sum / LSfinalElement) * 100));
    var CSfinalElement = citySums[citySums.length - 1]
    var citySums= citySums.slice(0, -1);
    var CSratios = citySums.map(sum => ((sum / CSfinalElement) * 100));
    var columns= columns.slice(0, -1);

    // fill nans if included in arrays
    LSratios = LSratios.map(function(value) {
        return isNaN(value) ? 0 : value;
    });

    // add html based on these figures
    addHTML(file, columns, localSums, LSratios, citySums, CSratios);
}

// function to figure out combined population of selected tracts
async function fetchDataRate(selectedTracts, file, columns) {
    const response = await fetch('data/'+file+'.json?nocache='  + (new Date()).getTime());
    var data = await response.json();
    const columnArrays = columns.map(column => []);

    // sum up every SELECTED TRACT value by column
    localSums = []
    selectedTracts.forEach(function (tract) {
        for (let i = 0; i < columnArrays.length; i++) {
            columnArrays[i].push(data[columns[i]][tract]);
        }
    });
    for (let i = 0; i < columnArrays.length; i++) {
        localSums.push(columnArrays[i].reduce((partialSum, a) => partialSum + a, 0));
    }

    // sum ALL TRACTS by column
    var citySums = columns.map(column => {
        return Object.values(data[column]).reduce((sum, value) => sum + value, 0);
    });

    // figure out percentages
    var localPopulation = localSums[localSums.length - 1]
    var cityPopulation = citySums[citySums.length - 1]
    var localSums = localSums.slice(0, -1);
    var citySums = citySums.slice(0, -1);
    var columns = columns.slice(0, -1);

    var localRates = []
    var cityRates = []
    for (let i = 0; i < columns.length; i++) {
        localRates.push(round(((localSums[i] / localPopulation) * 1000), 1))
        cityRates.push(round(((citySums[i] / cityPopulation) * 1000), 1))
    }

    // add html based on these figures
    let HTML = "<div id='chunk'>" +
        "<p class='legend'><span class='local-highlight legend-label in-results'>Local</span> <span class='overall-highlight legend-label in-results'>Citywide</span></p>";
    for (let i = 0; i < columns.length; i++) {
        HTML +=
            '<div class="glass">' +
                `<p class="bar-label" id="label-${columns[i]}"></p>` +
                `<div class="progress-citywide" id="progress-citywide-${columns[i]}"></div>` +
                `<div class="progress-local" id="progress-local-${columns[i]}"></div>` +
                `<div class="mark-text" id="mark-text-${columns[i]}"></div>` +
            '</div></div>';
    }
    HTML += "<p class='footnote'>" + footnotes[file] + "</p>"
    document.getElementById("results").innerHTML = HTML;

    // modify the HTML to reflect the selected data
    for (var i = 0; i < columns.length; i++) {
        localWidth = (localRates[i] / 100) * 90
        cityWidth = (cityRates[i] / 100) * 90

        document.getElementById("mark-text-" + columns[i]).innerHTML = "<span class='bar-highlight local-highlight'>" + String(localRates[i]) + "</span>";
        document.getElementById("label-" + columns[i]).innerHTML = "<strong>" + columns[i][0].toUpperCase() + columns[i].slice(1) + "</strong>" + " (<span class='overall-highlight'>" + String(cityRates[i]) + "</span>)";
        document.getElementById("mark-text-" + columns[i]).style.left = String(localWidth) + "%";
        document.getElementById("progress-local-" + columns[i]).style.width = String(localWidth) + "%";
        document.getElementById("progress-citywide-" + columns[i]).style.width = String(cityWidth) + "%";
    }

    // make sure it all fits on the screen
    fitToScreen(localRates, cityRates, columns);

    // grab population
    fetchPopulation(selectedTracts).then(localPop => {
        document.getElementsByClassName("overall-highlight legend-label in-results")[0].innerHTML = "Crimes per 1,000 residents, citywide";
        document.getElementsByClassName("local-highlight legend-label in-results")[0].innerHTML = "Crimes per 1,000 residents, local";
    })


}

// function to add the HTML and modify to current selection
function addHTML(file, columns, localSums, LSratios, citySums, CSratios) {
    let HTML = "<div id='chunk'>" +
        "<p class='legend'><span class='local-highlight legend-label in-results'>Local</span> <span class='overall-highlight legend-label in-results'>Citywide</span></p>";
    for (let i = 0; i < columns.length; i++) {
        HTML +=
            '<div class="glass">' +
                `<p class="bar-label" id="label-${columns[i]}"></p>` +
                `<div class="progress-citywide" id="progress-citywide-${columns[i]}"></div>` +
                `<div class="progress-local" id="progress-local-${columns[i]}"></div>` +
                `<div class="mark-text" id="mark-text-${columns[i]}"></div>` +
            '</div></div>';
    }
    HTML += "<p class='footnote'>" + footnotes[file] + "</p>"
    document.getElementById("results").innerHTML = HTML;
      
    // modify the HTML to reflect the selected data
    for (var i = 0; i < columns.length; i++) {
        localWidth = (LSratios[i] / 100) * 90
        cityWidth = (CSratios[i] / 100) * 90

        document.getElementById("progress-local-" + columns[i]).style.width = String(localWidth) + "%";
        document.getElementById("mark-text-" + columns[i]).style.left = String(localWidth) + "%";
        document.getElementById("mark-text-" + columns[i]).innerHTML = "<span class='bar-highlight local-highlight'>" + String(round(LSratios[i]),0) + "%</span>";

        document.getElementById("progress-citywide-" + columns[i]).style.width = String(cityWidth) + "%";
        document.getElementById("label-" + columns[i]).innerHTML = "<strong>" + columns[i][0].toUpperCase() + columns[i].slice(1) + "</strong>" + " (<span class='overall-highlight'>" + String(round(CSratios[i]),0) + "%</span>)";
    }

    // make sure it all fits on the screen
    fitToScreen(LSratios, CSratios, columns);

    // grab population
    fetchPopulation(selectedTracts);
}

// function to make sure the charts fit properly on the screen
function fitToScreen(localArray, cityArray, columns) {
    while (findHighestValue(localArray) > 90 || findHighestValue(cityArray) > 90) {
        localArray = multiplyArray(localArray, 0.95);
        cityArray = multiplyArray(cityArray, 0.95);
        for (var i = 0; i < columns.length; i++) {
            localWidth = (localArray[i] / 100) * 90
            cityWidth = (cityArray[i] / 100) * 90
            document.getElementById("mark-text-" + columns[i]).style.left = String(localWidth) + "%";
            document.getElementById("progress-local-" + columns[i]).style.width = String(localWidth) + "%";
            document.getElementById("progress-citywide-" + columns[i]).style.width = String(cityWidth) + "%";
        }
    }
}

// function to add the correct data depending on selected dataset
function dropdownDataSelect(selectedTracts) {
    var selectedDropdown = document.getElementById("dataset-dropdown").value
    fetchPopulation(selectedTracts).then(localPop => {
        if (selectedTracts == '') {
            document.getElementById('results').innerHTML = ""
        }
        else if (localPop < 500) {
            document.getElementById('results').innerHTML = "Please select tracts with a combined <strong>population of more than 500</strong> to see results."
        }
        else if (selectedDropdown == 'crime') {
            fetchDataRate(selectedTracts, 'crime', ['assault','burglary', 'larceny', 'motor vehicle theft', 'robbery', 'population']);
        }
        else if (selectedDropdown == 'age') {
            fetchData(selectedTracts, 'age', ['under 5','5 to 20','20 to 34','35 to 59','60 to 74','75 plus','total']);
        }
        else if (selectedDropdown == 'income') {
            fetchData(selectedTracts, 'income', ['under $20k','$20-60k','$60-100k','$100-150k','$150-200k','$200k plus','total']);
        }
        else if (selectedDropdown == 'internet') {
            fetchData(selectedTracts, 'internet', ['internet access with subscription','internet access without subscription','no internet access','total']);
        }
        else if (selectedDropdown == 'race') {
            fetchData(selectedTracts, 'race', ['white','asian','hispanic','black','other','total']);
        }
        else if (selectedDropdown == 'sex') {
            fetchData(selectedTracts, 'sex', ['male','female','total']);
        }
        else if (selectedDropdown == 'vehicles') {
            fetchData(selectedTracts, 'vehicles', ['no vehicle','one vehicle', 'two vehicles', 'three or more vehicles', 'total']);
        }
        else {
            document.getElementById('results').innerHTML = ""
        }
    })
}

// function to add generic population info
async function fetchPopulation(selectedTracts) {
    const response = await fetch('data/population.json?nocache='  + (new Date()).getTime());
    var data = await response.json();

    cityPop = 0
    for (const key in data['value']) {
        cityPop += parseInt(data['value'][key], 10);
    }

    var localPop = selectedTracts.reduce((acc, key) => {
        return acc + parseInt(data['value'][key] || 0);
    }, 0);

    document.getElementById("population-details").innerHTML = "<span class='local-highlight legend-label'>" + numberWithCommas(localPop) + "</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(cityPop) + "</span>";
    return localPop
}

///
/// MISC FUNCTIONS
///

// function to multiple all values in an array
function multiplyArray(arr, factor) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i] * factor);
    }
    return result;
}

// function to find highest value in an array
function findHighestValue(arr) {
    let highest = arr[0]; // assume the first element is the highest
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > highest) {
        highest = arr[i];
      }
    }
    return highest;
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
function removeItemAll(arr, value) {
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
    return str.split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
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
            'promoteId': 'name'
        });
    }

    // trigger the map-building functions, create everything
    mapFillFunction("map_fill_001", "visible", "basemap");
    map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineFunction("map_outline_001", "visible", "basemap");
    map.addLayer(mapOutlineDetails,"water-point-label");
});

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
        hoveredId = e.features[0].properties.name;
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

// log selected tracts whenever a new tract is clicked
map.on('click', mapFill, (e) => {
    if (selectedTracts.includes(hoveredId)) {
        removeItemAll(selectedTracts, hoveredId)
        changeFeatureState(source, hoveredId, false)
    }
    else {
        selectedTracts.push(hoveredId)
        changeFeatureState(source, hoveredId, true)
    }

    // add tract list to HTML
    if (selectedTracts == '') {
        // no tracts selected - clear stuff
        document.getElementById('tract-list').innerHTML = "<span class='tract'>No area selected</span>"
        document.getElementById('results').innerHTML = ""
        document.getElementById("population-details").innerHTML = "<span class='local-highlight legend-label'>0</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(cityPop) + "</span>";
    }
    else {
        // fill in for selected tracts
        let tractListHTML = ""
        for (let i = 0; i < selectedTracts.length; i++) {
            tractListHTML += "<span class='tract'>" + selectedTracts[i] + "</span>"
        }
        document.getElementById('tract-list').innerHTML = tractListHTML + "<button id='clear-button'>Clear selection</button>"

        // function to clear selected area
        document.getElementById("clear-button").onclick = function() {
            selectedTracts.forEach(function (tract) {
                changeFeatureState(source, tract, false)
            });
            selectedTracts = [];
            document.getElementById('tract-list').innerHTML = "<span class='tract'>No area selected</span>"
            document.getElementById('results').innerHTML = ""
            document.getElementById("population-details").innerHTML = "<span class='local-highlight legend-label'>0</span> out of <span class='overall-highlight legend-label'>" + numberWithCommas(cityPop) + "</span>";
        };

        // add the correct data depending on selected dataset
        dropdownDataSelect(selectedTracts);
    }
});

// add navigation
map.addControl(new mapboxgl.NavigationControl());

// fit map to container
this.map.once('load', () => {
    this.map.resize();
});