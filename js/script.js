const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let openBracketsCount = 0; 

buttons.forEach(button => {
  button.addEventListener('click', () => {
    
    if (button.classList.contains('clear')) {
      currentInput = '';
      openBracketsCount = 0;
      calculatorScreen.textContent = '0';
      return;
    }
    
    if (button.classList.contains('backspace-btn') || button.querySelector('svg')) {
      const lastChar = currentInput.slice(-1);
      if (lastChar === '(') openBracketsCount--;
      if (lastChar === ')') openBracketsCount++;
      
      currentInput = currentInput.slice(0, -1);
      calculatorScreen.textContent = currentInput || '0';
      return;
    }
    
    if (button.classList.contains('equal')) {
      try {
        if (currentInput !== '') {
          let formattedInput = currentInput.replace(/%/g, '/100');
          let result = eval(formattedInput);
          currentInput = Number(result.toFixed(8)).toString();
          calculatorScreen.textContent = currentInput;
          openBracketsCount = 0;
        }
      } catch (error) {
        calculatorScreen.textContent = 'Error';
        currentInput = '';
        openBracketsCount = 0;
      }
      return;
    }
    
    if (button.classList.contains('bracket')) {
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
      return;
    }

    if (button.classList.contains('point')) {
      const tokens = currentInput.split(/[\+\-\*\/]/);
      const lastNumber = tokens[tokens.length - 1];
      
      if (!lastNumber.includes('.')) {
        currentInput += '.';
        calculatorScreen.textContent = currentInput;
      }
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
      currentInput += value;
      calculatorScreen.textContent = currentInput;
    }
    
  });
});
