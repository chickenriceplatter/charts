$(function() {

var svgWidth = 1500;
var svgHeight = 750;
var barSpacing = 1;
var padding = 60;

var dataset = $(".companies").data().data;

dataset.map(function(d) { d.profitMargin = d.profit / d.revenue * 100; });

var components = dataset.map(function(d) {return d.symbol; });

var rev = dataset.map(function(d) {return d.revenue; });
var ni = dataset.map(function(d) {return d.profit; });
var margin = dataset.map(function(d) {return d.profitMargin; });

var maxRevenue = d3.max(rev);
var maxProfit = d3.max(ni);
var maxMargin = d3.max(margin);

var barWidth = (svgWidth - 2*padding)/dataset.length - barSpacing;

var yScale = d3.scale.linear()
          .domain([0,maxRevenue])
          .range([0, (svgHeight - 2*padding)]);

var yScaleForAxis = d3.scale.linear()
                      .domain([maxRevenue,0])
                      .range([0, (svgHeight - 2*padding)]);

var xScale = d3.scale.ordinal()
          .domain(components)
          .rangeBands([0, svgWidth- 2*padding]);

var yAxis = d3.svg.axis()
              .scale(yScaleForAxis)
              .orient("left")
              .ticks(10);

var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom");

var svg = d3.select(".bar-chart")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

$(".bar-chart").toggleClass("revenue");
$(".graph-title").text("Revenue Graph");

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d,i) { return i * (barWidth + barSpacing) + padding; })
    .attr("y", function(d) { return svgHeight - yScale(d.revenue) - padding; })
    .attr("width", barWidth)
    .attr("height", function(d) { return yScale(d.revenue); })
    .attr("fill", function(d) { return d.primary_color });

svg.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(" + padding + "," + padding + ")")
    .call(yAxis);

svg.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(" + padding + "," + (svgHeight - padding) + ")")
    .call(xAxis);

svg.selectAll("rect")
  .on("mouseover", function(d) {
  //Get this bar's x/y values, then augment for the data-box
    var xPosition = parseFloat(d3.select(this).attr("x"));
    var yPosition = svgHeight / 2;
  //Update the data-box position and value
  d3.select(".data-box")
    .style("left", xPosition + "px")
    .style("top", yPosition + "px");


  d3.select(".line-one").text("Name: " + d.name);
  d3.select(".line-two").text("Revenue: " + d.revenue + " Million");
  d3.select(".line-three").text("Profit: " + d.profit + " Million");
  d3.select(".line-four").text("Margin: " + d.profitMargin.toFixed(2).toString() + " %");

  $(".data-box").toggleClass("hidden");
  })
  .on("mouseout", function() {
    $(".data-box").toggleClass("hidden");
});

d3.select("svg")
  .on("click", function() {

    if ($(".bar-chart").hasClass("revenue")) {

      $(".bar-chart").toggleClass("revenue");
      $(".bar-chart").toggleClass("profit");

      $(".graph-title").text("Profit Graph");

      yScale.domain([0,maxProfit]);
      yScaleForAxis.domain([maxProfit,0]);

      svg.selectAll("rect")
          .transition()
          .duration(1000)
          .attr("y", function(d) { return svgHeight - yScale(d.profit) - padding; })
          .attr("height", function(d) { return yScale(d.profit); });

      svg.select(".yaxis")
                .transition()
                .duration(1000)
              .call(yAxis);
      }
    else if ($(".bar-chart").hasClass("profit")) {

      $(".bar-chart").toggleClass("profit");
      $(".bar-chart").toggleClass("margin");

      $(".graph-title").text("Margin Graph");

      yScale.domain([0,maxMargin]);
      yScaleForAxis.domain([maxMargin,0]);

      svg.selectAll("rect")
          .transition()
          .duration(1000)
          .attr("y", function(d) { return svgHeight - yScale(d.profitMargin) - padding; })
          .attr("height", function(d) { return yScale(d.profitMargin); });

      svg.select(".yaxis")
                .transition()
                .duration(1000)
                .call(yAxis);
      }
      else {

        $(".bar-chart").toggleClass("margin");
        $(".bar-chart").toggleClass("revenue");

        $(".graph-title").text("Revenue Graph");

        yScale.domain([0,maxRevenue]);
        yScaleForAxis.domain([maxRevenue,0]);

        svg.selectAll("rect")
            .transition()
            .duration(1000)
            .attr("y", function(d) { return svgHeight - yScale(d.revenue) - padding; })
            .attr("height", function(d) { return yScale(d.revenue); });

        svg.select(".yaxis")
                  .transition()
                  .duration(1000)
                  .call(yAxis);

      };

});



});


