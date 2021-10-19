

var ajax = new XMLHttpRequest();
ajax.open("GET", "/module/footer.html", false);
ajax.send();
document.body.innerHTML += ajax.responseText;

console.log("Footer loaded.");