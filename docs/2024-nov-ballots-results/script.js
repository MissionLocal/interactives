document.addEventListener('DOMContentLoaded', function () {
    // Initialize the Pym.js child
    var pymChild = new pym.Child();

    // Load the CSV data
    d3.csv("data.csv").then(function (data) {
        data.forEach(d => {
            // Parse the values as integers
            d.Value1 = +d.Value1;
            d.Value2 = +d.Value2;
            d.threshold = +d.threshold; // Parse threshold as an integer
        });

        // Select each .prop div and create a bar chart
        data.forEach((d, i) => {
            const container = d3.select(`[data-proposition="${d.Proposition}"] .bar-chart`);

            // Set dimensions for the bar chart
            const width = 200;
            const height = 100;

            // Create an SVG element
            const svg = container.append("svg")
                .attr("width", width + 100) // Add extra space for labels on the left and values on the right
                .attr("height", height);

            // Create the x scale
            const xScale = d3.scaleLinear()
                .domain([0, d3.max([d.Value1, d.Value2, d.threshold])]) // Include threshold in max value for scale
                .range([0, width]);

            // Add "Yes" or "No" labels on the left side
            svg.selectAll(".label")
                .data([d.Value1, d.Value2])
                .enter()
                .append("text")
                .attr("x", 0) // Fixed position on the left
                .attr("y", (d, i) => i * 30 + 17) // Position the text vertically in the middle of each bar
                .text((d, i) => i === 0 ? "Yes" : "No") // Top bar is "Yes", bottom bar is "No"
                .attr("fill", "black") // Text color
                .attr("font-size", "12px")
                .attr("text-anchor", "start") // Align text to the start
                .attr("class", "label");

            // Create the bars
            svg.selectAll(".bar")
                .data([d.Value1, d.Value2])
                .enter()
                .append("rect")
                .attr("x", 30) // Shift the bars to the right to make space for labels
                .attr("y", (d, i) => i * 30) // Space bars vertically
                .attr("width", d => xScale(d)) // Bar width based on value
                .attr("height", 25)
                .attr("fill", (d, i) => i === 0 ? "#65ead0" : "#e02214") // Top bar "Yes" (blue), bottom "No" (orange)
                .attr("fill-opacity", 0.6);

            // Add threshold line on the top bar
            svg.append("line")
                .attr("x1", 30 + xScale(d.threshold)) // Position based on threshold value
                .attr("x2", 30 + xScale(d.threshold))
                .attr("y1", 0) // Start at the top of the first bar
                .attr("y2", 25) // End at the bottom of the first bar
                .attr("stroke", "black") // Line color
                .attr("stroke-width", 1) // Line width
                .attr("class", "threshold-line");

            // Add "Required to pass" label ONLY for Proposition A
            if (d.Proposition === "A") {
                svg.append("text")
                    .attr("x", 32 + xScale(d.threshold)) // Position the text above the threshold line
                    .attr("y", (d, i) => i * 30 + 17) // Position the text vertically in the middle of each bar
                    .attr("text-anchor", "left") // Align the text to the left
                    .text("% required")
                    .attr("fill", "black") // Text color
                    .attr("font-size", "12px")
                    .attr("class", "threshold-label");
            }


            // Add values on the right side of each bar
            svg.selectAll(".value")
                .data([d.Value1, d.Value2])
                .enter()
                .append("text")
                .attr("x", d => 30 + xScale(d) + 5) // Position the text 5px to the right of the bar
                .attr("y", (d, i) => i * 30 + 17) // Align vertically with the middle of the bar
                .text(d => d) // Display the actual value
                .attr("fill", "black") // Text color
                .attr("font-size", "12px")
                .attr("text-anchor", "start") // Align text to the left of the value
                .attr("class", "value");
        });

        // Once the charts are drawn, call pymChild.sendHeight() to resize the iframe
        pymChild.sendHeight();
    });
});
