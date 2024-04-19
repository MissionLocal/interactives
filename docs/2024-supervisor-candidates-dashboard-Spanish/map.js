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
        "Distrito 1": {
            "Asiáticos": 41.25,
            "Negros": 2.89,
            "Indígenas": 0.44,
            "Latinos": 7.16,
            "Blancos": 47.17
        },
        "Distrito 3": {
            "Asiáticos": 38.03,
            "Negros": 3.85,
            "Indígenas": 0.78,
            "Latinos": 6.95,
            "Blancos": 49.43
        },
        "Distrito 5": {
            "Asiáticos": 20.75,
            "Negros": 12.6,
            "Indígenas": 0.87,
            "Latinos": 10.59,
            "Blancos": 53.51
        },
        "Distrito 7": {
            "Asiáticos": 35,
            "Negros": 4.01,
            "Indígenas": 0.4,
            "Latinos": 11.2,
            "Blancos": 48.21
        },
        "Distrito 9": {
            "Asiáticos": 25.34,
            "Negros": 4.91,
            "Indígenas": 0.49,
            "Latinos": 26.24,
            "Blancos": 41.87
        },
        "Distrito 11": {
            "Asiáticos": 56.55,
            "Negros": 5.39,
            "Indígenas": 0.19,
            "Latinos": 21.12,
            "Blancos": 15.85
        }		
    };

    // Define candidate information for each district
    var candidates = {
        "Distrito 1": [
            {
                name: "Jeremiah Boehner",
                jobDescription: "Especialista en Marketing",
                livingHistory: "Residente del D1 desde 2006.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jeremiah-Boehner.png"
            },
            {
                name: "Connie Chan",
                jobDescription: "Supervisora actual del Distrito 1",
                livingHistory: "Residente del  D1 desde 2011.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Connie-Chan.png"
            },
            {
                name: "Sherman D'Silva",
                jobDescription: "Propietario de una lavandería en Geary Boulevard",
                livingHistory: "Nació en el D1 y nunca se marchó.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Sherman-DSilva.png"
            },
            {
                name: "Jen Nossokoff",
                jobDescription: "Vicepresidenta de una empresa de atención sanitaria y asistente médico",
                livingHistory: "Residente del D1 desde 2020.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jen-Nossokoff.png"
            },
            {
                name: "Marjan Philhour",
                jobDescription: "Empresaria y antigua asesora y recaudadora de fondos de London Breed",
                livingHistory: "Nació en el D1 y regresó en 2006.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Marjan-Philhour.png"
            },
            
        ],
        "Distrito 3": [
            {
                name: "Moe Jamil",
                jobDescription: "Fiscal Adjunto de la Ciudad, Oficina del Fiscal de la Ciudad de San Francisco",
                livingHistory: "Residente del D3 desde mayo de 2014.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Moe-Jamil.png"
            },
            {
                name: "Sharon Lai",
                jobDescription: "Líder de recuperación económica en el Foro Económico Mundial, exmiembro del consejo de la Agencia Municipal de Transporte de San Francisco",
                livingHistory: "Residente del D3 desde 2023.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Sharon-Lai.png"
            },
            {
                name: "Eduard Navarro",
                jobDescription: "Fundador de una empresa tecnológica",
                livingHistory: "Residente del D3 desde diciembre de 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/D3-Eduard-Navarro.png"
            },
            {
                name: "JConr B. Ortega",
                jobDescription: "Autodenominado ex-sin techo, vaquero, boxeador",
                livingHistory: "Residente del D3 desde diciembre de 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Jconr-B-Ortega.png"
            },
            {
                name: "Danny Sauter",
                jobDescription: "Director Ejecutivo, Neighborhood Centers Together",
                livingHistory: "Residente del D3 desde 2014.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Danny-Sauter.png"
            },
            {
                name: "Matthew Susk",
                jobDescription: "Antiguo líder de hogares Divvy",
                livingHistory: "Residente del D3 desde 2023. También residente de 2007-2009 y 2014-2016.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Matthew-Susk-640x640.png",
            }
        ],
        "Distrito 5": [
            {
                name: "Allen Jones",
                jobDescription: "",
                livingHistory: "Residente del D5 desde noviembre de 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Allen-Jones.png"
            },
            {
                name: "Autumn Looijen",
                jobDescription: "",
                livingHistory: "Residente del D5 desde diciembre de 2020.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Autumn-Looijen.png"
            },
            {
                name: "Bilal Mahmood",
                jobDescription: "",
                livingHistory: "Residente del D5 desde mayo de 2023, vivió en un distrito vecino en mayo de 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Bilal-Mahmood.png"
            },
            {
                name: "Dean Preston",
                jobDescription: "",
                livingHistory: "Residente del D5 desde 1996.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Dean-Preston.png"
            }
        ],
        "Distrito 7": [
            {
                name: "Matt Boschetto",
                jobDescription: "Pequeño empresario",
                livingHistory: "Residente del D7 desde 2014.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Matt-Boschetto.png"
            },
            {
                name: "Stephen Martin-Pinto",
                jobDescription: "Bombero y comandante en la reserva del Cuerpo de Marines de los Estados Unidos.",
                livingHistory: "Residente del D7 desde 2014. También residente de 1983 a 1998.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Stephen-Martin-Pinto.png"
            },
            {
                name: "Myrna Melgar",
                jobDescription: "Supervisora actual del Distrito 7",
                livingHistory: "Residente del D7desde 2011. Antes de eso, vivió en el campus de la SFSU.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Myrna-Melgar.png"
            }
        ],
        "Distrito 9": [
            {
                name: "Julian Bermudez",
                jobDescription: "Trabaja y dirige su empresa familiar, Rancho Grande Appliance. Arrendatario.",
                livingHistory: "Se mudó a la Misión en 2011, se fue a la universidad, regresó en 2019, regresó a la Misión despues del Ejército.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Bermudez.png"
            },
            {
                name: "h brown",
                jobDescription: "Profesor jubilado de educación especial. Arrendatario.",
                livingHistory: "En la dirección actual durante 9 años, redistribuida al Distrito 9 en abril de 2022.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/hBrown.png"
            },
            {
                name: "Trevor Chandler",
                jobDescription: "Profesor de escuela pública en el SFUSD desde 2023. Exdirector de gobierno y política pública en Citizen, una aplicación de seguridad pública. Arrendatario.",
                livingHistory: "Ha vivido en el Distrito 9 desde julio de 2021.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Chandler.png"
            },
            {
                name: "Jackie Fielder",
                jobDescription: "Ex profesora de la Universidad Estatal de San Francisco, cofundadora de la Coalición de Bancos Públicos de San Francisco. Socialista demócrata. Arrendataria.",
                livingHistory: "Vivió en el Distrito 9, de septiembre de 2017 a junio de 2018, de octubre de 2019 a agosto de 2020 y de abril de 2021 a la actualidad.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9Fielder_2.png"
            },
            {
                name: "Jaime Gutierrez",
                jobDescription: "Supervisor de tránsito de SFMTA/MUNI. Arrendatario.",
                livingHistory: "Residente del D9 desde octubre de 1991.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Gutierrez.png"
            },
            {
                name: "Roberto Hernandez",
                jobDescription: "Director General de Cultura y Arte Nativa de Las Américas (CANA). Propietario.",
                livingHistory: "Nació en la Misión en junio de 1956 y no se ha ido.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Hernandez.png"
            },
            {
                name: "Michael Petrelis",
                jobDescription: "Activista contra el SIDA y LGBTQ.",
                livingHistory: "Vive en Clinton Park desde mayo de 1996, que pasó a formar parte del D9 en abril de 2022.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Petrelis.png"
            },
            {
                name: "Stephen Torres",
                jobDescription: "Activista LGBTQ, productor y periodista.",
                livingHistory: "Vivió en el D9 del verano de 2001 al otoño de 2003 y regresó en el verano de 2010.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Torres.png"
            }
        ],
        "Distrito 11": [
            {
                name: "Chyanne Chen",
                jobDescription: "Coordinadora de trabajadores, facilitadora comunitaria y educadora.",
                livingHistory: "Residente del D11 desde agosto de 2000.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Chyanne-Chen.png"
            },
            {
                name: "Adlah Chisti",
                jobDescription: "Analista de políticas públicas / Cuidadora",
                livingHistory: "Nació en D11 en 1983, se mudó en 2013 y regresó en 2017.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Adlah-Chisti.png"
            },
            {
                name: "Ernest “E.J.” Jones",
                jobDescription: "Defensor de la Comunidad",
                livingHistory: "Residente del D11 desde noviembre de 1985, salvo los años que pasó en la universidad.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Ernest-Jones.png"
            },
            {
                name: "Michael Lai",
                jobDescription: "",
                livingHistory: "",
                imageURL: "https://newspack-missionlocal.s3.amazonaws.com/mission/wp-content/uploads/2024/04/Michael-Lai.png"
            },
            {
                name: "Roger Marenco",
                jobDescription: "Operador de tránsito",
                livingHistory: "Residente del D11 desde mayo de 2014.",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Roger-Marenco.png"
            }
        ]
    };

    // Define district information and URLs
    var districtInfo = {
        "Distrito 1": {
            intro: "Cuatro candidatos se han presentado <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>para competir contra</span> la actual supervisora Connie Chan en el Distrito 1, que abarca Richmond, Lone Mountain, Golden Gate Park, Lincoln Park y la Universidad de San Francisco. Lea la serie \"Conozca a los candidatos\" del Distrito 1 <span class='districtLink' data-url='https://missionlocal.org/2024/02/conozca-a-los-candidatos-contienda-electoral-para-supervisor-del-distrito-1-de-san-francisco/'>aquí</span>." 
        },
        "Distrito 3": {
            intro: "Dado que el supervisor Aaron Peskin dejará el cargo el próximo mes de enero, cinco candidatos se <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>han presentado</span> para ocupar el puesto que dirigirá el Distrito 3, que incluye North Beach, Chinatown, Union Square, el Distrito Financiero, Russian Hill y Nob Hill. Lea <span class='districtLink' data-url='https://missionlocal.org/2024/02/conozca-a-los-candidatos-contienda-electoral-para-supervisor-del-distrito-3-de-san-francisco/'>aquí</span> la serie \"Conozca a los candidatos\" del Distrito 3." 
        },
        "Distrito 5": {
            intro: "Tres candidatos se han presentado <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>para competir</span> contra el actual Supervisor Dean Preston para dirigir el Distrito 5. El distrito vio grandes cambios durante la redistribución de 2022, y ahora se extiende desde el extremo este del parque Golden Gate a través de Haight-Ashbury, Japantown y la adición occidental, el Lower Haight y Hayes Valley, y la mayor parte de Tenderloin. Lea <span class='districtLink' data-url='https://missionlocal.org/2024/02/conozca-a-los-candidatos-contienda-electoral-para-supervisor-del-distrito-5-de-san-francisco-2/'>aquí</span> la serie \"Conozca a los candidatos\" del Distrito 5."
        },
        "Distrito 7": {
            intro: "En el Distrito 7, que incluye Inner Sunset, Parkmerced y West Portal, Matt Boschetto y Stephen Martin-Pinto se enfrentan a Myrna Melgar actual supervisora. Lea la serie \"Conozca a los candidatos\" del Distrito 7 <span class='districtLink' data-url='https://missionlocal.org/2024/02/conozca-a-los-candidatos-contienda-electoral-para-supervisor-del-distrito-7-de-san-francisco/'>aquí</span>."
        },
        "Distrito 9": {
            intro: "Con Hilary Ronen dejando su puesto este año - y su ayudante, Santiago Lerma, ha optado <span class='districtLink' data-url='https://missionlocal.org/2023/10/santiago-lerma-hillary-ronen-aide-confirms-he-wont-run-for-her-d9-seat/'>por no participar en la contienda</span> para reemplazarla - el escenario está abierto a los aspirantes de todos los rincones en el Distrito 9, que abarca la Misión, Bernal Heights y Portola. Once aspirantes han <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>presentado su candidatura</span>, y ocho están haciendo campaña activamente, por lo que el Distrito 9 es el más disputado de la ciudad. Lea la serie \"Conozca a los candidatos\" del Distrito 9 <span class='districtLink' data-url='https://missionlocal.org/2024/01/conozca-a-los-candidatos-contienda-electoral-para-supervisor-del-distrito-9-de-san-francisco/'>aquí</span>."
        },
        "Distrito 11": {
            intro: "El supervisor del distrito 11, Ahsha Safaí, ha dejado el cargo, para contender por la alcaldía, y de momento, siete candidatos se han <span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#board-of-supervisors-district-11'>lanzado al ruedo</span> para sustituirlo como representante de Excelsior, Oceanview y Outer Mission. Hemos podido identificar y hablar con cinco de los candidatos. Lea la serie \"Conozca a los candidatos\" del Distrito 11 <span class='districtLink' data-url='https://missionlocal.org/2024/02/conozca-a-los-candidatos-contienda-electoral-para-supervisor-del-distrito-11-de-san-francisco/'>aquí</span>."
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

        updateContent("Distrito 1");

        map.on('click', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("Distrito " + district);

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });

        map.on('touchstart', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("Distrito " + district);

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });        

        var popup;

        map.on('mouseenter', 'map_fill', function (e) {
            var district = e.features[0].properties.DISTRICT;
            map.setFeatureState({ source: 'map_fill_source', id: district }, { hover: true });

            var breakdown = raceBreakdown["Distrito " + district];
            var popupContent = "<h4>Distrito " + district + "</h4>";
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
        window.open(url, '_blank');

    }

    // add navigation controls
    map.addControl(new mapboxgl.NavigationControl());