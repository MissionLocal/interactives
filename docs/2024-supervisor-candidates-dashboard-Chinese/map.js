mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

    // define basemap
    var map = new mapboxgl.Map({
    container: ''map'',
    style: ''mapbox://styles/mlnow/clsnkxahw00nj01r9apk2awp0'',
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
        "第1選區": {
            "亞裔": 41.25,
            "黑人或非洲裔": 2.89,
            "原住民": 0.44,
            "拉美裔": 7.16,
            "白人": 47.17
        },
        "第3選區": {
            "亞裔": 38.03,
            "黑人或非洲裔": 3.85,
            "原住民": 0.78,
            "拉美裔": 6.95,
            "白人": 49.43
        },
        "第5選區": {
            "亞裔": 20.75,
            "黑人或非洲裔": 12.6,
            "原住民": 0.87,
            "拉美裔": 10.59,
            "白人": 53.51
        },
        "第7選區": {
            "亞裔": 35,
            "黑人或非洲裔": 4.01,
            "原住民": 0.4,
            "拉美裔": 11.2,
            "白人": 48.21
        },
        "第9選區": {
            "亞裔": 25.34,
            "黑人或非洲裔": 4.91,
            "原住民": 0.49,
            "拉美裔": 26.24,
            "白人": 41.87
        },
        "第11選區": {
            "亞裔": 56.55,
            "黑人或非洲裔": 5.39,
            "原住民": 0.19,
            "拉美裔": 21.12,
            "白人": 15.85
        }		
    };

    // Define candidate information for each district
    var candidates = {
        "第1選區": [
            {
                name: "Jeremiah Boehner",
                jobDescription: "市場營銷專家",
                livingHistory: "自 2006 年以來一直居住在第 1 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jeremiah-Boehner.png"
            },
            {
                name: "Connie Chan",
                jobDescription: "現任第1選區市參事",
                livingHistory: "自 2011 年以來一直居住在第 1 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Connie-Chan.png"
            },
            {
                name: "Sherman D''Silva",
                jobDescription: "Geary大道上一家洗衣店店主",
                livingHistory: "一位從未離開過的第 1 選區本地人。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Sherman-DSilva.png"
            },
            {
                name: "Jen Nossokoff",
                jobDescription: "一家醫療保健公司的副總裁和醫生助理",
                livingHistory: "自 2020 年以來一直居住在第 1 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jen-Nossokoff.png"
            },
            {
                name: "Marjan Philhour",
                jobDescription: "企業主、現任市長倫敦·佈裡德的前顧問和籌款人",
                livingHistory: "生於第 1 選區，2006 年搬回第 1 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Marjan-Philhour.png"
            },
            
        ],
        "第3選區": [
            {
                name: "Moe Jamil",
                jobDescription: "舊金山市檢察院副檢察長",
                livingHistory: "自 2014 年 5 月以來一直居住在第 3 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Moe-Jamil.png"
            },
            {
                name: "Sharon Lai",
                jobDescription: "世界經濟論壇經濟複蘇領導人、舊金山市政交通局前董事會成員",
                livingHistory: "自 2023 年以來一直居住在第 3 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Sharon-Lai.png"
            },
            {
                name: "Eduard Navarro",
                jobDescription: "科技創業公司創始人",
                livingHistory: "自 2021 年以來一直居住在第 3 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/D3-Eduard-Navarro.png"
            },
            {
                name: "JConr B. Ortega",
                jobDescription: "自稱曾經無家可歸、皮革匠、拳擊手",
                livingHistory: "自 2021 年 12 月以來一直居住在第 3 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Jconr-B-Ortega.png"
            },
            {
                name: "Danny Sauter",
                jobDescription: "Neighborhood Centers Together組織執行主任",
                livingHistory: "自 2014 年以來一直居住在第 3 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Danny-Sauter.png"
            },
            {
                name: "Matthew Susk",
                jobDescription: "Divvy Homes的前負責人",
                livingHistory: "自 2023 年以來一直居住在第 3 選區。2007-2009 年和 2014-2016 年也住在第 3 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Matthew-Susk-640x640.png",
            }
        ],
        "第5選區": [
            {
                name: "Allen Jones",
                jobDescription: "",
                livingHistory: "自 2021 年 11 月以來一直居住在第 5 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Allen-Jones.png"
            },
            {
                name: "Autumn Looijen",
                jobDescription: "",
                livingHistory: "自 2020 年 12 月以來一直居住在第 5 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Autumn-Looijen.png"
            },
            {
                name: "Bilal Mahmood",
                jobDescription: "",
                livingHistory: "自 2023 年 5 月以來一直居住在第 5 選區。之前在 2021 年 5 月曾住在相鄰的選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Bilal-Mahmood.png"
            },
            {
                name: "Dean Preston",
                jobDescription: "",
                livingHistory: "自 1996 年以來一直居住在第 5 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Dean-Preston.png"
            }
        ],
        "第7選區": [
            {
                name: "Matt Boschetto",
                jobDescription: "小企業主",
                livingHistory: "自 2014 年以來一直居住在第 7 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Matt-Boschetto.png"
            },
            {
                name: "Stephen Martin-Pinto",
                jobDescription: "消防員和美國海軍陸戰隊預備役少校",
                livingHistory: "自 2014 年以來一直居住在第 7 選區。之前在 1983-1998 年間也曾居住在第 7 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Stephen-Martin-Pinto.png"
            },
            {
                name: "Myrna Melgar",
                jobDescription: "現任第 7 選區市參事",
                livingHistory: "自 2011 年以來一直居住在第 7 選區。此前，住在舊金山州立大學校園內。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Myrna-Melgar.png"
            }
        ],
        "第9選區": [
            {
                name: "Julian Bermudez",
                jobDescription: "在家族企業 Rancho Grande Appliance 工作並擔任領導。租戶。",
                livingHistory: "1996 年出生於第 9 選區，從小到大在該區斷斷續續住過，直到 2015 年上大學和 2019 年參軍。退伍後回到本區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Bermudez.png"
            },
            {
                name: "h brown",
                jobDescription: "退休特殊教育教師。租戶。",
                livingHistory: "已在現住址居住 9 年，2022 年 4 月重新劃分到第 9 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/hBrown.png"
            },
            {
                name: "Trevor Chandler",
                jobDescription: "舊金山公立學校代課教師。曾任公共安全應用程序 Citizen 的政府和公共政策總監。租戶。",
                livingHistory: "自 2021 年 7 月以來一直居住在第 9 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Chandler.png"
            },
            {
                name: "Jackie Fielder",
                jobDescription: "前舊金山州立大學教育家，舊金山公共銀行聯盟創始人之一。民主社會主義者。租戶。",
                livingHistory: "2017 年 9 月至 2018 年 6 月、2019 年 10 月至 2020 年 8 月、2021 年 4 月至今住在第 9 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9Fielder_2.png"
            },
            {
                name: "Jaime Gutierrez",
                jobDescription: "SFMTA/Muni 的交通主管。租戶。",
                livingHistory: "最近，自 1991 年 10 月起住在第 9 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Gutierrez.png"
            },
            {
                name: "Roberto Hernandez",
                jobDescription: "Cultura y Arte Nativa de Las Americas (CANA) 首席執行官。業主。",
                livingHistory: "1956 年 6 月出生在本區的米慎區，至今沒有離開過。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Hernandez.png"
            },
            {
                name: "Michael Petrelis",
                jobDescription: "艾滋病和性少數群體活動家",
                livingHistory: "自 1996 年 5 月起住在克林頓公園，2022 年 4 月成爲第 9 選區的一份子",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Petrelis.png"
            },
            {
                name: "Stephen Torres",
                jobDescription: "性少數群體活動家、製片人和記者。",
                livingHistory: "2001 年夏季至 2003 年秋季住在第 9 選區，2010 年夏季返回。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Torres.png"
            }
        ],
        "第11選區": [
            {
                name: "Chyanne Chen",
                jobDescription: "工人組織者、社區促進者和教育者",
                livingHistory: "自 2000 年 8 月以來一直居住在第 11 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Chyanne-Chen.png"
            },
            {
                name: "Adlah Chisti",
                jobDescription: "公共政策分析師、護理人員",
                livingHistory: "1983 年出生於第 11 選區，2013 年搬出，2017 年搬回。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Adlah-Chisti.png"
            },
            {
                name: "Ernest “E.J.” Jones",
                jobDescription: "社區宣傳員",
                livingHistory: "除了上大學的那幾年不在以外，自 1985 年 11 月以來一直居住在第 11 選區。",
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
                jobDescription: "公交操作員",
                livingHistory: "自 2014 年 5 月以來一直居住在第 11 選區。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Roger-Marenco.png"
            }
        ]
    };

    // Define district information and URLs
    var districtInfo = {
        "第1選區": {
            intro: "有四位候選人<span class=''districtLink''data-url=''https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election''>報名參選</span>，挑戰第 1 選區的現任市參事Connie Chan，該選區跨越列治文、孤山、金門公園、林肯公園和舊金山大學。點擊<span class=''districtLink'' data-url=''https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-1-supervisor-answers/''>這裡</span>閱讀第 1 選區 \“和市參事候選人見麵\” 繫列。" 
        },
        "第3選區": {
            intro: "由於本區市參事佩斯金（Aaron Peskin）將於明年一月任期屆滿，目前已有五位候選人<span class=''districtLink'' data-url=''https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election''>報名競選</span>第三選區的領導席位，該選區包括北灘、唐人街、聯合廣場、金融區、俄羅斯山和諾佈山。點擊<span class=''districtLink'' data-url=''https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-3-supervisor-answers/''>這裡</span>閱讀第 3 選區 \“和市參事候選人見麵\”繫列。" 
        },
        "第5選區": {
            intro: "三位候選人已<span class=''districtLink'' data-url=''https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election''>提交競選</span>申請，反對現任參事潘正義（Dean Preston）領導第 5 選區。該選區在 2022 年的選區重劃中髮生了巨大變化，現在從金門公園東端穿過海特-阿什伯裡、日本城和西區、下海特區和海斯谷，以及田德龍區的大部分地區。點擊<span class=''districtLink'' data-url=''https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-5-supervisor-answers/''>這裡</span>閱讀第 5 選區\“和市參事候選人見麵\”繫列。"
        },
        "第7選區": {
            intro: "在包括內日落區、帕克默塞德和西門戶區在內的第 7 選區，候選人Matt Boschetto和Stephen Martin-Pinto將與現任該區市參事梅義加（Myrna Melgar）競爭本區市參事的席位。點擊<span class=''districtLink'' data-url=''https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-7-supervisor-answers/''>這裡</span>閱讀第 7 選區\“和市參事候選人見麵\”繫列。"
        },
        "第9選區": {
            intro: "隨着盧凱莉（Hilary Ronen）今年離任，以及她的助手Santiago Lerma<span class=''districtLink'' data-url=''https://missionlocal.org/2023/10/santiago-lerma-hillary-ronen-aide-confirms-he-wont-run-for-her-d9-seat/''>決定不再申請競選</span>已接替她的職位，第 9 選區（包括米慎區、伯納爾高地和波托拉）的競選向來自本區各個角落的挑戰者敞開了大門。11 位候選人已經<span class=''districtLink'' data-url=''https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election''>申請參選</span>，其中 8 位正在積極競選，使第 9 選區成爲全市競爭最激烈的選區。點擊<span class=''districtLink'' data-url=''https://missionlocal.org/2024/01/meet-the-candidates-all-2024-district-9-supervisor-answers/''>這裡</span>請閱讀第 9 選區\“和市參事候選人見麵\”繫列。"
        },
        "第11選區": {
            intro: "第 11 區市參事安世輝（Ahsha Safaí）任期屆滿，並將競選市長。到目前爲止，已有 7 名候選人<span class=''districtLink'' data-url=''https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#board-of-supervisors-district-11''>參加競選</span>，希望接替他成爲怡東區、海景區和外米慎區的代表人。我們目前能夠確認其中 5 位候選人的身份，並與他們展開對話。點擊<span class=''districtLink'' data-url=''https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-11-supervisor-answers/''>這裡</span>閱讀第 11 選區\“和市參事候選人見麵\”繫列。" 
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
                ''visibility'': visibility
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
                ''visibility'': visibility
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
                    ''case'',
                    [''boolean'', [''feature-state'', ''hover''], false],
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
                ''type'': "geojson",
                ''data'': "map4ALabels.geojson",
            },
            layout: {
                ''visibility'': "visible",
                ''text-field'': [''get'', ''name''],
                ''text-size'': 28,
            },
            paint: {
            "text-color": ''black'',
        }
        });
    }

    map.on("load", function () {
        map.addSource(''map_fill_source'', {
            type: ''geojson'',
            data: ''districtMap.geojson''
        });

        mapLineFunction("map_line", "none", ''districtMap.geojson'');
        mapFillFunction("map_fill", "visible", ''districtMap.geojson'');
        mapLabelFunction();

        updateContent("第1選區");

        map.on(''click'', ''map_fill'', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("第" + district + "選區");

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });

        map.on(''touchstart'', ''map_fill'', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("第" + district + "選區");

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });        

        var popup;

        map.on(''mouseenter'', ''map_fill'', function (e) {
            var district = e.features[0].properties.DISTRICT;
            map.setFeatureState({ source: ''map_fill_source'', id: district }, { hover: true });

            var breakdown = raceBreakdown["第" + district + "選區"];
            var popupContent = "<h4>第" + district + "選區</h4>";
            for (var race in breakdown) {
                popupContent += "<p>" + race + ": " + breakdown[race] + "%</p>";
            }
            popupContent += "</div>";

            // If there''s already a popup, remove it
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

            map.setPaintProperty(''map_fill'', ''fill-outline-color'', [
                ''case'',
                [''=='', [''get'', ''DISTRICT''], district],
                ''black'',
                ''transparent''
            ]);
            map.setPaintProperty(''map_fill'', ''fill-outline-width'', 2);
        });

        map.on(''mouseleave'', ''map_fill'', function () {
            var features = map.queryRenderedFeatures({ layers: [''map_fill''] });
            if (features.length > 0) {
                var district = features[0].properties.DISTRICT;
                map.setFeatureState({ source: ''map_fill_source'', id: district }, { hover: false });
            }

            // If there''s a popup, remove it
            if (popup) {
                popup.remove();
                popup = null;
            }

            map.setPaintProperty(''map_fill'', ''fill-outline-width'', 0);
        });

        // resize map when window is resized
        this.map.once(''load'', () => {
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

        // Add event listeners to all links with the ''districtLink'' class
        var links = document.getElementsByClassName("districtLink");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", handleLinkClick);
        }
    }

    // Event handler for link clicks (same as before)
    function handleLinkClick() {
        var url = this.getAttribute(''data-url'');
        window.open(url, ''_blank'');

    }

    // add navigation controls
    map.addControl(new mapboxgl.NavigationControl());
