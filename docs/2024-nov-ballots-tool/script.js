///
/// set up svgs
///

// margin convention - depends on screen size
const margin = { top: 10, right: 1, bottom: 10, left: 1 };
const width = 900 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// create svg container
const svg = d3.select("#chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart")
    .append("g")
    .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

    svg.append("defs")
    .append("filter")
    .attr("id", "drop-shadow")
    .append("feDropShadow")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("stdDeviation", 3)
    .attr("flood-opacity", 0.1); // Adjust shadow intensity
  


// Define box dimensions and position
const boxWidth = width / 2
const boxHeight = height - margin.top - margin.bottom; // Full height of the SVG container minus margins
const boxPadding = 10; // Padding from the edge of the SVG
const boxX = width + margin.left + margin.right - boxWidth - boxPadding; // X position
const boxY = margin.top; // Y position (align with the top margin)

// Append a group for the box
const boxGroup = svg.append("g")
    .attr("class", "box-group");

// Append the rectangle (box) to the box group
boxGroup.append("rect")
    .attr("x", boxX)
    .attr("y", boxY)
    .attr("width", boxWidth)
    .attr("height", boxHeight)
    .attr("fill", '#f7f7f7') // Light grey color
    .style("padding", boxPadding + "px")
    .attr("filter", "url(#drop-shadow)"); // Apply the shadow filter
    // Optional shadow for better visibility
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
    .domain(['Proposition A', 'Proposition B', 'Proposition C', 'Proposition D', 'Proposition E', 'Proposition F', 'Proposition G', 'Proposition H', 'Proposition I', 'Proposition J', 'Proposition K', 'Proposition L', 'Proposition M', 'Proposition N', 'Proposition O'])
    .range(["#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce","#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce","#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce"]);

// set radius scale
const radiusScale = d3.scaleSqrt()
    .domain([0, 500000])
    .range([0, 35]);

// create currency formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

///
/// dealing with the data
///

