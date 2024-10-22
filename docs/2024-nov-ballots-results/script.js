document.addEventListener('DOMContentLoaded', function () {
    // Initialize the Pym.js child
    var pymChild = new pym.Child();

    // Load the CSV data
    d3.csv("data.csv").then(function(data) {
        data.forEach(d => {
            // Parse the values as integers
            d.Value1 = +d.Value1;
            d.Value2 = +d.Value2;
        });

        // Select each .prop div and create a bar chart
        data.forEach((d, i) => {
            const container = d3.select(`[data-proposition="${d.Proposition}"] .bar-chart`);

            // Set dimensions for the bar chart
            const width = 200;
            const height = 100;

            // Create an SVG element
            const svg = container.append("svg")
                .attr("width", width)
                .attr("height", height);

            // Create the x scale
            const xScale = d3.scaleLinear()
                .domain([0, d3.max([d.Value1, d.Value2])]) // Max value for scale
                .range([0, width]);

            // Create the bars
            svg.selectAll("rect")
                .data([d.Value1, d.Value2])
                .enter()
                .append("rect")
                .attr("x", 0)
                .attr("y", (d, i) => i * 30) // Space bars vertically
                .attr("width", xScale)
                .attr("height", 25)
                .attr("fill", (d, i) => i === 0 ? "blue" : "orange"); // Different colors for each bar
        });

        // Once the charts are drawn, call pymChild.sendHeight() to resize the iframe
        pymChild.sendHeight();
    });
});
