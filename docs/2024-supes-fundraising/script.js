// Load the CSV data
d3.csv("data.csv").then(function (data) {

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 20, bottom: 10, left: 30 },
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    // Set up the SVG canvas
    var margin = { top: 40, right: 30, bottom: 40, left: 75 },
        width = 600 - margin.left - margin.right,
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
        .domain([0, 300000])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, 400])
        .range([height, 0]);

    var colorScale = d3.scaleOrdinal()
        .domain(data.map(function (d) { return d.district; }))
        .range(['#efbe25', '#46c134', '#57a4ea', '#ff9da6', '#ed43e5', '#8ad6ce']); // Specify colors for each category

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
        .append("text") // X-axis label
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .style("font-family", "'Barlow', sans-serif")
        .style("font-size", "14px")
        .text("Amount Raised");

    // Append y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text") // Select all text elements of y-axis
        .style("font-family", "'Barlow', sans-serif") // Set font family
        .style("font-size", "14px") // Set font size

    // Append x-axis label
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width + 30)
        .attr("y", height + margin.top + -5) // Adjust position as needed
        .style("text-anchor", "end")
        .style("font-family", "'Barlow', sans-serif")
        .style("font-size", "14px")
        .text("Amount raised");

    // Append y-axis label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("x", 60)
        .attr("y", -23)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .style("font-family", "'Barlow', sans-serif")
        .style("font-size", "14px")
        .text("Average donation size");


    // Plot the data points as circles on the scatterplot
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function (d) { return xScale(d.total_donation); })  // Switched to amount_raised for x-coordinate
        .attr("cy", function (d) { return yScale(d.mean_donation); })          // Switched to votes for y-coordinate
        .attr("r", 7)
        // .attr("stroke", function (d) { return d.won === "TRUE" ? "#000" : "none"; }) // Add stroke if "won" is "True"
        .attr("stroke-width", 1.5) // Set stroke width
        .attr("fill", function (d) { return colorScale(d.district); })    // Color based on "slate" column
        .attr("fill-opacity", 0.6) // Change fill opacity based on "won" column
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            var mean_donation = d3.format(",.0f")(d.mean_donation);
            var total_donation = d3.format(",.0f")(d.total_donation);
            tooltip.html("<b>" + d.committee_name + "</b><br>" +
                "Average donation size: <b>$" + mean_donation + "</b>"
            + "<br>"+ "Amount raised:<b>$" + total_donation + "</b>")
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
                acc.push({ label: d.slate, color: colorScale(d.district), won: false });
            }
            return acc;
        }, [])
    );

    // Define legend data
    var legendData = [
        { label: "District 1", color: "#efbe25" },
        { label: "District 3", color: "#46c134" },
        { label: "District 5", color: "#57a4ea" },
        { label: "District 7", color: "#ff9da6" },
        { label: "District 9", color: "#ed43e5" },
        { label: "District 11", color: "#8ad6ce" },
    ];

    // Append legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 75) + "," + (height - 100) + ")");


    var legendBackground = legend.append("rect")
        .attr("class", "legend-background")
        .attr("x", 0)
        .attr("y", -30) // Adjust as needed for padding
        .attr("width", 100) // Adjust as needed for width
        .attr("height", legendData.length * 20) // Adjust as needed for height and padding

        .attr("fill", "#f0f0f0");
    // Add legend circles
    legend.selectAll(".legend-circle")
        .data(legendData)
        .enter().append("circle")
        .attr("class", "legend-circle")
        .attr("cx", 10)
        .attr("cy", function (d, i) { return i * 20 -20; })
        .attr("r", 7)
        .attr("fill-opacity", 0.6) // Change fill opacity based on "won" column
        .attr("fill", function (d) { return d.color; })
        .attr("stroke", function (d) { return d.strokeColor ? d.strokeColor : "none"; })
        .attr("stroke-width", function (d) { return d.strokeWidth ? d.strokeWidth : 0; });

    // Add legend labels
    legend.selectAll(".legend-label")
        .data(legendData)
        .enter().append("text")
        .attr("class", "legend-label")
        .attr("x", 20)
        .attr("y", function (d, i) { return i * 20 -20; })
        .attr("dy", "0.35em")
        .text(function (d) { return d.label; })
        .style("font-family", "'Barlow', sans-serif")
        .style("font-size", "14px");


});