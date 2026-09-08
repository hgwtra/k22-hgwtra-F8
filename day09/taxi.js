const RESULT_OK_CLASSES = ["border-line", "bg-soft"];
const RESULT_ERROR_CLASSES = ["border-f8", "bg-f8-soft"];

// Prices
const OPENING_FARE = 15000; // First 1 km
const FARE_PER_KM_2_TO_5 = 13500; // from km 2 to 5
const FARE_PER_KM_FROM_6 = 11000; // from km 6 onwards

// Discounts
const DISCOUNT_FROM_KM = 12; // if travel more than 12 km
const DISCOUNT_RATE = 0.1; // discount 10%

const MAX_DISTANCE = 10000; // km

const taxiForm = document.querySelector("#taxi-form");
const distanceInput = document.querySelector("#distance");

const taxiResultBox = document.querySelector("#taxi-result");
const totalFareOutput = document.querySelector("#total-fare");
const fareNoteOutput = document.querySelector("#fare-note");

function isValidDistance(distance) {
  if (!Number.isFinite(distance)) {
    return false;
  }

  if (distance <= 0) {
    return false;
  }

  if (distance > MAX_DISTANCE) {
    return false;
  }

  return true;
}

function calculateFare(distance) {
  if (distance <= 1) {
    return OPENING_FARE;
  } else if (distance <= 5) {
    const kmBeyondFirst = distance - 1;
    return OPENING_FARE + kmBeyondFirst * FARE_PER_KM_2_TO_5;
  } else {
    const kmBeyondFifth = distance - 5;
    return (
      OPENING_FARE + 4 * FARE_PER_KM_2_TO_5 + kmBeyondFifth * FARE_PER_KM_FROM_6
    );
  }
}

function applyDiscount(fare, distance) {
  if (distance > DISCOUNT_FROM_KM) {
    return fare * (1 - DISCOUNT_RATE);
  }

  return fare;
}

function formatCurrency(amount) {
  return Math.round(amount).toLocaleString("vi-VN") + " VNĐ";
}

function showFare(formattedFare, note = "") {
  taxiResultBox.classList.remove("hidden", ...RESULT_ERROR_CLASSES);
  taxiResultBox.classList.add(...RESULT_OK_CLASSES);
  totalFareOutput.textContent = formattedFare;
  fareNoteOutput.textContent = note;
}

function showFareError(message) {
  taxiResultBox.classList.remove("hidden", ...RESULT_OK_CLASSES);
  taxiResultBox.classList.add(...RESULT_ERROR_CLASSES);
  totalFareOutput.textContent = message;
  fareNoteOutput.textContent = "";
}

function handleTaxiSubmit(event) {
  event.preventDefault();

  const distance = parseFloat(distanceInput.value.trim());

  if (!isValidDistance(distance)) {
    showFareError("Vui lòng nhập số km hợp lệ.");
    return;
  }

  const fare = calculateFare(distance);
  const discountedFare = applyDiscount(fare, distance);
  const formattedFare = formatCurrency(discountedFare);

  const note =
    distance > DISCOUNT_FROM_KM ? `Đã giảm ${DISCOUNT_RATE * 100}%` : "";

  showFare(formattedFare, note);
}

taxiForm.addEventListener("submit", handleTaxiSubmit);

taxiForm.addEventListener("reset", () => {
  taxiResultBox.classList.add("hidden");
});
