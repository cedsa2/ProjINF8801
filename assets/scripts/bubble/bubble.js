"use strict";

function createBubbleChart(bubbleChartSvg, bubbleSources, bubbleSelectedFilter, diploma, inscription, tip, bubbleChartHeight){
  var result = createBubbleSources(diploma, inscription, bubbleSelectedFilter);

  var color = d3.scaleOrdinal(d3.schemeSet1)
  color.domain(bubbleSources.map(d => d.Programme));

  var nb_stud_for_position = [];
  var nb_stud = 0;
  result.forEach(function (d) {
    nb_stud = 2*Math.sqrt(d.number_of_students) +  nb_stud;  
    nb_stud_for_position.push(nb_stud) ;
    })

  var count_programms = result.length
  var multiplier = bubbleChartHeight/nb_stud_for_position[nb_stud_for_position.length-1];

  var fontScale = d3.scaleLinear().domain([0,Math.sqrt(result[0].number_of_students)]).range([0, 25]);
  var bubbles_g =  bubbleChartSvg.selectAll("g")
    .data(result)
    .enter()
    .append("g")
    .attr("transform", (d,i) => `translate(${300 + 20*Math.sqrt((count_programms-i)*i)},${(nb_stud_for_position[i]-Math.sqrt(d.number_of_students))*multiplier})`);

    bubbles_g.append("circle")
    .style("fill", d => color(d.Programm))
    .style('opacity', 0.8)
    .attr("r", d => multiplier*Math.sqrt(d.number_of_students))
    .text(d => d.Programm)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)


    bubbles_g.append("defs")
    .append("clipPath")
    .attr("id", (d, i) => "clip" + i)
    .append("circle")
    .attr("r", d => multiplier*Math.sqrt(d.number_of_students));


    bubbles_g.append("text")
      .attr("clip-path", (d, i) => "url(#clip" + i + ")")
      .attr("font-size", d => fontScale(Math.sqrt(d.number_of_students)))
      .attr('text-anchor', 'middle')
      .attr("y", d => fontScale(Math.sqrt(d.number_of_students))/4)
      .selectAll("tspan")
      .data(d => d.Programm.split(" "))
      .enter()
      .append("tspan") 
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d)  
}




function updateBubbleChart(diploma, inscription, bubbleSelectedFilter, bubbleChartSvg, bubbleSources, tip, bubbleChartHeight){
  var result = createBubbleSources(diploma, inscription, bubbleSelectedFilter);

  var nb_stud_for_position = [];
  var nb_stud = 0;
  result.forEach(function (d) {
    nb_stud = 2*Math.sqrt(d.number_of_students) +  nb_stud;  
    nb_stud_for_position.push(nb_stud) ;
    })

  var count_programms = result.length
  var multiplier = bubbleChartHeight/nb_stud_for_position[nb_stud_for_position.length-1];

  var color = d3.scaleOrdinal(d3.schemeSet1);
  color.domain(bubbleSources.map(d => d.Programme));

  var fontScale = d3.scaleLinear().domain([0,Math.sqrt(result[0].number_of_students)]).range([0, 25]);


  bubbleChartSvg.selectAll("g").remove()

  var bubbles_g =  bubbleChartSvg.selectAll("g")
    .data(result)
    .enter()
    .append("g")
    .attr("transform", (d,i) => `translate(${300 + 20*Math.sqrt((count_programms-i)*i)},${(nb_stud_for_position[i]-Math.sqrt(d.number_of_students))*multiplier})`);

    bubbles_g.append("circle")
    .style("fill", d => color(d.Programm))
    .style('opacity', 0.8)
    .attr("r", d => multiplier*Math.sqrt(d.number_of_students))
    .text(d => d.Programm)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)


    bubbles_g.append("defs")
    .append("clipPath")
    .attr("id", (d, i) => "clip" + d.number_of_students + i)
    .append("circle")
    .attr("r", d => multiplier*Math.sqrt(d.number_of_students));

    bubbles_g.append("text")
      .attr("clip-path", (d, i) => "url(#clip" + + d.number_of_students + i + ")")
      .attr("font-size", d => fontScale(Math.sqrt(d.number_of_students)))
      .attr('text-anchor', 'middle')
      .attr("y", d => fontScale(Math.sqrt(d.number_of_students))/4)
      .selectAll("tspan")
      .data(d => d.Programm.split(" "))
      .enter()
      .append("tspan") 
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d)
}