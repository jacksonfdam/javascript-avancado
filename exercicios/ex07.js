var Request = new XMLHttpRequest();
Request.responseType = 'arraybuffer';
Request.onload = function() {
	console.log(Request.response);
	console.log(Request.response.byteLength);
	console.log(Request.response.responseType );
	console.log(Request.responseType );
	console.log(Request.statusText );
	console.log(Request.status);
	console.log(Request.getAllResponseHeaders());
	console.log(Request.getResponseHeader('content-type'));
};

var formData = new FormData();
/*
OU

var formData = new FormData(someFormElement);

var formElement = document.getElementById("myFormElement");
Request.open("POST", siteUrl);
Request.send(new FormData(formElement));
Request.setRequestHeader("Content-type","application/xml");  // or "application/json"

OU 

Request.setRequestHeader("X-Parse-Application-Id", "your application id");
Request.setRequestHeader("X-Parse-REST-API-Key", "your REST API key");
Request.setRequestHeader("Content-Type", "application/json");

*/
formData.append("username", "Groucho");
formData.append("accountnum", 123456);

// HTML file input user's choice...
//formData.append("userfile", fileInputElement.files[0]);

var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
var blob = new Blob([content], { type: "text/xml"});

formData.append("webmasterfile", blob);



Request.addEventListener("progress", updateProgress, false);
Request.addEventListener("load", transferComplete, false);
Request.addEventListener("error", transferFailed, false);
Request.addEventListener("abort", transferCanceled, false);

Request.open("POST", siteUrl, true);
Request.send(formData);


function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    console.log(percentComplete + '%');
  } else {
    console.log('Unable to compute progress information since the total size is unknown');
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}
