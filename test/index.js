require('should');
const { genExpression, calculateByRPN } = require('../src')
// 生成表达式的数量
let expressionCount = 10000
// 表达式参数个数的范围 n + 2
let paramsMaxCount = 500

for (let i = 0, len = expressionCount; i < len; i++) {
  const expression = genExpression(Math.floor(Math.random() * paramsMaxCount + 500))
  if (expression) {
    describe(expression, () => {
      it('should equal', () => {
        calculateByRPN(expression)
        .should.be.eql(eval(expression))
      })
    })
  }
}
