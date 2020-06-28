"use strict";



function createBubbleChartProg(bubbleChartSvg, bubblePro_tip, fontScale, color, width, height, root){


    bubbleChartSvg
      .attr("viewBox", [0, 0, width, height])
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


function updateBubbleChartProg(bubbleChartSvg, bubblePro_tip, fontScale, color, root){



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