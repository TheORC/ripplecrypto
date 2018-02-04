
var cookieString = decodeURIComponent(document.cookie);
var cookies = cookieString.split(";");

var data;

cookies.forEach(cookie => {
    cookie = cookie.trim();
    var parts = cookie.split("=");

    if(parts.length == 2){
        if(parts[0]="data"){
            data = JSON.parse(parts[1]);
        }
    }
});

if(data == null){
    data = {}
    data.night = false;
}

updateTheme();

document.getElementById("dark").onclick = function() {
    data.night = !data.night;
    updateTheme();
}

// This code is clunky and oddly specific (shouldn't grab and change individual elements)
function updateTheme(){
    if (!data.night) {
        saveCookies()
        document.body.style.backgroundColor = "white";

        //document.getElementById("myImg").style.filter = "brightness(60%)";
        document.getElementById("head").style.borderBottom = "solid rgba(255, 255, 255, 0.6) .5px";

    } else if (data.night) {
        saveCookies();
        document.body.style.backgroundColor = "#2e3044";

        //document.getElementById("myImg").style.filter = "brightness(100%)";
        document.getElementById("head").style.borderBottom = "solid rgba(0, 0, 0, 0.6) .5px";
    }
}

function saveCookies(){
    document.cookie = "data=" + JSON.stringify(data);
}
