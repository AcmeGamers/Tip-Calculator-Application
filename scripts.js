// Variables
let bill = document.getElementById("bill"),
  tip_amount = document.getElementById("tip-amount"),
  total = document.getElementById("total"),
  number_of_people = document.getElementById("number_of_people"),
  custom_percent = document.getElementById("custom_percent"),
  tip_percent = document.querySelectorAll(".select-tip button"),
  reset_button = document.querySelector(".reset-button");

// Functions
function calculate() {
  let bill_value = parseFloat(bill.value),
    tip_percent_value = 0,
    number_of_people_value = parseFloat(number_of_people.value) || 1;

  // Checks if fixed tip is selected
  for (let i = 0; i < tip_percent.length; i++)
    if (tip_percent[i].classList.contains("active"))
      tip_percent_value = parseFloat(tip_percent[i].innerHTML);

  // Custom tip
  if (custom_percent.value) {
    let custom = parseFloat(custom_percent.value),
      total_value = ((bill_value * (custom / 100)))/number_of_people_value;

    tip_amount.innerHTML = "$" + total_value.toFixed(2);
    total.innerHTML = "$" + (number_of_people_value * total_value).toFixed(2);
  }

  // Fixed Tip
  else {
    let fixed_tip = bill_value * (tip_percent_value / 100),
      total_value = fixed_tip / number_of_people_value;

    tip_amount.innerHTML = "$" + total_value.toFixed(2);
    total.innerHTML = "$" + (total_value * number_of_people_value).toFixed(2);
  }
}

// Event listeners
bill.addEventListener("input", calculate);

number_of_people.addEventListener("input", () => {
  if (number_of_people.value == 0) {
    number_of_people.classList.add("error");
    number_of_people.previousElementSibling
      .querySelector("span")
      .classList.remove("hidden");
  } else {
    number_of_people.classList.remove("error");
    number_of_people.previousElementSibling
      .querySelector("span")
      .classList.add("hidden");
  }

  calculate();
});

custom_percent.addEventListener("input", () => {
  if (custom_percent.value.length > 0) {
    // removes classes from all buttons
    for (let i = 0; i < tip_percent.length; i++)
      tip_percent[i].classList.remove("active");

    calculate();
  }
});

// Event listener for all tip buttons
for (let i = 0; i < tip_percent.length; i++) {
  tip_percent[i].addEventListener("click", function () {
    for (let j = 0; j < tip_percent.length; j++) {
      tip_percent[j].classList.remove("active");
    }
    this.classList.add("active");
    custom_percent.value = "";
    calculate();
  });
}

// Reset button event listener
reset_button.addEventListener("click", function () {
  bill.value = "0";
  number_of_people.value = "1";
  custom_percent.value = "";
  for (let i = 0; i < tip_percent.length; i++) {
    tip_percent[i].classList.remove("active");
  }
  calculate();
});
