// GLOBAL PAGE INIT
let pageInitVar;
let initList = [
    ["init",false],
    ["header",false]
];

function isTouchDevice() {
    if(window.matchMedia("(pointer: coarse)").matches) {
        return true;
    }
    return false;
}

function initDone() {
    return pageInitVar;
}

function addInit(item) {
    let result;
    for(i=0; i < initList.length; i++) {
        if(initList[i][0] == item) {
            initList[i][1] = true;
            result = true;
        }
        if(!initList[i][1]) {
            result = false;
            break;
        }
    }
    console.log("addInit()",item);
    if(result) {
        console.log("Init complete");
        if(isTouchDevice() || screen.width < 1000) { document.getElementsByClassName("page-wrap-inner")[0].style.maxWidth = "95%"; }
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementById("content").style.visibility = "visible";
        pageInitVar = true;
    }
}


// LOCAL
let loadScripts = function(scripts) { 
    for(i=0; i < scripts.length; i++) {
        let scriptObj = document.createElement("script");
        scriptObj.setAttribute("src","/script/"+scripts[i]+".js");
        document.body.append(scriptObj);
    }
}

let loadStyles = function(styles) {
    for(i=0; i < styles.length; i++) {
        let styleObj = document.createElement("link");
        styleObj.setAttribute("rel","stylesheet");
        styleObj.setAttribute("href","/style/"+styles[i]+".css");
        document.head.append(styleObj);
    }
}

let getTags = function(tags) {
    let findTags = document.getElementsByTagName("script");
    let returnTags = [];
    for(i=0; i < findTags.length; i++) {
        for(x=0; x < tags.length; x++) {
            if(findTags[i].hasAttribute(tags[x])) { returnTags.push(findTags[i].getAttribute(tags[x])); }
        }
    }
    return returnTags;
}

let setTitle = function(title) {
    let titleObj = document.createElement("title");
    titleObj.textContent = "TCG - "+title;
    document.head.append(titleObj);
}



// INIT
window.onload = function() {
    let tags = getTags(["title","stylesheet"]);

    setTitle(tags[0]);

    loadScripts(["header"]);
    loadStyles([tags[1]]);

    addInit("init");
}