function reqListener () {
  console.log(this.responseText);
};

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

Request.open("get", siteUrl + "welcome.txt", true);
Request.send();
