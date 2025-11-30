import React, { useState } from 'react';
import { convertTimezone, timeZones } from '../../utils/calculations/timezoneConverter';
import { Globe, ArrowRightLeft } from 'lucide-react';

export default function TimezoneConverter() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [fromTz, setFromTz] = useState('');
  const [toTz, setToTz] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = (e) => {
    e.preventDefault();
    setError('');

    if (!date || !time || !fromTz || !toTz) {
      setError('Please fill in all fields');
      return;
    }

    if (fromTz === toTz) {
      setError('Please select different timezones');
      return;
    }

    const conversionResult = convertTimezone(date, time, fromTz, toTz);
    if (conversionResult) {
      setResult(conversionResult);
    } else {
      setError('Invalid date or time');
    }
  };

  const handleReset = () => {
    setDate('');
    setTime('');
    setFromTz('');
    setToTz('');
    setResult(null);
    setError('');
  };

  const handleSwapTimezones = () => {
    const temp = fromTz;
    setFromTz(toTz);
    setToTz(temp);
  };

  const getTimeZoneLabel = (tzValue) => {
    const tz = timeZones.find((t) => t.value === tzValue);
    return tz ? tz.label : tzValue;
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Timezone Converter
            </h1>
          </div>
          <p className="text-gray-400">Convert date and time across different timezones</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 mb-8">
          <form onSubmit={handleConvert} className="space-y-6">
            {/* Date and Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-green-500 transition"
                />
              </div>
            </div>

            {/* Timezone Selection Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              {/* From Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">From Timezone</label>
                <select
                  value={fromTz}
                  onChange={(e) => setFromTz(e.target.value)}
                  className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-green-500 transition"
                >
                  <option value="">Select source timezone</option>
                  {timeZones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">To Timezone</label>
                <select
                  value={toTz}
                  onChange={(e) => setToTz(e.target.value)}
                  className="w-full bg-slate-900/50 border border-green-500/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-green-500 transition"
                >
                  <option value="">Select target timezone</option>
                  {timeZones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Timezone Swap Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapTimezones}
                disabled={!fromTz || !toTz}
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-full transition transform hover:scale-110"
                title="Swap timezones"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
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
                Convert
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

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Conversion Result */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Original Time */}
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-2">Original Time</p>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-400">
                      {result.originalTime}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {result.originalDate}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {result.originalDayOfWeek}
                    </p>
                    <p className="text-xs text-green-300 font-semibold">
                      {getTimeZoneLabel(result.originalTimeZone)}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="relative">
                    <div className="hidden sm:block absolute inset-y-0 left-0 right-0 flex items-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-green-400 to-emerald-400"></div>
                    </div>
                    <div className="sm:hidden flex justify-center">
                      <div className="h-12 w-0.5 bg-gradient-to-b from-green-400 to-emerald-400"></div>
                    </div>
                  </div>
                </div>

                {/* Converted Time */}
                <div className="sm:col-start-2">
                  <p className="text-gray-400 text-sm font-medium mb-2">Converted Time</p>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-emerald-400">
                      {result.convertedTime}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {result.convertedDate}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {result.convertedDayOfWeek}
                    </p>
                    <p className="text-xs text-emerald-300 font-semibold">
                      {getTimeZoneLabel(result.convertedTimeZone)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timezone Comparison Card */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Timezone Comparison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* From TZ Info */}
                <div className="bg-slate-900/50 rounded p-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Source Timezone</p>
                  <p className="text-sm text-gray-300 break-words">{getTimeZoneLabel(result.originalTimeZone)}</p>
                </div>

                {/* To TZ Info */}
                <div className="bg-slate-900/50 rounded p-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Target Timezone</p>
                  <p className="text-sm text-gray-300 break-words">{getTimeZoneLabel(result.convertedTimeZone)}</p>
                </div>
              </div>
            </div>

            {/* Conversion Summary */}
            <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
              <p className="text-sm text-gray-400 text-center">
                <span className="font-semibold text-gray-300">{result.output}</span>
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-12 flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-16 h-16 text-green-400/30 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">Select date, time, and timezones</p>
              <p className="text-gray-500 text-sm">Click Convert to see the result</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
