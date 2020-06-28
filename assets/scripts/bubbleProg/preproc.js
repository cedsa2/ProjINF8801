"use strict";

function createBubbleSourcesProg(diploma, inscription, bubbleSelectedFilter){
       return bubbleSelectedFilter.mode == "Diploma" ? createSourceHelper(diploma, bubbleSelectedFilter) : createSourceHelper(inscription, bubbleSelectedFilter);
}
/**
 * Reorganizes the data
 * @param data      
 * @return {Array}  
 *
 *                  [  
 *                      {
 *                          programme: str;
 *                          Libre_auditeur_cycle_2: number (Libre & auditeur cycle-2)
 *                          Certificat: number (Certificat)
 *                          Doctorat: number(Doctorat)
 *                          Libre_auditeur_cycle_1: number (Libre & auditeur cycle-1)
 *                          DESS: number (DESS)
 *                          Micro-programme_cycle_1: Micro-programme cycle-1
 *                          Maitrise_professionnelle: Maitrise professionnelle
 *                          Bac: Bac
 *                          Maitrise_recherche: Maitrise recherche
 *                          Micro-programme_cycle-2: Micro-programme cycle-2
 *                          Libre_auditeur_cycle-3: Libre & auditeur cycle-3
 *                          Preparatoire_cycle-2: Preparatoire cycle-2
 *                         }
 *                  ]
 *                    
 *                     
 *                  
 */

function createSourceHelper(data, bubbleSelectedFilter) {

    var res = Array.from(d3.group(data, d => d.ANNEE, d => d.Trim, d => d.Programme, d => d.Grade)
                .get(bubbleSelectedFilter.year)
                .get(bubbleSelectedFilter.semester == "Summer" ? 2 : bubbleSelectedFilter.semester == "Winter" ? 3 : 1), ([Programme, value])=> ({Programme, value}))


    res.map(d => {
        d.Bac = d.value.get("Bac") == undefined ? 0 : d.value.get("Bac").length;
        d.Certificat = d.value.get("Certificat") == undefined ? 0 : d.value.get("Certificat").length;
        d.DESS = d.value.get("DESS") == undefined ? 0 : d.value.get("DESS").length;
        d.Doctorat = d.value.get("Doctorat") == undefined ? 0 : d.value.get("Doctorat").length;
      
        d.Libre_auditeur_cycle_1 = d.value.get("Libre & auditeur cycle-1") == undefined ? 0 : d.value.get("Libre & auditeur cycle-1").length;
        d.Libre_auditeur_cycle_2 = d.value.get("Libre & auditeur cycle-2") == undefined ? 0 : d.value.get("Libre & auditeur cycle-2").length;
        d.Libre_auditeur_cycle_3 = d.value.get("Libre & auditeur cycle-3") == undefined ? 0 : d.value.get("Libre & auditeur cycle-3").length;
        d.Maitrise_professionnelle = d.value.get("Maitrise professionnelle") == undefined ? 0 : d.value.get("Maitrise professionnelle").length;
       
        d.Maitrise_recherche = d.value.get("Maitrise recherche") == undefined ? 0 : d.value.get("Maitrise recherche").length;
        d.Micro_programme_cycle_1 = d.value.get("Micro-programme cycle-1") == undefined ? 0 : d.value.get("Micro-programme cycle-1").length;
        d.Micro_programme_cycle_2 = d.value.get("Micro-programme cycle-2") == undefined ? 0 : d.value.get("Micro-programme cycle-2").length;
        d.Preparatoire_cycle_2 = d.value.get("Preparatoire cycle-2") == undefined ? 0 : d.value.get("Preparatoire cycle-2").length;
        delete d["value"];
        d.total = d.Libre_auditeur_cycle_2 + d.Certificat + d.Doctorat + d.Libre_auditeur_cycle_1
                + d.DESS + d.Micro_programme_cycle_1 + d.Maitrise_professionnelle + d.Bac
                + d.Maitrise_recherche + d.Micro_programme_cycle_2 + d.Libre_auditeur_cycle_3 + d.Preparatoire_cycle_2
    });
    res.sort((a, b) => b.total - a.total);
    res.map(d => {
        d.sum = d3.sum(res, d => d.total);
    });
    return res;
}

