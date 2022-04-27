var canvasContext = null;
var canvasElement = null;
var width;
var height;
var size= 1200;

var mid= size/2;

var fontsize= 12;
var arrowwidth= 5;
var arrowlen= 14;
var arrowOffset= 135;

const margin= size*.025;
const padding= size*.017;
const thickness= 2;

const xaxis= (size/2);
const yaxis= (size/2);

//figure out scaling: (1200-60)/20
var scaleFactor= (size-((margin+padding)*2))/20;


//precompute sincos
const sin90= 1;
const cos90= 0;


//math consts
function lnNormal(x1, y1, x2, y2){
    gradient= ((y2-y1)/(x2-x1));

    yintercept= ((gradient*x1)-y1)

    //now get point of first rot

    offsetx1= (x1*Math.cos(arrowOffset))-(y1*Math.sin(arrowOffset))
    offsety1= (y1*Math.cos(arrowOffset))+(x1*Math.sin(arrowOffset))

    var normals=[];


    return normals;
}

function bitwiseFlip(n) {return ~n+1;}
function hypotenuse(a, b) {return Math.sqrt((a**2)+(b**2))}



//canvas
function initializeCanvas(){

    canvasElement = document.getElementById("comp");
    canvasContext = canvasElement.getContext("2d");



    //width= canvasElement.getBoundingClientRect().width;
    //height= canvasElement.getBoundingClientRect().height;

    width= height= canvasElement.width = canvasElement.height = size;

    draw();


    //console.logxaxis;
}



function draw(){



    console.log("drawing background with dim "+canvasElement.height);
    background();

    if (plotBuffer.length!=0){for (i=0; i<plotBuffer.length; i++){labelledDot((plotBuffer[i].offsetx), (plotBuffer[i].offsety), plotBuffer[i].label)}}

    canvasElement.toDataURL("image/jpg");
}

////////////////////////////////PRIMITIVES////////////////////////////////////
function background(){

    //out of pure autism this literally took me a day to replicate
    //"drawing svg on canvas" gives nothing of value

    canvasContext.lineWidth = 0.2;
    canvasContext.font = "1rem calibri";
    canvasContext.beginPath();
    
    canvasContext.clearRect(0, 0, width, height);
    
    canvasContext.globalCompositeOperation = 'source-over';

    //logic: draw lines, then destination-atop to save on context switching for colors
    canvasContext.strokeStyle = "#7F7F80";

    for (i=1; i<20; i++){
        canvasContext.moveTo(margin+padding+(scaleFactor*i), margin+padding);
        canvasContext.lineTo(margin+padding+(scaleFactor*i), height-margin-padding);
        canvasContext.stroke();
    }

    for (i=1; i<21; i++){
        canvasContext.moveTo(margin+padding, margin+padding+(scaleFactor*i));
        canvasContext.lineTo(width-margin-padding, margin+padding+(scaleFactor*i));
        canvasContext.stroke();
    }

    canvasContext.closePath();
    //close and begin path, due to unusual behaviour
    canvasContext.beginPath(); 


    canvasContext.globalCompositeOperation = 'screen';

    canvasContext.fillStyle = "#F9BABA";
    canvasContext.fillRect(0+margin+padding, 0+margin+padding, xaxis-margin-padding, yaxis-margin-padding);
    canvasContext.fillStyle = "#C8E4BC";
    canvasContext.fillRect(margin+padding, yaxis, xaxis-margin-padding, yaxis-margin-padding);
    canvasContext.fillStyle = "#92D9F8";
    canvasContext.fillRect(xaxis, margin+padding, xaxis-margin-padding, yaxis-margin-padding);
    canvasContext.fillStyle = "#E1C6DF";
    canvasContext.fillRect(xaxis, yaxis, xaxis-margin-padding, yaxis-margin-padding);






    canvasContext.strokeStyle = "black";
    canvasContext.fillStyle = "black";




    canvasContext.globalCompositeOperation = 'source-over';

    canvasContext.lineWidth = 1;

    canvasContext.moveTo(0-arrowlen+margin, yaxis);
    canvasContext.lineTo(0+margin, yaxis+arrowwidth);
    canvasContext.lineTo(0+margin, yaxis-arrowwidth);
    canvasContext.fill();

    canvasContext.moveTo(width+arrowlen-margin, yaxis);
    canvasContext.lineTo(width-margin, yaxis+arrowwidth);
    canvasContext.lineTo(width-margin, yaxis-arrowwidth);
    canvasContext.fill();

    canvasContext.moveTo(0+margin, yaxis);
    canvasContext.lineTo(width-margin, yaxis);
    canvasContext.stroke();

    canvasContext.moveTo(xaxis, 0-arrowlen+margin);
    canvasContext.lineTo(xaxis+arrowwidth, 0+margin);
    canvasContext.lineTo(xaxis-arrowwidth, 0+margin);
    canvasContext.fill();

    canvasContext.moveTo(xaxis, height+arrowlen-margin);
    canvasContext.lineTo(xaxis+arrowwidth, height-margin);
    canvasContext.lineTo(xaxis-arrowwidth, height-margin);
    canvasContext.fill();

    canvasContext.moveTo(xaxis, 0+margin);
    canvasContext.lineTo(xaxis, height-margin);
    canvasContext.stroke();





    

    label(70, yaxis+20, "#83C368", "-economic", "0.7");
    label(xaxis, height-56, "#B777B3", "-auth", "0.7");
    label(width-170, yaxis-10, "#27B5F1", "+economic", "0.7");
    label(xaxis-60, 70, "#EF4747", "+auth", "0.7");
}


function dot(x, y){
    canvasContext.strokeStyle = "black";
    canvasContext.fillStyle = "black";

    canvasContext.beginPath(); 
    canvasContext.arc(x, y, 1, 0, 2*Math.PI);
    canvasContext.fill();
    canvasContext.stroke();

    console.log("drew dot at pos "+x+", "+y);
}

function labelledDot(xscale, yscale, label){
    canvasContext.strokeStyle = "black";
    canvasContext.fillStyle = "black";
    canvasContext.font = "0.8rem calibri";

    nominalX= xscale*scaleFactor;
    nominalY= yscale*scaleFactor;

    canvasContext.beginPath(); 
    canvasContext.arc((width/2)+nominalX, (height/2)-nominalY, 3, 0, 2*Math.PI);
    canvasContext.fill();
    canvasContext.fillText(label, (width/2)+nominalX+4, (height/2)-nominalY+4);

    console.log("drew dot with pos x: "+nominalX+" y: "+nominalY+" with label "+label);

}

function label(x, y, col, label, size){
    canvasContext.fillStyle = col;
    canvasContext.font = '"'+size+'rem calibri';

    canvasContext.beginPath(); 
    canvasContext.fillText(label, x, y);
    console.log("wrote label "+label+" at coords "+x,y);
}

//head values: 1, 2, yes, no
function arrow(x1, y1, x2, y2, head){
    canvasContext.lineWidth = 1;
    canvasContext.beginPath(); 



}

function arrowhead(){



}