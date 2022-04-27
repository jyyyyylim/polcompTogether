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


ctxEntries.onclick= function(event){
    identifier= getIdentifier(event); //returns id no
    if (event.target.id=="delete-"+identifier){
        //console.log("delete event id: "+event.target.id);
        removePlot(identifier);
        bufferId(identifier); 

        targetCtx= document.getElementById("plotpoint-"+identifier);

        targetCtx.classList.add("plotpoint-remove");


        targetCtx.addEventListener("transitionend", ()=>{
            targetCtx.remove();
        })
        update();
    }
    else{};
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
        document.getElementById("xaxis-"+identifier).innerHTML= "x: "+xVal; 
    }
    if (event.target.id=="y-"+identifier){
        yVal = plotBuffer[plotIndx].offsety = document.getElementById("y-"+identifier).value;
        document.getElementById("yaxis-"+identifier).innerHTML= "y: "+yVal;
    }
    update();
}



function update(){
    window.requestAnimationFrame(draw);
}


    
function deletename() {
}






ctxOptions.onclick= function(event){
    console.log(event.target.id);

    //executes on clicking "add"
    if(event.target.id=="add"){
        if(idBuffer.length===0){
            addPoint(ctxEntries.childElementCount);
            bufferPlot(ctxEntries.childElementCount-1); 
        }

        else{addPoint(idBuffer[0]); bufferPlot(idBuffer[0]); removeId(idBuffer[0])}


    }

    if(event.target.id=="reset"){
        plotBuffer=[]; idBuffer=[]; clr();
        update();
    }



    //labelledDot();
}

function addPoint(identifier){
    ctxEntries.insertAdjacentHTML('beforeend', '<div class="plotpoint" id="plotpoint-'+identifier+'"><div class="delete" id="delete-'+identifier+'">×</div><input type="text" id="name-'+identifier+'" placeholder="name"><input type="range" min="-10" max="10" step="0.001" value="0" class="slider polslider" id="x-'+identifier+'"><kbd><span id="xaxis-'+identifier+'" class="number">x: 0</span></kbd><input type="range" min="-10" max="10" step="0.001" value="0" class="slider polslider" id="y-'+identifier+'"><kbd><span id="yaxis-'+identifier+'" class="number">y: 0</span></kbd></div>');
}

function clr(){
    ctxEntries.innerHTML="";
}


function saveCtnt(identifier){

}