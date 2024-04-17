var dataFile = 'data.csv';
var data; // Define data globally

// Read the CSV file
d3.csv(dataFile).then(function (csvData) {
    data = csvData;
    setupBarChart('#chart-container');

    // Update the event listeners for the buttons
    d3.select("#button-d1").on("click", function () {
        d3.selectAll("button").classed("active", false);
        d3.select(this).classed("active", true);
        updateData("D1", data);
    });

    d3.select("#button-d3").on("click", function () {
        d3.selectAll("button").classed("active", false);
        d3.select(this).classed("active", true);
        updateData("D3", data);
    });

    d3.select("#button-d5").on("click", function () {
        d3.selectAll("button").classed("active", false);
        d3.select(this).classed("active", true);
        updateData("D5", data);
    });

    d3.select("#button-d7").on("click", function () {
        d3.selectAll("button").classed("active", false);
        d3.select(this).classed("active", true);
        updateData("D7", data);
    });

    d3.select("#button-d9").on("click", function () {
        d3.selectAll("button").classed("active", false);
        d3.select(this).classed("active", true);
        updateData("D9", data);
    });

    d3.select("#button-d11").on("click", function () {
        d3.selectAll("button").classed("active", false);
        d3.select(this).classed("active", true);
        updateData("D11", data);
    });
});
function setupBarChart(containerId) {
    // Set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 60, left: 150 },
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append the SVG object to the specified container
    var svg = d3.select(containerId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var initialData = data.filter(function (d) {
        return d.contest === "D1";
    });

    var supportData = initialData.filter(function (d) {
        return d.position === "support";
    });

    var opposeData = initialData.filter(function (d) {
        return d.position === "oppose";
    });

    // Convert string amounts to numbers for supportData
    supportData.forEach(function (d) {
        d.amount = +d.amount;
    });

    opposeData.forEach(function (d) {
        d.amount = +d.amount;
    });

    // Set up scales for initial data
    var x = d3.scaleLinear()
        .domain([0, d3.max(supportData.concat(opposeData), function (d) { return d.amount; })])
        .range([0, width]);

    var y = d3.scaleBand()
        .domain(supportData.map(function (d) { return d.name; }))
        .range([0, height])
        .padding(.1);

    // Draw x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function (d) {
            if (d === 0) {
                return null; // Return null for zero label
            } else {
                return "$" + d3.format(",.0f")(d); // Format non-zero values as $X,XXX
            }
        }))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-family", "Barlow")
        .style("font-size", "14px");

    // Draw y-axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .style("font-family", "Barlow")
        .style("font-size", "14px");

    // Draw support bars
    svg.selectAll(".support-bar")
        .data(supportData)
        .enter()
        .append("rect")
        .attr("class", "support-bar")
        .attr("x", 1)
        .attr("y", function (d) { return y(d.name); })
        .attr("width", function (d) { return x(d.amount); })
        .attr("height", function (d) {
            if (opposeData.length > 0) {
                return y.bandwidth() / 2; // Set conditional height
            } else {
                return y.bandwidth(); // Default height
            }
        })
        .attr("fill", "#f5b247");

    // Draw oppose bars
    svg.selectAll(".oppose-bar")
        .data(opposeData)
        .enter()
        .append("rect")
        .attr("class", "oppose-bar")
        .attr("x", 1)
        .attr("y", function (d) { return y(d.name) + y.bandwidth() / 2; })
        .attr("width", function (d) { return x(d.amount); })
        .attr("height", y.bandwidth() / 2)
        .attr("fill", "#f7868e");


}

function updateData(category, data) {

    d3.select('#chart-container').selectAll("*").remove();

    var filteredData = data.filter(function (d) {
        return d.contest === category;
    });

    // Set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 60, left: 150 },
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append the SVG object to the specified container
    var svg = d3.select('#chart-container')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var supportData = filteredData.filter(function (d) {
        return d.position === "support";
    });

    var opposeData = filteredData.filter(function (d) {
        return d.position === "oppose";
    });

    // Convert string amounts to numbers for supportData
    supportData.forEach(function (d) {
        d.amount = +d.amount;
    });

    opposeData.forEach(function (d) {
        d.amount = +d.amount;
    });

    var allNames = Array.from(new Set(filteredData.map(d => d.name)));

    console.log(supportData);
    console.log(opposeData);
    // Set up scales for initial data
    var x = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function (d) { return d.amount; })])
        .range([0, width]);

    var y = d3.scaleBand()
        .domain(allNames)
        .range([0, height])
        .padding(.1);

    // Draw x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function (d) {
            if (d === 0) {
                return null; // Return null for zero label
            } else {
                return "$" + d3.format(",.0f")(d); // Format non-zero values as $X,XXX
            }
        }))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-family", "Barlow")
        .style("font-size", "14px");

    // Draw y-axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .style("font-family", "Barlow")
        .style("font-size", "14px");

    // Draw support bars
    svg.selectAll(".support-bar")
        .data(supportData)
        .enter()
        .append("rect")
        .attr("class", "support-bar")
        .attr("x",1)
        .attr("y", function (d) { return y(d.name); })
        .attr("width", function (d) { return x(d.amount); })
        .attr("height", function (d) {
            if (opposeData.length > 0) {
                return y.bandwidth() / 2; // Set conditional height
            } else {
                return y.bandwidth(); // Default height
            }
        })
        .attr("fill", "#f5b247");

    // Draw oppose bars
    svg.selectAll(".oppose-bar")
        .data(opposeData)
        .enter()
        .append("rect")
        .attr("class", "oppose-bar")
        .attr("x", 1)
        .attr("y", function (d) { return y(d.name) + y.bandwidth() / 2; })
        .attr("width", function (d) { return x(d.amount); })
        .attr("height", y.bandwidth() / 2)
        .attr("fill", "#f7868e"); // Use hashed pattern fill
}

