"use strict";

function parseDiploma(data) {

    data.map(d => {
        d.Cycle = parseInt(d.Cycle);
        d.Moyenne = parseFloat(d.Moyenne);
        d.Nb_trim_complete = parseInt(d.Nb_trim_complete);
        d.Trim = parseInt(d.Dernier_Trim.slice(4));
    });
}

function parseInscription(data) {
    data.map(d => {
        d.Cycle = parseInt(d.Cycle);
        d.Trim = parseInt(d.Trimestre.slice(4));
    });

}

function getBarSelectedFilterData() {
    var semesters = [];
    if (d3.select("#semester-zone0").property("checked"))
        semesters.push("Fall");

    if (d3.select("#semester-zone1").property("checked"))
        semesters.push("Summer");

    if (d3.select("#semester-zone2").property("checked"))
        semesters.push("Winter");

    var data = {
        mode : d3.select('input[name="mode-zone"]:checked').node().value,
        semester : semesters,
        splitting: d3.select('input[name="splitting-zone"]:checked').node().value,
        degree: d3.select("#degree-select").property("value"),
        program: d3.select("#program-select").property("value")
    }
    return data;
}

function getBubbleSelectedFilterData() {
    var data = {
        mode : d3.select('input[name="mode-bubble-zone"]:checked').node().value,
        semester : d3.select('input[name="semester-buuble-zone"]:checked').node().value,
        year: d3.select("#year-select").property("value")
    }
    return data;
}