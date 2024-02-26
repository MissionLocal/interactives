///
/// set up svgs
///

// margin convention - depends on screen size
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = 360 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// create svg container
const svg = d3.select("#chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart")
    .append("g")
    .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

///
/// variables
///

// define tooltip width
var maxTooltipWidth = 250;
var xStrength = 1;
var yStrength = 1;
var collideStrength = 1;


// define colour scale
const colorScale = d3.scaleOrdinal()
    .domain(['Measure A', 'Measure B', 'Measure C', 'Measure E', 'Measure F'])
    .range(["#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce", "#dddddd"]);

// set radius scale
const radiusScale = d3.scaleSqrt()
    .domain([0, 500000])
    .range([0, 30]);

// create currency formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

// y position scale
const positions = ['Support', 'Oppose'];
const yPositionScale = d3.scalePoint()
    .domain(positions)
    .range([150, 450]);

///
/// dealing with the data
///

// load csv
var file = 'data.csv'
d3.csv(file).then(ready);
function ready(data) {
    // filter data
    filteredData = data.filter(d => d.race === "Measure");


    // extract unique values, add 'all', and populate dropdown
    var uniqueContests = Array.from(new Set(filteredData.map(d => d.contest)));

    uniqueContests.sort();


    if (!uniqueContests.includes("Measure A")) {
        uniqueContests.unshift("Measure A");
    }

    d3.select("#dropdown")
        .selectAll("option")
        .data(uniqueContests)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d)
        .property("selected", function (d) { return d === "All"; });

    var measure = "Measure A";
    updateData(measure, filteredData);
}

// add an event listener to the dropdown
d3.select("#dropdown").on("change", function () {
    var selectedMeasure = this.value;
    updateData(selectedMeasure, filteredData);
});

// update data based on dropdown selection
function updateData(measure, datapoints) {

    var nest = d3.nest()
        .key(d => d.contest)
        .key(d => d.position) // Nest by position as well
        .rollup(v => d3.sum(v, d => d.amount))
        .entries(datapoints);

    var support_total = 0;
    var oppose_total = 0;

    if (measure === "All") {
        nest.forEach(contest => {
            contest.values.forEach(position => {
                if (position.key === "Support") {
                    support_total += position.value;
                } else if (position.key === "Oppose") {
                    oppose_total += position.value;
                }
            });
        });
    } else {
        var selectedContest = nest.find(contest => contest.key === measure);
        if (selectedContest) {
            selectedContest.values.forEach(position => {
                if (position.key === "Support") {
                    support_total += position.value;
                } else if (position.key === "Oppose") {
                    oppose_total += position.value;
                }
            });
        }
    }

    console.log("support " + support_total);
    console.log("oppose " + oppose_total);


    // remove existing stuff
    d3.selectAll('circle').remove();
    d3.selectAll('text').remove();

    // create support/opposition headings
    headingSupport = svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("font-weight", 600)
        .text("Support")
        .style("visibility", "hidden");

    headingOppose = svg.append("text")
        .attr("x", width / 2)
        .attr("y", (height / 2) + 20)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("font-weight", 600)
        .attr("class", "heading")
        .text("Oppose")
        .style("visibility", "hidden");

    headingSupportTotal = svg.append("text")
        .attr("x", width / 2)
        .attr("y", (height / 2) - 35)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .text("Total: " + formatter.format(support_total))
        .style("visibility", "hidden");

    headingOpposeTotal = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("class", "heading")
        .text("Total: " + formatter.format(oppose_total))
        .style("visibility", "hidden");

    // run simulation - all or filtered
    if (measure === "All") {
        runSimulation(datapoints);
    }
    else {
        var filteredDatapoints = filteredData.filter(d => d.contest === measure);
        runSimulation(filteredDatapoints);
    }

}

// run d3 force simulation
function runSimulation(datapoints) {

    // define nodes
    var nodeElements = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(datapoints)
        .enter()
        .append("circle")
        .attr("id", function (d, i) { return "node_id" + i })
        .attr("stroke-width", 2)
        .attr("stroke", "#FFFFFF00")
        .attr("r", d => radiusScale(d.amount))
        .attr('fill', d => colorScale(d.contest))
        .style("visibility", "hidden")
        .on("click", popup)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

    // define node labels
    var labelElements = svg.append("g")
        .attr("class", "texts")
        .attr("font-family", "Barlow")
        .selectAll("text")
        .data(datapoints)
        .enter()
        .append("text")
        .text(function (node) { return node.name })
        .attr("font-size", 15)
        .attr("text-anchor", "middle")
        .attr("id", function (d, i) { return "label_id" + i })
        .attr("class", "shadow")
        .style("visibility", "hidden");

    // define loading screen
    var loadingScreen = svg.append("g")
        .attr("class", "loading-screen")
        .attr("font-family", "Barlow")
        .append("text")
        .text('Loading...')
        .attr("text-anchor", "middle")
        .attr("dx", width / 2)
        .attr("dy", height / 2)
        .style("visibility", "visible")

    // define simulation
    var simulation = d3
        .forceSimulation()
        .force("collide", d3.forceCollide().radius(d => (radiusScale(d.amount)) + 2).iterations(3).strength(collideStrength))
        .force('x', d3.forceX(width / 2).strength(xStrength))
        .force('y', d3.forceY(d => yPositionScale(d.position)).strength(yStrength))

    function forceSim() {
        simulation.nodes(datapoints).on('end', function () {
            nodeElements
                .attr('cx', function (node) { return node.x = Math.max(50, Math.min(width - 50, node.x)); })
                .attr('cy', function (node) { return node.y = Math.max(50, Math.min(height - 50, node.y)); })
                .style("visibility", "visible")
            labelElements
                .attr('x', function (node) { return node.x })
                .attr('y', function (node) { return node.y })
                .style("visibility", "hidden")
            headingSupport
                .style("visibility", "visible")
            headingOppose
                .style("visibility", "visible")
            headingSupportTotal
                .style("visibility", "visible")
            headingOpposeTotal
                .style("visibility", "visible")
            loadingScreen
                .style("visibility", "hidden")
        });

    }

    // run simulation
    forceSim();
}

