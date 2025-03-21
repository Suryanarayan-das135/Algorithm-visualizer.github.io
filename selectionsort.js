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


// selection sort visualizer
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
    let n = values.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        bars[minIdx].classList.add("highlight");

        for (let j = i + 1; j < n; j++) {
            bars[j].classList.add("compare");

            await sleep(speed);

            if ((order === "ascending" && values[j] < values[minIdx]) || 
                (order === "descending" && values[j] > values[minIdx])) {
                bars[minIdx].classList.remove("highlight");
                minIdx = j;
                bars[minIdx].classList.add("highlight");
            }

            bars[j].classList.remove("compare");
        }

        // Swap bars visually
        if (minIdx !== i) {
            let tempHeight = bars[i].style.height;
            let tempValue = values[i];

            bars[i].style.height = bars[minIdx].style.height;
            bars[i].querySelector(".barValue").textContent = values[minIdx];

            bars[minIdx].style.height = tempHeight;
            bars[minIdx].querySelector(".barValue").textContent = tempValue;

            // Swap in the array
            [values[i], values[minIdx]] = [values[minIdx], values[i]];
        }

        bars[i].classList.add("sorted");
        bars[minIdx].classList.remove("highlight");
    }

    bars[n - 1].classList.add("sorted"); // Mark the last bar as sorted

    // Display the sorted values
    document.getElementById("output").innerHTML = "After Sorting: " + values.join(", ");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
