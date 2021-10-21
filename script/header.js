// ADD HTML
var ajax = new XMLHttpRequest();
ajax.open("GET", "/module/header.html", false);
ajax.send();
ajax.onload = function() {
    if(ajax.readyState == 4 && ajax.status == 200) {
        console.log(ajax.responseText);
    }
    else {
        console.error(ajax.statusText);
    }
}
document.getElementById("content").innerHTML = ajax.responseText + document.getElementById("content").innerHTML;



// DOM
let rootDOM = document.documentElement;
let htmlDOM = document.getElementsByTagName("html")[0];
let sideHeaderDOM = document.getElementById("side-header");

let menuBtnDOM = document.getElementById("menu-btn");
let menuBtnWrapClosedDOM = document.getElementById("menu-btn-wrap-closed");
let menuBtnWrapOpenDOM = document.getElementById("menu-btn-wrap-open");
let menuBtnOpenDOM = document.getElementsByClassName("menu-btn-open");
let menuBtnClosedDOM = document.getElementsByClassName("menu-btn-closed");



// GLOBAL VARS
let headerOpen = false;
let headerSize;
let menuBtnAnimDelay;
let screenAdjust = [
    [350,140],
    [400,130],
    [450,120],
    [500,110],
    [1000,100],
    [1500,80],
];
let menuButtons = [
    ["games","www.google.com"],
    ["projects","www.bing.com"],
]



let setStyle = function(property, type, value) {
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
    rootDOM.style.setProperty(property, value);
}



htmlDOM.onmousemove = function(event) {
    if (initDone() && !isTouchDevice()) {
        let distance = headerSize*2;
        var x = event.pageX;
        if(x <= distance && !headerOpen) {
            headerOpen = true;
            sideHeaderDOM.style.animationName="openSideHeader";
        }
        else if(x > distance && headerOpen) {
            headerOpen = false;
            sideHeaderDOM.style.animationName="closeSideHeader";
        }
    }
}



var screenFocusState;
htmlDOM.onmouseleave = function () {
    if(initDone()) {
        screenFocusState = false;

        if(!isTouchDevice() && headerOpen) {
            setTimeout(function(){
                if(!screenFocusState) {
                    headerOpen = false;
            sideHeaderDOM.style.animationName="closeSideHeader";
                }
            }, 1000);
        }
    }
}



let updateHeaderSize = function() {
    let width = screen.availWidth;
    let pos;
    let distance;
    let checkDist;
    for(i=0; i < screenAdjust.length; i++) {
        
        if(width > screenAdjust[i][0]) {
            checkDist = width-screenAdjust[i][0];
        } 
        else if (width < screenAdjust[i][0]) {
            checkDist = screenAdjust[i][0]-width;
        } 
        else if (width == screenAdjust[i][0]) {
            pos = i;
            break
        }
        if(distance == null || checkDist < distance) { 
            distance = checkDist; 
            pos = i;
        };
    }
    headerSize = screenAdjust[pos][1]
    setStyle("--header-size","px", headerSize);
}




htmlDOM.onmouseenter = function() {
    if(initDone()) { screenFocusState = true; }
}



document.body.onresize = function() {
    if(initDone()) { updateHeaderSize(); }
}



let menuBtnInit = function(delay) {
    menuBtnDOM.style.visibility = "visible";
    menuBtnWrapOpenDOM.style.display = "none";

    menuBtnAnimDelay = delay;
    menuBtnWrapClosedDOM.style.animationDuration=String(delay)+"ms";
    for(i=0; i < menuBtnClosedDOM.length; i++) {
        menuBtnClosedDOM[i].style.animationDuration = String(delay)+"ms";
    }
    for(i=0; i < menuBtnOpenDOM.length; i++) {
        menuBtnOpenDOM[i].style.animationDuration = String(delay)+"ms";
    }
    menuBtnDOM.style.animationDuration = String(delay*3)+"ms";
}


let menuBtn = function() {
    if(!headerOpen) {
        menuBtnDOM.style.animationName = "openMenuBtnColor";
        menuBtnWrapClosedDOM.style.animationName = "openMobileMenuOne";
        menuBtnClosedDOM[0].style.animationName = "openMenuBorderColor";
        menuBtnClosedDOM[1].style.animationName = "openMenuBorderColor";
        menuBtnClosedDOM[2].style.animationName = "openMenuBorderColor";
        setTimeout(function() {
            menuBtnWrapClosedDOM.style.display = "none";
            menuBtnWrapOpenDOM.style.display = "flex";
            menuBtnOpenDOM[0].style.animationName = "openMobileMenuTwo";
            menuBtnOpenDOM[1].style.animationName = "openMobileMenuThree";
            sideHeaderDOM.style.animationName = "openSideHeaderMobile";
        },menuBtnAnimDelay/2);
        headerOpen = true;
    }
    else {
        menuBtnDOM.style.animationName = "closeMenuBtnColor";
        sideHeaderDOM.style.animationName = "closeSideHeaderMobile";
        menuBtnOpenDOM[0].style.animationName = "closeMobileMenuTwo";
        menuBtnOpenDOM[1].style.animationName = "closeMobileMenuThree";
        setTimeout(function() {
            menuBtnClosedDOM[0].style.animationName = "closeMenuBorderColor";
            menuBtnClosedDOM[1].style.animationName = "closeMenuBorderColor";
            menuBtnClosedDOM[2].style.animationName = "closeMenuBorderColor";
            menuBtnWrapOpenDOM.style.display = "none";
            menuBtnWrapClosedDOM.style.display = "flex";
            menuBtnWrapClosedDOM.style.animationName = "closeMobileMenuOne";
        },menuBtnAnimDelay/2);
        headerOpen = false;
    }
}



var buttonHover = function(id) {
    if(initDone()) {
        console.log("hover",id);
    }
}

var buttonPress = function(id) {
    if(initDone()) {
        console.log("press",id);
        window.location.href = "http://www.w3schools.com";
    }
}



//INIT
if(isTouchDevice()) {
    sideHeaderDOM.classList.add("mobile");
    menuBtnInit(500);
}
else {
    menuBtnDOM.style.visibility = "hidden";
}
updateHeaderSize();
addInit("header");



/* DEPRECATED
var animationActive = false;
var animationCache = [];

var headerOpenAnim = [sideHeaderOffset[0],-headerSize[2],0,0.2,"px"];
var headerCloseAnim = [sideHeaderOffset[0],0,-headerSize[2],0.2,"px"];

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