// Set up pym
var pymChild = new pym.Child();

// Margin convention
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Search
d3.select("#searchbar").on("keyup", function () {
  var searchTerm = d3
    .select("#searchbar")
    .property("value")
    .toLocaleUpperCase();
  d3.selectAll("circle").attr("fill", (d) => colorScale(d.type));
  d3.selectAll("circle")
    .filter(
      (d) => d.search.toLocaleUpperCase().indexOf(searchTerm) == -1
    )
    .attr("fill", "#bdbdbd");
});

// Create time parser
const tParser = d3.timeParse("%Y-%m-%d");

// Define x axis position
const xPositionScale = d3
  .scaleTime()
  .domain([new Date("2010-01-01"), new Date("2023-01-02")])
  .range([0, width - 75])
  .clamp(true);

// Define colour scale
var type_labels = ["Wrongful death","Excessive force","Wrongful detainment","Hit by vehicle","Employment","Other"]
var type_colors = ["#000000","#f36e57","#faa51a","#965297","#86c1e9","#747575"]
const colorScale = d3
  .scaleOrdinal()
  .domain(type_labels)
  .range(type_colors);

// Set radius scale
const radiusScale = d3.scaleSqrt().domain([0, 13100000]).range([0, 80]);

// Create currency formatted
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

// Create tooltip
const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

// Read in csv
d3.csv("data.csv").then(ready);

function ready(datapoints) {
  // Make svg
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set position of circles
  svg
    .selectAll("circle")
    .data(datapoints)
    .join("circle")
    .attr("class", "node")
    .attr("id", (d) => "circle" + d.id)
    .attr("cx", (d) => d.position_time_x)
    .attr("cy", (d) => d.position_time_y)
    .attr("r", (d) => radiusScale(d.amount_decided))
    .attr("fill", (d) => colorScale(d.type))
    .attr("stroke", 3)
    .attr('opacity', 0.95)
    .on("click", popup)
    .on("mouseover", mouseoverNode)
    .on("mouseout", mouseoutNode);

  // Set position of hover labels
  svg
    .append("g")
    .attr("class", "texts")
    .attr("font-family", "Calibri")
    .selectAll("text")
    .data(datapoints)
    .enter()
    .append("text")
    .text((d) => d.recipient_trimmed)
    .attr("font-size", 15)
    .attr("x", (d) => d.position_time_x)
    .attr("y", (d) => d.position_time_y)
    .attr("dx", 25)
    .attr("dx", (d) => radiusScale(d.amount_decided) + 7)
    .attr("dy", 5)
    .attr("text-anchor", "left")
    .attr("id", (d) => "text" + d.id)
    .attr("class", "shadow")
    .style("visibility", "hidden");

  // Set position of static label - DEPARTMENTS
  var departments = ["Sheriff's Office", "San Francisco Police Department", "Other"]
  var xPositionsDepartments = [5, 270, 660];
  var yPositionsDepartments = [405, 500, 340];
  svg
    .append("g")
    .attr("class", "axis_label_departments")
    .selectAll("text")
    .data(departments)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", function(d, i) {return xPositionsDepartments[i];})
    .attr("y", function(d, i) {return yPositionsDepartments[i];})
    .style('visibility', 'hidden')

  // Set position of static label - TYPES
  var types = ["Wrongful death","Excessive force","Wrongful detainment","Hit by vehicle","Employment","Other"]
  var xPositionsTypes = [-30, 110, 250, 420, 540, 680];
  var yPositionsTypes = [430, 400, 500, 400, 410, 375];
  svg
    .append("g")
    .attr("class", "axis_label_types")
    .selectAll("text")
    .data(types)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", function(d, i) {return xPositionsTypes[i];})
    .attr("y", function(d, i) {return yPositionsTypes[i];})
    .style('visibility', 'hidden')

  // Set position of static label - TIME
  var x_axis = d3.axisBottom().scale(xPositionScale);
  svg.append("g")
    .attr("transform", "translate(0, 500)")
    .attr("class", "axis_label_time")
    .style("font-size", "14px")
    .attr('x', '50px')
    .call(x_axis);

  // Create legend
  var n = type_labels.length / 2
  var itemWidth = 175
  var itemHeight = 40

  var legend = svg.selectAll(".legend")
    .data(type_labels)
    .enter()
    .append("g")
    .attr("transform", function(d,i) { return "translate(" + i%n * itemWidth + "," + Math.floor(i/n) * itemHeight + ")"; })
    .attr("class","legend");

  legend.append('rect')
    .attr("width", 15)
    .attr("height", 15)
    .attr("x", "90")
    .attr("y", "-12")
    .attr("fill", function(d,i) { return colorScale(i); });

  legend.append('text')
    .attr("x", "110")
    .attr("y", "0")
    .text(function(d) { return d; });

  function addComplaintLink(value) {
    var html = ""
    if (value != "no complaint") {
      html = "<p><a href='" + value + "' target='_blank'>Read the complaint</a></p>"
    }
    return html
  }


  function popup(event, d) {
    // Get mouse position
    let tipX = event.clientX - 160;
    let tipY = event.clientY + 5;

    // Stop going off left
    if (tipX < 0) {
      tipX = 0 + 10;
    }
    // Stop squeezing against right
    //if (tipX > width - 300) {
    //  tipX = width - 300;
    //}

    // Apply position
    tooltip.html(
      "<h3>" +
        d.recipient_trimmed +
        "</h3><hr>" +
        "<p><strong>Settled:</strong> " +
        d.lawsuit_approved_date_long +
        "</p>" +
        "<p><strong>Amount:</strong> " +
        formatter.format(d.amount_decided) +
        "</p>" +
        "<p>" +
        d.description_para_1 +
        "</p>" +
        "<p>" +
        d.description_para_2 +
        "</p>" +
        addComplaintLink(d.complaint)
    );
    tooltip
      .style("visibility", "visible")
      .style("left", tipX + "px")
      .style("top", tipY + "px");

    // See if bottom of tooltip is going off the screen
    const tooltipRect = tooltip.node().getBoundingClientRect();
    if (tooltipRect.bottom > height) {
      tipY = height - tooltipRect.height;

      // Apply position
      tooltip.html(
        "<h3>" +
          d.recipient_trimmed +
          "</h3><hr>" +
          "<p><strong>Settled:</strong> " +
          d.lawsuit_approved_date_long +
          "</p>" +
          "<p><strong>Amount:</strong> " +
          formatter.format(d.amount_decided) +
          "</p>" +
          "<p>" +
          d.description_para_1 +
          "</p>" +
          "<p>" +
          d.description_para_2 +
          "</p>" +
          addComplaintLink(d.complaint)
      );
      tooltip
        .style("visibility", "visible")
        .style("left", tipX + "px")
        .style("top", tipY + "px");
    }
  }

  // Change circle + label appearance on hover
  function mouseoverNode(i, d) {
    d3.select("#circle" + d.id)
      .transition()
      .duration(50)
      .attr("stroke-width", 4)
      .attr("stroke", "#000000")
      .attr("cursor", "pointer");
    d3.select("#text" + d.id).style("visibility", "visible");
  }

  // Change circle + label appearance when you stop hovering
  function mouseoutNode() {
    d3.selectAll("circle")
      .transition()
      .duration(50)
      .attr("stroke-width", 0)
      .attr("stroke", "#000000")
      .attr("cursor", "pointer");
    d3.selectAll(".shadow").style("visibility", "hidden");
  }
}

