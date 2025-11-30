import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Menu, X, LogOut, Home, TrendingUp, Settings, Menu as MenuIcon, ChevronDown, Calculator, Globe, ChevronLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [expandTools, setExpandTools] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Strategies', icon: TrendingUp, href: '/strategies' },
    { label: 'Recommendations', icon: TrendingUp, href: '/recommendations' },
  ]

  const toolItems = [
    { label: 'EMI Calculator', href: '/tools/emi' },
    { label: 'SIP Calculator', href: '/tools/sip' },
    { label: 'Stock Average', href: '/tools/stock-average' },
    { label: 'Timezone Converter', href: '/tools/timezone' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-accent-dark border-r border-gray-700 transform transition-all duration-300 z-40 md:relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isCollapsed ? 'w-20 md:w-20' : 'w-64 md:w-64'}`}>
        <div className={`p-4 pb-20 ${isCollapsed ? 'p-2' : 'p-6'}`}>
          {/* Header with collapse button */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">BA</span>
              </div>
              {!isCollapsed && <h1 className="text-lg font-bold text-primary-500 truncate">Black Aura</h1>}
            </div>
            {/* Collapse button - desktop only */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center justify-center p-1 rounded hover:bg-gray-700 transition"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <ChevronLeft size={18} className={`text-gray-400 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  title={isCollapsed ? item.label : ''}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-500'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-primary-500'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => isOpen && setIsOpen(false)}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Tools Section */}
          <div className={`mt-6 pt-6 border-t border-gray-700 ${isCollapsed ? 'space-y-1' : ''}`}>
            <button
              onClick={() => setExpandTools(!expandTools)}
              title={isCollapsed ? 'Tools' : ''}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-primary-500 transition text-sm ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                <Calculator size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="truncate">Tools</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform flex-shrink-0 ${expandTools ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {expandTools && !isCollapsed && (
              <div className="ml-3 mt-2 space-y-1">
                {toolItems.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`block px-3 py-1.5 rounded-lg text-xs transition ${
                        isActive
                          ? 'bg-primary-500/20 text-primary-500'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-primary-500'
                      }`}
                      onClick={() => isOpen && setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            title={isCollapsed ? 'Logout' : ''}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-900/30 hover:text-red-400 transition mt-8 text-sm ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}

const Header = ({ sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed }) => {
  return (
    <header className="bg-accent-dark border-b border-gray-700 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-primary-500 p-1 hover:bg-gray-800 rounded transition"
          title="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
        
        <h2 className="text-lg font-semibold text-gray-100 truncate">Trading Platform</h2>
        
        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          U
        </div>
      </div>
    </header>
  )
}

export { Sidebar, Header }
