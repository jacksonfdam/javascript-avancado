
if (!!window.EventSource) {
   var source = new EventSource(siteUrl+"sse.php");
   source.onmessage = function(event) {
    document.getElementById("result").innerHTML += event.data + "<br>";
};


source.addEventListener('message', function(e) {
  console.log(e.data);
}, false);

source.addEventListener('open', function(e) {
  // Connection was opened.
}, false);

source.addEventListener('error', function(e) {
  if (e.readyState == EventSource.CLOSED) {
    // Connection was closed.
}
}, false);


} else {
  // Result to xhr polling :(
}


//source.close();

