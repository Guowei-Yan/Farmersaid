import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';

class DonutInjury extends Component {

    constructor(props) {
        super(props);

        this.displayInjuryDonutChart = this.displayInjuryDonutChart.bind(this);
    }

    /**
     * 
     * Function invoked automatically when the component has mounted
     * 
     */

    componentDidMount() {
        this.displayInjuryDonutChart();
    }

    /**
     * 
     * Function that displays the interactive donut chart using d3.js
     * 
     */

    displayInjuryDonutChart() {
        var data = this.props.results["results"];

        const NO_INJURY_DATA = "No injury data!"

        var pie = d3.layout.pie()
        .value(function(d) { return d.count; })
        .sort(null);
        var age = data.map(function(d){return d.age});
        var seleage1 = d3.nest()
        .key(function(d) { return d.age; })
        .entries(data);
        var selebody1 = d3.nest()
        .key(function(d) { return d.body; })
        .entries(data);
        var injury1 =  d3.nest()
        .key(function(d) { return d.injury; })
        .entries(data);
        var seleage =[];
        var selebody=[];
        for(let i=0;i<seleage1.length;i++){

            var agesss = Object.values(seleage1[i])[0];
            seleage.push(agesss);
        };
        for(let i=0;i<selebody1.length;i++){
            var bodyy = Object.values(selebody1[i])[0];
            selebody.push(bodyy);
        };
        seleage = seleage.sort();
        selebody = selebody.sort();
        var select = d3.select('#seleag')
        .append('select')
            .attr('class','form-control border-green')
            .attr("id","select1")
            .on('change',onchange)
        var select1 = d3.select('#selebo')
        .append('select')
            .attr('class','form-control border-green')
            .attr("id","select2")
            .on('change',onchange)
        var options = select
        .selectAll('option')
            .data(seleage).enter()
            .append('option')
                .text(function (d) { return d; });
        var options2 = select1
        .selectAll('option')
            .data(selebody).enter()
            .append('option')
                .text(function (d) { return d; });

        var width = document.getElementById("chart").clientWidth;
        var height = 300;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 30;
        var legendRectSize = 18;
        var legendSpacing = 4;
        var injury3 =[];
        var color = d3.scale.category20b();
        var dataset =[seleage[0],selebody[0]];
        for (let i=0;i<injury1.length;i++){
            var inju = Object.values(injury1[i])[0];
            var injury2 ={};
            injury2["cause"] = inju;
            injury2["count"] = 0;
            injury3.push(injury2);
        }

        for (let i=0;i<data.length;i++){

            if((dataset[0]==data[i].age) && (dataset[1]==data[i].body)){
            for (let u=0;u<injury3.length;u++){
                if(injury3[u].cause==data[i].injury){
                    injury3[u].count += 1;
                }
            }}
        };



        var svg = d3.select('#chart')
        .append('svg')
        // .attr('width', width)
        // .attr('height', height)
        .attr("viewBox", "0 0 "+width+" "+height)
        .style("text-align", "center")
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')')
        .style("cursor", "pointer");

