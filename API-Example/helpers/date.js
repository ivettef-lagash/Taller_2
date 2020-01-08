var calculateFullAge = require("full-age-calculator");
/**
 * Calcula la edad dada una determinada fecha
 * @param {Date} date: 1995-12-03
 * @returns {Number} retorna solo la cantidad de años calculada
 * @version 1.1.0 08-ene-2020
 * @author Ivette Fernández - ivettef
 */
const Age = date => {
  age = calculateFullAge.getFullAge(date);
  return age.years;
};

/**
 * Calcula la fecha actual en formato dd-mm-yyyy
 * @returns {string} retorna la fecha del día actual en formato dd-mm-yyyy
 * @version 1.1.0 08-ene-2020
 * @author Ivette Fernández - ivettef
 */

const Dates = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  var today = `${dd}-${mm}-${yyyy}`;
  return today;
};

module.exports = { Age, Dates };
