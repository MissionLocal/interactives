mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY21kODNicGk4MHJ2bTJscHllaWJzcGRqeSJ9.X93mC8LCR-A1XxNY-bbPfA";

        // define basemap
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mlnow/clsnkxahw00nj01r9apk2awp0',
        zoom: 11,
        pitch: 0, // pitch in degrees
        bearing: 0, // bearing in degrees
        center: [-122.435, 37.762]
        });

        // function to define map layers information
        function mapLineFunction(mapID, visibility, source) {
            map.addLayer({
                id: mapID,
                type: "line",
                source: {
                    type: "geojson",
                    data: source,
                },
                layout: {
                    'visibility': visibility
                },
                paint: {
                    "line-color": "black",
                    "line-opacity": 1,
                    "line-width": 3.3
                }
            });
        }

        // function to define map fill information
        function mapFillFunction(mapID, visibility, source) {
            map.addLayer({
                id: mapID,
                type: "fill",
                source: {
                    type: "geojson",
                    data: source,
                },
                layout: {
                    'visibility': visibility
                },
                paint: {
                    // determine color by properties.DISTRICT value
                    "fill-color": ["match", ["get", "DISTRICT"],
                        "1", "#6b92ff",
                        "3", "#cb5074",
                        "5", "#00813d",
                        "7", "#ee6d65",
                        "9", "#ffc352",
                        "11", "#ff6fae",
                        "#000000"
                    ],
                    "fill-opacity": [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.7
                    ],
                }
            });
        }

        // function to define district label information
        function mapLabelFunction() {
            map.addLayer({
                id: "labels",
                type: "symbol",
                source: {
                    'type': "geojson",
                    'data': "map4ALabels.geojson",
                },
                layout: {
                    'visibility': "visible",
                    'text-field': ['get', 'name'],
                    'text-size': 28,
                },
                paint: {
                "text-color": 'black',
            }
            })
        }

        // load my map layers
        map.on("load", function () {
            map.addSource('map_fill_source', {
                type: 'geojson',
                data: 'districtMap.geojson'
            });

            mapLineFunction("map_line", "none", 'districtMap.geojson');
            mapFillFunction("map_fill", "visible", 'districtMap.geojson');
            mapLabelFunction();
        });

        // number formatting function
        function separator(numb) {
            var str = numb.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return str.join(".");
        }

        // send user to url
        map.on('click', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            if (district == "1") {
                window.top.location.href = "https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-1-supervisor-answers/";
            } else if (district == "3") {
                window.top.location.href = "https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-3-supervisor-answers/";
            } else if (district == "5") {
                window.top.location.href = "https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-5-supervisor-answers/";
            } else if (district == "7") {
                window.top.location.href = "https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-7-supervisor-answers/";
            } else if (district == "9") {
                window.top.location.href = "https://missionlocal.org/2024/01/meet-the-candidates-all-2024-district-9-supervisor-answers/";
            } else if (district == "11") {
                window.top.location.href = "https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-11-supervisor-answers/";
            }
            
        });
        map.on('mouseenter', 'map_fill', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'map_fill', function () {
            map.getCanvas().style.cursor = '';
        });

        // add navigation controls
        map.addControl(new mapboxgl.NavigationControl());

        // resize map when window is resized
        this.map.once('load', () => {
            this.map.resize();
        });
