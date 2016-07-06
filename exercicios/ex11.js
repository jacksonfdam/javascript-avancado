if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.

    // Store
    localStorage.setItem("curso1", "Javascript básico");
    localStorage.setItem("curso2", "Javascript Avançado");
    localStorage.removeItem("curso2");
    // Retrieve
    document.getElementById("result").innerHTML += "<br/>" + localStorage.getItem("curso1");

    if (localStorage.clickcount) {
    	localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
    	localStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML += "<br/>" + "You have clicked the button " +
    localStorage.clickcount + " time(s).";

    if (sessionStorage.clickcount) {
    	sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
    } else {
    	sessionStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML += "<br/>" + "You have clicked the button " +
    sessionStorage.clickcount + " time(s) in this session.";

} else {
    // Sorry! No Web Storage support..
}


