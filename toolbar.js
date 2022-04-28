//contentARRAY: struct: label, offsetx, offsety
var plotBuffer= [];
var idBuffer= [];


var ctxEntries= document.getElementById("entries");
var ctxOptions= document.getElementById("options");





//buffer id on every read/delete so as to save on checks later
//id is prebuffered on removal of element 
function bufferId(n){idBuffer.push(n);}
function findIdinBuffer(target){for (var i=0; i<idBuffer.length; i++){if (idBuffer[i]==target){return i;}}}
function removeId(n){idBuffer.splice(findIdinBuffer(n), 1)}


function bufferPlot(n){plotBuffer.push({id:n, label:null, offsetx:0, offsety:0})}
function findIdinPlot(target){for (var i=0; i<plotBuffer.length; i++){if (plotBuffer[i].id==target){return i;}}}
function removePlot(n){plotBuffer.splice(findIdinPlot(n),1)}


function getIdentifier(event){return /\-(.*)/gm.exec(event.target.id)[1];}




function retrieveLocal(){
    if (localStorage.getItem('plotpoints')!=null){
        return localStorage.getItem('plotpoints');
    }
}


ctxEntries.onclick= function(event){
    identifier= getIdentifier(event); //returns id no
    if (event.target.id=="delete-"+identifier){
        removePlot(identifier);
        localStorage.setItem("plotpoints", JSON.stringify(plotBuffer));

        bufferId(identifier); 

        targetCtx= document.getElementById("plotpoint-"+identifier);
        targetCtx.classList.add("plotpoint-remove");

        targetCtx.addEventListener("transitionend", ()=>{
            targetCtx.remove();
        })
        update();
    }
}

ctxEntries.oninput= function(event){
    identifier= getIdentifier(event); //returns id no
    console.log(identifier);
    plotIndx= findIdinPlot(identifier);

    if (event.target.id=="name-"+identifier){
        plotBuffer[plotIndx].label= document.getElementById("name-"+identifier).value;
    }
    if (event.target.id=="x-"+identifier){
        xVal = plotBuffer[plotIndx].offsetx = document.getElementById("x-"+identifier).value;
        document.getElementById("xaxis-"+identifier).value= xVal; 
    }
    if (event.target.id=="y-"+identifier){
        yVal = plotBuffer[plotIndx].offsety = document.getElementById("y-"+identifier).value;
        document.getElementById("yaxis-"+identifier).value= yVal;
    }
    
    if (event.target.id=="xaxis-"+identifier){
        xVal = plotBuffer[plotIndx].offsetx = document.getElementById("xaxis-"+identifier).value;
        document.getElementById("x-"+identifier).value= xVal;
        console.log("yeah");
    }

    if (event.target.id=="yaxis-"+identifier){
        yVal = plotBuffer[plotIndx].offsety = document.getElementById("yaxis-"+identifier).value;
        document.getElementById("y-"+identifier).value= yVal;
        console.log("yeah");
    }

    localStorage.setItem("plotpoints", JSON.stringify(plotBuffer));
    update();
}

ctxOptions.onclick= function(event){
    if(event.target.id=="add"){
        if(idBuffer.length===0){
            addPoint(ctxEntries.childElementCount);
            bufferPlot(ctxEntries.childElementCount-1); 
        }

        else{addPoint(idBuffer[0]); bufferPlot(idBuffer[0]); removeId(idBuffer[0])}
    }

    if(event.target.id=="reset"){
        plotBuffer=[]; idBuffer=[]; clr();
        localStorage.clear();
        update();
    }

    if(event.target.id=="save"){
    }
}



//executed on page load
function plotterOnload(){
    if (localStorage.getItem('plotpoints')!=null){
        console.log("savepoint found!");
        plotBuffer= JSON.parse(localStorage.getItem('plotpoints'));
        
        for (i=0; i<plotBuffer.length; i++){

            //if(i!=plotBuffer[i].id){bufferId(i);}

            //normal behaviour: restores all plots
            //issue is that page cannot identify missing points 
            restorePoint(i, plotBuffer[i].label, plotBuffer[i].offsetx, plotBuffer[i].offsety);
            plotBuffer[i].id=i;
        }
        update();     
    }
}




function update(){
    window.requestAnimationFrame(draw);
}


    
function deletename() {
}







function addPoint(identifier){
    ctxEntries.insertAdjacentHTML('beforeend', '<div class="plotpoint" id="plotpoint-'+identifier+'"><div class="delete" id="delete-'+identifier+'">×</div><input type="text" id="name-'+identifier+'" placeholder="name"><div class="sliderctnr"><img src="economy.svg"><input type="range" min="-10" max="10" step="0.001" value="0" class="slider polslider" id="x-'+identifier+'"><input type="number" id="xaxis-'+identifier+'" class="" min="-10" max="10" step=".001"></div><div class="sliderctnr"><img src="balance.svg"><input type="range" min="-10" max="10" step="0.001" value="0" class="slider polslider" id="y-'+identifier+'"><input type="number" id="yaxis-'+identifier+'" class="" min="-10" max="10" step=".001"></div></div>');
}

function restorePoint(identifier, label, offsetx, offsety){
    ctxEntries.insertAdjacentHTML('beforeend', '<div class="plotpoint" id="plotpoint-'+identifier+'"><div class="delete" id="delete-'+identifier+'">×</div><input type="text" id="name-'+identifier+'" placeholder="name" value="'+label+'"><div class="sliderctnr"><img src="economy.svg"><input type="range" min="-10" max="10" step="0.001" value="'+offsetx+'" class="slider polslider" id="x-'+identifier+'"><input type="number" id="xaxis-'+identifier+'" class="" min="-10" max="10" step=".001" value="'+offsetx+'"></div><div class="sliderctnr"><img src="balance.svg"><input type="range" min="-10" max="10" step="0.001" value="'+offsety+'" class="slider polslider" id="y-'+identifier+'"><input type="number" id="yaxis-'+identifier+'" class="" min="-10" max="10" step=".001" value="'+offsety+'"></div></div>');
}

function clr(){
    ctxEntries.innerHTML="";
}


function saveCtnt(identifier){

}