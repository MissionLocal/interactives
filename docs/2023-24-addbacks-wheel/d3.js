// define variables
const width = 500;
const height = Math.min(width, 500);
const radius = (Math.min(width, height) / 2) * 600/550;

multiplier = 1.1;
xoffset = 0;
yoffset = 0;
lastClicked = null;

///
/// IMPORT DATA
///

let ring1Data_2324, ring2Data_2324, ring1Data_2425, ring2Data_2425;

const fetchRing1_2324 = fetch('data_department_addbacks_2324.json')
    .then(response => response.json())
    .then(data => {
        ring1Data_2324 = data;
    });

const fetchRing2_2324 = fetch('data_division_addbacks_2324.json')
    .then(response => response.json())
    .then(data => {
        ring2Data_2324 = data;
    });

const fetchRing1_2425 = fetch('data_department_addbacks_2425.json')
    .then(response => response.json())
    .then(data => {
        ring1Data_2425 = data;
    });

const fetchRing2_2425 = fetch('data_division_addbacks_2425.json')
    .then(response => response.json())
    .then(data => {
        ring2Data_2425 = data;
    });

var serviceAreasArray = ['Community Health', 'Culture & Recreation','General Administration & Finance Departments','General City Responsibility','Human Welfare & Neighborhood Development', 'Public Protection','Public Works, Transportation & Commerce'];
var selectedButton = "2324";

