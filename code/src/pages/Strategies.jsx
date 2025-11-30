import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import StrategyCard from '../components/StrategyCard'
import { strategyService } from '../services/endpoints'

const Strategies = () => {
  const navigate = useNavigate()
  const [strategies, setStrategies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 12

  useEffect(() => {
    fetchStrategies()
  }, [currentPage])

  const fetchStrategies = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await strategyService.getStrategies(currentPage, itemsPerPage)
      setStrategies(response.data.results || response.data)
      setTotalCount(response.data.count || response.data.length)
      setTotalPages(Math.ceil((response.data.count || response.data.length) / itemsPerPage))
    } catch (err) {
      setError('Failed to load strategies. Please try again later.')
      console.error('Error fetching strategies:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = (strategy) => {
    // Navigate to payment page with strategy details
    navigate('/payment', { state: { strategy } })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100 mb-1">Trading Strategies</h1>
        <p className="text-sm text-gray-400">
          Explore our curated collection of professional trading strategies designed for consistent returns.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader size={40} className="text-primary-500 animate-spin mb-4" />
          <p className="text-gray-400">Loading strategies...</p>
        </div>
      ) : strategies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">No strategies available at the moment.</p>
          <button
            onClick={fetchStrategies}
            className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition"
          >
            Refresh
          </button>
        </div>
      ) : (
        <>
          {/* Strategies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                onPurchase={handlePurchase}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition text-sm font-semibold ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={20} />
              </button>

              <span className="text-sm text-gray-400 ml-4">
                Page {currentPage} of {totalPages} ({totalCount} strategies)
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Strategies
