/**
 * Calculate SIP (Systematic Investment Plan) returns
 * @param {number} monthlyAmount - Monthly investment amount
 * @param {number} annualRate - Annual return rate (%)
 * @param {number} years - Investment tenure in years
 * @returns {object} - Contains investedAmount, estimatedReturns, totalValue
 */
export const calculateSIP = (monthlyAmount, annualRate, years) => {
  if (!monthlyAmount || !annualRate || !years) {
    return null;
  }

  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = years * 12;

  // FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  // where P = monthly amount, r = monthly rate, n = number of months
  const futureValue = 
    monthlyAmount * 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
    (1 + monthlyRate);

  const investedAmount = monthlyAmount * totalMonths;
  const estimatedReturns = futureValue - investedAmount;

  return {
    investedAmount: Math.round(investedAmount * 100) / 100,
    estimatedReturns: Math.round(estimatedReturns * 100) / 100,
    totalValue: Math.round(futureValue * 100) / 100,
    monthlyAmount: Math.round(monthlyAmount * 100) / 100,
    years,
    annualRate,
  };
};
