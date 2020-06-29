"use strict";

function createBarAxes(barChartSvg, xAxis, yAxis, barChartwidth, barChartheight, filter, num, yBar){
    // to avoid over-writing
    barChartSvg.selectAll("text#legend").remove()
    barChartSvg.selectAll("#xlegends").remove()
    
    // X axis
    barChartSvg.append("g")
    .classed("x-axis", true)
    .attr("transform", "translate(0," + barChartheight + ")")
    .attr("id", "xlegends")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "start") 
    .attr("transform", "translate(5,0) rotate(45)")

    
    barChartSvg.append("text") //label
    .attr("x", (d)=> {

        if(filter.splitting == "Gender"){
            if(num == 1){return 46 }
            if(num == 2){return 53 }
        }
        else if(filter.splitting == "Fulltime / Part-time"){
            if(num == 1){return 60}
            if(num == 2){return 60}
        }
        else if(filter.splitting == "Legal status"){
            if(num == 1){return 60}
            if(num == 2){return 60}
            if(num == 3){return 70}
        }
        else if(filter.splitting == "Cycle"){
            if(num == 1){return 55}
            if(num == 2){return 55}
            if(num == 3){return 55}
        }
        else {return 60}

    } )  //the position of label
    .attr("y", 10)
    .attr("id", "legend")
    .attr("transform", "translate(0, -" + 10 + ")")
    .attr("text-anchor","middle")
    .text(function(d){  //labels of Y axis according to the chosen filter

        if(filter.splitting == "Gender"){
            if(num == 1){return "#Male students "}
            if(num == 2){return "#Female students "}
        }
        else if(filter.splitting == "Fulltime / Part-time"){
            if(num == 1){return "#Full-time students"}
            if(num == 2){return "#Part-time students"}
        }
        else if(filter.splitting == "Legal status"){
            if(num == 1){return "#Canadian students"}
            if(num == 2){return "#Resident students"}
            if(num == 3){return "#International students"}
        }
        else if(filter.splitting == "Cycle"){
            if(num == 1){return "#Cycle-1 students"}
            if(num == 2){return "#Cycle-2 students"}
            if(num == 3){return "#Cycle-3 students"}
        }
        else {return "Number of students"}
    })
    .style("font-size","12px")
    .style("font-weight" ,"bold")


  
    // Y axis

    yAxis = d3.axisLeft(yBar);
    if (barChartSvg.select(".y-axis").empty()){
        barChartSvg.append("g")
        .attr("class", "y-axis")
        .call(yAxis, yBar)
        .selectAll("text")
        .style("text-anchor", "end")
    } else{
        barChartSvg.select(".y-axis").call(yAxis, yBar);
    }

    barChartSvg.append("text")//label
    .attr("x", barChartwidth + 40)  //the position of label
    .attr("y", barChartheight + 20)
    .attr("text-anchor","middle")
    .text("Semesters")
    .style("font-size","12px");

}

// function for creating the barcharts
function createBarChart(barChartSvg, barSources, xBar, yBar, colors, tip, barChartHeight){
    barChartSvg.selectAll('rect')
    .data(barSources)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", function(d){  //color of each bar depends on what semester it represents
        if(d.semester.endsWith("1")){return colors[0]}
        if(d.semester.endsWith("2")){return colors[1]}
        if(d.semester.endsWith("3")){return colors[2]}
    })
    .style("opacity", 1)
    .attr("x", function(d){return xBar(d.semester)})
    .attr("y", d => yBar(d.number_of_students))
    .attr("width", xBar.bandwidth())
    .attr("height",  function(d){return barChartHeight - yBar(d.number_of_students)})
    .on('mouseover', function(d){
        d3.select(this).style("opacity", 0.7)
        .style("stroke", function(e){
            if(e.semester.endsWith("1")){return "orange"}
            if(e.semester.endsWith("2")){return "red"}
            if(e.semester.endsWith("3")){return "blue"}
        })
        .style("stroke-width", "3px")
        tip.show(d)
    })
    .on('mouseout', function(d){
        d3.select(this).style("opacity", 1)
        .style("stroke", "none")
       tip.hide(d)
    })
}


