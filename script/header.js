// INJECT HTML INTO PAGE
var ajax = new XMLHttpRequest();
ajax.open("GET", "/module/header.html", false);
ajax.send();
document.body.innerHTML += ajax.responseText;



// CSS VARIABLES
let menuBoxColor = ["--menu-box-color","rgba",[46, 134, 175, 0.5]];
let headerSize = ["--header-size","px",80];
//let sideHeaderOffset = ["--side-header-offset","px",0];



// ANIMAITONS
var headerOpenAnim = [sideHeaderOffset[0],-headerSize[2],0,0.2,"px"];
var headerCloseAnim = [sideHeaderOffset[0],0,-headerSize[2],0.2,"px"];



// DOM
let rootDOM = document.documentElement;
let htmlDOM = document.getElementById("html");
let sideHeaderDOM = document.getElementById("side-header");

htmlDOM.onmousemove = mouseMoveHandler;
htmlDOM.onmouseleave = screenLostFocus;
htmlDOM.onmouseenter = screenRefocus;
document.getElementById("body").onresize = screenResize;


// GLOBAL DECLARES
var headerOpen = false;
var animationActive = false;
var animationCache = [];



function init() {
    setStyle(menuBoxColor);
    updateHeaderSize();
    console.log("Header loaded.")
}


/*
function animate([property, start, end, delay, type]) {
    animationCache.push([property, start, end, delay, type]);

    if(!animationActive) {
        animationActive = true;
        var stage = start;

        var diff;
        if(start > end) {diff = start-end}
        else {diff = end-start}

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
            },((delay*1000)/100)*i);
        }
    }
}

function checkAnimCache(item) {
    for(i=0; i < animationCache.length; i++) {
        if(JSON.stringify(animationCache[i]) == JSON.stringify(item)) { return item, i; }
    } return null;
}
*/



function setStyle([property, type, value]) {
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

function mouseMoveHandler(event) {
    let distance = headerSize[2]*2;
    var x = event.pageX;
    
    if(x <= distance && !headerOpen && checkAnimCache(headerOpenAnim) == null) {
        headerOpen = true;
        //animate(headerOpenAnim);
        sideHeaderDOM.style.animationName="openSideHeader";
    }
    else if(x > distance && headerOpen && checkAnimCache(headerCloseAnim) == null) {
        headerOpen = false;
        //animate(headerCloseAnim);
        sideHeaderDOM.style.animationName="closeSideHeader";
    }
}



var screenFocusState;
function screenLostFocus() {
    screenFocusState = false;

    if(headerOpen) {
        setTimeout(function(){
            if(!screenFocusState) {
                headerOpen = false;
        //animate(headerCloseAnim);
        sideHeaderDOM.style.animationName="closeSideHeader";
            }
        }, 1000);
    }
}



function updateHeaderSize() {
    let width = screen.availWidth;
    let adjust = [
        [500,110],
        [1000,100],
        [1500,80]
    ];

    let pos;
    let distance;
    let checkDist;
    for(i=0; i < adjust.length; i++) {
        
        if(width > adjust[i][0]) {
            checkDist = width-adjust[i][0];
        }
        else if (width < adjust[i][0]) {
            checkDist = adjust[i][0]-width;
        }
        else if (width == adjust[i][0]) {
            pos = i;
            break
        }
        if(distance == null || checkDist < distance) { 
            distance = checkDist; 
            pos = i;
        };
    }
    console.log("SHORTEST", adjust[pos]);
    
    headerSize[2] = adjust[pos][1];
    setStyle(headerSize);
}




function screenRefocus() {
    screenFocusState = true;
}



function screenResize() {
    updateHeaderSize();
}



function gamesBtn() {
    console.log("click");
}



function gamesBtnHover() {
    console.log("hover");
}



init();
// EOF