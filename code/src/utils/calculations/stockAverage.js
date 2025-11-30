/**
 * Calculate average stock price for multiple purchases
 * @param {number} price1 - Initial stock purchase price
 * @param {number} qty1 - Initial quantity purchased
 * @param {number} price2 - Second stock purchase price
 * @param {number} qty2 - Second quantity purchased
 * @returns {object} - Contains totalQty, totalInvestment, averagePrice, initialInvestment, secondInvestment
 */
export const calculateStockAverage = (price1, qty1, price2, qty2) => {
  if (!price1 || !qty1 || !price2 || !qty2) {
    return null;
  }

  const initialInvestment = price1 * qty1;
  const secondInvestment = price2 * qty2;
  const totalInvestment = initialInvestment + secondInvestment;
  const totalQty = qty1 + qty2;
  const averagePrice = totalInvestment / totalQty;

  return {
    initialInvestment: Math.round(initialInvestment * 100) / 100,
    secondInvestment: Math.round(secondInvestment * 100) / 100,
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    totalQty: Math.round(totalQty * 100) / 100,
    averagePrice: Math.round(averagePrice * 100) / 100,
    quantity1: qty1,
    quantity2: qty2,
    price1: Math.round(price1 * 100) / 100,
    price2: Math.round(price2 * 100) / 100,
  };
};
