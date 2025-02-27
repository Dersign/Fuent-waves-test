// script.js
const submitButton = document.getElementById('submitButton');
const inputContainer = document.getElementById('input-container');
const feedback = document.getElementById('feedback');

// Example words (misspelled and correct spellings)
const words = [
    { misspelled: 'recieve', correct: 'receive' },
    { misspelled: 'definately', correct: 'definitely' },
    { misspelled: 'seperate', correct: 'separate' },
    { misspelled: 'occurance', correct: 'occurrence' },
    { misspelled: 'tommorow', correct: 'tomorrow' }
];

let currentWordIndex = 0;
let currentInputIndex = 0;

// Load the word's input boxes
function loadWord() {
    const word = words[currentWordIndex].correct;
    inputContainer.innerHTML = ''; // Clear previous input boxes

    // Create input fields for each letter of the word
    for (let i = 0; i < word.length; i++) {
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.maxLength = 1;
        inputBox.classList.add('input-box');
        inputBox.dataset.index = i;
        inputBox.addEventListener('input', handleInput);
        inputBox.addEventListener('keydown', handleBackspace);
        inputContainer.appendChild(inputBox);
    }

    feedback.textContent = '';
}

// Handle user input
function handleInput(event) {
    const inputBox = event.target;
    const letter = inputBox.value.toLowerCase();
    const correctLetter = words[currentWordIndex].correct[inputBox.dataset.index].toLowerCase();

    if (letter === correctLetter) {
        // If correct, move to next box
        currentInputIndex++;
        
        // Automatically move to the next input field
        if (inputBox.nextElementSibling) {
            inputBox.nextElementSibling.focus();
        }
    } else if (letter !== '') {
        // If incorrect, shake the input box
        inputBox.classList.add('shake');
        setTimeout(() => inputBox.classList.remove('shake'), 300); // Remove the shake effect
        inputBox.value = ''; // Clear the incorrect input
    }
}

// Handle backspace (move cursor to the previous input box)
function handleBackspace(event) {
    const inputBox = event.target;

    if (event.key === 'Backspace' && inputBox.value === '') {
        // Move to the previous input field when backspace is pressed and the field is empty
        if (inputBox.previousElementSibling) {
            inputBox.previousElementSibling.focus();
        }
    }
}

// Submit the user's attempt
function submitAnswer() {
    const inputs = document.querySelectorAll('.input-box');
    let isCorrect = true;

    inputs.forEach((input, index) => {
        if (input.value.toLowerCase() !== words[currentWordIndex].correct[index].toLowerCase()) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Incorrect. Try again.';
        feedback.style.color = 'red';
    }
}

// Event listener for submit button
submitButton.addEventListener('click', submitAnswer);

// Initialize the game
loadWord();
