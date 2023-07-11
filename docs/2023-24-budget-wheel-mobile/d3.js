// define variables
const width = 500;
const height = Math.min(width, 500);
const radius = (Math.min(width, height) / 2) * 600/550;

multiplier = 2;
xoffset = 200;
yoffset = -230;
lastClicked = null;

///
/// IMPORT DATA
///

let ring1Data_2324, ring2Data_2324, ring1Data_2425, ring2Data_2425;

const fetchRing1_2324 = fetch('data_department_2324.json')
    .then(response => response.json())
    .then(data => {
        ring1Data_2324 = data;
    });

const fetchRing2_2324 = fetch('data_division_2324.json')
    .then(response => response.json())
    .then(data => {
        ring2Data_2324 = data;
    });

const fetchRing1_2425 = fetch('data_department_2425.json')
    .then(response => response.json())
    .then(data => {
        ring1Data_2425 = data;
    });

const fetchRing2_2425 = fetch('data_division_2425.json')
    .then(response => response.json())
    .then(data => {
        ring2Data_2425 = data;
    });

var serviceAreasArray = ['Community Health', 'Culture & Recreation','General Administration & Finance Departments','General City Responsibility','Human Welfare & Neighborhood Development', 'Public Protection','Public Works, Transportation & Commerce'];
var serviceAreasHTML = ['',
    '<p>Community Health<br/><span class="subhead">$3.24B | <span class="positive-percent">+7.95%</span></span></p>',
    '<p>Culture & Recreation<br/><span class="subhead">$579M | <span class="positive-percent">+6.02%</span></span></p>',
    '<p>General Admin & Finance<br/><span class="subhead">$1.57B | <span class="negative-percent">-0.07%</span></span></p>',
    '<p>General City Responsibility<br/><span class="subhead">$1.81B | <span class="positive-percent">+2.48%</span></span></p>',
    '<p>Human Welfare & Neighborhood<br/><span class="subhead">$2.64B | <span class="positive-percent">+1.77%</span></span></p>',
    '<p>Public Protection<br/><span class="subhead">$2B | <span class="positive-percent">+3.52%</span></span></p>',
    '<p>Public Works, Transportation & Commerce<br/><span class="subhead">$5.4B | <span class="positive-percent">+2.58%</span></span></p>'];
var serviceAreasConcatArray = ['health','culture','admin','city','welfare','protection','public-works','transportation']
var donutOffsets = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
var selectedButton = "2324";

