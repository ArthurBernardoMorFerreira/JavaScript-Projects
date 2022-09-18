const $operationButtons = document.querySelectorAll("[data-operator]");
const $numbersButtons = document.querySelectorAll("[data-number]");
const $equalButton = document.querySelector("[data-equals]");
const $previousOperandElementText = document.querySelector("[data-previous-operand");
const $currentOperandElementText = document.querySelector("[data-current-operand]");
const $deleteButton = document.querySelector("[data-delete]");
const $allClearButton = document.querySelector("[data-all-clear]");

class Calculator {

  constructor($previousOperandElementText, $currentOperandElementText) {
    
    this.$previousOperandElementText = $previousOperandElementText;
    this.$currentOperandElementText = $currentOperandElementText;
    this.clear();

  };

  formatDisplayNumber(number) {
    
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let intergerDisplay;

    if (isNaN(intergerDigits)) {

      intergerDisplay = '';

    } else {

      intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

    }

    if (decimalDigits != null) {

      return `${intergerDisplay}.${decimalDigits}`;

    } else {

      return intergerDisplay;

    };

  };

  delete() {

    this.currentOperand = this.currentOperand.toString().slice(0, -1);

  };

  calculate() {

    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch(this.operation) {

      case '+': 

        result = _previousOperand + _currentOperand;

      break;

      case '-':

        result = _previousOperand - _currentOperand;

      break;

      case '*':

        result = _previousOperand * _currentOperand;

      break;

      case '÷':

        result = _previousOperand / _currentOperand;

      break;

      default:
        
      return;

    };

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';

  };

  chooseOperator(operation) {

    if (this.currentOperand === '') return;  

    if (this.previousOperand != '') {

      this.calculate();

    };

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';

  };

  appendNumber(number) {

    if (this.currentOperand.includes('.') && number === '.') return;

    this.currentOperand = `${this.currentOperand}${number}`;

  };

  clear() {

    this.previousOperand = "";
    this.currentOperand = "";

  };

  updateDisplay() {

    this.$previousOperandElementText.innerText = `${this.previousOperand} ${this.operation || ''}`;
    this.$currentOperandElementText.innerText = this.formatDisplayNumber(this.currentOperand);

  };

};

const calculator = new Calculator($previousOperandElementText, $currentOperandElementText);

for (const $numberButton of $numbersButtons) {

  $numberButton.addEventListener('click', () => {

    calculator.appendNumber($numberButton.innerText);
    calculator.updateDisplay();

  });

};

for (const operationButton of $operationButtons) {

  operationButton.addEventListener('click', () => {

    calculator.chooseOperator(operationButton.innerText);
    calculator.updateDisplay();

  });

};

$allClearButton.addEventListener('click', () => {

  calculator.clear();
  calculator.updateDisplay();

});

$equalButton.addEventListener('click', () => {

  calculator.calculate();
  calculator.updateDisplay();

});

$deleteButton.addEventListener('click', () => {

  calculator.delete();
  calculator.updateDisplay();

});