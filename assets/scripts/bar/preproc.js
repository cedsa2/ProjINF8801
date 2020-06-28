"use strict";

function createBarSources(diploma, inscription, barSelectedFilter){

    var chosen_degree = barSelectedFilter.degree;
    var chosen_program = barSelectedFilter.program;
    var chosen_mode = barSelectedFilter.mode;

    //Semester needs to be modified
    var chosen_semester = barSelectedFilter.semester;
    var chosen_splitting = barSelectedFilter.splitting;
    var chosen_stacking = barSelectedFilter.stacking;

    if (chosen_degree == "All") {
        if (chosen_mode == "Inscription") {
            var result_filter = inscription;
        }
        if (chosen_mode == "Diploma") {
            var result_filter = diploma;
        } 
    }
    else {
        if (chosen_mode == "Inscription") {
            var result_filter = inscription.filter(d => { return d.Grade == chosen_degree; })
        }
        if (chosen_mode == "Diploma") {
            var result_filter = diploma.filter(d => { return d.Grade == chosen_degree; })
        } 
    }

    if (chosen_program != "All") {
        var result_filtered = result_filter.filter(d => { return d.Programme == chosen_program; })
    }
    else {var result_filtered = result_filter}

    //fixing a mistake in the dataset 
    result_filter.forEach(d => (d.Grade == 'Maitrise professionn') ? d.Grade = 'Maitrise professionnelle': false)
    //At this point, we have data for the selected degree and programm

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };


    if (chosen_mode == "Inscription") {
        var grouped = groupBy(result_filtered, "Trimestre")
    }
    if (chosen_mode == "Diploma") {
        var grouped = groupBy(result_filtered, "Dernier_Trim")
    } 
    
    var result = grouped;
    var arr = []


    if(chosen_mode == "Inscription"){
        for (var i in result){
            var students_per_semester = result[i].length;
            result[i].number_of_students = students_per_semester;
            result[i].semester = i;
            var male = 0,
                female = 0,
                cycle_1 = 0, 
                cycle_2 = 0, 
                cycle_3 = 0, 
                St_Can = 0, 
                St_Re = 0, 
                St_Et = 0,
                PT = 0,
                FT = 0;
            
            for(var j in result[i]) { 
                var sex = result[i][j].Sexe;
                var cycle = result[i][j].Cycle;
                var Status = result[i][j].Statut_legal;
                var study_type = result[i][j].Regime_Etude;  
                switch(sex){
                    case "M":
                        male++;
                        break;
                    case "F":
                        female++;
                        break;      
                }
                switch(cycle){
                    case 1:
                        cycle_1++;
                        break;
                    case 2:
                        cycle_2++;
                        break;
                    case 3:
                        cycle_3++;
                        break;            
                }
                switch(Status){
                    case "Canadien":
                        St_Can++;
                        break;
                    case "Resident":
                        St_Re++;
                        break;
                    case "Etranger":
                        St_Et++;
                        break;            
                }
                switch(study_type){
                    case "PA":
                        PT++;
                        break;
                    case "PL":
                        FT++;
                        break;      
                }

            }
            result[i].male = male;
            result[i].female = female;
            result[i].cycle_1 = cycle_1;
            result[i].cycle_2 = cycle_2;
            result[i].cycle_3 = cycle_3;
            result[i].canadien = St_Can;
            result[i].resident = St_Re;
            result[i].international = St_Et;
            result[i].part_time = PT;
            result[i].full_time = FT;
        }

        for(i in result){
                var gender = groupBy(result[i], "Sexe")

                var x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                //gender - cycle
                for(j in gender){
                    var temp = groupBy(gender[j],"Cycle")
                    if(j == "M"){
                        if(temp["1"]){x = temp["1"].length;}
                        if(temp["2"]){y = temp["2"].length;}
                        if(temp["3"]){z = temp["3"].length;}
                    }
                    else{
                        if(temp["1"]){a = temp["1"].length;}
                        if(temp["2"]){b = temp["2"].length;}
                        if(temp["3"]){c = temp["3"].length;}
                    }  
                }
                result[i].male_cycle1 = x;
                result[i].male_cycle2 = y;
                result[i].male_cycle3 = z;
                result[i].female_cycle1 = a;
                result[i].female_cycle2 = b;
                result[i].female_cycle3 = c;

                //gender - full/part time
                x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                for(j in gender){
                    var temp = groupBy(gender[j],"Regime_Etude")
                    if(j == "M"){
                        if(temp["PL"]){x = temp["PL"].length;}
                        if(temp["PA"]){y = temp["PA"].length; } 
                    }
                    else{
                        if(temp["PL"]){a = temp["PL"].length;}
                        if(temp["PA"]){b = temp["PA"].length; } 
                    }  
                }
                result[i].male_full = x;
                result[i].male_part = y;
                result[i].female_full = a;
                result[i].female_part = b;
                
                //gender - legal status
                x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                for(j in gender){
                    var temp = groupBy(gender[j],"Statut_legal")
                    if(j == "M"){
                        if(temp["Canadien"]){x = temp["Canadien"].length;}
                        if(temp["Resident"]){y = temp["Resident"].length;}
                        if(temp["Etranger"]){z = temp["Etranger"].length;}
                    }
                    else{
                        if(temp["Canadien"]){a = temp["Canadien"].length;}
                        if(temp["Resident"]){b = temp["Resident"].length;}
                        if(temp["Etranger"]){c = temp["Etranger"].length;}
                    }  
                }
                result[i].male_canadian = x;
                result[i].male_resident = y;
                result[i].male_inter = z;
                result[i].female_canadian = a;
                result[i].female_resident = b;
                result[i].female_inter = c;


                var cycle = groupBy(result[i], "Cycle")
                x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                //cycle - legal status
                for(j in cycle){
                    var temp = groupBy(cycle[j],"Statut_legal")
                    if(j == 1){
                        if(temp["Canadien"]){x = temp["Canadien"].length;}
                        if(temp["Resident"]){y = temp["Resident"].length;}
                        if(temp["Etranger"]){z = temp["Etranger"].length;}
                    }
                    if(j == 2){
                        if(temp["Canadien"]){a = temp["Canadien"].length;}
                        if(temp["Resident"]){b = temp["Resident"].length;}
                        if(temp["Etranger"]){c = temp["Etranger"].length;}
                    }  
                    if(j == 3){
                        if(temp["Canadien"]){k = temp["Canadien"].length;}
                        if(temp["Resident"]){n = temp["Resident"].length;}
                        if(temp["Etranger"]){m = temp["Etranger"].length;}
                    }
                }
                result[i].cycle1_canadian = x;
                result[i].cycle1_resident = y;
                result[i].cycle1_inter = z;
                result[i].cycle2_canadian = a;
                result[i].cycle2_resident = b;
                result[i].cycle2_inter = c;
                result[i].cycle3_canadian = k;
                result[i].cycle3_resident = n;
                result[i].cycle3_inter = m;
                
                //cycle - regime etude
                x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                for(j in cycle){
                    var temp = groupBy(cycle[j],"Regime_Etude")
                    if(j == 1){
                        if(temp["PL"]){x = temp["PL"].length;}
                        if(temp["PA"]){y = temp["PA"].length; } 
                    }
                    if(j == 2){
                        if(temp["PL"]){a = temp["PL"].length;}
                        if(temp["PA"]){b = temp["PA"].length; } 
                    }  
                    if(j == 3){
                        if(temp["PL"]){k = temp["PL"].length;}
                        if(temp["PA"]){n = temp["PA"].length;} 
                    }
                }
                result[i].cycle1_full = x;
                result[i].cycle1_part = y;
                result[i].cycle2_full = a;
                result[i].cycle2_part = b;
                result[i].cycle3_full = k;
                result[i].cycle3_part = n;


                var regime_etude = groupBy(result[i], "Regime_Etude");
                x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                for(j in regime_etude){
                    var temp = groupBy(regime_etude[j],"Statut_legal")
                    if(j == "PL"){
                        if(temp["Canadien"]){x = temp["Canadien"].length;}
                        if(temp["Resident"]){y = temp["Resident"].length;}
                        if(temp["Etranger"]){z = temp["Etranger"].length;}
                    }
                    if(j == "PA"){
                        if(temp["Canadien"]){a = temp["Canadien"].length;}
                        if(temp["Resident"]){b = temp["Resident"].length;}
                        if(temp["Etranger"]){c = temp["Etranger"].length;}
                    }                     
                }
                result[i].can_full = x;
                result[i].resident_full = y;
                result[i].inter_full = z;
                result[i].can_part = a;
                result[i].resident_part = b;
                result[i].inter_part = c;

    }
    

    console.log(result)
        var result2 = []
        for (var i in result) { 
            result2.push(result[i])
        }
        return result2 
    }
     if(chosen_mode == "Diploma"){

        for (var i in result){
            var students_per_semester = result[i].length;
            result[i].number_of_students = students_per_semester;
            result[i].semester = i;
            var male = 0,
                female = 0,
                cycle_1 = 0, 
                cycle_2 = 0, 
                cycle_3 = 0; 
            
            for(var j in result[i]) { 
                var sex = result[i][j].Sexe;
                var cycle = result[i][j].Cycle;

                switch(sex){
                    case "M":
                        male++;
                        break;
                    case "F":
                        female++;
                        break;      
                }
                switch(cycle){
                    case 1:
                        cycle_1++;
                        break;
                    case 2:
                        cycle_2++;
                        break;
                    case 3:
                        cycle_3++;
                        break;            
                }
            }
            result[i].male = male;
            result[i].female = female;
            result[i].cycle_1 = cycle_1;
            result[i].cycle_2 = cycle_2;
            result[i].cycle_3 = cycle_3;

            for(i in result){
                var gender = groupBy(result[i], "Sexe")
    
                var x=0, y =0, z=0, a=0, b=0, c=0, k=0, n=0, m=0;
                for(j in gender){
                    var temp = groupBy(gender[j],"Cycle")
                    if(j == "M"){
                        if(temp["1"]){x = temp["1"].length;}
                        if(temp["2"]){y = temp["2"].length;}
                        if(temp["3"]){z = temp["3"].length;}
                        
                    }
                    else{
                        
                        if(temp["1"]){a = temp["1"].length;}
                        if(temp["2"]){
                            b = temp["2"].length;
                        }
                        if(temp["3"]){
                            c = temp["3"].length;
                        }
                    }  
                }
                result[i].male_cycle1 = x;
                result[i].male_cycle2 = y;
                result[i].male_cycle3 = z;
                result[i].female_cycle1 = a;
                result[i].female_cycle2 = b;
                result[i].female_cycle3 = c;
    
            }

     }
     var result2 = []
        for (var i in result) { 
            result2.push(result[i])
        }
        return result2 
    }
}

