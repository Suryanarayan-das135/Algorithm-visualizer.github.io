// Node for Doubly Linked List
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// Doubly Linked List Implementation
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.container = document.getElementById("linkedListContainer");
    }

    // Create a visual representation of a node
    createNodeElement(value) {
        let nodeContainer = document.createElement("div");
        nodeContainer.classList.add("node-container");

        let nodeDiv = document.createElement("div");
        nodeDiv.classList.add("node");
        nodeDiv.textContent = value;

        nodeContainer.appendChild(nodeDiv);
        return nodeContainer;
    }

    // Update the UI to display the current list
    updateUI() {
        this.container.innerHTML = "";
        let current = this.head;
        while (current) {
            let nodeContainer = this.createNodeElement(current.value);
            this.container.appendChild(nodeContainer);

            if (current.next) {
                let arrowDiv = document.createElement("div");
                arrowDiv.classList.add("arrow");
                this.container.appendChild(arrowDiv);
            }
            current = current.next;
        }
    }

    // Insert at beginning of the list
    insertAtBeginning(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.updateUI();
    }

    // Insert at end of the list
    insertAtEnd(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.updateUI();
    }

    // Insert at a specified position (0-indexed)
    insertAtPosition(value, position) {
        if (position < 0) return;
        if (position === 0) {
            this.insertAtBeginning(value);
            return;
        }

        let newNode = new Node(value);
        let current = this.head;
        let index = 0;

        while (current && index < position) {
            current = current.next;
            index++;
        }

        // If position is greater than length, insert at end
        if (!current) {
            this.insertAtEnd(value);
            return;
        }

        let prevNode = current.prev;
        newNode.next = current;
        newNode.prev = prevNode;
        if (prevNode) {
            prevNode.next = newNode;
        }
        current.prev = newNode;
        this.updateUI();
    }

    // Delete the first node
    deleteFromBeginning() {
        if (!this.head) return;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }
        this.updateUI();
    }

    // Delete the last node
    deleteFromEnd() {
        if (!this.tail) return;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.updateUI();
    }

    // Delete a node at a given position (0-indexed)
    deleteFromPosition(position) {
        if (!this.head || position < 0) return;
        if (position === 0) {
            this.deleteFromBeginning();
            return;
        }

        let current = this.head;
        let index = 0;
        while (current && index < position) {
            current = current.next;
            index++;
        }
        if (!current) return; // position out of bounds

        // If deleting the tail node
        if (current === this.tail) {
            this.deleteFromEnd();
            return;
        }

        let prevNode = current.prev;
        let nextNode = current.next;
        if (prevNode) {
            prevNode.next = nextNode;
        }
        if (nextNode) {
            nextNode.prev = prevNode;
        }
        this.updateUI();
    }
}

const doublyLinkedList = new DoublyLinkedList();

// Functions for control buttons
function insertAtBeginning() {
    let value = document.getElementById("valueInput").value;
    if (value !== "") doublyLinkedList.insertAtBeginning(value);
}

function insertAtEnd() {
    let value = document.getElementById("valueInput").value;
    if (value !== "") doublyLinkedList.insertAtEnd(value);
}

function insertAtPosition() {
    let value = document.getElementById("valueInput").value;
    let position = document.getElementById("positionInput").value;
    if (value !== "" && position !== "") doublyLinkedList.insertAtPosition(value, parseInt(position));
}

function deleteFromBeginning() {
    doublyLinkedList.deleteFromBeginning();
}

function deleteFromEnd() {
    doublyLinkedList.deleteFromEnd();
}

function deleteFromPosition() {
    let position = document.getElementById("positionInput").value;
    if (position !== "") doublyLinkedList.deleteFromPosition(parseInt(position));
}
