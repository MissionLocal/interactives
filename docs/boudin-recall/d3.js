(function () {

  // Margin convention
  const margin = { top: 150, right: 70, bottom: 150, left: 230 }
  const width = 725 - margin.left - margin.right
  const height = 1300 - margin.top - margin.bottom

  // Search
  d3.select("#input").on('keyup', function() {
    var searchTerm = d3.select("#input").property("value").toLocaleUpperCase()
    d3.selectAll("circle").attr('fill', d => colorScale(d.occupation_group))
    d3.selectAll("circle").filter(d => d.name.toLocaleUpperCase().indexOf(searchTerm) == -1).attr('fill', '#bdbdbd')
  })

  // Define positions
  const positions = ["Oppose","Support"]

  // Define x axis position
  const xPositionScale = d3.scalePoint()
    .domain(positions)
    .range([-55, width - 130])

  // Define y axis position
  const yPositionScale = d3.scaleTime()
    .domain([new Date("2021-02-08"), new Date("2021-10-31")])
    .range([0, height - 75])

  var occupation_labels = ['Investment','Law',"'Entity'",'Unemployed','Retired','Executive','Other']
  var occupation_colors = ["#ff6e54","#ffa600","#85C1E9",'#444e86','#003f5c','#955196',"#747474"]

  // Define colour scale
  const colorScale = d3.scaleOrdinal()
    .domain(occupation_labels)
    .range(occupation_colors)

  // Set radius scale
  const radiusScale = d3.scaleSqrt()
    .domain([0, 180000])
    .range([0, 50])

  // Create currency formatted
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  // Create tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")

  // Read in json
  d3.json("data.json")
    .then(ready)
  function ready (datapoints) {
    datapoints.forEach(d => {
      d.x = d.x + d.vx;
      d.y = d.y + d.vy;
    })

    // Create svg
    const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // Show text labels
    svg.selectAll('text')
      .data(positions)
      .join('text')
      .attr('x', d => xPositionScale(d))
      .attr('dx', 25)
      .attr('dy', -100)
      .attr("class", "axis_labels_header")
      .text(d => d)

    // Set position of circles
    svg.selectAll('circle')
      .data(datapoints)
      .join('circle')
      .attr("id", "circleBasicTooltip")
      .attr('r', d => radiusScale(d.amount))
      .attr('fill', d => colorScale(d.occupation_group))
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('vx', d => d.vx)
      .attr('vy', d => d.vy)
      .attr('stroke-width', '5')
      .attr("stroke", '#00000000')
      .attr("paint-order", "stroke");

    // Create y-axis
    var y_axis = d3.axisLeft().scale(yPositionScale);
    svg.append("g")
      .attr("transform", "translate(-140, 0)")
      .attr("class", "axis_labels")
      .call(y_axis);
    
    // Create legend
    var n = occupation_labels.length / 2
    var itemWidth = 120
    var itemHeight = 40

    var legend = svg.selectAll(".legend")
      .data(occupation_labels)
      .enter()
      .append("g")
      .attr("transform", function(d,i) { return "translate(" + i%n * itemWidth + "," + Math.floor(i/n) * itemHeight + ")"; })
      .attr("class","legend");

    legend.append('rect')
      .attr("width", 15)
      .attr("height", 15)
      .attr("x", "-60")
      .attr("y", "1035")
      .attr("fill", function(d,i) { return colorScale(i); });

    legend.append('text')
      .attr("x", "-35")
      .attr("y", "1048")
      .text(function(d) { return d; });
    
    // Trigger tooltip
    d3.selectAll("circle")
      .on("mouseover", function(e, d) {
        d3.select(this)
          .attr('stroke-width', '5')
          .attr("stroke", "black");
        tooltip
          .style("visibility", "visible")
          .attr('class','tooltipdiv')
          .html(`<h4>${d.name}</h4>` + 
                `<p><strong>Date</strong>: ${d.date_string}<br />` + 
                `<strong>Donation</strong>: ${formatter.format(d.amount)}<br />` +
                `<strong>Occupation</strong>: ${d.occupation}</p>`);
      })
      .on("mousemove", function(e) {
        tooltip
          .style("top", e.pageY - 10 + "px")
          .style("left", e.pageX + 10 + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr('stroke-width', '5');
        d3.select(this).attr('stroke', '#00000000');
          tooltip.style("visibility", "hidden");
    });

  }
})();