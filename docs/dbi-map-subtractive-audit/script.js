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
        // color green if 'in_audit' is 'Yes', else color red
        ['case',
            ['==', ['get', 'in_audit'], 'Yes'], '#06b7b2',
            '#e54c4c'
        ],
        "circle-opacity": 0.8,
        'circle-radius': {
            'base': 1,
            'stops': [
            [11.5, 2],
            [16, 5],
            [22, 30]
            ]
            },
        },
    }
    return mapDetails;
}

// Function to create and open a popup
function createPopup(features, coordinates) {
    var address = features.address;
    var who = features.who;
    var url = features.url;

    if (openPopup) {
        openPopup.remove();
        openPopup = null;
    }

    openPopup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('<h4>' + address + '</h4>' +
            '<p><strong>Who was involved here?</strong><br>' + who +
            '<p><a target="_blank" href="' + url + '">Investigate the property</a></p>'
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

// fetch the GeoJSON data for search
fetch('data.geojson')
.then(response => response.json())
.then(data => {
    var features = data.features;
    var searchBar = document.getElementById('search-bar')
    var resultsContainer = document.getElementById('results-container')

    // checkbox control
    function handleCheckboxChange(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                checkboxArray.push(checkboxId);
            } else {
                checkboxArray = checkboxArray.filter(id => id !== checkboxId);
            }
            filterMap(checkboxArray);
        });
    }
    handleCheckboxChange('curran');
    handleCheckboxChange('santos');
    handleCheckboxChange('yu');
    handleCheckboxChange('pada');

    function filterMap(checkboxArray) {
        if (checkboxArray.length === 0) {
            map.setFilter('data', ['none', ['==', 'who', '']]);
        } else {
            // Build the filter dynamically based on selected checkboxes
            var filter = ['all'];
            checkboxArray.forEach(function (checkboxId) {
                filter.push(['==', checkboxId, 'Yes']);
            });
            map.setFilter('data', filter);
        }
    }

    // if user types in search bar, search for matches
    document.getElementById('search-bar').addEventListener('keyup', function (e) {
        var resultItems = document.getElementsByClassName('result-item');
        var highlightedIndex = getHighlightedIndex(resultItems);

        // route depending on which key is pressed
        if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
            handleArrowKey(resultItems, highlightedIndex, e.key);
        }
        if (e.key == 'Enter') {
            handleEnterKey(resultItems, highlightedIndex);
        }
        if (e.key != 'ArrowDown' && e.key != 'ArrowUp' && e.key != 'Enter') {
            searchBarControl(e.key, searchBar, resultsContainer, features);
        }

        // if arrow key up or down, highlight the result
        function handleArrowKey(resultItems, highlightedIndex, key) {
            var isThereAHighlight = highlightedIndex !== -1;
        
            if (isThereAHighlight) {
                resultItems[highlightedIndex].classList.remove('highlighted');
            }
        
            var newIndex =
                key == 'ArrowDown'
                    ? (highlightedIndex + 1) % resultItems.length
                    : (highlightedIndex - 1 + resultItems.length) % resultItems.length;
        
            resultItems[newIndex].classList.add('highlighted');
        }

        // if enter, zoom to location
        function handleEnterKey(resultItems, highlightedIndex) {
            resultsContainer.style.display = 'none';
            highlight = resultItems[highlightedIndex];
            if (highlight) {
                var result = highlight.innerText;
            } else {
                var result = $('.result-item').first().text();
            }
            for (var i = 0; i < features.length; i++) {
                var title = features[i].properties.address;
                if (title == result) {
                    searchBar.value = title;
                    var coordinates = features[i].geometry.coordinates;
                    map.flyTo({
                        center: coordinates,
                        zoom: 18,
                        pitch: 60,
                    });

                    // remove old popup and create new one
                    if (openPopup) {
                        openPopup.remove();
                        openPopup = null;
                    }
                    var address = features[i].properties.address;
                    var who = features[i].properties.who;
                    var url = features[i].properties.url;
                    openPopup = new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML('<h4>'+address+'</h4>'
                            + '<p><strong>Who was involved here?</strong><br>'+who
                            + '<p><a target="_blank" href="'+url+'">Investigate the property</a></p>'
                            )
                        .addTo(map);
                }
            }
        }

        function getHighlightedIndex(resultItems) {
            for (var i = 0; i < resultItems.length; i++) {
                if (resultItems[i].classList.contains('highlighted')) {
                    return i;
                }
            }
            return -1;
        }
    });
});

// search bar function
function searchBarControl(key, searchBar, resultsContainer, features) {
    var matches = [];

    for (var i = 0; i < features.length; i++) {
        var title = features[i].properties.address;
        var searchTerm = searchBar.value.toLowerCase();

        // calculate a relevance score for the match
        var score = calculateRelevance(title.toLowerCase(), searchTerm);

        if (score > 0) {
            matches.push({ title: title, score: score });
        }
    }

    // Sort matches based on the relevance score
    matches.sort((a, b) => b.score - a.score);

    // Display top five partial matches
    if (searchBar.value.length === 0) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
    }
    if (searchBar.value.length > 0) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'block';

        for (var i = 0; i < 5; i++) {
            if (matches[i] === undefined) {
                break;
            }
            var resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = matches[i].title;
            resultsContainer.appendChild(resultItem);
        }

        if (matches.length === 0) {
            var resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = 'No match found.';
            resultsContainer.appendChild(resultItem);
        }
    }

    // if user clicks outside of search bar, hide results
    document.addEventListener('click', function (e) {
        if (e.target != searchBar) {
            resultsContainer.style.display = 'none';
            isSearchBarSelected = false;
        }
    });

    // if user clicks on search bar, show results
    searchBar.addEventListener('click', function (e) {
        if (!isSearchBarSelected) {
            isSearchBarSelected = true; // bit daft but fixes the bug
            if (matches.length !== 0) {
                searchBarControl(e.key, searchBar, resultsContainer, features);
                resultsContainer.style.display = 'block';
            }
        }
    });
    
    // if user clicks on a result, zoom to that location
    resultsContainer.addEventListener('click', function (e) {
        if (matches.length !== 0) {
            const clickedItem = e.target.closest('.result-item');
            if (clickedItem) {
                resultsContainer.style.display = 'none';
                const result = clickedItem.textContent;
                for (let i = 0; i < features.length; i++) {
                    const title = features[i].properties.address;
                    if (title === result) {
                        searchBar.value = title;
                        const coordinates = features[i].geometry.coordinates;
                        map.flyTo({
                            center: coordinates,
                            zoom: 18,
                            pitch: 60,
                        });
    
                        if (openPopup) {
                            openPopup.remove();
                            openPopup = null;
                        }
                        const { address, who, url } = features[i].properties;
                        openPopup = new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(`<h4>${address}</h4>
                                <p><strong>Who was involved here?</strong><br>${who}
                                <p><a target="_blank" href="${url}">Investigate the property</a></p>`
                            )
                            .addTo(map);
                    }
                }
            }
        }
    });
}

// calculate the relevance score of a match
function calculateRelevance(title, searchTerm) {
    if (title === searchTerm) {
        return 3; // Exact match
    } else if (title.startsWith(searchTerm)) {
        return 2; // Match at the beginning of the string
    } else if (title.includes(searchTerm)) {
        return 1; // Partial match
    } else {
        return 0; // No match
    }
}

// add navigation control, resize map on load
map.addControl(new mapboxgl.NavigationControl());
this.map.once('load', () => {
    this.map.resize();
});
