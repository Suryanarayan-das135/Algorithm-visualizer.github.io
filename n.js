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

    for (let i = 1; i < n; i++) {
        let key = values[i];
        let j = i - 1;

        let keyBar = bars[i];
        keyBar.classList.add("highlight");

        await sleep(speed);

        while (j >= 0 && ((order === "ascending" && values[j] > key) || (order === "descending" && values[j] < key))) {
            values[j + 1] = values[j];
            bars[j + 1].style.height = `${values[j] * 2}px`;
            bars[j + 1].querySelector(".barValue").textContent = values[j];
            j--;
            await sleep(speed);
        }

        values[j + 1] = key;
        bars[j + 1].style.height = `${key * 2}px`;
        bars[j + 1].querySelector(".barValue").textContent = key;
        keyBar.classList.remove("highlight");
    }

    // Mark all bars as sorted
    bars.forEach(bar => bar.classList.add("sorted"));

    // Display the sorted values
    document.getElementById("output").innerHTML = "After Sorting: " + values.join(", ");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
