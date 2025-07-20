const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// Click event listener for each calculator button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.textContent);
  });
});

// Handle both button clicks and key presses
function handleInput(value) {
  if (value === "=") {
    try {
      display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
    } catch {
      display.value = "Error";
    }
  } else if (value === "C" || value === "CE") {
    display.value = "0";
  } else if (value === "%") {
    display.value = (parseFloat(display.value) / 100).toString();
  } else {
    if (display.value === "0" || display.value === "Error") display.value = "";
    display.value += value;
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Allow digits, operators, and decimal point
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    if (display.value === "0" || display.value === "Error") display.value = "";
    display.value += key;
  }

  // Handle Enter key for result
  if (key === "Enter") {
    handleInput("=");
  }

  // Handle Backspace
  if (key === "Backspace") {
    display.value = display.value.slice(0, -1) || "0";
  }

  // Handle Escape for clear
  if (key === "Escape") {
    handleInput("C");
  }
});
