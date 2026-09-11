const RESULT_OK_CLASSES = ["border-line", "bg-soft"];
const RESULT_ERROR_CLASSES = ["border-f8", "bg-f8-soft"];

const primeForm = document.querySelector("#prime-form");
const numberInput = document.querySelector("#number-input");

const primeResultBox = document.querySelector("#prime-result");
const primeValueOutput = document.querySelector("#prime-value");
const primeNoteOutput = document.querySelector("#prime-note");

function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  if (n <= 3) {
    return true;
  }
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

function showPrimeResult(isPrimeNumber) {
  primeResultBox.classList.remove("hidden", ...RESULT_ERROR_CLASSES);
  primeResultBox.classList.add(...RESULT_OK_CLASSES);
  primeValueOutput.textContent = isPrimeNumber;
  primeNoteOutput.textContent = isPrimeNumber
    ? "n là số nguyên tố."
    : "n không phải là số nguyên tố.";
}

function showPrimeError(message) {
  primeResultBox.classList.remove("hidden", ...RESULT_OK_CLASSES);
  primeResultBox.classList.add(...RESULT_ERROR_CLASSES);
  primeValueOutput.textContent = message;
  primeNoteOutput.textContent = "";
}

function handlePrimeSubmit(event) {
  event.preventDefault();

  const n = parseInt(numberInput.value.trim(), 10);

  if (isNaN(n)) {
    showPrimeError("Vui lòng nhập một số nguyên.");
    return;
  }

  const result = isPrime(n);

  showPrimeResult(result);
}

primeForm.addEventListener("submit", handlePrimeSubmit);

primeForm.addEventListener("reset", () => {
  primeResultBox.classList.add("hidden");
});
