///
/// define constants
///

const svg_max_width = window.innerWidth;
const svg_max_height = 1000;
const svg_margin = 10;
const node_radius_min = 0;
const node_radius_max = 60;
const link_width_min = 1;
const link_width_max = 10;
const inputHeight = document.getElementById('input').offsetHeight
// const dropdownHeight = document.getElementById('groups-dropdown').offsetHeight
const radiusBuffer = 5;

///
/// import data
///

function fetchJSON(subset) {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        forceSim(data[subset]);
    })
    .catch(error => console.error('Error:', error));
}

fetchJSON("neighbors");

///
/// create force simulation
///

var svg = document.getElementById('main-svg') // remove existing svg

function forceSim(data) {

    // if a pop-up exists, remove it
    if (document.getElementById('tooltipdiv')) {
        document.getElementById('tooltipdiv').remove();
    }

    // if user clicks outside of pop-up, remove it
    document.addEventListener("click", (e) => {
        if (document.getElementById('tooltipdiv')) {
            if (!(e.target.id == 'tooltipdiv' || e.target.parentNode.id == 'tooltipdiv' || e.target.className == 'within-tooltip')) {
                document.getElementById('tooltipdiv').remove();
            }
        }
    })

    ///
    /// set up svg
    ///

    var svg = d3.select('svg')

    //figure out width
    if (window.innerWidth >= svg_max_width) { width = svg_max_width; }
    else { width = window.innerWidth }

    //figure out height
    if (window.innerHeight >= svg_max_height) { height = svg_max_height - inputHeight - svg_margin }
    else { height = window.innerHeight - inputHeight - svg_margin }

    // set svg height and width
    svg.attr('width', width).attr('height', height)

    // get max values for links and nodes
    function getMax(nodes, prop) {
        return nodes.reduce((max, node) => (node[prop] > max[prop] ? node : max), nodes[0]);
    }
    var maxNodeValue = getMax(data.nodes, "amount").amount
    var maxLinkValue = getMax(data.links, "amount").amount

    // define scales for node radius and link width
    const radiusScale = d3.scaleSqrt()
        .domain([0, maxNodeValue])
        .range([node_radius_min, node_radius_max]);
    const linkScale = d3.scaleSqrt()
        .domain([0, maxLinkValue])
        .range([link_width_min, link_width_max]);

    // define link force
    var linkForce = d3
        .forceLink()
        .id(d => d.id)
        .strength(1)

    // define simulation
    var simulation = d3.forceSimulation()
        .force('link', linkForce.strength(0.1)) // force between links
        .force("collide", d3.forceCollide(d => radiusScale(d.amount) + radiusBuffer).iterations(5)) // gaps between nodes
        .force("y", d3.forceY().y(function(d) { // y-axis positioning
            if (d.type === "donor") { // donors at the top
                return 0 + 100
            } else if (d.type === "focus") { // pac in the middle
                return height / 2
            } else if (d.type === "recipient") { // recipients in the middle
                return height - 100
            }}).strength(1.5))
        .force("x", d3.forceX().x(width / 2).strength(0.1)) // x-axis positioning - centered


    ///
    /// create elements
    ///

    // create linking lines
    var linkElements = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke-width", function(d) { // set width of line based on money transferred
            return linkScale(d.amount)
        })
        .attr("class", function(d) { // set animation class 'link' unless it's a focus node
            if (d.type != "focus") {
                return "link-static"
            }
            else {
                return "link-focus"
            }
        })
        .attr("stroke", "rgba(50, 50, 50, 0.1)")
        .style("visibility", "hidden") // hidden while simulation is running

    // create images
    var defs = svg.selectAll("g.node")
        .data(data.nodes, function(d) {
            return d.id;
        })
        .enter()
        .append("svg:g")
        .attr("class", "node")
        .append("defs");

    // create node circles
    var nodeElements = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("id", function(d, i) {
            return "node_id" + i
        })
        .attr("r", d => radiusScale(d.amount))
        .style("stroke-width", 1)
        .style("stroke", "#000000")
        .attr("fill", function(d) { // set image fills
            if (d.photo != "no image available") {
                return "url(#image" + d.id + ")"
            }
            else { return "#9a9a9a"}
        })
        .style("visibility", "hidden") // hidden while simulation is running
        //.call(dragDrop) // turned off because of new loading screen
        .on("click", popup)
        .on('mouseover', mouseoverNode)
        .on('mouseout', mouseoutNode);

    // create node labels
    var textElements = svg.append("g")
        .attr("class", "texts")
        .attr("font-family", "Barlow")
        .selectAll("text")
        .data(data.nodes)
        .enter().append("text")
        .text(function(node) {
            return node.label
        })
        .attr("font-size", 15)
        .attr("dx", 25)
        .attr("dx", d => radiusScale(d.amount) + 7)
        .attr("dy", 5)
        .attr("text-anchor", "left")
        .attr("id", function(d, i) {
            return "label_id" + i
        })
        .attr("class", "shadow")
        .style("visibility", "hidden");

    // create loading screen
    var loadingScreen = svg.append("g")
        .attr("class", "loading-screen")
        .attr("font-family", "Calibri")
        .append("text")
        .text('Loading...')
        .attr("dx", (width / 2) - 61) // magic number is to center text
        .attr("dy", height / 2)
        .style("visibility", "visible")

    ///
    /// format numbers
    ///

    // function to format numbers with dollar signs and commas
    function formatNumber(num) {
        return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    ///
    /// pop-up function
    ///

    function popup(d) {

        // if a pop-up exists, remove it
        if (document.getElementById('tooltipdiv')) {
            document.getElementById('tooltipdiv').remove();
        }

        if (d.desc == '' && d.type == 'donor') {
            description = "<div class='popup-header'><h4 class='within-tooltip'>" +
            d.label +
            "</h4>" +
            "<p class='close-button'>✖</p>" +
            "</div>" +
            "<hr>" +
            "<p>" + d.label + " has donated at least <a target='_blank' href='" +
            d.link + "'>" + formatNumber(d.amount) + "</a> to " +
            d.recipient_string + ".</p>"
        }
        else if (d.desc == '' && d.type == 'recipient') {
            description = "<div class='popup-header'><h4 class='within-tooltip'>" +
            d.label +
            "</h4>" +
            "<p class='close-button'>✖</p>" +
            "</div>" +
            "<hr>" +
            "<p>" + d.label + " has received at least <a target='_blank' href='" +
            d.link + "'>" + formatNumber(d.amount) + "</a> from " +
            d.label_string + ".</p>"
        }
        else {
            description = "<div class='popup-header'><h4 class='within-tooltip'>" +
            d.label +
            "</h4>" +
            "<p class='close-button'>✖</p>" +
            "</div>" +
            "<hr>" +
            d.desc
        }

        // initialize pop-up (invisible at this point)
        var tooltip = d3.select("body")
            .append("div")
            .attr('id', 'tooltipdiv')
            .style("position", "absolute")
            .style("visibility", "hidden")
            .html(description);

        // Get coordinates for mouse click, plus pop-up width and height
        var mouseX = d3.event.pageX;
        var mouseY = d3.event.pageY;
        var tooltipWidth = document.getElementById('tooltipdiv').offsetWidth;
        var tooltipHeight = document.getElementById('tooltipdiv').offsetHeight;

        if (mouseY < (tooltipHeight + inputHeight + svg_margin)) { // if the pop-up can go by the mouse without going over the top of the svg...
            yPosition = svg_margin; // ... do that
        }
        else { // otherwise...
            yPosition = mouseY - tooltipHeight - 2; // ... put it above the mouse
        }

        if (mouseX - (tooltipWidth / 2) < 0) { // if the pop-up cannot go by the mouse without going over the left bounds...
            xPosition = 0; // ... put it flush against the left bounds
        }
        else if (mouseX + (tooltipWidth / 2) > width) // if the pop-up cannot go by the mouse without going over the right bounds...
            xPosition = width - tooltipWidth; // ... put it flush against the right bounds
        else {
            xPosition = mouseX - (tooltipWidth / 2); // otherwise, center it on the mouse
        }
        
        // make pop-up visible
        tooltip
            .style('top', yPosition + "px")
            .style('left', xPosition + "px")
            .style("visibility", "visible")

        d3.event.stopPropagation();
    }

    // change node and label appearance on mouseover
    function mouseoverNode(d, i) {
        
        d3.select("#node_id" + i) // alter node appearance
            .transition()
            .duration(5)
            .style("stroke-width", 1)
            .style("stroke", '#000000')
            .style("cursor", "pointer");

        d3.select("#label_id" + i)
            .style("visibility", "visible"); // make label visible
        linkElements
            .attr("class", function(l) { // animate hovered links
                if (l.type === "focus") {
                    return "link-focus";
                }
                else if (d === l.source || d === l.target) {
                    return "link";
                }
                else {
                    return "link-static";
                }
            })
            .attr('stroke-width', function(l) { // make links thicker on mouseover, based on original thickness
                if (d === l.source || d === l.target)
                    return linkScale(l.amount) + 1;
                else
                    return linkScale(l.amount);
            })
            .attr('stroke', function(l) { // make links darker on mouseover
                if (d === l.source || d === l.target)
                    return '#6b6b6b99';
                else
                    return "rgba(50, 50, 50, 0.1)";
            });
    }

    // change node and label appearance on mouseout
    function mouseoutNode(d, i) {

        var searchTerm = d3.select("#input").property("value").toLocaleUpperCase()

        if (d.label.toLocaleUpperCase().indexOf(searchTerm) == -1) {
           d3.select("#node_id" + i)
          .transition()
          .duration(100)
          .style("stroke-width", 1)
          .style("stroke", "rgba(200, 200, 200, 1)")
          .style("cursor", "default"); 
        }
        else {
         d3.select("#node_id" + i)
          .transition()
          .duration(100)
          .style("stroke-width", 1)
          .style("stroke", "#000000")
          .style("cursor", "default");
        }

        d3.select("#label_id" + i) // make label invisible
            .style("visibility", "hidden");
        linkElements.attr('stroke-width', function(d) { return linkScale(d.amount) })
            .attr('stroke', "rgba(50, 50, 50, 0.1)")
            .attr("class", function(d) { // animate un-hovered links
                if (d.type === "focus") {
                    return "link-focus";
                }
                else {
                    return "link-static";
                }
            })
            .classed('link', false);
    }

    // search function
    d3.select("#input").on('keyup', function() {
        var searchTerm = d3.select("#input").property("value").toLocaleUpperCase()
        d3.selectAll("circle").attr("fill", function(d) { // set image fills
            if (d.photo != "no image available") {
                return "url(#image" + d.id + ")"
            }
            else { return "#9a9a9a"}
        })
        .attr("class", "highlighted")
        
        d3.selectAll("circle").style("stroke", "#000000")
        d3.selectAll("circle").filter(d => d.label.toLocaleUpperCase().indexOf(searchTerm) == -1).attr('fill', "rgba(200, 200, 200, 1)")
        d3.selectAll("circle").filter(d => d.label.toLocaleUpperCase().indexOf(searchTerm) == -1).style('stroke', "rgba(200, 200, 200, 1)")
    })

    // add images to circles
    defs.append('pattern')
        .attr("id", function(d) {
            return "image" + d.id;
        })
        .attr("width", 1)
        .attr("height", 1)
        .append("svg:image")
        .attr("xlink:href", function(d) {
            return d.photo;
        })
        .attr("width", (d => radiusScale(d.amount) * 2))
        .attr("height", (d => radiusScale(d.amount) * 2));

    // update force simulation every tick
    simulation.nodes(data.nodes).on('end', () => {
        nodeElements
            .attr('cx', function(node) {
                return node.x = Math.max((10 + radiusScale(node.amount)), Math.min((width - radiusScale(node.amount) - 10), node.x));
            })
            .attr('cy', function(node) {
                return node.y = Math.max((10 + radiusScale(node.amount)), Math.min((height - radiusScale(node.amount) - 10), node.y));
            })
            .style("visibility", "visible")
        textElements
            .attr('x', function(node) {
                return node.x
            })
            .attr('y', function(node) {
                return node.y
            })
        linkElements
            .attr('x1', function(link) {
                return link.source.x
            })
            .attr('y1', function(link) {
                return link.source.y
            })
            .attr('x2', function(link) {
                return link.target.x
            })
            .attr('y2', function(link) {
                return link.target.y
            })
            .style("visibility", "visible")
        loadingScreen
            .style("visibility", "hidden")
    })

    // create links
    simulation.force("link").links(data.links)

}

/*
{
    "id": "arthurPatterson",
    "label": "Arthur Patterson",
    "type": "focus",
    "amount": 100000,
    "desc": "<p>Patterson is the co-founder and lead investor for <a target='_blank' href='https://www.accel.com/'>Accel</a>, a venture capital firm that has invested in tech companies including Facebook, Slack, and Dropbox.</p><p>He is a director of the <a target='_blank' href='https://projects.propublica.org/nonprofits/organizations/862339545'>501(c)3</a> nonprofit Neighbors for a Better SF, and is married to Louise Muhlfeld Patterson, a director at its <a target='_blank' href='https://projects.propublica.org/nonprofits/organizations/852432657'>associated 501(c)4</a>, Neighbors for a Better SF Advocacy.</p>",
    "photo": "images/arthurPatterson.jpg"
},

{
    "source": "arthurPatterson",
    "target": "louiseMuhlfeld",
    "amount": 10000,
    "type": "focus"
},
*/