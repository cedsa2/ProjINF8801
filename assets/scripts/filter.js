"use strict";

function loadModeFilterData(group) {
    var modeList = [{ value: 1, name: "Inscription" }, { value: 2, name: "Diploma" }];

    var parentDivs = group
        .selectAll("div")
        .data(modeList)
        .enter()
        .append("div")
        .classed("custom-control custom-radio", true)

    parentDivs.append("input")
        .attr("type", "radio")
        .property("checked", function (d, i) { return i == 0 ? true : false; })
        .classed("bar-filter custom-control-input", true)
        .attr("name", group.attr("id"))
        .attr("id", function (d, i) { return group.attr("id") + i })
        .attr("value", d => d.name);

    parentDivs.append("label")
        .text(d => d.name)
        .classed("custom-control-label", true)
        .attr("for", function (d, i) { return group.attr("id") + i })

}



function loadSplittingFilterData(group){
    var modeList = [{value: 0, name : "None"}, {value: 1, name : "Gender"}, {value: 2, name: "Cycle"},  {value: 3, name: "Legal status"},  {value: 3, name: "Fulltime / Part-time"}];
    
    var parentDivs = group
        .selectAll("div")
        .data(modeList)
        .enter()
        .append("div")
        .classed("custom-control custom-radio", true)

    parentDivs.append("input")
        .attr("type", "radio")
        .classed("bar-filter custom-control-input", true)
        .property("checked", function (d, i) { return i == 0 ? true : false; })
        .attr("name", group.attr("id"))
        .attr("id",function (d, i) { return "splitting" + i; })
        .attr("value", d=> d.name);

    parentDivs.append("label")
    .classed("custom-control-label", true)
    .attr("for", function (d, i) { return "splitting" + i })
        .text(d=> d.name);
            
}

function loadDegreeFilterData(group, diploma){
    group.classed("bar-filter", true);
    var degreeList = d3.map(diploma, function(d){return d.Grade;}).keys();
    degreeList.push("All")
    degreeList.sort()
    loadFilterData(group, degreeList)
}

function loadProgramFilterData(group, diploma, inscription, mode){
    group.classed("bar-filter", true);
    var programList = [];
    if(mode == "Inscription"){
        programList = d3.map(inscription, function(d){return d.Programme;}).keys();
    }else{
        programList = d3.map(diploma, function(d){return d.Programme;}).keys();
    }


    programList.push("All")
    programList.sort()
    loadFilterData(group, programList)
}

function loadFilterData(group, data){
    group
        .selectAll("option")
        .data(data)
        .enter()
        .append("option")
        .attr("value", function (d) {
            return d;
        })
        .text(function (d) {
            return d;
        })
}





function loadYearFilterData(group, diploma){
    group.classed("bubble-filter", true)
    var year = d3.map(diploma, function(d){return d.ANNEE;}).keys();
    year.sort()
    loadFilterData(group, year)
}

function loadBubbleModeFilterData(group){
    var modeList = [{value: 1, name : "Inscription"}, {value: 2, name: "Diploma"}];
    
    var parentDivs = group
        .selectAll("div")
        .data(modeList)
        .enter()
        .append("div")
        .classed("custom-control custom-radio", true)

    parentDivs.append("input")
        .attr("type", "radio")
        .property("checked", function (d, i) { return i == 0 ? true : false; })
        .classed("bubble-filter custom-control-input", true)
        .attr("id", function (d, i) { return group.attr("id") + i })
        .attr("name", group.attr("id"))
        .attr("value", d=> d.name);

    parentDivs.append("label")
    .classed("custom-control-label", true)
    .attr("for", function (d, i) { return group.attr("id") + i })
        .text(d=> d.name);
            
}

function loadGroupFilterData(group, diploma, inscription){
    var modeList = [{value: 1, name : "Grade"}, {value: 2, name: "Program"}];
    
    var parentDivs = group
        .selectAll("div")
        .data(modeList)
        .enter()
        .append("div")
        .classed("custom-control custom-radio", true)
        

    parentDivs.append("input")
        .attr("type", "radio")
        .property("checked", function (d, i) { return i == 0 ? true : false; })
        .classed("bubble-filter custom-control-input", true)
        .attr("name", group.attr("id"))
        .attr("id", function (d, i) { return group.attr("id") + i })
        .attr("value", d=> d.name);

    parentDivs.append("label")
    .classed("custom-control-label", true)
    .attr("for", function (d, i) { return group.attr("id") + i })
        .text(d=> d.name);
            
}



function loadBubbleSemesterFilterData(group){
    var modeList = [{value: 1, name : "Fall"}, {value: 2, name: "Summer"}, {value: 3, name: "Winter"}];
    
    var parentDivs = group
        .selectAll("div")
        .data(modeList)
        .enter()
        .append("div")
        .classed("custom-control custom-radio", true)

    parentDivs.append("input")
        .attr("type", "radio")
        .property("checked", function (d, i) { return i == 0 ? true : false; })
        .classed("bubble-filter custom-control-input " + group.attr("id"), true)
        .attr("name", group.attr("id"))
        .attr("id", function (d, i) { return group.attr("id") + i })
        .attr("value", d=> d.name);

    parentDivs.append("label")
    .classed("custom-control-label", true)
    .attr("for", function (d, i) { return group.attr("id") + i })
        .text(d=> d.name);
}