// Remove pop-up if user clicks elsewhere
document.addEventListener("click", function (event) {
  var clickedElement = event.target.classList[0];
  if (clickedElement != "node") {
    tooltip.style("visibility", "hidden");
  }
});

// get radio buttons
const radioButtons = document.getElementsByName("selection");

// Attach event listener to each radio button
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    var position = this.value;
    moveCircles(position);
  });
});

// Move circles when radio button is clicked
function moveCircles(position) {
  var circles = d3.selectAll("circle");
  var texts = d3.selectAll(".shadow");
  var axis_label_time = d3.selectAll(".axis_label_time");
  var axis_label_departments = d3.selectAll(".axis_label_departments");
  var axis_label_types = d3.selectAll(".axis_label_types");

  // disable pointer events during transition
  var elements = document.querySelectorAll(".node")
  elements.forEach((element) => {
    element.classList.add("disabled");
  });
  setTimeout(function() {
    elements.forEach((element) => {
      element.classList.remove("disabled");
    });
  }, 1200);

  // Show correct labels
  function rejigLabels(time, department, type) {
    axis_label_time
      .style('visibility', "hidden");
    axis_label_departments
      .selectAll("text")
      .style('visibility', "hidden");
    axis_label_types
      .selectAll("text")
      .style('visibility', "hidden");
    setTimeout(function() {
      elements.forEach((element) => {
      axis_label_time
        .style('visibility', time)
      axis_label_departments
        .selectAll("text")
        .style('visibility', department)
      axis_label_types
        .selectAll("text")
        .style('visibility', type)
      });
    }, 1200);
  }

  if (position == "time") {
    circles
      .transition()
      .duration(1200)
      .attr("cx", (d) => d.position_time_x)
      .attr("cy", (d) => d.position_time_y);
    texts
      .transition()
      .duration(1200)
      .attr("x", (d) => d.position_time_x)
      .attr("y", (d) => d.position_time_y);
    rejigLabels("visible", "hidden", "hidden")
  }
  if (position == "department") {
    circles
      .transition()
      .duration(1200)
      .attr("cx", (d) => d.position_department_x)
      .attr("cy", (d) => d.position_department_y);
    texts
      .transition()
      .duration(1200)
      .attr("x", (d) => d.position_department_x)
      .attr("y", (d) => d.position_department_y);
    rejigLabels("hidden", "visible", "hidden")
  }
  if (position == "type") {
    circles
      .transition()
      .duration(1200)
      .attr("cx", (d) => d.position_type_x)
      .attr("cy", (d) => d.position_type_y);
    texts
      .transition()
      .duration(1200)
      .attr("x", (d) => d.position_type_x)
      .attr("y", (d) => d.position_type_y);
    rejigLabels("hidden", "hidden", "visible")
  }
}

// Delay for a bit then send height to pym
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}
delay(500).then(() => pymChild.sendHeight());