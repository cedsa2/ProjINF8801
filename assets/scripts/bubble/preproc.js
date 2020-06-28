"use strict";

function createBubbleSources(diploma, inscription, bubbleSelectedFilter){
    var chosen_year = bubbleSelectedFilter.year;
    var chosen_semester = bubbleSelectedFilter.semester;
    var chosen_mode = bubbleSelectedFilter.mode;

    var year = chosen_year.split("/")[0]
    var year = parseInt(year)
    if (chosen_semester == "Winter") {var selected_semester = year*10+3}
    if (chosen_semester == "Fall") {var selected_semester = (year+1)*10+1}
    if (chosen_semester == "Summer") {var selected_semester = (year+1)*10+2}
    var selected_semester = selected_semester.toString()

    if (chosen_mode == "Inscription") {
        var result_filter = inscription.filter(d => { return d.Trimestre == selected_semester; })
    }
    if (chosen_mode == "Diploma") {
        var result_filter = diploma.filter(d => { return d.Dernier_Trim == selected_semester; })
    } 
    result_filter.forEach(d => (d.Grade == 'Maitrise professionn') ? d.Grade = 'Maitrise professionnelle': false)

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    var grouped = groupBy(result_filter, "Grade")
    var result = grouped;

    for (var d in grouped) { 
        var repartition = groupBy(grouped[d], "Programme");
        result[d] = repartition
    }

    for (var d in result) { 
        var nombre_etus = 0
        for (var dd in result[d]) {
            var nb = result[d][dd].length;
            nombre_etus = nombre_etus+nb;
            result[d][dd].number_of_students = nb;
        }
        result[d].number_of_students = nombre_etus;
        result[d].Programm = d;

    }

    var result2 = []

    for (var d in result) { 
        result2.push(result[d])
    }
    result2.sort((a,b) =>  b.number_of_students-a.number_of_students )
    return result2
}


function bubbleDomainX(xBubble, bubbleSources, diploma, inscription){

}

function bubbleDomainY(yBubble, bubbleSources, diploma, inscription){

}

function bubblechartTip(d, Grade) {
    console.log(d)
    var total = 0
    Grade.forEach(element => {
        total += element.number_of_students
    });
    var res = "<span>Degree: <strong>" + d.Programm + "</strong></span>" + "<br>"
    for (var key in d) {
        if (key == "Programm") {
            continue;
        } else {
            if (key == "number_of_students") {
                res += "<span>" + "Total" + ": <strong>" + d.number_of_students + "("+ parseFloat(d.number_of_students / total * 100).toFixed(2)+"%" + " students of this semester)" + "</strong></span>" + "<br>"
            }
        }
    }

    return res;
}
