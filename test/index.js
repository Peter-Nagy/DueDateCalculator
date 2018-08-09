const { use, expect } = require('chai');
const chaiDateTime = require('chai-datetime');

use(chaiDateTime);

const { calculateDueDate } = require('..');

describe('DueDateCalculator input validation tests', () => {
  const validDate = new Date(2018, 2, 21, 12, 0);
  it('exports a function called calculateDueDate', () => {
    expect(calculateDueDate).to.be.a('function');
  });

  it('throws an error if submitTime is not a date', () => {
    expect(() => calculateDueDate('string')).to.throw('Invalid input: submitTime is not a date!');
  });

  it('throws an error if date is after working hours', () => {
    const evening = new Date(2018, 1, 21, 18, 0);
    expect(() => calculateDueDate(evening)).to.throw('Date is not in working hours!');
  });

  it('throws an error if date is before working hours', () => {
    const morning = new Date(2018, 1, 21, 7, 59);
    expect(() => calculateDueDate(morning)).to.throw('Date is not in working hours!');
  });

  it('throws an error if date is not a workday', () => {
    const weekend = new Date(2018, 1, 24, 12, 0);
    expect(() => calculateDueDate(weekend)).to.throw('Date is not a workday!');
  });

  it('throws an error if turnaround time is not a number', () => {
    expect(() => calculateDueDate(validDate, 'string')).to.throw('Invalid input: turnaround time is not a number!');
  });

  it('throws an error if turnaround is negative', () => {
    expect(() => calculateDueDate(validDate, -1)).to.throw('Invalid input: turnaround time is negative!');
  });
});

describe('DueDateCalculator due date calculating tests', () => {
  const wednesdayNoon = new Date(2018, 7, 8, 12);
  const WORKIND_HOURS_IN_A_DAY = 8;

  it('returns valid date for same day', () => {
    const turnaround = 2;
    const wednesday2PM = new Date(2018, 7, 8, 12 + turnaround);
    const dueDate = calculateDueDate(wednesdayNoon, turnaround);
    expect(dueDate).to.equalTime(wednesday2PM);
  });

  it('returns valid date for next day', () => {
    const turnaround = WORKIND_HOURS_IN_A_DAY;
    const thursday2PM = new Date(2018, 7, 9, 12);
    const dueDate = calculateDueDate(wednesdayNoon, turnaround);
    expect(dueDate).to.equalTime(thursday2PM);
  });

  it('returns valid date for next day if turnaround time is 10', () => {
    const turnaround = WORKIND_HOURS_IN_A_DAY + 2;
    const thursday4PM = new Date(2018, 7, 9, 14);
    const dueDate = calculateDueDate(wednesdayNoon, turnaround);
    expect(dueDate).to.equalTime(thursday4PM);
  });

  it('returns valid date if due date is past a weekend', () => {
    const turnaround = WORKIND_HOURS_IN_A_DAY * 3;
    const submitDate = new Date(2018, 7, 9, 12);
    const dueDate = new Date(2018, 7, 14, 12);
    const calculatedDueDate = calculateDueDate(submitDate, turnaround);
    expect(calculatedDueDate).to.equalTime(dueDate);
  });

  it('returns valid date if due date is past multiple weekends', () => {
    const turnaround = WORKIND_HOURS_IN_A_DAY * 10;
    const submitDate = new Date(2018, 7, 9, 12);
    const dueDate = new Date(2018, 7, 23, 12);
    const calculatedDueDate = calculateDueDate(submitDate, turnaround);
    expect(calculatedDueDate).to.equalTime(dueDate);
  });

  it('returns valid date for lower worktime bounds', () => {
    const submitDate = new Date(2018, 7, 9, 9);
    const dueDate = new Date(2018, 7, 10, 9);
    const calculatedDueDate = calculateDueDate(submitDate, WORKIND_HOURS_IN_A_DAY);
    expect(calculatedDueDate).to.equalTime(dueDate);
  });

  it('returns valid date for upper worktime bounds', () => {
    const submitDate = new Date(2018, 7, 9, 17);
    const dueDate = new Date(2018, 7, 10, 17);
    const calculatedDueDate = calculateDueDate(submitDate, WORKIND_HOURS_IN_A_DAY);
    expect(calculatedDueDate).to.equalTime(dueDate);
  });
});
