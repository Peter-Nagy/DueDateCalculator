const MONDAY = 1;
const FRIDAY = 5;
const FIRST_WORKING_HOUR = 9;
const LAST_WORKING_HOUR = 17;

function isDate(date) {
  return date && date instanceof Date;
}

function isDateInWorkingHours(date) {
  const hours = date.getHours();
  return hours >= FIRST_WORKING_HOUR && hours <= LAST_WORKING_HOUR;
}

function isDateWorkday(date) {
  const day = date.getDay();
  return day >= MONDAY && day <= FRIDAY;
}

function isNumber(number) {
  return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
}

module.exports = {
  isDate,
  isDateInWorkingHours,
  isDateWorkday,
  isNumber,
};
