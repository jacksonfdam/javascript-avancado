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
Request.addEventListener("progress", updateProgress, false);
Request.addEventListener("load", transferComplete, false);
Request.addEventListener("error", transferFailed, false);
Request.addEventListener("abort", transferCanceled, false);

Request.open("get", siteUrl + "welcome.txt", true);
Request.send();


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
