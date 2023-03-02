const form = document.querySelector("form");
const loanAmountUI = document.querySelector("#loan-amount");
const interestUI = document.querySelector("#interest");
const repayTimeUI = document.querySelector("#repay-time");
const loadingGif = document.querySelector(".loading-gif");
const loanResults = document.querySelector(".loan-results");
const calculateButton = document.querySelector(".calculate-button");

(function loadAllEventListners() {
    form.addEventListener("submit", computeResults);
    loanAmountUI.addEventListener("keyup", clearAlphabets);
    interestUI.addEventListener("keyup", clearAlphabets);
    repayTimeUI.addEventListener("keyup", clearAlphabets);
    calculateButton.addEventListener("click", clearLoanResultsSection);
}) ();
function computeResults(e) {
    e.preventDefault();
    const monthlyPaymentUI = document.querySelector("#monthly-payment");
    const totalPaymentUI = document.querySelector("#total-payment");
    const totalInterestUI = document.querySelector("#total-interest");
    const loanAmount = Number(loanAmountUI.value);
    const interest = Number(interestUI.value) / 100 / 12;
    const computedPayments = Number(repayTimeUI.value) * 12;

    // Calculating Monthly Payment
    const x = Math.pow(1 + interest, computedPayments);
    const monthlyPayment = (loanAmount * x * interest) / (x - 1);

    if (isFinite(monthlyPayment)) {
        monthlyPaymentUI.value = monthlyPayment.toFixed(2);
        totalPaymentUI.value = (monthlyPayment * computedPayments).toFixed(2);
        totalInterestUI.value = ((monthlyPayment * computedPayments) - loanAmount).toFixed(2);
        loadingGif.style.display = "grid";
        setTimeout(removeLoadingGif, 0560);
    } else {
        displayError("Kindly recheck your numbers");
    }
}
function displayError(error) {
    const errorMessage = document.createElement("div");
    const errorText = document.createTextNode(error);
    const appHeading = document.querySelector("#app-heading");

    errorMessage.className = "error-message center mb-15 mb-13-5";
    errorMessage.appendChild(errorText);

    form.insertBefore(errorMessage, appHeading);
    setTimeout(clearError, 1200);
}
function clearError() {
    document.querySelector(".error-message").remove();
}
function clearAlphabets(e) {
    if (e.target.value === "") {
        e.target.value = "";
    }
}
function removeLoadingGif() {
    loadingGif.style.display = "none";
    loanResults.style.display = "block";
}
function clearLoanResultsSection() {
    loadingGif.style.display = "none";
    loanResults.style.display = "none";
}