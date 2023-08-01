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

let ring1Data_2324, ring1Data_2425;

const fetchRing1_2324 = fetch('data_spending_source_2324.json')
    .then(response => response.json())
    .then(data => {
        ring1Data_2324 = data;
    });

const fetchRing1_2425 = fetch('data_spending_source_2425.json')
    .then(response => response.json())
    .then(data => {
        ring1Data_2425 = data;
    });

var typeArray = ['Taxes','Government','Prior year','Other'];
var selectedButton = "2324";

// Main function
function createDonut(selectedButton, typeArray) {
    Promise.all([fetchRing1_2324, fetchRing1_2425])
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
            }
            if (selectedButton == "2425") {
                ring1Data = ring1Data_2425;
            }

            ///
            /// RING 1
            ///

            const ring1Arc = d3.arc()
                .innerRadius((radius * 0.4) * multiplier)
                .outerRadius((radius - 90) * multiplier);

            var filteredDataRing1 = ring1Data.filter(d => typeArray.includes(d.type));
            var ring1Color = d3.scaleOrdinal()
                .domain(ring1Data.map(d => d.id))
                .range(['#00b22e', '#26cd51', '#4be874', // taxes
                        '#0707a5', '#3131ce', '#5c5cf7', // government
                        "#b500ac", "#ef48e8", // prior year
                        '#595959', '#676767', '#767676', '#848484', '#929292', '#a1a1a1', '#afafaf']);  // other

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
            /// Make hover labels
            ///

            const textsGroup = svg.append("g")
                .attr("class", "texts")
                .attr("font-family", "Calibri");

            console.log(filteredDataRing1)

            textsGroup.selectAll("text")
                .data(filteredDataRing1)
                .enter()
                .append("g")
                .attr("class", (d, i) => `text-group text-source${i + 1}`)
                .append("text")
                .text((d) => d.name)
                .attr("font-size", 18)
                .attr("text-anchor", "middle")
                .attr("id", (d) => "text" + d.id)
                .attr("class", "shadow")
                .style("visibility", "hidden")
                .style("pointer-events", "none")
                .each(function (d) {
                    const arc = d3.select("#section" + d.id);
                    const centroid = ring1Arc.centroid(arc.datum());
                    d3.select(this)
                        .attr("x", centroid[0])
                        .attr("y", centroid[1]);
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
                console.log(d.data.id)
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
                d3.selectAll(".section")
                    .filter((d) => d.data.name.toLocaleUpperCase().indexOf(searchTerm) == -1)
                    .attr("fill", "#e8e8e8");
            }

            d3.select("#searchbar").on("keyup", function () {
                checkSearch();
            });

            // Put up message if no checkboxes are selected
            if (typeArray.length === 0) {
                d3.select("#foreign-object")
                    .html("<h2>Select a checkbox to explore sources of funding.</h2>");
            }

    });
}

document.getElementById("button2324").addEventListener("click", function() {
    selectedButton = "2324";
    createDonut(selectedButton, typeArray);
});
document.getElementById("button2425").addEventListener("click", function() {
    selectedButton = "2425";
    createDonut(selectedButton, typeArray);
});

///
/// Checkbox event listeners
///

function addCheckboxEventListener(checkboxId, area) {
    var checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            typeArray.push(area);
        } else {
            typeArray = typeArray.filter(item => item !== area);
        }
        createDonut(selectedButton, typeArray);
    });
}

addCheckboxEventListener('government-checkbox', 'Government');
addCheckboxEventListener('taxes-checkbox', 'Taxes');
addCheckboxEventListener('prior-checkbox', 'Prior year');
addCheckboxEventListener('other-checkbox', 'Other');

// Begin
createDonut(selectedButton, typeArray);