function updateBarChart(barChartSvg, barSources, xBar, yBar, colors, tip, barChartHeight){

    barChartSvg.selectAll("rect").remove()
    var rects = barChartSvg
        .selectAll("rect")
        .data(barSources)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){return xBar(d.semester)})
        .attr("y", barChartHeight)
        .attr("fill", function(d){
            if(d.semester.endsWith("1")){return colors[0]}
            if(d.semester.endsWith("2")){return colors[1]}
            if(d.semester.endsWith("3")){return colors[2]}
        })
        
    rects.transition().duration(500)
    .attr("y", d =>  yBar(d.number_of_students)) 
    .attr("height",  function(d){return barChartHeight - yBar(d.number_of_students)})
    .attr("width", xBar.bandwidth())

    rects.on('mouseover', function(d){
        d3.select(this).style("opacity", 0.7)
        .style("stroke", function(e){
            if(e.semester.endsWith("1")){return "orange"}
            if(e.semester.endsWith("2")){return "red"}
            if(e.semester.endsWith("3")){return "blue"}
        })
        .style("stroke-width", "3px")
        tip.show(d)
    })
    .on('mouseout', function(d){
        d3.select(this).style("opacity", 1)
        .style("stroke", "none")
        tip.hide(d)
    });
    
}



function createSplit_1_BarChart(barChartSvg, barSources, splitFilter, xBar, yBar, colors, tip, barChartHeight){
    barChartSvg.selectAll('rect')
    .data(barSources)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", function(d){
        if(d.semester.endsWith("1")){return colors[0]}
        else if(d.semester.endsWith("2")){return colors[1]}
        else if(d.semester.endsWith("3")){return colors[2]}
    })
    .style("opacity", 1)
    .attr("x", function(d){return xBar(d.semester)})
    .attr("y", function(d){
        if(splitFilter.splitting == "Gender"){return yBar(d.male)}
        else if(splitFilter.splitting == "Fulltime / Part-time"){return yBar(d.full_time)}
        else if(splitFilter.splitting == "Cycle"){return yBar(d.cycle_1)}
        else if(splitFilter.splitting == "Legal status"){return yBar(d.canadien)}
      
    })
    .attr("width", xBar.bandwidth())
    .attr("height",  function(d){
        if(splitFilter.splitting == "Gender"){return (barChartHeight - yBar(d.male))}
        else if(splitFilter.splitting == "Fulltime / Part-time"){return (barChartHeight - yBar(d.full_time))}
        else if(splitFilter.splitting == "Cycle"){return (barChartHeight -  yBar(d.cycle_1))}
        else if(splitFilter.splitting == "Legal status"){return (barChartHeight -  yBar(d.canadien))}
      
    })
    .on('mouseover', function(d){
        d3.select(this).style("opacity", 0.7)
        .style("stroke", function(e){
            if(e.semester.endsWith("1")){return "orange"}
            if(e.semester.endsWith("2")){return "red"}
            if(e.semester.endsWith("3")){return "blue"}
        })
        .style("stroke-width", "3px")
        tip.show(d)
    })
    .on('mouseout', function(d){
        d3.select(this).style("opacity", 1)
        .style("stroke", "none")
        tip.hide(d)
    })
}


