var converter = require("written-number");
/**
 * Convierte un número de tipo Number a palabras
 * @returns {string} retorna el número en palabras
 * @version 1.1.0 08-ene-2020
 * @author Ivette Fernández - ivettef
 */
const literales = num => {
  converter.defaults.lang = "es";
  numberToWord = converter(num);
  return numberToWord;
};

module.exports = literales;
