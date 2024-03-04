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
    } else {
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

// DEFINE COLORS
// DCCC
function fillColorFunction(fillColorBin) {
    if (fillColorBin == 'demsForChange_percentage_bin') {
        var fillColor =  [
            'match',
            ['get', fillColorBin],
            'Less than 25%', '#ff6b00',
            '25-30%', '#ff8025', 
            '30-35%', '#ff954a',
            '35-40%', '#ffab6e',
            '40-45%', '#ffc093',
            '45-50%', '#ffd5b8',
            '50-55%', '#d2dbff',
            '55-60%', '#b8c1ec',
            '60-65%', '#9ea7d9',
            '65-70%', '#858dc7',
            '70-75%', '#6b73b4',
            '75% and more', '#5159a1',
            'no data', '#CECECE',
            /* other */ '#CECECE'];
        return fillColor;
    }
    if (fillColorBin == 'turnout_percentage_bin') {
        var fillColor =  [
            'match',
            ['get', fillColorBin],
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
            /* other */ '#CECECE'];
        return fillColor;
    }
}

// function to define map fill information
function mapFillFunction(mapID, visibility, source, fillColorBin) {
    var fillColor = fillColorFunction(fillColorBin);
    var mapFillDetails = {
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
                0.9,
                0.8
            ],
        },
    };
    return mapFillDetails;
}

