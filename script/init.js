// GLOBAL PAGE INIT
let pageInitVar;
let scripts = ["header"];

function isTouchDevice() {
    if(window.matchMedia("(pointer: coarse)").matches) {
        return true;
    }
    return false;
}

let loadScripts = function() { 
    for(i=0; i < scripts.length; i++) {
        let scriptObj = document.createElement("script");
        scriptObj.setAttribute("src","/script/"+scripts[i]+".js");
        document.body.append(scriptObj);
    }
}

let setTitle = function() {
    let findTitle = document.getElementsByTagName("script");
    for(i=0; i < findTitle.length; i++) {
        //console.log("hi",findTitle[i].hasAttribute("title"));
        if(findTitle[i].hasAttribute("title")) {
            findTitle = findTitle[i].getAttribute("title");
            break
        }
    };
    let titleObj = document.createElement("title");
    titleObj.textContent = "TCG - "+findTitle;
    document.head.append(titleObj);
}

function pageInit() {
    return pageInitVar;
}

window.onload = function() {
    setTitle();
    loadScripts();

    if(isTouchDevice() || screen.width < 1000) {
        document.getElementsByClassName("page-wrap-inner")[0].style.maxWidth = "95%";
    }

    pageInitVar = true;
    console.log("Page loaded.")
}