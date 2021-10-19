// Load header.html
var ajax = new XMLHttpRequest();
ajax.open("GET", "/module/header.html", false);
ajax.send();
document.body.innerHTML += ajax.responseText;


// Adjust header objects
let menuBoxColor = ["--menu-box-color", [46, 134, 175, 0.3]];

let root = document.documentElement;
let items = document.getElementsByClassName("box menu");

document.onmousemove = mouseMoveHandler;

function init() {
    setColor(menuBoxColor[0], menuBoxColor[1]);

    console.log("Header loaded.")
}

function setColor(property, color) {
    var _color = ""
    for(let i = 0; i < color.length; i++) {
        _color = _color + String(color[i]) + ",";
    }
    _color = _color.substring(1,_color.length-1);
    if (color.length > 3) { var prefix = "rgba" }
    else { var prefix = "rgb" }
    root.style.setProperty(property, prefix+"("+_color+")");
}

function mouseMoveHandler(event) {
    let distance = 300;
    var x = event.pageX;

    if(x <= distance) {
        menuBoxColor[1][3] = 1.3-(x/distance);
        setColor(menuBoxColor[0], menuBoxColor[1]);
    }
    else if (x > distance && menuBoxColor[1][3] != 0.3) {
        menuBoxColor[1][3] = 0.3;
        setColor(menuBoxColor[0], menuBoxColor[1]);
    }
}

init();