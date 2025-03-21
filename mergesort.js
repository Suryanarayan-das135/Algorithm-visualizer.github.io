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

    barsContainer.innerHTML = "";

    values.forEach(val => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${val * 2}px`;
        bar.dataset.value = val;

        let valueDisplay = document.createElement("div");
        valueDisplay.classList.add("barValue");
        valueDisplay.textContent = val;

        bar.appendChild(valueDisplay);
        barsContainer.appendChild(bar);
    });

    document.getElementById("output").innerHTML = "";
}

async function startSorting() {
    let bars = Array.from(document.querySelectorAll(".bar"));
    let order = document.getElementById("order").value;
    let speed = parseInt(document.getElementById("speed").value);

    let values = bars.map(bar => parseInt(bar.dataset.value));
    await mergeSort(values, 0, values.length - 1, order, speed, bars);

    bars.forEach((bar, index) => {
        bar.classList.add("sorted");
        bar.dataset.value = values[index];
        bar.style.height = `${values[index] * 2}px`;
        bar.querySelector(".barValue").textContent = values[index];
    });

    document.getElementById("output").innerHTML = "After Sorting: " + values.join(", ");
}

async function mergeSort(arr, left, right, order, speed, bars) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid, order, speed, bars);
    await mergeSort(arr, mid + 1, right, order, speed, bars);
    await merge(arr, left, mid, right, order, speed, bars);
}

async function merge(arr, left, mid, right, order, speed, bars) {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if ((order === "ascending" && leftArr[i] <= rightArr[j]) ||
            (order === "descending" && leftArr[i] > rightArr[j])) {
            arr[k] = leftArr[i];
            updateBar(bars[k], leftArr[i], speed);
            i++;
        } else {
            arr[k] = rightArr[j];
            updateBar(bars[k], rightArr[j], speed);
            j++;
        }
        k++;
        await sleep(speed);
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        updateBar(bars[k], leftArr[i], speed);
        i++; k++;
        await sleep(speed);
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        updateBar(bars[k], rightArr[j], speed);
        j++; k++;
        await sleep(speed);
    }
}

function updateBar(bar, newValue, speed) {
    bar.style.height = `${newValue * 2}px`;
    bar.dataset.value = newValue;
    bar.querySelector(".barValue").textContent = newValue;

    bar.classList.add("highlight");
    setTimeout(() => bar.classList.remove("highlight"), speed);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
