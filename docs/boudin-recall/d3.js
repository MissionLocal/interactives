(function () {

  // Margin convention
  const margin = { top: 175, right: 150, bottom: 50, left: 175 }
  const width = 700 - margin.left - margin.right
  const height = 1200 - margin.top - margin.bottom

  const svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // Search
  d3.select("#input").on('keyup', function() {
    var searchTerm = d3.select("#input").property("value").toLocaleUpperCase()
    d3.selectAll("circle").attr('fill', d => colorScale(d.occupation_group))
    d3.selectAll("circle").filter(d => d.name.toLocaleUpperCase().indexOf(searchTerm) == -1).attr('fill', '#bdbdbd')
    console.log(searchTerm)
  })

  // Create time parser
  const tParser = d3.timeParse("%Y-%m-%d")

  // Define positions
  const positions = ["Oppose","Support"]

  // Define x axis position
  const xPositionScale = d3.scalePoint()
    .domain(positions)
    .range([20, width - 20])

  // Define y axis position
  const yPositionScale = d3.scaleTime()
    .domain([new Date("2021-02-08"), new Date("2021-10-31")])
    .range([0, height])
    .clamp(true)

  // Define colour scale
  const colorScale = d3.scaleOrdinal()
    .domain(['investment','law',"entity",'unemployed','retired','executive','other'])
    .range(["#ff6e54","#ffa600","#85C1E9",'#444e86','#003f5c','#955196',"#747474"])

  // Set radius scale
  const radiusScale = d3.scaleSqrt()
    .domain([5, 180000])
    .range([1, 40])

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
    .style("visibility", "hidden");
  
  // Force simulation and prevent overlap
  const forceX = d3.forceX(d => xPositionScale(d.position)).strength(4)
  const forceY = d3.forceY(d => yPositionScale(tParser(d.date))).strength(3)
  const forceCollide = d3.forceCollide((d => radiusScale(d.amount) + 2))
  const simulation = d3.forceSimulation()
    .force("overlap", forceCollide)
    .force("y", forceY)
    .force("x", forceX)
    .force('charge', d3.forceManyBody().strength(-10))


  // Read in json
  d3.json("data.json")
    .then(ready)
  function ready (datapoints) {
    datapoints.forEach(d => {
      d.x = d.x;
      d.y = d.y;
    })

    // Show text labels
    svg.selectAll('text')
      .data(positions)
      .join('text')
      .attr('text-anchor', 'end')
      .attr('x', d => xPositionScale(d))
      .attr('dx', 20)
      .attr('dy', -85)
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

    // Trigger tooltip
    d3.selectAll("circle")
      .on("mouseover", function(e, d) {
        d3.select(this)
          .attr('stroke-width', '2')
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
        d3.select(this).attr('stroke-width', '0');
          tooltip.style("visibility", "hidden");
    });

  }
})();