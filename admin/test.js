// const crypto = require('crypto');
// //AES对称加密
// var secretkey = 'password'; //唯一（公共）秘钥
// function encrypt(a) {
//   var content = a;
//   var cipher = crypto.createCipher('aes192', secretkey); //使用aes192加密
//   var enc = cipher.update(content, 'utf8', 'hex'); //编码方式从utf-8转为hex;
//   return (enc += cipher.final('hex')); //编码方式转为hex;
// }
// // encrypt('花样百出');
// function decrypt() {
//   let enc = encrypt('花样百出');
//   console.log(enc);
//   //AES对称解密
//   var decipher = crypto.createDecipher('aes192', secretkey);
//   var dec = decipher.update(enc, 'hex', 'utf8');
//   dec += decipher.final('utf8');
//   console.log('AES对称解密结果：' + dec);
// }
// decrypt();