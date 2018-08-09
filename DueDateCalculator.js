const {
  isDate,
  isDateInWorkingHours,
  isDateWorkday,
  isNumber,
} = require('./utils/validation');

const {
  turnaroundDays,
} = require('./utils/date');

const MS_IN_AN_HOUR = 60 * 60 * 1000;
const MS_IN_A_DAY = MS_IN_AN_HOUR * 24;
const WORKDAY_LENGTH = 8;

function CalculateDueDate(submitDate, turnaround) {
  if (!isDate(submitDate)) {
    throw new Error('Invalid input: submitTime is not a date!');
  }
  if (!isDateInWorkingHours(submitDate)) {
    throw new Error('Date is not in working hours!');
  }
  if (!isDateWorkday(submitDate)) {
    throw new Error('Date is not a workday!');
  }
  if (!isNumber(turnaround)) {
    throw new Error('Invalid input: turnaround time is not a number!');
  }
  if (turnaround < 0) {
    throw new Error('Invalid input: turnaround time is negative!');
  }

  let daysToAdd = turnaroundDays(turnaround);
  const remainingHours = turnaround - daysToAdd * WORKDAY_LENGTH;
  let dueDate = new Date(submitDate.getTime());

  while (daysToAdd > 0) {
    dueDate = new Date(dueDate.getTime() + MS_IN_A_DAY);
    if (isDateWorkday(dueDate)) {
      daysToAdd -= 1;
    }
  }

  return new Date(dueDate.getTime() + (remainingHours * MS_IN_AN_HOUR));
}

module.exports = {
  CalculateDueDate,
};
