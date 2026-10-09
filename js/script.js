const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let openBracketsCount = 0; 
let isResultDisplayed = false;

function clearActiveOperators() {
  buttons.forEach(btn => btn.classList.remove('active-operator'));
}

function adjustFontSize() {
  const len = calculatorScreen.textContent.length;
  if (len > 12) {
    calculatorScreen.style.fontSize = '24px';
  } else if (len > 8) {
    calculatorScreen.style.fontSize = '30px';
  } else {
    calculatorScreen.style.fontSize = '40px';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    
    if (button.classList.contains('clear')) {
      currentInput = '';
      openBracketsCount = 0;
      isResultDisplayed = false;
      clearActiveOperators();
      calculatorScreen.textContent = '0';
      adjustFontSize();
      return;
    }
    
    if (button.classList.contains('backspace-btn') || button.querySelector('svg')) {
      clearActiveOperators();
      if (isResultDisplayed) {
        currentInput = '';
        openBracketsCount = 0;
        isResultDisplayed = false;
        calculatorScreen.textContent = '0';
        adjustFontSize();
        return;
      }
      const lastChar = currentInput.slice(-1);
      if (lastChar === '(') openBracketsCount--;
      if (lastChar === ')') openBracketsCount++;
      
      currentInput = currentInput.slice(0, -1);
      calculatorScreen.textContent = currentInput || '0';
      adjustFontSize();
      return;
    }
    
    if (button.classList.contains('equal')) {
      clearActiveOperators();
      try {
        if (currentInput !== '') {
          let formattedInput = currentInput.replace(/%/g, '/100');
          let result = eval(formattedInput);
          currentInput = Number(result.toFixed(8)).toString();
          calculatorScreen.textContent = currentInput;
          openBracketsCount = 0;
          isResultDisplayed = true;
        }
      } catch (error) {
        calculatorScreen.textContent = 'Error';
        currentInput = '';
        openBracketsCount = 0;
        isResultDisplayed = false;
      }
      adjustFontSize();
      return;
    }
    
    if (button.classList.contains('bracket')) {
      clearActiveOperators();
      if (isResultDisplayed) {
        currentInput = '';
        openBracketsCount = 0;
        isResultDisplayed = false;
      }
      const lastChar = currentInput.slice(-1);
      if (currentInput === '' || ['+', '-', '*', '/', '('].includes(lastChar)) {
        currentInput += '(';
        openBracketsCount++;
      } else if (openBracketsCount > 0 && !['+', '-', '*', '/'].includes(lastChar)) {
        currentInput += ')';
        openBracketsCount--;
      } else {
        currentInput += '*(';
        openBracketsCount++;
      }
      calculatorScreen.textContent = currentInput;
      adjustFontSize();
      return;
    }

    if (button.classList.contains('point')) {
      clearActiveOperators();
      if (isResultDisplayed) {
        currentInput = '';
        openBracketsCount = 0;
        isResultDisplayed = false;
      }
      const tokens = currentInput.split(/[\+\-\*\/]/);
      const lastNumber = tokens[tokens.length - 1];
      
      if (!lastNumber.includes('.')) {
        currentInput += '.';
        calculatorScreen.textContent = currentInput;
      }
      adjustFontSize();
      return;
    }

    if (
      !button.classList.contains('clear') &&
      !button.classList.contains('backspace-btn') &&
      !button.classList.contains('bracket') &&
      !button.classList.contains('equal') &&
      !button.classList.contains('point')
    ) {
      const value = button.textContent.trim();
      const isOperator = ['+', '-', '*', '/'].includes(value);

      clearActiveOperators();
      if (isOperator) {
        button.classList.add('active-operator');
      }

      if (isResultDisplayed) {
        if (isOperator) {
          isResultDisplayed = false;
        } else {
          currentInput = '';
          openBracketsCount = 0;
          isResultDisplayed = false;
        }
      }

      currentInput += value;
      calculatorScreen.textContent = currentInput;
      adjustFontSize();
    }
    
  });
});