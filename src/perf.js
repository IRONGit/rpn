const { performance } = require('perf_hooks');
const { genExpression, calculateByRPN } = require('../src')
// 生成表达式的数量
let expressionCount = 1000
// 表达式参数个数的范围 n + 2
let paramsMaxCount = 500

let maxDiff = 0

let start = null
let end = null
for (let i = 0, len = expressionCount; i < len; i++) {
  const expression = genExpression(Math.floor(Math.random() * paramsMaxCount + 2))
  let evalTime = 0
  let rpnTime = 0
  if (expression) {
    start = performance.now()
    eval(expression)
    end = performance.now()
    evalTime = end - start
    start = performance.now()
    calculateByRPN(expression)
    end = performance.now()
    rpnTime = end - start
    maxDiff = Math.max(maxDiff, rpnTime - evalTime)
  }
}
console.log('最大时间差为：', maxDiff, 'ms')
