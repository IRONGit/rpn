require('should');
const { calculateByRPN } = require('../src');

describe('', () => {
  it('should equal', () => {
    calculateByRPN('3 * (2 * 6 + 7 * (3 - 2) + 2 * (4 * 4 - 5 * 5)) * 1')
    .should.be.eql(3 * (2 * 6 + 7 * (3 - 2) + 2 * (4 * 4 - 5 * 5)) * 1)
  })
})