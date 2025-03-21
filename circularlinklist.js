class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  // Circular Linked List Implementation
  class CircularLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.container = document.getElementById("linkedListContainer");
    }

    // Create a visual representation of a node
    createNodeElement(value) {
      const nodeContainer = document.createElement("div");
      nodeContainer.classList.add("node-container");

      const nodeDiv = document.createElement("div");
      nodeDiv.classList.add("node");
      nodeDiv.textContent = value;

      nodeContainer.appendChild(nodeDiv);
      return nodeContainer;
    }

    // Update the UI: render nodes, inline arrows, and an animated curved line underneath connecting tail to head.
    updateUI() {
      this.container.innerHTML = "";
      if (!this.head) return;

      // Render nodes with inline arrows ("↔")
      let current = this.head;
      do {
        const nodeContainer = this.createNodeElement(current.value);
        this.container.appendChild(nodeContainer);

        // Add inline arrow for visual separation
        const arrowDiv = document.createElement("div");
        arrowDiv.classList.add("arrow");
        arrowDiv.textContent = "↔";
        this.container.appendChild(arrowDiv);

        current = current.next;
      } while (current !== this.head);

      // Remove the last inline arrow.
      const arrows = this.container.querySelectorAll(".arrow");
      if (arrows.length > 0) {
        arrows[arrows.length - 1].remove();
      }

      // Draw an animated curved SVG path connecting tail to head underneath all nodes.
      const nodeElements = this.container.querySelectorAll(".node");
      if (nodeElements.length > 0) {
        // Use offset positions relative to the container.
        const headEl = nodeElements[0];
        const tailEl = nodeElements[nodeElements.length - 1];

        const headX = headEl.offsetLeft + headEl.offsetWidth / 2;
        const headY = headEl.offsetTop + headEl.offsetHeight / 2;
        const tailX = tailEl.offsetLeft + tailEl.offsetWidth / 2;
        const tailY = tailEl.offsetTop + tailEl.offsetHeight / 2;

        // Calculate a control point for the curve.
        // This control point is set below both nodes (adjust offset as needed)
        const controlX = (headX + tailX) / 2;
        const controlY = Math.max(headY, tailY) + 100;

        // Create an SVG element covering the container
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const contWidth = this.container.offsetWidth;
        const contHeight = this.container.offsetHeight;
        svg.setAttribute("width", contWidth);
        svg.setAttribute("height", contHeight);
        svg.setAttribute("viewBox", `0 0 ${contWidth} ${contHeight}`);
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.zIndex = "0"; // Place SVG behind nodes
        svg.style.pointerEvents = "none";

        // Define arrow marker for the end of the curve
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        marker.setAttribute("id", "arrowhead");
        marker.setAttribute("markerWidth", "10");
        marker.setAttribute("markerHeight", "7");
        marker.setAttribute("refX", "0");
        marker.setAttribute("refY", "3.5");
        marker.setAttribute("orient", "auto");
        const markerPath = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        markerPath.setAttribute("points", "0 0, 10 3.5, 0 7");
        markerPath.setAttribute("fill", "black");
        marker.appendChild(markerPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        // Create a quadratic Bézier path from tail to head
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M ${tailX} ${tailY} Q ${controlX} ${controlY} ${headX} ${headY}`;
        path.setAttribute("d", d);
        path.setAttribute("stroke", "black");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-dasharray", "5,5");
        path.style.animation = "dash 1s linear infinite";
        path.setAttribute("marker-end", "url(#arrowhead)");
        svg.appendChild(path);

        this.container.appendChild(svg);
      }
    }

    insertAtBeginning(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        newNode.next = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
        this.tail.next = this.head;
      }
      this.updateUI();
    }

    insertAtEnd(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        newNode.next = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
        this.tail.next = this.head;
      }
      this.updateUI();
    }

    insertAtPosition(value, position) {
      if (position <= 0 || !this.head) {
        this.insertAtBeginning(value);
        return;
      }
      const newNode = new Node(value);
      let current = this.head;
      let index = 0;
      while (index < position - 1 && current.next !== this.head) {
        current = current.next;
        index++;
      }
      newNode.next = current.next;
      current.next = newNode;
      if (current === this.tail) {
        this.tail = newNode;
      }
      this.updateUI();
    }

    deleteFromBeginning() {
      if (!this.head) return;
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.tail.next = this.head;
      }
      this.updateUI();
    }

    deleteFromEnd() {
      if (!this.head) return;
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        let current = this.head;
        while (current.next !== this.tail) {
          current = current.next;
        }
        current.next = this.head;
        this.tail = current;
      }
      this.updateUI();
    }

    deleteFromPosition(position) {
      if (!this.head || position < 0) return;
      if (position === 0) {
        this.deleteFromBeginning();
        return;
      }
      let current = this.head;
      let index = 0;
      while (index < position - 1 && current.next !== this.head) {
        current = current.next;
        index++;
      }
      if (current.next === this.head) return;
      if (current.next === this.tail) {
        this.deleteFromEnd();
        return;
      }
      current.next = current.next.next;
      this.updateUI();
    }
  }

  const circularLinkedList = new CircularLinkedList();

  function insertAtBeginning() {
    const value = document.getElementById("valueInput").value;
    if (value !== "") circularLinkedList.insertAtBeginning(value);
  }

  function insertAtEnd() {
    const value = document.getElementById("valueInput").value;
    if (value !== "") circularLinkedList.insertAtEnd(value);
  }

  function insertAtPosition() {
    const value = document.getElementById("valueInput").value;
    const position = document.getElementById("positionInput").value;
    if (value !== "" && position !== "") circularLinkedList.insertAtPosition(value, parseInt(position));
  }

  function deleteFromBeginning() {
    circularLinkedList.deleteFromBeginning();
  }

  function deleteFromEnd() {
    circularLinkedList.deleteFromEnd();
  }

  function deleteFromPosition() {
    const position = document.getElementById("positionInput").value;
    if (position !== "") circularLinkedList.deleteFromPosition(parseInt(position));
  }