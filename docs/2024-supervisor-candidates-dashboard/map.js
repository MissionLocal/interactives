mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

        // define basemap
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mlnow/clsnkxahw00nj01r9apk2awp0',
        zoom: 11,
        pitch: 0,
        bearing: 0,
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

        map.on("load", function () {
            map.addSource('map_fill_source', {
                type: 'geojson',
                data: 'districtMap.geojson'
            });
        
            mapLineFunction("map_line", "none", 'districtMap.geojson');
            mapFillFunction("map_fill", "visible", 'districtMap.geojson');
            mapLabelFunction();
        
            updateContent("District 1");
        });
        

        // number formatting function
        function separator(numb) {
            var str = numb.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return str.join(".");
        }

        // Define candidate information for each district
        var candidates = {
            "District 1": [
                {
                    name: "Jeremiah Boehner",
                    jobDescription: "Marketing specialist",
                    livingHistory: "Living in District 1 since 2006",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jeremiah-Boehner.png"
                },
                {
                    name: "Connie Chan",
                    jobDescription: "Incumbent District 1 Supervisor",
                    livingHistory: "Living in District 1 since 2011",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Connie-Chan.png"
                },
                {
                    name: "Sherman D'Silva",
                    jobDescription: "Owner of a laundromat on Geary Boulevard",
                    livingHistory: "Born in District 1 in 1973 and lived there since",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Sherman-DSilva.png"
                },
                {
                    name: "Jen Nossokoff",
                    jobDescription: "Vice President of a healthcare company and physician assistant",
                    livingHistory: "Living in District 1 since 2020",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jen-Nossokoff.png"
                },
                {
                    name: "Marjan Philhour",
                    jobDescription: "Business owner and former advisor and fundraiser to London Breed",
                    livingHistory: "Born in District 1 and moved back in 2006",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Marjan-Philhour.png"
                },
                
            ],
            "District 3": [
                {
                    name: "Moe Jamil",
                    jobDescription: "Deputy City Attorney, San Francisco City Attorney's Office",
                    livingHistory: "",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Moe-Jamil.png"
                },
                {
                    name: "Sharon Lai",
                    jobDescription: "Economic recovery leader at the World Economic Forum, former board member at the San Francisco Municipal Transportation Agency",
                    livingHistory: "",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Sharon-Lai.png"
                },
                {
                    name: "Eduard Navarro",
                    jobDescription: "Tech startup founder",
                    livingHistory: "",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/D3-Eduard-Navarro.png"
                },
                {
                    name: "JConr B. Ortega",
                    jobDescription: "Self-described formerly homeless, leatherman, boxer",
                    livingHistory: "",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Jconr-B-Ortega.png"
                },
                {
                    name: "Danny Sauter",
                    jobDescription: "Executive Director, Neighborhood Centers Together",
                    livingHistory: "",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Danny-Sauter.png"
                }
            ],
            "District 5": [
                {
                    name: "Allen Jones",
                    jobDescription: "",
                    livingHistory: "Living in D5 since Nov. 2021",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Allen-Jones.png"
                },
                {
                    name: "Autumn Looijen",
                    jobDescription: "",
                    livingHistory: "Living in D5 since Dec. 2020",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Autumn-Looijen.png"
                },
                {
                    name: "Bilal Mahmood",
                    jobDescription: "",
                    livingHistory: "Living in D5 since May 2023, lived adjacent since May 2021",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Bilal-Mahmood.png"
                },
                {
                    name: "Dean Preston",
                    jobDescription: "",
                    livingHistory: "Living in D5 since 1996",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Dean-Preston.png"
                }
            ],
            "District 7": [
                {
                    name: "Matt Boschetto",
                    jobDescription: "Small business owner",
                    livingHistory: "Living in District 7 since 2014",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Matt-Boschetto.png"
                },
                {
                    name: "Stephen Martin-Pinto",
                    jobDescription: "Firefighter and major in the U.S. Marine Corps reserves",
                    livingHistory: "Living in Sunnyside since 2014, and before from 1983 to 1998",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Stephen-Martin-Pinto.png"
                },
                {
                    name: "Myrna Melgar",
                    jobDescription: "Incumbent District 7 Supervisor",
                    livingHistory: "Living in District 7 since 2011. Before that, attended San Francisco State University and lived on campus.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Myrna-Melgar.png"
                }
            ],
            "District 9": [
                {
                    name: "Julian Bermudez",
                    jobDescription: "Works in and directs his family business, Rancho Grande Appliance. Tenant.",
                    livingHistory: "Born SF in 1996, raised on and off the D9 until he left for college in 2015, then the army in 2019 and now back, living in the Mission.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Bermudez.png"
                },
                {
                    name: "h brown",
                    jobDescription: "Retired special education teacher. Tenant.",
                    livingHistory: "At current address for nine years, redistricted into D9 in April 2022",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/hBrown.png"
                },
                {
                    name: "Trevor Chandler",
                    jobDescription: "Substitute teacher at SFUSD. Former director of government and public policy at Citizen, a public safety app. Tenant.",
                    livingHistory: "Has lived in D9 since July 2021",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Chandler.png"
                },
                {
                    name: "Jackie Fielder",
                    jobDescription: "Former educator at San Francisco State University, co-founder of the San Francisco Public Bank Coalition. Democratic Socialist. Tenant.",
                    livingHistory: "Lived in D9 Sept. 2017 to June 2018, Oct. 2019 to Aug. 2020 and April 2021 to present.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9Fielder_2.png"
                },
                {
                    name: "Jaime Gutierrez",
                    jobDescription: "Transit supervisor for SFMTA/MUNI. Tenant.",
                    livingHistory: "Most recently, has lived here since Oct. 1991.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Gutierrez.png"
                },
                {
                    name: "Roberto Hernandez",
                    jobDescription: "CEO, Cultura y Arte Nativa de Las Americas (CANA). Homeowner.",
                    livingHistory: "Born in the Mission in June 1956 and has not left.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Hernandez.png"
                },
                {
                    name: "Michael Petrelis",
                    jobDescription: "AIDS and LGBTQ activist.",
                    livingHistory: "Has lived on Clinton Park since May 1996, which became part of D9 in April 2022.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Petrelis.png"
                },
                {
                    name: "Stephen Torres",
                    jobDescription: "LGBTQ activist, producer and journalist.",
                    livingHistory: "Lived in D9 Summer 2001 to Fall 2003 and returned in the Summer 2010.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Torres.png"
                }
            ],
            "District 11": [
                {
                    name: "Chyanne Chen",
                    jobDescription: "Worker Organizer, Community Facilitator & Educator",
                    livingHistory: "Living in D11 since Aug. 2000",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Chyanne-Chen.png"
                },
                {
                    name: "Adlah Chisti",
                    jobDescription: "Public Policy Analyst /Caregiver",
                    livingHistory: "Born in D11 in 1983 and lived there since. Moved out in 2013 and back in 2017.",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Adlah-Chisti.png"
                },
                {
                    name: "Ernest “E.J.” Jones",
                    jobDescription: "Community Advocate",
                    livingHistory: "Living in D11 since Nov. 1985 and have lived here always except for time away at college",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Ernest-Jones.png"
                },
                {
                    name: "Roger Marenco",
                    jobDescription: "Transit Operator",
                    livingHistory: "Living in D11 since May 2014",
                    imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Roger-Marenco.png"
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
                intro: "District 11 Supervisor Ahsha Safaí is termed out — and running for mayor — and, so far, four candidates have <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#board-of-supervisors-district-11'>thrown their hats in the ring</span> to replace him as the representative of the Excelsior, Oceanview and Outer Mission. Read the District 11 \"Meet the Candidates\" series <span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-11-supervisor-answers/'>here</span>." 
            }
        };

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

                    // Candidate living history
                    var livingHistoryParagraph = document.createElement("p");
                    livingHistoryParagraph.textContent = candidate.livingHistory;
                    livingHistoryParagraph.classList.add("candidate-living");
                    detailsDiv.appendChild(livingHistoryParagraph);

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
            window.location.href = url;
        }

        map.on('click', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("District " + district);
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