// Main function
function createDonut(selectedButton, serviceAreasArray, serviceAreas) {
    Promise.all([fetchRing1_2324, fetchRing2_2324, fetchRing1_2425, fetchRing2_2425])
    .then(() => {
        // remove old svg
        d3.select("#donut-1-svg").selectAll("*").remove();

        var pie = d3.pie()
            .sort(null)
            .value(d => d.value);

        var svg = d3.select("#donut-1-svg")
            .append("svg")
            .attr("viewBox", [-width / 2, 2700, width, 50])

        if (selectedButton == "2324") {
            ring1Data = ring1Data_2324;
            ring2Data = ring2Data_2324;
        }
        if (selectedButton == "2425") {
            ring1Data = ring1Data_2425;
            ring2Data = ring2Data_2425;
        }

        ///
        /// CREATE DONUTS
        ///

        // Set donut variables
        const ring1Arc = d3.arc()
            .innerRadius((radius * 0.45) * multiplier)
            .outerRadius((radius - 101) * multiplier)
            .startAngle((d) => Math.PI + d.startAngle / 2)
            .endAngle((d) => Math.PI + d.endAngle / 2);

        const ring2Arc = d3.arc()
            .innerRadius((radius * 0.75) * multiplier)
            .outerRadius((radius - 100) * multiplier)
            .startAngle((d) => Math.PI * 1 + d.startAngle / 2)
            .endAngle((d) => Math.PI * 1 + d.endAngle / 2);

        var ring1Color = d3.scaleOrdinal()
            .domain(ring1Data.map(d => d.id))
            .range(["#4288b5", // community health
                    "#2AB56F", "#39BE7B", "#49C787", "#58D093", "#67D9A0", "#76E2AC", "#86EBB8", '#baf7d7', // culture and art
                    "#B0D65C","#B4D863","#B7DA6B","#BBDC72","#BFDE7A","#C3E081","#C6E289","#CAE490","#CEE697","#D1E89F","#D5EAA6","#D9ECAE","#DDEEB5","#E0F0BD","#E4F2C4", // admin
                    "#fbf8b0", // general city responsibility
                    "#F4A42F","#F4A93D","#F4AF4B","#F3B459","#F3BA68","#F3BF76","#F3C484","#F2CA92","#F2CFA0", // welfare
                    "#D63C0D","#D9481C","#DC542B","#DF603A","#E26C49","#E57959","#E88568","#EB9177","#EE9D86","#F1A995","#F4B5A4", // public protection
                    "#B5182F","#BC273D","#C2374C","#C9465A","#D05569","#D66477","#DD7485","#E38394","#EA92A2"]);  // public works, transport, commerce

        var ring2Color = d3.scaleOrdinal()
            .domain(ring2Data.map(d => d.id))
            .range(['#03628c', '#146f98', '#247ca3', '#3589ae', '#4696ba', '#57a4c6', '#68b1d1', '#78bedc', '#89cbe8', // health
            '#2ab56f', '#32ba75', '#39be7b', '#41c381', '#49c787', '#50cc8d', '#58d093', '#60d49a', '#67d9a0', '#6fdea6', '#76e2ac', '#7ee6b2', '#86ebb8', '#8df0be', '#95f4c4', '#baf7d7', // culture
            '#98c129', '#99c22b', '#9ac22d', '#9bc32f', '#9cc432', '#9dc434', '#9ec536', '#9fc638', '#a0c63a', '#a2c73c', '#a3c83f', '#a4c841', '#a5c943', '#a6ca45', '#a7cb47', '#a8cb49', '#a9cc4b', '#aacd4e', '#abcd50', '#acce52', '#adcf54', '#aecf56', '#afd058', '#b0d15b', '#b1d15d', '#b2d25f', '#b3d361', '#b4d363', '#b6d465', '#b7d567', '#b8d56a', '#b9d66c', '#bad76e', '#bbd770', '#bcd872', '#bdd974', '#beda76', '#bfda79', '#c0db7b', '#c1dc7d', '#c2dc7f', '#c3dd81', '#c4de83', '#c5de86', '#c6df88', '#c8e08a', '#c9e08c', '#cae18e', '#cbe290', '#cce292', '#cde395', '#cee497', '#cfe499', '#d0e59b', '#d1e69d', '#d2e69f', '#d3e7a2', '#d4e8a4', '#d5e8a6', '#d6e9a8', '#d7eaaa', '#d8ebac', '#d9ebae', '#dbecb1', '#dcedb3', '#ddedb5', '#deeeb7', '#dfefb9', '#e0efbb', '#e1f0be', '#e2f1c0', '#e3f1c2', '#e4f2c4', // admin
            '#fbf8b0', // general city responsibility
            '#f4a42f', '#f4a838', '#f4ab42', '#f4af4b', '#f3b255', '#f3b65e', '#f3ba68', '#f3bd71', '#f3c17a', '#f2c484', '#f2c88d', '#f2cb97', '#f2cfa0', // welfare
            '#d63c0d', '#d74012', '#d84416', '#d9471b', '#da4b20', '#db4f25', '#dc5329', '#dd562e', '#de5a33', '#de5e37', '#df623c', '#e06641', '#e16946', '#e26d4a', '#e3714f', '#e47554', '#e57858', '#e67c5d', '#e78062', '#e88467', '#e9886b', '#ea8b70', '#eb8f75', '#ec937a', '#ec977e', '#ed9b83', '#ee9e88', '#efa28c', '#f0a691', '#f1aa96', '#f2ad9b', '#f3b19f', '#f4b5a4', // 
            '#b5182f', '#b61a31', '#b71c33', '#b81e35', '#b92037', '#b92239', '#ba243b', '#bb263d', '#bc293f', '#bd2b41', '#be2d42', '#bf2f44', '#c03146', '#c13348', '#c2354a', '#c2374c', '#c3394e', '#c43b50', '#c53d52', '#c63f54', '#c74156', '#c84358', '#c9455a', '#ca485c', '#cb4a5e', '#cb4c60', '#cc4e62', '#cd5064', '#ce5266', '#cf5468', '#d05669', '#d1586b', '#d25a6d', '#d35c6f', '#d45e71', '#d46073', '#d56275', '#d66577', '#d76779', '#d8697b', '#d96b7d', '#da6d7f', '#db6f81', '#dc7183', '#dd7385', '#dd7587', '#de7789', '#df798b', '#e07b8d', '#e17d8f', '#e27f90', '#e38192', '#e48494', '#e58696', '#e68898', '#e68a9a', '#e78c9c', '#e88e9e', '#e990a0', '#ea92a2']);  // public works, transport, commerce
                    
        for (let j = 0; j < 7; j++) {
            var filteredDataRing1 = ring1Data.filter(d => serviceAreasArray[j].includes(d.service_area));
            var filteredDataRing2 = ring2Data.filter(d => serviceAreasArray[j].includes(d.service_area));

            // create pop-up areas
            var foreignObject = svg.append("foreignObject")
                .attr("id", "foreign-object-" + serviceAreasConcatArray[j])
                .attr("class", "foreign-object")
                .attr("x", -200 + xoffset)
                .attr("y", -140  + yoffset + donutOffsets[j])
                .attr("width", 250)
                .attr("height", 280);
            
            ///
            /// RING 1
            ///

            svg.append("g")
                .attr("id", "all-sections-ring1")
                .selectAll()
                .data(pie(filteredDataRing1))
                .join("path")
                .attr("fill", d => ring1Color(d.data.id))
                .attr("d", ring1Arc)
                .attr("id", (d) => "section" + d.data.id)
                .attr("class", `section ring-1-section ${serviceAreasConcatArray[j]}`)
                .attr("transform", `translate(${xoffset}, ${yoffset + donutOffsets[j]})`)
                .on("mouseover", mouseoverSection)
                .on("mouseout", mouseoutSection)
                .on("click", mouseClickSection)
                .each(function(d) {
                    d.centroid = ring1Arc.centroid(d);
                });
            var allSections = document.getElementById("all-sections-ring1");

            ///
            /// RING 2
            ///

            svg.append("g")
                .attr("id", "all-sections-ring2")
                .selectAll()
                .data(pie(filteredDataRing2))
                .join("path")
                .attr("fill", d => ring2Color(d.data.id))
                .attr("d", ring2Arc)
                .attr("id", (d) => "section" + d.data.id)
                .attr("class", `section ring-2-section ${serviceAreasConcatArray[j]}`)
                .attr("transform", `translate(${xoffset}, ${yoffset + donutOffsets[j]})`)
                .on("mouseover", mouseoverSection)
                .on("mouseout", mouseoutSection)
                .on("click", mouseClickSection)
                .each(function(d) {
                    d.centroid = ring2Arc.centroid(d);
                })
                .style("display", (d) => d.data.single_entity === "yes" ? "none" : null);
            var allSections = document.getElementById("all-sections-ring2");

            ///
            /// TITLES
            ///

            svg.selectAll("foreignObject")
                .data(serviceAreasHTML)
                .enter()
                .append("foreignObject")
                .attr("x", -235)
                .attr("y", (d, i) => (i * 1000) - 1500 + yoffset)
                .attr("width", 400)
                .attr("height", 150)
                .html(d => `<div>${d}</div>`)
                .style("font-size", "28px")
                .style("font-weight", 600)
                .style("color", "black")
                .attr("pointer-events", "none");

            ///
            /// HOVER LABELS
            ///

            const allData = [filteredDataRing1, filteredDataRing2];
            const textsGroup = svg.append("g")
                .attr("class", "texts")
                .attr("font-family", "Calibri");

            textsGroup.selectAll("text")
                .data(allData)
                .enter()
                .append("g")
                .attr("class", (d, i) => `text-group text-source${i + 1}`)
                .selectAll("text")
                .data((d) => d)
                .enter()
                .append("text")
                .text((d) => d.name)
                .attr("font-size", 24)
                .attr("text-anchor", "middle")
                .attr("id", (d) => "text" + d.id)
                .attr("class", "shadow")
                .attr("dx", xoffset)
                .attr("dy", yoffset + donutOffsets[j])
                .style("visibility", "hidden")
                .style("pointer-events", "none")
                .each(function (d) {
                    if (d.id.slice(-1) == "1") {
                        const arc = d3.select("#section" + d.id);
                        const centroid = ring1Arc.centroid(arc.datum());
                        d3.select(this).attr("x", centroid[0]).attr("y", centroid[1]);
                    }
                    else {
                        const arc = d3.select("#section" + d.id);
                        const centroid = ring2Arc.centroid(arc.datum());
                        d3.select(this).attr("x", centroid[0]).attr("y", centroid[1]);
                    }
                });

        }

        // hover effects
        function mouseoverSection(i, d) {
            this.parentNode.removeChild(this);
            allSections.appendChild(this);
            d3.select("#section" + d.data.id)
                .transition()
                .duration(50)
                .attr("stroke-width", 4)
                .attr("stroke", "#000000")
                .attr("cursor", "pointer");
            d3.select("#text" + d.data.id).style("visibility", "visible");
        }
        function mouseoutSection() {
            d3.selectAll(".section")
                .transition()
                .duration(50)
                .attr("stroke-width", 0)
                .attr("stroke", "#000000")
                .attr("cursor", "pointer");
            d3.selectAll(".shadow").style("visibility", "hidden");
        }

        // apply search colors
        checkSearch();

        function mouseClickSection(d) {
            const clickedData = d3.select(this).datum();

            if (clickedData == lastClicked) {
                d3.selectAll('.foreign-object').html("");
                // remove text from the center of the ring, remove highlight
                foreignObject.html("");
                var allElements = d3.selectAll(".section");
                allElements.style("opacity", 1);

                lastClicked = null;
                return lastClicked;
            }
            else {
                // add text to the center of the ring
                d3.selectAll('.foreign-object').html("");
                localForeignObject = d3.select("#foreign-object-" + clickedData['data']['service_area_small']);

                const htmlDescription = clickedData.data.html_description;
                localForeignObject
                    .append("xhtml:div")
                    .attr("class", "text-container")
                    .html(htmlDescription);

                // highlight the selected section
                var allElements = d3.selectAll(".section");
                var selectedElement = d3.select("#" + this.id);
                allElements.style("opacity", 0.5);
                selectedElement.style("opacity", 1);

                lastClicked = clickedData;
                return lastClicked;
            }
        }

        // Search function
        function checkSearch() {
            var searchTerm = d3
                .select("#searchbar")
                .property("value")
                .toLocaleUpperCase();
            d3.selectAll(".ring-1-section")
                .attr("fill", d => ring1Color(d.data.id))
            d3.selectAll(".ring-2-section")
                .attr("fill", d => ring2Color(d.data.id))
            d3.selectAll(".section")
                .filter((d) => d.data.search.toLocaleUpperCase().indexOf(searchTerm) == -1)
                .attr("fill", "#e8e8e8");
        }

        d3.select("#searchbar").on("keyup", function () {
            checkSearch();
        });

        // Put up message if no checkboxes are selected
        if (serviceAreasArray.length === 0) {
            d3.select("#foreign-object")
                .html("<h2>Select a checkbox to explore the budget.</h2>");
        }

    });
}

