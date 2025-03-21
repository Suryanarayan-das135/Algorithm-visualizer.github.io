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
    let order = document.getElementById("order").value;
    let speed = parseInt(document.getElementById("speed").value);

    let values = Array.from(bars).map(bar => parseInt(bar.dataset.value));
    await quickSort(bars, values, 0, values.length - 1, order, speed);

    // Mark all bars as sorted
    bars.forEach(bar => bar.classList.add("sorted"));

    // Display the sorted values
    document.getElementById("output").innerHTML = "After Sorting: " + values.join(", ");
}

async function quickSort(bars, values, low, high, order, speed) {
    if (low < high) {
        let pivotIndex = await partition(bars, values, low, high, order, speed);
        await quickSort(bars, values, low, pivotIndex - 1, order, speed);
        await quickSort(bars, values, pivotIndex + 1, high, order, speed);
    }
}

async function partition(bars, values, low, high, order, speed) {
    let pivot = values[high];
    let pivotBar = bars[high];
    pivotBar.classList.add("highlight");

    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].classList.add("compare");
        await sleep(speed);

        if ((order === "ascending" && values[j] < pivot) || 
            (order === "descending" && values[j] > pivot)) {
            i++;
            // Swap bars visually
            swapBars(bars, values, i, j);
        }

        bars[j].classList.remove("compare");
    }

    // Swap pivot into its correct position
    swapBars(bars, values, i + 1, high);
    pivotBar.classList.remove("highlight");

    return i + 1;
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