// load csv
var file = 'merged_data.csv'
d3.csv(file).then(ready);
function ready(data) {
    // filter data
    filteredData = data.filter(d => d.contest_type === "BALLOT MEASURE");

    // extract unique values, add 'all', and populate dropdown
    var uniqueContests = Array.from(new Set(filteredData.map(d => d.contest)));

    uniqueContests.sort();

    if (!uniqueContests.includes("Proposition A")) {
        uniqueContests.unshift("Proposition A");
    }

    d3.select("#dropdown")
        .selectAll("option")
        .data(uniqueContests)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d)

    var measure = "Proposition A";
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

    console.log(nest);

    var support_total = 0;
    var oppose_total = 0;
    var description = "";  // Variable to hold the description
    var sponsor = "";  // Variable to hold the sponsor  
    var details = "";  // Variable to hold the sponsor 
    var proponents = "";
    var opponents = "";
    var required = "";
    var href = ""

    if (measure === "All") {
        nest.forEach(contest => {
            contest.values.forEach(position => {
                if (position.key === "SUPPORT") {
                    support_total += position.value;
                } else if (position.key === "OPPOSE") {
                    oppose_total += position.value;
                }
            });
        });
    } else {
        var selectedContest = datapoints.find(d => d.contest === measure);
        if (selectedContest) {
            description = selectedContest.description; // Get the description
            sponsor = selectedContest.sponsor;  // Get the sponsor
            details = selectedContest.details;  // Get the sponsor
            proponents = selectedContest.proponents;
            opponents = selectedContest.opponents;
            required = selectedContest.required;
            href = selectedContest.href;
            nest.find(contest => contest.key === measure).values.forEach(position => {
                if (position.key === "SUPPORT") {
                    support_total += position.value;
                } else if (position.key === "OPPOSE") {
                    oppose_total += position.value;
                }
            });
        }
    }

    // if measure is "Commission reform", subtract $50,200 from support_total

    if (measure === "Commission reform") {
        support_total -= 50200;
    }

    // console.log("support " + support_total);
    // console.log("oppose " + oppose_total);


    var filteredDatapoints = datapoints.filter(d => d.contest === measure);


    // remove existing stuff
    d3.selectAll('circle').remove();
    d3.selectAll('text').remove();
    d3.selectAll('foreignObject').remove();

    // Append the foreignObject container for the description (as <p> tag)
    boxSponsor = boxGroup.append("foreignObject")
        .attr("x", width / 2 + 15)
        .attr("y", boxY + 10)  // Adjust vertical position
        .attr("width", boxWidth - 40) // Set the width of the box
        .attr("height", 600) // Set a height, adjust as necessary
        .append("xhtml:div")
        .html("<h3>" + measure + ": " + description + "</h3>" +
            "<p style='font-size: 16px; color: #333333; margin: 0;'><strong>How it reached the ballot: </strong>"
            + sponsor + "</p>" + "<br>" + "<p style='font-size: 16px; color: #333333; margin: 0;'><strong>What it would do: </strong>" + details + "</p>"
            + "<br>" + "<p style='font-size: 16px; color: #333333; margin: 0;'><strong>Proponents include: </strong>" + proponents + "</p>"
            + "<br>" + "<p style='font-size: 16px; color: #333333; margin: 0;'><strong>Opponents include: </strong>" + opponents + "</p>" +
            "<br>" + "<p style='font-size: 16px; color: #333333; margin: 0;'><strong>To pass: </strong>" + required + "</p>"
            + "<p style='font-size: 16px; color: #333333; margin: 0;'>" + "<br>Watch a 60 second recap <a class='link' target=\"_blank\" href=" + href + ">here</a>. </p>"
        );
        
        heading = svg.append("foreignObject")
        .data(filteredDatapoints)
        .attr("x", width / 4 - 100)
        .attr("y", boxY + 10)  // Adjust vertical position
        .attr("width", boxWidth - 10) // Set the width of the box
        .attr("height", 400) // Set a height, adjust as necessary
        .append("xhtml:div")
        .html(function(d) {
            return "<h3>Money raised <span style='background:" + colorScale(d.contest) + "; padding: 5px 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);'>for</span> and <span style='background:#cccccc; padding: 5px 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);'>against</span></h3>";
        });
    

    headingSupportTotal = svg.append("text")
        .attr("x", width / 4)
        .attr("y", height - 50)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .text("Total for: " + formatter.format(support_total))
        .style("visibility", "visible");

    headingOpposeTotal = svg.append("text")
        .attr("x", width / 4)
        .attr("y", height - 25)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("class", "heading")
        .text("Total against: " + formatter.format(oppose_total))
        .style("visibility", "visible");

    nodeElements = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(filteredDatapoints)
        .enter()
        .append("circle")
        .attr("id", d => d.node_id)
        .attr("cx", d => d.cx) // Conditional cx positioning
        .attr("cy", d => d.cy)
        .attr("stroke-width", 1.5)
        .attr("stroke", "#FFFFFF00")
        .attr("r", d => radiusScale(d.amount))
        .attr("fill", d => d.position === "OPPOSE" ? "#b3b3b3" : colorScale(d.contest))
        .style("visibility", "visible")
        .on("click", popup)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

    // Define node labels
    // labelElements = svg.append("g")
    //     .attr("class", "texts")
    //     .attr("font-family", "Barlow")
    //     .selectAll("text")
    //     .data(filteredDatapoints)
    //     .enter()
    //     .append("text")
    //     .text(function (node) { return node.name })
    //     .attr("font-size", 15)
    //     .attr("text-anchor", "middle")
    //     .attr("id", function (d, i) { return "label_id" + i })
    //     .attr("class", "shadow")
    //     .style("visibility", "visible");

}

///
/// extra interactivity
///

// change node + label appearance on mouseover
function mouseover(d, i) {
    d3.select("#node_id" + i)
        .transition()
        .duration(100)
        .attr("stroke-width", 2)
        .attr("stroke", "grey")
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
            + "<p><strong>Committee:</strong> " + d.committee_name + "</p>"
            + "<p><strong>Position: </strong>" + d.position.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ') + "</p>");

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

// Search for individual
d3.select("#search").on('keyup', function () {
    var searchTerm = d3.select("#search").property("value").toUpperCase(); // Convert to uppercase for comparison

    // Reset and update circle colors based on the "position" and search term
    d3.selectAll("circle")
      .attr("fill", d => {
          // Check if position is "OPPOSE" and set color to grey, otherwise use the color scale
          return d.position.toUpperCase() === "OPPOSE" ? "grey" : colorScale(d.contest);
      })
      .filter(d => d.name.toUpperCase().indexOf(searchTerm) === -1) // Filter out circles not matching search
      .attr('fill', "rgba(200, 200, 200, 1)"); // Grey out non-matching circles
});
