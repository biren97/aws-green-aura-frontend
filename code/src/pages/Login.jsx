import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle, CheckCircle, ArrowLeft, Home } from 'lucide-react'
import { authService } from '../services/endpoints'
import HomeLogo from '../components/HomeLogo'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ mobile_number: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage] = useState(location.state?.message || '')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.mobile_number) newErrors.mobile_number = 'Mobile number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const response = await authService.login(formData.mobile_number, formData.password)
      localStorage.setItem('auth_token', response.data.access)
      navigate('/dashboard')
    } catch (error) {
      setServerError(error.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    try {
      const response = await authService.login('testuser', 'testpass123')
      localStorage.setItem('auth_token', response.data.access)
      navigate('/dashboard')
    } catch (error) {
      setServerError('Demo credentials not found. Please register first.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent-dark">
      <div className="flex justify-between items-center h-16">
        <HomeLogo />
      </div>
      
    <div className="min-h-screen bg-gradient-to-br from-accent-dark via-gray-900 to-accent-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button> */}

        <div className="card">
          <h1 className="text-2xl font-bold text-primary-500 mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-400 mb-4">Black Aura Trading Platform</p>

          {successMessage && (
            <div className="mb-3 p-3 bg-green-900/50 border border-green-700 rounded-lg flex items-center gap-2 text-green-300 text-sm">
              <CheckCircle size={18} />
              {successMessage}
            </div>
          )}

          {serverError && (
            <div className="mb-3 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2 text-red-300 text-sm">
              <AlertCircle size={18} />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Mobile Number</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input
                  type="text"
                  name="mobile_number"
                  placeholder="your_mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="input-field pl-9"
                />
              </div>
              {errors.mobile_number && <p className="text-red-400 text-xs mt-0.5">{errors.mobile_number}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-9"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-0.5">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center text-xs">
              <Link to="/forgot-password" className="text-primary-500 hover:text-primary-400">Forgot Password?</Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-accent-dark text-gray-500">or try demo</span>
            </div>
          </div>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold transition mb-4 text-sm"
          >
            {loading ? 'Loading...' : 'Try Demo Account'}
          </button>

          <p className="text-center text-gray-400 text-xs mb-4">
            Demo credentials: testuser / testpass123
          </p>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-400 font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
