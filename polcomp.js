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

const margin= 30;
const padding= 20;
const thickness= 2;

const xaxis= (size/2);
const yaxis= (size/2);

//figure out scaling: (1200-60)/20
var scaleFactor= (1200-100)/20;

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
    canvasContext.clearRect(0, 0, width, height);
    canvasContext.strokeStyle = "black";
    canvasContext.fillStyle = "black";
    console.log("drawing background with dim "+canvasElement.height);
    background();

    if (plotBuffer.length!=0){for (i=0; i<plotBuffer.length; i++){labelledDot((plotBuffer[i].offsetx), (plotBuffer[i].offsety), plotBuffer[i].label)}}

    //labelledDot(xaxis, yaxis, "jy");

}

////////////////////////////////PRIMITIVES////////////////////////////////////
function background(){
    canvasContext.lineWidth = 1;
    canvasContext.font = "1rem calibri";
    canvasContext.beginPath(); 

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



    

    label(70, yaxis+20, "#A6D493", "-economic", "0.7");
    label(xaxis, height-56, "#D7B2D4", "-auth", "0.7");
    label(width-170, yaxis-10, "#5CC7F5", "+economic", "0.7");
    label(xaxis-60, 70, "#F69C9C", "+auth", "0.7");
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

function arrow(x1, y1, x2, y2){
    canvasContext.lineWidth = 1;
    canvasContext.beginPath(); 

    canvasContext.moveTo(x1-arrowlen+margin, y1);
    canvasContext.lineTo(x1+margin, y1+arrowwidth);
    canvasContext.lineTo(x1+margin, y1-arrowwidth);
    canvasContext.fill();

    canvasContext.moveTo(x2+arrowlen-margin, y1);
    canvasContext.lineTo(x2-margin, y1+arrowwidth);
    canvasContext.lineTo(x2-margin, y1-arrowwidth);
    canvasContext.fill();

    canvasContext.moveTo(x1+margin, y1);
    canvasContext.lineTo(x2-margin, y2);
    canvasContext.stroke();



}

function arrowhead(){



}