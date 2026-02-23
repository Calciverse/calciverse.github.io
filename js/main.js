function calculateMortgage() {

    const currency = document.getElementById("currency").value;
    const homePrice = parseFloat(document.getElementById("homePrice").value);
    const downPayment = parseFloat(document.getElementById("downPayment").value) || 0;
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanYears").value);

    if (!homePrice || !annualRate || !years) {
        document.getElementById("result").innerHTML = "Please enter required fields correctly.";
        document.getElementById("amortization").innerHTML = "";
        return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyRate = (annualRate / 100) / 12;
    const totalPayments = years * 12;

    const monthlyPayment =
        loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    document.getElementById("result").innerHTML =
        "Loan Amount: " + currency + formatNumber(loanAmount) + "<br><br>" +
        "Monthly Payment: " + currency + formatNumber(monthlyPayment) + "<br>" +
        "Total Payment: " + currency + formatNumber(totalPayment) + "<br>" +
        "Total Interest: " + currency + formatNumber(totalInterest);

    // ===== Amortization Schedule =====
    let balance = loanAmount;
    let scheduleHTML = "<h3 style='margin-top:30px;'>Amortization Schedule (Yearly)</h3>";
    scheduleHTML += "<table style='width:100%; margin-top:10px; border-collapse:collapse;'>";
    scheduleHTML += "<tr style='background:#E2E8F0;'>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Year</th>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Principal Paid</th>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Interest Paid</th>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Remaining Balance</th>" +
        "</tr>";

    for (let year = 1; year <= years; year++) {

        let yearlyPrincipal = 0;
        let yearlyInterest = 0;

        for (let month = 1; month <= 12; month++) {

            let interestPayment = balance * monthlyRate;
            let principalPayment = monthlyPayment - interestPayment;

            yearlyPrincipal += principalPayment;
            yearlyInterest += interestPayment;

            balance -= principalPayment;

            if (balance < 0) balance = 0;
        }

        scheduleHTML += "<tr>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + year + "</td>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(yearlyPrincipal) + "</td>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(yearlyInterest) + "</td>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(balance) + "</td>" +
            "</tr>";
    }

    scheduleHTML += "</table>";

    document.getElementById("amortization").innerHTML = scheduleHTML;
}
function calculateLoan() {

    const currency = document.getElementById("loanCurrency").value;
    const loan = parseFloat(document.getElementById("loanAmountInput").value);
    const annualRate = parseFloat(document.getElementById("loanInterestRate").value);
    const years = parseFloat(document.getElementById("loanYearsInput").value);

    if (!loan || !annualRate || !years) {
        document.getElementById("loanResult").innerHTML = "Please enter required fields correctly.";
        return;
    }

    const monthlyRate = (annualRate / 100) / 12;
    const totalPayments = years * 12;

    const emi =
        loan * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPayment = emi * totalPayments;
    const totalInterest = totalPayment - loan;

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    document.getElementById("loanResult").innerHTML =
        "Monthly EMI: " + currency + formatNumber(emi) + "<br><br>" +
        "Total Payment: " + currency + formatNumber(totalPayment) + "<br>" +
        "Total Interest: " + currency + formatNumber(totalInterest);
}
function calculateCompound() {

    const currency = document.getElementById("ciCurrency").value;
    const principal = parseFloat(document.getElementById("ciPrincipal").value);
    const rate = parseFloat(document.getElementById("ciRate").value);
    const years = parseFloat(document.getElementById("ciYears").value);
    const frequency = parseFloat(document.getElementById("ciFrequency").value);

    if (!principal || !rate || !years) {
        document.getElementById("ciResult").innerHTML = "Please enter required fields correctly.";
        return;
    }

    const r = rate / 100;
    const amount = principal * Math.pow((1 + r / frequency), frequency * years);
    const interest = amount - principal;

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    document.getElementById("ciResult").innerHTML =
        "Final Amount: " + currency + formatNumber(amount) + "<br><br>" +
        "Total Interest Earned: " + currency + formatNumber(interest);
}
let sipChartInstance = null;

function calculateSIP() {

  const currency = document.getElementById("currency").value;
  const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);

  if (!monthlyInvestment || !annualRate || !years) {
    document.getElementById("result").innerHTML = "Please fill all fields.";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  let maturityAmount = 0;
  let totalInvestment = 0;

  let labels = [];
  let investmentData = [];
  let valueData = [];

  for (let i = 1; i <= months; i++) {

    maturityAmount =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) *
      (1 + monthlyRate);

    totalInvestment = monthlyInvestment * i;

    if (i % 12 === 0) {
      labels.push("Year " + (i / 12));
      investmentData.push(totalInvestment.toFixed(2));
      valueData.push(maturityAmount.toFixed(2));
    }
  }

  const totalReturns = maturityAmount - (monthlyInvestment * months);

  document.getElementById("result").innerHTML =
    "Total Investment: " + currency + (monthlyInvestment * months).toFixed(2) + "<br>" +
    "Estimated Returns: " + currency + totalReturns.toFixed(2) + "<br><br>" +
    "<strong>Maturity Amount: " + currency + maturityAmount.toFixed(2) + "</strong>";

  const ctx = document.getElementById("sipChart").getContext("2d");

  if (sipChartInstance) {
    sipChartInstance.destroy();
  }

  sipChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Investment",
          data: investmentData,
          borderWidth: 2,
          fill: false
        },
        {
          label: "Investment Value",
          data: valueData,
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });
}
let emiChartInstance = null;
let scheduleMode = "yearly";

