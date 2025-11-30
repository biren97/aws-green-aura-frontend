import React, { useState } from 'react';
import { calculateEMI } from '../../utils/calculations/emiCalculator';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState(null);
  const [expandSchedule, setExpandSchedule] = useState(false);
  const [error, setError] = useState('');
  const [schedulePageSize, setSchedulePageSize] = useState(12);
  const [schedulePage, setSchedulePage] = useState(1);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');

    if (!principal || !annualRate || !months) {
      setError('Please fill in all fields');
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(annualRate);
    const m = parseInt(months, 10);

    if (p <= 0 || r < 0 || m <= 0) {
      setError('Please enter valid values');
      return;
    }

    const emiResult = calculateEMI(p, r, m);
    setResult(emiResult);
  };

  const handleReset = () => {
    setPrincipal('');
    setAnnualRate('');
    setMonths('');
    setResult(null);
    setError('');
    setSchedulePage(1);
  };

  const getPaginatedSchedule = () => {
    if (!result || !result.schedule) return { items: [], totalPages: 1 };
    const startIdx = (schedulePage - 1) * schedulePageSize;
    const endIdx = startIdx + schedulePageSize;
    const items = result.schedule.slice(startIdx, endIdx);
    const totalPages = Math.ceil(result.schedule.length / schedulePageSize);
    return { items, totalPages };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
            EMI Calculator
          </h1>
          <p className="text-gray-400">Calculate your Equated Monthly Installment and view the amortization schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
              <form onSubmit={handleCalculate} className="space-y-5">
                {/* Principal Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="Enter principal amount"
                    className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Interest Rate Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    placeholder="Enter interest rate"
                    className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Months Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Tenure (Months)
                  </label>
                  <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    placeholder="Enter tenure in months"
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
                  {/* EMI Card */}
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-1">Monthly EMI</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(result.emi)}
                    </p>
                  </div>

                  {/* Total Interest Card */}
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-1">Total Interest</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>

                  {/* Total Payment Card */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-lg p-6">
                    <p className="text-gray-400 text-sm font-medium mb-1">Total Payment</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {formatCurrency(result.totalPayment)}
                    </p>
                  </div>
                </div>

                {/* Amortization Schedule */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setExpandSchedule(!expandSchedule);
                      if (!expandSchedule) setSchedulePage(1);
                    }}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-700/30 transition"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-300">Amortization Schedule</h3>
                      <span className="text-xs bg-slate-700/50 text-gray-400 px-2 py-1 rounded">
                        {result.schedule.length} months
                      </span>
                    </div>
                    {expandSchedule ? (
                      <ChevronUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-400" />
                    )}
                  </button>

                  {expandSchedule && (
                    <div className="border-t border-slate-700/50">
                      {/* Page Size Selector */}
                      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/30 border-b border-slate-700/50">
                        <label className="text-sm text-gray-400">Rows per page:</label>
                        <select
                          value={schedulePageSize}
                          onChange={(e) => {
                            setSchedulePageSize(parseInt(e.target.value, 10));
                            setSchedulePage(1);
                          }}
                          className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm text-gray-300 focus:outline-none focus:border-green-500"
                        >
                          <option value={6}>6</option>
                          <option value={12}>12</option>
                          <option value={24}>24</option>
                          <option value={36}>36</option>
                          <option value={50}>50</option>
                        </select>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-900/50 border-b border-slate-700/50 sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Month</th>
                              <th className="px-4 py-3 text-right text-gray-400 font-semibold">EMI</th>
                              <th className="px-4 py-3 text-right text-gray-400 font-semibold">Principal</th>
                              <th className="px-4 py-3 text-right text-gray-400 font-semibold">Interest</th>
                              <th className="px-4 py-3 text-right text-gray-400 font-semibold">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedSchedule().items.map((row, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-slate-700/30 hover:bg-slate-700/20 transition"
                              >
                                <td className="px-4 py-2 text-gray-400">{row.month}</td>
                                <td className="px-4 py-2 text-right text-gray-300">
                                  {formatCurrency(row.emi)}
                                </td>
                                <td className="px-4 py-2 text-right text-green-400">
                                  {formatCurrency(row.principal)}
                                </td>
                                <td className="px-4 py-2 text-right text-yellow-400">
                                  {formatCurrency(row.interest)}
                                </td>
                                <td className="px-4 py-2 text-right text-blue-400">
                                  {formatCurrency(row.balance)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/30 border-t border-slate-700/50">
                        <div className="text-xs text-gray-400">
                          Page {schedulePage} of {getPaginatedSchedule().totalPages} ({result.schedule.length} total)
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSchedulePage(Math.max(1, schedulePage - 1))}
                            disabled={schedulePage === 1}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 hover:text-green-400 transition"
                            title="Previous page"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            onClick={() => setSchedulePage(Math.min(getPaginatedSchedule().totalPages, schedulePage + 1))}
                            disabled={schedulePage === getPaginatedSchedule().totalPages}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 hover:text-green-400 transition"
                            title="Next page"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-12 flex items-center justify-center h-full min-h-96">
                <div className="text-center">
                  <p className="text-gray-400 text-lg mb-2">Enter loan details and click Calculate</p>
                  <p className="text-gray-500 text-sm">Your EMI calculation will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
