const otpButton = document.querySelector("#otp-btn");
const otpValueOutput = document.querySelector("#otp-value");

function generateOTP() {
  return Math.floor(Math.random() * 900000) + 100000;
}

function showOTP(otp) {
  otpValueOutput.textContent = otp;
}

function handleOtpClick() {
  const otp = generateOTP();
  showOTP(otp);
}

otpButton.addEventListener("click", handleOtpClick);
