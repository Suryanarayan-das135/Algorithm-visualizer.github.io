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


// Queue visualizer
let queue = [];

// Function to update the queue display
function updateQueueDisplay() {
    const queueList = document.getElementById("queueList");
    queueList.innerHTML = "";
    queue.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        queueList.appendChild(li);
    });
}

// Enqueue operation
function enqueue() {
    const inputElement = document.getElementById("inputElement").value;
    if (inputElement === "") {
        showStatusMessage("Please enter a valid number.");
        return;
    }
    queue.push(Number(inputElement));
    updateQueueDisplay();
    document.getElementById("inputElement").value = "";
    showStatusMessage(`Enqueued: ${inputElement}`);
}

// Dequeue operation
function dequeue() {
    if (queue.length === 0) {
        showStatusMessage("Queue is empty! Cannot dequeue.");
        return;
    }
    const dequeuedItem = queue.shift();
    updateQueueDisplay();
    showStatusMessage(`Dequeued: ${dequeuedItem}`);
}

// Peek operation
function peek() {
    if (queue.length === 0) {
        showStatusMessage("Queue is empty! Nothing to peek.");
        return;
    }
    showStatusMessage(`Front of the queue: ${queue[0]}`);
}

// Is Empty operation
function isEmpty() {
    if (queue.length === 0) {
        showStatusMessage("Queue is empty.");
    } else {
        showStatusMessage("Queue is not empty.");
    }
}

// Display message
function showStatusMessage(message) {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
}
