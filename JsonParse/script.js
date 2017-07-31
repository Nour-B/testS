var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("Data1.json", function(error, flare) {
    if (error) throw error;

    root = flare;
    root.x0 = height / 2;
    root.y0 = 0;

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    root.children.forEach(collapse);
    update(root);
});

d3.select(self.frameElement).style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click)
        .on("mouseover",onMouseOver)
        .on("mouseout",onMouseOut)

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
        .attr("dy", ".35em")
        //.attr("text-anchor","middle")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}
var datatip='<div class="tooltip" style="width: 170px; background-opacity:0.6;filter: alpha(opacity=60); height:100px;background-color:#FFB6C1 ;border-radius: 10%">' +
    '<div class="header1">HEADER1</div>' +
    '<div class="header-rule"></div>' +
    '</div>';
function createDataTip(x,y,h1) {

    var html = datatip.replace("HEADER1", h1);

    d3.select("body")
        .append("div")
        .attr("class", "nour")
        .style("position", "absolute")
        .style("top", y + "px")
        .style("left", (x - 125) + "px")
        .style("opacity",0)
        .html(html)
        .transition().style("opacity",1);



}



function onMouseOver(d,e)
{
    if (d == root) return;
    var rect = this.getBoundingClientRect();
    if (d.target) d = d.target
    if(d.hasOwnProperty("children"))
        createDataTip(rect.left, (rect.top ),(d.children.value));


    else
        createDataTip(rect.left, (rect.top), (d.value));
//if (d.name=="typeOrigin"){
    //          console.log(d.value);
}


setTimeout(onMouseOver, 100000);




function onMouseOut(e,d,i) {
    d3.selectAll(".nour").remove();
}



var request = new XMLHttpRequest();
request.open("GET", "Data1.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);
var n= my_JSON_object.children[0].children[0].children.length;//Object.keys(my_JSON_object.name);
console.log(my_JSON_object);
console.log (n);

var tab =new Array(n);

for(i=0; i<n ;i++){

//console.log (my_JSON_object.children[0].children[0].children[i].children[0].value);
if(my_JSON_object.children[0].children[0].children[i].children[0].value!= "Site")
tab.push(my_JSON_object.children[0].children[0].children[i].children[0].value);

    }
console.log(tab);



for(i=0;i<my_JSON_object.children.length;i++)
{
for(j=0;j<=tab.length;j++){





}



}

//console.log (my_JSON_object.children[0].children[0].children[0].children[i].value);
// console.log (my_JSON_object.children[0].children[0].children[1].children[].value);
//console.log ( Object.keys(my_JSON_object.access[0].relationShips).length);
//var child =["my_JSON_object.children[0].children[0].children[1].children[0].value","my_JSON_object.children[0].children[0].children[0].children[0].value"]





