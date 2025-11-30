import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { stockService, strategyService } from '../services/endpoints'
import { Loader, TrendingUp, Target, AlertCircle } from 'lucide-react'

const Recommendations = () => {
  const [searchParams] = useSearchParams()
  const strategyId = searchParams.get('strategy')
  const [strategy, setStrategy] = useState(null)
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    if (strategyId) {
      fetchData()
    }
  }, [strategyId, page])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [strategyRes, stocksRes] = await Promise.all([
        strategyService.getStrategyById(strategyId),
        stockService.getRecommendations(strategyId, page, itemsPerPage),
      ])
      
      setStrategy(strategyRes.data)
      
      if (stocksRes.data.recommendations && stocksRes.data.recommendations.length > 0) {
        setStocks(stocksRes.data.recommendations)
        setTotalPages(Math.ceil(stocksRes.data.total / itemsPerPage))
      } else {
        setStocks([])
      }
      
      setError('')
    } catch (err) {
      setError('Failed to load recommendations')
    } finally {
      setLoading(false)
    }
  }

  if (!strategyId) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto mb-4 text-yellow-500" size={32} />
        <p className="text-gray-400">Please select a strategy first</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader className="animate-spin text-primary-500 mx-auto mb-4" size={32} />
          <p className="text-gray-400">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {strategy && (
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">{strategy.name}</h1>
          <p className="text-gray-400 mb-4">{strategy.description}</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Return Rate</p>
              <p className="text-xl font-bold text-primary-500">{strategy.return_rate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Risk Level</p>
              <p className="text-xl font-bold text-accent-yellow">{strategy.risk_level || 'Medium'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Stocks</p>
              <p className="text-xl font-bold text-blue-400">{stocks.length}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {stocks.length === 0 ? (
        <div className="card text-center py-12">
          <AlertCircle className="mx-auto mb-4 text-gray-500" size={32} />
          <p className="text-gray-400">No stock found for this strategy</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Stock Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stocks.map((stock) => (
              <div key={stock.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-100">{stock.symbol}</h3>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                  <TrendingUp className="text-primary-500" size={20} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Entry Price:</span>
                    <span className="text-lg font-semibold text-primary-500">₹{stock.entry_price}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-lg font-semibold text-green-400">₹{stock.target_price}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Stop Loss:</span>
                    <span className="text-lg font-semibold text-red-400">₹{stock.stoploss_price}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-700 flex justify-between">
                    <span className="text-gray-400">Potential Return:</span>
                    <span className="font-bold text-accent-yellow">
                      {((stock.target_price - stock.entry_price) / stock.entry_price * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                {stock.notes && (
                  <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">Notes:</p>
                    <p className="text-gray-400 text-sm">{stock.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-2 rounded-lg transition ${
                      page === p
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Recommendations
