// define main mapbox elements
mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/cl9yzhray000314qmqyxagj82',
    zoom: 11, 
    center: [-122.438, 37.77],
});

///
/// THE FUNCTION PADDOCK
///

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

// function to set parcel color on click
function changeFeatureState(source, hoveredId, bool) {
    map.setFeatureState(
        { source: source, id: hoveredId },
        { selected: bool }
    );
}

// function to figure out combined population of selected tracts
async function fetchData(selectedTracts, file, columns) {

    // read data
    const response = await fetch('data/'+file+'.json?nocache='  + (new Date()).getTime());
    var data = await response.json();
    const columnArrays = columns.map(column => []);

    // sum up EVERY SELECTED TRACT value by column
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
    var LSratios = localSums.map(sum => (Math.round((sum / LSfinalElement) * 100)));
    var CSfinalElement = citySums[citySums.length - 1]
    var citySums= citySums.slice(0, -1);
    var CSratios = citySums.map(sum => (Math.round((sum / CSfinalElement) * 100)));
    var columns= columns.slice(0, -1);

    // fill nans if included in arrays
    LSratios = LSratios.map(function(value) {
        return isNaN(value) ? 0 : value;
    });

    addHTML(file, columns, localSums, LSratios, citySums, CSratios);
}

// function to add the HTML and modify to current selection
function addHTML(file, columns, localSums, LSratios, citySums, CSratios) {
    let HTML = "<hr class='solid' />" + 
        "<div id='chunk'>" +
            "<h3 id='chunk-title'></h3>";
    for (let i = 0; i < columns.length; i++) {
        HTML +=
            '<div class="glass">' +
                `<p class="bar-label" id="label-${columns[i]}"></p>` +
                `<div class="progress-citywide" id="progress-citywide-${columns[i]}"></div>` +
                `<div class="progress-local" id="progress-local-${columns[i]}"></div>` +
                `<div class="mark-text" id="mark-text-${columns[i]}"></div>` +
            '</div></div>';
    }      
    document.getElementById("results").innerHTML = HTML;
      
    // modify the HTML to reflect the selected data
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var LSratio = LSratios[i];
        var localSum = localSums[i];
        var CSratio = CSratios[i];
        
        document.getElementById("chunk-title").innerHTML = toTitleCase(file);
        document.getElementById("progress-local-" + column).style.width = String(LSratio) + "%";
        document.getElementById("mark-text-" + column).style.left = String(LSratio) + "%";
        document.getElementById("mark-text-" + column).innerHTML = "<span class='bar-highlight local-highlight'>" + String(Math.round(LSratio)) + "%</span>";

        document.getElementById("progress-citywide-" + column).style.width = String(CSratio) + "%";
        document.getElementById("label-" + column).innerHTML = "<strong>" + column[0].toUpperCase() + column.slice(1) + "</strong>" + " (<span class='overall-highlight'>" + String(Math.round(CSratio)) + "%</span>)";
    }

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

///
/// HOVER AND CLICKING STUFF
///

function addInteractivity(mapFill, source) {

    // create pointer on hover
    map.on('mouseenter', mapFill, function () {map.getCanvas().style.cursor = 'pointer';});
    map.on('mouseleave', mapFill, function () {map.getCanvas().style.cursor = '';});

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

    // log selected tracts
    selectedTracts = []
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
        }
        else {
            // fill in for selected tracts
            let tractListHTML = ""
            for (let i = 0; i < selectedTracts.length; i++) {
                tractListHTML += "<span class='tract'>" + selectedTracts[i] + "</span>"
            }
            document.getElementById('tract-list').innerHTML = tractListHTML

            // add data
            fetchData(selectedTracts, 'race', ['white','asian','black','other','two or more','total']);
        }
        

    });

}

// add navigation, interactivity
map.addControl(new mapboxgl.NavigationControl());
addInteractivity('map_fill_001', 'basemap');

// fit map to container
this.map.once('load', () => {
    this.map.resize();
});