const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');

//Create a variable to hold the running formula string
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
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