// function to define map outline information
function mapOutlineFunction(mapID, visibility, source) {
    var mapOutlineDetails = {
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
    };
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

////
//// LOAD MAP
////

// load my map layers
map.on("load", function () {
    var mapLayers = ['001_dccc17', '002_dccc19', '007_turnout'];
    for (var i = 0; i < mapLayers.length; i++) {
    map.addSource(mapLayers[i], {
        'type': 'geojson',
        'data': mapLayers[i]+'.geojson?nocache='  + (new Date()).getTime(),
        'promoteId': 'precinct'
    });
    }

    // trigger the map-building functions, create everything
    var mapFillDetails = mapFillFunction("map_fill_001", "visible", "001_dccc17", "demsForChange_percentage_bin");
    map.addLayer(mapFillDetails,"water-point-label");
    var mapOutlineDetails = mapOutlineFunction("map_outline_001", "visible", "001_dccc17");
    map.addLayer(mapOutlineDetails,"water-point-label");

    mapFillDetails = mapFillFunction("map_fill_002", "none", "002_dccc19", "demsForChange_percentage_bin");
    map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineDetails = mapOutlineFunction("map_outline_002", "visible", "002_dccc19");
    map.addLayer(mapOutlineDetails,"water-point-label");

    mapFillDetails = mapFillFunction("map_fill_007", "none", "007_turnout", "turnout_percentage_bin");
    map.addLayer(mapFillDetails,"water-point-label");
    mapOutlineDetails = mapOutlineFunction("map_outline_007", "visible", "007_turnout");
    map.addLayer(mapOutlineDetails,"water-point-label");

});

// radio button control
document.getElementById('button-container').addEventListener('change', (event) => {

    // remove the last clicked precinct and popup
    popup.remove();

    // update the map filter
    var type = event.target.value;

    if (type === 'dccc17') {
    fillOutResults('dccc17');
    addPopups('map_fill_001', '001_dccc17');
    //flyto(12, [-122.49503101743572, 37.757823270966284]);
    map.setLayoutProperty('map_fill_001','visibility','visible');
    map.setLayoutProperty('map_fill_002','visibility','none');
    map.setLayoutProperty('map_fill_007','visibility','none');
    document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-dccc-results/legends/dccc_legend.svg">';
    } else if (type === 'dccc19') {
    fillOutResults('dccc19');
    addPopups('map_fill_002', '002_dccc19');
    //flyto(12, [-122.39798670435795, 37.79039960415292]);
    map.setLayoutProperty('map_fill_001','visibility','none');
    map.setLayoutProperty('map_fill_002','visibility','visible');
    map.setLayoutProperty('map_fill_007','visibility','none');
    document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-dccc-results/legends/dccc_legend.svg">';
    } else if (type === 'turnout') {
    fillOutResults('turnout');
    addPopups('map_fill_007', '007_turnout');
    //flyto(11, [-122.438, 37.77]);
    map.setLayoutProperty('map_fill_001','visibility','none');
    map.setLayoutProperty('map_fill_002','visibility','none');
    map.setLayoutProperty('map_fill_007','visibility','visible');
    document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-dccc-results/legends/turnout_legend.svg">';
    }
});

// create popup, don't add yet
var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    offset: [0, -5],
    maxWidth: '280px'
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
            var turnout = e.features[0].properties.turnout;
            var total_voters = e.features[0].properties.votes_cast;
            var demsForChange = e.features[0].properties.demsForChange;
            var laborAndWorkingFamilies = e.features[0].properties.laborAndWorkingFamilies;
            var unaffiliated = e.features[0].properties.unaffiliated;
            var demsForChangePerc = roundTo((demsForChange / total_voters) * 100, 1);
            var laborAndWorkingFamiliesPerc = roundTo((laborAndWorkingFamilies / total_voters) * 100, 1);
            var unaffiliatedPerc = roundTo((unaffiliated / total_voters) * 100, 1);

            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="popup-text slate-mod-popup"><strong>Democrats for Change</strong>: '+demsForChangePerc+'% ('+numberWithCommas(demsForChange)+')</p>'
                    + '<p class="popup-text slate-prog-popup"><strong>Labor & Working Families</strong>: '+laborAndWorkingFamiliesPerc+'% ('+numberWithCommas(laborAndWorkingFamilies)+')</p>'
                    + '<p class="popup-text slate-other-popup"><strong>Unaffiliated</strong>: '+unaffiliatedPerc+'% ('+numberWithCommas(unaffiliated)+')</p>'
                    + '<p class="popup-text"><strong>Turnout</strong>: '+turnout+'% ('+total_voters+')</p>'
                )
                .addTo(map)
            document.getElementsByClassName('slate-mod-popup')[0].style.width = demsForChangePerc + '%';
            document.getElementsByClassName('slate-prog-popup')[0].style.width = laborAndWorkingFamiliesPerc + '%';
            document.getElementsByClassName('slate-other-popup')[0].style.width = unaffiliatedPerc + '%';
        });
    }
    if (mapFill == 'map_fill_002') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var total_voters = e.features[0].properties.votes_cast;
            var demsForChange = e.features[0].properties.demsForChange;
            var laborAndWorkingFamilies = e.features[0].properties.laborAndWorkingFamilies;
            var unaffiliated = e.features[0].properties.unaffiliated;
            var demsForChangePerc = roundTo((demsForChange / total_voters) * 100, 1);
            var laborAndWorkingFamiliesPerc = roundTo((laborAndWorkingFamilies / total_voters) * 100, 1);
            var unaffiliatedPerc = roundTo((unaffiliated / total_voters) * 100, 1);

            popup.setLngLat(e.lngLat)
                .setHTML('<h4>Precinct '+name+'</h4>'
                    + '<p class="popup-text slate-mod-popup"><strong>Democrats for Change</strong>: '+demsForChangePerc+'% ('+numberWithCommas(demsForChange)+')</p>'
                    + '<p class="popup-text slate-prog-popup"><strong>Labor & Working Families</strong>: '+laborAndWorkingFamiliesPerc+'% ('+numberWithCommas(laborAndWorkingFamilies)+')</p>'
                    + '<p class="popup-text slate-other-popup"><strong>Unaffiliated</strong>: '+unaffiliatedPerc+'% ('+numberWithCommas(unaffiliated)+')</p>'
                    + '<p class="popup-text"><strong>Turnout</strong>: '+turnout+'% ('+total_voters+')</p>'
                )
                .addTo(map)
            document.getElementsByClassName('slate-mod-popup')[0].style.width = demsForChangePerc + '%';
            document.getElementsByClassName('slate-prog-popup')[0].style.width = laborAndWorkingFamiliesPerc + '%';
            document.getElementsByClassName('slate-other-popup')[0].style.width = unaffiliatedPerc + '%';
        });
    }
    if (mapFill == 'map_fill_007') {
        map.on('click', mapFill, function (e) {
            var name = e.features[0].properties.precinct;
            var turnout = e.features[0].properties.turnout;
            var votes_cast = e.features[0].properties.votes_cast;
            var registered_voters = e.features[0].properties.registered_voters;
            popup.setLngLat(e.lngLat)
                .setHTML('<h4 class="popup-header">Precinct '+name+'</h4>'
                    + '<p><strong>Turnout</strong>: '+roundTo(turnout, 1)+'% ('+numberWithCommas(votes_cast)+')</p>'
                    + '<p><strong>Registered voters</strong>: '+numberWithCommas(registered_voters)+'</p>'
                )
                .addTo(map)
        });
    }
}

