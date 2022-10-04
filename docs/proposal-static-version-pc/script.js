(function () {
    const margin = { top: 20, right: 50, bottom: 50, left: 50 };
  
    const width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
    // define proposals and x/y axis
    const proposals = ["Proposal D","Proposal E"]

    const xPositionScale = d3.scaleTime().domain([new Date(2022, 2, 1), new Date(2022, 9, 1)])
    .range([100, width]).clamp(true);
    const yPositionScale = d3.scalePoint().domain(proposals).range([130, height - 80])

    // set color scale
    const colorScale = d3.scaleOrdinal()
    .domain(["Individual","Committee", "Entity","Unknown"])
    .range(['#efb774','#98c1d9','#0077b6','#d9d9d9']);

    // set radius scale
    const radiusScale = d3.scaleSqrt().domain([10, 200000]).range([5, 35])

    // create currency formatted
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0});
    
    // create tooltips div
    let tooltip = d3.select("#beeswarm").append("div")
        .attr("class", "svg-tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden");
    
    // read in external data
    d3.json("data.json")
    .then(ready)
  function ready (datapoints) {
    datapoints.forEach(d => {
      console.log(d.x)
      d.x = d.x + d.vx; 
      d.y = d.y + d.vy;
    })

    
    // tell d3 to link a certain div in html
    const svg = d3
      .select("#beeswarm")   // the name of the div in the html
      .append("svg")  // put a svg in the chart
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")  // group: the convention of D3; all the charts are in a group
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

    // Show text labels
        svg.selectAll('text')
        .data(proposals)
        .join('text')
        .attr('text-anchor', 'end')
        .attr('y', d => yPositionScale(d))
        .attr('dx', 50)
        .text(d => d)

     // create donor circles
    svg.selectAll('circle')
    .data(datapoints)
    .join('circle')
    .attr("id", "circleBasicTooltip")
    .attr('r', d => radiusScale(d.Amount))
    .attr('cx', d => xPositionScale(d['Tx Date']))
    .attr('fill', d => colorScale(d.Entitycode))
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('vx', d => d.vx)
    .attr('vy', d => d.vy) 
    .attr("opacity", 0.75)
    .attr('stroke', 3)


  // Trigger tooltip
  d3.selectAll("circle")
    .on("mouseover", function(e, d) {
      d3.select(this)
        .attr('stroke-width', '2')
        .attr("stroke", "black");
      tooltip
        .style("visibility", "visible")
        .attr('class','tooltipdiv')
        .html(`<h4>${d.Name}</h4>` + 
              `<p><strong>Date</strong>: ${d['Tx Date']}<br />` + 
              `<strong>Donation</strong>: ${formatter.format(d.Amount)}<br />` +
              `<strong>Employer</strong>: ${d.Employer}</p>` );
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
    

const xAxis = d3.axisBottom(xPositionScale);
      svg
        .append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    }
  })();
  