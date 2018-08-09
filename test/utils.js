const { expect } = require('chai');

const { turnaroundDays } = require('../utils/date');

describe('utils/turnaroundDays', () => {
  it('is a function', () => {
    expect(turnaroundDays).to.be.a('function');
  });

  it('returns 0 if turnaround is less than 8', () => {
    expect(turnaroundDays(6)).to.equal(0);
  });

  it('returns 1 if turnaround is 8', () => {
    expect(turnaroundDays(8)).to.equal(1);
  });

  it('returns 1 if turnaround is between 8 and 16', () => {
    expect(turnaroundDays(12)).to.equal(1);
  });

  it('returns 2 if turnaround is between 16 and 24', () => {
    expect(turnaroundDays(17)).to.equal(2);
  });
});
