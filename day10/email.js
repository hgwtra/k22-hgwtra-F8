const RESULT_OK_CLASSES = ["border-line", "bg-soft"];
const RESULT_ERROR_CLASSES = ["border-f8", "bg-f8-soft"];

const emailForm = document.querySelector("#email-form");
const emailInput = document.querySelector("#email-input");

const emailResultBox = document.querySelector("#email-result");
const emailValueOutput = document.querySelector("#email-value");

function maskEmail(email) {
  const username = email.slice(0, email.indexOf("@"));
  const domain = email.slice(email.indexOf("@") + 1);

  let maskedUsername = "";

  if (username.length > 4) {
    maskedUsername =
      username.slice(0, 2) +
      "*".repeat(username.length - 4) +
      username.slice(-2);
  } else {
    maskedUsername = username.charAt(0) + "*".repeat(username.length - 1);
  }

  return maskedUsername + "@" + domain;
}

function showEmailResult(maskedEmail) {
  emailResultBox.classList.remove("hidden", ...RESULT_ERROR_CLASSES);
  emailResultBox.classList.add(...RESULT_OK_CLASSES);
  emailValueOutput.textContent = maskedEmail;
}

function showEmailError(message) {
  emailResultBox.classList.remove("hidden", ...RESULT_OK_CLASSES);
  emailResultBox.classList.add(...RESULT_ERROR_CLASSES);
  emailValueOutput.textContent = message;
}

function handleEmailSubmit(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const atIndex = email.indexOf("@");

  if (atIndex <= 0 || atIndex === email.length - 1) {
    showEmailError("Vui lòng nhập email hợp lệ.");
    return;
  }

  const maskedEmail = maskEmail(email);

  console.log(`Input: email = "${email}"`);
  console.log(`Output: "${maskedEmail}"`);

  showEmailResult(maskedEmail);
}

emailForm.addEventListener("submit", handleEmailSubmit);

emailForm.addEventListener("reset", () => {
  emailResultBox.classList.add("hidden");
});
