// margin convention - depends on screen size
const margin = { top: 10, right: 1, bottom: 10, left: 1 };
const width = 275 - margin.left - margin.right;

// define svg 
var svg = d3.select('svg')
    .attr('width', 275);

// Define box dimensions and position
const boxWidth = 275
const boxPadding = 10; // Padding from the edge of the SVG
const boxX = 275 + margin.left + margin.right - boxWidth - boxPadding; // X position
const boxY = margin.top; // Y position (align with the top margin)

// set radius scale
const radiusScale = d3.scaleSqrt()
    .domain([0, 500000])
    .range([0, 35]);

var explanationDiv = d3.select(".text-container");

// Append a div for the box inside the explanation div
const boxGroup = explanationDiv.append("div")
    .attr("class", "box-group")
    .style("width", boxWidth + "px")
    .style("background-color", "#f7f7f7") // Light grey color
    .style("padding", boxPadding + "px")
    .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)"); // Optional shadow for better visibility

///
/// variables
///

// define tooltip width
var maxTooltipWidth = 250;

// define colour scale
const colorScale = d3.scaleOrdinal()
    .domain(['Proposition A', 'Proposition B', 'Proposition C', 'Proposition D', 'Proposition E', 'Proposition F', 'Proposition G', 'Proposition H', 'Proposition I', 'Proposition J', 'Proposition K', 'Proposition L', 'Proposition M', 'Proposition N', 'Proposition O'])
    .range(["#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce", "#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce", "#efbe25", "#57a4ea", "#ff9da6", "#f36e57", "#8ad6ce"]);

    // define colour scale
const altScale = d3.scaleOrdinal()
    .domain(['Proposition A', 'Proposition B', 'Proposition C', 'Proposition D', 'Proposition E', 'Proposition F', 'Proposition G', 'Proposition H', 'Proposition I', 'Proposition J', 'Proposition K', 'Proposition L', 'Proposition M', 'Proposition N', 'Proposition O'])
    .range(["#f7e7ba", "#aacce5", "#f9e4e6", "#ef9d92", "#c5efea","#f7e7ba", "#aacce5", "#f9e4e6", "#ef9d92", "#c5efea", "#f7e7ba", "#aacce5", "#f9e4e6", "#ef9d92", "#c5efea"]);

// create currency formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

///
/// dealing with the data
///

function getSVGHeight(measure) {
    // Extract the proposition letter from the full string
    const proposition = measure.split(' ')[1]; // Get the letter (e.g., "A" from "Proposition A")

    // Define height based on the extracted proposition letter
    if (["A", "C", "F", "G", "J", "I", "N", "O"].includes(proposition)) {
        return 100;
    } else if (["D", "E"].includes(proposition)) {
        return 400;
    } else {
        return 200;
    }
}


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


    // Update the span's background color using the colorScale
    const newColor = colorScale(measure); // Get the color from the scale

    d3.select("h3 span:nth-child(1)") // Selects the first span (for)
        .style("background", newColor);

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

    // Clear any previous content in the explanation div
    explanationDiv.html("");


    // Append a div for the description inside the explanation div
    var boxText = explanationDiv.append("div")
        .attr("class", "descriptionText")
        .style("width", boxWidth + "px")
        .style("background-color", "#f7f7f7")
        .style("padding", boxPadding + "px")
        .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
        .html(`
        <h3>${measure}: ${description}</h3>
        <p style='font-size: 16px; color: #333333; margin: 0;'>
            <strong>How it reached the ballot: </strong>${sponsor}
        </p><br>
        <p style='font-size: 16px; color: #333333; margin: 0;'>
            <strong>What it would do: </strong>${details}
        </p><br>
        <p style='font-size: 16px; color: #333333; margin: 0;'>
            <strong>Proponents include: </strong>${proponents}
        </p><br>
        <p style='font-size: 16px; color: #333333; margin: 0;'>
            <strong>Opponents include: </strong>${opponents}
        </p><br>
        <p style='font-size: 16px; color: #333333; margin: 0;'>
            <strong>To pass: </strong>${required}
        </p><br>
        <p style='font-size: 16px; color: #333333; margin: 0;'>
            Watch a 60 second recap 
            <a class='link' target='_blank' href=${href}>here</a>.
        </p>
    `);

    // Assuming you already have the SVG element set up
    var svg = d3.select('svg')
        .attr('width', 275);

    // Calculate the new height based on the selected measure
    const newHeight = getSVGHeight(measure);

    console.log(newHeight);

    // Set the SVG height dynamically
    svg.attr('height', newHeight);

    // Create a group for the nodes
    var nodeGroup = svg.append("g")
        .attr("class", "node-group");

    d3.select("#support-total").text(`Total for: $${support_total.toLocaleString()}`); // Format as needed
    d3.select("#oppose-total").text(`Total against: $${oppose_total.toLocaleString()}`); // Format as needed

    // Create the circle elements within the transformed group
    let nodeElements = nodeGroup.selectAll("circle")
        .data(filteredDatapoints)
        .enter()
        .append("circle")
        .attr("id", d => d.node_id)
        .attr('cx', d => {
            // Adjust cy based on the new height
            if (newHeight === 400) {
                return d.cx - 300; // Do nothing for height 600
            } else {
                return d.cx - 150; // Default case, just return d.cy
            }
        })
        .attr('cy', d => {
            // Adjust cy based on the new height
            if (newHeight === 400) {
                return d.cy - 75; // Do nothing for height 600
            } else if (newHeight === 200) {
                return d.cy - 200; // Subtract 150 for height 300
            } else if (newHeight === 100) {
                return d.cy - 250; // Subtract 100 for height 400
            } else {
                return d.cy; // Default case, just return d.cy
            }
        })
        .attr("stroke-width", 1.5)
        .attr("stroke", "#FFFFFF00")
        .attr("r", d => radiusScale(d.amount))
        .attr("fill", d => d.position === "OPPOSE" ? "#b3b3b3" : colorScale(d.contest))
        .style("visibility", "visible")
        .on("click", popup)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

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

    // If the search term is empty, reset all circles to their default colors
    if (searchTerm === "") {
        d3.selectAll("circle")
          .attr("fill", d => {
              // Reset to grey for "OPPOSE" or use altScale for others
              return d.position.toUpperCase() === "OPPOSE" ? "#b3b3b3" : colorScale(d.contest);
          });
        return; // Stop further execution
    }

    // Otherwise, update circle colors based on the search term
    d3.selectAll("circle")
      .attr("fill", d => {
          if (d.position.toUpperCase() === "OPPOSE") {
              // If the position is "OPPOSE", it should always be grey
              return "#b3b3b3";
          } else if (d.name.toUpperCase().indexOf(searchTerm) !== -1) {
              // If the name matches the search term, use colorScale
              return colorScale(d.contest);
          } else {
              // For non-matching circles that are not "OPPOSE", use altScale
              return altScale(d.contest);
          }
      });
});