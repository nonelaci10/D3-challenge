/*
<svg width="510" height="400">
    <text transform="translate(310,320)">In Poverty (%)</text>
    <text transform="translate(60,135) rotate(-90)">Obese (%)</text>
    <circle cx="150" cy="150" r="10" class="stateCircle"></circle>
    <text transform="translate(150,150)" class="stateText" font-size="10">ST</text>
</svg>
*/
// @TODO: YOUR CODE HERE!
var data;

function importData(blah) {
    data = blah;
    runLater();
}
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", 510)
    .attr("height", 400)
svg
    .append("text")
    .attr("transform", "translate(310,320)")
    .text("In Poverty (%)");
svg
    .append("text")
    .attr("transform", "translate(60,135) rotate(-90)")
    .text("Obese (%)");
d3.csv("assets/data/data.csv").then(importData);
var x, xMin, xMax;
var y, yMin, yMax;
var xScale;
var yScale;

function runLater() {
    xMin = Number.MAX_VALUE;
    for (var i = 0; i < data.length; i++) {
        if (data[i].poverty < xMin) {
            xMin = parseFloat(data[i].poverty);
        }
    }
    xMax = d3.max(data, d => parseFloat(d.poverty));
    yMin = d3.min(data, d => parseFloat(d.obesity));
    yMax = d3.max(data, d => parseFloat(d.obesity));
    xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, 510]);
    yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([0, 400]);

    var CircleNStuff = svg
        .selectAll()
         .data(data)
        .enter()
        
    CircleNStuff
        // .selectAll("circle")
        // .data(data)
        // .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.obesity))
        .attr("r", 10)
        .attr("class", "stateCircle");

    CircleNStuff
        // .selectAll("text")
        // .data(data)
        // .enter()
        .append("text")
       //.attr("transform", "translate(" + (xScale(x)) + "," + (yScale(y)) + ")")
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.obesity))
        .attr("class", "stateText")
        .attr("font-size", 10)
        .text(d => d.abbr);


    // The FOR LOOP
    // for (var i = 0; i < data.length; i++) {
    //     x = parseFloat(data[i].poverty);
    //     y = parseFloat(data[i].obesity);
    //     svg
    //         .append("circle")
    //         .attr("cx",xScale(x))
    //         .attr("cy",yScale(y))
    //         .attr("r",10)
    //         .attr("class","stateCircle");
    //     svg
    //         .append("text")
    //         .attr("transform","translate(" + (xScale(x)) + "," + (yScale(y)) + ")")
    //         .attr("class","stateText")
    //         .attr("font-size",10)
    //         .text(data[i].abbr);
    // }
}