//contentARRAY: struct: label, offsetx, offsety
var plotBuffer= [];



var ctxEntries= document.getElementById("entries");
var ctxOptions= document.getElementById("options");
var idBuffer= [];





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
        console.log("delete event id: "+event.target.id);
        bufferId(identifier); 
        document.getElementById("plotpoint-"+identifier).remove();
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
        plotBuffer[plotIndx].offsetx= document.getElementById("x-"+identifier).value;
    }
    if (event.target.id=="y-"+identifier){
        plotBuffer[plotIndx].offsety= document.getElementById("y-"+identifier).value;
    }
    updateContent();
}



function updateContent(){
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

            //console.log("added: "+(ctxEntries.childElementCount));
        }

        else{
            addPoint(idBuffer[0]);
            bufferPlot(idBuffer[0]); 
            removeId(idBuffer[0])
        }


    }

    if(event.target.id=="reset"){

    }



    //labelledDot();
}

function addPoint(identifier){
    pointCtx=document.getElementById("entries");
    pointCtx.insertAdjacentHTML('beforeend', '<div class="plotpoint" id="plotpoint-'+identifier+'"><div class="delete" id="delete-'+identifier+'">×</div><input type="text" id="name-'+identifier+'" placeholder="name"><input type="range" min="-10" max="10" step="0.001" value="0" class="slider" id="x-'+identifier+'"><kbd><span id="xaxis-'+identifier+'" class="number">sdsd</span></kbd><input type="range" min="-10" max="10" step="0.001" value="0" class="slider" id="y-'+identifier+'"><kbd><span id="yaxis-'+identifier+'" class="number">dsdd</span></kbd></div>');
}


function saveCtnt(identifier){

}