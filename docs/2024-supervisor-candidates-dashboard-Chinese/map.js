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
        "第1选区": {
            "亚裔": 41.25,
            "黑人或非洲裔": 2.89,
            "原住民": 0.44,
            "拉美裔": 7.16,
            "白人": 47.17
        },
        "第3选区": {
            "亚裔": 38.03,
            "黑人或非洲裔": 3.85,
            "原住民": 0.78,
            "拉美裔": 6.95,
            "白人": 49.43
        },
        "第5选区": {
            "亚裔": 20.75,
            "黑人或非洲裔": 12.6,
            "原住民": 0.87,
            "拉美裔": 10.59,
            "白人": 53.51
        },
        "第7选区": {
            "亚裔": 35,
            "黑人或非洲裔": 4.01,
            "原住民": 0.4,
            "拉美裔": 11.2,
            "白人": 48.21
        },
        "第9选区": {
            "亚裔": 25.34,
            "黑人或非洲裔": 4.91,
            "原住民": 0.49,
            "拉美裔": 26.24,
            "白人": 41.87
        },
        "第11选区": {
            "亚裔": 56.55,
            "黑人或非洲裔": 5.39,
            "原住民": 0.19,
            "拉美裔": 21.12,
            "白人": 15.85
        }		
    };

    // Define candidate information for each district
    var candidates = {
        "第1选区": [
            {
                name: "Jeremiah Boehner",
                jobDescription: "市场营销专家",
                livingHistory: "自 2006 年以来一直居住在第 1 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jeremiah-Boehner.png"
            },
            {
                name: "Connie Chan",
                jobDescription: "现任第1选区市参事",
                livingHistory: "自 2011 年以来一直居住在第 1 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Connie-Chan.png"
            },
            {
                name: "Sherman D'Silva",
                jobDescription: "Geary大道上一家洗衣店店主",
                livingHistory: "一位从未离开过的第 1 选区本地人。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Sherman-DSilva.png"
            },
            {
                name: "Jen Nossokoff",
                jobDescription: "一家医疗保健公司的副总裁和医生助理",
                livingHistory: "自 2020 年以来一直居住在第 1 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Jen-Nossokoff.png"
            },
            {
                name: "Marjan Philhour",
                jobDescription: "企业主、现任市长伦敦·布里德的前顾问和筹款人",
                livingHistory: "生于第 1 选区，2006 年搬回第 1 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D1-Marjan-Philhour.png"
            },
            
        ],
        "第3选区": [
            {
                name: "Moe Jamil",
                jobDescription: "旧金山市检察院副检察长",
                livingHistory: "自 2014 年 5 月以来一直居住在第 3 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Moe-Jamil.png"
            },
            {
                name: "Sharon Lai",
                jobDescription: "世界经济论坛经济复苏领导人、旧金山市政交通局前董事会成员",
                livingHistory: "自 2023 年以来一直居住在第 3 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Sharon-Lai.png"
            },
            {
                name: "Eduard Navarro",
                jobDescription: "科技创业公司创始人",
                livingHistory: "自 2021 年以来一直居住在第 3 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/D3-Eduard-Navarro.png"
            },
            {
                name: "JConr B. Ortega",
                jobDescription: "自称曾经无家可归、皮革匠、拳击手",
                livingHistory: "自 2021 年 12 月以来一直居住在第 3 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Jconr-B-Ortega.png"
            },
            {
                name: "Danny Sauter",
                jobDescription: "Neighborhood Centers Together组织执行主任",
                livingHistory: "自 2014 年以来一直居住在第 3 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Danny-Sauter.png"
            },
            {
                name: "Matthew Susk",
                jobDescription: "Divvy Homes的前负责人",
                livingHistory: "自 2023 年以来一直居住在第 3 选区。2007-2009 年和 2014-2016 年也住在第 3 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D3-Matthew-Susk-640x640.png",
            }
        ],
        "第5选区": [
            {
                name: "Allen Jones",
                jobDescription: "",
                livingHistory: "自 2021 年 11 月以来一直居住在第 5 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Allen-Jones.png"
            },
            {
                name: "Autumn Looijen",
                jobDescription: "",
                livingHistory: "自 2020 年 12 月以来一直居住在第 5 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Autumn-Looijen.png"
            },
            {
                name: "Bilal Mahmood",
                jobDescription: "",
                livingHistory: "自 2023 年 5 月以来一直居住在第 5 选区。之前在 2021 年 5 月曾住在相邻的选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Bilal-Mahmood.png"
            },
            {
                name: "Dean Preston",
                jobDescription: "",
                livingHistory: "自 1996 年以来一直居住在第 5 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D5-Dean-Preston.png"
            }
        ],
        "第7选区": [
            {
                name: "Matt Boschetto",
                jobDescription: "小企业主",
                livingHistory: "自 2014 年以来一直居住在第 7 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Matt-Boschetto.png"
            },
            {
                name: "Stephen Martin-Pinto",
                jobDescription: "消防员和美国海军陆战队预备役少校",
                livingHistory: "自 2014 年以来一直居住在第 7 选区。之前在 1983-1998 年间也曾居住在第 7 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Stephen-Martin-Pinto.png"
            },
            {
                name: "Myrna Melgar",
                jobDescription: "现任第 7 选区市参事",
                livingHistory: "自 2011 年以来一直居住在第 7 选区。此前，住在旧金山州立大学校园内。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D7-Myrna-Melgar.png"
            }
        ],
        "第9选区": [
            {
                name: "Julian Bermudez",
                jobDescription: "在家族企业 Rancho Grande Appliance 工作并担任领导。租户。",
                livingHistory: "1996 年出生于第 9 选区，从小到大在该区断断续续住过，直到 2015 年上大学和 2019 年参军。退伍后回到本区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Bermudez.png"
            },
            {
                name: "h brown",
                jobDescription: "退休特殊教育教师。租户。",
                livingHistory: "已在现住址居住 9 年，2022 年 4 月重新划分到第 9 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/hBrown.png"
            },
            {
                name: "Trevor Chandler",
                jobDescription: "旧金山公立学校代课教师。曾任公共安全应用程序 Citizen 的政府和公共政策总监。租户。",
                livingHistory: "自 2021 年 7 月以来一直居住在第 9 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Chandler.png"
            },
            {
                name: "Jackie Fielder",
                jobDescription: "前旧金山州立大学教育家，旧金山公共银行联盟创始人之一。民主社会主义者。租户。",
                livingHistory: "2017 年 9 月至 2018 年 6 月、2019 年 10 月至 2020 年 8 月、2021 年 4 月至今住在第 9 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9Fielder_2.png"
            },
            {
                name: "Jaime Gutierrez",
                jobDescription: "SFMTA/Muni 的交通主管。租户。",
                livingHistory: "最近，自 1991 年 10 月起住在第 9 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Gutierrez.png"
            },
            {
                name: "Roberto Hernandez",
                jobDescription: "Cultura y Arte Nativa de Las Americas (CANA) 首席执行官。业主。",
                livingHistory: "1956 年 6 月出生在本区的米慎区，至今没有离开过。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Hernandez.png"
            },
            {
                name: "Michael Petrelis",
                jobDescription: "艾滋病和性少数群体活动家",
                livingHistory: "自 1996 年 5 月起住在克林顿公园，2022 年 4 月成为第 9 选区的一份子",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Petrelis.png"
            },
            {
                name: "Stephen Torres",
                jobDescription: "性少数群体活动家、制片人和记者。",
                livingHistory: "2001 年夏季至 2003 年秋季住在第 9 选区，2010 年夏季返回。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/D9-Candidate-Torres.png"
            }
        ],
        "第11选区": [
            {
                name: "Chyanne Chen",
                jobDescription: "工人组织者、社区促进者和教育者",
                livingHistory: "自 2000 年 8 月以来一直居住在第 11 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/03/Chyanne-Chen.png"
            },
            {
                name: "Adlah Chisti",
                jobDescription: "公共政策分析师、护理人员",
                livingHistory: "1983 年出生于第 11 选区，2013 年搬出，2017 年搬回。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Adlah-Chisti.png"
            },
            {
                name: "Ernest “E.J.” Jones",
                jobDescription: "社区宣传员",
                livingHistory: "除了上大学的那几年不在以外，自 1985 年 11 月以来一直居住在第 11 选区。",
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
                jobDescription: "公交操作员",
                livingHistory: "自 2014 年 5 月以来一直居住在第 11 选区。",
                imageURL: "https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/02/D11-Roger-Marenco.png"
            }
        ]
    };

    // Define district information and URLs
    var districtInfo = {
        "第1选区": {
            intro: "有四位候选人<span class='districtLink'data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>报名参选</span>，挑战第 1 选区的现任市参事Connie Chan，该选区跨越列治文、孤山、金门公园、林肯公园和旧金山大学。点击<span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-1-supervisor-answers/'>这里</span>阅读第 1 选区 \“和市参事候选人见面\” 系列。" 
        },
        "第3选区": {
            intro: "由于本区市参事佩斯金（Aaron Peskin）将于明年一月任期届满，目前已有五位候选人<span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>报名竞选</span>第三选区的领导席位，该选区包括北滩、唐人街、联合广场、金融区、俄罗斯山和诺布山。点击<span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-3-supervisor-answers/'>这里</span>阅读第 3 选区 \“和市参事候选人见面\”系列。" 
        },
        "第5选区": {
            intro: "三位候选人已<span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>提交竞选</span>申请，反对现任参事潘正义（Dean Preston）领导第 5 选区。该选区在 2022 年的选区重划中发生了巨大变化，现在从金门公园东端穿过海特-阿什伯里、日本城和西区、下海特区和海斯谷，以及田德龙区的大部分地区。点击<span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-5-supervisor-answers/'>这里</span>阅读第 5 选区\“和市参事候选人见面\”系列。"
        },
        "第7选区": {
            intro: "在包括内日落区、帕克默塞德和西门户区在内的第 7 选区，候选人Matt Boschetto和Stephen Martin-Pinto将与现任该区市参事梅義加（Myrna Melgar）竞争本区市参事的席位。点击<span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-7-supervisor-answers/'>这里</span>阅读第 7 选区\“和市参事候选人见面\”系列。"
        },
        "第9选区": {
            intro: "随着卢凯莉（Hilary Ronen）今年离任，以及她的助手Santiago Lerma<span class='districtLink' data-url='https://missionlocal.org/2023/10/santiago-lerma-hillary-ronen-aide-confirms-he-wont-run-for-her-d9-seat/'>决定不再申请竞选</span>已接替她的职位，第 9 选区（包括米慎区、伯纳尔高地和波托拉）的竞选向来自本区各个角落的挑战者敞开了大门。11 位候选人已经<span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election'>申请参选</span>，其中 8 位正在积极竞选，使第 9 选区成为全市竞争最激烈的选区。点击<span class='districtLink' data-url='https://missionlocal.org/2024/01/meet-the-candidates-all-2024-district-9-supervisor-answers/'>这里</span>请阅读第 9 选区\“和市参事候选人见面\”系列。"
        },
        "第11选区": {
            intro: "第 11 区市参事安世辉（Ahsha Safaí）任期届满，并将竞选市长。到目前为止，已有 7 名候选人<span class='districtLink' data-url='https://www.sf.gov/reports/november-2024/candidates-november-5-2024-consolidated-general-election#board-of-supervisors-district-11'>参加竞选</span>，希望接替他成为怡东区、海景区和外米慎区的代表人。我们目前能够确认其中 5 位候选人的身份，并与他们展开对话。点击<span class='districtLink' data-url='https://missionlocal.org/2024/02/meet-the-candidates-all-2024-district-11-supervisor-answers/'>这里</span>阅读第 11 选区\“和市参事候选人见面\”系列。" 
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

        updateContent("第1选区");

        map.on('click', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("第" + district + "选区");

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });

        map.on('touchstart', 'map_fill', function (e) {
            var feature = e.features[0];
            var district = feature.properties.DISTRICT;
            updateContent("第" + district + "选区");

            // Remove the old popup if it exists
            if (popup) {
                popup.remove();
            }
        });        

        var popup;

        map.on('mouseenter', 'map_fill', function (e) {
            var district = e.features[0].properties.DISTRICT;
            map.setFeatureState({ source: 'map_fill_source', id: district }, { hover: true });

            var breakdown = raceBreakdown["第" + district + "选区"];
            var popupContent = "<h4>第" + district + "选区</h4>";
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