var printHash = function() {
	console.log("'" + window.location.hash + "'");
	console.log(window.location.host);
	console.log(window.location.hostname);
	console.log(window.location.origin);
	console.log(window.location.password);
	console.log(window.location.pathname);
	console.log("'" + window.location.port + "'");
	console.log(window.location.protocol);
	console.log("'" + window.location.search + "'");
	console.log(window.location.username);

};

printHash();

window.onhashchange = printHash;

function reqListener () {
	console.log(this.responseText);
};


console.log('current href: ' + window.location.href);

var goHome = function() {
	window.location.href = siteUrl;
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


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var callback = function(time) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(10, 10, 30 * (Math.sin(time / 1000) + 1), 30);
	context.fillText(time, 10, 75);

	requestAnimationFrame(callback);
};

requestAnimationFrame(callback);


var callCount = 0;

var handle = setInterval(function(parameter1, parameter2) {
	console.log('in callback count=' + callCount);
	console.log('  parameter1=' + parameter1);
	console.log('  parameter2=' + parameter2);

	callCount++;
	if (callCount === 5) {
		clearInterval(handle);
	}
}, 500, 'foo', 'bar');

var handle = setTimeout(function(parameter1, parameter2) {
    console.log('in callback');
    console.log('  parameter1=' + parameter1);
    console.log('  parameter2=' + parameter2);
  }, 1000, 'foo', 'bar');
  console.log('after setTimeout');
