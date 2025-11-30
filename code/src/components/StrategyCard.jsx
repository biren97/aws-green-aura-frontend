import { useState } from 'react'
import { TrendingUp, History, ShoppingCart, DollarSign } from 'lucide-react'
import StrategyHistoryModal from './StrategyHistoryModal'

const StrategyCard = ({ strategy, onPurchase }) => {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <>
      <div className="card hover:shadow-lg hover:shadow-primary-500/20 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-100">{strategy.name}</h3>
            <p className="text-xs text-gray-400 mt-1">Strategy ID: {strategy.id}</p>
          </div>
          <div className="p-2 bg-primary-500/20 rounded-lg">
            <TrendingUp size={20} className="text-primary-500" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Profit Range */}
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Monthly Return</p>
            <p className="text-lg font-bold text-primary-500">{strategy.profit_range}</p>
          </div>

          {/* Accuracy */}
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Win Rate</p>
            <p className="text-lg font-bold text-accent-blue">{strategy.accuracy}</p>
          </div>

          {/* Trades Count */}
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Total Trades</p>
            <p className="text-lg font-bold text-gray-100">{strategy.total_trades}</p>
          </div>

          {/* Risk Level */}
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Risk Level</p>
            <p className="text-lg font-bold text-accent-yellow">{strategy.risk_level}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{strategy.description}</p>

        {/* Price Section */}
        <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Monthly Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary-500">${strategy.monthly_price}</span>
                {strategy.discount_percent && (
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                    {strategy.discount_percent}% OFF
                  </span>
                )}
              </div>
            </div>
            {strategy.original_price && strategy.original_price > strategy.monthly_price && (
              <div className="text-right">
                <p className="text-xs text-gray-500 line-through">${strategy.original_price}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowHistory(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold transition text-sm"
          >
            <History size={16} />
            History
          </button>

          <button
            onClick={() => onPurchase(strategy)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition text-sm"
          >
            <ShoppingCart size={16} />
            Subscribe
          </button>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <StrategyHistoryModal
          strategy={strategy}
          onClose={() => setShowHistory(false)}
        />
      )}
    </>
  )
}

export default StrategyCard
