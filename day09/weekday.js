const RESULT_OK_CLASSES = ["border-line", "bg-soft"];
const RESULT_ERROR_CLASSES = ["border-f8", "bg-f8-soft"];

const weekdayForm = document.querySelector("#weekday-form");
const dayNumberInput = document.querySelector("#day-number");

const weekdayResultBox = document.querySelector("#weekday-result");
const weekdayNameOutput = document.querySelector("#weekday-name");

function getWeekdayName(dayNumber) {
  switch (dayNumber) {
    case 1:
      return "Chủ nhật";
    case 2:
      return "Thứ hai";
    case 3:
      return "Thứ ba";
    case 4:
      return "Thứ tư";
    case 5:
      return "Thứ năm";
    case 6:
      return "Thứ sáu";
    case 7:
      return "Thứ bảy";
    default:
      return "";
  }
}

function showWeekday(weekdayName, isError = false) {
  const classesToAdd = isError ? RESULT_ERROR_CLASSES : RESULT_OK_CLASSES;
  const classesToRemove = isError ? RESULT_OK_CLASSES : RESULT_ERROR_CLASSES;

  weekdayResultBox.classList.remove("hidden", ...classesToRemove);
  weekdayResultBox.classList.add(...classesToAdd);
  weekdayNameOutput.textContent = weekdayName;
}

function handleWeekdaySubmit(event) {
  event.preventDefault();

  const dayNumber = parseInt(dayNumberInput.value.trim(), 10);

  if (dayNumber < 1 || dayNumber > 7 || isNaN(dayNumber)) {
    showWeekday("Không hợp lệ.", true);
    return;
  }

  const weekdayName = getWeekdayName(dayNumber);

  showWeekday(weekdayName);
}

weekdayForm.addEventListener("submit", handleWeekdaySubmit);

weekdayForm.addEventListener("reset", () => {
  weekdayResultBox.classList.add("hidden");
});
