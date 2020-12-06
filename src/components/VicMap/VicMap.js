import React, { Component, Fragment } from 'react';

class VicMap extends Component {

    constructor(props) {
        super(props);

        this.displayInjuryFatalityMap = this.displayInjuryFatalityMap.bind(this);
    }

    /**
     * 
     * Function invoked automatically when the component has mounted
     * 
     */

    componentDidMount() {
        this.displayInjuryFatalityMap();
    }

    /**
     * 
     * Function that displays the interactive map of Victoria using d3.js
     * 
     */

    displayInjuryFatalityMap() {
        let data = this.props.results["results"];
        console.log(data)
        d3.json('/map/vic.geojson', function (geojson) {
            const txt1 = "Click on a region on the map"
            document.getElementById("ttips").innerHTML=txt1
            var map = L.map('map').setView([-36.734311, 144.247157], 6);
                
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.light'
                }).addTo(map);
                window.smoothScroll = function(target) {
                    var scrollContainer = target;
                    do { //find scroll container
                        scrollContainer = scrollContainer.parentNode;
                        if (!scrollContainer) return;
                        scrollContainer.scrollTop += 1;
                    } while (scrollContainer.scrollTop == 0);

                    var targetY = 0;
                    do { //find the top of target relatively to the container
                        if (target == scrollContainer) break;
                        targetY += target.offsetTop;
                    } while (target = target.offsetParent);

                    scroll = function(c, a, b, i) {
                        i++; if (i > 30) return;
                        c.scrollTop = a + (b - a) / 30 * i;
                        setTimeout(function(){ scroll(c, a, b, i); }, 20);
                    }
                    // start scrolling
                    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
                }
                function gobacktomap(){
                    var kk;
                    kk = document.getElementById("tback")
                    kk.innerHTML = "Go back to map";
                    kk.style["cursor"] = "pointer";
                    kk.style["text-decoration"] = "underline";
                    kk.onclick = function() {
                            smoothScroll(document.getElementById('top'))
                        }
                    
                }
                var info = L.control();
                var cause;
                var indicator = 0;
                var currente;
                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info');
                    return this._div;
                };

                info.update = function (propss) {
                    var oo = (propss ? propss.LGA:null)
                    this._div.innerHTML = (propss ?
                        '<b>' + propss.LGA + '</b><br />' +'Number of injuries per 10 thousands population: '+ Math.round(Math.round((definecolor(propss.LGA)*100))/100)+ '</b><br />'+'Major severe injury cause: '+ definecause(propss.LGA) + '</b><br />'
                        : '');
                    var node = document.createElement("div");  
                    node.id = "next tooltip"
                    var oo1 = this._div.appendChild(node)
                    var oo2 = document.getElementById("next tooltip")
                    cause = (propss? definecause(propss.LGA):null)
                    if (oo != null && cause != "No"){
                        oo2.innerHTML = "How can I prevent this";
                        oo2.style["cursor"] = "pointer";
                        oo2.style["text-decoration"] = "underline";
                    }
                    oo2.onclick = function() {if (oo != null){
                            smoothScroll(document.getElementById('pic'))
                        }
                    }

                    fillbox(cause)
                    
                    
                };
                info.update1 = function (propss) {
                    this._div.innerHTML = (propss ?
                        '<b>' + propss.LGA + '</b><br />' +'Number of injuries per 10 thousands population: '+ propss.LGA
                        : txt1);
                    resetfunc();
                };
                info.addTo(map);
                
