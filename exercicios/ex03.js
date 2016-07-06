function reqListener () {
  console.log(this.responseText);
};

var Request = new XMLHttpRequest();
Request.responseType = 'arraybuffer';
Request.onload = function() {
  console.log(Request.response);
  console.log(Request.response.byteLength);
};

Request.open("get", siteUrl + "welcome.txt", true);
Request.send();