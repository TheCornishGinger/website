// Load header.html
var ajax = new XMLHttpRequest();
ajax.open("GET", "/module/header.html", false);
ajax.send();
document.body.innerHTML += ajax.responseText;


// Adjust header objects
let menuBoxColor = ["--menu-box-color","rgba",[46, 134, 175, 0.5]];
let headerSize = ["--header-size","vw",10];
let sideHeaderOffset = ["--side-header-offset","px",0];

let root = document.documentElement;
let items = document.getElementsByClassName("box menu");

document.onmousemove = mouseMoveHandler;

function init() {
    setStyle(menuBoxColor);
    setStyle(headerSize);
    setStyle([sideHeaderOffset[0],headerSize[1],-headerSize[2]]);

    console.log("Header loaded.")
}

var animationActive = false;
var animationCache = [];
function animate(property, start, end, delay, type) {
    console.log(property, start, end, delay, type);
    if(!animationActive) {
        console.log("started");
        animationActive = true;
        delay = delay*1000;

        var diff;
        if(start > end) {diff = start-end}
        else {diff = end-start}

        var stage = start;
        for(i=0; i < diff; i++) {
            setTimeout(function() {
                if(start < end) { stage++; }
                if(stage > end) { stage--; }
                setStyle([property, type, stage])
                if(stage == end) {
                    console.log("finished");
                    animationActive = false;
                    if(animationCache.length > 0) {
                        console.log("run cache");
                        var item = animationCache.pop();
                        console.log(item);
                        animate(item);
                    }
                }
            },(delay/100)*i);
        }
    }
    else {
        animationCache.push([property, start, end, delay, type]);
        console.log("cached");
    }
}

function setStyle([property, type, value]) {
    //console.log(property, type, value);
    if(type == "rgb" || type == "rgba") {
        let _color = ""
        for(let i = 0; i < value.length; i++) {
            _color = _color + String(value[i]) + ",";
        }
        _color = _color.substring(1,_color.length-1);
        value = type+"("+_color+")";
    }
    else {
        value = String(value)+type;
    }
    root.style.setProperty(property, value);
}

var headerReset = false;
function mouseMoveHandler(event) {
    let distance = window.screen.width / 10;
    var x = event.pageX;
    if(x <= distance && !headerReset) {
        headerReset = true;
        //let offset = sideHeaderOffset[2] + -x;
        //setStyle([sideHeaderOffset[0], sideHeaderOffset[1], offset]);
        animate(sideHeaderOffset[0],-headerSize[2],0,5,"vw");
    }
    else if (x > distance && headerReset) {
        //setStyle(sideHeaderOffset);
        animate(sideHeaderOffset[0],0,-headerSize[2],5,"vw");
        headerReset = false;
    }
}

init();