///
/// extra interactivity
///

// change node + label appearance on mouseover
function mouseover(d, i) {
    d3.select("#node_id" + i)
        .transition()
        .duration(100)
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("cursor", "pointer");
    d3.select("#label_id" + i)
        .attr("dx", 0)
        .attr("dy", d => radiusScale(d.amount) + 15)
        .style("visibility", "visible");
}

// change node + label appearance on mouseout
function mouseout(d, i) {
    d3.select("#node_id" + i)
        .transition()
        .duration(100)
        .attr("stroke-width", 2)
        .attr("stroke", "#FFFFFF00")
        .attr("cursor", "pointer");
    d3.select("#label_id" + i)
        .style("visibility", "hidden");
}

// create pop-up
function popup(d) {
    // remove previous pop-up if it exists
    if (document.getElementById('tooltipdiv')) {
        document.getElementById('tooltipdiv').remove();
    }

    // initialize tooltip (invisible at this point)
    var tooltip = d3.select("body")
        .append("div")
        .attr('id', 'tooltipdiv')
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("max-width", maxTooltipWidth + "px")
        .html("<div class='popup-header'><h4>" +
            d.name +
            "</h4>" +
            "<p class='close-button'>✖</p>" +
            "</div>" +
            "<hr>"
            + "<p><strong>Amount:</strong> " + formatter.format(d.amount) + "</p>"
            + "<p><strong>Measure:</strong> " + d.contest + "</p>")
    //+ "<p><strong>Position:</strong> " + d.position + "</p>");

    // get all sorts of coordinates
    var topBuffer = 40;
    var mouseX = d3.event.pageX;
    var mouseY = d3.event.pageY;
    var tooltipWidth = document.getElementById('tooltipdiv').offsetWidth;
    var tooltipHeight = document.getElementById('tooltipdiv').offsetHeight;
    var svgWidth = document.getElementById('chart').clientWidth;
    var svgBounds = document.getElementById('chart').getBoundingClientRect();

    // calculate svg position
    var svgPosition = {
        top: svgBounds.top + window.scrollY,
        left: svgBounds.left + window.scrollX
    };

    // if the pop-up can go by the mouse without going over the top, do that
    if (mouseY < tooltipHeight + topBuffer) {
        yPosition = topBuffer;
    }
    // otherwise, put it as high as possible
    else {
        yPosition = mouseY - tooltipHeight - 5;
    }

    // if the pop-up can go by the mouse without going over the left bounds or squashing against the right, do that
    if (mouseX - (tooltipWidth / 2) < svgPosition.left) {
        xPosition = svgPosition.left;
    }
    else if (mouseX + (tooltipWidth / 2) > svgPosition.left + svgWidth) {
        xPosition = svgPosition.left + svgWidth - tooltipWidth;
    }
    else {
        xPosition = mouseX - (tooltipWidth / 2);
    }

    tooltip
        .style('top', yPosition + "px")
        .style('left', xPosition + "px")
        .style("visibility", "visible");

    // event listener for the close button
    d3.select(".close-button").on("click", function () {
        tooltip.style("visibility", "hidden");
    });

    // event listener for clicks outside the tooltip
    d3.select("body").on("click", function () {
        tooltip.style("visibility", "hidden");
    });

    // Prevent the body click event from propagating to the tooltip div
    tooltip.on("click", function () {
        d3.event.stopPropagation();
    });

    d3.event.stopPropagation();
}

// search for individual
d3.select("#search").on('keyup', function () {
    var searchTerm = d3.select("#search").property("value").toLocaleUpperCase() // this.value
    d3.selectAll("circle").attr("fill", d => colorScale(d.contest))
    d3.selectAll("circle").filter(d => d.name.toLocaleUpperCase().indexOf(searchTerm) == -1).attr('fill', "rgba(200, 200, 200, 1)")
})