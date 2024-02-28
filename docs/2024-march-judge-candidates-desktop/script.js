
// margin convention - depends on screen size
const margin = { top: 0, right: 5, bottom: 5, left: 5 };
const width = 750 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

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
    .domain(['Seat 1', 'Seat 13'])
    .range(["#6BCAE2", "#1f78b4"]);

// set radius scale
const radiusScale = d3.scaleSqrt()
    .domain([0, 500000])
    .range([0, 45]);

// create currency formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

// x position scale
const positions = ['left', 'right'];
const xPositionScale = d3.scalePoint()
    .domain(positions)
    .range([width / 4, width * 3 / 4]);

///
/// dealing with the data
///

// load csv

var file = 'data.csv'
d3.csv(file).then(ready);

function ready(data) {
    // filter data
    filteredData = data.filter(d => d.race === "judge");

    // extract unique values, add 'all', and populate dropdown
    var uniqueContests = Array.from(new Set(filteredData.map(d => d.contest)));

    uniqueContests.sort();

    uniqueContests.unshift("Seat 1");
    d3.select("#dropdown")
        .selectAll("option")
        .data(uniqueContests)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d)
        .property("selected", function (d) { return d === "All"; });

    var measure = "Seat 1";
    updateData(measure, filteredData);

    // Call the updateData function with the default measure
    updateData("Seat 1", filteredData);


}
// add event listeners to the buttons
d3.select("#button-seat1").on("click", function () {
    updateData("Seat 1", filteredData);
});

d3.select("#button-seat13").on("click", function () {
    updateData("Seat 13", filteredData);
});

// update data based on dropdown selection
function updateData(measure, datapoints) {

    var nest = d3.nest()
        .key(d => d.contest)
        .key(d => d.position)
        .rollup(v => d3.sum(v, d => d.amount))
        .entries(datapoints);

    var left_total = 0;
    var right_total = 0;
    var leftName = "";
    var rightName = "";

    if (measure === "Seat 1" || measure === "Seat 13") {
        var selectedContest = nest.find(contest => contest.key === measure);
        if (selectedContest) {
            selectedContest.values.forEach(position => {
                if (position.key === "left") {
                    left_total += position.value;
                    console.log(leftName);
                } else if (position.key === "right") {
                    right_total += position.value;
                }
            });
        }
    }


    // remove existing stuff
    d3.selectAll('circle').remove();
    d3.selectAll('text').remove();

    // create headings

    headingLeft = svg.append("text")
        .attr("x", width / 4)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("class", "heading")
        .text(leftName)
        .style("visibility", "hidden");

    headingLeftTotal = svg.append("text")
        .attr("x", width / 4)
        .attr("y", height - 20)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("class", "heading")
        .text("Total: " + formatter.format(left_total))
        .style("visibility", "hidden");

    headingRight = svg.append("text")
        .attr("x", width * 3 / 4)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("class", "heading")
        .text(rightName)
        .style("visibility", "hidden");

    headingRightTotal = svg.append("text")
        .attr("x", width * 3 / 4)
        .attr("y", height - 20)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("class", "heading")
        .text("Total: " + formatter.format(right_total))
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
        .attr('fill', d => colorScale(d.position))
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
        .force("collide", d3.forceCollide().radius(d => (radiusScale(d.amount)) + 2).iterations(2).strength(collideStrength))
        .force('x', d3.forceX(d => xPositionScale(d.position)).strength(xStrength))
        .force('y', d3.forceY(height / 2).strength(xStrength))

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
            headingLeft
                .style("visibility", "visible")
            headingRight
                .style("visibility", "visible")
            headingLeftTotal
                .style("visibility", "visible")
            headingRightTotal
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
            + "<p><strong>Committee:</strong> " + d.committee_name + "</p>");

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
    d3.selectAll("circle").attr("fill", d => colorScale(d.position))
    d3.selectAll("circle").filter(d => d.name.toLocaleUpperCase().indexOf(searchTerm) == -1).attr('fill', "rgba(200, 200, 200, 1)")

})

// Update the event listeners for the buttons
d3.select("#button-seat1").on("click", function () {
    // Remove the 'active' class from all buttons
    d3.selectAll("button").classed("active", false);
    // Add the 'active' class to the clicked button
    d3.select(this).classed("active", true);
    // Call the updateData function with the selected measure
    updateData("Seat 1", filteredData);
});

d3.select("#button-seat13").on("click", function () {
    // Remove the 'active' class from all buttons
    d3.selectAll("button").classed("active", false);
    // Add the 'active' class to the clicked button
    d3.select(this).classed("active", true);
    // Call the updateData function with the selected measure
    updateData("Seat 13", filteredData);
});

// Default to "Seat 1" being highlighted
d3.select("#button-seat1").classed("active", true);




