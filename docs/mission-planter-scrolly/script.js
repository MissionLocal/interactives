// load in data from coordinates.geojson
function fetchJSON(url) {
    return fetch(url)
      .then(function(response) {
        return response.json();
      });
  }

// fetch allPlantersSource 
var allPlantersSource = fetchJSON('coordinates.geojson')
    .then(function(allPlantersSource) {
    // Fetch missionPlantersSource within the first fetch
    return fetchJSON('missionPlanters.geojson')
      .then(function(missionPlantersSource) {
        
        var config = {
            style: 'mapbox://styles/mlnow/clgr21hr8000301qzf4wq1aap',
            accessToken: 'pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ',
            showMarkers: false,
            theme: 'light',
            alignment: 'left',
            chapters: [
                {
                    id: 'slide-00',
                    title: 'Planters in the Mission',
                    description:
                        '<p>The Mission District is home to its fair share.</p>'
                        +'<p>There are some 2,078 planters across the neighborhood, according to a block-by-block count conducted by Mission Local reporters.',
                    location: {
                        center: [-122.4147490740914, 37.758885209620345],
                        zoom: 13.7,
                        bearing: 0,
                        pitch: 0,
                    },
                    mapLayerAll: 'visible',
                    mapLayerMission: 'none',
                },
                {
                    id: 'slide-01',
                    title: 'Newer planters',
                    description:
                    '<p>About 200 of these are the large <span class="red-highlight">metallic containers</span> and another 400 are <span class="red-highlight">wooden barrels</span>. There are 155 <span class="red-highlight">wooden troughs</span>.</p><p>The remaining 1,307 are a <span class="green-highlight">mixture of receptacles</span> ranging in size from tiny clay pots to massive sidewalk gardens filled with an assortment of vessels.</p>',
                    location: {
                        center: [-122.4147490740914, 37.758885209620345],
                        zoom: 13.7,
                        bearing: 0,
                        pitch: 0,
                    },
                    mapLayerAll: 'visible',
                    mapLayerMission: 'none',
                },
                {
                    id: 'slide-02',
                    title: '',
                    description:
                        '<p>Outside some households, the planters have been there for years — an attempt to beautify the sidewalks and add some color. Even then, some owners hoped they would deter people from drinking in front of their homes and discourage bargoers on Valencia or Mission streets from hanging out on their property.</p>'
                        + '<p>But planters lined up on the sidewalk have increased over the last three years as what some call “defensive architecture.” In short: They are often meant to <strong>deter street sleeping and homeless encampments</strong>.</p>',
                    location: {
                        center: [-122.4147490740914, 37.758885209620345],
                        zoom: 13.7,
                        bearing: 0,
                        pitch: 0,
                    },
                    mapLayerAll: 'visible',
                    mapLayerMission: 'none',
                },
                {
                    id: 'slide-03',
                    title: 'Market and Octavia',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1876-scaled.jpg',
                    description:
                        '<p>For example, take these <span class="red-highlight">six planters</span> installed within the last two years on the triangle-shaped island at Market and Octavia streets.</p>'
                        + '<p><a href="https://www.sfplanters.com/">SF Planters</a>, one of the main contractors for the metal tubs in San Francisco, sells and installs the planters for <strong>$750 apiece</strong>. Rachel Gordon, a spokesperson for San Francisco Public Works, said the planters were part of a community-initiated project funded with addback money from District 8 Supervisor Rafael Mandelman. Public Works helped with the landscaping.</p>',
                    location: {
                        center: [-122.4241487, 37.7716111],
                        zoom: 18,
                        bearing: 100,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-04',
                    title: 'Market and Octavia',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1880-scaled.jpg',
                    description:
                        '<p>Nearby on Octavia Street, there is a queue of smaller <span class="red-highlight">wooden barrel planters</span> along the eastern wall. The plants within are barely alive.</p>'
                        + '<p>These barrel planters, the most common sort other than the metal tanks, are a cheaper alternative to the metal tubs. Just who purchased and installed these planters is unknown. It is also unknown if anybody is maintaining the beleaguered plants.</p>',
                    location: {
                        center: [-122.4241487, 37.7716111],
                        zoom: 18,
                        bearing: 100,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-05',
                    title: '',
                    image: '',
                    description:
                        '<p>Some neighbors, at times in <a href="https://www.kqed.org/news/11968398/emails-reveal-sf-officials-coordinated-efforts-against-unhoused-people">coordination with the city</a>, install planters as beautification projects. But, for the most part, they are installed by owners without help from anyone.</p>'
                        + '<p>Few dispute the intent: to <strong>prevent, discourage or replace homeless encampments</strong>.</p>',
                    location: {
                        center: [-122.4241487, 37.7716111],
                        zoom: 18,
                        bearing: 100,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-06',
                    title: "18th and Bryant",
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1931-scaled.jpg',
                    description:
                        '<p>In front of the <a href="https://missionlocal.org/2018/08/new-sirron-norris-mural-replacing-crumbling-one-at-18th-and-bryant/">Sirron Norris mural</a> at 18th and Bryant streets, <span class="red-highlight">planters</span> straddle the trees.</p>'
                        + '<p>The planters here were installed by business owners and homeowners as an effort to deter homelessness and prevent tents from being set up next to their houses or shops.</p>',
                    location: {
                        center: [-122.40921285799394, 37.7618071018073],
                        zoom: 17,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-07',
                    title: "Shotwell and 18th",
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1951-scaled.jpg',
                    description:
                        '<p>At Shotwell and 18th streets, at least four tents were set up between <span class="red-highlight">three large planters</span> on Tuesday, Nov. 21.</p>',
                    location: {
                        center: [-122.41603869575867, 37.76126220569306],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-08',
                    title: '',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1952-scaled.jpg',
                    description:
                        '<p>“It\'s unfortunate that neighbors have to resort to this. But I understand their frustration,” said Santiago Lerma, former legislative aide to Supervisor Hillary Ronen. “I understand why they\'re doing that.”</p><p>Lerma is now the director of Mission Streets Condition Response. He has met with several neighborhood groups outlining their plans for planters during his time in District 9.</p>'
                        + '<p>Homeowners, public officials and neighborhood associations defend the installation of the planters, though no one claims they are a solution to homelessness. They are only an immediate aid to the problem on their blocks or in front of their houses. </p>',
                    location: {
                        center: [-122.41603869575867, 37.76126220569306],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                }
                , {
                    id: 'slide-09',
                    title: "Woodward Street",
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.12.03-PM.png',
                    description:
                        '<p>"We had a lot of people doing drugs and we had a woman who was a prostitute and one person  defecating on the sidewalk," said Sandra Schur, 65, who moved to San Francisco in 2011 and lives on Woodward Street. "We pay a lot to live here and it\'s like I\'m living in a slum."</p>' 
                        +'<p>Schur recalled that before last summer, there were about seven to eight tents at the southern end of her street. But since they installed big <span class="red-highlight">metal tub planters</span>, Schur said, there has been only one tent.</p>'
                        +'<p>"It has been tremendously improved," she said.</p>',
                    location: {
                        center: [-122.42082196381236, 37.76849864064524],
                        zoom: 18.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-10',
                    title: "25th and Capp",
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.12.56-PM.png',
                    description:
                        '<p>Tim R., a 34-year-old renter at 25th and Capp streets, feels the same as Schur. He said the <span class="red-highlight">planters</span> were installed by his landlord last summer after an encampment in front of his building was cleared.</p>'
                        + '<p>"Now, people only sleep one or two nights here at most," Tim said, referring to those in the encampment. "They are settling elsewhere."</p>'
                        + '<p>"Also, I don\'t have complaints about having greenery in front of my house," he added.</p>',
                    location: {
                        center: [-122.4173, 37.7507],
                        zoom: 19.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-11',
                    title: '',
                    image: '',
                    description:
                        '<p>For others, however, the Whac-A-Mole nature of the displacement is a temporary fix — or no fix at all.</p>' 
                        +'<p>"It\'s obviously not a solution to homelessness," said Mission resident Scott Feeney, who has been keeping track of planters in the city and has <a href="https://www.reddit.com/r/sanfrancisco/comments/16kd59v/theyre_installing_planters_outside_of_walgreens/">protested</a> their installation in the Castro. "It seems like the city is waging war on unhoused people instead of housing them."</p>',
                    location: {
                        center: [-122.4173, 37.7507],
                        zoom: 19.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                }
                ,
                {
                    id: 'slide-12',
                    title: 'Cesar Chavez and Valencia',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1797-scaled.jpg',
                    description:
                        '<p>Take Cesar Chávez and Valencia streets, for example. On one side of the street, large <span class="red-highlight">steel planters</span> have been arranged in a circle in front of the wire fences of a parking lot and next to a Muni bus stop.</p>',
                    location: {
                        center: [-122.4199, 37.7477],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                }
                ,
                {
                    id: 'slide-13',
                    title: '',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.13.33-PM.png',
                    description:
                        '<p>Next to the bus stop used to be the encampment space for Carlos Rodriguez, a 38-year-old who has been homeless for about eight months since he lost his job as a restaurant worker last April.</p>'
                        + '<p>During the eight months he\'s been living on the streets, Rodriguez has already moved four times. He first pitched his tent at the bus stop at Valencia and Cesar Chavez streets; he then moved a block north to the Salvation Army, then to San Jose Avenue, and finally to a bus stop at Valencia and Cesar Chavez facing east.</p><p>Now, he is back to where he started.</p>',
                    location: {
                        center: [-122.4199, 37.7477],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                }
                ,
                {
                    id: 'slide-14',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1805-scaled.jpg',
                    description:
                        '<p>Rodriguez said the first time he moved he was told by police officers and Public Works staff to go across the street. Right after he moved, metal tub planter boxes were installed where he had been staying.</p>'
                        + '<p>"This is discrimination," Rodriguez said. "Sometimes when I move, people laugh at me. I feel like I\'m belittled."</p>',
                    location: {
                        center: [-122.4199, 37.7477],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                }
                ,
                {
                    id: 'slide-15',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1799-scaled.jpg',
                    description:
                        '<p>Another homeless resident who lives nearby on Valencia Street but declined to disclose his name witnessed the installation of the planters and feels similarly. "I feel like they are homeless barricades," he said. "But I have no idea how much they cost and I don\'t know who put them there."</p>' 
                        +'<p>He said he\'s been living on the streets for almost 20 years and he sees the planters all over the city. He knows the intent: to curb homeless encampments. "It\'s hard to get back on my feet when I\'m constantly running, running, running," he said.</p>',
                    location: {
                        center: [-122.4199, 37.7477],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-16',
                    title: '',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1787-scaled.jpg',
                    description:
                        '<p>Jennifer Friedenbach, executive director of the Coalition on Homelessness, said the planters are only displacing the problem. Sometimes people sleep right next to them, because they "don\'t have anywhere to go."</p>'
                        +'<p>"Only housing solves the problems," Friedenbach said. "The energy towards pushing people out does not solve the problem. The energy expended should be directed towards solutions."</p>',

                    location: {
                        center: [-122.4199, 37.7477],
                        zoom: 18,
                        bearing: 50,
                        pitch: 60,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-17',
                    title: '17th and Alabama',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1901-scaled.jpg',
                    description:
                        '<p>The situation on Cesar Chávez and Valencia streets is not rare.</p>'
                        +'<p>On 17th and Alabama streets, <span class="red-highlight">planters</span> have been put between trees.</p>',
                    location: {
                        center: [-122.4123, 37.7639],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-18',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/11/IMG_1910-scaled.jpg',
                    description:
                        '<p>Across the street, a tent had been pitched in front of residential apartments at 380 Alabama St.</p>',
                    location: {
                        center: [-122.4123, 37.7639],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-19',
                    title: '',
                    image: '',
                    description:
                        '<p>To homeowners, the city is failing in its task to house its most vulnerable residents, and so residents have taken it upon themselves to at least keep the tents at bay. By law, homeowners are responsible for maintaining and cleaning the <a href="https://www.sfbetterstreets.org/learn-the-process/maintenance/">sidewalks in front of their houses</a>.</p>',
                    location: {
                        center: [-122.4123, 37.7639],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-20',
                    title: 'Buena Vista Horace Mann K-8 school',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.14.03-PM.png',
                    description:
                        '<p>John Talbott, who lives across from Buena Vista Horace Mann K-8 school put two kumquat trees in <span class="red-highlight">planters</span>, in front of his house.</p>'
                        +'<p>He said the biggest change on his block came when Buena Vista opened its doors to homeless families. Before they arrived, he said, it was a good day when he did not have to call 911 because someone was having a drug episode in front of the school. Now, he says, the city pays more attention to the area and it is kept clean and safe for the families.</p>'
                        +'<p>He\'s pleased to have the shelter there and the city\'s attention.</p>',
                    location: {
                        center: [-122.4203, 37.7536],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-21',
                    title: '26th and Bartlett',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.14.28-PM.png',
                    description:
                        '<p>John, a homeowner who has been living at 26th and Bartlett streets for eight years but declined to disclose his last name, feels the same way.</p>'
                        +'<p>"To the right, a group of people tented out there for like a month and they are exhausting and invasive," John said. "A lot of noise. Trash was everywhere. They are not good neighbors."</p>'
                        +'<p>John said he and his neighbors were inspired by the Salvation Army, which is down the street at 1501 Valencia St. About a year ago, according to John, the Salvation Army had planters placed around the building and as soon as the planters were out, tents were gone.</p>'
                        +'<p>John and his neighbors finally decided to put seven <span class="red-highlight">wooden barrel planters</span> out in the street corner about a month or two ago, during the time, John said, <strong>when "APEC pushed people from SoMa to the Mission</strong>."</p>'
                        +'<p>"It is frustrating," John said, pointing to the experience that it would take the city months and months to address the issue in his neighborhood. <strong>"This is the defense we have."</strong></p>',
                    location: {
                        center: [-122.4192, 37.7490],
                        zoom: 18.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-22',
                    title: '"Beautification Project"',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.14.53-PM.png',
                    description:
                        '<p>"We had begged Ronen\'s office for years to do something about the trash, illegal dumping and ever-growing presence of large out-of-control encampments," said Francesca Pastine, 69, one of the leads for the <a href="https://www.innermissionneighborhood.com/beautification">beautification project</a> of the Inner Mission Neighborhood Association, which involved neighbors installing more than 100 planters in 2022 to <a href="https://www.sfchronicle.com/bayarea/article/homeless-encampment-plants-18138006.php">deter encampments</a> in “what had previously been blighted sidewalks.”</p>'
                        +'<p>She said back then, she did the research and made sure the planters were in compliance with ADA requirements and were not permanently attached to the ground. The barrels cost about $25 to $30 depending on the vendor, and the group would order about 13 to 15 at a time. Add in soil, rocks and plants, and each planter costs about $100.</p>',
                    location: {
                        center: [-122.41497665999415, 37.749352029957976],
                        zoom: 18.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-23',
                    title: '"Beautification Project"',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.15.21-PM.png',
                    description:
                        '<p>So far, Pastine and her neighbors have installed about 150 planters, most of them between 21st and 26th streets at South Van Ness Avenue, Capp Street and Shotwell Street.</p>'
                        +'<p>"Planters might discourage some people and can only make the streets more beautiful. It is not the solution to homelessness," Pastine said.</p>'
                        +'<p>"The city policy has to shift so that the people can access shelters," Pastine added.</p>',

                    location: {
                        center: [-122.41535922009689, 37.75336408223216],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-24',
                    title: '14th and Natoma',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.15.43-PM.png',
                    description:
                        '<p>Andrew Gescheidt, owner of Popular Mechanix at 252 14th St., asked who was offended by the planters and framed them as a choice “between two evils.”</p>'
                        +'<p>One evil, he said, “is homeless people on the sidewalk which is also unethical and impolite.” The other: “planters on the sidewalk, which I don\'t see as impolite or unethical.”</p>'
                        +'<p>Gescheidt bought three metal tub planters for $150 each two years ago after a "hostile homeless man" pitched a tent outside his store — a last resort following what he claims to be some 100 fires set by homeless people outside his store\'s gate facing the freeway.</p>'
                        +'<p>While Gescheidt\'s count of fires could not be confirmed, the <a href="https://data.sfgov.org/Public-Safety/Fire-Incidents/wr8u-xric">fire department</a> reported some 495 trash fires and a further 35 encampment fires in the Mission last year.</p>'
                        +'<p>"I see it as helping the city," Gescheidt said. "I do it for free. The city should pay me, but they don\'t."</p>',

                    location: {
                        center: [-122.4187, 37.7682],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-25',
                    title: '18th and Shotwell',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.16.03-PM.png',
                    description:
                        '<p>The planters, said Juan Gallardo, owner of Mexican restaurant Gallardo\'s at 3248 18th St., are “good for me because every morning I needed to remove the homeless people here. Every single morning." He now has three large <span class="red-highlight">red concrete planters</span> installed in front of his restaurant.</p>',

                    location: {
                        center: [-122.4159, 37.7623],
                        zoom: 18,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-26',
                    title: 'San Carlos and 20th',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.16.24-PM.png',
                    description:
                        '<p>Although many of the planters are well-maintained, some are not. Even when they are in poor condition, planters appear to deter encampments.</p>'
                        +'<p>The succulents inside the three wooden barrels in front of the Valencia Dental Center at San Carlos look nearly lifeless.'
                        +'<p>"They do work for people not to sleep there," said Susie, the front desk receptionist of the dentistry at 3541 20th St. "But people always mess with them anyway. It\'s hard to take care of them"'
                        +'<p>They have become a repository for trash including needles and condoms, she said.',

                    location: {
                        center: [-122.4197, 37.7586],
                        zoom: 18.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                },
                {
                    id: 'slide-27',
                    title: 'Shotwell and 20th',
                    image: 'https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2024/01/Screen-Shot-2024-01-04-at-3.16.41-PM.png',
                    description:
                        '<p>But some businesses manage to maintain the planters. David Hall, owner of local bar Shotwell\'s Saloon at 3349 20th St., said that the well-maintained planters have <strong>dual purposes</strong>: to beautify and keep tents from the front of their houses. "But outside of that," he said. "It just gives one a sense of joy to see plants growing."</p>'
                        +'<p>Hall is also well aware of the criticism of the planters but is still fully in favor of them. "I\'ve got children, you\'ve got needles. I\'ve got dogs, you\'ve got feces," he said. "As homeowners and business owners, we\'re trapped here."</p>'
                        +'<p>"I\'m all for it. I\'m like, put more plants in this world," Hall said.</p>',

                    location: {
                        center: [-122.4156, 37.7587],
                        zoom: 18.5,
                        bearing: 50,
                        pitch: 40,
                    },
                    mapLayerAll: 'none',
                    mapLayerMission: 'visible',
                }
            ]
        }
        
        
        // fill in layers
        var layerTypes = {
            'fill': ['fill-opacity'],
            'line': ['line-opacity'],
            'circle': ['circle-opacity', 'circle-stroke-opacity'],
            'symbol': ['icon-opacity', 'text-opacity'],
            'raster': ['raster-opacity'],
            'fill-extrusion': ['fill-extrusion-opacity']
        }
        var alignments = {
            'left': 'lefty',
            'center': 'centered',
            'right': 'righty'
        }
        function getLayerPaintType(layer) {
            var layerType = map.getLayer(layer).type;
            return layerTypes[layerType];
        }
        function setLayerOpacity(layer) {
            var paintProps = getLayerPaintType(layer.layer);
            paintProps.forEach(function (prop) {
                map.setPaintProperty(layer.layer, prop, layer.opacity);
            });
        }
        var story = document.getElementById('story');
        var features = document.createElement('div');
        features.classList.add(alignments[config.alignment]);
        features.setAttribute('id', 'features');
        var header = document.createElement('div');
        if (config.title) {
            var titleText = document.createElement('h1');
            titleText.innerText = config.title;
            header.appendChild(titleText);
        }
        if (config.subtitle) {
            var subtitleText = document.createElement('h2');
            subtitleText.innerText = config.subtitle;
            header.appendChild(subtitleText);
        }
        if (config.byline) {
            var bylineText = document.createElement('p');
            bylineText.innerText = config.byline;
            header.appendChild(bylineText);
        }
        if (config.description) {
            var descriptionText = document.createElement("div");
            descriptionText.innerHTML = config.description;
            header.appendChild(descriptionText);
        }
        if (header.innerText.length > 0) {
            header.classList.add(config.theme);
            header.setAttribute('id', 'header');
            story.appendChild(header);
        }
        config.chapters.forEach((record, idx) => {
            var container = document.createElement('div');
            var chapter = document.createElement('div');
        
            if (record.title) {
                var title = document.createElement('h3');
                title.innerText = record.title;
                chapter.appendChild(title);
            }
        
            if (record.image) {
                var image = new Image();
                image.src = record.image;
                chapter.appendChild(image);
            }
        
            if (record.description) {
                var story = document.createElement('p');
                story.innerHTML = record.description;
                chapter.appendChild(story);
            }
            container.setAttribute('id', record.id);
            container.classList.add('step');
            if (idx === 0) {
                container.classList.add('active');
            }
            chapter.classList.add(config.theme);
            container.appendChild(chapter);
            features.appendChild(container);
        });
        story.appendChild(features);
        var footer = document.createElement('div');
        if (config.footer) {
            var footerText = document.createElement('p');
            footerText.innerHTML = config.footer;
            footer.appendChild(footerText);
        }
        if (footer.innerText.length > 0) {
            footer.classList.add(config.theme);
            footer.setAttribute('id', 'footer');
            story.appendChild(footer);
        }
        mapboxgl.accessToken = config.accessToken;
        const transformRequest = (url) => {
            const hasQuery = url.indexOf("?") !== -1;
            const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";
            return {
                url: url + suffix
            }
        }
        var map = new mapboxgl.Map({
            container: 'map',
            style: config.style,
            center: [-122.4147490740914, 37.758885209620345],
            zoom: 12,
            scrollZoom: false,
            transformRequest: transformRequest
        });
        var marker = new mapboxgl.Marker();
        if (config.showMarkers) {
            marker.setLngLat(config.chapters[0].location.center).addTo(map);
        }
        // instantiate the scrollama
        var scroller = scrollama();
        // setup the instance, pass callback functions
        scroller.setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
            .onStepEnter(response => {
                var chapter = config.chapters.find(chap => chap.id === response.element.id);
                response.element.classList.add('active');
        
                // grab map layers and set visibilities depending on chapter
                map.setLayoutProperty('missionPlanters', 'visibility', chapter.mapLayerMission);
                map.setLayoutProperty('allPlanters', 'visibility', chapter.mapLayerAll);

                 // Change circle color based on the chapter ID
                if (chapter.id === 'slide-00') {
                    //Apply color change only to featuer with id "new"
                    map.setPaintProperty('allPlanters', 'circle-color', 'green'
                    );
                } 

                if (chapter.id === 'slide-01') {
                    //Apply color change only to featuer with id "new"
                    map.setPaintProperty('allPlanters', 'circle-color', [
                        'case',
                        ['==', ['get', 'id'], 'new'], 'brown',
                        'green'
                    ]);
                }

        
                map.flyTo(chapter.location);
                if (config.showMarkers) {
                    marker.setLngLat(chapter.location.center);
                }
        
            })
            .onStepExit(response => {
                var chapter = config.chapters.find(chap => chap.id === response.element.id);
                response.element.classList.remove('active');
            })
        
        // function to define map layers information - zoomed out view
        function mapDetailsFunctionBig(mapID, visibility, source) {
            mapDetails = {
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
                    'fill-color': '#a52a2a',
                    "fill-opacity": 0.5,
                },
            }
            return mapDetails;
        }
        
        // function to define map layers information - zoomed in view
        function mapDetailsFunctionSmall(mapID, visibility, source) {
            var mapDetails = {
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
                    'circle-color': [
                        'case',
                        ['==', ['get', 'id'], 'new'], 'brown', //new feature color
                        'green' //old feature color
                    ],
                    'circle-opacity': 0.5,
                    'circle-radius': {
                        'stops': [
                            [12, 4],
                            [16, 10]
                        ]
                    },
                },
            };
            return mapDetails;
        }
        
        // load my map layers
        map.on("load", function () {
            // Add missionPlanters layer
            var missionPlantersDetails = mapDetailsFunctionBig("missionPlanters", "none", missionPlantersSource);
            map.addLayer(missionPlantersDetails);
        
            // Add allPlanters layer
            var allPlantersDetails = mapDetailsFunctionSmall("allPlanters", "visible", allPlantersSource);
            map.addLayer(allPlantersDetails);

            // Set initial color to green
            map.setPaintProperty('allPlanters', 'circle-color', 'green');
        });
        
        // setup resize event
        window.addEventListener('resize', scroller.resize);

})});