function createSplit_2_BarChart(barChartSvg, barSources, splitFilter, xBar, yBar, colors, tip, barChartHeight){
    barChartSvg.selectAll('rect')
    .data(barSources)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", function(d){
        if(d.semester.endsWith("1")){return colors[0]}
        if(d.semester.endsWith("2")){return colors[1]}
        if(d.semester.endsWith("3")){return colors[2]}
    })
    .style("opacity", 1)
    .attr("x", function(d){return xBar(d.semester)})
    .attr("y", function(d){
        if(splitFilter.splitting == "Gender"){return yBar(d.female)}
        if(splitFilter.splitting == "Fulltime / Part-time"){return yBar(d.part_time)}
        if(splitFilter.splitting == "Cycle"){return yBar(d.cycle_2)}
        if(splitFilter.splitting == "Legal status"){return yBar(d.resident)}   
    })
    .attr("width", xBar.bandwidth())
    .attr("height",  function(d){
        if(splitFilter.splitting == "Gender"){return (barChartHeight - yBar(d.female))}
        if(splitFilter.splitting == "Fulltime / Part-time"){return (barChartHeight - yBar(d.part_time))}
        if(splitFilter.splitting == "Cycle"){return (barChartHeight - yBar(d.cycle_2))}
        if(splitFilter.splitting == "Legal status"){return (barChartHeight - yBar(d.resident))}
    })
    .on('mouseover', function(d){
        d3.select(this).style("opacity", 0.7)
        .style("stroke", function(e){
            if(e.semester.endsWith("1")){return "orange"}
            if(e.semester.endsWith("2")){return "red"}
            if(e.semester.endsWith("3")){return "blue"}
        })
        .style("stroke-width", "3px")
        tip.show(d)
    })
    .on('mouseout', function(d){
        d3.select(this).style("opacity", 1)
        .style("stroke", "none")
        tip.hide(d)
    })
}


function createSplit_3_BarChart(barChartSvg, barSources, splitFilter, xBar, yBar, colors, tip, barChartHeight){
    barChartSvg.selectAll('rect')
    .data(barSources)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", function(d){
        if(d.semester.endsWith("1")){return colors[0]}
        if(d.semester.endsWith("2")){return colors[1]}
        if(d.semester.endsWith("3")){return colors[2]}
    })
    .style("opacity", 1)
    .attr("x", function(d){return xBar(d.semester)})
    .attr("y", function(d){
        if(splitFilter.splitting == "Cycle"){return yBar(d.cycle_3)}
        if(splitFilter.splitting == "Legal status"){return yBar(d.international)}   
    })
    .attr("width", xBar.bandwidth())
    .attr("height",  function(d){
        if(splitFilter.splitting == "Cycle"){return barChartHeight - yBar(d.cycle_3)}
        if(splitFilter.splitting == "Legal status"){return barChartHeight - yBar(d.international)}
    })
    .on('mouseover', function(d){
        d3.select(this).style("opacity", 0.7)
        .style("stroke", function(e){
            if(e.semester.endsWith("1")){return "orange"}
            if(e.semester.endsWith("2")){return "red"}
            if(e.semester.endsWith("3")){return "blue"}
        })
        .style("stroke-width", "3px")
        tip.show(d)
    })
    .on('mouseout', function(d){
        d3.select(this).style("opacity", 1)
        .style("stroke", "none")
        tip.hide(d)
    })
}

// bar chart's tooltip text
function barchartTip(d){
    var tipText = d.number_of_students
    return tipText
}

