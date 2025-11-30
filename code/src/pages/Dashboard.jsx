import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/endpoints'
import { User, Lock, AlertCircle, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats] = useState([
    { label: 'Active Strategies', value: '12', icon: '📊' },
    { label: 'Total Returns', value: '+24.5%', icon: '📈' },
    { label: 'This Month', value: '+8.2%', icon: '💹' },
    { label: 'Watchlist Items', value: '23', icon: '👁️' },
  ])

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await userService.getProfile()
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-100 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back, {user?.name || 'Trader'}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
                <p className="text-xl font-bold text-primary-500 mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-100 mb-3">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link to="/strategies" className="flex items-center gap-2 p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
            <span className="text-xl">📋</span>
            <div>
              <p className="font-semibold text-sm text-gray-100">View Strategies</p>
              <p className="text-xs text-gray-500">Browse all available strategies</p>
            </div>
          </Link>

          <Link to="/recommendations" className="flex items-center gap-2 p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
            <span className="text-xl">⭐</span>
            <div>
              <p className="font-semibold text-sm text-gray-100">Stock Recommendations</p>
              <p className="text-xs text-gray-500">View current recommendations</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Market Overview */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-100 mb-3">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">BSE SENSEX</p>
            <p className="text-2xl font-bold text-primary-500">78,450</p>
            <p className="text-sm text-green-400 mt-1">+1.24% Today</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">NIFTY 50</p>
            <p className="text-2xl font-bold text-primary-500">23,680</p>
            <p className="text-sm text-green-400 mt-1">+0.98% Today</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">BANK NIFTY</p>
            <p className="text-2xl font-bold text-primary-500">47,320</p>
            <p className="text-sm text-red-400 mt-1">-0.45% Today</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
