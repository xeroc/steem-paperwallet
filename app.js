var $ = require('jquery');
var {Login} = require("graphenejs-lib");
var $result = $('.result').hide();
var $pwdlengthwarning = $("#pwdlengthwarning").hide();
var $pwdmismatchWarning = $("#pwdmismatchhwarning").hide();
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

window.$ = $;
function verifyPasswordMatch(password, passwordConfirm) {
 if (password != passwordConfirm) {
  $pwdmismatchWarning.show();
  $result.hide();
  return false;
 } else {
  $pwdmismatchWarning.hide();
  return true;
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

function processKeyPress() {
 var name = $('input[name=name]').val();
 var password = $('input[name=password]').val();
 var passwordConfirm = $('input[name=passwordConfirm]').val();
 $('#printplainpassword').text(password);

 if (!verifyPasswordLength(password) || !name) {
  return;
 }
 if (!verifyPasswordMatch(password, passwordConfirm)) {
  return;
 }
 $result.hide();
 var p = Login.generateKeys(name, password, ["owner", "active", "posting", "memo"], prefix);
 processKey(p, "owner");
 processKey(p, "active");
 processKey(p, "posting");
 processKey(p, "memo");
 $result.show();
}

$('input[name=name]').keyup(processKeyPress);
$('input[name=password]').keyup(processKeyPress);
$('input[name=passwordConfirm]').keyup(processKeyPress);

$(".glyphicon-eye-open").mousedown(function(){
 $(this).prev().attr('type','text');
}).mouseup(function(){
 $(this).prev().attr('type','password');
}).mouseout(function(){
 $(this).prev().attr('type','password');
});

$("#printBtn").click(function() {
 $("#printpassword").hide();
 $("#printpassword").removeClass("visible-print-block");
 javascript:window.print();
 return false;
});

$("#printWithPWdBtn").click(function() {
 $("#printpassword").show();
 $("#printpassword").addClass("visible-print-block");
 window.print();
 return false;
});
