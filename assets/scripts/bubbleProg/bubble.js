"use strict";

function createBubbleAxesProg(bubbleChartSvg, xBubble, yBubble, bubbleChartwidth, bubbleChartheight){
}

function createBubbleChartProg(bubbleChartSvg, bubbleSources, bubblePro_tip, fontScale){

 
    var color = d3.scaleOrdinal(d3.schemeCategory10)
    color.domain(bubbleSources.map(d => d.Programme));

    var pack = data => d3.pack()
                            .size([500 - 2, 400 - 2])
                            .padding(3)
                            (d3.hierarchy({children: data})
                            .sum(d => d.total))
  
  
    const root = pack(bubbleSources);

    bubbleChartSvg
      .attr("viewBox", [0, 0, 500, 400])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

    const leaf = bubbleChartSvg.selectAll("g")
                              .data(root.leaves())
                              .enter()
                              .append("g")
                              .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);


    leaf.append("circle")
        .attr("r", d => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(d.data.Programme))
        .on("mouseover",bubblePro_tip.show)
        .on("mouseout", bubblePro_tip.hide);

    leaf.append("defs")
        .append("clipPath")
        .attr("id", (d, i) => "clippro" + i)
        .append("circle")
        .attr("r", d => d.r);

    leaf.append("text")
        .attr("clip-path", (d, i) => "url(#clippro" + i + ")")
        .attr("font-size", d => fontScale(d.r))
        .selectAll("tspan")
        .data(d => d.data.Programme.split(" "))
        .enter()
        .append("tspan") 
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(d => d)
}


function updateBubbleChartProg(diploma, inscription, bubbleSelectedFilter, bubbleChartSvg, bubblePro_tip, fontScale){
  var update_bubbleSource = createBubbleSourcesProg(diploma, inscription, bubbleSelectedFilter);

  var color = d3.scaleOrdinal(d3.schemeCategory10)
  color.domain(update_bubbleSource.map(d => d.Programme));

  

  var pack = data => d3.pack()
                        .size([500 - 2, 400 - 2])
                        .padding(3)
                        (d3.hierarchy({children: data})
                        .sum(d => d.total))
  
  
  var root = pack(update_bubbleSource);


  bubbleChartSvg.selectAll("g").remove();



  const leaf = bubbleChartSvg.selectAll("g")
                              .data(root.leaves())
                              .enter()
                              .append("g")
                              .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);


  leaf.append("circle")
      .attr("r", d => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.data.Programme))
      .on("mouseover",bubblePro_tip.show)
      .on("mouseout", bubblePro_tip.hide);
    


  leaf.append("defs")
      .append("clipPath")
      .attr("id", (d, i) => "clippro" + i)
      .append("circle")
      .attr("r", d => d.r);


  leaf.append("text")
      .attr("clip-path", (d, i) => "url(#clippro" + i + ")")
      .attr("font-size", d => fontScale(d.r))
      .selectAll("tspan")
      .data(d => d.data.Programme.split(" "))
      .enter()
      .append("tspan") 
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d)

}