var darkModeModification = `<style class='dark-mode-mod'>
.navbar-brand img,
.footer-widget img {
    filter: invert(1);
}
</style>`

function toggleDarkMode(newState) {
    if (newState == "on") {
        DarkReader.enable({contrast: 150});
        document.querySelector("div.dark-mode-toggle").firstElementChild.className = "gg-sun";
        document.head.insertAdjacentHTML("beforeend", darkModeModification);
        setCookie("darkmode","on",9999);
    }
    else {
        DarkReader.disable();
        document.querySelector("div.dark-mode-toggle").firstElementChild.className = "gg-moon";
        var cssMod = document.getElementsByClassName("dark-mode-mod")[0];
        if (cssMod) {
            cssMod.parentElement.removeChild(cssMod);
        }
        setCookie("darkmode","off",9999);
    }
}

document.querySelector("div.dark-mode-toggle").addEventListener("click", function () {
    if (document.querySelector(".darkreader")) {
        toggleDarkMode("off");
    }
    else {
        toggleDarkMode("on");
    }
}, false);

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

toggleDarkMode(getCookie("darkmode"));