// add results panel to the page
function fillOutResults(map) {
    var resultsHeader = document.getElementById('results-header');
    var resultsBody = document.getElementById('results-body');
    var resultsCaption = document.getElementById('results-caption');

    // DCCC 17
    if (map == 'dccc17') {
        resultsCaption.innerHTML = '<p class="results-caption">The <strong>top 14 candidates</strong> will be elected to the Democratic County Central Committee for Assembly District 17. Most candidates are a member of either the <span class="slate-prog-table">Labor and Working Families slate</span> and the <span class="slate-mod-table">Democrats for Change<span> slate.</p>';

        fetch('001_dccc17.geojson')
            .then(response => response.json())
            .then(data => {
                var dccc17Data = data.features;
                // define slates
                demsForChange = ['Emma Heiken', 'Lily Ho', 'Cedric Akbar', 'Nancy Tung', 'Michael Lai', 'Laurance Lem Lee', 'Peter Ho Lik Lee', 'Trevor Chandler', 'Carrie Barnes', 'Lyn Werbach', 'Joe Sangirardi', 'Luis Zamora', 'Matt Dorsey', 'Bilal Mahmood'];
                laborAndWorkingFamilies = ['Peter Gallotta', 'Kristin Hardy', 'John Avalos', 'Jeremy Lee', 'Vick Chung', 'Patrick Bell', 'Gloria Berry', 'Adolfo Velasquez', 'Michael Nguyen', 'Sydney Simpson', 'Joshua Rudy Ochoa', 'Sal Rosselli', 'Jane Kim', 'Anita Martinez'];
                unaffiliated = ['Frank Tizedes', 'Christopher Christensen'];
                allCandidates = demsForChange.concat(laborAndWorkingFamilies, unaffiliated);

                // sum votes for each candidate
                var candidateVotes = {};
                dccc17Data.forEach(feature => {
                    allCandidates.forEach(candidate => {
                        candidateVotes[candidate] = (candidateVotes[candidate] || 0) + feature.properties[candidate];
                    });
                });

                // total number of voters
                var totalVoters = 0;
                dccc17Data.forEach(feature => {
                    totalVoters += feature.properties.votes_cast;
                });

                // candidate percentages
                var candidatePercentages = {};
                allCandidates.forEach(candidate => {
                    candidatePercentages[candidate] = roundTo((candidateVotes[candidate] / totalVoters) * 100, 1);
                });

                // put together names, votes, and percentages in dictionary
                var candidateResults = {};
                allCandidates.forEach(candidate => {
                    candidateResults[candidate] = [candidateVotes[candidate], candidatePercentages[candidate]];
                });

                // sort by votes
                var sortedResults = Object.entries(candidateResults).sort((a, b) => b[1][0] - a[1][0]);

                // create a dictionary to map candidates to their slates
                var candidateSlateMap = {};
                demsForChange.forEach(candidate => {
                    candidateSlateMap[candidate] = 'slate-mod-table';
                });
                laborAndWorkingFamilies.forEach(candidate => {
                    candidateSlateMap[candidate] = 'slate-prog-table';
                });
                unaffiliated.forEach(candidate => {
                    candidateSlateMap[candidate] = 'slate-other-table';
                });

                // create 'winner' column - with value 'yes' for top 14 candidates, 'no' for the rest
                var candidateResultsWithWinner = {};
                sortedResults.forEach((result, index) => {
                    var candidate = result[0];
                    var votes = result[1][0];
                    var percentage = result[1][1];
                    var winner = index < 14 ? 'yes' : 'no';
                    var slate = candidateSlateMap[candidate]; // get slate information

                    candidateResultsWithWinner[candidate] = [votes, percentage, winner, slate];
                });

                // fill out results panel
                resultsHeader.innerHTML = '<h2 class="results-header">DCCC Assembly District&nbsp;17</h2>';
                resultsBody.innerHTML = '<table class="results-table">' +
                    '<tr><th><h4>Slates</h4></th><th><h4>Votes</h4></th></tr>' +
                    function() {
                        var demsForChangeVotes = demsForChange.reduce((a, b) => a + candidateVotes[b], 0);
                        var laborAndWorkingFamiliesVotes = laborAndWorkingFamilies.reduce((a, b) => a + candidateVotes[b], 0);
                        var unaffiliatedVotes = unaffiliated.reduce((a, b) => a + candidateVotes[b], 0);

                        var demsForChangePercentage = roundTo((demsForChangeVotes / (demsForChangeVotes + laborAndWorkingFamiliesVotes + unaffiliatedVotes)) * 100, 1);
                        var laborAndWorkingFamiliesPercentage = roundTo((laborAndWorkingFamiliesVotes / (demsForChangeVotes + laborAndWorkingFamiliesVotes + unaffiliatedVotes)) * 100, 1);
                        var unaffiliatedPercentage = roundTo((unaffiliatedVotes / (demsForChangeVotes + laborAndWorkingFamiliesVotes + unaffiliatedVotes)) * 100, 1);

                        // sort slates by votes
                        var slates = [
                            { 'name': 'Democrats for Change', 'votes': demsForChangeVotes, 'percentage': demsForChangePercentage, 'class': 'slate-mod-table' },
                            { 'name': 'Labor and Working Families', 'votes': laborAndWorkingFamiliesVotes, 'percentage': laborAndWorkingFamiliesPercentage, 'class': 'slate-prog-table' },
                            { 'name': 'Unaffiliated', 'votes': unaffiliatedVotes, 'percentage': unaffiliatedPercentage, 'class': 'slate-other-table' }
                        ];

                        slates.sort((a, b) => b.votes - a.votes);

                        return slates.map(slate => {
                            return '<tr class="' + slate.class + '"><td>' + slate.name + '</td><td>' + roundTo(slate.percentage, 1) + '% (' + numberWithCommas(slate.votes) + ')</td></tr>';
                        }).join('');
                    }() +
                    '<tr><th><h4>Candidates</h4></th><th><h4>Votes</h4></th></tr>' +
                    sortedResults.map(result => {
                        var candidate = result[0];
                        var votes = numberWithCommas(result[1][0]);
                        var percentage = result[1][1];
                        var winner = candidateResultsWithWinner[candidate][2] == 'yes' ? 'yes' : 'no';

                        // add classes based on the candidate's slate and winning status
                        var slateClass = candidateSlateMap[candidate];
                        var winnerClass = winner === 'yes' ? 'winner-yes' : '';

                        return '<tr class="' + slateClass + ' ' + winnerClass + '"><td>' + candidate + '</td><td>' + roundTo(percentage, 1) + '% (' + votes + ')</td></tr>';
                    }).join('') +
                    '</table>';
            }).then(() => {
                delay(250).then(() => pymChild.sendHeight());
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // DCCC 19
    if (map == 'dccc19') {
        resultsCaption.innerHTML = '<p class="results-caption">The <strong>top 10 candidates</strong> will be elected to the Democratic County Central Committee for Assembly District 19. Most candidates are a member of either the <span class="slate-prog-table">Labor and Working Families slate</span> and the <span class="slate-mod-table">Democrats for Change<span> slate.</p>';

        fetch('002_dccc19.geojson')
            .then(response => response.json())
            .then(data => {
                var dccc19Data = data.features;
                // define slates
                demsForChange = ['Parag Gupta', 'Michela Alioto-Pier', 'Jade Tu', 'Mike Chen', 'Dan Calamuci', 'Lanier Coles', 'Sara Barz', 'Catherine Stefani', 'Marjan Philhour', 'Brian Quan'];
                laborAndWorkingFamilies = ['Natalie Gee', 'Greg Hardeman', 'Frances Hsieh', 'Leah Lacroix', 'Sandra Lee Fewer', 'Connie Chan', 'Queena Chen', 'Mano Raju', 'Hene Kelly', 'Gordon Mar'];
                unaffiliated = ['Jen Nossokoff'];
                allCandidates = demsForChange.concat(laborAndWorkingFamilies, unaffiliated);

                // sum votes for each candidate
                var candidateVotes = {};
                dccc19Data.forEach(feature => {
                    allCandidates.forEach(candidate => {
                        candidateVotes[candidate] = (candidateVotes[candidate] || 0) + feature.properties[candidate];
                    });
                });

                // total number of voters
                var totalVoters = 0;
                dccc19Data.forEach(feature => {
                    totalVoters += feature.properties.votes_cast;
                });

                // candidate percentages
                var candidatePercentages = {};
                allCandidates.forEach(candidate => {
                    candidatePercentages[candidate] = roundTo((candidateVotes[candidate] / totalVoters) * 100, 1);
                });

                // put together names, votes, and percentages in dictionary
                var candidateResults = {};
                allCandidates.forEach(candidate => {
                    candidateResults[candidate] = [candidateVotes[candidate], candidatePercentages[candidate]];
                });

                // sort by votes
                var sortedResults = Object.entries(candidateResults).sort((a, b) => b[1][0] - a[1][0]);

                // create a dictionary to map candidates to their slates
                var candidateSlateMap = {};
                demsForChange.forEach(candidate => {
                    candidateSlateMap[candidate] = 'slate-mod-table';
                });
                laborAndWorkingFamilies.forEach(candidate => {
                    candidateSlateMap[candidate] = 'slate-prog-table';
                });
                unaffiliated.forEach(candidate => {
                    candidateSlateMap[candidate] = 'slate-other-table';
                });

                // create 'winner' column - with value 'yes' for top 14 candidates, 'no' for the rest
                var candidateResultsWithWinner = {};
                sortedResults.forEach((result, index) => {
                    var candidate = result[0];
                    var votes = result[1][0];
                    var percentage = result[1][1];
                    var winner = index < 10 ? 'yes' : 'no';
                    var slate = candidateSlateMap[candidate]; // get slate information

                    candidateResultsWithWinner[candidate] = [votes, percentage, winner, slate];
                });

                // fill out results panel
                resultsHeader.innerHTML = '<h2 class="results-header">DCCC Assembly District&nbsp;19</h2>';
                resultsBody.innerHTML = '<table class="results-table">' +
                    '<tr><th><h4>Slates</h4></th><th><h4>Votes</h4></th></tr>' +
                    function() {
                        var demsForChangeVotes = demsForChange.reduce((a, b) => a + candidateVotes[b], 0);
                        var laborAndWorkingFamiliesVotes = laborAndWorkingFamilies.reduce((a, b) => a + candidateVotes[b], 0);
                        var unaffiliatedVotes = unaffiliated.reduce((a, b) => a + candidateVotes[b], 0);

                        var demsForChangePercentage = roundTo((demsForChangeVotes / (demsForChangeVotes + laborAndWorkingFamiliesVotes + unaffiliatedVotes)) * 100, 1);
                        var laborAndWorkingFamiliesPercentage = roundTo((laborAndWorkingFamiliesVotes / (demsForChangeVotes + laborAndWorkingFamiliesVotes + unaffiliatedVotes)) * 100, 1);
                        var unaffiliatedPercentage = roundTo((unaffiliatedVotes / (demsForChangeVotes + laborAndWorkingFamiliesVotes + unaffiliatedVotes)) * 100, 1);

                        // sort slates by votes
                        var slates = [
                            { 'name': 'Democrats for Change', 'votes': demsForChangeVotes, 'percentage': demsForChangePercentage, 'class': 'slate-mod-table' },
                            { 'name': 'Labor and Working Families', 'votes': laborAndWorkingFamiliesVotes, 'percentage': laborAndWorkingFamiliesPercentage, 'class': 'slate-prog-table' },
                            { 'name': 'Unaffiliated', 'votes': unaffiliatedVotes, 'percentage': unaffiliatedPercentage, 'class': 'slate-other-table' }
                        ];

                        slates.sort((a, b) => b.votes - a.votes);

                        return slates.map(slate => {
                            return '<tr class="' + slate.class + '"><td>' + slate.name + '</td><td>' + roundTo(slate.percentage, 1) + '% (' + numberWithCommas(slate.votes) + ')</td></tr>';
                        }).join('');
                    }() +
                    '<tr><th><h4>Candidates</h4></th><th><h4>Votes</h4></th></tr>' +
                    sortedResults.map(result => {
                        var candidate = result[0];
                        var votes = numberWithCommas(result[1][0]);
                        var percentage = result[1][1];
                        var winner = candidateResultsWithWinner[candidate][2] == 'yes' ? 'yes' : 'no';

                        // add classes based on the candidate's slate and winning status
                        var slateClass = candidateSlateMap[candidate];
                        var winnerClass = winner === 'yes' ? 'winner-yes' : '';

                        return '<tr class="' + slateClass + ' ' + winnerClass + '"><td>' + candidate + '</td><td>' + roundTo(percentage, 1) + '% (' + votes + ')</td></tr>';
                    }).join('') +
                    '</table>';
            }).then(() => {
                delay(250).then(() => pymChild.sendHeight());
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Turnout
    if (map == 'turnout') {
        resultsCaption.innerHTML = '';

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
                console.log(turnout);

                // fill out results panel
                resultsBody.innerHTML = '<h4 class="results-text">' + turnout + '%</h4><p>' + numberWithCommas(totalVotesCast) + ' of ' + numberWithCommas(totalRegisteredVoters) + ' registered voters</p>';

            }).then(() => {
                delay(250).then(() => pymChild.sendHeight());
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

// set everything in motion the first time
addPopups('map_fill_001', '001_dccc17');
fillOutResults('dccc17');
document.getElementById('legend').innerHTML = '<img src="https://raw.githubusercontent.com/MissionLocal/interactives/main/docs/2024-march-dccc-results/legends/dccc_legend.svg">';
delay(250).then(() => pymChild.sendHeight());

// if screen is resized, send new height
window.addEventListener('resize', function() {
    delay(250).then(() => pymChild.sendHeight());
});
