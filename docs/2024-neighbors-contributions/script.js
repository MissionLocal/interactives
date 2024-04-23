// Define variables
const margin = { top: 40, right: 20, bottom: 60, left: 60 };
const max_width = 600 - margin.left - margin.right;
const height = 3500 - margin.top - margin.bottom;


if (window.innerWidth >= max_width) { width = max_width; }
else { width = window.innerWidth - margin.left - margin.right;}

// Load the data
d3.csv("data.csv").then(function (data) {
    // Parse the date format and scale your data
    const parseDate = d3.timeParse("%Y-%m-%d");

    data.forEach(d => {
        d.date = parseDate(d.date);
        d.amount = +d.amount; // Convert amount to number
    });

    const colorMap = {
        "governance": "#AECBD6", // Assign color for tag1
        "school board": "#8ad6ce", // Assign color for tag2
        "misc.": "#BFCBC2",
        "fighting progressives/electing moderates": "#4e59f4", 
        "supporting Dem. clubs": "#00AEF3",
        "public safety": "#f36e57",
        "anti-tax": "#ff9da6", 
        "transit": "#efbe25",
        "housing": "#fc8e62", 
        "education": "#f4a261"
    };
    
    // Create a custom color scale using the color map
    const colorScale = d3.scaleOrdinal()
        .domain(Object.keys(colorMap))
        .range(Object.values(colorMap));
    
    const yPositionScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([150, height]);

    const radiusScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.amount)])
        .range([0, 65]); // Adjust the range for bubble size

    // Create the SVG container for the scatterplot
    const svg = d3.select("#scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    // Create y-axis
    const y_axis = d3.axisLeft(yPositionScale);
    svg.append("g")
        .attr("class", "axis_labels")
        .attr("transform", `translate(30, 0)`)
        .call(y_axis);

    // Create the force simulation
    const simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(width / 2).strength(0.2))
        .force("y", d3.forceY(d => yPositionScale(d.date)).strength(0.2))
        .force("collide", d3.forceCollide(d => radiusScale(d.amount) + 1))
        .stop();

    // Run the simulation and position the bubbles
    for (let i = 0; i < 300; ++i) simulation.tick();

    const bubbles = svg.selectAll(".bubble")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubble")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => radiusScale(d.amount))
        .attr("fill", d => colorScale(d.tag)) // Color based on "tag"
        .attr("fill-opacity", 0.85)
        .attr("stroke", d => colorScale(d.tag))
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("<b>" + d.payee + "</b><br>" +
                "Date:" + d.date_formatted + "<br>" +
                "Contribution amount: " + d.amount_formatted + "<br>" +
                "Category:  "+ d.tag)
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
    var tooltip = d3.select("#scatter").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("background", "#ffffffee") // Set background color
        .style("font-size", "16px")
        .attr("id", "adjustments"); // Add id for styling

});
