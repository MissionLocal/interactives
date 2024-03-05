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

// pym
var pymChild = new pym.Child();

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

// delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// define fill color
function fillColorFunctionProp(fillColorBin) {
    if (fillColorBin == 'prop') {
        fillColor =  ['match',
        ['get', 'yes_perc_bin'],
        'Less than 25%','#990000',
        '25-30%','#E02214',
        '30-35%','#E54C4C',
        '35-40%','#EE7651',
        '40-45%','#EF9F6A',
        '45-50%','#FFCB78',
        '50-55%','#9DF4D9',
        '55-60%','#65EAD0',
        '60-65%','#0DD6C7',
        '65-70%','#0DC1D3',
        '70-75%','#00A4BF',
        '75% and more','#007DBC',
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
            'no data', '#CECECE',
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

// Turnout
async function fetchData() {
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
    document.getElementById('turnout-legend-image').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/turnout_interactive_legend.svg">'
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
    function addMapLayers(mapFillID, mapOutlineID, visibility, source, type) {
        fillColorFunctionProp(type);
        mapFillFunction(mapFillID, visibility, source);
        map.addLayer(mapFillDetails, "water-point-label");
        mapOutlineFunction(mapOutlineID, "visible", source);
        map.addLayer(mapOutlineDetails, "water-point-label");
    }
    addMapLayers("map_fill_008", "map_outline_008", "visible", "008_propA", "prop");
    addMapLayers("map_fill_009", "map_outline_009", "none", "009_propB", "prop");
    addMapLayers("map_fill_010", "map_outline_010", "none", "010_propC", "prop");
    addMapLayers("map_fill_011", "map_outline_011", "none", "011_propD", "prop");
    addMapLayers("map_fill_012", "map_outline_012", "none", "012_propE", "prop");
    addMapLayers("map_fill_013", "map_outline_013", "none", "013_propF", "prop");
    addMapLayers("map_fill_014", "map_outline_014", "none", "014_propG", "prop");
    addMapLayers("map_fill_007", "map_outline_007", "none", "007_turnout", "turnout");

});

    // radio button control
    document.getElementById('button-container').addEventListener('change', (event) => {
        popup.remove();
        const type = event.target.value;
        // update the map filter
        if (type === 'propA') {
            addPopups('map_fill_008', '008_propA');
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propA');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propB');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propC');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propD');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propE');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propF');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
            fillOutResults('propG');
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
            document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/turnout_legend.svg">';
            fillOutResults('turnout');
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
        if (mapFill == 'map_fill_008' || mapFill == 'map_fill_009' || mapFill == 'map_fill_010' || mapFill == 'map_fill_011' || mapFill == 'map_fill_012' || mapFill == 'map_fill_013' || mapFill == 'map_fill_014') {
            map.on('click', mapFill, function (e) {
                var name = e.features[0].properties.precinct;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes = e.features[0].properties.yes;
                var no = e.features[0].properties.no;
                var registered_voters = e.features[0].properties.registered_voters;
                var votes_cast = e.features[0].properties.votes_cast;
                var yes_perc = roundTo((yes / votes_cast) * 100, 1)
                var no_perc = roundTo((no / votes_cast) * 100, 1)
                popup.setLngLat(e.lngLat)
                    .setHTML('<h4>Precinct '+name+'</h4>'
                        + '<p class="prop-yes"><strong>Yes</strong>: '+yes_perc+'% ('+numberWithCommas(yes)+')</p>'
                        + '<p class="prop-no"><strong>No</strong>: '+no_perc+'% ('+numberWithCommas(no)+')</p>'
                        + '<p><strong>Turnout</strong>: '+roundTo((votes_cast / registered_voters) * 100, 1)+'%</p>'
                        )
                    .addTo(map)
                document.getElementsByClassName('prop-yes')[0].style.width = yes_perc + '%';
                document.getElementsByClassName('prop-no')[0].style.width = no_perc + '%';
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

// add results panel to the page
function fillOutResults(map) {
    var resultsHeader = document.getElementById('results-header')
    var resultsBody = document.getElementById('results-body')

    // Function to fill out results panel for a specific proposition
    function fillOutPropResults(geojsonSource, marker, header, description, endorsements) {
        fetch(geojsonSource)
            .then(response => response.json())
            .then(data => {
                var propData = data.features;

                // sum all yes and no votes
                var totalYesVotes = 0;
                var totalNoVotes = 0;
                propData.forEach(feature => {
                    totalYesVotes += feature.properties.yes;
                    totalNoVotes += feature.properties.no;
                });

                // calculate percentages
                var totalVotes = totalYesVotes + totalNoVotes;
                if (totalVotes == 0) {
                    var yesPercentage = 50;
                    var noPercentage = 50;
                } else {
                    var yesPercentage = roundTo((totalYesVotes / totalVotes) * 100, 1);
                    var noPercentage = roundTo((totalNoVotes / totalVotes) * 100, 1);
                }

                // fill out results panel
                resultsHeader.innerHTML = '<h2 class="results-header">' + header + '</h2>';
                resultsBody.innerHTML = '<p class="results-text">' + description + '</p>' +
                    '<div id="glass-container">' +
                    '<div class="yes">Yes</div>' +
                    '<div class="no">No</div>' +
                    '<div id="glass">' +
                    '<div id="progress"></div>' +
                    '<div id="' + marker + '"></div>' +
                    '</div>' +
                    '<div class="yes-votes">(' + numberWithCommas(totalYesVotes) + ') ' + roundTo(yesPercentage, 1) + '%</div>' +
                    '<div class="no-votes">' + roundTo(noPercentage, 1) + '% (' + numberWithCommas(totalNoVotes) + ')</div>' +
                    '</div>' +
                    '<hr class="solid" />' +
                    '<h3 class="heading-break">Supporters</h3>' +
                    endorsements.supporters +
                    '<hr class="solid" />' +
                    '<h3 class="heading-break">Opponents</h3>' +
                    endorsements.opponents;
                document.getElementById('progress').style.width = noPercentage + '%';

            }).then(() => {
                delay(250).then(() => pymChild.sendHeight());
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
}

    var imageEndorseBreed = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_breed.svg">'
    var imageEndorseChronicle = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_chronicle.svg">'
    var imageEndorseDemocrats = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_democrats.svg">'
    var imageEndorseRepublicans = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_republicans.svg">'
    var imageEndorseGrowsf = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_growsf.svg">'
    var imageEndorseLopov = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_lopov.svg">'
    var imageEndorseLabor = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_labor.svg">'
    var imageEndorseNone = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_none.svg">'
    var imageEndorseChamberOfCommerce = '<img class="endorsements" src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/images/endorsement_chamberOfCommerce.svg">'

    if (map == 'propA') {
        fillOutPropResults('008_propA.geojson', 'mark-33', 'Proposition A', '<em>Permit $300 million in borrowing to build affordable housing. Requires <strong>66.66%</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-affordable-housing-bonds">Read more</a></em>', {
            supporters: imageEndorseBreed +
            imageEndorseChronicle +
                imageEndorseDemocrats +
                imageEndorseGrowsf +
                imageEndorseLopov +
                imageEndorseLabor + 
                imageEndorseChamberOfCommerce,
            opponents: imageEndorseRepublicans
        });
    }

    if (map == 'propB') {
        fillOutPropResults('009_propB.geojson', 'mark-50', 'Proposition B', '<em>Increase the minimum number of police officers, if extra funding is allocated. Requires <strong>50%+1</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-b-police-officer-staffing-levels-conditioned-amending-existing-or-future">Read more</a></em>', {
            supporters: imageEndorseDemocrats +
            imageEndorseLabor,
            opponents: imageEndorseBreed +
            imageEndorseChronicle +
            imageEndorseRepublicans +
            imageEndorseGrowsf +
            imageEndorseLopov +
            imageEndorseChamberOfCommerce
        });
    }

    if (map == 'propC') {
        fillOutPropResults('010_propC.geojson', 'mark-50', 'Proposition C', '<em>Exempt properties converted from commercial to residential from a transfer tax. Requires <strong>50%+1</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-c-real-estate-transfer-tax-exemption-and-office-space-allocation">Read more</a></em>', {
            supporters: imageEndorseBreed +
            imageEndorseChronicle +
            imageEndorseRepublicans +
            imageEndorseGrowsf +
            imageEndorseChamberOfCommerce,
            opponents: imageEndorseDemocrats +
            imageEndorseLopov +
            imageEndorseLabor
        });
    }

    if (map == 'propD') {
        fillOutPropResults('011_propD.geojson', 'mark-50', 'Proposition D', '<em>Tighten city ethics laws in a variety of ways, including monetary penalties for not disclosing gifts. Requires <strong>50%+1</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-d-changes-local-ethics-laws">Read more</a></em>', {
            supporters: imageEndorseChronicle +
            imageEndorseDemocrats +
            imageEndorseRepublicans +
            imageEndorseGrowsf +
            imageEndorseLopov +
            imageEndorseLabor +
            imageEndorseChamberOfCommerce,
            opponents: imageEndorseNone
        });
    }

    if (map == 'propE') {
        fillOutPropResults('012_propE.geojson', 'mark-50', 'Proposition E', '<em>Allow more police vehicle pursuits, reduce police recordkeeping, and increase police use of tech. Requires <strong>50%+1</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-e-police-department-policies-and-procedures">Read more</a></em>', {
            supporters: imageEndorseBreed +
            imageEndorseRepublicans +
            imageEndorseGrowsf +
            imageEndorseChamberOfCommerce,
            opponents: imageEndorseChronicle +
            imageEndorseDemocrats +
            imageEndorseLopov +
            imageEndorseLabor,
        });
    }

    if (map == 'propF') {
        fillOutPropResults('013_propF.geojson', 'mark-50', 'Proposition F', '<em>Screen welfare recipients for drugs and require treatment for users. Requires <strong>50%+1</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-f-illegal-substance-dependence-screening-and-treatment-recipients-city">Read more</a></em>', {
            supporters: imageEndorseBreed +
            imageEndorseRepublicans +
            imageEndorseGrowsf,
            opponents: imageEndorseChronicle +
            imageEndorseDemocrats +
            imageEndorseLopov +
            imageEndorseLabor,
        });
    }

    if (map == 'propG') {
        fillOutPropResults('014_propG.geojson', 'mark-50', 'Proposition G', '<em>Encourage the school district to offer algebra for eighth graders. Requires <strong>50%+1</strong> in favor to pass. <a target="blank" href="https://www.sf.gov/information/proposition-g-offering-algebra-1-eighth-graders">Read more</a></em>', {
            supporters: imageEndorseBreed +
            imageEndorseChronicle +
            imageEndorseDemocrats +
            imageEndorseRepublicans +
            imageEndorseGrowsf +
            imageEndorseChamberOfCommerce,
            opponents: imageEndorseLopov
        });
    }

    // Turnout
    if (map == 'turnout') {
        fetch('007_turnout.geojson')
            .then(response => response.json())
            .then(data => {
                    var turnoutData = data.features;
                    resultsHeader.innerHTML = '<h2 class="results-header">Turnout</h2>';
                    resultsBody.innerHTML = '<p class="results-text">Text goes here.</p>';

                    // sum all registered voters and votes cast
                    var totalRegisteredVoters = 0;
                    var totalVotesCast = 0;
                    turnoutData.forEach(feature => {
                        totalRegisteredVoters += feature.properties.registered_voters;
                        totalVotesCast += feature.properties.votes_cast;
                    });

                    // calculate turnout
                    var turnout = roundTo((totalVotesCast / totalRegisteredVoters) * 100, 1);
                    console.log(turnout)

                    // fill out results panel
                    resultsBody.innerHTML = '<h4 class="results-text">'+turnout+'%</h4><p>'+numberWithCommas(totalVotesCast)+' of '+numberWithCommas(totalRegisteredVoters)+' registered voters</p>';

            }).then(() => {
                delay(250).then(() => pymChild.sendHeight());
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

addPopups('map_fill_008', '008_propA');
document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-prop-results/legends/prop_legend.svg">';
this.map.once('load', () => {
    this.map.resize();
});

fillOutResults('propA');

delay(250).then(() => pymChild.sendHeight());
// if screen is resized, send new height
window.addEventListener('resize', function() {
    delay(250).then(() => pymChild.sendHeight());
});