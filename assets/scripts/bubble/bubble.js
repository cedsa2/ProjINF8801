"use strict";

function createBubbleAxes(bubbleChartSvg, xBubble, yBubble, bubbleChartwidth, bubbleChartheight){
  /*
  bubbleChartSvg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(" + bubbleChartwidth + "," + bubbleChartheight +")")
  .call(xBubble)
  /*.selectAll("text")
  .style("text-anchor", "start") //allows the text to rotate around the start instead of around the center
  .attr("transform", "rotate(30)")

  bubbleChartSvg.append("g")
  .attr("class", "y axis")
  .call(yBubble)
  */
}

function createBubbleChart(bubbleChartSvg, bubbleSources, bubbleSelectedFilter, diploma, inscription, xBubble, yBubble, tip){
  var result = createBubbleSources(diploma, inscription, bubbleSelectedFilter);
  //console.log(result)

  var color = d3.scaleOrdinal(d3.schemeSet1)
  color.domain(bubbleSources.map(d => d.Programme));

  var nb_stud_for_position = [];
  var nb_stud = 0;
  result.forEach(function (d) {
    nb_stud = 2*Math.sqrt(d.number_of_students) +  nb_stud;  
    nb_stud_for_position.push(nb_stud) ;
    })

  var count_programms = result.length
  var len = 500/Math.ceil(count_programms/4);

  var multiplier = 400/nb_stud_for_position[nb_stud_for_position.length-1];
  //console.log(nb_stud_for_position[0]*multiplier)

  var fontScale = d3.scaleLinear().domain([0,Math.sqrt(result[0].number_of_students)]).range([0, 25]);
  //console.log(result)
  var bubbles_g =  bubbleChartSvg.selectAll("g")
    .data(result)
    .enter()
    .append("g")
    .attr("transform", (d,i) => `translate(${300 + 20*Math.sqrt((count_programms-i)*i)},${(nb_stud_for_position[i]-Math.sqrt(d.number_of_students))*multiplier})`);
    //100+ 3*((count_programms-i)*i)

    bubbles_g.append("circle")
    .style("fill", d => color(d.Programm))
    .style('opacity', 0.8)
    //.attr("cx",(d,i)=> 100 + 20*Math.sqrt((count_programms-i)*i))
    //.attr("cy", (d,i) => (nb_stud_for_position[i]-Math.sqrt(d.number_of_students))*multiplier)
    //.attr("cy", (d,i) => (-Math.sqrt(d.number_of_students))*multiplier)
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



function updateBubbleChart(diploma, inscription, bubbleSelectedFilter, bubbleChartSvg, bubbleSources, xBubble, yBubble, tip){
  //console.log(bubbleSelectedFilter)
  //console.log(bubbleSources)
  var result = createBubbleSources(diploma, inscription, bubbleSelectedFilter);

  var nb_stud_for_position = [];
  var nb_stud = 0;
  result.forEach(function (d) {
    nb_stud = 2*Math.sqrt(d.number_of_students) +  nb_stud;  
    nb_stud_for_position.push(nb_stud) ;
    })
  
  //nb_stud_for_position.sort(function(a, b){return b-a});
  //console.log(result[0].Programm)
  //console.log(nb_stud_for_position)

  var count_programms = result.length
  var len = 500/Math.ceil(count_programms/4);

  var multiplier = 400/nb_stud_for_position[nb_stud_for_position.length-1];

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