        var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);



        var row_content = d3.select('.row-content')                                   

        data.forEach(function(d) {
            d.count = +d.count;
        });
        var path = svg.selectAll('path')
            .data(pie(injury3))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
            return color(d.data.cause); 
            });

        path.on('click', function(d) {                            
            var total = d3.sum(injury3.map(function(d) {                
            return d.count;                                           
            }));                                                        
            var percent = Math.round(1000 * d.data.count / total) / 10; 
            row_content.select('#cause').html(d.data.cause);                
            row_content.select('#count').html(d.data.count);                
            row_content.select('#percentage').html(percent + '%');                                     
        });                                                           

        var countss = 0
            for(let i=0;i<injury3.length;i++){
                countss += injury3[i].count
            };
            if(countss==0){
                try{
                    svg.selectAll("text").remove();
                }
                finally{
                svg.append('text')
                    .text(NO_INJURY_DATA)
                    .attr("id","no")
                    .style("font-size","20px")
                    .style("display", "block")
                    .style("fill","#67c250");}
            }
            else {
                d3.select("#no").remove()
            }
        function onchange(d) {
            var selectvalue;
            selectvalue = d3.select(this).property('value');
            svg.selectAll('path').remove();
            
            row_content.select('#cause').html("NA");                
            row_content.select('#count').html("0");                
            row_content.select('#percentage').html("0");

            var checkselect = 0
            var e = document.getElementById("seleag");
            for(let i=0;i<seleage.length;i++){
                if(selectvalue==seleage[i]){
                    checkselect = 1;
                    break;
                }};
            for(let i=0;i<selebody.length;i++){
                if(selectvalue==selebody[i]){
                    checkselect = 2;
                    break;
                }        
            }
            if(checkselect == 1){
            
            var selectvalue2 = dataset[1]
            var dataset2 = []
            dataset2 = [selectvalue,selectvalue2];
            dataset = dataset2;
            var injury3 =[];
            for (let i=0;i<injury1.length;i++){
                    var inju = Object.values(injury1[i])[0];
                    var injury2 ={};
                    injury2["cause"] = inju;
                    injury2["count"] = 0;
                    injury3.push(injury2);
                }

            for (let i=0;i<data.length;i++){

                    if((dataset2[0]==data[i].age) && (dataset2[1]==data[i].body)){
                    for (let u=0;u<injury3.length;u++){
                        if(injury3[u].cause==data[i].injury){
                            injury3[u].count += 1;
                        }
                    }}
                };
            var path = svg.selectAll('path')
                .data(pie(injury3))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d, i) { 
                return color(d.data.cause); 
                });

            path.on('click', function(d) {                            
                var total = d3.sum(injury3.map(function(d) {                
                return d.count;                                           
                }));                                                        
                var percent = Math.round(1000 * d.data.count / total) / 10; 
                row_content.select('#cause').html(d.data.cause);                
                row_content.select('#count').html(d.data.count);                
                row_content.select('#percentage').html(percent + '%');                                   
            });                                                           

            var countss = 0
            for(let i=0;i<injury3.length;i++){
                countss += injury3[i].count
            };

            if(countss==0){
                try{
                    svg.selectAll("text").remove();
                }
                finally{
                svg.append('text')
                    .text(NO_INJURY_DATA)
                    .attr("id","no")
                    .style("font-size","20px")
                    .style("display", "block")
                    .style("fill","#67c250");}
            }
            else {
                d3.select("#no").remove()
            }

                };
            if(checkselect == 2){
            
            var selectvalue2 = dataset[0]
            var dataset2 = []
            dataset2 = [selectvalue2,selectvalue];
            dataset = dataset2;
            var injury3 =[];
            for (let i=0;i<injury1.length;i++){
                    var inju = Object.values(injury1[i])[0];
                    var injury2 ={};
                    injury2["cause"] = inju;
                    injury2["count"] = 0;
                    injury3.push(injury2);
                };

            for (let i=0;i<data.length;i++){

                    if((dataset2[0]==data[i].age) && (dataset2[1]==data[i].body)){
                    for (let u=0;u<injury3.length;u++){
                        if(injury3[u].cause==data[i].injury){
                            injury3[u].count += 1;
                        }
                    }}
                };
            var path = svg.selectAll('path')
                .data(pie(injury3))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d, i) { 
                return color(d.data.cause); 
                });

            path.on('click', function(d) {                            
                var total = d3.sum(injury3.map(function(d) {                
                return d.count;                                           
                }));                                                      
                var percent = Math.round(1000 * d.data.count / total) / 10; 
                row_content.select('#cause').html(d.data.cause);                
                row_content.select('#count').html(d.data.count);                
                row_content.select('#percentage').html(percent + '%');            
                row_content.style('display', 'block');                          
            });                                                           
            var countss = 0
            for(let i=0;i<injury3.length;i++){
                countss += injury3[i].count
            };
            if(countss==0){
                try{
                    svg.selectAll("text").remove();
                }
                finally{
                svg.append('text')
                    .text(NO_INJURY_DATA)
                    .attr("id","no")
                    .style("font-size","20px")
                    .style("display", "block")
                    .style("fill","#67c250");}
            }
            else {
                d3.select("#no").remove()
            }

            };
        

        }
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {

        return (
            <Fragment>              
                <div className="row mt-5">
                    <div className="col-md-4">
                        <label htmlFor="seleag" className="mt-2">Select age group:</label>
                        <div id="seleag" className="mt-1"></div>
                        <label htmlFor="selebo" className="mt-2">Select body part:</label>
                        <div id="selebo" className="mt-1"></div>
                    </div>
                    <div className="col-md-4">
                        <div id="chart" className="mt-2"></div>
                    </div>
                    <div className="col-md-4">
                        <div className="row-content text-center mt-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <b><u>Cause:</u></b>
                                </div>
                                <div className="col-md-6">
                                    <div id="cause">NA</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <b><u>Count:</u></b>
                                </div>
                                <div className="col-md-6">
                                    <div id="count">0</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <b><u>Percentage</u></b>
                                </div>
                                <div className="col-md-6">
                                    <div id="percentage">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

    }

}

export default DonutInjury;