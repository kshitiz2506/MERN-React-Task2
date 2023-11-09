import React, { useState } from 'react';
import './App.css';


function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (number) => {
    if (waitingForOperand) {
      setDisplay(String(number));
      setWaitingForOperand(false);
    } else {
      if (number === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display === '0' ? String(number) : display + number);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    if (waitingForOperand) {
      setOperator(nextOperator);
    } else if (firstOperand === '') {
      setFirstOperand(display);
      setOperator(nextOperator);
      setWaitingForOperand(true);
    } else if (operator) {
      const result = calculate(firstOperand, display, operator);
      setFirstOperand(String(result));
      setOperator(nextOperator);
      setDisplay(String(result));
      setWaitingForOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setOperator('');
    setFirstOperand('');
    setWaitingForOperand(false);
  };

  const handleEqualsClick = () => {
    if (operator && firstOperand !== '') {
      const result = calculate(firstOperand, display, operator);
      setFirstOperand('');
      setOperator('');
      setDisplay(String(result));
      setWaitingForOperand(true);
    }
  };

  const handleBackspaceClick = () => {
    if (waitingForOperand) {
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setWaitingForOperand(false);
    }
  };

  const calculate = (a, b, op) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (op) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        if (num2 === 0) {
          return 'Error';
        }
        return num1 / num2;
      default:
        return 'Error';
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="operands">
        {firstOperand && <span className="first-operand">{firstOperand}</span>}
        {operator && <span className="operator">{operator}</span>}
      </div>
      <div className="buttons">
        {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '.', 'C', '=', '←', '/'].map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof item === 'number' || item === '.') {
                handleNumberClick(item);
              } else if (item === 'C') {
                handleClearClick();
              } else if (item === '=') {
                handleEqualsClick();
              } else if (item === '←') {
                handleBackspaceClick();
              } else {
                handleOperatorClick(item);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
