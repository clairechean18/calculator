const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let expression = ''; // Variable to store the entire calculation expression
let clearDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (clearDisplay) {
            display.value = '';
            clearDisplay = false;
        }

        if (!isNaN(value) || value === '.') {
            // If the input is a number or a decimal point
            display.value += value;
            expression += value;
        } else if (value === 'C') {
            // Clear the last entered number
            display.value = display.value.slice(0, -1);
            expression = expression.slice(0, -1);
        } else if (value === 'CE') {
            // Clear all numbers and reset
            display.value = '';
            expression = '';
        } else if (value === '=') {
            // Perform calculation
            display.value = eval(expression);
            clearDisplay = true;
        } else if (value === '%') {
            // Calculate percentage
            const percent = parseFloat(display.value) / 100;
            display.value = percent;
            expression += value;
        } else {
            // For operators
            expression += value;
            display.value += value;
        }
    });
});

function calculate(firstNum, op, secondNum) {
    const first = parseFloat(firstNum);
    const second = parseFloat(secondNum);

    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            // Check for division by zero
            if (second === 0) {
                return 'Error: Division by zero';
            }
            return first / second;
        default:
            return 'Error';
    }
}
