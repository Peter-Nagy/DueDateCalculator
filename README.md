# DueDateCalculator
This module exports a function named calculateDueDate, which calculates due dates for bug reports.
## Usage
```js
DueDateCalculator.calculateDueDate(submitTime, turnaround);
```
Parameters:
- __submitTime: Date__, working day
- __turnaround: Number__, a positive number

Return value: __Date__, the due date of the bug report with the given submit and turnaround time.
## Linting
```sh
npm run lint
```
## Running tests
```sh
npm run test
```
