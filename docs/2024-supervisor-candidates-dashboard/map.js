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
                jobDescription: "Marketing specialist and U.S. Army veteran",
                age: "39",
                residency: "Tenant, living in District 1 since 2006",
                transportation: "Driving",
                education: "University of San Francisco",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jeremiah-Boehner.png"
            },
            {
                name: "Connie Chan",
                jobDescription: "Incumbent District 1 Supervisor",
                age: "45",
                residency: "Homeowner, living in District 1 since 2011",
                transportation: "Driving and walking",
                education: "Bachelor’s degree, University of California, Davis",
                languages: "English, Cantonese, Mandarin",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Connie-Chan.png"
            },
            {
                name: "Sherman D'Silva",
                jobDescription: "Owner of a laundromat on Geary Boulevard",
                age: "51",
                residency: "Homeowner, living in District 1 since 1973",
                transportation: "Driving",
                education: "Bachelor’s degrees from San Francisco State University",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Sherman-DSilva.png"
            },
            {
                name: "Jen Nossokoff",
                jobDescription: "Vice President of a healthcare company and physician assistant",
                age: "38",
                residency: "Homeowner, living in District 1 since 2020",
                transportation: "Walking, biking, public transportation, driving",
                education: "Bachelor’s degree from Colorado State University and master’s degree from Samuel Merritt University",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jen-Nossokoff.png"
            },
            {
                name: "Marjan Philhour",
                jobDescription: "Business owner and former advisor and fundraiser to London Breed",
                age: "50",
                residency: "Homeowner, born in District 1 and moved back in 2006",
                transportation: "Biking, walking, driving, and public transportation",
                education: "Bachelor's degree from the University of California, Berkeley",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Marjan-Philhour.png"
            },
            
        ],
        "District 3": [
            {
                name: "Wendy Ha Chau",
                jobDescription: "Attorney",
                age: "44",
                residency: "Tenant in District 3 since 2009",
                transportation: "Walking",
                education: "Juris doctor degree from John F. Kennedy University",
                languages: "English",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/06/Wendy-Ha-Chau.png"
            },
            {
                name: "Moe Jamil",
                jobDescription: "Deputy city attorney, San Francisco City Attorney's Office",
                age: "46",
                residency: "Owner-occupied condo owner, living in District 3 since May 2014",
                transportation: "Walking",
                education: "University of California, Berkeley, and law school at Santa Clara University, K-12 public school",
                languages: "English, Cantonese",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Moe-Jamil.png"
            },
            {
                name: "Sharon Lai",
                jobDescription: "Economic recovery leader at the World Economic Forum, former board member at the San Francisco Municipal Transportation Agency",
                age: "41",
                residency: "Tenant and owner, living in District 3 since 2023, first moved to SF in 2005",
                transportation: "Multi-modal: walk and muni when solo, drive when with kids",
                education: "Bachelor's degree from University of California, Berkeley, development studies and city and regional planning; master's degree in public administration, Harvard Kennedy School",
                languages: "English, Mandarin, Cantonese",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Sharon-Lai.png"
            },
            {
                name: "Eduard Navarro",
                jobDescription: "Tech startup founder",
                age: "44",
                residency: "Tenant, living in District 3 since December 2021",
                transportation: "Walking, public transportation",
                education: "CFA Institute: Chartered Financial Analyst, passed level 1. Master's degree from Columbia University, architecture, concentration in urban design. Master's degree from Columbia University, real estate development, concentrating in finance. Ecole d’Architecture de La Villette. Bachelor's degree in architecture from Georgia Institute of Technology",
                languages: "Spanish, French, German, English, Valèncian (Catalan)",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/D3-Eduard-Navarro.png"
            },
            {
                name: "Danny Sauter",
                jobDescription: "Executive Director, Neighborhood Centers Together",
                age: "36",
                residency: "Tenant, living in District 3 since 2014",
                transportation: "Public transportation",
                education: "Bachelor's degree from Miami University",
                languages: "English, Cantonese",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Danny-Sauter.png"
            },
            {
                name: "Matthew Susk",
                jobDescription: "Former lead with Divvy homes",
                age: "32",
                residency: "TIC owner, first moved to District 3 in 2007. 2007-2009 while in high school, 2014-2016 after college, 2023-present with his wife",
                transportation: "Walking",
                education: "Bachelor's degree from St. Lawrence University, master's in business from Georgetown University",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Matthew-Susk-640x640.png",
            }
        ],
        "District 5": [
            {
                name: "Scotty Jacobs",
                jobDescription: "Marketing",
                age: "30",
                residency: "Tenant in District 5 since November 2022, homeowner",
                transportation: "Public bicycle",
                education: "Bachelor’s degree from Washington University",
                languages: "English",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/06/Scotty-Jacobs.png"
            },
            {
                name: "Allen Jones",
                jobDescription: "Activist",
                age: "67",
                residency: "Tenant in District 5 since November 2021",
                transportation: "Wheelchair",
                education: "Teaching Bible studies at juvenile hall",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Allen-Jones.png"
            },
            {
                name: "Autumn Looijen",
                jobDescription: "School board recall co-founder",
                age: "46",
                residency: "Tenant in District 5 since December 2020, landowner",
                transportation: "Public transit",
                education: "Bachelor's degree from California Institute of Technology",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Autumn-Looijen.png"
            },
            {
                name: "Bilal Mahmood",
                jobDescription: "Founder of private and philanthropic organizations",
                age: "37",
                residency: "Tenant in District 5 since May 2023",
                transportation: "Walking",
                education: "Bachelor's degree from Stanford University, master's in philosophy from University of Cambridge",
                languages: "English, Urdu",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Bilal-Mahmood.png"
            },
            {
                name: "Dean Preston",
                jobDescription: "Incumbent, tenant attorney",
                age: "54",
                residency: "Homeowner, living in District 5 since 1996",
                transportation: "Public transit",
                education: "Bachelor's degree from Bowdoin College, juris doctor degree from University of California Law, San Francisco",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Dean-Preston.png"
            }
        ],
        "District 7": [
            {
                name: "Matthew Boschetto",
                jobDescription: "Small business owner",
                age: "35",
                residency: "Homeowner, living in District 7 since 2014",
                education: "Bachelor's degree in philosophy, Saint Mary’s College of California",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Matt-Boschetto.png"
            },
            {
                name: "Stephen Martin-Pinto",
                jobDescription: "Firefighter/major, U.S. Marine Corps",
                age: "46",
                residency: "Tenant in SF, Property owner and landlord in Lemon Grove, California, living in District 7’s Sunnyside since 2014 and, earlier from 1983 to 1998",
                education: "University of California, Davis",
                languages: "English, Spanish, Russian, Georgian",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Stephen-Martin-Pinto.png"
            },
            {
                name: "Myrna Melgar",
                jobDescription: "District 7 Supervisor",
                age: "56",
                residency: "Homeowner, living in District 7’s Sunnyside since 2014 and, before that, from 1983 to 1988",
                transportation: "Bike",
                education: "Bachelor's degree from Excelsior College, master's degree in urban planning from Columbia University",
                languages: "English, Spanish, French, Swedish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Myrna-Melgar.png"
            },
            {
                name: "Edward Yee",
                jobDescription: "Retired surgeon",
                age: "74",
                residency: "Homeowner, living in District 7 since 1981",
                transportation: "Walking, Muni and, rarely car",
                education: "Bachelor of Science, University of California, Berkeley; Doctor of Medicine, University of California, San Francisco; Master of Public Health, UC Berkeley",
                languages: "English, Cantonese",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/09/D7-Edward-Yee.png"
            }
        ],
        "District 9": [
            {
                name: "Julian Bermudez",
                jobDescription: "Works in and directs his family business, Rancho Grande Appliance",
                age: "27",
                residency: "Tenant, lived in District 9 September 2017 to June 2018, October 2019 to August 2020 and April 2021 to present",
                transportation: "Carpool/catch a ride",
                education: "City College of San Francisco, Chico State University",
                languages: "English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Bermudez.png"
            },
            {
                name: "h brown",
                jobDescription: "Retired special education teacher",
                age: "80",
                residency: "Tenant, at current address for nine years, redistricted into District 9 in April 2022",
                transportation: "Walking",
                education: "Bachelor’s degree in education and master’s degree in special education from Clemson University",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/hBrown.png"
            },
            {
                name: "Trevor Chandler",
                jobDescription: "Public school teacher since 2023. Former director of government and public policy at Citizen, a public safety app",
                age: "37",
                residency: "Tenant, living in District 9 since July 2021",
                transportation: "Public",
                education: "Plymouth State University",
                languages: "English",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Chandler.png"
            },
            {
                name: "Jackie Fielder",
                jobDescription: "Nonprofit co-director at Stop the Money Pipeline. Former educator at San Francisco State University, co-founder of the San Francisco Public Bank Coalition. Democratic Socialist",
                age: "29",
                residency: "Tenant, Lived in District 9 September 2017 to June 2018, October 2019 to August 2020 and April 2021 to present",
                transportation: "Public",
                education: "Bachelor’s in public policy and master’s in sociology from Stanford University",
                languages: "English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9Fielder_2.png"
            },
            {
                name: "Jaime Gutierrez",
                jobDescription: "Transit supervisor for SFMTA/Muni",
                age: "57",
                residency: "Tenant, born in District 9 in 1967 and, except for three years spent in the Army, has resided here ever since",
                transportation: "Bike",
                education: "U.S. Army, City College of San Francisco, University of California, Berkeley",
                languages: "English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Gutierrez.png"
            },
            {
                name: "Roberto Hernandez",
                jobDescription: "CEO, Cultura y Arte Nativa de Las Americas (CANA)",
                age: "67",
                residency: "Homeowner, born in the Mission in June 1956 and has not left",
                transportation: "Car and bicycle",
                education: "Bachelor's degree in sociology from University of San Francisco",
                Languages: "English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Hernandez.png"
            },
            {
                name: "Stephen Torres",
                jobDescription: "Bartender at Twin Peaks Tavern, customer service at Flowercraft Nursery and freelance writer",
                age: "46",
                residency: "Tenant, lived in District 9 Summer 2001 to Fall 2003, and returned in the summer of 2010",
                transportation: "Public",
                education: "Moorpark Community College and San Francisco City College as work has permitted",
                languages: "English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Torres.png"
            }
        ],
        "District 11": [
            {
                name: "Chyanne Chen",
                jobDescription: "Worker organizer, community facilitator & educator",
                age: "39",
                residency: "Homeowner, landlord, living in District 11 since August 2000",
                transportation: "Walk, public transportation, rideshare, and car",
                education: "Bachelor’s degree from University of California, Davis, master’s degree from Cornell University, doctoral degree in education in progress at University of Illinois Urbana-Champaign",
                languages: "English, Mandarin, Cantonese",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Chyanne-Chen.png"
            },
            {
                name: "Adlah Chisti",
                jobDescription: "Public policy analyst, caregiver",
                age: "40",
                residency: "Live with parents and caregive for them, born in District 11 in 1983 and lived there since, moved out in 2013 and back in 2017",
                transportation: "Public",
                education: "Bachelor’s degree in politics and in dnvironmental science and master’s degree in education from University of San Francisco, master’s degree in public policy from Georgetown McCourt School of Public Policy, juris doctorate from University of California Law, San Francisco",
                languages: "English, Spanish, Hindi",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Adlah-Chisti.png"
            },
            {
                name: "Oscar Flores",
                jobDescription: "Project engineer",
                age: "29",
                residency: "Tenant, born in District 11 in 1995 and has lived here continuously, except for the time away in college",
                transportation: "Car",
                education: "Bachelor’s in mechanical engineering from the University of Portsmouth in United Kingdom, and a master’s (postgraduate certificate) in Space Engineering from the University of Surrey in United Kingdom",
                languages: "Spanish, French, English",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/09/D11-Oscar-Flores.png"
            },
            {
                name: "Ernest “E.J.” Jones",
                jobDescription: "Community Advocate",
                age: "38",
                residency: "Living in District 11 since November 1985 and has lived here always, except for time away at college",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Ernest-Jones.png"
            },
            {
                name: "Michael Lai",
                jobDescription: "Early education director, elected to the San Francisco Democratic Party",
                age: "31",
                residency: "Tenant, living in District 11 since February 2024",
                transportation: "Transportation: Public",
                education: "Bachelor’s degree in government at Harvard College with coursework at Harvard Graduate School of Education",
                languages: "English, Mandarin",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/04/Michael-Lai.png"
            },
            {
                name: "Roger Marenco",
                jobDescription: "Transit operator",
                age: "42",
                residency: "Tenant, living in District 11 since May 2014",
                transportation: "Public",
                education: "Bachelor’s degree in environmental sustainability and social justice from San Francisco State University. City College San Francisco",
                languages: "English, Spanish",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Roger-Marenco.png"
            },
            {
                name: "Jose Morales",
                jobDescription: "Sales professional, small business owner",
                age: "28",
                residency: "Tenant, born in District 11 in 1995 and has lived there since, except for time away in college from 2014 to 2017 and living in Idaho from 2021 to the end of 2022",
                transportation: "Transportation: Car",
                education: "Bachelor’s degree in economics from Sonoma State University",
                languages: "English, Spanish",
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
            intro: "Because Supervisor Aaron Peskin terms out next January, six candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed to run</span> for the seat to lead District 3, which includes North Beach, Chinatown, Union Square, the Financial District, Russian Hill and Nob Hill. Read the District 3 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-3-supervisor-answers/'>here</span>." 
        },
        "District 5": {
            intro: "Four candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed to run</span> against incumbent Supervisor Dean Preston to lead District 5. The district saw big changes during the 2022 redistricting, and now spans from the east end of Golden Gate Park through Haight-Ashbury, Japantown and the Western Addition, the Lower Haight and Hayes Valley, and most of the Tenderloin. Read the District 5 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-5-supervisor-answers/'>here</span>."
        },
        "District 7": {
            intro: "In District 7, which includes the Inner Sunset, Parkmerced and West Portal, Matt Boschetto and Stephen Martin-Pinto are running against incumbent Myrna Melgar. Read the District 7 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-7-supervisor-answers/'>here</span>."
        },
        "District 9": {
            intro: "With Hilary Ronen leaving her post this year — and her aide, Santiago Lerma, <span class='districtLink' data-url='https://missionlocal.org/2023/10/santiago-lerma-hillary-ronen-aide-confirms-he-wont-run-for-her-d9-seat/'>opting out of the race</span> to replace her — the field is wide open to challengers from all corners in District 9, which encompasses the Mission, Bernal Heights and the Portola. Eleven hopefuls have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>filed for candidacy</span>, and eight are actively campaigning, making District 9 the most heavily contested in the city. Read the District 9 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/01/meet-the-candidates-all-2024-district-9-supervisor-answers/'>here</span>."
        },
        "District 11": {
            intro: "District 11 Supervisor Ahsha Safaí is termed out — and running for mayor — and, so far, seven candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#board-of-supervisors-district-11'>thrown their hats in the ring</span> to replace him as the representative of the Excelsior, Oceanview and Outer Mission. Six of the candidates are actively campaigning. Read the District 11 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-11-supervisor-answers/'>here</span>." 
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
    
        var popup;
    
        function removePopup() {
            if (popup) {
                popup.remove();
                popup = null;
            }
        }
    
        function createPopupContent(district) {
            var breakdown = raceBreakdown["District " + district];
            var popupContent = "<h4>District " + district + "</h4>";
            for (var race in breakdown) {
                popupContent += "<p>" + race + ": " + breakdown[race] + "%</p>";
            }
            return popupContent;
        }
    
        function onFeatureClick(e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("District " + district);
            removePopup(); // Optionally, you may want to keep the popup open on click
        }
    
        function onFeatureHover(e) {
            var district = e.features[0].properties.DISTRICT;
            map.setFeatureState({ source: 'map_fill_source', id: district }, { hover: true });
    
            var popupContent = createPopupContent(district);
    
            removePopup(); // Remove any existing popup
    
            popup = new mapboxgl.Popup({
                closeButton: false,
                offset: [0, 10] // Adjust offset to position the popup better
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
        }
    
        function onFeatureLeave() {
            var features = map.queryRenderedFeatures({ layers: ['map_fill'] });
            if (features.length > 0) {
                var district = features[0].properties.DISTRICT;
                map.setFeatureState({ source: 'map_fill_source', id: district }, { hover: false });
            }
    
            removePopup();
            map.setPaintProperty('map_fill', 'fill-outline-width', 0);
        }
    
        map.on('click', 'map_fill', onFeatureClick);
        map.on('touchstart', 'map_fill', onFeatureClick);
        map.on('mouseenter', 'map_fill', onFeatureHover);
        map.on('mousemove', 'map_fill', onFeatureHover);
        map.on('mouseleave', 'map_fill', onFeatureLeave);
        map.on('touchend', 'map_fill', onFeatureLeave);
    
        // Resize map when window is resized
        map.once('load', () => {
            map.resize();
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
            jobParagraph.innerHTML = "<strong>Job:</strong> " + candidate.jobDescription;
            jobParagraph.classList.add("candidate-job");
            detailsDiv.appendChild(jobParagraph);

            // Candidate age
            var ageParagraph = document.createElement("p");
            ageParagraph.innerHTML = "<strong>Age:</strong> " + candidate.age;
            ageParagraph.classList.add("candidate-age");
            detailsDiv.appendChild(ageParagraph);

            // Candidate residency
            var residencyParagraph = document.createElement("p");
            residencyParagraph.innerHTML = "<strong>Residency:</strong> " + candidate.residency;
            residencyParagraph.classList.add("candidate-residency");
            detailsDiv.appendChild(residencyParagraph);

            // Candidate transportation
            var transportationParagraph = document.createElement("p");
            transportationParagraph.innerHTML = "<strong>Transportation:</strong> " + candidate.transportation;
            transportationParagraph.classList.add("candidate-transportation");
            detailsDiv.appendChild(transportationParagraph);

            // Candidate education
            var educationParagraph = document.createElement("p");
            educationParagraph.innerHTML = "<strong>Education:</strong> " + candidate.education;
            educationParagraph.classList.add("candidate-education");
            detailsDiv.appendChild(educationParagraph);

            // Candidate languages
            var languagesParagraph = document.createElement("p");
            languagesParagraph.innerHTML = "<strong>Languages:</strong> " + candidate.languages;
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