// Main function
function createDonut(selectedButton, serviceAreasArray) {
    Promise.all([fetchRing1_2324, fetchRing2_2324, fetchRing1_2425, fetchRing2_2425])
    .then(() => {
        // remove old svg
        d3.select("#donut-1-svg").selectAll("*").remove();

        var pie = d3.pie()
            .sort(null)
            .value(d => d.value);

        var svg = d3.select("#donut-1-svg")
            .append("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, height])

            var foreignObject = svg.append("foreignObject")
                .attr("id", "foreign-object")
                .attr("x", -73 + xoffset)
                .attr("y", -100  + yoffset)
                .attr("width", 160)
                .attr("height", 190);

            if (selectedButton == "2324") {
                ring1Data = ring1Data_2324;
                ring2Data = ring2Data_2324;
            }
            if (selectedButton == "2425") {
                ring1Data = ring1Data_2425;
                ring2Data = ring2Data_2425;
            }

            ///
            /// RING 1
            ///

            const ring1Arc = d3.arc()
                .innerRadius((radius * 0.45) * multiplier)
                .outerRadius((radius - 101) * multiplier);

            var filteredDataRing1 = ring1Data.filter(d => serviceAreasArray.includes(d.service_area));
            var ring1Color = d3.scaleOrdinal()
                .domain(ring1Data.map(d => d.id))
                .range(["#4288b5", // community health
                        "#2ab56f", "#95f4c4", // culture and art
                        '#98c129', '#b1d15d', '#cbe290', '#e4f2c4', // admin
                        "#fbf8b0", // general city responsibility
                        '#f4a42f', '#f4ab42', '#f3b255', '#f3ba68', '#f3c17a', '#f2c88d', '#f2cfa0', // welfare
                        '#f6834f', // public protection
                        '#b5182f', '#d05568', '#ea92a2']);  // public works, transport, commerce

            svg.append("g")
                .attr("id", "all-sections-ring1")
                .selectAll()
                .data(pie(filteredDataRing1))
                .join("path")
                .attr("fill", d => ring1Color(d.data.id))
                .attr("d", ring1Arc)
                .attr("id", (d) => "section" + d.data.id)
                .attr("class", "section ring-1-section")
                .attr("transform", `translate(${xoffset}, ${yoffset})`)
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

            const ring2Arc = d3.arc()
                .innerRadius((radius * 0.75) * multiplier)
                .outerRadius((radius - 100) * multiplier);

            var filteredDataRing2 = ring2Data.filter(d => serviceAreasArray.includes(d.service_area));
            var ring2Color = d3.scaleOrdinal()
                .domain(ring2Data.map(d => d.id))
                .range(['#03628c', '#146f98', '#247ca3', '#3589ae', '#4696ba', '#57a4c6', '#68b1d1', '#78bedc', '#89cbe8', // health
                '#2ab56f', '#45c584', '#60d49a', '#7ae4af', '#95f4c4', // culture
                '#98c129', '#9bc32f', '#9ec535', '#a1c73c', '#a4c942', '#a7cb48', '#aacd4e', '#adcf54', '#b0d15b', '#b3d361', '#b6d567', '#b9d76d', '#bcd973', '#c0da7a', '#c3dc80', '#c6de86', '#c9e08c', '#cce292', '#cfe499', '#d2e69f', '#d5e8a5', '#d8eaab', '#dbecb1', '#deeeb8', '#e1f0be', // admin
                '#f1e983', '#f5f0ae', // general city responsibility
                '#f4a42f', '#f4a635', '#f4a93b', '#f4ab41', '#f4ad47', '#f3af4d', '#f3b253', '#f3b459', '#f3b65f', '#f3b865', '#f3bb6a', '#f3bd70', '#f3bf76', '#f3c17c', '#f3c482', '#f2c688', '#f2c88e', '#f2ca94', '#f2cd9a', '#f2cfa0', // welfare
                '#f6834f', // public protection
                '#b5182f', '#b71d34', '#b92239', '#bc273d', '#be2c42', '#c03147', '#c2364c', '#c43c51', '#c74155', '#c9465a', '#cb4b5f', '#cd5064', '#d05568', '#d25a6d', '#d45f72', '#d66477', '#d8697c', '#db6e80', '#dd7385', '#df798a', '#e17e8f', '#e38394', '#e68898', '#e88d9d', '#ea92a2']);  // public works, transport, commerce

            svg.append("g")
                .attr("id", "all-sections-ring2")
                .selectAll()
                .data(pie(filteredDataRing2))
                .join("path")
                .attr("fill", d => ring2Color(d.data.id))
                .attr("d", ring2Arc)
                .attr("id", (d) => "section" + d.data.id)
                .attr("class", "section ring-2-section")
                .attr("transform", `translate(${xoffset}, ${yoffset})`)
                .on("mouseover", mouseoverSection)
                .on("mouseout", mouseoutSection)
                .on("click", mouseClickSection)
                .each(function(d) {
                    d.centroid = ring2Arc.centroid(d);
                })
                .style("display", (d) => d.data.single_entity === "yes" ? "none" : null);
            var allSections = document.getElementById("all-sections-ring2");

            ///
            /// Make hover labels
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
                .attr("font-size", 12)
                .attr("text-anchor", "middle")
                .attr("id", (d) => "text" + d.id)
                .attr("class", "shadow")
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
                        d3.select(this)
                            .attr("x", centroid[0])
                            .attr("y", centroid[1]);
                    }
                });

            // apply search colors
            checkSearch();

            // hover effects
            function mouseoverSection(i, d) {
                this.parentNode.removeChild(this);
                allSections.appendChild(this);
                d3.select("#section" + d.data.id)
                    .transition()
                    .duration(50)
                    .attr("stroke-width", 2)
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

            function mouseClickSection(d) {
                const clickedData = d3.select(this).datum();

                if (clickedData == lastClicked) {
                    // remove text from the center of the ring, remove highlight
                    foreignObject.html("");
                    var allElements = d3.selectAll(".section");
                    allElements.style("opacity", 1);

                    lastClicked = null;
                    return lastClicked;
                }
                else {
                    // add text to the center of the ring
                    foreignObject.html("");
                    const htmlDescription = clickedData.data.html_description;
                    foreignObject
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
    createDonut(selectedButton, serviceAreasArray);
});
document.getElementById("button2425").addEventListener("click", function() {
    selectedButton = "2425";
    createDonut(selectedButton, serviceAreasArray);
});

///
/// Checkbox event listeners
///

function addCheckboxEventListener(checkboxId, area) {
    var checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            serviceAreasArray.push(area);
        } else {
            serviceAreasArray = serviceAreasArray.filter(item => item !== area);
        }
        createDonut(selectedButton, serviceAreasArray);
    });
}

addCheckboxEventListener('health-checkbox', 'Community Health');
addCheckboxEventListener('culture-checkbox', 'Culture & Recreation');
addCheckboxEventListener('admin-checkbox', 'General Administration & Finance Departments');
addCheckboxEventListener('city-checkbox', 'General City Responsibility');
addCheckboxEventListener('welfare-checkbox', 'Human Welfare & Neighborhood Development');
addCheckboxEventListener('protection-checkbox', 'Public Protection');
addCheckboxEventListener('public-works-checkbox', 'Public Works, Transportation & Commerce');

// Begin
createDonut(selectedButton, serviceAreasArray);