function setScheduleMode(mode) {
  scheduleMode = mode;

  document.getElementById("yearlyTab").classList.remove("active");
  document.getElementById("monthlyTab").classList.remove("active");

  if (mode === "yearly") {
    document.getElementById("yearlyTab").classList.add("active");
  } else {
    document.getElementById("monthlyTab").classList.add("active");
  }

  calculateEMI();
}

function calculateEMI() {

  const currency = document.getElementById("currency").value;
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);

  if (isNaN(loanAmount) || isNaN(annualRate) || isNaN(years)) {
    document.getElementById("result").innerHTML = "Please fill all fields correctly.";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  const emi =
    loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  document.getElementById("result").innerHTML =
    "Monthly EMI: " + currency + emi.toFixed(2) + "<br>" +
    "Total Interest: " + currency + totalInterest.toFixed(2) + "<br><br>" +
    "<strong>Total Payment: " + currency + totalPayment.toFixed(2) + "</strong>";

  // Chart
  const chartCanvas = document.getElementById("emiChart");
  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");

    if (emiChartInstance) {
      emiChartInstance.destroy();
    }

    emiChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [{
          data: [loanAmount, totalInterest]
        }]
      },
      options: { responsive: true }
    });
  }

  // Amortization Table
  const table = document.getElementById("amortTable");
  if (!table) return;

  const tableBody = table.querySelector("tbody");
  tableBody.innerHTML = "";

  let balance = loanAmount;

  for (let month = 1; month <= months; month++) {

    const interest = balance * monthlyRate;
    const principal = emi - interest;
    balance -= principal;

    if (scheduleMode === "monthly") {

      const row = `
        <tr>
          <td>${month}</td>
          <td>${currency}${emi.toFixed(2)}</td>
          <td>${currency}${principal.toFixed(2)}</td>
          <td>${currency}${interest.toFixed(2)}</td>
          <td>${currency}${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
        </tr>
      `;

      tableBody.innerHTML += row;

    } else {

      if (month % 12 === 0) {
        const year = month / 12;

        const row = `
          <tr>
            <td>Year ${year}</td>
            <td>${currency}${(emi * 12).toFixed(2)}</td>
            <td>-</td>
            <td>-</td>
            <td>${currency}${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
          </tr>
        `;

        tableBody.innerHTML += row;
      }

    }
  }
}
let fdChartInstance = null;
let fdLineChartInstance = null;

