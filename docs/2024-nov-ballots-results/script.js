document.addEventListener('DOMContentLoaded', function () {
    // Initialize the Pym.js child
    var pymChild = new pym.Child();

    // Load the CSV data
    d3.csv("data.csv").then(function (data) {
        // Define the max domain value for a fixed scale across all bars
        const maxDomainValue = 100; // or choose a value based on your dataset

        // Initialize the x scale globally with a fixed width
        const width = 200; // Fixed width for each bar chart
        const xScale = d3.scaleLinear()
            .domain([0, maxDomainValue]) // Fixed domain for consistency
            .range([0, width]);

        // Set the threshold values based on Proposition
        data.forEach(d => {
            d.Value1 = +d.Value1;
            d.Value2 = +d.Value2;
            if (d.Proposition === "A") {
                d.threshold = 55;
            } else if (d.Proposition === "B") {
                d.threshold = 66.67;
            } else {
                d.threshold = 50; // Default threshold
            }
        });

// Create the charts
data.forEach((d) => {
    const container = d3.select(`[data-proposition="${d.Proposition}"] .bar-chart`);

    // Set SVG dimensions
    const svg = container.append("svg")
        .attr("width", width + 100) // Extra space for labels and values
        .attr("height", 70); // Fixed height for each chart

    // Add labels for "Yes" and "No"
    svg.selectAll(".label")
        .data([d.Value1, d.Value2])
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y", (d, i) => i * 30 + 19) // Moved down by 2px
        .text((d, i) => i === 0 ? "Yes" : "No")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .attr("text-anchor", "start")
        .attr("class", "label");

    // Create bars with consistent widths
    svg.selectAll(".bar")
        .data([d.Value1, d.Value2])
        .enter()
        .append("rect")
        .attr("x", 30) // Space for labels
        .attr("y", (d, i) => i * 32 + 2) // Moved down by 2px
        .attr("width", d => xScale(d))
        .attr("height", 25)
        .attr("fill", (d, i) => i === 0 ? "#8ad6ce" : "#f36e57");

    // Add the threshold line based on the consistent xScale
    svg.append("line")
        .attr("x1", 30 + xScale(d.threshold))
        .attr("x2", 30 + xScale(d.threshold))
        .attr("y1", 0) // Adjusted to start slightly above the bars
        .attr("y2", 29) // Adjusted to extend to below the bars
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("class", "threshold-line");

    // Label for threshold (only for Proposition A as before)
    if (d.Proposition === "A") {
        svg.append("text")
            .attr("x", 32 + xScale(d.threshold))
            .attr("y", 19) // Moved down by 2px to align with the labels
            .text("% required")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .attr("class", "threshold-label");
    }

    // Display values on the right side of each bar
    svg.selectAll(".value")
        .data([d.Value1, d.Value2])
        .enter()
        .append("text")
        .attr("x", d => 30 + xScale(d) + 5)
        .attr("y", (d, i) => i * 30 + 19) // Moved down by 2px
        .text(d => d)
        .attr("fill", "black")
        .attr("font-size", "12px")
        .attr("text-anchor", "start")
        .attr("class", "value");
});


        // Resize the iframe once charts are drawn
        pymChild.sendHeight();
    });
});