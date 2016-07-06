window.addEventListener('load', function() {
  var status = document.getElementById("status");

  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";

    status.className = condition;
    status.innerHTML = condition.toUpperCase();

    log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

/*
window.localStorage and window.sessionStorage {
  long length; // Number of items stored
  string key(long index); // Name of the key at index
  string getItem(string key); // Get value of the key
  void setItem(string key, string data); // Add a new key with value data
  void removeItem(string key); // Remove the item key
  void clear(); // Clear the storage
};
*/

// save the string
function saveStatusLocally(txt) {
  window.localStorage.setItem("status", txt);
}
 
// read the string
function readStatus() {
   return window.localStorage.getItem("status");
}


function whatIsYourCurrentStatus() {
  var status = window.prompt("What is your current status?");
  if (!status) return;
  if (navigator.onLine) {
    sendToServer(status);
  } else {
    saveStatusLocally(status);
  }
}
 
function sendLocalStatus() {
  var status = readStatus();
  if (status) {
    sendToServer(status);
    window.localStorage.removeItem("status");
  }
}
 
 
window.addEventListener("load", function() {
   if (navigator.onLine) {
     sendLocalStatus();
   }
}, true);
 
window.addEventListener("online", function() {
  sendLocalStatus();
}, true);
 
window.addEventListener("offline", function() {
  alert("You're now offline. If you update your status, it will be sent when you go back online");
}, true);