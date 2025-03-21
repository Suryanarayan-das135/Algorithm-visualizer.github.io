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


document.getElementById("createBarsButton").addEventListener("click", createBars);
document.getElementById("sortButton").addEventListener("click", startSorting);

let barsContainer = document.getElementById("barsContainer");

function createBars() {
    let inputValue = document.getElementById("inputBox").value;
    let values = inputValue.split(",").map(val => parseInt(val.trim())).filter(val => !isNaN(val));

    if (values.length === 0) {
        alert("Please enter valid values.");
        return;
    }

    barsContainer.innerHTML = ""; // Clear existing bars

    values.forEach(val => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${val * 2}px`; // Set height according to the value
        bar.dataset.value = val;

        // Create the value display above the bar
        let valueDisplay = document.createElement("div");
        valueDisplay.classList.add("barValue");
        valueDisplay.textContent = val;

        bar.appendChild(valueDisplay); // Add value display to the bar
        barsContainer.appendChild(bar);
    });

    // Clear previous output
    document.getElementById("output").innerHTML = "";
}

async function startSorting() {
    let bars = document.querySelectorAll(".bar");
    let speed = parseInt(document.getElementById("speed").value);
    let values = Array.from(bars).map(bar => parseInt(bar.dataset.value));

    await heapSort(bars, values, speed);

    // Mark all bars as sorted
    bars.forEach(bar => bar.classList.add("sorted"));

    // Display the sorted values
    document.getElementById("output").innerHTML = "After Sorting: " + values.join(", ");
}

async function heapSort(bars, values, speed) {
    let n = values.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(bars, values, n, i, speed);
    }

    // Extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
        // Swap the root (largest) with the last element
        swapBars(bars, values, 0, i);

        // Reduce the size of the heap
        await heapify(bars, values, i, 0, speed);
    }
}

async function heapify(bars, values, size, root, speed) {
    let largest = root;
    let left = 2 * root + 1;
    let right = 2 * root + 2;

    // Highlight the root bar
    bars[root].classList.add("highlight");

    // Check if the left child is larger than the root
    if (left < size && values[left] > values[largest]) {
        largest = left;
    }

    // Check if the right child is larger than the largest so far
    if (right < size && values[right] > values[largest]) {
        largest = right;
    }

    if (largest !== root) {
        // Swap and heapify the affected subtree
        swapBars(bars, values, root, largest);
        bars[root].classList.remove("highlight");

        await sleep(speed);
        await heapify(bars, values, size, largest, speed);
    }

    bars[root].classList.remove("highlight");
}

function swapBars(bars, values, i, j) {
    // Swap values in the array
    [values[i], values[j]] = [values[j], values[i]];

    // Swap bar heights and values
    let tempHeight = bars[i].style.height;
    let tempValue = bars[i].querySelector(".barValue").textContent;

    bars[i].style.height = bars[j].style.height;
    bars[i].querySelector(".barValue").textContent = values[i];

    bars[j].style.height = tempHeight;
    bars[j].querySelector(".barValue").textContent = values[j];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
