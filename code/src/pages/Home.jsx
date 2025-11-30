import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Target, Users, Zap, ArrowRight, Menu, X } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Strategies',
      description: 'Access vetted trading strategies backed by data and analysis'
    },
    {
      icon: Target,
      title: 'Stock Recommendations',
      description: 'Get entry prices, targets, and stop-loss levels for each stock'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Learn from experienced traders and stay updated with market insights'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant notifications for new recommendations and market changes'
    }
  ]

  const strategies = [
    {
      name: 'Growth Strategy',
      description: 'High-growth stocks with strong potential returns',
      return: '18.5%',
      risk: 'High'
    },
    {
      name: 'Dividend Strategy',
      description: 'Dividend-paying stocks for steady income',
      return: '8.2%',
      risk: 'Low'
    },
    {
      name: 'Value Strategy',
      description: 'Undervalued stocks with strong fundamentals',
      return: '12.3%',
      risk: 'Medium'
    },
    {
      name: 'Tech Strategy',
      description: 'Technology sector stocks with innovation focus',
      return: '22.5%',
      risk: 'High'
    }
  ]

  return (
    <div className="min-h-screen bg-accent-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-accent-dark/95 backdrop-blur border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <h1 className="text-xl font-bold text-primary-500">Black Aura</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-primary-500 transition">Features</a>
              <a href="#strategies" className="text-gray-300 hover:text-primary-500 transition">Strategies</a>
              <a href="#about" className="text-gray-300 hover:text-primary-500 transition">About</a>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary-500"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-gray-700 pt-4">
              <a href="#features" className="block text-gray-300 hover:text-primary-500">Features</a>
              <a href="#strategies" className="block text-gray-300 hover:text-primary-500">Strategies</a>
              <a href="#about" className="block text-gray-300 hover:text-primary-500">About</a>
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-2 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full btn-primary"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-100 mb-6 leading-tight">
                Smart Trading <span className="text-primary-500">Strategies</span> Made Simple
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Get AI-powered stock recommendations with clear entry prices, profit targets, and risk management. Start trading with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:border-primary-500 hover:text-primary-500 transition font-semibold"
                >
                  Already a member? Login
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-blue rounded-2xl opacity-20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-accent-dark rounded-2xl p-8 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Entry Price</span>
                    <span className="text-lg font-bold text-gray-100 ml-auto">₹1,500</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Target Price</span>
                    <span className="text-lg font-bold text-green-400 ml-auto">₹1,800</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Stop Loss</span>
                    <span className="text-lg font-bold text-red-400 ml-auto">₹1,300</span>
                  </div>
                  <div className="p-4 bg-primary-500/20 border border-primary-500/50 rounded-lg text-center">
                    <p className="text-sm text-gray-400">Expected Return</p>
                    <p className="text-2xl font-bold text-primary-500">+20%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-100 mb-4">Why Choose Black Aura?</h3>
            <p className="text-xl text-gray-400">Everything you need for smarter trading decisions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="card group hover:shadow-lg hover:shadow-primary-500/20">
                  <Icon className="text-primary-500 mb-4 group-hover:scale-110 transition" size={32} />
                  <h4 className="text-lg font-bold text-gray-100 mb-2">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Strategies Preview */}
      <section id="strategies" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-100 mb-4">Popular Strategies</h3>
            <p className="text-xl text-gray-400">Choose a strategy that matches your investment goals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {strategies.map((strategy, idx) => (
              <div key={idx} className="card group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-100 group-hover:text-primary-500 transition">
                      {strategy.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{strategy.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500">Avg Return</p>
                    <p className="text-lg font-bold text-primary-500">{strategy.return}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Risk Level</p>
                    <p className={`text-lg font-bold ${
                      strategy.risk === 'High' ? 'text-red-400' :
                      strategy.risk === 'Medium' ? 'text-accent-yellow' :
                      'text-green-400'
                    }`}>
                      {strategy.risk}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
            >
              Explore All Strategies <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-100 mb-6">About Black Aura Trading</h3>
              <p className="text-lg text-gray-400 mb-4 leading-relaxed">
                We believe intelligent investing should be accessible to everyone. Our platform combines cutting-edge AI analysis with expert market insights to deliver actionable trading strategies.
              </p>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                Whether you're a beginner or experienced trader, Black Aura provides the tools and recommendations you need to make informed decisions in the stock market.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-300">Expert-curated strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-300">Real-time market data</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-300">Risk management tools</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <p className="text-3xl font-bold text-primary-500 mb-2">50+</p>
                <p className="text-gray-400">Trading Strategies</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-primary-500 mb-2">10K+</p>
                <p className="text-gray-400">Active Users</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-primary-500 mb-2">95%</p>
                <p className="text-gray-400">Win Rate</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-primary-500 mb-2">24/7</p>
                <p className="text-gray-400">Market Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-gradient-to-r from-primary-500/10 to-accent-blue/10 border border-primary-500/20">
            <h3 className="text-4xl font-bold text-gray-100 mb-6">Ready to Start Trading Smart?</h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are making better decisions with Black Aura's AI-powered strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="btn-primary px-8 py-3"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 rounded-lg border border-gray-700 text-gray-300 hover:border-primary-500 hover:text-primary-500 transition font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2024 Black Aura Trading. All rights reserved.</p>
          <p className="mt-2">Disclaimer: Past performance is not indicative of future results.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
