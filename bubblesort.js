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
        for (let j = 0; j < n - 1 - i; j++) {
            let bar1 = bars[j];
            let bar2 = bars[j + 1];

            // Highlight the two bars being compared
            bar1.classList.add("highlight");
            bar2.classList.add("highlight");

            await sleep(speed);

            let val1 = values[j];
            let val2 = values[j + 1];

            if ((order === "ascending" && val1 > val2) || (order === "descending" && val1 < val2)) {
                // Swap the values
                [values[j], values[j + 1]] = [values[j + 1], values[j]];
                bar1.style.height = `${values[j] * 2}px`;
                bar2.style.height = `${values[j + 1] * 2}px`;

                // Update the value display
                bar1.querySelector(".barValue").textContent = values[j];
                bar2.querySelector(".barValue").textContent = values[j + 1];
            }

            // Remove highlight after comparison
            bar1.classList.remove("highlight");
            bar2.classList.remove("highlight");
        }
        // Mark the current sorted element
        bars[n - 1 - i].classList.add("sorted");
    }

    // Display the sorted values
    document.getElementById("output").innerHTML = "After Sorting: " + values.join(", ");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
