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


// Dequeue visualizer
let deque = [];

// Function to update the deque display
function updateDequeDisplay() {
    const queueList = document.getElementById("queueList");
    queueList.innerHTML = "";
    deque.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        queueList.appendChild(li);
    });
}

// Enqueue Front operation
function enqueueFront() {
    const inputElement = document.getElementById("inputElement").value;
    if (inputElement === "") {
        showStatusMessage("Please enter a valid number.");
        return;
    }
    deque.unshift(Number(inputElement));  // Adds to the front
    updateDequeDisplay();
    document.getElementById("inputElement").value = "";
    showStatusMessage(`Enqueued at Front: ${inputElement}`);
}

// Enqueue Rear operation
function enqueueRear() {
    const inputElement = document.getElementById("inputElement").value;
    if (inputElement === "") {
        showStatusMessage("Please enter a valid number.");
        return;
    }
    deque.push(Number(inputElement));  // Adds to the rear
    updateDequeDisplay();
    document.getElementById("inputElement").value = "";
    showStatusMessage(`Enqueued at Rear: ${inputElement}`);
}

// Dequeue Front operation
function dequeueFront() {
    if (deque.length === 0) {
        showStatusMessage("Deque is empty! Cannot dequeue from front.");
        return;
    }
    const dequeuedItem = deque.shift();  // Removes from the front
    updateDequeDisplay();
    showStatusMessage(`Dequeued from Front: ${dequeuedItem}`);
}

// Dequeue Rear operation
function dequeueRear() {
    if (deque.length === 0) {
        showStatusMessage("Deque is empty! Cannot dequeue from rear.");
        return;
    }
    const dequeuedItem = deque.pop();  // Removes from the rear
    updateDequeDisplay();
    showStatusMessage(`Dequeued from Rear: ${dequeuedItem}`);
}

// Peek Front operation
function peekFront() {
    if (deque.length === 0) {
        showStatusMessage("Deque is empty! Nothing to peek at front.");
        return;
    }
    showStatusMessage(`Front of the deque: ${deque[0]}`);
}

// Peek Rear operation
function peekRear() {
    if (deque.length === 0) {
        showStatusMessage("Deque is empty! Nothing to peek at rear.");
        return;
    }
    showStatusMessage(`Rear of the deque: ${deque[deque.length - 1]}`);
}

// Is Empty operation
function isEmpty() {
    if (deque.length === 0) {
        showStatusMessage("Deque is empty.");
    } else {
        showStatusMessage("Deque is not empty.");
    }
}

// Display message
function showStatusMessage(message) {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
}