function updateSourceFromSemester(barSelectedFilter, selected_mode, chosen_semester){
    var tmp = []
    if (barSelectedFilter.mode == "Inscription"){   
        if (chosen_semester.includes('Fall')){
            selected_mode.forEach(d => (d[0].Trimestre[4]==1) ?  tmp.push(d) : true)
        }
        if (chosen_semester.includes('Summer')){
            selected_mode.forEach(d => (d[0].Trimestre[4]==2) ?  tmp.push(d) : true)
        }
        if (chosen_semester.includes('Winter')){
            selected_mode.forEach(d => (d[0].Trimestre[4]==3) ?  tmp.push(d) : true)
        }
    }
    
    if (barSelectedFilter.mode == "Diploma"){
        if (chosen_semester.includes('Fall')){
            selected_mode.forEach(d => (d[0].Dernier_Trim[4]==1) ?  tmp.push(d) : true)
        }
        if (chosen_semester.includes('Summer')){
            selected_mode.forEach(d => (d[0].Dernier_Trim[4]==2) ?  tmp.push(d) : true)
        }
        if (chosen_semester.includes('Winter')){
            selected_mode.forEach(d => (d[0].Dernier_Trim[4]==3) ?  tmp.push(d) : true)
        }
    }
    return tmp;
}

function barDomainX(xBar, barSources){
    xBar.domain(barSources.map(d => d.semester))
}

function barDomainY(yBar, barSources){
    var student_semester = barSources.map(d => d.number_of_students)
    var max = d3.max(student_semester)
    yBar.domain([0, max])
}
function barDomainY_Split1(yBar,filter, barSources){
    var student_semester = barSources.map(function(d){
        if(filter.splitting == "Gender"){return Math.max(d.male,d.female)}
        else if(filter.splitting == "Fulltime / Part-time"){return Math.max(d.full_time,d.part_time)}
        else if(filter.splitting == "Legal status"){return Math.max(d.canadien,d.resident,d.international)}
        else if(filter.splitting == "Cycle"){return Math.max(d.cycle_1,d.cycle_2,d.cycle_3)}
    })
    var max = d3.max(student_semester)
    yBar.domain([0, max])
}

