const RESULT_OK_CLASSES = ["border-line", "bg-soft"];
const RESULT_ERROR_CLASSES = ["border-f8", "bg-f8-soft"];

const fullNameForm = document.querySelector("#fullname-form");
const fullNameInput = document.querySelector("#fullname-input");

const fullNameResultBox = document.querySelector("#fullname-result");
const fullNameValueOutput = document.querySelector("#fullname-value");

function normalizeFullName(fullName) {
  const words = fullName.trim().split(/\s+/);
  const normalizedWords = words.map((word) => {
    const lowerCaseWord = word.toLowerCase();
    return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
  });

  return normalizedWords.join(" ");
}

function showFullNameResult(normalizedName) {
  fullNameResultBox.classList.remove("hidden", ...RESULT_ERROR_CLASSES);
  fullNameResultBox.classList.add(...RESULT_OK_CLASSES);
  fullNameValueOutput.textContent = normalizedName;
}

function showFullNameError(message) {
  fullNameResultBox.classList.remove("hidden", ...RESULT_OK_CLASSES);
  fullNameResultBox.classList.add(...RESULT_ERROR_CLASSES);
  fullNameValueOutput.textContent = message;
}

function handleFullNameSubmit(event) {
  event.preventDefault();

  const fullName = fullNameInput.value;

  if (fullName.trim() === "") {
    showFullNameError("Vui lòng nhập họ và tên.");
    return;
  }

  const normalizedName = normalizeFullName(fullName);

  showFullNameResult(normalizedName);
}

fullNameForm.addEventListener("submit", handleFullNameSubmit);

fullNameForm.addEventListener("reset", () => {
  fullNameResultBox.classList.add("hidden");
});
