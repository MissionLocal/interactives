// define variables
const width = 500;
const height = Math.min(width, 500);
const radius = (Math.min(width, height) / 2) * 600/550;

multiplier = 2;
xoffset = 200;
yoffset = 1250;
lastClicked = null;

///
/// IMPORT DATA
///

let ring1Data_2324, ring1Data_2425

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

var typesArray = ['Taxes','Government','Prior year','Other'];
var typesHTML = ['',
    '<p>Taxes<br/><span class="subhead">$5.68B | 38.8%</span></p>',
    '<p>Government<br/><span class="subhead">$2.65B | 18.2%</span></p>',
    '<p>Prior year<br/><span class="subhead">$464.9M | 3.18%</span></p>',
    '<p>Other<br/><span class="subhead">$5.82B | 39.8%</span></p>']
var typesConcatArray = ['taxes','government','prior','other']
var donutOffsets = [0, 1000, 2000, 3000, 4000]
var selectedButton = "2324";

// Main function
function createDonut(selectedButton, typesArray, typesHTML) {
    Promise.all([fetchRing1_2324, fetchRing1_2425])
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
        }
        if (selectedButton == "2425") {
            ring1Data = ring1Data_2425;
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

        var ring1Color = d3.scaleOrdinal()
            .domain(ring1Data.map(d => d.id))
            .range(['#00b22e', '#26cd51', '#4be874', // taxes
                    '#0707a5', '#3131ce', '#5c5cf7', // government
                    "#b500ac", "#ef48e8", // prior year
                    '#595959', '#676767', '#767676', '#848484', '#929292', '#a1a1a1', '#afafaf']);  // other
                    
        for (let j = 0; j < 4; j++) {
            var filteredDataRing1 = ring1Data.filter(d => typesArray[j].includes(d.type));

            // create pop-up areas
            var foreignObject = svg.append("foreignObject")
                .attr("id", "foreign-object-" + typesConcatArray[j])
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
                .attr("class", `section ring-1-section ${typesConcatArray[j]}`)
                .attr("transform", `translate(${xoffset}, ${yoffset + donutOffsets[j]})`)
                .on("mouseover", mouseoverSection)
                .on("mouseout", mouseoutSection)
                .on("click", mouseClickSection)
                .each(function(d) {
                    d.centroid = ring1Arc.centroid(d);
                });
            var allSections = document.getElementById("all-sections-ring1");

            ///
            /// TITLES
            ///

            svg.selectAll("foreignObject")
                .data(typesHTML)
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

            const textsGroup = svg.append("g")
                .attr("class", "texts")
                .attr("font-family", "Calibri");

            textsGroup.selectAll("text")
                .data(filteredDataRing1)
                .enter()
                .append("g")
                .attr("class", (d, i) => `text-group text-source${i + 1}`)
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
                    const arc = d3.select("#section" + d.id);
                    const centroid = ring1Arc.centroid(arc.datum());
                    d3.select(this).attr("x", centroid[0]).attr("y", centroid[1]);

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
            d3.selectAll(".section")
                .filter((d) => d.data.html_description.toLocaleUpperCase().indexOf(searchTerm) == -1)
                .attr("fill", "#e8e8e8");
        }

        d3.select("#searchbar").on("keyup", function () {
            checkSearch();
        });

        // Put up message if no checkboxes are selected
        if (typesArray.length === 0) {
            d3.select("#foreign-object")
                .html("<h2>Select a checkbox to explore the budget.</h2>");
        }

    });
}

document.getElementById("button2324").addEventListener("click", function() {
    selectedButton = "2324";
    typesHTML = ['',
    '<p>Taxes<br/><span class="subhead">$5.68B | 38.8%</span></p>',
    '<p>Government<br/><span class="subhead">$2.65B | 18.2%</span></p>',
    '<p>Prior year<br/><span class="subhead">$465M | 3.18%</span></p>',
    '<p>Other<br/><span class="subhead">$5.82B | 39.8%</span></p>']
    createDonut(selectedButton, typesArray, typesHTML);
});
document.getElementById("button2425").addEventListener("click", function() {
    selectedButton = "2425";
    createDonut(selectedButton, typesArray, typesHTML);
    typesHTML = ['',
    '<p>Taxes<br/><span class="subhead">$5.73B | 39.2%</span></p>',
    '<p>Government<br/><span class="subhead">$2.3B | 15.7%</span></p>',
    '<p>Prior year<br/><span class="subhead">$573M | 3.61%</span></p>',
    '<p>Other<br/><span class="subhead">$5.73B | 41%</span></p>'];
});

// Begin
createDonut(selectedButton, typesArray, typesHTML);