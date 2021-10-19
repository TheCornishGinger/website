// INJECT HTML INTO PAGE
var ajax = new XMLHttpRequest();
ajax.open("GET", "/module/header.html", false);
ajax.send();
document.body.innerHTML += ajax.responseText;



// CSS VARIABLES
let menuBoxColor = ["--menu-box-color","rgba",[46, 134, 175, 0.5]];
let headerSize = ["--header-size","vw",10];
let sideHeaderOffset = ["--side-header-offset","px",0];



// ANIMAITONS
var headerOpenAnim = [sideHeaderOffset[0],-headerSize[2],0,1,"vw"];
var headerCloseAnim = [sideHeaderOffset[0],0,-headerSize[2],1,"vw"];



// DOM
let root = document.documentElement;
document.onmousemove = mouseMoveHandler;
document.getElementById("html").onmouseleave = screenLostFocus;




function init() {
    setStyle(menuBoxColor);
    setStyle(headerSize);
    setStyle([sideHeaderOffset[0],headerSize[1],-headerSize[2]]);

    console.log("Header loaded.")
}


// ANIMAITON
var animationActive = false;
var animationCache = [];
function animate([property, start, end, delay, type]) {
    //console.log(property, start, end, delay, type);

    animationCache.push([property, start, end, delay, type]);
    //console.log("cached", [property, start, end, delay, type]);

    if(!animationActive) {
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
                    var item, pos = checkAnimCache([property, start, end, delay, type]);
                    animationCache.splice(pos,1);
                    animationActive = false;
                    if(animationCache.length > 0) {
                        animate(animationCache.pop());
                    }
                }
            },(delay/100)*i);
        }
    }
}

function checkAnimCache(item) {
    //console.log("check",item);
    for(i=0; i < animationCache.length; i++) {
        if(JSON.stringify(animationCache[i]) == JSON.stringify(item)) {
            //console.log("found");
            return item, i;
        }
    }
    return null;
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

var headerOpen = false;
function mouseMoveHandler(event) {
    let distance = window.screen.width / 10;
    var x = event.pageX;
    
    if(x <= distance && !headerOpen) {
        
        if(checkAnimCache(headerOpenAnim) == null) {
            headerOpen = true;
            animate(headerOpenAnim);
        }
    }
    else if(x > distance && headerOpen) {
        
        if(checkAnimCache(headerCloseAnim) == null) {
            headerOpen = false;
            animate(headerCloseAnim);
        }
    }
}

function screenLostFocus() {
    if(headerOpen) { //close header when mouse leaves page
        headerOpen = false;
        animate(headerCloseAnim);
    }
}

function gamesBtn() {
    console.log("click");
}

function gamesBtnHover() {
    console.log("hover");
}

init();