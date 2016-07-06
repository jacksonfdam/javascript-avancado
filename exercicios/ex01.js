function reqListener () {
  console.log(this.responseText);
};

var Request = new XMLHttpRequest();
Request.onload = reqListener;
Request.open("get", siteUrl + "welcome.txt", true);
Request.send();