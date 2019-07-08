class Stack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    this.stack.push(val);
  }
  pop() {
    return this.stack.pop();
  }
  getSize() {
    return this.stack.length;
  }
  isEmpty() {
    return this.stack.length === 0;
  }
}
const isHigherPriority = (n, o) => {
  return (n === '*' || n === '/') && (o === '+' || o === '-');
};
/**
 * 1 * 2.5 + (0.568 + 0.123) / 0.5
 * @param {*} infixExpression
 */
const convert2PostfixExpression = infixExpression => {
  let operators = ['+', '-', '*', '/'];
  let parentheses = ['(', ')'];
  let operatorStack = new Stack();
  let charStack = new Stack();
  let splited = infixExpression.split(/(\+|\-|\*|\/|\(|\))+/g);
  splited.forEach(e => {
    let trimmed = e.trim();
    if (trimmed) {
      let isOperator = operators.includes(trimmed);
      let isParenthese = parentheses.includes(trimmed);
      if (isOperator || isParenthese) {
        if (operatorStack.isEmpty()) {
          operatorStack.push(trimmed);
        } else if (isParenthese) {
          if (trimmed === '(') {
            operatorStack.push(trimmed);
          } else {
            let top = operatorStack.pop();
            while (top !== '(') {
              charStack.push(top);
              top = operatorStack.pop();
              if (operatorStack.isEmpty()) {
                break;
              }
            }
          }
        } else if (isOperator) {
          if (operatorStack.isEmpty()) {
            operatorStack.push(trimmed);
          } else {
            let top = operatorStack.pop();
            if (top === '(') {
              operatorStack.push(top);
              operatorStack.push(trimmed);
            } else {
              if (isHigherPriority(trimmed, top)) {
                // 当前运算符优先级比栈顶运算符优先级高
                operatorStack.push(top);
                operatorStack.push(trimmed);
              } else {
                // 否则一直出栈 并压入char栈
                while (
                  !operatorStack.isEmpty() &&
                  !isHigherPriority(trimmed, top) &&
                  top !== '('
                ) {
                  charStack.push(top);
                  top = operatorStack.pop();
                }
                if (operatorStack.isEmpty()) {
                  if (!isHigherPriority(trimmed, top)) {
                    charStack.push(top);
                  } else {
                    operatorStack.push(top);
                  }
                  operatorStack.push(trimmed);
                } else {
                  operatorStack.push(top);
                  operatorStack.push(trimmed);
                }
              }
            }
          }
        }
      } else {
        charStack.push(trimmed);
      }
    }
  });
  while (!operatorStack.isEmpty()) {
    let top = operatorStack.pop();
    if (top !== '(') {
      charStack.push(top);
    }
  }
  return charStack.stack.join(' ');
};
// 3 * (2 * 6 + 7 * (3 - 2) + 2 * (4 * 4 - 5 * 5)) * 1
// "3 2 6 * 7 3 2 - * + 2 4 4 * 5 5 * - * 1 * + *"
// 3-68.26540323674905-65+86.23958164294369*64*70/32.026053947622636-17.208749962368806+23*54.16003213312568
const evalRPN = postfixExpression => {
  const operators = ['+', '-', '*', '/', '(', ')'];
  let stack = new Stack();
  let splited = postfixExpression.split(/\s/g);
  splited.forEach(expression => {
    if (operators.includes(expression)) {
      const next = stack.pop();
      const prev = stack.pop();
      let prePush = 0;
      switch (expression) {
        case '+':
          prePush = prev + next;
          break;
        case '-':
          prePush = prev - next;
          break;
        case '*':
          prePush = prev * next;
          break;
        case '/':
          prePush = prev / next;
          break;
      }
      stack.push(parseFloat(prePush));
    } else {
      stack.push(parseFloat(expression));
    }
  });
  return stack.pop();
};
const genExpression = (n) => {
  const operators = ['+', '-', '*', '/']
  const operaorsSize = operators.length
  const numbers = []
  for (let i = 0, len = n; i < len; i++) {
    let number = Math.random() < 0.5 ? Math.floor(Math.random() * 100) : Math.random() * 100
    numbers.push(number)
    if (i !== len - 1) {
      let operator = operators[Math.floor(Math.random() * operaorsSize)]
      numbers.push(operator)
    }
  }
  return numbers.join('')
}
module.exports = {
  genExpression,
  calculateByRPN: (expression) => {
    return evalRPN(convert2PostfixExpression(expression))
  }
}