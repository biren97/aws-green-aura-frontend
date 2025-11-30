import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { strategyService } from '../services/endpoints'

const StrategyHistoryModal = ({ strategy, onClose }) => {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchTrades()
  }, [strategy.id, currentPage])

  const fetchTrades = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await strategyService.getStrategyTrades(strategy.id, currentPage, itemsPerPage)
      setTrades(response.data.results || response.data)
      setTotalPages(Math.ceil((response.data.count || 0) / itemsPerPage))
    } catch (err) {
      setError('Failed to load trade history')
      console.error('Error fetching trades:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProfitColor = (value) => {
    const num = parseFloat(value)
    if (num > 0) return 'text-green-400'
    if (num < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-accent-dark border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/50">
          <div>
            <h2 className="text-xl font-bold text-gray-100">{strategy.name}</h2>
            <p className="text-xs text-gray-400 mt-1">Trade History & Performance</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded transition"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader size={32} className="text-primary-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-red-400 text-sm">{error}</div>
            </div>
          ) : trades.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400 text-sm">No trades recorded yet</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900/50 sticky top-0">
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300">Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">Buy Price</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">Sell Price</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">P&L Amount</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-300">P&L %</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, index) => (
                    <tr key={trade.id || index} className="border-b border-gray-700 hover:bg-gray-800/50 transition">
                      <td className="px-4 py-3 text-gray-300">
                        {new Date(trade.trade_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-100">{trade.stock_symbol}</td>
                      <td className="px-4 py-3 text-right text-gray-300">₹{trade.buy_price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{trade.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-300">₹{trade.sell_price.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${getProfitColor(trade.profit_amount)}`}>
                        ₹{trade.profit_amount.toFixed(2)}
                      </td>
                      <td className={`px-4 py-3 text-right font-semibold ${getProfitColor(trade.profit_percentage)}`}>
                        {trade.profit_percentage.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          trade.profit_percentage >= 0
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {trade.profit_percentage >= 0 ? 'PROFIT' : 'LOSS'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer with Pagination */}
        {!loading && trades.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-700 bg-gray-900/50">
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages} • {trades.length} trades
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm transition ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StrategyHistoryModal
