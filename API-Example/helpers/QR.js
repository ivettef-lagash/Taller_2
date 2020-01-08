var qr = require("qr-image");
/**
 * Función que genera código QR con dirección a un link
 * @returns imágen QR
 * @version 1.2.0 08-ene-2020
 * @author Ivette Fernández - ivettef
 */
const QR = () => {
  var url = "http://30804e07.ngrok.io";
  var code = qr.image(url);
  return code;
};

module.exports = QR;
