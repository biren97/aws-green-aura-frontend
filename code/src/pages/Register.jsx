import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react'
import { authService } from '../services/endpoints'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', first_name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.first_name.trim()) newErrors.first_name = 'Name is required'
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
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
      await authService.register({
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      })
      navigate('/login', { state: { message: 'Registration successful! Please login.' } })
    } catch (error) {
      setServerError(error.response?.data?.username?.[0] || error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-dark via-gray-900 to-accent-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="card">
          <h1 className="text-2xl font-bold text-primary-500 mb-1">Create Account</h1>
          <p className="text-sm text-gray-400 mb-4">Join Black Aura Trading</p>

          {serverError && (
            <div className="mb-3 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2 text-red-300 text-sm">
              <AlertCircle size={18} />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input
                  type="text"
                  name="first_name"
                  placeholder="John Doe"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="input-field pl-9"
                />
              </div>
              {errors.first_name && <p className="text-red-400 text-xs mt-0.5">{errors.first_name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input
                  type="text"
                  name="username"
                  placeholder="john_doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-9"
                />
              </div>
              {errors.username && <p className="text-red-400 text-xs mt-0.5">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-9"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-0.5">{errors.email}</p>}
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

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-9"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-0.5">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-400 font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
