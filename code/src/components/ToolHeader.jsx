import { Menu, X, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ToolHeader = ({ title, description, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-700/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-green-400 hover:text-green-300 transition p-2"
            title="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-green-400 transition border border-slate-700/50"
          title="Back to dashboard"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Dashboard</span>
        </button>
      </div>
    </div>
  )
}

export default ToolHeader
