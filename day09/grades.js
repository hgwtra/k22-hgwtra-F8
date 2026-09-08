const RESULT_OK_CLASSES = ["border-line", "bg-soft"];
const RESULT_ERROR_CLASSES = ["border-f8", "bg-f8-soft"];

const gradeForm = document.querySelector("#grade-form");
const mathInput = document.querySelector("#math-score");
const literatureInput = document.querySelector("#literature-score");
const englishInput = document.querySelector("#english-score");

const resultBox = document.querySelector("#grade-result");
const averageOutput = document.querySelector("#average-score");
const levelOutput = document.querySelector("#performance-level");

function isValidScore(score) {
  if (0 <= score && score <= 10) {
    return true;
  }

  return false;
}

function calculateAverage(scores) {
  const sum = scores.reduce((total, score) => total + score, 0);
  const average = sum / scores.length;

  return Math.round(average * 10) / 10;
}

function classifyPerformance(average, scores) {
  if (average >= 9 && !scores.some((score) => score < 8)) {
    return "Xuất sắc";
  }

  if (average >= 8 && !scores.some((score) => score < 6.5)) {
    return "Giỏi";
  }

  if (average >= 6.5 && !scores.some((score) => score < 5)) {
    return "Khá";
  }

  if (average >= 5 && !scores.some((score) => score < 3.5)) {
    return "Trung bình";
  }

  return "Yếu";
}

function showResult(average, level) {
  resultBox.classList.remove("hidden", ...RESULT_ERROR_CLASSES);
  resultBox.classList.add(...RESULT_OK_CLASSES);
  averageOutput.textContent = average;
  levelOutput.textContent = `Học lực: ${level}`;
}

function showError(message) {
  resultBox.classList.remove("hidden", ...RESULT_OK_CLASSES);
  resultBox.classList.add(...RESULT_ERROR_CLASSES);
  averageOutput.textContent = message;
  levelOutput.textContent = "";
}

function handleGradeSubmit(event) {
  event.preventDefault();

  const mathScore = parseFloat(mathInput.value.trim());
  const literatureScore = parseFloat(literatureInput.value.trim());
  const englishScore = parseFloat(englishInput.value.trim());

  if (
    !isValidScore(mathScore) ||
    !isValidScore(literatureScore) ||
    !isValidScore(englishScore)
  ) {
    showError("Vui lòng nhập điểm hợp lệ (0 - 10).");
    return;
  }

  const scores = [mathScore, literatureScore, englishScore];

  const average = calculateAverage(scores);
  const level = classifyPerformance(average, scores);

  showResult(average, level);
}

gradeForm.addEventListener("submit", handleGradeSubmit);

gradeForm.addEventListener("reset", () => {
  resultBox.classList.add("hidden");
});
