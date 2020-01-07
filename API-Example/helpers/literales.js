var converter = require("written-number");

const literales = num => {
  converter.defaults.lang = "es";
  numberToWord = converter(num);
  return numberToWord;
};

module.exports = literales;