// when choosing a filter, the data presents in tooltips is different depending on the chosen filter
function barchartSplit_1_Tip(d, filter){
    var tipText = ""
    if(filter.splitting == "Gender"){
        if(filter.mode == "Inscription"){
            tipText = "<span>Men: <strong>" + d.male + " ( " + parseFloat(d.male / (d.male+d.female) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Cycle 1: <strong>" + d.male_cycle1 + "</strong></span>" + "<br>" +
            "<span>Cycle 2: <strong>" + d.male_cycle2 + "</strong></span>" + "<br>" +
            "<span>Cycle 3: <strong>" + d.male_cycle3 + "</strong></span>" + "<br>" +
            "<span>Canadian: <strong>" + d.male_canadian + "</strong></span>" + "<br>" +
            "<span>Resident: <strong>" + d.male_resident + "</strong></span>" + "<br>" +
            "<span>International: <strong>" + d.male_inter + "</strong></span>" + "<br>" +
            "<span>Full-time: <strong>" + d.male_full + "</strong></span>" + "<br>" +
            "<span>Part-time: <strong>" + d.male_part + "</strong></span>" + "<br>" 
        }
        else if(filter.mode == "Diploma"){
            tipText = "<span>Men: <strong>" + d.male + " ( " + parseFloat(d.male / (d.male+d.female) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Cycle 1: <strong>" + d.male_cycle1 + "</strong></span>" + "<br>" +
            "<span>Cycle 2: <strong>" + d.male_cycle2 + "</strong></span>" + "<br>" +
            "<span>Cycle 3: <strong>" + d.male_cycle3 + "</strong></span>" + "<br>" 
        }
    }
    if(filter.splitting == "Fulltime / Part-time" && filter.mode == "Inscription"){
        tipText = "<span>Full-time: <strong>" + d.full_time + " ( " + parseFloat(d.full_time / (d.full_time+d.part_time) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
        "<span>Men: <strong>" + d.male_full + "</strong></span>" + "<br>" +
        "<span>Women: <strong>" + d.female_full + "</strong></span>" + "<br>" +
        "<span>Cycle 1: <strong>" + d.cycle1_full + "</strong></span>" + "<br>" +
        "<span>Cycle 2: <strong>" + d.cycle2_full + "</strong></span>" + "<br>" +
        "<span>Cycle 3: <strong>" + d.cycle3_full + "</strong></span>" + "<br>" +
        "<span>Canadian: <strong>" + d.can_full + "</strong></span>" + "<br>" +
        "<span>Resident: <strong>" + d.resident_full + "</strong></span>" + "<br>" +
        "<span>International: <strong>" + d.inter_full + "</strong></span>" + "<br>" 
         
    }
    if(filter.splitting == "Legal status" && filter.mode == "Inscription"){
        tipText = "<span>Canadian: <strong>" + d.canadien + " ( " + parseFloat(d.canadien / (d.canadien+d.resident+d.international) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
        "<span>Men: <strong>" + d.male_canadian + "</strong></span>" + "<br>" +
        "<span>Women: <strong>" + d.female_canadian + "</strong></span>" + "<br>" +
        "<span>Cycle 1: <strong>" + d.cycle1_canadian + "</strong></span>" + "<br>" +
        "<span>Cycle 2: <strong>" + d.cycle2_canadian + "</strong></span>" + "<br>" +
        "<span>Cycle 3: <strong>" + d.cycle3_canadian + "</strong></span>" + "<br>" +
        "<span>Full-time: <strong>" + d.can_full + "</strong></span>" + "<br>" +
        "<span>Part-time: <strong>" + d.resident_full + "</strong></span>" + "<br>" 
    }
    if(filter.splitting == "Cycle"){
        if(filter.mode == "Inscription"){
            tipText = "<span>Cycle-1: <strong>" + d.cycle_1 + " ( " + parseFloat(d.cycle_1 / (d.cycle_1+d.cycle_2+d.cycle_3) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Men: <strong>" + d.male_cycle1 + "</strong></span>" + "<br>" +
            "<span>Women: <strong>" + d.female_cycle1 + "</strong></span>" + "<br>" +
            "<span>Canadian: <strong>" + d.cycle1_canadian + "</strong></span>" + "<br>" +
            "<span>Resident: <strong>" + d.cycle1_resident + "</strong></span>" + "<br>" +
            "<span>International: <strong>" + d.cycle1_inter + "</strong></span>" + "<br>" +
            "<span>Full-time: <strong>" + d.cycle1_full + "</strong></span>" + "<br>" +
            "<span>Part-time: <strong>" + d.cycle1_part + "</strong></span>" + "<br>" 
        }
        else if(filter.mode == "Diploma"){
            tipText = "<span>Cycle-1: <strong>" + d.cycle_1 + " ( " + parseFloat(d.cycle_1 / (d.cycle_1+d.cycle_2+d.cycle_3) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Men: <strong>" + d.male_cycle1 + "</strong></span>" + "<br>" +
            "<span>Women: <strong>" + d.female_cycle1 + "</strong></span>" + "<br>"
        }
    }
    
    return tipText
}

function barchartSplit_2_Tip(d, filter){
    var tipText =""
    if(filter.splitting == "Gender"){
        if(filter.mode == "Inscription"){
            tipText = "<span>Women: <strong>" + d.female + " ( " + parseFloat(d.female / (d.male+d.female) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Cycle 1: <strong>" + d.female_cycle1 + "</strong></span>" + "<br>" +
            "<span>Cycle 2: <strong>" + d.female_cycle2 + "</strong></span>" + "<br>" +
            "<span>Cycle 3: <strong>" + d.female_cycle3 + "</strong></span>" + "<br>" +
            "<span>Canadian: <strong>" + d.female_canadian + "</strong></span>" + "<br>" +
            "<span>Resident: <strong>" + d.female_resident + "</strong></span>" + "<br>" +
            "<span>International: <strong>" + d.female_inter + "</strong></span>" + "<br>" +
            "<span>Full-time: <strong>" + d.female_full + "</strong></span>" + "<br>" +
            "<span>Part-time: <strong>" + d.female_part + "</strong></span>" + "<br>" 
        } else if(filter.mode == "Diploma"){
            tipText = "<span>Women: <strong>" + d.female + " ( " + parseFloat(d.female / (d.male+d.female) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Cycle 1: <strong>" + d.female_cycle1 + "</strong></span>" + "<br>" +
            "<span>Cycle 2: <strong>" + d.female_cycle2 + "</strong></span>" + "<br>" +
            "<span>Cycle 3: <strong>" + d.female_cycle3 + "</strong></span>" + "<br>" 
        }
        
    }
    if(filter.splitting == "Fulltime / Part-time" && filter.mode == "Inscription"){
        tipText = "<span>Part-time: <strong>" + d.part_time + " ( " + parseFloat(d.part_time / (d.part_time+d.full_time) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
        "<span>Men: <strong>" + d.male_part + "</strong></span>" + "<br>" +
        "<span>Women: <strong>" + d.female_part + "</strong></span>" + "<br>" +
        "<span>Cycle 1: <strong>" + d.cycle1_part + "</strong></span>" + "<br>" +
        "<span>Cycle 2: <strong>" + d.cycle2_part + "</strong></span>" + "<br>" +
        "<span>Cycle 3: <strong>" + d.cycle3_part + "</strong></span>" + "<br>" +
        "<span>Canadian: <strong>" + d.can_part + "</strong></span>" + "<br>" +
        "<span>Resident: <strong>" + d.resident_part + "</strong></span>" + "<br>" +
        "<span>International: <strong>" + d.inter_part + "</strong></span>" + "<br>"  
    }
    if(filter.splitting == "Legal status" && filter.mode == "Inscription"){
        tipText = "<span>Resident: <strong>" + d.resident + " ( " + parseFloat(d.resident / (d.canadien+d.resident+d.international) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
        "<span>Men: <strong>" + d.male_resident + "</strong></span>" + "<br>" +
        "<span>Women: <strong>" + d.female_resident + "</strong></span>" + "<br>" +
        "<span>Cycle 1: <strong>" + d.cycle1_resident + "</strong></span>" + "<br>" +
        "<span>Cycle 2: <strong>" + d.cycle2_resident + "</strong></span>" + "<br>" +
        "<span>Cycle 3: <strong>" + d.cycle3_resident + "</strong></span>" + "<br>" +
        "<span>Full-time: <strong>" + d.resident_full + "</strong></span>" + "<br>" +
        "<span>Part-time: <strong>" + d.resident_part + "</strong></span>" + "<br>" 
    }
    if(filter.splitting == "Cycle"){
        if(filter.mode == "Inscription"){
            tipText = "<span>Cycle-2: <strong>" + d.cycle_2 + " ( " + parseFloat(d.cycle_2 / (d.cycle_1+d.cycle_2+d.cycle_3) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Men: <strong>" + d.male_cycle2 + "</strong></span>" + "<br>" +
            "<span>Women: <strong>" + d.female_cycle2 + "</strong></span>" + "<br>" +
            "<span>Canadian: <strong>" + d.cycle2_canadian + "</strong></span>" + "<br>" +
            "<span>Resident: <strong>" + d.cycle2_resident + "</strong></span>" + "<br>" +
            "<span>International: <strong>" + d.cycle2_inter + "</strong></span>" + "<br>" +
            "<span>Full-time: <strong>" + d.cycle2_full + "</strong></span>" + "<br>" +
            "<span>Part-time: <strong>" + d.cycle2_part + "</strong></span>" + "<br>"
        }
        else if(filter.mode == "Diploma"){
            tipText = "<span>Cycle-2: <strong>" + d.cycle_2 + " ( " + parseFloat(d.cycle_2 / (d.cycle_1+d.cycle_2+d.cycle_3) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Men: <strong>" + d.male_cycle2 + "</strong></span>" + "<br>" +
            "<span>Women: <strong>" + d.female_cycle2 + "</strong></span>" + "<br>"
        }
    }
    
    return tipText
}

function barchartSplit_3_Tip(d,filter){
    var tipText =""
    if(filter.splitting == "Legal status" && filter.mode == "Inscription"){
        tipText = "<span>International: <strong>" + d.international + " ( " + parseFloat(d.international / (d.canadien+d.resident+d.international) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
        "<span>Men: <strong>" + d.male_inter + "</strong></span>" + "<br>" +
        "<span>Women: <strong>" + d.female_inter + "</strong></span>" + "<br>" +
        "<span>Cycle 1: <strong>" + d.cycle1_inter + "</strong></span>" + "<br>" +
        "<span>Cycle 2: <strong>" + d.cycle2_inter + "</strong></span>" + "<br>" +
        "<span>Cycle 3: <strong>" + d.cycle3_inter + "</strong></span>" + "<br>" +
        "<span>Full-time: <strong>" + d.inter_full + "</strong></span>" + "<br>" +
        "<span>Part-time: <strong>" + d.inter_part + "</strong></span>" + "<br>" 
    }
    if(filter.splitting == "Cycle"){
        if(filter.mode == "Inscription"){
            tipText = "<span>Cycle-3: <strong>" + d.cycle_3 + " ( " + parseFloat(d.cycle_3 / (d.cycle_1+d.cycle_2+d.cycle_3) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Men: <strong>" + d.male_cycle3 + "</strong></span>" + "<br>" +
            "<span>Women: <strong>" + d.female_cycle3 + "</strong></span>" + "<br>" +
            "<span>Canadian: <strong>" + d.cycle3_canadian + "</strong></span>" + "<br>" +
            "<span>Resident: <strong>" + d.cycle3_resident + "</strong></span>" + "<br>" +
            "<span>International: <strong>" + d.cycle3_inter + "</strong></span>" + "<br>" +
            "<span>Full-time: <strong>" + d.cycle3_full + "</strong></span>" + "<br>" +
            "<span>Part-time: <strong>" + d.cycle3_part + "</strong></span>" + "<br>"
        }
        else if(filter.mode == "Diploma"){
            tipText = "<span>Cycle-3: <strong>" + d.cycle_3 + " ( " + parseFloat(d.cycle_3 / (d.cycle_1+d.cycle_2+d.cycle_3) * 100).toFixed(2) + "% of students )" + "</strong></span>" + "<br>" +
            "<span>Men: <strong>" + d.male_cycle3 + "</strong></span>" + "<br>" +
            "<span>Women: <strong>" + d.female_cycle3 + "</strong></span>" + "<br>" 
        }
    }
    
    return tipText
}


// removing the splitted bar charts when no split filters selected
function clearSplitBarChart(barSVG){
    barSVG.selectAll("rect").remove();
    barSVG.selectAll(".x-axis").remove();
    barSVG.selectAll(".y-axis").remove();
}
