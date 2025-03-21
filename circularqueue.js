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
class CircularQueue {
    constructor(size) {
        this.size = size;
        this.queue = new Array(size).fill(null);
        this.front = -1;
        this.rear = -1;
    }

    enqueue(item) {
        if ((this.rear + 1) % this.size === this.front) {
            alert("Queue is full");
            return;
        }

        if (this.front === -1) this.front = 0;
        this.rear = (this.rear + 1) % this.size;
        this.queue[this.rear] = item;
        updateQueueDisplay();
    }

    dequeue() {
        if (this.front === -1) {
            alert("Queue is empty");
            return;
        }

        alert(`Dequeued: ${this.queue[this.front]}`);
        this.queue[this.front] = null;

        if (this.front === this.rear) {
            this.front = this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.size;
        }

        updateQueueDisplay();
    }

    peek() {
        if (this.front === -1) {
            alert("Queue is empty");
            return;
        }
        alert(`Front element: ${this.queue[this.front]}`);
    }

    isEmpty() {
        alert(this.front === -1 ? "Queue is empty" : "Queue is not empty");
    }
}

// Initialize Circular Queue with size 5
const queue = new CircularQueue(5);

function enqueue() {
    const inputElement = document.getElementById("inputElement");
    const value = parseInt(inputElement.value);
    if (!isNaN(value)) {
        queue.enqueue(value);
        inputElement.value = "";
    } else {
        alert("Please enter a valid number");
    }
}

function dequeue() {
    queue.dequeue();
}

function peek() {
    queue.peek();
}

function isEmpty() {
    queue.isEmpty();
}

function updateQueueDisplay() {
    const queueContainer = document.getElementById("queueContainer");
    queueContainer.innerHTML = "";

    queue.queue.forEach((item) => {
        const queueItem = document.createElement("div");
        queueItem.classList.add("queue-item");
        queueItem.textContent = item !== null ? item : "-";
        queueContainer.appendChild(queueItem);
    });
}
