const WORKDAY_LENGTH = 8;

function turnaroundDays(turnaround) {
  return Math.floor(turnaround / WORKDAY_LENGTH);
}

module.exports = {
  turnaroundDays,
};
