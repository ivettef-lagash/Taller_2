var calculateFullAge = require("full-age-calculator");

const Age = date => {
  age = calculateFullAge.getFullAge(date);
  return age.years;
};

module.exports = Age;
