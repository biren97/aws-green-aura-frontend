import React, { useState } from 'react';
import { calculateStockAverage } from '../../utils/calculations/stockAverage';
import { BarChart3 } from 'lucide-react';

export default function StockAverageCalculator() {
  const [price1, setPrice1] = useState('');
  const [qty1, setQty1] = useState('');
  const [price2, setPrice2] = useState('');
  const [qty2, setQty2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    if (!price1 || !qty1 || !price2 || !qty2) {
      setError('Please fill in all fields');
      return;
    }

    const p1 = parseFloat(price1);
    const q1 = parseFloat(qty1);
    const p2 = parseFloat(price2);
    const q2 = parseFloat(qty2);

    if (p1 <= 0 || q1 <= 0 || p2 <= 0 || q2 <= 0) {
      setError('Please enter valid positive values');
      return;
    }

    const avgResult = calculateStockAverage(p1, q1, p2, q2);
    setResult(avgResult);
  };

  const handleReset = () => {
    setPrice1('');
    setQty1('');
    setPrice2('');
    setQty2('');
    setResult(null);
    setError('');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getDifferential = () => {
    if (!result) return 0;
    return result.averagePrice - Math.min(result.price1, result.price2);
  };

  const getOptimalPrice = () => {
    if (!result) return 0;
    return Math.min(result.price1, result.price2);
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Stock Average Calculator
            </h1>
          </div>
          <p className="text-gray-400">Calculate your average purchase price for multiple stock purchases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Initial Investment Section */}
                <div className="pb-4 border-b border-slate-700/50">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 text-yellow-400">Initial Purchase</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Stock Price (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={price1}
                        onChange={(e) => setPrice1(e.target.value)}
                        placeholder="Enter purchase price"
                        className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={qty1}
                        onChange={(e) => setQty1(e.target.value)}
                        placeholder="Number of shares"
                        className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Second Investment Section */}
                <div className="pb-4 border-b border-slate-700/50">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 text-blue-400">Second Purchase</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Stock Price (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={price2}
                        onChange={(e) => setPrice2(e.target.value)}
                        placeholder="Enter purchase price"
                        className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={qty2}
                        onChange={(e) => setQty2(e.target.value)}
                        placeholder="Number of shares"
                        className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2.5 rounded transition transform hover:scale-105"
                  >
                    Calculate
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 font-semibold py-2.5 rounded border border-slate-600/50 transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {result ? (
              <div className="space-y-6">
                {/* Main Result Card */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-8">
                  <p className="text-gray-400 text-sm font-medium mb-2">Average Purchase Price</p>
                  <p className="text-5xl font-bold text-green-400 mb-2">
                    {formatCurrency(result.averagePrice)}
                  </p>
                  <div className="text-xs text-gray-500">
                    <p>Total Quantity: {result.totalQty.toLocaleString('en-IN')} shares</p>
                    <p>Total Investment: {formatCurrency(result.totalInvestment)}</p>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Initial Investment Card */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-2">Initial Investment</p>
                    <p className="text-2xl font-bold text-yellow-400 mb-2">
                      {formatCurrency(result.initialInvestment)}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>@ {formatCurrency(result.price1)} × {result.quantity1}</p>
                    </div>
                  </div>

                  {/* Second Investment Card */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-2">Second Investment</p>
                    <p className="text-2xl font-bold text-blue-400 mb-2">
                      {formatCurrency(result.secondInvestment)}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>@ {formatCurrency(result.price2)} × {result.quantity2}</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Breakdown</h3>
                  <div className="space-y-3">
                    {/* Total Quantity */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                      <span className="text-gray-400">Total Shares</span>
                      <span className="text-gray-300 font-semibold">{result.totalQty.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Total Investment */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                      <span className="text-gray-400">Total Investment</span>
                      <span className="text-gray-300 font-semibold">{formatCurrency(result.totalInvestment)}</span>
                    </div>

                    {/* Average Price */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                      <span className="text-gray-400">Average Price per Share</span>
                      <span className="text-green-400 font-bold text-lg">{formatCurrency(result.averagePrice)}</span>
                    </div>

                    {/* Best Price Indicator */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-gray-400">Best Purchase Price</span>
                      <div className="text-right">
                        <p className="text-gray-300 font-semibold">{formatCurrency(getOptimalPrice())}</p>
                        <p className="text-xs text-gray-500">Differential: {formatCurrency(getDifferential())}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight Box */}
                <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-gray-300">Insight: </span>
                    Your average purchase price is {result.averagePrice > Math.min(result.price1, result.price2) ? 'higher' : 'lower'} than your best purchase price by {formatCurrency(Math.abs(getDifferential()))}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-12 flex items-center justify-center h-full min-h-96">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-green-400/30 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">Enter your stock purchases and click Calculate</p>
                  <p className="text-gray-500 text-sm">Find your average cost basis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