                function fillbox(d){
                    let tips = [];
                    if (d=="Tractor Accident"){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["Always Turn the Engine Off When Not in the Driver Seat", "Keep Loose Clothes and Long Hair Away From Moving Parts", "Do A Full Walk Around Your Tractor Before Using It"]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafes");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/tractor.jpg'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://content.api.worksafe.vic.gov.au/sites/default/files/2018-06/ISBN-Safe-use-of-tractors-with-attachments-2009-06.pdf",'_blank')
                        };
                        gobacktomap();
                    }
                        
                    else if (d=="Struck"){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["When working with vehicles, workers should always stand clear of vehicles lifting or dumping loads and exercise caution around unbalanced loads","When materials are overhead they should avoid standing near or below them.","Likewise the materials must be secure and even prior to lifting in order to prevent them from slipping"]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafe");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/struck.png'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://content.api.worksafe.vic.gov.au/sites/default/files/2018-06/ISBN-Falling-hay-bales-a-health-and-safety-solution-2007-06.pdf",'_blank')
                        };
                        gobacktomap();
                    }
                    else if (d=="Fall"){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["Attach extra grab rails on trucks, tractors, headers, ramps and step.","Use non slip tape on ladders, and non slip matting in the workshop; replace old steps with non slip metal mesh and a rail.","Avoid heights where possible, but if you have to work at height, wear a safety harness."]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafe");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/falling.png'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://content.api.worksafe.vic.gov.au/sites/default/files/2018-06/ISBN-Falls-prevention-guide-2017-06.pdf",'_blank')
                        };
                        gobacktomap();
                    }
                    else if (d=="Burn"){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["Never permit smoking in or near barns, out buildings or flammable material storage areas","Never refuel an internal combustion engine while it is hot or running.","See that crops are dry before storing, provide adequate ventilation in crop storage areas and repair leaking roofs."]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafe");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/burn.jpg'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://content.api.worksafe.vic.gov.au/sites/default/files/2018-06/ISBN-Bushfire-recovery-fact-sheet-3-bush-fire-hazards-2009-02.pdf",'_blank')
                        };
                        gobacktomap();
                    }
                    else if (d=="Electrocution."){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["Avoid using grounding adapters. Grounding adapters are risky because two-conductor circuits do not have a grounding conductor to connect to the 'pigtail' of theadapter.","If you find it necessary to use extension cords, refer to the guidelines in the Electrical Cords section of this Fact Sheet.","Get the advice of a competent electrician who is familiar with agricultural wiring to help you decide the safest and most economical alternative for your farm. A combination of methods may be your best choice"]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafe");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/electrocution.jpg'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://esv.vic.gov.au/safety-education/gas-and-electrical-safety-at-work/safety-on-the-farm/",'_blank')
                        };
                        gobacktomap();
                    }
                    else if (d=="Toxic"){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["Ensure anyone using agricultural chemicals is suitably trained to use both the chemical and any equipment required for application","Use chemical decanting kits to reduce the risk of spills and splashes while mixing chemicals.","Only mix the quantity of chemical required for the task at hand"]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafe");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/toxic.png'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://www.worksafe.vic.gov.au/commonly-used-dangerous-goods",'_blank')
                        };
                        gobacktomap();
                    }
                    else if (d=="Animal"){
                        document.getElementById("ttips").innerHTML = "<u>Prevention tips:</u>"
                        tips=["Walk through all animal-handling areas and look for hazards, such as broken gate latches, broken posts, or restraining equipment not working","Reflect on injury records to pinpoint recurring dangers, including less obvious ones like lacerations and sprains. ","Talk over safety issues with family members, workers and other animal handlers."]
                        
                        let ol = document.createElement("ol");
                        for (let i=0; i<tips.length; i++) {
                            let li = document.createElement("li");
                            li.innerHTML = tips[i];
                            ol.appendChild(li);
                        }
                        
                        document.getElementById("ttips").appendChild(ol);
                        document.getElementById("tlink").innerHTML= ("More information on Worksafe");
                        document.getElementById("pic").innerHTML="<img class='img-fluid' src='/img/animals.jpg'/>";
                        document.getElementById("tlink").style["cursor"] = "pointer";
                        document.getElementById("tlink").style["text-decoration"] = "underline";
                        var cli = document.getElementById("tlink");
                        cli.onclick = function() {
                            window.open("https://content.api.worksafe.vic.gov.au/sites/default/files/2019-07/ISBN-Beef-cattle-handling-safety-guide-2019-07.pdf",'_blank')
                        };
                        gobacktomap();
                    }
                    else if (d=="No"){
                        document.getElementById("ttips").innerHTML="No Severe injury in this area"
                    };
                }
                function resetfunc(d){

                        var e = document.getElementById("pic"); 
                        var e1 = document.getElementById("ttips");
                        //e.firstElementChild can be used. 
                        var child = e.lastElementChild; 
                        var child1 = e1.lastElementChild; 
                        while (child) { 
                            e.removeChild(child); 
                            child = e.lastElementChild; 
                        } 
                        while (child1) { 
                            e1.removeChild(child1); 
                            child1 = e1.lastElementChild; 
                        }
                         document.getElementById("ttips").innerHTML = "";
                         document.getElementById("tlink").innerHTML = "";
                         document.getElementById("tback").innerHTML = "";
                    }
                function getColor(d) {
                    return d > 100 ? 'rgb(214, 21, 44)' :
                            d > 80  ? 'rgb(220, 56, 76)' :
                            d > 60  ? 'rgb(226, 91, 108)' :
                            d > 40  ? 'rgb(232, 126, 140)' :
                            d > 20   ? 'rgb(238, 161, 172)' :
                            d > 10   ? 'rgb(244, 196, 204)' :
                            d > 5 ? 'rgb(250, 235, 237)' :
                                        'rgb(250, 235, 237)';
                }
                var myColor = d3.scale.linear()
                  .range(["rgb(250, 235, 237)", "rgb(214, 21, 44)"])
                  .domain([0,108.7])

                var myy = data.map(function(d){return d.lga});
                var myx = data.map(function(d){return d.number});
                var myz = data.map(function(d){return d.cause});
                for (let i=0; i<myx.length;i++){
                    for(let u=0;u<geojson["features"].length;u++){
                        if (myy[i]==geojson["features"][u]["properties"]["LGA"]){
                            myx[i]=myx[i]*10000/geojson["features"][u]["properties"]["POPULATION"]
                        }
                    }
                }
                var definecolor = function(d){
                    if(typeof(d)=="object"){

                    var hola = d.properties.LGA;
                    for (let i=0;i<myy.length;i++){
                        if (myy[i]==hola){
                            return myx[i]
                            break;
                        }
                        else {
                            if (i<(myy.length-1)){
                                continue;}
                            else{
                                return 0
                            }

                        }
                    }}
                    else{
                    var hola = d;
                    for (let i=0;i<myy.length;i++){
                        if (myy[i]==hola){
                            return myx[i]
                            break;
                        }
                        else {
                            if (i<(myy.length-1)){
                                continue;}
                            else{
                                return 0
                            }

                        }
                    };return null}
                };
                var definecause = function(d){
                        if(typeof(d)=="object"){

                        var hola = d.properties.LGA;
                        for (let i=0;i<myy.length;i++){
                            if (myy[i]==hola){
                                return myz[i]
                                break;
                            }
                            else {
                                if (i<(myy.length-1)){
                                    continue;}
                                else{
                                    return 0
                                }

                            }
                        }}
                        else{
                        var hola = d;
                        for (let i=0;i<myy.length;i++){
                            if (myy[i]==hola){
                                return myz[i]
                                break;
                            }
                            else {
                                if (i<(myy.length-1)){
                                    continue;}
                                else{
                                    return 0
                                }

                            }
                        };return null}
                    };
                function style(feature) {
                    return {
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        fillColor: myColor(definecolor(feature))
                    };
                }

                function highlightFeature(e) {
                    var layer = e.target;
                    layer.setStyle({
                        weight: 5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.7
                    });

                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        layer.bringToFront();
                    }

                    info.update(layer.feature.properties);
                }

                var geojsons;

                function resetHighlight(e) {
                    geojsons.resetStyle(e.target);
                    info.update1();
                }

                function zoomToFeature(e) {
                    var loca = e.target.feature.properties.LGA;
                    map.fitBounds(e.target.getBounds());
                    if (indicator == 0){
                        document.getElementById("ttips").innerHTML=""
                        highlightFeature(e)
                        currente = e
                        indicator = 1
                    }
                    else if (indicator == 1 && loca==currente.target.feature.properties.LGA){
                        resetHighlight(e)
                        document.getElementById("ttips").innerHTML=txt1;
                        indicator = 0
                        map.setView([-36.734311, 144.247157], 6);
                    }
                    else if (indicator == 1 && loca!=currente.target.feature.properties.LGA){
                        document.getElementById("ttips").innerHTML="";
                        resetHighlight(currente)
                        highlightFeature(e)
                        currente = e
                    }
                }

                function onEachFeature(feature, layer) {
                    layer.on({
                        click: zoomToFeature
                    });
                }

                geojsons = L.geoJson(geojson, {
                    style: style,
                    onEachFeature: onEachFeature
                }).addTo(map);



                var legend = L.control({position: 'bottomright'});

                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [5, 10, 20, 40, 60, 80, 100],
                        labels = [],
                        from, to;

                    for (let i = 0; i < grades.length; i++) {
                        from = grades[i];
                        to = grades[i + 1];

                        labels.push(
                            '<i style="background:' + getColor(from + 1) + '"></i> ' +
                            from + (to ? '&ndash;' + to : '+'));
                    }

                    div.innerHTML = labels.join('<br>');
                    return div;
                };




                legend.addTo(map);})
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {
        return (
            <Fragment>
                <div id="top" className="mt-2"></div>
                <div className="row mt-5">
                    <div className="col-lg-12 mt-3">
                        <div id='map'></div>
                    </div>
                    <div className="col-lg-12 mt-3">
                        <div className="tooltip-background">
                            <div id="ttips" className="mt-2"></div>
                            <div id="tlink" className="mt-2"></div>
                            <div id="tback" className="mt-2"></div>
                            <div id="pic" className="mt-2"></div>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        ) 
    }
    
}

export default VicMap