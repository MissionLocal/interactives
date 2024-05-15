mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

    // define basemap
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mlnow/clsnkxahw00nj01r9apk2awp0',
    zoom: 10.85,
    pitch: 0,
    bearing: 0,
    center: [-122.453, 37.762],
    scrollZoom: false,
    dragPan: false,
    touchZoomRotate: false
    });

    // Define race breakdown data for each district, 
    //data source: https://sfgov.maps.arcgis.com/apps/webappviewer/index.html?id=57159538a9a3422a9d22ef75d66565b6
    var raceBreakdown = {
        "District 1": {
            "Asian": 41.25,
            "Black": 2.89,
            "Indigenous": 0.44,
            "Latino": 7.16,
            "White": 47.17
        },
        "District 3": {
            "Asian": 38.03,
            "Black": 3.85,
            "Indigenous": 0.78,
            "Latino": 6.95,
            "White": 49.43
        },
        "District 5": {
            "Asian": 20.75,
            "Black": 12.6,
            "Indigenous": 0.87,
            "Latino": 10.59,
            "White": 53.51
        },
        "District 7": {
            "Asian": 35,
            "Black": 4.01,
            "Indigenous": 0.4,
            "Latino": 11.2,
            "White": 48.21
        },
        "District 9": {
            "Asian": 25.34,
            "Black": 4.91,
            "Indigenous": 0.49,
            "Latino": 26.24,
            "White": 41.87
        },
        "District 11": {
            "Asian": 56.55,
            "Black": 5.39,
            "Indigenous": 0.19,
            "Latino": 21.12,
            "White": 15.85
        }		
    };

    // Define candidate information for each district
    var candidates = {
        "District 1": [
            {
                name: "Jeremiah Boehner",
                jobDescription: "Job: Marketing specialist and U.S. Army veteran",
                age: "Age: 39",
                residency: "Residency: Tenant, living in District 1 since 2006",
                transportation: "Transportation: Driving",
                education: "Education: University of San Francisco",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jeremiah-Boehner.png"
            },
            {
                name: "Connie Chan",
                jobDescription: "Job: Incumbent District 1 Supervisor",
                age: "Age: 45",
                residency: "Homeowner, living in District 1 since 2011",
                transportation: "Driving and walking",
                education: "Bachelor’s degree, University of California, Davis",
                languages: "Languages: English, Cantonese, Mandarin",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Connie-Chan.png"
            },
            {
                name: "Sherman D'Silva",
                jobDescription: "Job: Owner of a laundromat on Geary Boulevard",
                age: "Age: 51",
                residency: "Homeowner, living in District 1 since 1973",
                transportation: "Driving",
                education: "Bachelor’s degrees from San Francisco State University",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Sherman-DSilva.png"
            },
            {
                name: "Jen Nossokoff",
                jobDescription: "Job: Vice President of a healthcare company and physician assistant",
                age: "Age: 38",
                residency: "Homeowner, living in District 1 since 2020",
                transportation: "Walking, biking",
                education: "Bachelor’s degree from Colorado State University and master’s degree from Samuel Merritt University",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jen-Nossokoff.png"
            },
            {
                name: "Marjan Philhour",
                jobDescription: "Job: Business owner and former advisor and fundraiser to London Breed",
                age: "Age: 49",
                residency: "Residency: Homeowner, born in District 1 and moved back in 2006",
                transportation: "Transportation: Biking, walking, driving, and public transportation",
                education: "Education: Bachelor's degree from the University of California, Berkeley",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Marjan-Philhour.png"
            },
            
        ],
        "District 3": [
            {
                name: "Moe Jamil",
                jobDescription: "Job: Deputy City Attorney, San Francisco City Attorney's Office",
                residency: "Residency: A D3 resident since May 2014.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Moe-Jamil.png"
            },
            {
                name: "Sharon Lai",
                jobDescription: "Job: Economic recovery leader at the World Economic Forum, Former board member at the San Francisco Municipal Transportation Agency",
                residency: "Residency: A D3 resident since 2023.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Sharon-Lai.png"
            },
            {
                name: "Eduard Navarro",
                jobDescription: "Job: Tech startup founder",
                residency: "Residency: A D3 resident since Dec. 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/D3-Eduard-Navarro.png"
            },
            {
                name: "JConr B. Ortega",
                jobDescription: "Job: Self-described formerly homeless, Leatherman, boxer",
                residency: "Residency: A D3 resident since Dec. 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Jconr-B-Ortega.png"
            },
            {
                name: "Danny Sauter",
                jobDescription: "Job: Executive Director, Neighborhood Centers Together",
                residency: "Residency: A D3 resident since 2014.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Danny-Sauter.png"
            },
            {
                name: "Matthew Susk",
                jobDescription: "Former lead with Divvy homes",
                residency: "Residency: A D3 resident since 2023. Also a resident from 2007-2009 and 2014-2016.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Matthew-Susk-640x640.png",
            }
        ],
        "District 5": [
            {
                name: "Allen Jones",
                jobDescription: "Job: Activist",
                age: "Age: 67",
                residency: "Residency: Tenant, living in District 5 since Nov. 2021",
                transportation: "Transportation: Wheelchair",
                education: "Education: Teaching Bible studies at juvenile hall",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Allen-Jones.png"
            },
            {
                name: "Autumn Looijen",
                jobDescription: "Job: School board recall co-founder",
                age: "Age: 46",
                residency: "Residency: Tenant, landowner, living in District 5 since December 2020",
                transportation: "Transportation: Public transit",
                education: "Education: B.S. from CalTech",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Autumn-Looijen.png"
            },
            {
                name: "Bilal Mahmood",
                jobDescription: "Job: Founder of private and philanthropic organizations",
                age: "Age: 37",
                residency: "Residency: Tenant, living in District 5 since May 2023",
                transportation: "Transportation: Walking",
                education: "Education: B.S. from Stanford, M.Phil from University of Cambridge",
                languages: "Languages: English, Urdu",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Bilal-Mahmood.png"
            },
            {
                name: "Dean Preston",
                jobDescription: "Job: Incumbent, tenant attorney",
                age: "Age: 54",
                residency: "Residency: Homeowner, living in District 5 since 1996",
                transportation: "Transportation: Public transit",
                education: "Education: Bowdoin College and J.D. from UC Hastings",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Dean-Preston.png"
            }
        ],
        "District 7": [
            {
                name: "Matt Boschetto",
                jobDescription: "Job: Small business owner",
                age: "Age: 35",
                residency: "Residency: Homeowner, living in District 7 since 2014",
                education: "Education: BA in philosophy, Saint Mary’s College of California",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Matt-Boschetto.png"
            },
            {
                name: "Stephen Martin-Pinto",
                jobDescription: "Firefighter and major in the U.S. Marine Corps reserves",
                age: "Age: 46",
                residency: "Residency: Tenant in SF, Property owner and landlord in Lemon Grove, Ca., living in District 7’s Sunnyside since 2014 and, earlier from 1983 to 1998.",
                education: "UC Davis",
                languages: "Languages: Spanish, Russian, Georgian",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Stephen-Martin-Pinto.png"
            },
            {
                name: "Myrna Melgar",
                jobDescription: "Job: Incumbent District 7 Supervisor",
                age: "Age: 56",
                residency: "Residency: Homeowner, living in District 7’s Sunnyside since 2014 and, before that, from 1983 to 1988",
                transportation: "Transportation: Bike",
                education: "Education: BA, Excelsior College; MSUP, Columbia University",
                languages: "Languages: Spanish, French, Swedish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Myrna-Melgar.png"
            }
        ],
        "District 9": [
            {
                name: "Julian Bermudez",
                jobDescription: "Job: Works in and directs his family business, Rancho Grande Appliance",
                age: "Age: 27",
                residency: "Residency: Born in San Francisco in 1996, raised on and off in District 9 until he left for college in 2015, then the army in 2019 and now back, living in the Mission",
                transportation: "Transportation: Carpool/catch a ride",
                education: "Education: City College of San Francisco, Chico State University",
                languages: "Languages: English, Spanish",
                livingHistory: "Born in D9 in 1996 and raised on and off in the district until leaving for college in 2015 and the Army in 2019. Returned to the Mission after the Army.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Bermudez.png"
            },
            {
                name: "h brown",
                jobDescription: "Job: Retired special education teacher",
                age: "Age: 80",
                residency: "Residency: Tenant, at current address for nine years, redistricted into District 9 in April 2022",
                transportation: "Transportation: Walking",
                education: "Education: Bachelor’s in Education and Master’s in Special Education from Clemson University",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/hBrown.png"
            },
            {
                name: "Trevor Chandler",
                jobDescription: "Job: Public school teacher since 2023. Former director of government and public policy at Citizen, a public safety app",
                age: "Age: 37",
                residency: "Residency: Tenant, living in District 9 since July 2021",
                transportation: "Transportation: Public",
                education: "Education: Plymouth State University",
                languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Chandler.png"
            },
            {
                name: "Jackie Fielder",
                jobDescription: "Job: Nonprofit co-director at Stop the Money Pipeline. Former educator at San Francisco State University, co-founder of the San Francisco Public Bank Coalition. Democratic Socialist",
                age: "Age: 29",
                residency: "Residency: Tenant, Lived in District 9 September 2017 to June 2018, October 2019 to August 2020 and April 2021 to present",
                transportation: "Transportation: Public",
                education: "Education: Bachelor’s in public policy and master’s in sociology from Stanford University",
                languages: "Languages: English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9Fielder_2.png"
            },
            {
                name: "Jaime Gutierrez",
                jobDescription: "Job: Transit supervisor for SFMTA/MUNI",
                age: "Age: 57",
                residency: "Residency: Tenant, born in District 9 in 1967 and, except for three years spent in the Army, has resided here ever since",
                transportation: "Transportation: Bike",
                education: "Education: U.S. Army, City College of San Francisco, University of California, Berkeley",
                languages: "Languages: English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Gutierrez.png"
            },
            {
                name: "Roberto Hernandez",
                jobDescription: "Job: CEO, Cultura y Arte Nativa de Las Americas (CANA)",
                age: "Age: 67",
                residency: "Residency: Homeowner, born in the Mission in June 1956 and has not left",
                Languages: "Languages: English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Hernandez.png"
            },
            {
                name: "Michael Petrelis",
                jobDescription: "Job: AIDS and LGBTQ activist",
                residency: "Residency: Has lived on Clinton Park since May 1996, which became part of District 9 in April 2022",
                Languages: "Languages: English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Petrelis.png"
            },
            {
                name: "Stephen Torres",
                jobDescription: "Job: Bartender at Twin Peaks Tavern, customer service at Flowercraft Nursery and freelance writer",
                age: "Age: 46",
                residency: "Residency: Tenant, lived in District 9 Summer 2001 to Fall 2003, and returned in the Summer 2010",
                transportation: "Transportation: Public",
                education: "Education: Moorpark Community College and San Francisco City College as work has permitted",
                languages: "Languages: English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Torres.png"
            }
        ],
        "District 11": [
            {
                name: "Chyanne Chen",
                jobDescription: "Job: Worker organizer, community facilitator & educator",
                age: "Age: 39",
                residency: "Residency: Homeowner, landlord, living in District 11 since August 2000",
                transportation: "Transportation: Walk, public transportation, rideshare, and car",
                education: "Education: Bachelor’s degree from University of California, Davis, master’s degree from Cornell University, doctoral degree in education in progress at University of Illinois Urbana-Champaign",
                languages: "Languages: English, Mandarin, Cantonese",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Chyanne-Chen.png"
            },
            {
                name: "Adlah Chisti",
                jobDescription: "Job: Public policy analyst, caregiver",
                age: "Age: 40",
                residency: "Residency: Live with parents and caregive for them, born in District 11 in 1983 and lived there since, moved out in 2013 and back in 2017",
                transportation: "Transportation: Public",
                education: "Education: Bachelor’s degree in politics and in dnvironmental science and master’s degree in education from University of San Francisco, master’s degree in public policy from Georgetown McCourt School of Public Policy, juris doctorate from University of California Law, San Francisco",
                languages: "Languages: English, Spanish, Hindi",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Adlah-Chisti.png"
            },
            {
                name: "Ernest “E.J.” Jones",
                jobDescription: "Job: Community Advocate",
                age: "Age: 38",
                residency: "Residency: Living in District 11 since November 1985 and has lived here always, except for time away at college",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Ernest-Jones.png"
            },
            {
                name: "Michael Lai",
                jobDescription: "Job: Early education director, elected to the San Francisco Democratic Party",
                age: "Age: 31",
                residency: "Residency: Tenant, living in District 11 since February 2024",
                transportation: "Transportation: Public",
                education: "Education: Bachelor’s degree in government at Harvard College with coursework at Harvard Graduate School of Education",
                languages: "Languages: English, Mandarin",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/04/Michael-Lai.png"
            },
            {
                name: "Roger Marenco",
                jobDescription: "Job: Transit operator",
                age: "Age: 42",
                residency: "Residency: Tenant, living in District 11 since May 2014",
                transportation: "Transportation: Public",
                education: "Education: Bachelor’s degree in environmental sustainability and social justice from San Francisco State University. City College San Francisco",
                languages: "Languages: English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Roger-Marenco.png"
            },
            {
                name: "Jose Morales",
                jobDescription: "Job: Sales professional, small business owner",
                age: "Age: 28",
                residency: "Residency: Tenant, born in District 11 in 1995 and has lived there since, except for time away in college from 2014 to 2017 and living in Idaho from 2021 to the end of 2022",
                transportation: "Transportation: Car",
                education: "Education: Bachelor’s degree in economics from Sonoma State University",
                languages: "Languages: English, Spanish",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/05/Jose-Morales.png"
            }
        ]
    };

    // Define district information and URLs
    var districtInfo = {
        "District 1": {
            intro: "Four candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed to run</span> against incumbent Supervisor Connie Chan in District 1, which spans the Richmond, Lone Mountain, Golden Gate Park, Lincoln Park and the University of San Francisco. Read the District 1 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-1-supervisor-answers/'>here</span>." 
        },
        "District 3": {
            intro: "Because Supervisor Aaron Peskin terms out next January, five candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed to run</span> for the seat to lead District 3, which includes North Beach, Chinatown, Union Square, the Financial District, Russian Hill and Nob Hill. Read the District 3 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-3-supervisor-answers/'>here</span>." 
        },
        "District 5": {
            intro: "Three candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed to run</span> against incumbent Supervisor Dean Preston to lead District 5. The district saw big changes during the 2022 redistricting, and now spans from the east end of Golden Gate Park through Haight-Ashbury, Japantown and the Western Addition, the Lower Haight and Hayes Valley, and most of the Tenderloin. Read the District 5 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-5-supervisor-answers/'>here</span>."
        },
        "District 7": {
            intro: "In District 7, which includes the Inner Sunset, Parkmerced and West Portal, Matt Boschetto and Stephen Martin-Pinto are running against incumbent Myrna Melgar. Read the District 7 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-7-supervisor-answers/'>here</span>."
        },
        "District 9": {
            intro: "With Hilary Ronen leaving her post this year — and her aide, Santiago Lerma, <span class='districtLink' data-url='https://missionlocal.org/2023/10/santiago-lerma-hillary-ronen-aide-confirms-he-wont-run-for-her-d9-seat/'>opting out of the race</span> to replace her — the field is wide open to challengers from all corners in District 9, which encompasses the Mission, Bernal Heights and the Portola. Eleven hopefuls have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed for candidacy</span>, and eight are actively campaigning, making District 9 the most heavily contested in the city. Read the District 9 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/01/meet-the-candidates-all-2024-district-9-supervisor-answers/'>here</span>."
        },
        "District 11": {
            intro: "District 11 Supervisor Ahsha Safaí is termed out — and running for mayor — and, so far, seven candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#board-of-supervisors-district-11'>thrown their hats in the ring</span> to replace him as the representative of the Excelsior, Oceanview and Outer Mission. We are able to identify and talk to five of the candidates. Read the District 11 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-11-supervisor-answers/'>here</span>." 
        }
    };

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
                "fill-color": ["match",     
                    ["get", "DISTRICT"],
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
                ]
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
        });
    }

    map.on("load", function () {
        map.addSource('map_fill_source', {
            type: 'geojson',
            data: 'districtMap.geojson'
        });

        mapLineFunction("map_line", "none", 'districtMap.geojson');
        mapFillFunction("map_fill", "visible", 'districtMap.geojson');
        mapLabelFunction();

        updateContent("District 1");

        map.on('click', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("District " + district);

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });

        map.on('touchstart', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("District " + district);

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });        

        var popup;

        map.on('mouseenter', 'map_fill', function (e) {
            var district = e.features[0].properties.DISTRICT;
            map.setFeatureState({ source: 'map_fill_source', id: district }, { hover: true });

            var breakdown = raceBreakdown["District " + district];
            var popupContent = "<h4>District " + district + "</h4>";
            for (var race in breakdown) {
                popupContent += "<p>" + race + ": " + breakdown[race] + "%</p>";
            }
            popupContent += "</div>";

            // If there's already a popup, remove it
            if (popup) {
                popup.remove();
            }

            popup = new mapboxgl.Popup({
                closeButton: false,
                offset: [0, -10]
            })
                .setLngLat(e.lngLat)
                .setHTML(popupContent)
                .addTo(map);

            map.setPaintProperty('map_fill', 'fill-outline-color', [
                'case',
                ['==', ['get', 'DISTRICT'], district],
                'black',
                'transparent'
            ]);
            map.setPaintProperty('map_fill', 'fill-outline-width', 2);
        });

        map.on('mouseleave', 'map_fill', function () {
            var features = map.queryRenderedFeatures({ layers: ['map_fill'] });
            if (features.length > 0) {
                var district = features[0].properties.DISTRICT;
                map.setFeatureState({ source: 'map_fill_source', id: district }, { hover: false });
            }

            // If there's a popup, remove it
            if (popup) {
                popup.remove();
                popup = null;
            }

            map.setPaintProperty('map_fill', 'fill-outline-width', 0);
        });

        // resize map when window is resized
        this.map.once('load', () => {
            this.map.resize();
        });


    });


    // number formatting function
    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

    // Function to update content based on the clicked district
    function updateContent(district) {
        var container = document.getElementById("results-body");
        container.innerHTML = "";
        
        // Check if the district exists in the districtInfo object
        if (districtInfo.hasOwnProperty(district)) {
            // Create and append intro paragraph
            var introParaElement = document.createElement("p");
            introParaElement.innerHTML = districtInfo[district].intro;
            introParaElement.classList.add("intro-para");
            container.appendChild(introParaElement);
        } else {
            container.textContent = "No information found for " + district;
        }

        // Check if the district exists in the candidates object
        if (candidates.hasOwnProperty(district)) {
            // Update the header with the clicked district name
            document.getElementById("results-header").textContent = district;

            // Iterate over candidates for the selected district
            candidates[district].forEach(function(candidate) {
                // Div for each candidate information
                var candidateDiv = document.createElement("div");
                candidateDiv.classList.add("candidate-info");

                // Candidate portraits
                var image = document.createElement("img");
                image.classList.add("candidates");
                image.src = candidate.imageURL;
                image.style.width = "70px";
                image.style.height = "auto";
                image.style.marginTop = "7px";
                image.style.alignSelf = "flex-start"; 
                candidateDiv.appendChild(image);

                // Div for candidate details
                var detailsDiv = document.createElement("div");
                detailsDiv.classList.add("candidate-details");

                // Candidate name
                var nameParagraph = document.createElement("p");
                nameParagraph.textContent = candidate.name;
                nameParagraph.classList.add("candidate-name");
                detailsDiv.appendChild(nameParagraph);

                // Candidate job description
                var jobParagraph = document.createElement("p");
                jobParagraph.textContent = candidate.jobDescription;
                jobParagraph.classList.add("candidate-job");
                detailsDiv.appendChild(jobParagraph);

                // Candidate age
                var ageParagraph = document.createElement("p");
                ageParagraph.textContent = candidate.age;
                ageParagraph.classList.add("candidate-age");
                detailsDiv.appendChild(ageParagraph);

                // Candidate residency
                var residencyParagraph = document.createElement("p");
                residencyParagraph.textContent = candidate.residency;
                residencyParagraph.classList.add("candidate-residency");
                detailsDiv.appendChild(residencyParagraph);

                // Candidate transportation
                var transportationParagraph = document.createElement("p");
                transportationParagraph.textContent = candidate.transportation;
                transportationParagraph.classList.add("candidate-transportation");
                detailsDiv.appendChild(transportationParagraph);

                // Candidate education
                var educationParagraph = document.createElement("p");
                educationParagraph.textContent = candidate.education;
                educationParagraph.classList.add("candidate-education");
                detailsDiv.appendChild(educationParagraph);

                // Candidate languages
                var languagesParagraph = document.createElement("p");
                languagesParagraph.textContent = candidate.languages;
                languagesParagraph.classList.add("candidate-languages");
                detailsDiv.appendChild(languagesParagraph);

                // Append the details div to the candidate div
                candidateDiv.appendChild(detailsDiv);

                // Append the candidate div to the container
                container.appendChild(candidateDiv);
            });
        } else {
            container.textContent = "No candidates found for " + district;
        }

        // Add event listeners to all links with the 'districtLink' class
        var links = document.getElementsByClassName("districtLink");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", handleLinkClick);
        }
    }

    // Event handler for link clicks (same as before)
    function handleLinkClick() {
        var url = this.getAttribute('data-url');
        window.open(url, '_blank');

    }

    // add navigation controls
    map.addControl(new mapboxgl.NavigationControl());