function showCode(language) {
    // Remove "active" class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add "active" class to clicked tab
    document.querySelector(`button[onclick="showCode('${language}')"]`).classList.add('active');

    // Hide all code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        block.classList.remove('active');
    });

    // Show the selected code block
    document.getElementById(language).classList.add('active');
}

// Show Python code by default on page load
document.addEventListener("DOMContentLoaded", function () {
    showCode('python');
});

//stack visualizer
// Create an empty stack array
let stack = [];

// Function to push an element to the stack
function pushToStack() {
    const input = document.getElementById("stackInput").value;
    if (input === "") {
        showMessage("Please enter a value to push to the stack.");
        return;
    }
    
    // Push the input value into the stack array
    stack.push(input);
    
    // Update the stack visualization
    updateStackDisplay();
    showMessage(`Pushed ${input} to the stack.`);
    
    // Clear the input field
    document.getElementById("stackInput").value = "";
}

// Function to pop an element from the stack
function popFromStack() {
    if (stack.length === 0) {
        showMessage("Stack is empty, nothing to pop.");
        return;
    }

    // Pop the top element from the stack
    const poppedElement = stack.pop();
    
    // Update the stack visualization
    updateStackDisplay();
    showMessage(`Popped ${poppedElement} from the stack.`);
}

// Function to peek at the top element of the stack
function peekStack() {
    if (stack.length === 0) {
        showMessage("Stack is empty, no elements to peek.");
        return;
    }

    const topElement = stack[stack.length - 1];
    showMessage(`Top element is: ${topElement}`);
}

// Function to check if the stack is empty
function checkIfEmpty() {
    if (stack.length === 0) {
        showMessage("The stack is empty.");
    } else {
        showMessage("The stack is not empty.");
    }
}

// Function to update the stack display
function updateStackDisplay() {
    const stackDiv = document.getElementById("stack");
    stackDiv.innerHTML = ""; // Clear the previous stack elements
    
    // Create a new stack div for each element in the stack
    stack.forEach(item => {
        const stackElement = document.createElement("div");
        stackElement.textContent = item;
        stackDiv.appendChild(stackElement);
    });
}

// Function to display messages in the message box
function showMessage(message) {
    const messageBox = document.getElementById("messageBox");
    messageBox.textContent = message;
}

