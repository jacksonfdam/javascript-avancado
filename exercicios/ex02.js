function reqListener () {
  console.log(this.responseText);
};

var Request = new XMLHttpRequest();
Request.onload = reqListener;
Request.onreadystatechange = function() {
  console.log('readyStatechange:  ' + Request.readyState);
};
console.log('Before open: ' + Request.readyState);

Request.open("get", siteUrl + "welcome.txt", true);
Request.send();

console.log('After send: ' + Request.readyState);