// Load the CSV data
d3.csv("data.csv").then(function (data) {

    // Convert strings to numbers
    data.forEach(function (d) {
        d.amount_raised = +d.amount_raised;
        d.votes = +d.votes;
    });

    // Set up the SVG canvas
    var margin = { top: 30, right: 30, bottom: 40, left: 75 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yAxisFormat = function (d) {
        var formattedNumber = d3.format(",.2f")(d); // Format number with commas and two decimal places
        return formattedNumber.endsWith('.00') ? '$' + d3.format(",")(d) : '$' + formattedNumber; // Remove decimal places if they are '.00'
    };

    // Define scales for the x-axis and y-axis
    var xScale = d3.scaleLinear()
        .domain([0, 2500000])
        .range([0, width - 10]);

    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    var colorScale = d3.scaleOrdinal()
        .domain(data.map(function (d) { return d.pass; }))
        .range(["#a1d99b", "#fc9272"]); // Specify colors for each category

    // Create axes
    var xAxis = d3.axisBottom(xScale).tickFormat(yAxisFormat).ticks(5);
    var yAxis = d3.axisLeft(yScale);

    // Append x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text") // Select all text elements of x-axis
        .style("font-family", "'Barlow', sans-serif") // Set font family
        .style("font-size", "14px") // Set font size

    svg.append("text")
        .attr("class", "x-label")
        .attr("x", width / 2)
        .attr("y", height + 35) // Adjust the position as needed
        .style("text-anchor", "middle")
        .style("font-family", "'Barlow', sans-serif") // Set font family
        .style("font-size", "14px") // Set font size
        .text("Amount Raised");

    // Append y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text") // Select all text elements of y-axis
        .style("font-family", "'Barlow', sans-serif") // Set font family
        .style("font-size", "14px") // Set font size
    svg.append("text")
        .attr("class", "label")
        .attr("x", -20)
        .attr("y", -25)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-family", "'Barlow', sans-serif")
        .style("font-size", "14px")
        .text("Share of votes (%)");

    // Plot the data points as circles on the scatterplot
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function (d) { return xScale(d.amount_raised); })  // Switched to amount_raised for x-coordinate
        .attr("cy", function (d) { return yScale(d.votes); })          // Switched to votes for y-coordinate
        .attr("r", 8)
        .attr("stroke", function (d) { return d.pass === "true" ? "#000" : "none"; })
        .attr("fill", function (d) { return colorScale(d.pass); })    // Color based on "slate" column
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            var amountPerVote = d.amount_raised / d.count;
            tooltip.html("<b>" + d.contest + "</b><br>" +
                "Cost per vote: <b>$" + amountPerVote.toFixed(2) + "</b>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("font-family", "'Barlow', sans-serif");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Define the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("background", "#ffffffee") // Set background color
        .style("font-size", "18px")
        .attr("id", "adjustments"); // Add id for styling


    // Define legend data
    var legendData = [{ label: "Won", color: "#000", won: "TRUE" }].concat(
        data.reduce(function (acc, d) {
            if (!acc.find(function (item) { return item.color === colorScale(d.slate); })) {
                acc.push({ label: d.slate, color: colorScale(d.slate), won: false });
            }
            return acc;
        }, [])
    );

    // Define legend data
    var legendData = [
        { label: "Campaign won", color: "#a1d99b", strokeColor: "#000", strokeWidth: 2 },
        { label: "Campaign did not win", color: "#fc9272" }
    ];

    // Append legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 200) + "," + (height - 100) + ")");


    var legendBackground = legend.append("rect")
        .attr("class", "legend-background")
        .attr("x", 0)
        .attr("y", -10) // Adjust as needed for padding
        .attr("width", 270) // Adjust as needed for width
        .attr("height", legendData.length * 20) // Adjust as needed for height and padding

        .attr("fill", "#f0f0f0");
    // Add legend circles
    legend.selectAll(".legend-circle")
        .data(legendData)
        .enter().append("circle")
        .attr("class", "legend-circle")
        .attr("cx", 10)
        .attr("cy", function (d, i) { return i * 20; })
        .attr("r", 7)
        .attr("fill-opacity", 1) // Change fill opacity based on "won" column
        .attr("fill", function (d) { return d.color; })
        .attr("stroke", function (d) { return d.strokeColor ? d.strokeColor : "none"; })
        .attr("stroke-width", function (d) { return d.strokeWidth ? d.strokeWidth : 2; });

    // Add legend labels
    legend.selectAll(".legend-label")
        .data(legendData)
        .enter().append("text")
        .attr("class", "legend-label")
        .attr("x", 20)
        .attr("y", function (d, i) { return i * 20; })
        .attr("dy", "0.35em")
        .text(function (d) { return d.label; })
        .style("font-family", "'Barlow', sans-serif")
        .style("font-size", "14px");


});

