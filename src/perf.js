const ora = require('ora')
const _cliProgress = require('cli-progress');
const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)
const { performance } = require('perf_hooks');
const { genExpression, calculateByRPN } = require('../src')

// 生成表达式的数量
let expressionCount = 1000
// 表达式参数个数的范围 n + 2
let paramsMaxCount = 5000
// 最大差值
let maxDiff = 0
// 最长执行时间
let maxExecDuration = 0
let start = null
let end = null
progressBar.start(expressionCount, 0)

for (let i = 0, len = expressionCount; i < len; i++) {
  const expression = genExpression(Math.floor(Math.random() * paramsMaxCount + 2))
  let evalTime = 0
  let rpnTime = 0
  progressBar.update(i + 1)
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
    maxExecDuration = Math.max(maxExecDuration, rpnTime)
  }
}
progressBar.stop()
console.log(`在表达式数量为${expressionCount}个，每个表达式参数个数范围为2~${paramsMaxCount}个的情况下：`)
console.log('最大时间差为：', maxDiff, 'ms')
console.log('最长执行时间为：', maxExecDuration, 'ms')
// spinner.stop()