document.getElementById("button2324").addEventListener("click", function() {
    selectedButton = "2324";
    serviceAreasHTML = ['',
        '<p>Community Health<br/><span class="subhead">$3.24B | <span class="positive-percent">+7.95%</span></span></p>',
        '<p>Culture & Recreation<br/><span class="subhead">$579M | <span class="positive-percent">+6.02%</span></span></p>',
        '<p>General Admin & Finance<br/><span class="subhead">$1.57B | <span class="negative-percent">-0.07%</span></span></p>',
        '<p>General City Responsibility<br/><span class="subhead">$1.81B | <span class="positive-percent">+2.48%</span></span></p>',
        '<p>Human Welfare & Neighborhood<br/><span class="subhead">$2.64B | <span class="positive-percent">+1.77%</span></span></p>',
        '<p>Public Protection<br/><span class="subhead">$2B | <span class="positive-percent">+3.52%</span></span></p>',
        '<p>Public Works, Transportation & Commerce<br/><span class="subhead">$5.4B | <span class="positive-percent">+2.58%</span></span></p>'];
    createDonut(selectedButton, serviceAreasArray, serviceAreasHTML);
});
document.getElementById("button2425").addEventListener("click", function() {
    selectedButton = "2425";
    createDonut(selectedButton, serviceAreasArray, serviceAreasHTML);
    serviceAreasHTML = ['',
        '<p>Community Health<br/><span class="subhead">$3.21B | <span class="positive-percent">+7.1%</span></span></p>',
        '<p>Culture & Recreation<br/><span class="subhead">$561M | <span class="positive-percent">+1%</span></span></p>',
        '<p>General Admin & Finance<br/><span class="subhead">$1.6B | <span class="negative-percent">-0.07%</span></span></p>',
        '<p>General City Responsibility<br/><span class="subhead">$1.91B | <span class="positive-percent">+2.48%</span></span></p>',
        '<p>Human Welfare & Neighborhood<br/><span class="subhead">$2.64B | <span class="positive-percent">+1.77%</span></span></p>',
        '<p>Public Protection<br/><span class="subhead">$2B | <span class="positive-percent">+3.52%</span></span></p>',
        '<p>Public Works, Transportation & Commerce<br/><span class="subhead">$5.4B | <span class="positive-percent">+2.58%</span></span></p>'];
});

// Begin
createDonut(selectedButton, serviceAreasArray, serviceAreasHTML);