function calculateFD() {

  const currency = document.getElementById("fdCurrency").value;
  const principal = parseFloat(document.getElementById("fdPrincipal").value);
  const rate = parseFloat(document.getElementById("fdRate").value);
  const years = parseFloat(document.getElementById("fdYears").value);
  const type = document.getElementById("fdType").value;
  const frequency = parseInt(document.getElementById("fdFrequency").value);

  if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
    document.getElementById("fdResult").innerHTML = "Please fill all fields correctly.";
    return;
  }

  const r = rate / 100;
  let maturity;

  if (type === "simple") {
    maturity = principal * (1 + r * years);
  } else {
    maturity = principal * Math.pow((1 + r / frequency), frequency * years);
  }

  const interest = maturity - principal;

  document.getElementById("fdResult").innerHTML =
    "Principal: " + currency + principal.toFixed(2) + "<br>" +
    "Interest Earned: " + currency + interest.toFixed(2) + "<br><br>" +
    "<strong>Maturity Amount: " + currency + maturity.toFixed(2) + "</strong>";

  const chartCanvas = document.getElementById("fdChart");

  if (fdChartInstance) {
    fdChartInstance.destroy();
  }
    // Year-wise Table
let yearLabels = [];
let balanceData = [];
const table = document.getElementById("fdTable");
if (table) {

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  let balance = principal;

  for (let year = 1; year <= years; year++) {

    const opening = balance;

    let closing;

    if (type === "simple") {
      closing = principal * (1 + r * year);
    } else {
      closing = principal * Math.pow((1 + r / frequency), frequency * year);
    }

    const yearlyInterest = closing - opening;

    const row = `
      <tr>
        <td>${year}</td>
        <td>${currency}${opening.toFixed(2)}</td>
        <td>${currency}${yearlyInterest.toFixed(2)}</td>
        <td>${currency}${closing.toFixed(2)}</td>
      </tr>
    `;

    tbody.innerHTML += row;

    balance = closing;
      yearLabels.push("Year " + year);
      balanceData.push(closing);
  }
}

  fdChartInstance = new Chart(chartCanvas, {
    type: "doughnut",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [{
        data: [principal, interest]
      }]
    },
     options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

}
let ppfChartInstance = null;

function calculatePPF() {

  const yearlyInvestment = parseFloat(document.getElementById("ppfInvestment").value);
  const rate = parseFloat(document.getElementById("ppfRate").value) / 100;
  const years = parseInt(document.getElementById("ppfYears").value);

  if (isNaN(yearlyInvestment) || isNaN(rate) || isNaN(years)) {
    document.getElementById("ppfResult").innerHTML = "Please fill all fields correctly.";
    return;
  }

  let balance = 0;
  let totalInvested = 0;

  const tableBody = document.querySelector("#ppfTable tbody");
  tableBody.innerHTML = "";

  for (let year = 1; year <= years; year++) {

    totalInvested += yearlyInvestment;

    balance = (balance + yearlyInvestment) * (1 + rate);

    const interest = balance - totalInvested;

    const row = `
      <tr>
        <td>${year}</td>
        <td>₹${totalInvested.toFixed(2)}</td>
        <td>₹${interest.toFixed(2)}</td>
        <td>₹${balance.toFixed(2)}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  }

  const totalInterest = balance - totalInvested;

  document.getElementById("ppfResult").innerHTML =
    "Total Invested: ₹" + totalInvested.toFixed(2) + "<br>" +
    "Total Interest: ₹" + totalInterest.toFixed(2) + "<br><br>" +
    "<strong>Maturity Amount: ₹" + balance.toFixed(2) + "</strong>";

  const ctx = document.getElementById("ppfChart");

  if (ppfChartInstance) {
    ppfChartInstance.destroy();
  }

  ppfChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested Amount", "Interest Earned"],
      datasets: [{
        data: [totalInvested, totalInterest]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
