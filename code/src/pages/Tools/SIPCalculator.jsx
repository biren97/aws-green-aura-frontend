import React, { useState } from 'react';
import { calculateSIP } from '../../utils/calculations/sipCalculator';
import { TrendingUp } from 'lucide-react';

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    if (!monthlyAmount || !annualRate || !years) {
      setError('Please fill in all fields');
      return;
    }

    const m = parseFloat(monthlyAmount);
    const r = parseFloat(annualRate);
    const y = parseInt(years, 10);

    if (m <= 0 || r < 0 || y <= 0) {
      setError('Please enter valid values');
      return;
    }

    const sipResult = calculateSIP(m, r, y);
    setResult(sipResult);
  };

  const handleReset = () => {
    setMonthlyAmount('');
    setAnnualRate('');
    setYears('');
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

  const calculatePercentage = (part, whole) => {
    if (whole === 0) return 0;
    return ((part / whole) * 100).toFixed(1);
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              SIP Calculator
            </h1>
          </div>
          <p className="text-gray-400">Calculate returns from your Systematic Investment Plan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
              <form onSubmit={handleCalculate} className="space-y-5">
                {/* Monthly Investment */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Investment (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    placeholder="Enter monthly SIP amount"
                    className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Annual Return Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    placeholder="Enter expected return rate"
                    className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Investment Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="Enter investment period in years"
                    className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
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
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Invested Amount Card */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-1">Total Invested</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {formatCurrency(result.investedAmount)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      ₹{result.monthlyAmount.toLocaleString('en-IN')} × {result.monthlyAmount * result.years * 12 / result.investedAmount} months
                    </p>
                  </div>

                  {/* Estimated Returns Card */}
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-1">Estimated Gains</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(result.estimatedReturns)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {calculatePercentage(result.estimatedReturns, result.investedAmount)}% returns
                    </p>
                  </div>

                  {/* Total Value Card */}
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-1">Portfolio Value</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {formatCurrency(result.totalValue)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      After {result.years} year{result.years > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Investment Breakdown</h3>
                  <div className="space-y-4">
                    {/* Invested Amount Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">Total Invested</span>
                      </div>
                      <span className="text-gray-300 font-semibold">{formatCurrency(result.investedAmount)}</span>
                    </div>

                    {/* Returns Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <span className="text-gray-400">Estimated Gains</span>
                      </div>
                      <span className="text-green-400 font-semibold">{formatCurrency(result.estimatedReturns)}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-slate-700/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{
                          width: `${calculatePercentage(result.estimatedReturns, result.totalValue)}%`,
                        }}
                      ></div>
                    </div>

                    {/* Total Line */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                      <span className="text-gray-300 font-semibold">Portfolio Value</span>
                      <span className="text-yellow-400 font-bold text-lg">{formatCurrency(result.totalValue)}</span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-gray-300">Monthly SIP: </span>
                    {formatCurrency(result.monthlyAmount)} for {result.years} year{result.years > 1 ? 's' : ''} at {result.annualRate}% annual return
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-12 flex items-center justify-center h-full min-h-96">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-green-400/30 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">Enter your SIP details and click Calculate</p>
                  <p className="text-gray-500 text-sm">See your investment growth potential</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
