var $ = require('jquery');
var {Login} = require("graphenejs-lib");
var $result = $('#result').hide();
var $pwdlengthwarning = $("#pwdlengthwarning").hide();
var prefix = "STM";

import QRCode from 'qrcode';
let qrcodedraw = new QRCode.QRCodeDraw();

function verifyPasswordLength(w) {
 console.log(w);
 console.log(w.length);
 if (w.length >= 16) {
  $pwdlengthwarning.hide();
  return true;
 } else {
  $pwdlengthwarning.show();
  $result.hide();
  return false;
 }
}

$('input[name=password]').keypress(function() {
 var name = $('input[name=name]').val();
 var passwod = $('input[name=password]').val();
 if (!verifyPasswordLength(passwod) || !name) {
  return;
 }
 $result.hide();
 var p = Login.generateKeys(name, passwod, ["owner", "active", "posting", "memo"], prefix);
 $('#owner_key').text(p["pubKeys"]["owner"]);
 $('#active_key').text(p["pubKeys"]["active"]);
 $('#posting_key').text(p["pubKeys"]["posting"]);
 $('#memo_key').text(p["pubKeys"]["memo"]);
 qrcodedraw.draw(document.getElementById("owner_pub"), p["pubKeys"]["owner"], function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById("active_pub"), p["pubKeys"]["active"], function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById("posting_pub"), p["pubKeys"]["posting"], function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById("memo_pub"), p["pubKeys"]["memo"], function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });

 $('#owner_pkey').text(p["privKeys"]["owner"].toWif());
 $('#active_pkey').text(p["privKeys"]["active"].toWif());
 $('#posting_pkey').text(p["privKeys"]["posting"].toWif());
 $('#memo_pkey').text(p["privKeys"]["memo"].toWif());
 qrcodedraw.draw(document.getElementById("owner_wif"), p["privKeys"]["owner"].toWif(), function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById("active_wif"), p["privKeys"]["active"].toWif(), function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById("posting_wif"), p["privKeys"]["posting"].toWif(), function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });
 qrcodedraw.draw(document.getElementById("memo_wif"), p["privKeys"]["memo"].toWif(), function(error,canvas){
   if(error){ return console.log('Error =( ', error); }
 });

 $result.show();
});
