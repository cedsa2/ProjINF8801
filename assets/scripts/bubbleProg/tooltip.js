"use strict";

/**
 * File allowing to define the text to be shown in the tooltip.
 */


/**
 * Retrieves the text associated with the tooltip.
 *
 * @param d               Data associated to the currently hovered circle.
 * @param Grade           Grade const
 * @return {string}       The text to show in the tooltip.
 */
function getToolTipText(d, Grade) {

  var res = "<span>Programme:<strong>" + d.data.Programme + "</strong></span>" + "<br>"
    for (var key in d.data) {
        if (key == "Programme" || key == "sum") {
            continue;
        } else {
            if (d.data[key] != 0 && key != "total") {
                res += "<span>" + Grade[key] + ": <strong>" + d.data[key] + "</strong></span>" + "<br>"
            } else if (key == "total") {
                res += "<span>" + "Total" + ": <strong>" + d.data[key]  + " (" +  parseFloat(d.data["total"] / d.data["sum"] * 100).toFixed(2)+"%" + " students of this semester)" + "</strong></span>" + "<br>"
            }
        }
    }
    
    return res;
    
}