/**
 * Calculate EMI (Equated Monthly Installment)
 * @param {number} principal - Principal loan amount
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} months - Tenure in months
 * @returns {object} - Contains EMI, totalPayment, totalInterest, amortizationSchedule
 */
export const calculateEMI = (principal, annualRate, months) => {
  if (!principal || !annualRate || !months) {
    return null;
  }

  const monthlyRate = annualRate / (12 * 100);
  
  // EMI formula: EMI = (P * r * (1+r)^n) / ((1+r)^n - 1)
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const emi = numerator / denominator;

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  // Generate amortization schedule
  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    schedule.push({
      month: i,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100), // Avoid negative due to floating point
    });
  }

  return {
    emi: Math.round(emi * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principal: Math.round(principal * 100) / 100,
    schedule,
  };
};
