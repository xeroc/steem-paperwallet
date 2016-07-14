var $ = require('jquery');
var {Login} = require("graphenejs-lib");
var $result = $('#result').hide();
var $pwdlengthwarning = $("#pwdlengthwarning").hide();
var prefix = "STM";

import QRCode from 'qrcode';
let qrcodedraw = new QRCode.QRCodeDraw();

function verifyPasswordLength(w) {
 if (w.length >= 16) {
  $pwdlengthwarning.hide();
  return true;
 } else {
  $pwdlengthwarning.show();
  $result.hide();
  return false;
 }
}

function processKey(p, type) {
 $('#' + type + '_key').text(p["pubKeys"][type]);
 $('#' + type + '_pkey').text(p["privKeys"][type].toWif());
 qrcodedraw.draw(document.getElementById(type + "_pub"), p["pubKeys"][type], function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById(type + "_wif"), p["privKeys"][type].toWif(), function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
}

$('input[name=password]').keypress(function() {
 var name = $('input[name=name]').val();
 var passwod = $('input[name=password]').val();
 if (!verifyPasswordLength(passwod) || !name) {
  return;
 }
 $result.hide();
 var p = Login.generateKeys(name, passwod, ["owner", "active", "posting", "memo"], prefix);
 processKey(p, "owner")
 processKey(p, "active")
 processKey(p, "posting")
 processKey(p, "memo")
 $result.show();
});
