const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');

//Create a variable to hold the running formula string
let currentInput = '';
let openBracketsCount = 0; 

buttons.forEach(button => {
  button.addEventListener('click', () => {

    if (button.classList.contains('clear')) {
      currentInput = ''; 
      calculatorScreen.textContent = '0';
      return; 
    }
    
    if (button.classList.contains('backspace-btn') || button.querySelector('svg')) {
      currentInput = currentInput.slice(0, -1); 
      calculatorScreen.textContent = currentInput || '0'; 
      return; 
    }

    if (button.classList.contains('equal')) {
      try {
        if (currentInput !== '') {

          let result = eval(currentInput);
          currentInput = result.toString();
          calculatorScreen.textContent = currentInput;
        }
      } catch (error) {
        calculatorScreen.textContent = 'Error';
        currentInput = '';
      }
      return;
    }

    if (button.classList.contains('bracket')) {
      const lastChar = currentInput.slice(-1);
      
      if (currentInput === '' || ['+', '-', '*', '/', '('].includes(lastChar)) {
        currentInput += '(';
        openBracketsCount++; 
      } 
    
      else if (openBracketsCount > 0 && !['+', '-', '*', '/'].includes(lastChar)) {
        currentInput += ')';
        openBracketsCount--; 
      } 
    
      else {
        currentInput += '*(';
        openBracketsCount++;
      }
      
      calculatorScreen.textContent = currentInput;
      return;
    }

    // Check if the clicked button is a simple number or operator
    if (
      !button.classList.contains('clear') &&
      !button.classList.contains('backspace-btn') &&
      !button.classList.contains('bracket') &&
      !button.classList.contains('equal')
    ) {
      const value = button.textContent.trim();
      currentInput += value;
      calculatorScreen.textContent = currentInput;
    }
  });
});
