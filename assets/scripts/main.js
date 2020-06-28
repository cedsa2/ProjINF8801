(function (d3) {
    "use strict";

    /***** Configuration *****/
    var barChartMargin = {
        top: 20,
        right: 40,
        bottom: 30,
        left: 40
    };
    var barChartWidth = 750;
    var barChartHeight = 300;

    var barChartMarginSplit1 = {
        top: 10,
        right: 40,
        bottom: 40,
        left: 40
    };

    var barChartWidthSplit1 = 750;
    var barChartHeightSplit1 = 150;

    var barChartMarginSplit2 = {
        top: 10,
        right: 40,
        bottom: 40,
        left: 40
    };
    var barChartWidthSplit2 = 750;
    var barChartHeightSplit2 = 150;

    var barChartMarginSplit3 = {
        top: 10,
        right: 40,
        bottom: 40,
        left: 40
    };
    var barChartWidthSplit3 = 750;
    var barChartHeightSplit3 = 150;

    var bubbleChartMargin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    var bubbleChartWidth = 500;
    var bubbleChartHeight = 400;

    var Grade = {
        Libre_auditeur_cycle_2: "number (Libre & auditeur cycle-2)",
        Certificat: "Certificat",
        Doctorat: "Doctorat",
        Libre_auditeur_cycle_1: "Libre & auditeur cycle-1",
        DESS: "DESS",
        Micro_programme_cycle_1: "Micro-programme cycle-1",
        Maitrise_professionnelle: "Maitrise professionnelle",
        Bac: "Bac",
        Maitrise_recherche: "Maitrise recherche",
        Micro_programme_cycle_2: "Micro-programme cycle-2",
        Libre_auditeur_cycle_3: "Libre & auditeur cycle-3",
        Preparatoire_cycle_2: "Preparatoire cycle-2"
    }

    /***** scales *****/

    var xBar = d3.scaleBand().range([0, barChartWidth]).padding([0.1]);
    var yBar = d3.scaleLinear().range([barChartHeight, 0]);

    var xAxis = d3.axisBottom(xBar);
    var yAxis = d3.axisLeft(yBar);

    var xBarSplit1 = d3.scaleBand().range([0, barChartWidthSplit1]).padding([0.1]);
    var yBarSplit1 = d3.scaleLinear().range([barChartHeightSplit1, 0]);

    var xAxisSplit1 = d3.axisBottom(xBarSplit1);
    var yAxisSplit1 = d3.axisLeft(yBarSplit1);

    var xBarSplit2 = d3.scaleBand().range([0, barChartWidthSplit2]).padding([0.1]);
    var yBarSplit2 = d3.scaleLinear().range([barChartHeightSplit2, 0]);

    var xAxisSplit2 = d3.axisBottom(xBarSplit2);
    var yAxisSplit2 = d3.axisLeft(yBarSplit2);

    var xBarSplit3 = d3.scaleBand().range([0, barChartWidthSplit3]).padding([0.1]);
    var yBarSplit3 = d3.scaleLinear().range([barChartHeightSplit3, 0]);

    var xAxisSplit3 = d3.axisBottom(xBarSplit3);
    var yAxisSplit3 = d3.axisLeft(yBarSplit3);

    var xBubble = d3.scaleLinear().range([0, bubbleChartWidth]);
    var yBubble = d3.scaleLinear().range([bubbleChartHeight, 0]);

    var xBubbleProg = d3.scalePoint().range([0, bubbleChartWidth]);
    var yBubbleProg = d3.scaleLinear().range([bubbleChartHeight, 0]);

    /***** Creation of the elements of the bar diagram *****/
    var barColors = ["#F8CC2E", "#F34C22" , "#34A9FD"]; //Fall(1), Winter(3), Summer(2)
    var barChartSvg = d3.select("#bar-svg")
        .attr("width", barChartWidth + barChartMargin.left + barChartMargin.right)
        .attr("height", barChartHeight + barChartMargin.top + barChartMargin.bottom)
        .append("g")
        .attr("transform", 
        "translate(" + barChartMarginSplit1.left + "," + barChartMarginSplit1.top + ")");

    var barChartSvgSplit1 = d3.select("#bar-svg-split1")
        .attr("width", barChartWidthSplit1 + barChartMarginSplit1.left + barChartMarginSplit1.right)
        .attr("height", barChartHeightSplit1 + barChartMarginSplit1.top + barChartMarginSplit1.bottom)
        .append("g")
        .attr("transform", 
        "translate(" + barChartMarginSplit2.left + "," + barChartMarginSplit2.top + ")");

    var barChartSvgSplit2 = d3.select("#bar-svg-split2")
        .attr("width", barChartWidthSplit2 + barChartMarginSplit2.left + barChartMarginSplit2.right)
        .attr("height", barChartHeightSplit2 + barChartMarginSplit2.top + barChartMarginSplit2.bottom)
        .append("g")
        .attr("transform", 
        "translate(" + barChartMarginSplit2.left + "," + barChartMarginSplit2.top + ")");

    var barChartSvgSplit3 = d3.select("#bar-svg-split3")
        .attr("width", barChartWidthSplit3 + barChartMarginSplit3.left + barChartMarginSplit3.right)
        .attr("height", barChartHeightSplit3 + barChartMarginSplit3.top + barChartMarginSplit3.bottom)
        .append("g")
        .attr("transform", 
        "translate(" + barChartMarginSplit3.left + "," + barChartMarginSplit3.top + ")");


    /***** Creation of the elements of the bubble diagram *****/
    var bubbleChartSvg = d3.select("#bubble-svg")
        .attr("width", bubbleChartWidth + bubbleChartMargin.left + bubbleChartMargin.right)
        .attr("height", bubbleChartHeight + bubbleChartMargin.top + bubbleChartMargin.bottom);

    var bubbleChartSvgProg = d3.select("#bubble-svg-prog")
        .attr("width", bubbleChartWidth + bubbleChartMargin.left + bubbleChartMargin.right)
        .attr("height", bubbleChartHeight + bubbleChartMargin.top + bubbleChartMargin.bottom);

    /***** Loading data *****/
    var promises = [];
    promises.push(d3.csv("./data/DIPLOME.csv"));
    promises.push(d3.csv("./data/INSCRIPTION.csv"));

    Promise.all(promises)
        .then(function (results) {
            var diploma = results[0];
            var inscription = results[1];

            /***** Data preprocessing, Clean data, convert number, date au besoin...  *****/
            parseDiploma(diploma);
            parseInscription(inscription);

            /***** load filter data for bar char  *****/
            loadModeFilterData(d3.select("#mode-zone"));
            loadDegreeFilterData(d3.select("#degree-select"), diploma);
            loadProgramFilterData(d3.select("#program-select"), diploma, inscription, "Inscription");
            loadSplittingFilterData(d3.select("#splitting-zone"));
            
             /***** load filter data for bubble char  *****/
            loadYearFilterData(d3.select("#year-select"), diploma);
            loadBubbleSemesterFilterData(d3.select("#semester-buuble-zone"));
            loadBubbleModeFilterData(d3.select("#mode-bubble-zone"));
            
            var barSelectedFilter = getBarSelectedFilterData();
            var bubbleSelectedFilter = getBubbleSelectedFilterData();

            var barSources = createBarSources(diploma, inscription, barSelectedFilter);
            var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]),
                tip1 = d3.tip().attr('class', 'd3-tip').offset([-10, 0]),
                tip2 = d3.tip().attr('class', 'd3-tip').offset([-10, 0]),
                tip3 = d3.tip().attr('class', 'd3-tip').offset([-10, 0]),
                bubble_tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]),
                bubblePro_tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]);
        

            var bubbleSources = createBubbleSources(diploma, inscription, bubbleSelectedFilter);

            //use which data you need...
            barDomainX(xBar, barSources, diploma, inscription);
            barDomainY(yBar, barSources, diploma, inscription);

            barDomainX(xBarSplit1, barSources, diploma, inscription);
            barDomainY_Split1(yBarSplit1, barSelectedFilter, barSources, diploma, inscription);

            barDomainX(xBarSplit2, barSources, diploma, inscription);

            barDomainX(xBarSplit3, barSources, diploma, inscription);

            bubbleDomainX(xBubble, bubbleSources, diploma, inscription);
            bubbleDomainY(yBubble, bubbleSources, diploma, inscription);


            /***** Creation of the bar chart *****/
            createBarAxes(barChartSvg, xAxis, yAxis, barChartWidth, barChartHeight, barSelectedFilter, 0, yBar);
            tip.html(function(d) {
                return barchartTip.call(this, d);});
            barChartSvg.call(tip);
            createBarChart(barChartSvg, barSources, xBar, yBar, barColors, tip, barChartHeight);

            
            /***** Creation of the bubble chart *****/
            createBubbleAxes(bubbleChartSvg, xBubble, yBubble, bubbleChartWidth, bubbleChartHeight);
            bubble_tip.html(function(d) {
                return bubblechartTip.call(this, d, bubbleSources)
            });
            bubbleChartSvg.call(bubble_tip);
            createBubbleChart(bubbleChartSvg, bubbleSources, bubbleSelectedFilter, diploma, inscription, xBubble, yBubble, bubble_tip)

            /***** Creation of the bubble chart for program *****/
            var bubbleSelectedFilter = getBubbleSelectedFilterData();
                var bubbleSourcesProg = createBubbleSourcesProg(diploma, inscription, bubbleSelectedFilter);
                var fontScale = d3.scaleLinear().domain([0, 80]).range([0, 20]);
                createBubbleAxesProg(bubbleChartSvgProg, xBubbleProg, yBubbleProg, bubbleChartWidth, bubbleChartHeight);
                createBubbleChartProg(bubbleChartSvgProg, bubbleSourcesProg, bubblePro_tip, fontScale);
                updateBubbleChartProg(diploma, inscription, bubbleSelectedFilter, bubbleChartSvgProg, bubblePro_tip, fontScale);
            bubblePro_tip.html(function (d) {
                return getToolTipText.call(this, d, Grade)
            });
            bubbleChartSvgProg.call(bubblePro_tip);

            /***** When a bar chart filter changed *****/
            d3.selectAll(".bar-filter").on("change", function(d){
                barSelectedFilter = getBarSelectedFilterData();
                var filterName = d3.select(this).attr("name");
                barSelectedFilter = getBarSelectedFilterData();

                if(barSelectedFilter.mode == "Diploma") {
                    d3.select("#splitting3").property("disabled", true);
                    d3.select("#splitting4").property("disabled", true);
                }else{
                    d3.select("#splitting3").property("disabled", false);
                    d3.select("#splitting4").property("disabled", false);
                }
                var selected_mode =  createBarSources(diploma, inscription, barSelectedFilter)
                var chosen_semester = barSelectedFilter.semester;
                var barSourcesPlus = updateSourceFromSemester(barSelectedFilter, selected_mode, chosen_semester)
                    

                if (barSelectedFilter.splitting != "None") {

                    d3.select("#bar-svg").transition().duration(300).style("height", "0px")
                    if(barSelectedFilter.splitting == "Gender" || barSelectedFilter.splitting == "Fulltime / Part-time"){
                        clearSplitBarChart(barChartSvgSplit1);
                        clearSplitBarChart(barChartSvgSplit2);
                        clearSplitBarChart(barChartSvgSplit3);

                        d3.select("#bar-svg-split3").transition().duration(300).style("height", "0px")
                        d3.select("#bar-svg-split1").transition().duration(300).style("height", barChartHeightSplit1 + barChartMarginSplit1.top + barChartMarginSplit2.bottom)
                        d3.select("#bar-svg-split2").transition().duration(300).style("height", barChartHeightSplit2 + barChartMarginSplit2.top + barChartMarginSplit2.bottom)

                        barDomainY_Split1(yBarSplit1,barSelectedFilter, barSourcesPlus, diploma, inscription);
                        console.log(yBarSplit1.domain());
                        createBarAxes(barChartSvgSplit1, xAxisSplit1, yAxisSplit1, barChartWidthSplit1, barChartHeightSplit1, barSelectedFilter, 1, yBarSplit1);
                        tip1.html(function(d) {
                            return barchartSplit_1_Tip.call(this, d, barSelectedFilter);});
                        barChartSvgSplit1.call(tip1);
                        createSplit_1_BarChart(barChartSvgSplit1, barSourcesPlus,barSelectedFilter, xBarSplit1, yBarSplit1, barColors, tip1, barChartHeightSplit1);


                        barDomainY_Split1(yBarSplit2,barSelectedFilter, barSourcesPlus, diploma, inscription);
                        createBarAxes(barChartSvgSplit2, xAxisSplit2, yAxisSplit2, barChartWidthSplit2, barChartHeightSplit2, barSelectedFilter, 2, yBarSplit2);
                        tip2.html(function(d) {
                           return barchartSplit_2_Tip.call(this, d, barSelectedFilter);});
                        barChartSvgSplit2.call(tip2);
                        createSplit_2_BarChart(barChartSvgSplit2, barSourcesPlus, barSelectedFilter, xBarSplit2, yBarSplit2, barColors, tip2, barChartHeightSplit2);

                    }
                    else{
                        clearSplitBarChart(barChartSvgSplit1);
                        clearSplitBarChart(barChartSvgSplit2);
                        clearSplitBarChart(barChartSvgSplit3);

                        d3.select("#bar-svg-split1").transition().duration(300).style("height", barChartHeightSplit1 + barChartMarginSplit1.top + barChartMarginSplit1.bottom)
                        d3.select("#bar-svg-split2").transition().duration(300).style("height", barChartHeightSplit2 + barChartMarginSplit2.top + barChartMarginSplit2.bottom)
                        d3.select("#bar-svg-split3").transition().duration(300).style("height", barChartHeightSplit3 + barChartMarginSplit3.top + barChartMarginSplit3.bottom)

                        barDomainY_Split1(yBarSplit1,barSelectedFilter, barSourcesPlus, diploma, inscription);
                        console.log("domain:");
                        console.log(yBarSplit1.domain());
                        createBarAxes(barChartSvgSplit1, xAxisSplit1, yAxisSplit1, barChartWidthSplit1, barChartHeightSplit1, barSelectedFilter, 1, yBarSplit1);
                        tip1.html(function(d) {
                            return barchartSplit_1_Tip.call(this, d, barSelectedFilter);});
                        barChartSvgSplit1.call(tip1);
                        createSplit_1_BarChart(barChartSvgSplit1, barSourcesPlus, barSelectedFilter , xBarSplit1, yBarSplit1, barColors, tip1, barChartHeightSplit1);
        
                        barDomainY_Split1(yBarSplit2,barSelectedFilter, barSourcesPlus, diploma, inscription);
                        createBarAxes(barChartSvgSplit2, xAxisSplit2, yAxisSplit2, barChartWidthSplit2, barChartHeightSplit2, barSelectedFilter, 2, yBarSplit2);
                        tip2.html(function(d) {
                            return barchartSplit_2_Tip.call(this, d, barSelectedFilter);});
                        barChartSvgSplit2.call(tip2);
                        createSplit_2_BarChart(barChartSvgSplit2, barSourcesPlus, barSelectedFilter, xBarSplit2, yBarSplit2, barColors, tip2, barChartHeightSplit2);


                        barDomainY_Split1(yBarSplit3,barSelectedFilter, barSourcesPlus, diploma, inscription);
                        createBarAxes(barChartSvgSplit3, xAxisSplit3, yAxisSplit3, barChartWidthSplit3, barChartHeightSplit3, barSelectedFilter, 3, yBarSplit3);
                        tip3.html(function(d) {
                            return barchartSplit_3_Tip.call(this, d, barSelectedFilter);});
                        barChartSvgSplit3.call(tip3);
                        createSplit_3_BarChart(barChartSvgSplit3, barSourcesPlus, barSelectedFilter, xBarSplit3, yBarSplit3, barColors, tip3, barChartHeightSplit3);

                    }
                } 
                else {
                    d3.select("#bar-svg-split1").transition().duration(300).style("height", "0px")
                    d3.select("#bar-svg-split2").transition().duration(300).style("height", "0px")
                    d3.select("#bar-svg-split3").transition().duration(300).style("height", "0px")
                    
                    d3.select("#bar-svg").transition().duration(600).style("height", barChartHeight + barChartMargin.top + barChartMargin.bottom)
                    
                    barDomainY(yBar,barSourcesPlus, diploma, inscription)
                    createBarAxes(barChartSvg, xAxis, yAxis, barChartWidth, barChartHeight,barSelectedFilter,0, yBar);
                    tip.html(function(d) {
                        return barchartTip.call(this, d);});
                    barChartSvg.call(tip);
                    updateBarChart(diploma, inscription, barSelectedFilter, barChartSvg, barSourcesPlus, xBar, yBar, barColors, tip, barChartHeight);
                }

                
            });

           

            /***** When a bubble chart filter changed *****/
            d3.selectAll(".bubble-filter").on("change", function (d) {

                var bubbleSelectedFilter = getBubbleSelectedFilterData();
                var bubbleSourcesProg = createBubbleSourcesProg(diploma, inscription, bubbleSelectedFilter);
                var fontScale = d3.scaleLinear().domain([0, 80]).range([0, 20]);
                createBubbleAxesProg(bubbleChartSvgProg, xBubbleProg, yBubbleProg, bubbleChartWidth, bubbleChartHeight);
                createBubbleChartProg(bubbleChartSvgProg, bubbleSourcesProg, bubblePro_tip, fontScale);
                updateBubbleChartProg(diploma, inscription, bubbleSelectedFilter, bubbleChartSvgProg, bubblePro_tip, fontScale);



                bubbleSources = createBubbleSources(diploma, inscription, bubbleSelectedFilter);
                var bubbleSelectedFilter = getBubbleSelectedFilterData();
                bubble_tip.html(function (d) {
                    return bubblechartTip.call(this, d, bubbleSources)
                });
                bubbleChartSvg.call(bubble_tip);
                updateBubbleChart(diploma, inscription, bubbleSelectedFilter, bubbleChartSvg, bubbleSources, xBubble, yBubble, bubble_tip);


                bubblePro_tip.html(function (d) {
                    return getToolTipText.call(this, d, Grade)
                });
                bubbleChartSvgProg.call(bubblePro_tip);
            });
        });

    d3.selectAll(".menu-color").on("click", function (d) {
        var name = d3.select(this).attr("name");
        window.location.href = '#' + name;
    });
      
})(d3);
