
function sendTextNew(txt) {
  var Request = new XMLHttpRequest();
  Request.open('POST', siteUrl, true);
  Request.responseType = 'text';
  Request.onload = function(e) {
    if (this.status == 200) {
      console.log(this.response);
    }
  };
  Request.send(txt);
}

sendText2('test string');

function sendForm() {
  var formData = new FormData();
  formData.append('username', 'johndoe');
  formData.append('id', 123456);

  var Request = new XMLHttpRequest();
  Request.open('POST', siteUrl, true);
  Request.responseType = 'text';
  Request.onload = function(e) {
    if (this.status == 200) {
      console.log(this.response);
    }
  };

  Request.send(formData);
}
